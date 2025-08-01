import * as XLSX from 'xlsx';

export const readDocFile = async (file: File): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      
      // Try to read as DOC file using XLSX (which supports legacy formats)
      const workbook = XLSX.read(arrayBuffer, { 
        type: 'array',
        raw: true
      });
      
      let extractedText = '';
      
      // Extract text from all sheets/sections
      workbook.SheetNames.forEach(sheetName => {
        const sheet = workbook.Sheets[sheetName];
        const sheetText = XLSX.utils.sheet_to_txt(sheet);
        extractedText += sheetText + '\n';
      });
      
      // If no meaningful content extracted, try alternative approach
      if (extractedText.trim().length < 10) {
        // Fallback: try to extract as raw text
        const uint8Array = new Uint8Array(arrayBuffer);
        let rawText = '';
        
        // Simple text extraction from binary data
        for (let i = 0; i < uint8Array.length; i++) {
          const char = uint8Array[i];
          if (char >= 32 && char <= 126) { // Printable ASCII characters
            rawText += String.fromCharCode(char);
          } else if (char === 10 || char === 13) { // Line breaks
            rawText += '\n';
          }
        }
        
        // Clean up the extracted text
        extractedText = rawText
          .replace(/[^\x20-\x7E\n]/g, ' ') // Remove non-printable characters
          .replace(/\s+/g, ' ') // Normalize whitespace
          .trim();
      }
      
      if (extractedText.trim().length < 10) {
        throw new Error('Unable to extract meaningful text from this .doc file. Please try saving as .docx or PDF format.');
      }
      
      resolve(extractedText);
    } catch (error) {
      console.error('Error reading DOC file:', error);
      reject(new Error('Failed to read .doc file. Please try converting to .docx or PDF format for better compatibility.'));
    }
  });
};