import { processFontName } from './pdfFontProcessor';

export interface ProcessedTextItem {
  str: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  fontWeight: string;
  fontStyle: string;
  color: string;
  width: number;
  height: number;
}

export const processTextItems = (
  textContent: any,
  viewport: any,
  currentFillColor: string,
  documentColors: string[],
  fontFamilies: string[]
): ProcessedTextItem[] => {
  return textContent.items.map((item: any) => {
    const transform = item.transform;
    const x = Math.round(transform[4]);
    const y = Math.round(viewport.height - transform[5]);
    const fontSize = Math.round(Math.abs(transform[3]));
    
    // Extract precise font information
    const fontName = item.fontName || 'Times-Roman';
    const { fontFamily, fontWeight, fontStyle } = processFontName(fontName);
    
    // Use extracted color or fall back to current fill color
    const textColor = item.color || currentFillColor || '#000000';
    
    // Convert rgb to hex for consistency
    const normalizedColor = textColor.startsWith('rgb') ? rgbToHex(textColor) : textColor;
    
    // Store unique colors and fonts
    if (textColor && !documentColors.includes(textColor)) {
      documentColors.push(textColor);
    }
    if (fontFamily && !fontFamilies.includes(fontFamily)) {
      fontFamilies.push(fontFamily);
    }
    
    // Clean and normalize text content
    let cleanedText = item.str;
    
    // Handle special characters and whitespace
    cleanedText = cleanedText
      .replace(/\u00A0/g, ' ') // Replace non-breaking spaces
      .replace(/\u2000-\u200F/g, ' ') // Replace various unicode spaces
      .replace(/\u2028/g, '\n') // Line separator
      .replace(/\u2029/g, '\n') // Paragraph separator
      .replace(/[\u0000-\u001F\u007F]/g, '') // Remove control characters
      .trim();
    
    // Calculate accurate width based on text and font
    const estimatedWidth = cleanedText.length * fontSize * 0.6; // Rough character width estimation
    const actualWidth = item.width || estimatedWidth;
    
    return {
      str: cleanedText,
      x,
      y,
      fontSize,
      fontFamily,
      fontWeight,
      fontStyle,
      color: normalizedColor,
      width: actualWidth,
      height: fontSize
    };
  }).filter(item => item.str.length > 0); // Filter out empty text items
};

export const groupItemsByLines = (items: ProcessedTextItem[]): { [key: number]: ProcessedTextItem[] } => {
  const lineGroups: { [key: number]: ProcessedTextItem[] } = {};
  
  // Sort items by Y position first to ensure proper processing order
  const sortedItems = items.sort((a, b) => a.y - b.y);
  
  sortedItems.forEach((item) => {
    // Use dynamic tolerance based on font size for better line detection
    const tolerance = Math.max(2, item.fontSize * 0.3);
    let matchingY = Object.keys(lineGroups)
      .map(Number)
      .find(y => Math.abs(y - item.y) <= tolerance);
    
    if (!matchingY) {
      matchingY = item.y;
      lineGroups[matchingY] = [];
    }
    
    lineGroups[matchingY].push(item);
  });
  
  // Post-process to merge lines that are very close together
  const processedGroups: { [key: number]: ProcessedTextItem[] } = {};
  const yPositions = Object.keys(lineGroups).map(Number).sort((a, b) => a - b);
  
  for (let i = 0; i < yPositions.length; i++) {
    const currentY = yPositions[i];
    const currentItems = lineGroups[currentY];
    
    // Check if this line should be merged with the previous one
    if (i > 0) {
      const prevY = yPositions[i - 1];
      const gap = Math.abs(currentY - prevY);
      const avgFontSize = currentItems.reduce((sum, item) => sum + item.fontSize, 0) / currentItems.length;
      
      // If lines are very close (less than half the font size), merge them
      if (gap < avgFontSize * 0.6 && processedGroups[prevY]) {
        processedGroups[prevY] = [...processedGroups[prevY], ...currentItems];
        continue;
      }
    }
    
    processedGroups[currentY] = currentItems;
  }
  
  return processedGroups;
};

// Helper function to convert rgb to hex
const rgbToHex = (rgb: string): string => {
  const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!match) return rgb;
  
  const [, r, g, b] = match;
  const toHex = (n: string) => {
    const hex = parseInt(n, 10).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};