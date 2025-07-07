import { ProcessedTextItem } from './pdfTextProcessor';

export const generateHtmlContent = (lineGroups: { [key: number]: ProcessedTextItem[] }): string => {
  let htmlContent = `<div class="cv-document" style="position: relative; font-family: 'Times New Roman', serif; line-height: 1.4; color: #000000; background: #ffffff; padding: 20px; margin: 0; box-sizing: border-box; min-height: 800px;">`;
  
  const sortedLines = Object.keys(lineGroups)
    .map(Number)
    .sort((a, b) => a - b);
  
  let lastYPos = 0;
  
  sortedLines.forEach((yPos, index) => {
    const lineItems = lineGroups[yPos].sort((a, b) => a.x - b.x);
    
    if (lineItems.length === 0) return;
    
    // Calculate spacing between lines
    const lineSpacing = index > 0 ? Math.abs(yPos - lastYPos) : 0;
    const needsExtraSpacing = lineSpacing > 20; // Detect paragraph breaks
    
    // Calculate precise measurements from PDF coordinates
    const leftmostX = Math.min(...lineItems.map(item => item.x));
    const maxFontSize = Math.max(...lineItems.map(item => item.fontSize));
    const avgFontSize = lineItems.reduce((sum, item) => sum + item.fontSize, 0) / lineItems.length;
    
    // Precise indentation - use actual PDF coordinates
    const baseLeftMargin = 50; // Adjusted base margin
    const exactIndent = Math.max(0, leftmostX - baseLeftMargin);
    
    // Build line text preserving exact spacing and formatting
    let lineText = '';
    let lastEndX = leftmostX;
    let hasMultipleColors = false;
    const firstItemColor = lineItems[0]?.color || '#000000';
    
    lineItems.forEach((item, itemIndex) => {
      const gap = item.x - lastEndX;
      if (itemIndex > 0 && gap > 3) {
        // Convert pixel gap to spaces
        const spaceCount = Math.round(gap / 4);
        lineText += ' '.repeat(Math.min(spaceCount, 15));
      }
      
      // Check for color changes within the line
      if (item.color !== firstItemColor) {
        hasMultipleColors = true;
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
    
    // Apply exact styling from PDF with proper spacing
    const textColor = dominantItem.color;
    const fontFamily = dominantItem.fontFamily;
    const fontWeight = dominantItem.fontWeight;
    const fontStyle = dominantItem.fontStyle;
    
    // Enhanced content type detection with better bullet recognition
    const bulletChars = /^[•·▪▫▸▹◦‣⁃○●■□▲►▼◄♦♠♣♥★☆✓✗→←↑↓–—*+\-]\s*/;
    const numberedLists = /^(\d+[.)]\s+|[a-zA-Z][.)]\s+|[ivxlcdm]+[.)]\s+)/i;
    
    // Better bullet detection - check for indentation and bullet patterns
    const isBullet = bulletChars.test(lineText) || 
                   (exactIndent > 15 && lineText.length > 3 && !numberedLists.test(lineText) && !lineText.match(/^[A-Z][A-Z\s&]+$/));
    const isNumbered = numberedLists.test(lineText);
    
    // Enhanced header detection based on font size and formatting
    const isAllCaps = /^[A-Z\s&0-9.,'-]+$/.test(lineText) && lineText.length > 2;
    const isLargeFont = maxFontSize > 14;
    const isBoldText = lineItems.some(item => item.fontWeight === 'bold');
    const isHeader = (isAllCaps && isLargeFont) || (isBoldText && maxFontSize > 16) || (textColor !== '#000000' && isBoldText);
    const isSubHeader = (isBoldText && maxFontSize >= 12) && !isHeader && !isBullet && !isNumbered;
    
    let elementTag = 'div';
    let elementClass = 'cv-text';
    let marginTop = needsExtraSpacing ? '16px' : '0px';
    
    if (isHeader) {
      elementTag = 'div';
      elementClass = 'cv-header';
      marginTop = index > 0 ? '20px' : '0px';
    } else if (isSubHeader) {
      elementTag = 'div';
      elementClass = 'cv-subheader';
      marginTop = index > 0 ? '12px' : '0px';
    } else if (isBullet) {
      elementClass = 'cv-bullet';
      marginTop = '4px';
    } else if (isNumbered) {
      elementClass = 'cv-numbered';
      marginTop = '4px';
    }
    
    const elementStyle = `
      margin-left: ${exactIndent}px;
      margin-top: ${marginTop};
      font-size: ${avgFontSize}px;
      font-weight: ${fontWeight};
      font-style: ${fontStyle};
      font-family: ${fontFamily};
      color: ${textColor};
      line-height: 1.3;
      white-space: pre-wrap;
    `;
    
    htmlContent += `<${elementTag} class="${elementClass}" style="${elementStyle}">${lineText}</${elementTag}>`;
    lastYPos = yPos;
  });
  
  htmlContent += '</div>';
  return htmlContent;
};