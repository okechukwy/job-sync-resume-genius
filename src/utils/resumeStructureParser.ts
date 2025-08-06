export interface StructuredResume {
  sections: ResumeSection[];
}

export interface ResumeSection {
  id: string;
  type: 'header' | 'summary' | 'experience' | 'education' | 'skills' | 'other';
  title: string;
  content: SectionContent;
}

export interface SectionContent {
  type: 'header' | 'paragraph' | 'list' | 'experience_block' | 'education_block';
  data: any;
}

export interface ExperienceBlock {
  title: string;
  company: string;
  location?: string;
  dates: string;
  responsibilities: string[];
}

export interface EducationBlock {
  degree: string;
  institution: string;
  location?: string;
  dates: string;
  details?: string[];
}

export interface HeaderData {
  name: string;
  title?: string;
  contact: {
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    website?: string;
  };
}

export function parseResumeToStructured(content: string): StructuredResume {
  // Enhanced content sanitization
  const sanitizedContent = sanitizeContent(content);
  const lines = sanitizedContent.split('\n').map(line => line.trim()).filter(line => line);
  const sections: ResumeSection[] = [];
  
  let currentSection: ResumeSection | null = null;
  let currentContent: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const sectionType = identifySectionType(line);
    
    if (sectionType) {
      // Save previous section
      if (currentSection && currentContent.length > 0) {
        currentSection.content = parseSectionContent(currentSection.type, currentContent);
        sections.push(currentSection);
      }
      
      // Start new section
      currentSection = {
        id: `section-${sections.length}`,
        type: sectionType,
        title: line,
        content: { type: 'paragraph', data: '' }
      };
      currentContent = [];
    } else if (currentSection) {
      currentContent.push(line);
    } else {
      // Header content (name, contact info)
      if (sections.length === 0) {
        const headerData = parseHeaderData(lines.slice(0, 10));
        sections.push({
          id: 'header',
          type: 'header',
          title: 'Header',
          content: { type: 'header', data: headerData }
        });
      }
    }
  }
  
  // Add final section
  if (currentSection && currentContent.length > 0) {
    currentSection.content = parseSectionContent(currentSection.type, currentContent);
    sections.push(currentSection);
  }
  
  return { sections };
}

function sanitizeContent(content: string): string {
  if (!content || typeof content !== 'string') {
    return 'No content available';
  }
  
  // Remove HTML tags and decode entities
  const withoutHtml = content.replace(/<[^>]*>/g, '');
  
  // Fix common encoding issues
  const withFixedEncoding = withoutHtml
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  
  // Remove excessive whitespace and normalize line breaks
  const normalized = withFixedEncoding
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\n\s*\n/g, '\n\n')
    .replace(/[ \t]+/g, ' ');
  
  // Remove corrupted characters and replace with spaces
  const cleaned = normalized
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, ' ')
    .replace(/[^\x20-\x7E\n]/g, ' ');
  
  return cleaned.trim();
}

function identifySectionType(line: string): ResumeSection['type'] | null {
  const upperLine = line.toUpperCase();
  
  if (upperLine.includes('PROFESSIONAL SUMMARY') || upperLine.includes('SUMMARY') || upperLine.includes('OBJECTIVE')) {
    return 'summary';
  }
  if (upperLine.includes('EXPERIENCE') || upperLine.includes('EMPLOYMENT') || upperLine.includes('WORK HISTORY')) {
    return 'experience';
  }
  if (upperLine.includes('EDUCATION') || upperLine.includes('ACADEMIC')) {
    return 'education';
  }
  if (upperLine.includes('SKILLS') || upperLine.includes('TECHNICAL SKILLS') || upperLine.includes('COMPETENCIES')) {
    return 'skills';
  }
  if (upperLine.includes('CERTIFICATIONS') || upperLine.includes('AWARDS') || upperLine.includes('PROJECTS') || 
      upperLine.includes('LANGUAGES') || upperLine.includes('VOLUNTEER')) {
    return 'other';
  }
  
  return null;
}

function parseSectionContent(type: ResumeSection['type'], content: string[]): SectionContent {
  switch (type) {
    case 'experience':
      return { type: 'experience_block', data: parseExperienceBlocks(content) };
    case 'education':
      return { type: 'education_block', data: parseEducationBlocks(content) };
    case 'skills':
      return { type: 'list', data: parseSkillsList(content) };
    case 'summary':
      return { type: 'paragraph', data: content.join(' ') };
    default:
      return { type: 'list', data: content };
  }
}

