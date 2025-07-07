import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const readPdfFile = async (file: File): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      // Extract actual visual data from PDF operations
      const documentColors: string[] = [];
      const fontFamilies: string[] = [];
      
      let htmlContent = `<div class="cv-document" style="position: relative; font-family: 'Times New Roman', serif; line-height: 1.0; color: #000000; background: #ffffff; padding: 0; margin: 0; box-sizing: border-box; min-height: 800px;">`;
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.0 });
        
        // Get both text content and drawing operations for visual data
        const textContent = await page.getTextContent();
        const operatorList = await page.getOperatorList();
        
        // Parse PDF operators to extract actual colors and visual state
        const colorState: { [key: string]: string } = {};
        let currentFillColor = '#000000';
        
        for (let opIndex = 0; opIndex < operatorList.fnArray.length; opIndex++) {
          const op = operatorList.fnArray[opIndex];
          const args = operatorList.argsArray[opIndex];
          
          // Extract actual color operations from PDF
          if (op === pdfjsLib.OPS.setFillRGBColor && args.length >= 3) {
            const [r, g, b] = args;
            currentFillColor = `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
          } else if (op === pdfjsLib.OPS.setFillGray && args.length >= 1) {
            const gray = args[0];
            const val = Math.round(gray * 255);
            currentFillColor = `rgb(${val}, ${val}, ${val})`;
          } else if (op === pdfjsLib.OPS.setFillCMYKColor && args.length >= 4) {
            // Convert CMYK to RGB approximation
            const [c, m, y, k] = args;
            const r = Math.round(255 * (1 - c) * (1 - k));
            const g = Math.round(255 * (1 - m) * (1 - k));
            const b = Math.round(255 * (1 - y) * (1 - k));
            currentFillColor = `rgb(${r}, ${g}, ${b})`;
          }
        }
        
        // Process text items with precise visual positioning
        const processedItems = textContent.items.map((item: any, index: number) => {
          const transform = item.transform;
          const x = Math.round(transform[4]);
          const y = Math.round(viewport.height - transform[5]);
          const fontSize = Math.round(Math.abs(transform[3]));
          
          // Extract precise font information
          const fontName = item.fontName || 'Times-Roman';
          let fontFamily = 'Times New Roman, serif';
          let fontWeight = 'normal';
          let fontStyle = 'normal';
          
          if (fontName.includes('Arial') || fontName.includes('Helvetica')) {
            fontFamily = 'Arial, sans-serif';
          } else if (fontName.includes('Calibri')) {
            fontFamily = 'Calibri, sans-serif';
          } else if (fontName.includes('Verdana')) {
            fontFamily = 'Verdana, sans-serif';
          }
          
          if (fontName.includes('Bold')) fontWeight = 'bold';
          if (fontName.includes('Italic') || fontName.includes('Oblique')) fontStyle = 'italic';
          
          // Use extracted color or fall back to current fill color
          const textColor = item.color || currentFillColor;
          
          // Store unique colors and fonts
          if (textColor && !documentColors.includes(textColor)) {
            documentColors.push(textColor);
          }
          if (fontFamily && !fontFamilies.includes(fontFamily)) {
            fontFamilies.push(fontFamily);
          }
          
          return {
            ...item,
            x,
            y,
            fontSize,
            fontFamily,
            fontWeight,
            fontStyle,
            color: textColor,
            width: item.width || 0,
            height: fontSize
          };
        });
        
        // Group items by precise Y coordinates (within 2px tolerance)
        const lineGroups: { [key: number]: any[] } = {};
        processedItems.forEach((item: any) => {
          const tolerance = 2;
          let matchingY = Object.keys(lineGroups)
            .map(Number)
            .find(y => Math.abs(y - item.y) <= tolerance);
          
          if (!matchingY) {
            matchingY = item.y;
            lineGroups[matchingY] = [];
          }
          
          lineGroups[matchingY].push(item);
        });
        
        // Process lines with exact positioning and spacing
        const sortedLines = Object.keys(lineGroups)
          .map(Number)
          .sort((a, b) => a - b);
        
        sortedLines.forEach((yPos, lineIndex) => {
          const lineItems = lineGroups[yPos].sort((a, b) => a.x - b.x);
          
          if (lineItems.length === 0) return;
          
          // Calculate precise measurements from PDF coordinates
          const leftmostX = Math.min(...lineItems.map(item => item.x));
          const maxFontSize = Math.max(...lineItems.map(item => item.fontSize));
          const avgFontSize = lineItems.reduce((sum, item) => sum + item.fontSize, 0) / lineItems.length;
          
          // Precise indentation - use actual PDF coordinates
          const baseLeftMargin = 72; // Standard 1 inch PDF margin
          const exactIndent = Math.max(0, leftmostX - baseLeftMargin);
          
          // Build line text preserving exact spacing
          let lineText = '';
          let lastEndX = leftmostX;
          
          lineItems.forEach((item, index) => {
            const gap = item.x - lastEndX;
            if (index > 0 && gap > 3) {
              // Convert pixel gap to spaces (approximately 4px per space)
              const spaceCount = Math.round(gap / 4);
              lineText += ' '.repeat(Math.min(spaceCount, 15));
            }
            lineText += item.str;
            lastEndX = item.x + item.width;
          });
          
          lineText = lineText.trim();
          if (!lineText) return;
          
          // Get dominant styling from largest font item
          const dominantItem = lineItems.reduce((prev, current) => 
            current.fontSize > prev.fontSize ? current : prev
          );
          
          // Enhanced content type detection
          const bulletChars = /^[•·▪▫▸▹◦‣⁃○●■□▲►▼◄♦♠♣♥★☆✓✗→←↑↓–—*+\-]\s*/;
          const numberedLists = /^(\d+[.)]\s+|[a-zA-Z][.)]\s+|[ivxlcdm]+[.)]\s+)/i;
          
          const isBullet = bulletChars.test(lineText) || 
                         (exactIndent > 20 && !numberedLists.test(lineText));
          const isNumbered = numberedLists.test(lineText);
          
          // Enhanced header detection based on font size and formatting
          const isAllCaps = /^[A-Z\s&0-9.,'-]+$/.test(lineText) && lineText.length > 2;
          const isLargeFont = maxFontSize > avgFontSize * 1.5;
          const isBoldText = lineItems.some(item => item.fontWeight === 'bold');
          const isHeader = (isAllCaps && maxFontSize > 14) || (isBoldText && maxFontSize > 16);
          const isSubHeader = (isBoldText && maxFontSize > 12) && !isHeader && !isBullet && !isNumbered;
          
          // Apply exact styling from PDF
          const textColor = dominantItem.color;
          const fontFamily = dominantItem.fontFamily;
          const fontWeight = dominantItem.fontWeight;
          const fontStyle = dominantItem.fontStyle;
          
          let elementTag = 'p';
          let elementClass = 'cv-text';
          let elementStyle = '';
          
          if (isHeader) {
            elementTag = 'h1';
            elementClass = 'cv-header';
            elementStyle = `
              position: absolute;
              left: ${exactIndent}px;
              top: ${yPos}px;
              font-size: ${maxFontSize}px;
              font-weight: bold;
              font-family: ${fontFamily};
              color: ${textColor};
              margin: 0;
              padding: 0;
              line-height: 1.0;
              white-space: pre;
            `;
          } else if (isSubHeader) {
            elementTag = 'h2';
            elementClass = 'cv-subheader';
            elementStyle = `
              position: absolute;
              left: ${exactIndent}px;
              top: ${yPos}px;
              font-size: ${maxFontSize}px;
              font-weight: ${fontWeight};
              font-style: ${fontStyle};
              font-family: ${fontFamily};
              color: ${textColor};
              margin: 0;
              padding: 0;
              line-height: 1.0;
              white-space: pre;
            `;
          } else if (isBullet) {
            elementClass = 'cv-bullet';
            elementStyle = `
              position: absolute;
              left: ${exactIndent}px;
              top: ${yPos}px;
              font-size: ${avgFontSize}px;
              font-weight: ${fontWeight};
              font-style: ${fontStyle};
              font-family: ${fontFamily};
              color: ${textColor};
              margin: 0;
              padding: 0;
              line-height: 1.0;
              white-space: pre;
            `;
          } else if (isNumbered) {
            elementClass = 'cv-numbered';
            elementStyle = `
              position: absolute;
              left: ${exactIndent}px;
              top: ${yPos}px;
              font-size: ${avgFontSize}px;
              font-weight: ${fontWeight};
              font-style: ${fontStyle};
              font-family: ${fontFamily};
              color: ${textColor};
              margin: 0;
              padding: 0;
              line-height: 1.0;
              white-space: pre;
            `;
          } else {
            elementStyle = `
              position: absolute;
              left: ${exactIndent}px;
              top: ${yPos}px;
              font-size: ${avgFontSize}px;
              font-weight: ${fontWeight};
              font-style: ${fontStyle};
              font-family: ${fontFamily};
              color: ${textColor};
              margin: 0;
              padding: 0;
              line-height: 1.0;
              white-space: pre;
            `;
          }
          
          htmlContent += `<${elementTag} class="${elementClass}" style="${elementStyle}">${lineText}</${elementTag}>`;
        });
      }
      
      htmlContent += '</div>';
      resolve(htmlContent);
    } catch (error) {
      // Fallback to basic text extraction
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
};