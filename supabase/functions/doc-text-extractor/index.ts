import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      throw new Error('No file provided');
    }

    console.log(`Processing .doc file: ${file.name}, size: ${file.size} bytes`);
    
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    
    let extractedText = '';
    
    // Basic text extraction from OLE2 compound document
    // Look for readable text patterns in the binary data
    let currentWord = '';
    const words: string[] = [];
    
    for (let i = 0; i < uint8Array.length; i++) {
      const char = uint8Array[i];
      
      // Check for printable ASCII characters
      if (char >= 32 && char <= 126) {
        currentWord += String.fromCharCode(char);
      } else if (char === 0 || char === 9 || char === 10 || char === 13) {
        // End of word or whitespace
        if (currentWord.length > 2) { // Only keep words longer than 2 characters
          words.push(currentWord);
        }
        currentWord = '';
      } else {
        // Non-printable character, end current word
        if (currentWord.length > 2) {
          words.push(currentWord);
        }
        currentWord = '';
      }
    }
    
    // Add the last word if it exists
    if (currentWord.length > 2) {
      words.push(currentWord);
    }
    
    // Join words with spaces and clean up
    extractedText = words.join(' ')
      .replace(/\s+/g, ' ') // Normalize whitespace
      .replace(/[^\w\s@.-]/g, ' ') // Remove special characters but keep common ones
      .trim();
    
    // Filter out common OLE2 metadata strings
    const filteredWords = extractedText.split(' ').filter(word => {
      const lowerWord = word.toLowerCase();
      return !lowerWord.includes('microsoft') &&
             !lowerWord.includes('windows') &&
             !lowerWord.includes('ole2') &&
             !lowerWord.includes('compound') &&
             word.length > 1 &&
             !/^\d+$/.test(word) && // Not just numbers
             !/^[^a-zA-Z]*$/.test(word); // Contains at least one letter
    });
    
    extractedText = filteredWords.join(' ');
    
    if (extractedText.length < 50) {
      throw new Error('Unable to extract meaningful text from this .doc file. The file may be corrupted, password-protected, or use an unsupported format.');
    }
    
    console.log(`Successfully extracted ${extractedText.length} characters from .doc file`);
    
    return new Response(JSON.stringify({
      success: true,
      text: extractedText,
      confidence: 'medium',
      processingMethod: 'server-side-binary-extraction',
      extractedWords: filteredWords.length,
      warnings: ['Text extracted using binary parsing method. Some formatting may be lost.']
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error('Error processing .doc file:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      suggestion: 'Please try converting your .doc file to .docx or PDF format for better compatibility.'
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});