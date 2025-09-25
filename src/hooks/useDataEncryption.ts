import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface EncryptedData {
  id: string;
  data_type: string;
  created_at: string;
  updated_at: string;
}

export const useDataEncryption = () => {
  const [loading, setLoading] = useState(false);
  const [encryptedData, setEncryptedData] = useState<EncryptedData[]>([]);

  // Encrypt sensitive data
  const encryptData = async (content: string, dataType: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('data-encryption', {
        body: {
          action: 'encrypt',
          content,
          data_type: dataType
        }
      });

      if (error) throw error;

      if (data?.success) {
        toast.success('Data encrypted successfully');
        await listEncryptedData();
        return {
          encrypted_data_id: data.encrypted_data_id,
          key_id: data.key_id
        };
      } else {
        throw new Error(data?.error || 'Encryption failed');
      }
    } catch (error) {
      console.error('Encryption error:', error);
      toast.error('Failed to encrypt data');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Decrypt sensitive data
  const decryptData = async (encryptedDataId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('data-encryption', {
        body: {
          action: 'decrypt',
          encrypted_data_id: encryptedDataId
        }
      });

      if (error) throw error;

      if (data?.success) {
        return {
          content: data.decrypted_content,
          dataType: data.data_type
        };
      } else {
        throw new Error(data?.error || 'Decryption failed');
      }
    } catch (error) {
      console.error('Decryption error:', error);
      toast.error('Failed to decrypt data');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // List encrypted data for current user
  const listEncryptedData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('data-encryption', {
        body: { action: 'list' }
      });

      if (error) throw error;

      if (data?.success) {
        setEncryptedData(data.encrypted_data || []);
      } else {
        throw new Error(data?.error || 'Failed to list encrypted data');
      }
    } catch (error) {
      console.error('List encryption error:', error);
      toast.error('Failed to load encrypted data');
    } finally {
      setLoading(false);
    }
  };

  // Delete encrypted data
  const deleteEncryptedData = async (encryptedDataId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('data-encryption', {
        body: {
          action: 'delete',
          encrypted_data_id: encryptedDataId
        }
      });

      if (error) throw error;

      if (data?.success) {
        toast.success('Encrypted data deleted');
        setEncryptedData(prev => prev.filter(item => item.id !== encryptedDataId));
      } else {
        throw new Error(data?.error || 'Failed to delete encrypted data');
      }
    } catch (error) {
      console.error('Delete encryption error:', error);
      toast.error('Failed to delete encrypted data');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    encryptedData,
    encryptData,
    decryptData,
    listEncryptedData,
    deleteEncryptedData
  };
};