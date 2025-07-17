import { supabase } from "@/integrations/supabase/client";

export type FileStoragePurpose = 'cv_upload' | 'profile_picture' | 'background_image';

export interface StoredFile {
  id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  storage_path: string;
  purpose: FileStoragePurpose;
  created_at: string;
}

export const fileStorageService = {
  // Upload file to storage
  async uploadFile(
    file: File,
    purpose: FileStoragePurpose,
    folder?: string
  ): Promise<{ path: string; url: string }> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error("User not authenticated");

    const bucketName = this.getBucketName(purpose);
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = folder ? `${user.user.id}/${folder}/${fileName}` : `${user.user.id}/${fileName}`;

    // Upload to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Get public URL for public buckets
    let publicUrl = '';
    if (bucketName === 'profile-images' || bucketName === 'background-images') {
      const { data } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);
      publicUrl = data.publicUrl;
    }

    // Save file metadata to database
    await this.saveFileMetadata(file, uploadData.path, purpose);

    return {
      path: uploadData.path,
      url: publicUrl || uploadData.path
    };
  },

  // Save file metadata to database
  async saveFileMetadata(
    file: File,
    storagePath: string,
    purpose: FileStoragePurpose
  ): Promise<string> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from("user_files")
      .insert({
        user_id: user.user.id,
        file_name: file.name,
        file_type: file.type,
        file_size: file.size,
        storage_path: storagePath,
        purpose,
        metadata: {
          lastModified: file.lastModified,
          originalName: file.name
        }
      })
      .select()
      .single();

    if (error) throw error;
    return data.id;
  },

  // Get user's files by purpose
  async getUserFiles(purpose?: FileStoragePurpose): Promise<StoredFile[]> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error("User not authenticated");

    let query = supabase
      .from("user_files")
      .select("*")
      .eq("user_id", user.user.id);

    if (purpose) {
      query = query.eq("purpose", purpose);
    }

    const { data, error } = await query.order("created_at", { ascending: false });

    if (error) throw error;
    return data.map(file => ({
      ...file,
      purpose: file.purpose as FileStoragePurpose
    }));
  },

  // Download file from storage
  async downloadFile(storagePath: string, purpose: FileStoragePurpose): Promise<Blob> {
    const bucketName = this.getBucketName(purpose);
    
    const { data, error } = await supabase.storage
      .from(bucketName)
      .download(storagePath);

    if (error) throw error;
    return data;
  },

  // Delete file from storage and database
  async deleteFile(fileId: string): Promise<void> {
    // Get file metadata first
    const { data: fileData, error: fetchError } = await supabase
      .from("user_files")
      .select("*")
      .eq("id", fileId)
      .single();

    if (fetchError) throw fetchError;

    const bucketName = this.getBucketName(fileData.purpose);

    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from(bucketName)
      .remove([fileData.storage_path]);

    if (storageError) throw storageError;

    // Delete from database
    const { error: dbError } = await supabase
      .from("user_files")
      .delete()
      .eq("id", fileId);

    if (dbError) throw dbError;
  },

  // Get bucket name based on purpose
  getBucketName(purpose: FileStoragePurpose): string {
    switch (purpose) {
      case 'cv_upload':
        return 'cv-uploads';
      case 'profile_picture':
        return 'profile-images';
      case 'background_image':
        return 'background-images';
      default:
        throw new Error(`Unknown file purpose: ${purpose}`);
    }
  }
};