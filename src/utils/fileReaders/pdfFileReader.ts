import { pdfjsLib } from './pdf/pdfConfig';
import { extractColorsFromOperators } from './pdf/pdfColorExtractor';
import { processTextItems, groupItemsByLines } from './pdf/pdfTextProcessor';
import { generateHtmlContent } from './pdf/pdfHtmlGenerator';

export const readPdfFile = async (file: File): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      // Extract actual visual data from PDF operations
      const documentColors: string[] = [];
      const fontFamilies: string[] = [];
      
      let htmlContent = '';
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.0 });
        
        // Get both text content and drawing operations for visual data
        const textContent = await page.getTextContent();
        const operatorList = await page.getOperatorList();
        
        // Parse PDF operators to extract actual colors and visual state
        const currentFillColor = extractColorsFromOperators(operatorList);
        
        // Process text items with precise visual positioning
        const processedItems = processTextItems(
          textContent,
          viewport,
          currentFillColor,
          documentColors,
          fontFamilies
        );
        
        // Group items by precise Y coordinates (within 2px tolerance)
        const lineGroups = groupItemsByLines(processedItems);
        
        // Generate HTML content for this page
        if (i === 1) {
          // Initialize container only for first page
          htmlContent = generateHtmlContent(lineGroups);
        } else {
          // Append content for subsequent pages
          const pageContent = generateHtmlContent(lineGroups);
          // Extract content between div tags and append
          const contentMatch = pageContent.match(/<div[^>]*>(.*)<\/div>/s);
          if (contentMatch) {
            htmlContent = htmlContent.replace('</div>', contentMatch[1] + '</div>');
          }
        }
      }
      
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