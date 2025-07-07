import { toast } from 'sonner';

export const downloadAsTxt = async (
  content: string,
  fileName: string,
  isHtmlContent: boolean = false
) => {
  try {
    // For HTML content, extract plain text
    let textContent = content;
    if (isHtmlContent) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      textContent = doc.body?.textContent || doc.textContent || content;
    }
    
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `optimized-${fileName}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Optimized resume downloaded as TXT!");
  } catch (error) {
    console.error('Error generating TXT:', error);
    toast.error('Failed to generate TXT. Please try again.');
    throw error;
  }
};