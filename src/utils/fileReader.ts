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
      // Handle PDF files with comprehensive visual preservation
      return new Promise(async (resolve, reject) => {
        try {
          const arrayBuffer = await file.arrayBuffer();
          const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
          
          // Extract color palette and visual metadata
          const documentColors: string[] = [];
          const fontFamilies: string[] = [];
          
          let htmlContent = `
            <div class="cv-document" style="
              font-family: 'Times New Roman', serif;
              line-height: 1.2;
              color: #000000;
              background: #ffffff;
              padding: 24px;
              max-width: 8.5in;
              margin: 0 auto;
              box-sizing: border-box;
            ">`;
          
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const viewport = page.getViewport({ scale: 1.0 });
            
            // Enhanced text item processing with visual data
            const enrichedItems = content.items.map((item: any) => {
              const fontName = item.fontName || 'Times-Roman';
              const fontSize = item.height || 12;
              const color = item.color || '#000000';
              
              // Extract font family from font name
              let fontFamily = 'Times New Roman, serif';
              if (fontName.includes('Arial') || fontName.includes('Helvetica')) {
                fontFamily = 'Arial, sans-serif';
              } else if (fontName.includes('Calibri')) {
                fontFamily = 'Calibri, sans-serif';
              } else if (fontName.includes('Verdana')) {
                fontFamily = 'Verdana, sans-serif';
              }
              
              // Store unique colors and fonts
              if (color && !documentColors.includes(color)) {
                documentColors.push(color);
              }
              if (fontFamily && !fontFamilies.includes(fontFamily)) {
                fontFamilies.push(fontFamily);
              }
              
              return {
                ...item,
                x: item.transform[4],
                y: Math.round(viewport.height - item.transform[5]),
                width: item.width,
                height: fontSize,
                fontSize,
                fontFamily,
                color,
                isBold: fontName.includes('Bold'),
                isItalic: fontName.includes('Italic') || fontName.includes('Oblique')
              };
            });
            
            // Group by Y position with tighter tolerance for better line detection
            const lineGroups: { [key: number]: any[] } = {};
            enrichedItems.forEach((item: any) => {
              const tolerance = Math.max(1, item.fontSize * 0.1);
              let matchingY = Object.keys(lineGroups)
                .map(Number)
                .find(y => Math.abs(y - item.y) <= tolerance);
              
              if (!matchingY) {
                matchingY = item.y;
                lineGroups[matchingY] = [];
              }
              
              lineGroups[matchingY].push(item);
            });
            
            // Process lines in order from top to bottom
            const sortedLines = Object.keys(lineGroups)
              .map(Number)
              .sort((a, b) => a - b);
            
            let previousY = 0;
            
            sortedLines.forEach((yPos, lineIndex) => {
              const lineItems = lineGroups[yPos].sort((a, b) => a.x - b.x);
              
              if (lineItems.length === 0) return;
              
              // Calculate precise indentation from leftmost item
              const firstX = lineItems[0].x;
              const pageMargin = 72; // Standard 1 inch margin in PDF points
              const relativeIndent = Math.max(0, firstX - pageMargin);
              const indentLevel = Math.round(relativeIndent / 36); // 0.5 inch increments
              const indentPx = indentLevel * 24;
              
              // Calculate line spacing
              const lineSpacing = lineIndex > 0 ? Math.max(0, yPos - previousY) : 0;
              const extraSpacing = lineSpacing > 20 ? Math.floor(lineSpacing / 10) * 2 : 0;
              
              // Determine font properties from dominant item
              const dominantItem = lineItems.reduce((prev, current) => 
                current.fontSize > prev.fontSize ? current : prev
              );
              
              const avgFontSize = lineItems.reduce((sum, item) => sum + item.fontSize, 0) / lineItems.length;
              const maxFontSize = Math.max(...lineItems.map(item => item.fontSize));
              
              // Build line text with precise spacing preservation
              let lineText = '';
              let lastEndX = lineItems[0].x;
              
              lineItems.forEach((item, index) => {
                if (index > 0) {
                  const gap = item.x - lastEndX;
                  if (gap > 8) {
                    const spaceCount = Math.round(gap / 4);
                    lineText += ' '.repeat(Math.min(spaceCount, 10));
                  } else if (gap > 3) {
                    lineText += ' ';
                  }
                }
                lineText += item.str;
                lastEndX = item.x + item.width;
              });
              
              lineText = lineText.trim();
              if (!lineText) return;
              
              // Enhanced content type detection
              const bulletChars = /^[•·▪▫▸▹◦‣⁃○●■□▲►▼◄♦♠♣♥★☆✓✗→←↑↓]\s*/;
              const dashBullets = /^[-–—*+]\s+/;
              const numberedLists = /^(\d+[.)]\s+|[a-zA-Z][.)]\s+|[ivxlcdm]+[.)]\s+)/i;
              const romanNumerals = /^[ivxlcdm]+[.)]\s+/i;
              
              const isBullet = bulletChars.test(lineText) || 
                             dashBullets.test(lineText) ||
                             (indentLevel > 0 && lineText.length > 0 && /^[^\w]/.test(lineText));
              
              const isNumbered = numberedLists.test(lineText);
              const isRomanNumeral = romanNumerals.test(lineText);
              
              // Enhanced header detection
              const isAllCaps = /^[A-Z\s&0-9.,'-]+$/.test(lineText) && lineText.length > 2;
              const isLargeFont = maxFontSize > avgFontSize * 1.2;
              const isBoldText = lineItems.some(item => item.isBold);
              const isHeader = (isAllCaps && isBoldText) || (isLargeFont && maxFontSize > 14);
              const isSubHeader = (isBoldText && maxFontSize > avgFontSize) && !isHeader && !isBullet && !isNumbered;
              
              // Contact information detection
              const isEmail = /@\w+\.\w+/.test(lineText);
              const isPhone = /(\+?1[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}/.test(lineText);
              const isUrl = /https?:\/\/[\w.-]+|www\.[\w.-]+/.test(lineText);
              const isAddress = /\d+\s+[\w\s]+,\s*[\w\s]+,?\s*[A-Z]{2}\s*\d{5}/.test(lineText);
              
              // Apply colors from original document
              const textColor = dominantItem.color || '#000000';
              const fontFamily = dominantItem.fontFamily || 'Times New Roman, serif';
              const fontWeight = dominantItem.isBold ? 'bold' : 'normal';
              const fontStyle = dominantItem.isItalic ? 'italic' : 'normal';
              
              let elementTag = 'p';
              let elementClass = 'cv-text';
              let elementStyle = '';
              
              if (isHeader) {
                elementTag = 'h1';
                elementClass = 'cv-header';
                elementStyle = `
                  font-size: ${Math.max(18, maxFontSize * 1.1)}px;
                  font-weight: bold;
                  color: ${textColor};
                  font-family: ${fontFamily};
                  margin: ${20 + extraSpacing}px 0 12px ${indentPx}px;
                  padding: 0;
                  text-transform: ${isAllCaps ? 'uppercase' : 'none'};
                  letter-spacing: ${isAllCaps ? '1px' : '0'};
                  line-height: 1.2;
                `;
              } else if (isSubHeader) {
                elementTag = 'h2';
                elementClass = 'cv-subheader';
                elementStyle = `
                  font-size: ${Math.max(14, maxFontSize)}px;
                  font-weight: ${fontWeight};
                  font-style: ${fontStyle};
                  color: ${textColor};
                  font-family: ${fontFamily};
                  margin: ${12 + extraSpacing}px 0 6px ${indentPx}px;
                  padding: 0;
                  line-height: 1.3;
                `;
              } else if (isBullet) {
                elementClass = 'cv-bullet';
                const bulletMatch = lineText.match(bulletChars) || lineText.match(dashBullets);
                const bulletChar = bulletMatch ? bulletMatch[0].trim() : '•';
                const bulletContent = lineText.replace(/^[•·▪▫▸▹◦‣⁃○●■□▲►▼◄♦♠♣♥★☆✓✗→←↑↓–—*+-]\s*/, '');
                
                elementStyle = `
                  position: relative;
                  margin: ${4 + extraSpacing}px 0 4px ${indentPx + 24}px;
                  padding-left: 0;
                  font-size: ${avgFontSize}px;
                  font-weight: ${fontWeight};
                  font-style: ${fontStyle};
                  color: ${textColor};
                  font-family: ${fontFamily};
                  line-height: 1.4;
                `;
                
                lineText = `<span style="position: absolute; left: -20px; color: ${textColor};">${bulletChar}</span>${bulletContent}`;
              } else if (isNumbered || isRomanNumeral) {
                elementClass = 'cv-numbered';
                elementStyle = `
                  margin: ${4 + extraSpacing}px 0 4px ${indentPx + 32}px;
                  text-indent: -28px;
                  font-size: ${avgFontSize}px;
                  font-weight: ${fontWeight};
                  font-style: ${fontStyle};
                  color: ${textColor};
                  font-family: ${fontFamily};
                  line-height: 1.4;
                `;
              } else if (isEmail || isPhone || isUrl || isAddress) {
                elementClass = 'cv-contact';
                elementStyle = `
                  margin: ${2 + extraSpacing}px 0 2px ${indentPx}px;
                  font-size: ${avgFontSize}px;
                  font-weight: ${fontWeight};
                  font-style: ${fontStyle};
                  color: ${isEmail || isUrl ? '#0066cc' : textColor};
                  font-family: ${fontFamily};
                  line-height: 1.3;
                `;
              } else {
                elementStyle = `
                  margin: ${4 + extraSpacing}px 0 4px ${indentPx}px;
                  font-size: ${avgFontSize}px;
                  font-weight: ${fontWeight};
                  font-style: ${fontStyle};
                  color: ${textColor};
                  font-family: ${fontFamily};
                  line-height: 1.5;
                `;
              }
              
              htmlContent += `<${elementTag} class="${elementClass}" style="${elementStyle}">${lineText}</${elementTag}>`;
              previousY = yPos;
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