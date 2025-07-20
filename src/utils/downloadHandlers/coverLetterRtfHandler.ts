
import { toast } from 'sonner';
import { getLineFormatting, processLetterLines } from '../coverLetterFormatting';

export const downloadCoverLetterAsRtf = async (
  content: string,
  fileName: string,
  templateId?: string
) => {
  try {
    toast.info("Generating cover letter RTF...");
    
    // Generate RTF content with proper formatting and character encoding
    let rtfContent = '{\\rtf1\\ansi\\ansicpg1252\\deff0 {\\fonttbl {\\f0\\froman\\fprq2\\fcharset0 Times New Roman;}{\\f1\\fswiss\\fprq2\\fcharset0 Arial;}}';
    rtfContent += '{\\colortbl ;\\red0\\green0\\blue0;\\red128\\green128\\blue128;\\red0\\green0\\blue255;}'; // Color table
    rtfContent += '\\viewkind4\\uc1\\pard\\f0\\fs22 '; // Set default formatting (11pt font)
    
    // Process cover letter content with enhanced formatting
    const processedLines = processLetterLines(content, templateId || 'modern-professional');
    
    // Convert processed lines to RTF format with proper alignment
    for (const lineData of processedLines) {
      if (lineData.isEmpty) {
        // Empty line for spacing
        rtfContent += '\\par ';
        continue;
      }
      
      const { line, formatting, context } = lineData;
      const escapedText = escapeRtfText(line);
      
      // Apply RTF alignment based on formatting
      let alignmentCode = '\\ql'; // Default left align
      if (formatting.textAlign === 'center') {
        alignmentCode = '\\qc';
      } else if (formatting.textAlign === 'right') {
        alignmentCode = '\\qr';
      }
      
      // Apply font size (convert pt to RTF format: pt * 2)
      const rtfFontSize = parseInt(formatting.fontSize.replace('pt', '')) * 2;
      
      // Build RTF line with proper formatting
      if (formatting.isHeader) {
        // Header - bold, centered/left based on template
        rtfContent += `\\pard${alignmentCode}\\b\\fs${rtfFontSize} ${escapedText}\\b0\\fs22\\par `;
      } else if (formatting.isContact) {
        // Contact info - smaller font, centered/left based on template
        rtfContent += `\\pard${alignmentCode}\\fs${rtfFontSize} ${escapedText}\\fs22\\par `;
      } else if (formatting.textAlign === 'right') {
        // Date - right aligned
        rtfContent += `\\pard\\qr\\fs${rtfFontSize} ${escapedText}\\fs22\\par `;
      } else {
        // Regular text - left aligned
        rtfContent += `\\pard\\ql\\fs${rtfFontSize} ${escapedText}\\fs22\\par `;
      }
    }
    
    rtfContent += '}';
    
    const blob = new Blob([rtfContent], { 
      type: 'application/rtf' 
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}-cover-letter.rtf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Cover letter downloaded as RTF (opens in Word)!");
  } catch (error) {
    console.error('Error generating cover letter RTF:', error);
    toast.error('Failed to generate cover letter RTF. Please try again.');
    throw error;
  }
};

const escapeRtfText = (text: string): string => {
  return text
    .replace(/\\/g, '\\\\')  // Escape backslashes
    .replace(/\{/g, '\\{')   // Escape opening braces
    .replace(/\}/g, '\\}')   // Escape closing braces
    .replace(/\u00A0/g, ' ') // Non-breaking space to regular space
    .replace(/[^\x00-\x7F]/g, (char) => {
      // Convert non-ASCII characters to RTF unicode
      const code = char.charCodeAt(0);
      return `\\u${code}?`;
    });
};
