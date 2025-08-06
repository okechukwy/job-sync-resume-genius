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
    
    // Enhanced text extraction from OLE2 compound document
    // Skip binary headers and look for readable text patterns
    let currentWord = '';
    const words: string[] = [];
    let skipMode = false;
    let skipCounter = 0;
    
    // Pre-scan for "bjbj" header and other binary markers
    const binaryMarkers = ['bjbj', 'PK', '\x00\x00\x00', 'Microsoft'];
    let headerEndIndex = 0;
    
    for (let i = 0; i < Math.min(uint8Array.length, 2048); i++) {
      const chunk = String.fromCharCode(...uint8Array.slice(i, i + 4));
      if (chunk.includes('bjbj') || chunk.includes('PK\x03\x04')) {
        headerEndIndex = i + 512; // Skip ahead to avoid binary header
        break;
      }
    }
    
    for (let i = Math.max(headerEndIndex, 512); i < uint8Array.length; i++) {
      const char = uint8Array[i];
      
      // Skip sequences of null bytes or binary data
      if (char === 0) {
        skipCounter++;
        if (skipCounter > 10) {
          skipMode = true;
        }
        continue;
      } else {
        skipCounter = 0;
        if (skipMode && char < 32) {
          continue; // Still in binary section
        }
        skipMode = false;
      }
      
      // Check for printable ASCII characters
      if (char >= 32 && char <= 126) {
        currentWord += String.fromCharCode(char);
      } else if (char === 9 || char === 10 || char === 13) {
        // End of word or whitespace
        if (currentWord.length > 2 && isValidWord(currentWord)) {
          words.push(currentWord);
        }
        currentWord = '';
      } else {
        // Non-printable character, end current word
        if (currentWord.length > 2 && isValidWord(currentWord)) {
          words.push(currentWord);
        }
        currentWord = '';
      }
    }
    
    // Add the last word if it exists
    if (currentWord.length > 2 && isValidWord(currentWord)) {
      words.push(currentWord);
    }
    
    // Join words with spaces and clean up
    extractedText = words.join(' ')
      .replace(/\s+/g, ' ') // Normalize whitespace
      .replace(/[^\w\s@.-]/g, ' ') // Remove special characters but keep common ones
      .trim();
    
    // Enhanced filtering for binary artifacts and metadata
    const filteredWords = extractedText.split(' ').filter(word => {
      const lowerWord = word.toLowerCase();
      
      // Filter out known binary artifacts
      if (lowerWord.startsWith('bjbj') || 
          lowerWord.includes('bjbj') ||
          lowerWord.startsWith('pk') ||
          lowerWord.includes('ole2') ||
          lowerWord.includes('compound') ||
          lowerWord.includes('microsoft') ||
          lowerWord.includes('windows') ||
          lowerWord.includes('docfile') ||
          lowerWord.includes('worddoc')) {
        return false;
      }
      
      // Filter out garbage patterns
      if (word.length < 2 || 
          !/[a-zA-Z]/.test(word) || // Must contain at least one letter
          /^[0-9]+$/.test(word) || // Not just numbers
          /^[^a-zA-Z0-9]+$/.test(word) || // Not just special characters
          word.includes('\x00') ||
          /^[A-Z]{4,}$/.test(word) && word.length > 8) { // Not long uppercase strings (likely metadata)
        return false;
      }
      
      return true;
    });
    
    extractedText = filteredWords.join(' ');
    
    // Final content validation
    if (extractedText.length < 50) {
      throw new Error('Unable to extract meaningful text from this .doc file. The file may be corrupted, password-protected, or use an unsupported format.');
    }
    
    // Additional quality check - ensure we have some reasonable English words
    const commonWords = ['the', 'and', 'to', 'of', 'a', 'in', 'for', 'is', 'on', 'that', 'by', 'this', 'with', 'i', 'you', 'it', 'not', 'or', 'be', 'are'];
    const hasCommonWords = commonWords.some(word => extractedText.toLowerCase().includes(word));
    
    if (!hasCommonWords && extractedText.length < 200) {
      console.warn('Extracted text may be low quality - no common English words found');
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

// Helper function to validate if a word is meaningful
function isValidWord(word: string): boolean {
  // Filter out common binary artifacts
  if (word.toLowerCase().includes('bjbj') ||
      word.toLowerCase().includes('ole2') ||
      word.toLowerCase().includes('compound') ||
      word.toLowerCase().startsWith('pk') ||
      word.includes('\x00') ||
      word.length > 50) { // Suspiciously long words are likely binary
    return false;
  }
  
  // Must have at least one letter
  if (!/[a-zA-Z]/.test(word)) {
    return false;
  }
  
  // Reject words that are mostly non-alphanumeric
  const alphanumericRatio = (word.match(/[a-zA-Z0-9]/g) || []).length / word.length;
  if (alphanumericRatio < 0.6) {
    return false;
  }
  
  return true;
}