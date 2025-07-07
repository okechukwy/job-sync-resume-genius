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
    
    // Dynamic baseline detection - find the leftmost position of main content
    const documentLeftBase = 14; // Base margin from PDF coordinates analysis
    const actualIndent = Math.max(0, leftmostX - documentLeftBase);
    
    // Create indentation levels based on actual PDF positioning
    let indentLevel = 0;
    let finalIndent = actualIndent;
    
    if (actualIndent > 15) {
      indentLevel = Math.floor(actualIndent / 18);
      finalIndent = indentLevel * 18; // 18px per indent level
    }
    
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
    
    // Improved bullet detection logic
    const startsWithBullet = bulletChars.test(lineText);
    const hasSignificantIndent = actualIndent > 15;
    const isShortLine = lineText.length < 150;
    const notAllCaps = !/^[A-Z\s&0-9.,'-]+$/.test(lineText);
    const notHeader = !(maxFontSize > 14 && lineItems.some(item => item.fontWeight === 'bold'));
    
    // A line is a bullet if it starts with bullet char OR has indent + characteristics of bullet
    const isBullet = startsWithBullet || 
                   (hasSignificantIndent && isShortLine && notAllCaps && notHeader && !numberedLists.test(lineText));
    const isNumbered = numberedLists.test(lineText);
    
    // Enhanced header detection based on font size and formatting
    const isAllCaps = /^[A-Z\s&0-9.,'-]+$/.test(lineText) && lineText.length > 2;
    const isLargeFont = maxFontSize > 14;
    const isBoldText = lineItems.some(item => item.fontWeight === 'bold');
    const isHeader = (isAllCaps && isLargeFont) || (isBoldText && maxFontSize > 16) || (textColor !== '#000000' && isBoldText);
    const isSubHeader = (isBoldText && maxFontSize >= 12) && !isHeader && !isBullet && !isNumbered;
    
    // Debug logging
    console.log(`Line: "${lineText.slice(0, 50)}..." | Indent: ${actualIndent} | isBullet: ${isBullet} | isHeader: ${isHeader} | Color: ${textColor} | FontSize: ${maxFontSize} | Bold: ${isBoldText}`);
    
    let elementTag = 'div';
    let elementClass = 'cv-text';
    let marginTop = needsExtraSpacing ? '16px' : '2px';
    
    if (isHeader) {
      elementTag = 'div';
      elementClass = 'cv-header';
      marginTop = index > 0 ? '24px' : '0px';
    } else if (isSubHeader) {
      elementTag = 'div';
      elementClass = 'cv-subheader';
      marginTop = index > 0 ? '16px' : '8px';
    } else if (isBullet) {
      elementClass = 'cv-bullet';
      marginTop = '3px';
      finalIndent = finalIndent + 16; // Extra indent for bullets
      // Remove bullet char from text if it exists since CSS will add it
      lineText = lineText.replace(/^[•·▪▫▸▹◦‣⁃○●■□▲►▼◄♦♠♣♥★☆✓✗→←↑↓–—*+\-]\s*/, '');
    } else if (isNumbered) {
      elementClass = 'cv-numbered';
      marginTop = '3px';
    }
    
    const elementStyle = `
      margin-left: ${finalIndent}px;
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