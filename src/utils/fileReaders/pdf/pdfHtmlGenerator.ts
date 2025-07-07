import { ProcessedTextItem } from './pdfTextProcessor';

export const generateHtmlContent = (lineGroups: { [key: number]: ProcessedTextItem[] }): string => {
  let htmlContent = `<div class="cv-document" style="position: relative; font-family: 'Times New Roman', serif; line-height: 1.0; color: #000000; background: #ffffff; padding: 0; margin: 0; box-sizing: border-box; min-height: 800px;">`;
  
  const sortedLines = Object.keys(lineGroups)
    .map(Number)
    .sort((a, b) => a - b);
  
  sortedLines.forEach((yPos) => {
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
  
  htmlContent += '</div>';
  return htmlContent;
};