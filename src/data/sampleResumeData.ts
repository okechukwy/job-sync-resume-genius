import { ResumeData } from "@/hooks/useResumeSteps";

// Sample data for different industries to showcase Phase 4 features

export const marketingManagerSample: ResumeData = {
  personalInfo: {
    fullName: "Sarah Marketing",
    email: "sarah.marketing@company.com",
    phone: "(555) 123-4567",
    location: "New York, NY",
    website: "sarahmarketing.com",
    linkedin: "linkedin.com/in/sarahmarketing"
  },
  experience: [
    {
      id: "1",
      position: "Senior Marketing Manager",
      company: "Growth Corp",
      startDate: "2019-01",
      endDate: "",
      current: true,
      description: "Strategic marketing leader driving 150% increase in lead generation through innovative multi-channel campaigns. Managed $2M marketing budget delivering 25% YoY growth. Led cross-functional teams of 12+ members across digital marketing, content creation, and brand management initiatives."
    },
    {
      id: "2",
      position: "Marketing Specialist",
      company: "TechStart Solutions",
      startDate: "2017-03",
      endDate: "2018-12",
      current: false,
      description: "Developed and executed integrated marketing campaigns resulting in 80% brand awareness increase. Collaborated with sales teams to optimize lead nurturing processes, achieving 45% improvement in conversion rates."
    }
  ],
  education: [
    {
      id: "1",
      degree: "Master of Business Administration",
      field: "Marketing",
      school: "Columbia Business School",
      startDate: "2015-09",
      endDate: "2017-05",
      gpa: "3.8"
    }
  ],
  skills: {
    technical: [
      "Digital Marketing Strategy",
      "Campaign Management",
      "Marketing Analytics",
      "SEO/SEM",
      "Social Media Marketing",
      "Content Marketing"
    ],
    soft: [
      "Strategic Planning",
      "Team Leadership",
      "Creative Problem Solving",
      "Brand Development",
      "ROI Analysis",
      "Cross-functional Collaboration"
    ]
  }
};

export const techProfessionalSample: ResumeData = {
  personalInfo: {
    fullName: "Alex Developer",
    email: "alex.dev@techcorp.com",
    phone: "(555) 987-6543",
    location: "San Francisco, CA",
    website: "alexdev.io",
    linkedin: "linkedin.com/in/alexdeveloper"
  },
  experience: [
    {
      id: "1",
      position: "Senior Software Engineer",
      company: "TechCorp Innovation",
      startDate: "2020-06",
      endDate: "",
      current: true,
      description: "Leading development of scalable microservices architecture serving 10M+ users. Implemented CI/CD pipelines reducing deployment time by 75%. Mentored junior developers and established coding best practices across engineering teams."
    },
    {
      id: "2",
      position: "Full Stack Developer",
      company: "StartupXYZ",
      startDate: "2018-01",
      endDate: "2020-05",
      current: false,
      description: "Built responsive web applications using React and Node.js. Optimized database queries improving application performance by 60%. Collaborated with product teams to deliver features ahead of schedule."
    }
  ],
  education: [
    {
      id: "1",
      degree: "Bachelor of Science",
      field: "Computer Science",
      school: "Stanford University",
      startDate: "2014-09",
      endDate: "2018-06",
      gpa: "3.7"
    }
  ],
  skills: {
    technical: [
      "JavaScript/TypeScript",
      "React/Node.js",
      "Python",
      "AWS/Docker",
      "PostgreSQL",
      "GraphQL"
    ],
    soft: [
      "Problem Solving",
      "Team Collaboration",
      "Technical Leadership",
      "Agile Development",
      "Code Review",
      "System Design"
    ]
  }
};

