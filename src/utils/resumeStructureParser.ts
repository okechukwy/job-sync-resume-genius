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
  type: 'header' | 'header_data' | 'paragraph' | 'list' | 'experience_block' | 'education_block';
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
  try {
    const sanitizedContent = sanitizeContent(content);
    const lines = sanitizedContent
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    if (lines.length === 0) {
      return { sections: [] };
    }

    const sections: ResumeSection[] = [];
    let currentSection: ResumeSection | null = null;
    let currentLines: string[] = [];
    let headerProcessed = false;

    // Try to extract header first (first 8 lines typically)
    const headerData = parseHeaderData(lines.slice(0, 8));
    if (headerData.name || headerData.contact.email || headerData.contact.phone) {
      sections.push({
        id: `header-${Date.now()}`,
        type: 'header',
        title: 'Header',
        content: {
          type: 'header_data',
          data: headerData
        }
      });
      headerProcessed = true;
    }

    // Process remaining lines, starting after potential header
    const startIndex = headerProcessed ? 8 : 0;
    
    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i];
      const sectionType = identifySectionType(line);

      if (sectionType) {
        // Save previous section
        if (currentSection && currentLines.length > 0) {
          currentSection.content = parseSectionContent(currentSection.type, currentLines);
          sections.push(currentSection);
        }

        // Start new section
        currentSection = {
          id: `${sectionType}-${Date.now()}-${i}`,
          type: sectionType,
          title: line.replace(/[:\-–—]/g, '').trim(),
          content: { type: 'paragraph', data: '' }
        };
        currentLines = [];
      } else if (currentSection) {
        currentLines.push(line);
      } else if (!headerProcessed) {
        // If no section detected yet and no header, treat as summary
        if (!currentSection) {
          currentSection = {
            id: `summary-${Date.now()}`,
            type: 'summary',
            title: 'Professional Summary',
            content: { type: 'paragraph', data: '' }
          };
          currentLines = [];
        }
        currentLines.push(line);
      }
    }

    // Add final section
    if (currentSection && currentLines.length > 0) {
      currentSection.content = parseSectionContent(currentSection.type, currentLines);
      sections.push(currentSection);
    }

    return ensureMinimumSections({ sections });
  } catch (error) {
    console.error('Error parsing resume:', error);
    return {
      sections: [{
        id: 'fallback',
        type: 'summary',
        title: 'Resume Content',
        content: {
          type: 'paragraph',
          data: content
        }
      }]
    };
  }
}

function cleanSectionTitle(title: string): string {
  return title
    .replace(/[^\w\s]/g, '') // Remove special characters
    .replace(/\s+/g, ' ')    // Normalize whitespace
    .trim()
    .toUpperCase();
}

function ensureMinimumSections(structuredResume: StructuredResume): StructuredResume {
  const { sections } = structuredResume;
  const requiredSections = ['summary', 'experience', 'education', 'skills'];
  const existingSectionTypes = sections.map(s => s.type);
  
  requiredSections.forEach(sectionType => {
    if (!existingSectionTypes.includes(sectionType as any)) {
      sections.push({
        id: `${sectionType}-${Date.now()}`,
        type: sectionType as any,
        title: sectionType.charAt(0).toUpperCase() + sectionType.slice(1),
        content: { 
          type: sectionType === 'skills' ? 'list' : 'paragraph', 
          data: sectionType === 'skills' ? [] : '' 
        }
      });
    }
  });

  return { sections };
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

function parseHeaderData(lines: string[]): HeaderData {
  const headerData: HeaderData = {
    name: '',
    title: '',
    contact: {
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: ''
    }
  };

  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const phoneRegex = /[\+]?[\d\s\-\(\)\.]{10,}/;
  const linkedinRegex = /(linkedin\.com\/in\/[^\s]+|linkedin\.com\/pub\/[^\s]+)/i;
  const websiteRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/i;

  // First, identify contact info lines to exclude from name/title detection
  const contactLines = new Set();
  lines.forEach((line, index) => {
    if (emailRegex.test(line) || phoneRegex.test(line) || linkedinRegex.test(line) || websiteRegex.test(line)) {
      contactLines.add(index);
    }
  });

  // Find name and title from non-contact lines
  const nonContactLines = lines.filter((_, index) => !contactLines.has(index));
  
  if (nonContactLines.length > 0) {
    // Name is typically the first substantial line
    headerData.name = nonContactLines[0] || '';
    
    // Title might be the second line if it exists and looks like a job title
    if (nonContactLines.length > 1) {
      const potentialTitle = nonContactLines[1];
      if (potentialTitle && 
          potentialTitle.length > 3 && 
          potentialTitle.length < 100 &&
          !potentialTitle.includes(',') && 
          !potentialTitle.toLowerCase().includes('experience') &&
          !potentialTitle.toLowerCase().includes('education')) {
        headerData.title = potentialTitle;
      }
    }
  }

  // Extract contact information
  for (const line of lines) {
    const emailMatch = line.match(emailRegex);
    if (emailMatch && !headerData.contact.email) {
      headerData.contact.email = emailMatch[0];
    }

    const phoneMatch = line.match(phoneRegex);
    if (phoneMatch && !headerData.contact.phone) {
      headerData.contact.phone = phoneMatch[0].trim();
    }

    const linkedinMatch = line.match(linkedinRegex);
    if (linkedinMatch && !headerData.contact.linkedin) {
      headerData.contact.linkedin = linkedinMatch[0];
    }

    const websiteMatch = line.match(websiteRegex);
    if (websiteMatch && !linkedinMatch && !headerData.contact.website) {
      headerData.contact.website = websiteMatch[0];
    }

    // Enhanced location detection
    if (!headerData.contact.location) {
      // Look for city, state patterns
      const locationPattern = /^[A-Za-z\s]+,\s*[A-Za-z\s]{2,}/;
      if (locationPattern.test(line) && 
          !emailMatch && 
          !phoneMatch && 
          !linkedinMatch && 
          !websiteMatch &&
          line.length < 50) {
        headerData.contact.location = line;
      }
    }
  }

  return headerData;
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