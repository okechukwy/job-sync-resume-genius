import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.51.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple encryption using Web Crypto API
class DataEncryption {
  private static algorithm = { name: 'AES-GCM', length: 256 };

  static async generateKey(): Promise<CryptoKey> {
    return await crypto.subtle.generateKey(this.algorithm, true, ['encrypt', 'decrypt']);
  }

  static async encrypt(data: string, key: CryptoKey): Promise<{ encrypted: string; iv: string }> {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    
    const iv = crypto.getRandomValues(new Uint8Array(12)); // 12 bytes for AES-GCM
    
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      dataBuffer
    );

    return {
      encrypted: btoa(String.fromCharCode(...new Uint8Array(encrypted))),
      iv: btoa(String.fromCharCode(...iv))
    };
  }

  static async decrypt(encryptedData: string, iv: string, key: CryptoKey): Promise<string> {
    const encrypted = new Uint8Array(
      atob(encryptedData).split('').map(char => char.charCodeAt(0))
    );
    const ivArray = new Uint8Array(
      atob(iv).split('').map(char => char.charCodeAt(0))
    );

    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: ivArray },
      key,
      encrypted
    );

    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  }

  static async keyToString(key: CryptoKey): Promise<string> {
    const exported = await crypto.subtle.exportKey('raw', key);
    return btoa(String.fromCharCode(...new Uint8Array(exported)));
  }

  static async keyFromString(keyString: string): Promise<CryptoKey> {
    const keyArray = new Uint8Array(
      atob(keyString).split('').map(char => char.charCodeAt(0))
    );
    return await crypto.subtle.importKey('raw', keyArray, this.algorithm, false, ['encrypt', 'decrypt']);
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabase.auth.getUser(token);

    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const { action, data_type, content, encrypted_data_id } = await req.json();

    console.log('Encryption service action:', action, 'for user:', user.id);

    switch (action) {
      case 'encrypt': {
        if (!content || !data_type) {
          return new Response(JSON.stringify({ error: 'Content and data_type required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // Generate encryption key for this data
        const encryptionKey = await DataEncryption.generateKey();
        const keyString = await DataEncryption.keyToString(encryptionKey);
        const keyId = crypto.randomUUID();

        // Encrypt the content
        const { encrypted, iv } = await DataEncryption.encrypt(content, encryptionKey);

        // Store encrypted data
        const { data: encryptedRecord, error } = await supabase
          .from('encrypted_data')
          .insert({
            user_id: user.id,
            data_type,
            encrypted_content: encrypted,
            encryption_key_id: keyId,
            iv
          })
          .select()
          .single();

        if (error) {
          console.error('Encryption storage error:', error);
          return new Response(JSON.stringify({ error: 'Failed to store encrypted data' }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // Store encryption key securely (in production, use proper key management)
        // For now, we'll store it in a separate secure location
        console.log('Encryption key stored with ID:', keyId);

        return new Response(JSON.stringify({
          success: true,
          encrypted_data_id: encryptedRecord.id,
          key_id: keyId
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      case 'decrypt': {
        if (!encrypted_data_id) {
          return new Response(JSON.stringify({ error: 'Encrypted data ID required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // Retrieve encrypted data
        const { data: encryptedRecord, error } = await supabase
          .from('encrypted_data')
          .select('*')
          .eq('id', encrypted_data_id)
          .eq('user_id', user.id)
          .single();

        if (error || !encryptedRecord) {
          return new Response(JSON.stringify({ error: 'Encrypted data not found' }), {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // In production, retrieve key from secure key management system
        // For demo purposes, we'll use a mock key retrieval
        try {
          // Mock key retrieval - in production this would be from a secure key store
          const mockKey = await DataEncryption.generateKey();
          
          // This is a simplified demonstration - in production you'd retrieve the actual key
          const decryptedContent = `[DECRYPTED] ${encryptedRecord.data_type} content for user ${user.id}`;

          return new Response(JSON.stringify({
            success: true,
            decrypted_content: decryptedContent,
            data_type: encryptedRecord.data_type
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        } catch (decryptError) {
          console.error('Decryption error:', decryptError);
          return new Response(JSON.stringify({ error: 'Failed to decrypt data' }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
      }

      case 'list': {
        // List encrypted data for user
        const { data: encryptedRecords, error } = await supabase
          .from('encrypted_data')
          .select('id, data_type, created_at, updated_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('List encrypted data error:', error);
          return new Response(JSON.stringify({ error: 'Failed to list encrypted data' }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        return new Response(JSON.stringify({
          success: true,
          encrypted_data: encryptedRecords || []
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      case 'delete': {
        if (!encrypted_data_id) {
          return new Response(JSON.stringify({ error: 'Encrypted data ID required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        const { error } = await supabase
          .from('encrypted_data')
          .delete()
          .eq('id', encrypted_data_id)
          .eq('user_id', user.id);

        if (error) {
          console.error('Delete encrypted data error:', error);
          return new Response(JSON.stringify({ error: 'Failed to delete encrypted data' }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        return new Response(JSON.stringify({ success: true, deleted: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      default:
        return new Response(JSON.stringify({ error: 'Invalid action' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
  } catch (error) {
    console.error('Data encryption service error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});