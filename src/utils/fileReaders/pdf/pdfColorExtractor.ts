import { pdfjsLib } from './pdfConfig';

export const extractColorsFromOperators = (operatorList: any): string => {
  let currentFillColor = '#000000';
  const colorMap: string[] = [];
  
  for (let opIndex = 0; opIndex < operatorList.fnArray.length; opIndex++) {
    const op = operatorList.fnArray[opIndex];
    const args = operatorList.argsArray[opIndex];
    
    // Extract actual color operations from PDF
    if (op === pdfjsLib.OPS.setFillRGBColor && args.length >= 3) {
      const [r, g, b] = args;
      currentFillColor = `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
      colorMap.push(currentFillColor);
    } else if (op === pdfjsLib.OPS.setFillGray && args.length >= 1) {
      const gray = args[0];
      const val = Math.round(gray * 255);
      currentFillColor = `rgb(${val}, ${val}, ${val})`;
      colorMap.push(currentFillColor);
    } else if (op === pdfjsLib.OPS.setFillCMYKColor && args.length >= 4) {
      // Convert CMYK to RGB approximation
      const [c, m, y, k] = args;
      const r = Math.round(255 * (1 - c) * (1 - k));
      const g = Math.round(255 * (1 - m) * (1 - k));
      const b = Math.round(255 * (1 - y) * (1 - k));
      currentFillColor = `rgb(${r}, ${g}, ${b})`;
      colorMap.push(currentFillColor);
    }
  }
  
  // Debug color extraction
  console.log('Extracted colors:', colorMap);
  
  return currentFillColor;
};