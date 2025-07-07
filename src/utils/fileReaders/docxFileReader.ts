import mammoth from 'mammoth';

export const readDocxFile = async (file: File): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      
      if (!result.value || result.value.trim().length < 50) {
        const textResult = await mammoth.extractRawText({ arrayBuffer });
        resolve(textResult.value);
      } else {
        resolve(result.value);
      }
    } catch (error) {
      reject(error);
    }
  });
};