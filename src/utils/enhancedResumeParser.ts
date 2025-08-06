/**
 * Enhanced Resume Parser with Better Content Detection and Real-time Updates
 */

export interface EnhancedStructuredResume {
  header: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
  };
  sections: {
    summary?: string;
    experience: ExperienceEntry[];
    education: EducationEntry[];
    skills: string[];
    other: OtherSection[];
  };
  rawContent: string;
}

export interface ExperienceEntry {
  id: string;
  title: string;
  company: string;
  location: string;
  dates: string;
  responsibilities: string[];
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  location: string;
  dates: string;
  details: string[];
}

export interface OtherSection {
  id: string;
  title: string;
  content: string[];
}

export const parseResumeContent = (content: string): EnhancedStructuredResume => {
  if (!content || content.trim().length === 0) {
    return createEmptyResume();
  }

  const cleanContent = sanitizeContent(content);
  const lines = cleanContent.split('\n').filter(line => line.trim().length > 0);
  
  if (lines.length === 0) {
    return createEmptyResume();
  }

  const resume: EnhancedStructuredResume = {
    header: extractHeader(lines),
    sections: {
      experience: [],
      education: [],
      skills: [],
      other: []
    },
    rawContent: cleanContent
  };

  // Parse sections
  let currentSection = '';
  let currentContent: string[] = [];
  
  for (const line of lines) {
    const sectionType = detectSectionType(line);
    
    if (sectionType) {
      // Process previous section
      if (currentSection && currentContent.length > 0) {
        processSectionContent(resume, currentSection, currentContent);
      }
      
      currentSection = sectionType;
      currentContent = [];
    } else {
      currentContent.push(line);
    }
  }
  
  // Process final section
  if (currentSection && currentContent.length > 0) {
    processSectionContent(resume, currentSection, currentContent);
  }

  return resume;
};

const sanitizeContent = (content: string): string => {
  return content
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, ' ')
    .trim();
};

const extractHeader = (lines: string[]): EnhancedStructuredResume['header'] => {
  const header = {
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    linkedin: ''
  };

  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const phoneRegex = /[+]?[\d\s\-()\.]+/;
  const linkedinRegex = /(linkedin\.com\/in\/[^\s]+)/i;

  let nameFound = false;
  let titleFound = false;

  for (let i = 0; i < Math.min(lines.length, 8); i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const emailMatch = line.match(emailRegex);
    const phoneMatch = line.match(phoneRegex);
    const linkedinMatch = line.match(linkedinRegex);
    
    const hasContact = emailMatch || phoneMatch || linkedinMatch;

    if (!hasContact && !nameFound && line.length > 2 && line.length < 50) {
      header.name = line;
      nameFound = true;
    } else if (!hasContact && nameFound && !titleFound && 
               line.length > 3 && line.length < 80 &&
               !isLikelySectionHeader(line)) {
      header.title = line;
      titleFound = true;
    }

    if (emailMatch) header.email = emailMatch[0];
    if (phoneMatch) header.phone = phoneMatch[0].trim();
    if (linkedinMatch) header.linkedin = linkedinMatch[0];

    // Location detection
    if (!header.location && !hasContact && line.includes(',') && line.length < 60) {
      const locationPatterns = [
        /^[A-Za-z\s]+,\s*[A-Za-z\s]{2,}$/,
        /^[A-Za-z\s]+,\s*[A-Z]{2}$/
      ];
      
      if (locationPatterns.some(pattern => pattern.test(line))) {
        header.location = line;
      }
    }
  }

  return header;
};

const detectSectionType = (line: string): string | null => {
  const upperLine = line.toUpperCase().trim();
  
  const sectionMap: Record<string, string[]> = {
    'summary': ['PROFESSIONAL SUMMARY', 'SUMMARY', 'OBJECTIVE', 'PROFILE'],
    'experience': ['EXPERIENCE', 'WORK EXPERIENCE', 'PROFESSIONAL EXPERIENCE', 'EMPLOYMENT', 'WORK HISTORY'],
    'education': ['EDUCATION', 'ACADEMIC BACKGROUND', 'QUALIFICATIONS'],
    'skills': ['SKILLS', 'TECHNICAL SKILLS', 'CORE COMPETENCIES', 'EXPERTISE'],
    'certifications': ['CERTIFICATIONS', 'CERTIFICATES', 'CREDENTIALS'],
    'projects': ['PROJECTS', 'KEY PROJECTS', 'NOTABLE PROJECTS'],
    'awards': ['AWARDS', 'HONORS', 'ACHIEVEMENTS', 'RECOGNITION'],
    'languages': ['LANGUAGES', 'LANGUAGE SKILLS'],
    'volunteer': ['VOLUNTEER', 'VOLUNTEER EXPERIENCE', 'COMMUNITY SERVICE'],
    'publications': ['PUBLICATIONS', 'RESEARCH', 'PAPERS']
  };

  for (const [sectionType, keywords] of Object.entries(sectionMap)) {
    if (keywords.some(keyword => upperLine.includes(keyword))) {
      return sectionType;
    }
  }

  return null;
};

