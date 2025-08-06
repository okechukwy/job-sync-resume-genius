
import { readTextFile } from './fileReaders/textFileReader';
import { readPdfFile } from './fileReaders/pdfFileReader';
import { readDocxFile } from './fileReaders/docxFileReader';
import { supabase } from '@/integrations/supabase/client';

const processDocFileServerSide = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const { data, error } = await supabase.functions.invoke('doc-text-extractor', {
    body: formData,
  });
  
  if (error) {
    throw new Error(error.message || 'Failed to process .doc file on server');
  }
  
  if (!data.success) {
    throw new Error(data.error || 'Server-side processing failed');
  }
  
  return data;
};

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
               fileName.endsWith('.docx')) {
      content = await readDocxFile(file);
      processingMethod = 'Microsoft Word document extraction';
    } else if (fileType === 'application/msword' || fileName.endsWith('.doc')) {
      const result = await processDocFileServerSide(file);
      content = result.text;
      processingMethod = result.processingMethod;
      warnings.push(...result.warnings);
      
      // Additional client-side sanitization for .doc files
      content = sanitizeDocContent(content);
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
    
    // Check for binary artifacts
    if (content.toLowerCase().includes('bjbj') || content.includes('\x00')) {
      content = sanitizeBinaryArtifacts(content);
      confidence = 'medium';
      warnings.push('Removed binary formatting artifacts. Content has been cleaned.');
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

// Sanitization functions for cleaning extracted content
const sanitizeDocContent = (content: string): string => {
  return content
    .replace(/bjbj[^\s]*/gi, '') // Remove bjbj artifacts
    .replace(/\bw[NWTF]\b/gi, '') // Remove Word field codes like wN, wW, wT, wF
    .replace(/\bw\d+\b/gi, '') // Remove numbered Word field codes like w1, w2, etc.
    .replace(/\\f"/gi, '') // Remove font formatting codes
    .replace(/\\s\d+/gi, '') // Remove style markers
    .replace(/\*MERGEFORMAT/gi, '') // Remove mail merge artifacts
    .replace(/\b(HYPERLINK|REF|TOC|PAGEREF)\b/gi, '') // Remove Word field functions
    .replace(/\{\s*\\[^}]*\}/gi, '') // Remove Word field code blocks
    .replace(/\x00+/g, ' ') // Replace null bytes with spaces
    .replace(/[^\x20-\x7E\n\r\t]/g, ' ') // Remove non-printable characters except newlines and tabs
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
};

const sanitizeBinaryArtifacts = (content: string): string => {
  return content
    .replace(/bjbj[^\s]*/gi, '') // Remove bjbj prefixes
    .replace(/PK[^\s]*/gi, '') // Remove PK artifacts
    .replace(/OLE2[^\s]*/gi, '') // Remove OLE2 references
    .replace(/Microsoft[^\s]*Office[^\s]*/gi, '') // Remove Office metadata
    .replace(/[^\x20-\x7E\n\r\t]/g, ' ') // Keep only printable ASCII + whitespace
    .replace(/\s+/g, ' ') // Normalize whitespace
    .replace(/^\s*[A-Z]{4,}\s*/gm, '') // Remove lines starting with long uppercase sequences
    .trim();
};