function parseExperienceBlocks(content: string[]): ExperienceBlock[] {
  const blocks: ExperienceBlock[] = [];
  let currentBlock: Partial<ExperienceBlock> | null = null;
  
  for (const line of content) {
    if (isJobTitle(line)) {
      if (currentBlock) {
        blocks.push(currentBlock as ExperienceBlock);
      }
      currentBlock = parseJobTitleLine(line);
    } else if (currentBlock) {
      if (!currentBlock.responsibilities) {
        currentBlock.responsibilities = [];
      }
      if (line.startsWith('•') || line.startsWith('-') || line.startsWith('*')) {
        currentBlock.responsibilities.push(line.replace(/^[•\-*]\s*/, ''));
      } else {
        currentBlock.responsibilities.push(line);
      }
    }
  }
  
  if (currentBlock) {
    blocks.push(currentBlock as ExperienceBlock);
  }
  
  return blocks;
}

function parseEducationBlocks(content: string[]): EducationBlock[] {
  const blocks: EducationBlock[] = [];
  let currentBlock: Partial<EducationBlock> | null = null;
  
  for (const line of content) {
    if (isDegree(line)) {
      if (currentBlock) {
        blocks.push(currentBlock as EducationBlock);
      }
      currentBlock = parseDegreeeLine(line);
    } else if (currentBlock) {
      if (!currentBlock.details) {
        currentBlock.details = [];
      }
      currentBlock.details.push(line);
    }
  }
  
  if (currentBlock) {
    blocks.push(currentBlock as EducationBlock);
  }
  
  return blocks;
}

function parseSkillsList(content: string[]): string[] {
  return content.flatMap(line => 
    line.split(/[,;|]/).map(skill => skill.trim()).filter(skill => skill)
  );
}

function parseHeaderData(headerLines: string[]): HeaderData {
  const data: HeaderData = {
    name: headerLines[0] || '',
    contact: {}
  };
  
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const phoneRegex = /[\+]?[1-9]?[\d\s\-\(\)\.]{7,15}/;
  const linkedinRegex = /linkedin\.com\/in\/[\w\-]+/i;
  
  for (const line of headerLines.slice(1, 6)) {
    if (emailRegex.test(line)) {
      data.contact.email = line.match(emailRegex)?.[0];
    } else if (phoneRegex.test(line)) {
      data.contact.phone = line.match(phoneRegex)?.[0];
    } else if (linkedinRegex.test(line)) {
      data.contact.linkedin = line;
    } else if (line.includes(',') && !line.includes('@')) {
      data.contact.location = line;
    } else if (line.toLowerCase().includes('title') || (!data.title && headerLines.indexOf(line) === 1)) {
      data.title = line.replace(/title:?\s*/i, '');
    }
  }
  
  return data;
}

function isJobTitle(line: string): boolean {
  const jobTitlePatterns = [
    /\w+\s+(at|@)\s+\w+/i,
    /\w+\s+\|\s+\w+/,
    /^\w+.*\d{4}/,
    /(manager|director|engineer|analyst|developer|designer|specialist|coordinator|associate)/i
  ];
  
  return jobTitlePatterns.some(pattern => pattern.test(line));
}

function parseJobTitleLine(line: string): Partial<ExperienceBlock> {
  const parts = line.split(/\s+(?:at|@|\|)\s+/i);
  
  if (parts.length >= 2) {
    const titlePart = parts[0].trim();
    const companyPart = parts[1].trim();
    
    // Extract dates if present
    const dateMatch = line.match(/(\d{4}(?:\s*-\s*\d{4}|\s*-\s*present))/i);
    const dates = dateMatch ? dateMatch[0] : '';
    
    return {
      title: titlePart.replace(/\s*\d{4}.*$/, '').trim(),
      company: companyPart.replace(/\s*\d{4}.*$/, '').trim(),
      dates: dates
    };
  }
  
  return {
    title: line,
    company: '',
    dates: ''
  };
}

function isDegree(line: string): boolean {
  const degreePatterns = [
    /(bachelor|master|phd|doctorate|associate|b\.a\.|b\.s\.|m\.a\.|m\.s\.|mba)/i,
    /degree/i,
    /university|college|institute/i
  ];
  
  return degreePatterns.some(pattern => pattern.test(line));
}

function parseDegreeeLine(line: string): Partial<EducationBlock> {
  const parts = line.split(/\s+(?:at|from|\|)\s+/i);
  
  if (parts.length >= 2) {
    return {
      degree: parts[0].trim(),
      institution: parts[1].trim(),
      dates: ''
    };
  }
  
  return {
    degree: line,
    institution: '',
    dates: ''
  };
}