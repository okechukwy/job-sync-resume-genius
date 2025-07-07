import { readTextFile } from './fileReaders/textFileReader';
import { readPdfFile } from './fileReaders/pdfFileReader';
import { readDocxFile } from './fileReaders/docxFileReader';

export const readFileContent = async (file: File): Promise<string> => {
  const fileType = file.type.toLowerCase();
  const fileName = file.name.toLowerCase();
  
  try {
    if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
      return await readTextFile(file);
    } else if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
      return await readPdfFile(file);
    } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
               fileType === 'application/msword' || 
               fileName.endsWith('.docx') || 
               fileName.endsWith('.doc')) {
      return await readDocxFile(file);
    } else {
      throw new Error(`Unsupported file format: ${fileType}`);
    }
  } catch (error) {
    console.error('Error reading file:', error);
    throw new Error('Failed to extract text from the uploaded file. Please ensure the file is not corrupted and try again.');
  }
};