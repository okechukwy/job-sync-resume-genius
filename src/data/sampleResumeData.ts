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
    headerBg: "bg-gradient-to-r from-gray-900 to-gray-700",
    headerText: "text-white",
    accentColor: "text-gray-700",
    borderColor: "border-gray-200",
    sectionBorder: "border-l-4 border-gray-400 pl-3",
    layout: "clean",
    spacing: "compact",
    skillsGrid: true
  },
  business: {
    headerBg: "bg-gradient-to-r from-green-600 to-teal-600",
    headerText: "text-white",
    accentColor: "text-green-600",
    borderColor: "border-green-200",
    sectionBorder: "border-l-4 border-green-400 pl-3",
    layout: "professional",
    spacing: "balanced",
    skillsGrid: false
  }
};