const isLikelySectionHeader = (line: string): boolean => {
  const upperLine = line.toUpperCase();
  const sectionKeywords = [
    'SUMMARY', 'EXPERIENCE', 'EDUCATION', 'SKILLS', 'CERTIFICATIONS',
    'PROJECTS', 'AWARDS', 'LANGUAGES', 'VOLUNTEER', 'PUBLICATIONS'
  ];
  
  return sectionKeywords.some(keyword => upperLine.includes(keyword));
};

const processSectionContent = (
  resume: EnhancedStructuredResume,
  sectionType: string,
  content: string[]
): void => {
  switch (sectionType) {
    case 'summary':
      resume.sections.summary = content.join(' ').trim();
      break;
    case 'experience':
      resume.sections.experience = parseExperienceEntries(content);
      break;
    case 'education':
      resume.sections.education = parseEducationEntries(content);
      break;
    case 'skills':
      resume.sections.skills = parseSkillsEntries(content);
      break;
    default:
      resume.sections.other.push({
        id: `${sectionType}-${Date.now()}`,
        title: sectionType.charAt(0).toUpperCase() + sectionType.slice(1),
        content
      });
  }
};

const parseExperienceEntries = (content: string[]): ExperienceEntry[] => {
  const entries: ExperienceEntry[] = [];
  let currentEntry: Partial<ExperienceEntry> | null = null;

  for (const line of content) {
    if (isJobTitleLine(line)) {
      if (currentEntry) {
        entries.push(finalizeEntry(currentEntry));
      }
      currentEntry = parseJobTitleLine(line);
    } else if (currentEntry) {
      if (isDateLine(line) && !currentEntry.dates) {
        currentEntry.dates = extractDates(line);
      } else if (isCompanyLine(line) && !currentEntry.company) {
        currentEntry.company = line.trim();
      } else {
        // Add to responsibilities
        if (!currentEntry.responsibilities) {
          currentEntry.responsibilities = [];
        }
        const cleanLine = line.replace(/^[•\-\*]\s*/, '').trim();
        if (cleanLine) {
          currentEntry.responsibilities.push(cleanLine);
        }
      }
    }
  }

  if (currentEntry) {
    entries.push(finalizeEntry(currentEntry));
  }

  return entries;
};

const parseEducationEntries = (content: string[]): EducationEntry[] => {
  const entries: EducationEntry[] = [];
  let currentEntry: Partial<EducationEntry> | null = null;

  for (const line of content) {
    if (isDegreeLine(line)) {
      if (currentEntry) {
        entries.push({
          id: `edu-${Date.now()}-${Math.random()}`,
          degree: currentEntry.degree || '',
          institution: currentEntry.institution || '',
          location: currentEntry.location || '',
          dates: currentEntry.dates || '',
          details: currentEntry.details || []
        });
      }
      currentEntry = { degree: line.trim(), details: [] };
    } else if (currentEntry) {
      if (isDateLine(line) && !currentEntry.dates) {
        currentEntry.dates = extractDates(line);
      } else if (isInstitutionLine(line) && !currentEntry.institution) {
        currentEntry.institution = line.trim();
      } else {
        if (!currentEntry.details) currentEntry.details = [];
        currentEntry.details.push(line.trim());
      }
    }
  }

  if (currentEntry) {
    entries.push({
      id: `edu-${Date.now()}-${Math.random()}`,
      degree: currentEntry.degree || '',
      institution: currentEntry.institution || '',
      location: currentEntry.location || '',
      dates: currentEntry.dates || '',
      details: currentEntry.details || []
    });
  }

  return entries;
};

const parseSkillsEntries = (content: string[]): string[] => {
  return content
    .flatMap(line => line.split(/[,;|]/))
    .map(skill => skill.trim())
    .filter(skill => skill.length > 0);
};

const isJobTitleLine = (line: string): boolean => {
  return /\w+.*\s+(at|@|\|)\s+\w+/i.test(line) ||
         /(manager|director|engineer|analyst|developer|designer|specialist|coordinator|associate)/i.test(line);
};

