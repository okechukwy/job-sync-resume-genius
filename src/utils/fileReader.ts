import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const readFileContent = async (file: File): Promise<string> => {
  const fileType = file.type.toLowerCase();
  const fileName = file.name.toLowerCase();
  
  try {
    if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
      // Handle text files
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = (e) => reject(e);
        reader.readAsText(file, 'UTF-8');
      });
    } else if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
      // Handle PDF files
      return new Promise(async (resolve, reject) => {
        try {
          const arrayBuffer = await file.arrayBuffer();
          const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
          let textContent = '';
          
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const pageText = content.items
              .map((item: any) => item.str)
              .join(' ');
            textContent += pageText + '\n';
          }
          
          resolve(textContent.trim());
        } catch (error) {
          reject(error);
        }
      });
    } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
               fileType === 'application/msword' || 
               fileName.endsWith('.docx') || 
               fileName.endsWith('.doc')) {
      // Handle DOCX files
      return new Promise(async (resolve, reject) => {
        try {
          const arrayBuffer = await file.arrayBuffer();
          const result = await mammoth.extractRawText({ arrayBuffer });
          resolve(result.value);
        } catch (error) {
          reject(error);
        }
      });
    } else {
      // Fallback for unsupported formats
      throw new Error(`Unsupported file format: ${fileType}`);
    }
  } catch (error) {
    console.error('Error reading file:', error);
    throw new Error('Failed to extract text from the uploaded file. Please ensure the file is not corrupted and try again.');
  }
};