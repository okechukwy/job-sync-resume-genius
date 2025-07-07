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
      // Handle PDF files with enhanced structure preservation
      return new Promise(async (resolve, reject) => {
        try {
          const arrayBuffer = await file.arrayBuffer();
          const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
          let htmlContent = `
            <div class="cv-document" style="
              font-family: 'Times New Roman', serif;
              line-height: 1.6;
              color: #000;
              background: #fff;
              padding: 20px;
              max-width: 8.5in;
              margin: 0 auto;
            ">`;
          
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const viewport = page.getViewport({ scale: 1.0 });
            
            // Group text items by Y position with tolerance for line grouping
            const lineGroups: { [key: number]: any[] } = {};
            content.items.forEach((item: any) => {
              const yPos = Math.round(viewport.height - item.transform[5]); // Convert to top-down
              const tolerance = 3;
              
              // Find existing line group within tolerance
              let matchingY = Object.keys(lineGroups)
                .map(Number)
                .find(y => Math.abs(y - yPos) <= tolerance);
              
              if (!matchingY) {
                matchingY = yPos;
                lineGroups[matchingY] = [];
              }
              
              lineGroups[matchingY].push({
                ...item,
                x: item.transform[4],
                y: yPos,
                width: item.width,
                height: item.height
              });
            });
            
            // Process lines in order from top to bottom
            const sortedLines = Object.keys(lineGroups)
              .map(Number)
              .sort((a, b) => a - b);
            
            sortedLines.forEach(yPos => {
              const lineItems = lineGroups[yPos].sort((a, b) => a.x - b.x);
              
              if (lineItems.length === 0) return;
              
              // Calculate indentation based on first item's X position
              const firstX = lineItems[0].x;
              const baseIndent = 40; // Base left margin
              const indentLevel = Math.max(0, Math.floor((firstX - baseIndent) / 20));
              const indentPx = indentLevel * 20;
              
              // Determine font properties
              const avgFontSize = lineItems.reduce((sum, item) => sum + (item.height || 12), 0) / lineItems.length;
              const maxFontSize = Math.max(...lineItems.map(item => item.height || 12));
              
              // Build line text while preserving spacing
              let lineText = '';
              let lastX = lineItems[0].x;
              
              lineItems.forEach((item, index) => {
                const gap = index > 0 ? item.x - lastX : 0;
                const spaces = gap > 10 ? '  ' : gap > 5 ? ' ' : '';
                lineText += spaces + item.str;
                lastX = item.x + item.width;
              });
              
              lineText = lineText.trim();
              if (!lineText) return;
              
              // Detect content type and apply appropriate styling
              const isBullet = /^[•·▪▫▸▹◦‣⁃]\s*/.test(lineText) || /^[-*+]\s+/.test(lineText);
              const isNumbered = /^\d+[\.)]\s+/.test(lineText);
              const isHeader = maxFontSize > 14 || /^[A-Z][A-Z\s&]{2,}[A-Z]$/.test(lineText) || avgFontSize > 13;
              const isSubHeader = maxFontSize > 11 && avgFontSize > 11 && !isBullet && !isNumbered;
              const isEmail = /@/.test(lineText) && lineText.length < 50;
              const isPhone = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/.test(lineText);
              const isUrl = /https?:\/\/|www\./.test(lineText);
              
              let elementStyle = `margin: 0; padding: 0; margin-left: ${indentPx}px;`;
              let elementTag = 'p';
              let elementClass = 'cv-text';
              
              if (isHeader) {
                elementTag = 'h2';
                elementClass = 'cv-header';
                elementStyle = `
                  font-size: ${Math.max(16, maxFontSize)}px;
                  font-weight: bold;
                  color: #1a1a1a;
                  margin: 15px 0 8px ${indentPx}px;
                  padding: 0;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                `;
              } else if (isSubHeader) {
                elementTag = 'h3';
                elementClass = 'cv-subheader';
                elementStyle = `
                  font-size: ${Math.max(13, avgFontSize)}px;
                  font-weight: bold;
                  color: #2a2a2a;
                  margin: 10px 0 5px ${indentPx}px;
                  padding: 0;
                `;
              } else if (isBullet) {
                elementClass = 'cv-bullet';
                elementStyle = `
                  margin: 3px 0 3px ${indentPx + 15}px;
                  text-indent: -15px;
                  color: #333;
                  font-size: ${avgFontSize}px;
                `;
              } else if (isNumbered) {
                elementClass = 'cv-numbered';
                elementStyle = `
                  margin: 3px 0 3px ${indentPx + 20}px;
                  text-indent: -20px;
                  color: #333;
                  font-size: ${avgFontSize}px;
                `;
              } else if (isEmail || isPhone || isUrl) {
                elementClass = 'cv-contact';
                elementStyle = `
                  margin: 2px 0 2px ${indentPx}px;
                  color: #0066cc;
                  font-size: ${avgFontSize}px;
                `;
              } else {
                elementStyle = `
                  margin: 3px 0 3px ${indentPx}px;
                  color: #333;
                  font-size: ${avgFontSize}px;
                  line-height: 1.4;
                `;
              }
              
              htmlContent += `<${elementTag} class="${elementClass}" style="${elementStyle}">${lineText}</${elementTag}>`;
            });
          }
          
          htmlContent += '</div>';
          resolve(htmlContent);
        } catch (error) {
          // Fallback to plain text with basic structure
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