const parseJobTitleLine = (line: string): Partial<ExperienceEntry> => {
  const id = `exp-${Date.now()}-${Math.random()}`;
  const parts = line.split(/\s+(?:at|@|\|)\s+/i);
  
  if (parts.length >= 2) {
    return {
      id,
      title: parts[0].trim(),
      company: parts[1].trim(),
      responsibilities: []
    };
  }
  
  return { id, title: line.trim(), company: '', responsibilities: [] };
};

const isDateLine = (line: string): boolean => {
  return /\d{4}/.test(line) && (line.includes('-') || line.toLowerCase().includes('present'));
};

const extractDates = (line: string): string => {
  const match = line.match(/(\d{4}(?:\s*[-–—]\s*(?:\d{4}|present))?)/i);
  return match ? match[0] : line.trim();
};

const isCompanyLine = (line: string): boolean => {
  return line.includes('Inc') || line.includes('LLC') || line.includes('Corp') || 
         line.includes('Company') || line.includes('Ltd');
};

const isDegreeLine = (line: string): boolean => {
  return /(bachelor|master|phd|doctorate|associate|b\.a\.|b\.s\.|m\.a\.|m\.s\.|mba|degree)/i.test(line);
};

const isInstitutionLine = (line: string): boolean => {
  return /(university|college|institute|school)/i.test(line);
};

const finalizeEntry = (entry: Partial<ExperienceEntry>): ExperienceEntry => {
  return {
    id: entry.id || `exp-${Date.now()}-${Math.random()}`,
    title: entry.title || 'Position Title',
    company: entry.company || 'Company Name',
    location: entry.location || '',
    dates: entry.dates || '',
    responsibilities: entry.responsibilities || []
  };
};

const createEmptyResume = (): EnhancedStructuredResume => ({
  header: {
    name: 'Your Name',
    title: 'Professional Title',
    email: 'your.email@example.com',
    phone: '(555) 123-4567',
    location: 'City, State',
    linkedin: ''
  },
  sections: {
    summary: 'Professional summary goes here...',
    experience: [{
      id: 'exp-default',
      title: 'Position Title',
      company: 'Company Name',
      location: 'Location',
      dates: '2020 - Present',
      responsibilities: ['Key responsibility or achievement']
    }],
    education: [{
      id: 'edu-default',
      degree: 'Degree Name',
      institution: 'Institution Name',
      location: 'Location',
      dates: '2016 - 2020',
      details: []
    }],
    skills: ['Skill 1', 'Skill 2', 'Skill 3'],
    other: []
  },
  rawContent: ''
});

export const convertStructuredToText = (resume: EnhancedStructuredResume): string => {
  let content = '';
  
  // Header
  content += `${resume.header.name}\n`;
  if (resume.header.title) content += `${resume.header.title}\n`;
  content += `${resume.header.email}`;
  if (resume.header.phone) content += ` | ${resume.header.phone}`;
  if (resume.header.location) content += ` | ${resume.header.location}`;
  if (resume.header.linkedin) content += ` | ${resume.header.linkedin}`;
  content += '\n\n';
  
  // Summary
  if (resume.sections.summary) {
    content += 'PROFESSIONAL SUMMARY\n';
    content += `${resume.sections.summary}\n\n`;
  }
  
  // Experience
  if (resume.sections.experience.length > 0) {
    content += 'WORK EXPERIENCE\n\n';
    resume.sections.experience.forEach(exp => {
      content += `${exp.title}\n`;
      content += `${exp.company}`;
      if (exp.location) content += ` | ${exp.location}`;
      content += '\n';
      if (exp.dates) content += `${exp.dates}\n`;
      exp.responsibilities.forEach(resp => {
        content += `• ${resp}\n`;
      });
      content += '\n';
    });
  }
  
  // Education
  if (resume.sections.education.length > 0) {
    content += 'EDUCATION\n\n';
    resume.sections.education.forEach(edu => {
      content += `${edu.degree}\n`;
      content += `${edu.institution}`;
      if (edu.location) content += ` | ${edu.location}`;
      content += '\n';
      if (edu.dates) content += `${edu.dates}\n`;
      edu.details.forEach(detail => {
        content += `${detail}\n`;
      });
      content += '\n';
    });
  }
  
  // Skills
  if (resume.sections.skills.length > 0) {
    content += 'SKILLS\n\n';
    content += resume.sections.skills.join(', ') + '\n\n';
  }
  
  // Other sections
  resume.sections.other.forEach(section => {
    content += `${section.title.toUpperCase()}\n\n`;
    section.content.forEach(item => {
      content += `${item}\n`;
    });
    content += '\n';
  });
  
  return content.trim();
};
