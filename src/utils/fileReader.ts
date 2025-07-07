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
      // Handle PDF files with structure preservation
      return new Promise(async (resolve, reject) => {
        try {
          const arrayBuffer = await file.arrayBuffer();
          const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
          let htmlContent = '<div class="pdf-content">';
          
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            
            htmlContent += `<div class="pdf-page" data-page="${i}">`;
            
            // Group text items by approximate line position
            const lines: { [key: string]: any[] } = {};
            content.items.forEach((item: any) => {
              const lineKey = Math.round(item.transform[5] / 2) * 2; // Group by Y position
              if (!lines[lineKey]) lines[lineKey] = [];
              lines[lineKey].push(item);
            });
            
            // Sort lines by Y position (descending for PDF coordinates)
            const sortedLines = Object.keys(lines)
              .sort((a, b) => parseInt(b) - parseInt(a))
              .map(key => lines[key]);
            
            sortedLines.forEach(lineItems => {
              // Sort items in line by X position
              lineItems.sort((a, b) => a.transform[4] - b.transform[4]);
              
              const lineText = lineItems.map(item => item.str).join(' ').trim();
              if (lineText) {
                // Detect headers (larger font size or all caps)
                const avgFontSize = lineItems.reduce((sum, item) => sum + (item.height || 12), 0) / lineItems.length;
                const isHeader = avgFontSize > 14 || /^[A-Z\s]{3,}$/.test(lineText);
                
                if (isHeader) {
                  htmlContent += `<h3 class="cv-header" style="font-size: ${avgFontSize}px; font-weight: bold; margin: 10px 0 5px 0;">${lineText}</h3>`;
                } else {
                  htmlContent += `<p class="cv-content" style="margin: 2px 0; line-height: 1.4;">${lineText}</p>`;
                }
              }
            });
            
            htmlContent += '</div>';
          }
          
          htmlContent += '</div>';
          resolve(htmlContent);
        } catch (error) {
          // Fallback to plain text extraction
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
          } catch (fallbackError) {
            reject(fallbackError);
          }
        }
      });
    } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
               fileType === 'application/msword' || 
               fileName.endsWith('.docx') || 
               fileName.endsWith('.doc')) {
      // Handle DOCX files with HTML conversion to preserve formatting
      return new Promise(async (resolve, reject) => {
        try {
          const arrayBuffer = await file.arrayBuffer();
          const result = await mammoth.convertToHtml({ arrayBuffer });
          
          // If HTML conversion fails or produces minimal content, fallback to raw text
          if (!result.value || result.value.trim().length < 50) {
            const textResult = await mammoth.extractRawText({ arrayBuffer });
            resolve(textResult.value);
          } else {
            resolve(result.value);
          }
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