export const businessProfessionalSample: ResumeData = {
  personalInfo: {
    fullName: "Michael Business",
    email: "m.business@corpfinance.com",
    phone: "(555) 456-7890",
    location: "Chicago, IL",
    website: "michaelbusiness.pro",
    linkedin: "linkedin.com/in/michaelbusiness"
  },
  experience: [
    {
      id: "1",
      position: "Business Development Director",
      company: "CorpFinance Solutions",
      startDate: "2019-08",
      endDate: "",
      current: true,
      description: "Spearheaded strategic partnerships generating $15M in new revenue streams. Led market expansion initiatives across 5 new territories. Built and managed high-performing BD team of 8 professionals."
    }
  ],
  education: [
    {
      id: "1",
      degree: "Master of Business Administration",
      field: "Finance",
      school: "Wharton School",
      startDate: "2017-09",
      endDate: "2019-05",
      gpa: "3.9"
    }
  ],
  skills: {
    technical: [
      "Strategic Planning",
      "Financial Analysis",
      "Market Research",
      "CRM Systems",
      "Data Analytics",
      "Project Management"
    ],
    soft: [
      "Leadership",
      "Negotiation",
      "Communication",
      "Relationship Building",
      "Strategic Thinking",
      "Team Management"
    ]
  }
};

// Template style configurations for different industries
export const templateStyles = {
  marketing: {
    headerBg: "bg-gradient-to-r from-blue-600 to-purple-600",
    headerText: "text-white",
    accentColor: "text-blue-600",
    borderColor: "border-blue-200",
    sectionBorder: "border-l-4 border-blue-400 pl-3",
    layout: "modern",
    spacing: "relaxed",
    skillsGrid: true
  },
  tech: {
    headerBg: "bg-gradient-tech",
    headerText: "text-tech-text",
    accentColor: "text-tech-primary",
    borderColor: "border-tech-border",
    sectionBorder: "border-l-4 border-tech-primary pl-3",
    layout: "circuit",
    spacing: "compact",
    skillsGrid: true,
    backgroundPattern: "bg-circuit-pattern"
  },
  creative: {
    headerBg: "bg-gradient-creative",
    headerText: "text-creative-text",
    accentColor: "text-creative-primary",
    borderColor: "border-creative-border",
    sectionBorder: "border-l-4 border-creative-accent pl-3",
    layout: "artistic",
    spacing: "dynamic",
    skillsGrid: false,
    backgroundPattern: "bg-gradient-to-br from-creative-primary/5 via-creative-secondary/5 to-creative-accent/5"
  },
  finance: {
    headerBg: "bg-gradient-finance",
    headerText: "text-finance-text",
    accentColor: "text-finance-primary",
    borderColor: "border-finance-border",
    sectionBorder: "border-l-4 border-finance-primary pl-3",
    layout: "sophisticated",
    spacing: "elegant",
    skillsGrid: true,
    backgroundPattern: "bg-finance-bg"
  },
  healthcare: {
    headerBg: "bg-gradient-healthcare",
    headerText: "text-healthcare-text",
    accentColor: "text-healthcare-primary",
    borderColor: "border-healthcare-border",
    sectionBorder: "border-l-4 border-healthcare-secondary pl-3",
    layout: "clean",
    spacing: "calming",
    skillsGrid: true,
    backgroundPattern: "bg-healthcare-bg"
  },
  business: {
    headerBg: "bg-gradient-business",
    headerText: "text-business-text",
    accentColor: "text-business-primary",
    borderColor: "border-business-border",
    sectionBorder: "border-l-4 border-business-primary pl-3",
    layout: "professional",
    spacing: "corporate",
    skillsGrid: false,
    backgroundPattern: "bg-business-bg"
  }
};

// Sample data for Creative industry
export const creativeProfessionalSample: ResumeData = {
  personalInfo: {
    fullName: "Luna Creative",
    email: "luna.creative@design.studio",
    phone: "(555) 246-8135",
    location: "Los Angeles, CA",
    website: "lunacreative.portfolio",
    linkedin: "linkedin.com/in/lunacreative"
  },
  experience: [
    {
      id: "1",
      position: "Creative Director",
      company: "Vibrant Studios",
      startDate: "2021-03",
      endDate: "",
      current: true,
      description: "Leading creative vision for 50+ brand campaigns, increasing client engagement by 200%. Managed multidisciplinary team of designers, photographers, and content creators. Pioneered innovative visual storytelling techniques that became industry standards."
    },
    {
      id: "2",
      position: "Senior Art Director",
      company: "ColorBox Agency",
      startDate: "2018-06",
      endDate: "2021-02",
      current: false,
      description: "Conceptualized and executed award-winning visual campaigns for Fortune 500 clients. Collaborated with brand strategists to develop compelling visual narratives. Led rebranding initiatives resulting in 85% brand recognition improvement."
    }
  ],
  education: [
    {
      id: "1",
      degree: "Master of Fine Arts",
      field: "Visual Design",
      school: "Art Center College of Design",
      startDate: "2016-09",
      endDate: "2018-05",
      gpa: "3.9"
    }
  ],
  skills: {
    technical: [
      "Adobe Creative Suite",
      "Figma & Sketch",
      "3D Modeling",
      "Motion Graphics",
      "Brand Identity Design",
      "Typography Design"
    ],
    soft: [
      "Creative Vision",
      "Visual Storytelling",
      "Art Direction",
      "Team Leadership",
      "Client Collaboration",
      "Trend Analysis"
    ]
  }
};

