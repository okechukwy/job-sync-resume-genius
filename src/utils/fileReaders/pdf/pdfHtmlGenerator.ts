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
    
    // Analyze font sizes to determine spacing context
    const avgFontSize = lineItems.reduce((sum, item) => sum + item.fontSize, 0) / lineItems.length;
    const maxFontSize = Math.max(...lineItems.map(item => item.fontSize));
    
    // Dynamic gap detection based on font size and content
    const isLargeGap = lineSpacing > (avgFontSize * 2.5); // Major section breaks
    const isMediumGap = lineSpacing > (avgFontSize * 1.8); // Paragraph breaks
    const isSmallGap = lineSpacing > (avgFontSize * 0.8); // Line breaks within paragraphs
    
    // Calculate precise measurements from PDF coordinates
    const leftmostX = Math.min(...lineItems.map(item => item.x));
    
    // Use the actual document baseline for precise indentation
    const actualIndent = Math.max(0, leftmostX - documentLeftBase);
    
    // Improved indentation logic with better level detection
    let indentLevel = 0;
    let finalIndent = actualIndent;
    
    // More precise indentation categorization
    if (actualIndent > 3) {
      // Calculate indent level based on common PDF spacing patterns
      if (actualIndent < 15) {
        indentLevel = 0;
        finalIndent = 0; // Main content
      } else if (actualIndent < 35) {
        indentLevel = 1;
        finalIndent = 20; // First level indent
      } else if (actualIndent < 55) {
        indentLevel = 2;
        finalIndent = 40; // Second level indent
      } else if (actualIndent < 75) {
        indentLevel = 3;
        finalIndent = 60; // Third level indent
      } else {
        indentLevel = Math.floor(actualIndent / 20);
        finalIndent = Math.min(indentLevel * 20, 100); // Cap at 100px
      }
    }
    
    // Build line text preserving exact spacing and formatting
    let lineText = '';
    let lastEndX = leftmostX;
    let hasMultipleColors = false;
    const firstItemColor = lineItems[0]?.color || '#000000';
    
    lineItems.forEach((item, itemIndex) => {
      const gap = item.x - lastEndX;
      
      // Improved spacing logic for better text formatting
      if (itemIndex > 0 && gap > 2) {
        // Calculate spaces based on font size and gap
        const avgCharWidth = avgFontSize * 0.6; // Approximate character width
        const spaceCount = Math.round(gap / avgCharWidth);
        
        // Apply spacing rules
        if (gap > avgCharWidth * 3) {
          // Large gap - likely a tab or major spacing
          lineText += '\t';
        } else if (spaceCount > 0) {
          // Normal spacing between words
          lineText += ' '.repeat(Math.min(spaceCount, 8));
        }
      }
      
      // Check for color changes within the line
      if (item.color !== firstItemColor) {
        hasMultipleColors = true;
      }
      
      // Clean up text content
      let itemText = item.str;
      // Remove extra whitespace but preserve intentional spacing
      itemText = itemText.replace(/\s+/g, ' ');
      
      lineText += itemText;
      lastEndX = item.x + item.width;
    });
    
    // Clean up the final line text
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
    
    // Enhanced spacing logic based on content analysis and gaps
    if (isLargeGap) {
      marginTop = '20px'; // Major section breaks
    } else if (isMediumGap) {
      marginTop = '12px'; // Paragraph breaks
    } else if (isSmallGap) {
      marginTop = '6px'; // Line breaks within content
    } else if (index > 0) {
      marginTop = '2px'; // Tight line spacing
    } else {
      marginTop = '0px'; // First line
    }
    
    // Apply content-specific spacing adjustments
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