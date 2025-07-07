import { ProcessedTextItem } from './pdfTextProcessor';

export const generateHtmlContent = (lineGroups: { [key: number]: ProcessedTextItem[] }): string => {
  const sortedLines = Object.keys(lineGroups)
    .map(Number)
    .sort((a, b) => a - b);
  
  // Analyze document structure first
  const documentLeftBase = Math.min(...sortedLines.map(yPos => 
    Math.min(...lineGroups[yPos].map(item => item.x))
  ));
  
  console.log('Document analysis:', { documentLeftBase, totalLines: sortedLines.length });
  
  let htmlContent = `<div class="cv-document">`;
  let lastYPos = 0;
  
  sortedLines.forEach((yPos, index) => {
    const lineItems = lineGroups[yPos].sort((a, b) => a.x - b.x);
    
    if (lineItems.length === 0) return;
    
    // Calculate spacing between lines for proper paragraph breaks
    const lineSpacing = index > 0 ? Math.abs(yPos - lastYPos) : 0;
    const isLargeGap = lineSpacing > 25; // Major section breaks
    const isMediumGap = lineSpacing > 15; // Paragraph breaks
    
    // Calculate precise measurements from PDF coordinates
    const leftmostX = Math.min(...lineItems.map(item => item.x));
    const maxFontSize = Math.max(...lineItems.map(item => item.fontSize));
    const avgFontSize = lineItems.reduce((sum, item) => sum + item.fontSize, 0) / lineItems.length;
    
    // Use the actual document baseline for precise indentation
    const actualIndent = Math.max(0, leftmostX - documentLeftBase);
    
    // Create precise indentation levels
    let indentLevel = 0;
    let finalIndent = actualIndent;
    
    // Categorize indentation levels based on actual PDF positioning
    if (actualIndent > 5) {
      if (actualIndent < 25) {
        indentLevel = 1;
        finalIndent = 20; // First level indent
      } else if (actualIndent < 45) {
        indentLevel = 2;
        finalIndent = 40; // Second level indent
      } else {
        indentLevel = Math.floor(actualIndent / 20);
        finalIndent = indentLevel * 20;
      }
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
    
    // More aggressive bullet detection for better results
    const startsWithBullet = bulletChars.test(lineText);
    const hasListKeywords = /^(Testing Tools|Tech Skills|Programming Languages|Methodologies|Areas of Expertise)/i.test(lineText);
    const isListItem = !hasListKeywords && actualIndent > 5 && !lineText.includes(':') && lineText.length < 300;
    const notAllCaps = !/^[A-Z\s&0-9.,'-]+$/.test(lineText);
    const notHeader = !(maxFontSize > 13 && lineItems.some(item => item.fontWeight === 'bold'));
    const isAfterListHeader = index > 0 && hasListKeywords;
    
    // Enhanced bullet detection - much more aggressive for CV content
    const structuralBullet = (isListItem && notAllCaps && notHeader) || 
                           (actualIndent > 5 && !lineText.includes(':') && lineText.split(',').length > 3);
    const isBullet = startsWithBullet || (structuralBullet && !numberedLists.test(lineText));
    const isNumbered = numberedLists.test(lineText);
    
    // Enhanced header detection based on font size and formatting
    const isAllCaps = /^[A-Z\s&0-9.,'-]+$/.test(lineText) && lineText.length > 2;
    const isLargeFont = maxFontSize > 14;
    const isBoldText = lineItems.some(item => item.fontWeight === 'bold');
    const isHeader = (isAllCaps && isLargeFont) || (isBoldText && maxFontSize > 16) || (textColor !== '#000000' && isBoldText);
    const isSubHeader = (isBoldText && maxFontSize >= 12) && !isHeader && !isBullet && !isNumbered;
    
    // Enhanced debug logging
    console.log(`Line ${index}: "${lineText.slice(0, 30)}..." | ActualIndent: ${actualIndent} | FinalIndent: ${finalIndent} | IndentLevel: ${indentLevel} | isBullet: ${isBullet} | isHeader: ${isHeader} | isSubHeader: ${isSubHeader} | FontSize: ${maxFontSize} | Bold: ${isBoldText} | Gap: ${lineSpacing}`);
    
    // Determine element type and spacing
    let elementTag = 'div';
    let elementClass = 'cv-text';
    let marginTop = '2px';
    
    // Set spacing based on gap analysis
    if (isLargeGap) {
      marginTop = '24px'; // Major section breaks
    } else if (isMediumGap) {
      marginTop = '12px'; // Paragraph breaks
    } else if (index > 0) {
      marginTop = '3px'; // Normal line spacing
    } else {
      marginTop = '0px'; // First line
    }
    
    if (isHeader) {
      elementClass = 'cv-header';
      marginTop = index > 0 ? '24px' : '0px';
    } else if (isSubHeader) {
      elementClass = 'cv-subheader';
      marginTop = index > 0 ? '16px' : '8px';
    } else if (isBullet) {
      elementClass = 'cv-bullet';
      marginTop = indentLevel > 0 ? '3px' : '6px';
      // For bullets, use minimal indentation since CSS handles the positioning
      finalIndent = Math.min(finalIndent, 40); // Cap bullet indentation
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
      display: block;
    `;
    
    htmlContent += `<${elementTag} class="${elementClass}" style="${elementStyle}">${lineText}</${elementTag}>`;
    lastYPos = yPos;
  });
  
  htmlContent += '</div>';
  console.log('Generated HTML structure:', htmlContent.slice(0, 500) + '...');
  return htmlContent;
};