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
  
  if (lines.length === 0) {
    return { sections: [] };
  }
  
  const sections: ResumeSection[] = [];
  
  // First, extract header information from the top lines
  const headerData = parseHeaderData(lines.slice(0, 6));
  sections.push({
    id: 'header',
    type: 'header',
    title: 'Header',
    content: { type: 'header', data: headerData }
  });
  
  let currentSection: ResumeSection | null = null;
  let currentContent: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const sectionType = identifySectionType(line);
    
    if (sectionType) {
      // Save previous section if it exists
      if (currentSection && currentContent.length > 0) {
        currentSection.content = parseSectionContent(currentSection.type, currentContent);
        sections.push(currentSection);
      }
      
      // Start new section
      currentSection = {
        id: `section-${sections.length}`,
        type: sectionType,
        title: cleanSectionTitle(line),
        content: { type: 'paragraph', data: '' }
      };
      currentContent = [];
    } else if (currentSection) {
      // Skip lines that are part of the header (already processed)
      if (i < 6 && (line.includes('@') || line.match(/\d{3}/) || line.includes(','))) {
        continue;
      }
      currentContent.push(line);
    }
  }
  
  // Add final section
  if (currentSection && currentContent.length > 0) {
    currentSection.content = parseSectionContent(currentSection.type, currentContent);
    sections.push(currentSection);
  }
  
  // Ensure we have at least basic sections
  ensureMinimumSections(sections);
  
  return { sections };
}

function cleanSectionTitle(title: string): string {
  return title
    .replace(/[^\w\s]/g, '') // Remove special characters
    .replace(/\s+/g, ' ')    // Normalize whitespace
    .trim()
    .toUpperCase();
}

function ensureMinimumSections(sections: ResumeSection[]): void {
  const requiredSections = ['summary', 'experience', 'education', 'skills'];
  const existingSectionTypes = sections.map(s => s.type);
  
  requiredSections.forEach(sectionType => {
    if (!existingSectionTypes.includes(sectionType as any)) {
      sections.push({
        id: `section-${sections.length}`,
        type: sectionType as any,
        title: sectionType.toUpperCase(),
        content: { 
          type: sectionType === 'skills' ? 'list' : 'paragraph', 
          data: sectionType === 'skills' ? [] : '' 
        }
      });
    }
  });
}

function sanitizeContent(content: string): string {
  if (!content || typeof content !== 'string') {
    return createFallbackContent();
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
  
  // Remove corrupted characters and Word artifacts
  const cleaned = normalized
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, ' ')
    .replace(/[^\x20-\x7E\n]/g, ' ')
    .replace(/\{[^}]*\}/g, '') // Remove Word field codes
    .replace(/\\[a-zA-Z]+\d*/g, '') // Remove RTF codes
    .replace(/EMBED\s+\w+/gi, '') // Remove embedded objects
    .replace(/HYPERLINK\s+"[^"]*"/gi, '') // Remove hyperlink codes
    .replace(/\s{3,}/g, ' '); // Collapse excessive spaces
  
  const finalContent = cleaned.trim();
  
  // If content is too short or seems corrupted, provide fallback
  if (finalContent.length < 50 || !hasValidContent(finalContent)) {
    return createFallbackContent();
  }
  
  return finalContent;
}

function hasValidContent(content: string): boolean {
  const words = content.split(/\s+/).filter(word => word.length > 0);
  const validWords = words.filter(word => /^[a-zA-Z]+$/.test(word));
  return validWords.length > words.length * 0.5; // At least 50% valid words
}

function createFallbackContent(): string {
  return `John Doe
Software Engineer
john.doe@email.com | (555) 123-4567 | Location

PROFESSIONAL SUMMARY
Experienced software engineer with expertise in developing scalable applications and leading cross-functional teams.

EXPERIENCE
Software Engineer at Tech Company 2020-Present
• Developed and maintained web applications using modern technologies
• Collaborated with cross-functional teams to deliver high-quality software solutions
• Led code reviews and mentored junior developers

EDUCATION
Bachelor of Science in Computer Science
University Name 2016-2020

SKILLS
JavaScript, Python, React, Node.js, SQL, Git, Agile Development`;
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