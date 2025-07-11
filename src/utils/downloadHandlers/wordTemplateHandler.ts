import { toast } from 'sonner';
import { ResumeData } from '@/hooks/useResumeSteps';
import { StylePreset } from '@/config/templateConfig';

export const downloadWordTemplate = async (
  data: ResumeData,
  stylePreset: StylePreset,
  templateId: string,
  formatDate: (dateString: string) => string
) => {
  try {
    toast.info("Generating Word template...");
    
    const isModernTemplate = templateId.includes('modern');
    const fileName = isModernTemplate ? 'modern-word-resume' : 'corporate-word-resume';
    
    // Generate structured RTF content optimized for Word
    let rtfContent = generateWordRtfHeader();
    
    // Add title
    rtfContent += `\\pard\\qc\\b\\fs36 ${escapeRtfText(data.personalInfo.fullName)}\\b0\\fs24\\par\\par `;
    
    // Add contact information
    const contactInfo = [
      data.personalInfo.email,
      data.personalInfo.phone,
      data.personalInfo.location
    ].filter(Boolean).join(' | ');
    
    rtfContent += `\\pard\\qc\\fs22 ${escapeRtfText(contactInfo)}\\fs24\\par\\par\\par `;
    
    // Professional Summary
    if (data.summary?.content) {
      rtfContent += generateWordSection('PROFESSIONAL SUMMARY', data.summary.content, isModernTemplate);
    }
    
    // Experience
    if (data.experience?.length) {
      rtfContent += generateWordExperienceSection(data.experience, formatDate, isModernTemplate);
    }
    
    // Education
    if (data.education?.length) {
      rtfContent += generateWordEducationSection(data.education, formatDate, isModernTemplate);
    }
    
    // Skills
    const allSkills = [...(data.skills?.technical || []), ...(data.skills?.soft || [])];
    if (allSkills.length) {
      rtfContent += generateWordSkillsSection(allSkills, isModernTemplate);
    }
    
    rtfContent += '}';
    
    // Download the RTF file
    const blob = new Blob([rtfContent], { type: 'application/rtf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.rtf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success("Word template downloaded! Opens perfectly in Microsoft Word.");
  } catch (error) {
    console.error('Error generating Word template:', error);
    toast.error('Failed to generate Word template. Please try again.');
    throw error;
  }
};

const generateWordRtfHeader = (): string => {
  return `{\\rtf1\\ansi\\ansicpg1252\\deff0 
{\\fonttbl 
{\\f0\\froman\\fprq2\\fcharset0 Times New Roman;}
{\\f1\\fswiss\\fprq2\\fcharset0 Arial;}
{\\f2\\fswiss\\fprq2\\fcharset0 Calibri;}
}
{\\colortbl ;\\red0\\green0\\blue0;\\red47\\green79\\blue142;\\red128\\green128\\blue128;\\red240\\green240\\blue240;}
\\viewkind4\\uc1\\pard\\f2\\fs24 `;
};

const generateWordSection = (title: string, content: string, isModern: boolean): string => {
  const titleColor = isModern ? '\\cf2' : '\\cf1';
  const borderStyle = isModern ? '\\brdrb\\brdrs\\brdrw15\\brdrcf2' : '\\brdrb\\brdrs\\brdrw10\\brdrcf1';
  
  return `\\pard\\ql\\b\\fs28${titleColor} ${escapeRtfText(title)}\\b0\\fs24\\cf1\\par
\\pard${borderStyle}\\par
\\pard\\ql\\fs22 ${escapeRtfText(content)}\\fs24\\par\\par `;
};

const generateWordExperienceSection = (
  experience: any[],
  formatDate: (dateString: string) => string,
  isModern: boolean
): string => {
  const titleColor = isModern ? '\\cf2' : '\\cf1';
  const borderStyle = isModern ? '\\brdrb\\brdrs\\brdrw15\\brdrcf2' : '\\brdrb\\brdrs\\brdrw10\\brdrcf1';
  
  let content = `\\pard\\ql\\b\\fs28${titleColor} PROFESSIONAL EXPERIENCE\\b0\\fs24\\cf1\\par
\\pard${borderStyle}\\par\\par `;
  
  experience.forEach((exp, index) => {
    const dates = `${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}`;
    
    content += `\\pard\\ql\\b\\fs26 ${escapeRtfText(exp.position)}\\b0\\fs24\\par
\\pard\\ql\\i ${escapeRtfText(exp.company)}\\i0 \\tab\\tab\\tab ${escapeRtfText(dates)}\\par`;
    
    if (exp.description) {
      content += `\\pard\\li360\\fs22 ${escapeRtfText(exp.description)}\\fs24\\par`;
    }
    
    if (index < experience.length - 1) {
      content += '\\par ';
    }
  });
  
  return content + '\\par\\par ';
};

const generateWordEducationSection = (
  education: any[],
  formatDate: (dateString: string) => string,
  isModern: boolean
): string => {
  const titleColor = isModern ? '\\cf2' : '\\cf1';
  const borderStyle = isModern ? '\\brdrb\\brdrs\\brdrw15\\brdrcf2' : '\\brdrb\\brdrs\\brdrw10\\brdrcf1';
  
  let content = `\\pard\\ql\\b\\fs28${titleColor} EDUCATION\\b0\\fs24\\cf1\\par
\\pard${borderStyle}\\par\\par `;
  
  education.forEach((edu, index) => {
    content += `\\pard\\ql\\b\\fs24 ${escapeRtfText(edu.degree)}\\b0\\par
\\pard\\ql\\i ${escapeRtfText(edu.school)}\\i0 \\tab\\tab\\tab ${escapeRtfText(formatDate(edu.endDate))}\\par`;
    
    if (edu.field) {
      content += `\\pard\\ql\\fs22 ${escapeRtfText(edu.field)}\\fs24\\par`;
    }
    
    if (edu.gpa) {
      content += `\\pard\\ql\\fs22 GPA: ${escapeRtfText(edu.gpa)}\\fs24\\par`;
    }
    
    if (index < education.length - 1) {
      content += '\\par ';
    }
  });
  
  return content + '\\par\\par ';
};

const generateWordSkillsSection = (skills: string[], isModern: boolean): string => {
  const titleColor = isModern ? '\\cf2' : '\\cf1';
  const borderStyle = isModern ? '\\brdrb\\brdrs\\brdrw15\\brdrcf2' : '\\brdrb\\brdrs\\brdrw10\\brdrcf1';
  
  let content = `\\pard\\ql\\b\\fs28${titleColor} SKILLS\\b0\\fs24\\cf1\\par
\\pard${borderStyle}\\par\\par `;
  
  // Create skill pills in Word-friendly format
  const skillsText = skills.map(skill => escapeRtfText(skill)).join(' • ');
  content += `\\pard\\ql\\fs22 ${skillsText}\\fs24\\par\\par `;
  
  return content;
};

const escapeRtfText = (text: string): string => {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/\u00A0/g, ' ')
    .replace(/[^\x00-\x7F]/g, (char) => {
      const code = char.charCodeAt(0);
      return `\\u${code}?`;
    });
};