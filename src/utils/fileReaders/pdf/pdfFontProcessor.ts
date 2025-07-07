export interface FontInfo {
  fontFamily: string;
  fontWeight: string;
  fontStyle: string;
}

export const processFontName = (fontName: string): FontInfo => {
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
  
  return { fontFamily, fontWeight, fontStyle };
};