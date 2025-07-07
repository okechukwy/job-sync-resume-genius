import { toast } from 'sonner';
import { downloadAsTxt } from './downloadHandlers/txtDownloadHandler';
import { downloadAsPdf } from './downloadHandlers/pdfDownloadHandler';
import { downloadAsRtf } from './downloadHandlers/rtfDownloadHandler';

export const downloadFile = async (
  content: string,
  fileName: string,
  format: 'txt' | 'pdf' | 'docx',
  isHtmlContent: boolean = false
) => {
  try {
    switch (format) {
      case 'txt':
        await downloadAsTxt(content, fileName, isHtmlContent);
        break;
      case 'pdf':
        await downloadAsPdf(content, fileName, isHtmlContent);
        break;
      case 'docx':
        await downloadAsRtf(content, fileName, isHtmlContent);
        break;
      default:
        throw new Error(`Unsupported format: ${format}`);
    }
  } catch (error) {
    console.error(`Error downloading file as ${format.toUpperCase()}:`, error);
    toast.error(`Failed to download ${format.toUpperCase()}. Please try again.`);
  }
};