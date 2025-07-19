
import { readTextFile } from './fileReaders/textFileReader';
import { readPdfFile } from './fileReaders/pdfFileReader';
import { readDocxFile } from './fileReaders/docxFileReader';

export interface FileReadResult {
  content: string;
  confidence: 'high' | 'medium' | 'low';
  extractedWords: number;
  warnings: string[];
  processingMethod: string;
}

export const readFileContent = async (file: File): Promise<string> => {
  const result = await readFileContentWithMetadata(file);
  return result.content;
};

export const readFileContentWithMetadata = async (file: File): Promise<FileReadResult> => {
  const fileType = file.type.toLowerCase();
  const fileName = file.name.toLowerCase();
  const warnings: string[] = [];
  let processingMethod = '';
  
  try {
    let content = '';
    
    if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
      content = await readTextFile(file);
      processingMethod = 'Plain text extraction';
    } else if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
      content = await readPdfFile(file);
      processingMethod = 'PDF parsing with layout preservation';
    } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
               fileType === 'application/msword' || 
               fileName.endsWith('.docx') || 
               fileName.endsWith('.doc')) {
      content = await readDocxFile(file);
      processingMethod = 'Microsoft Word document extraction';
    } else {
      throw new Error(`Unsupported file format: ${fileType}`);
    }

    // Validate content quality
    const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;
    const hasStructuredContent = content.includes('\n') || content.includes('•') || content.includes('-');
    
    let confidence: FileReadResult['confidence'] = 'high';
    
    // Determine confidence level
    if (wordCount < 50) {
      confidence = 'low';
      warnings.push('Very little text was extracted from your resume. The file might be an image-based PDF or have formatting issues.');
    } else if (wordCount < 150) {
      confidence = 'medium';
      warnings.push('Limited text was extracted. Consider using a text-based resume format for better analysis.');
    }
    
    if (!hasStructuredContent && wordCount > 100) {
      warnings.push('The resume appears to lack clear structure. Consider using bullet points and clear sections.');
    }
    
    // Check for common extraction issues
    if (content.includes('�') || content.includes('□')) {
      confidence = 'low';
      warnings.push('Some characters could not be properly decoded. This may affect analysis accuracy.');
    }
    
    if (content.split('\n').length < 5 && wordCount > 200) {
      warnings.push('Text appears to be in a single block. Section analysis may be limited.');
    }

    return {
      content,
      confidence,
      extractedWords: wordCount,
      warnings,
      processingMethod
    };
  } catch (error) {
    console.error('Error reading file:', error);
    throw new Error('Failed to extract text from the uploaded file. Please ensure the file is not corrupted, password-protected, or image-based, and try again.');
  }
};
