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
    
    return {
      str: item.str,
      x,
      y,
      fontSize,
      fontFamily,
      fontWeight,
      fontStyle,
      color: normalizedColor,
      width: item.width || 0,
      height: fontSize
    };
  });
};

export const groupItemsByLines = (items: ProcessedTextItem[]): { [key: number]: ProcessedTextItem[] } => {
  const lineGroups: { [key: number]: ProcessedTextItem[] } = {};
  
  items.forEach((item) => {
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
  
  return lineGroups;
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