// Sample data for Finance industry
export const financeProfessionalSample: ResumeData = {
  personalInfo: {
    fullName: "Marcus Finance",
    email: "marcus.finance@goldcorp.com",
    phone: "(555) 789-4567",
    location: "New York, NY",
    website: "marcusfinance.pro",
    linkedin: "linkedin.com/in/marcusfinance"
  },
  experience: [
    {
      id: "1",
      position: "Senior Investment Analyst",
      company: "GoldCorp Financial",
      startDate: "2020-01",
      endDate: "",
      current: true,
      description: "Managing $500M+ investment portfolio with 18% annual returns. Conducting comprehensive market analysis and risk assessment for high-net-worth clients. Developed proprietary algorithmic trading models increasing portfolio efficiency by 35%."
    },
    {
      id: "2",
      position: "Financial Advisor",
      company: "Premium Wealth Management",
      startDate: "2017-08",
      endDate: "2019-12",
      current: false,
      description: "Provided strategic financial planning for ultra-high-net-worth individuals. Structured complex investment vehicles and tax optimization strategies. Maintained 98% client retention rate through exceptional service delivery."
    }
  ],
  education: [
    {
      id: "1",
      degree: "Master of Business Administration",
      field: "Finance & Economics",
      school: "Harvard Business School",
      startDate: "2015-09",
      endDate: "2017-06",
      gpa: "3.8"
    }
  ],
  skills: {
    technical: [
      "Portfolio Management",
      "Risk Analysis",
      "Financial Modeling",
      "Bloomberg Terminal",
      "Derivatives Trading",
      "Quantitative Analysis"
    ],
    soft: [
      "Strategic Planning",
      "Client Relations",
      "Market Insight",
      "Risk Management",
      "Wealth Preservation",
      "Investment Strategy"
    ]
  }
};

// Sample data for Healthcare industry
export const healthcareProfessionalSample: ResumeData = {
  personalInfo: {
    fullName: "Dr. Sarah Wellness",
    email: "dr.sarah@healthcenter.com",
    phone: "(555) 321-9876",
    location: "Seattle, WA",
    website: "drsarahwellness.com",
    linkedin: "linkedin.com/in/drsarahwellness"
  },
  experience: [
    {
      id: "1",
      position: "Chief Medical Officer",
      company: "Seattle Health Center",
      startDate: "2019-07",
      endDate: "",
      current: true,
      description: "Leading medical operations for 500-bed hospital serving 100,000+ patients annually. Implemented evidence-based protocols reducing patient readmission rates by 25%. Spearheaded digital health initiatives improving patient care quality and operational efficiency."
    },
    {
      id: "2",
      position: "Senior Physician",
      company: "Northwest Medical Group",
      startDate: "2015-01",
      endDate: "2019-06",
      current: false,
      description: "Provided comprehensive primary care to diverse patient population. Established preventive care programs resulting in 30% improvement in patient health outcomes. Mentored medical residents and contributed to clinical research initiatives."
    }
  ],
  education: [
    {
      id: "1",
      degree: "Doctor of Medicine",
      field: "Internal Medicine",
      school: "University of Washington School of Medicine",
      startDate: "2011-09",
      endDate: "2015-06",
      gpa: "3.9"
    }
  ],
  skills: {
    technical: [
      "Clinical Diagnosis",
      "Electronic Health Records",
      "Medical Research",
      "Quality Improvement",
      "Healthcare Administration",
      "Telemedicine"
    ],
    soft: [
      "Patient Care",
      "Medical Leadership",
      "Team Collaboration",
      "Clinical Decision Making",
      "Healthcare Innovation",
      "Compassionate Care"
    ]
  }
};