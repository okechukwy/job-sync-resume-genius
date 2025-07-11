export interface Template {
  name: string;
  description: string;
  image: string;
  tags: string[];
  route: string;
  industries: string[];
}

export const allTemplates: Template[] = [
  // Technology Templates (12 total)
  {
    name: "Tech Professional",
    description: "Optimized for software engineers, developers, and IT professionals",
    image: "💻",
    tags: ["ATS-Optimized", "Modern", "Clean"],
    route: "/templates/tech-professional",
    industries: ["Technology"]
  },
  {
    name: "Software Engineer Pro",
    description: "Specialized for full-stack and backend developers",
    image: "⚡",
    tags: ["Code-Focused", "Technical", "ATS-Ready"],
    route: "/templates/software-engineer-pro",
    industries: ["Technology"]
  },
  {
    name: "Data Scientist Elite",
    description: "Perfect for data scientists and machine learning engineers",
    image: "📊",
    tags: ["Analytics", "Research", "Modern"],
    route: "/templates/data-scientist-elite",
    industries: ["Technology"]
  },
  {
    name: "DevOps Engineer",
    description: "Tailored for DevOps and infrastructure professionals",
    image: "🔧",
    tags: ["Infrastructure", "Cloud", "Technical"],
    route: "/templates/devops-engineer",
    industries: ["Technology"]
  },
  {
    name: "Mobile Developer",
    description: "Designed for iOS and Android app developers",
    image: "📱",
    tags: ["Mobile", "Apps", "Innovation"],
    route: "/templates/mobile-developer",
    industries: ["Technology"]
  },
  {
    name: "Cloud Architect",
    description: "For cloud and system architecture specialists",
    image: "☁️",
    tags: ["Cloud", "Architecture", "Scalable"],
    route: "/templates/cloud-architect",
    industries: ["Technology"]
  },
  {
    name: "Cybersecurity Expert",
    description: "Security-focused design for cybersecurity professionals",
    image: "🛡️",
    tags: ["Security", "Compliance", "Professional"],
    route: "/templates/cybersecurity-expert",
    industries: ["Technology"]
  },
  {
    name: "AI/ML Engineer",
    description: "Specialized for artificial intelligence and machine learning roles",
    image: "🤖",
    tags: ["AI", "Machine Learning", "Innovation"],
    route: "/templates/ai-ml-engineer",
    industries: ["Technology"]
  },
  {
    name: "Frontend Developer",
    description: "Perfect for UI/UX and frontend development roles",
    image: "🎨",
    tags: ["Frontend", "UI/UX", "Creative"],
    route: "/templates/frontend-developer",
    industries: ["Technology"]
  },
  {
    name: "Product Manager Tech",
    description: "Optimized for technical product management roles",
    image: "📋",
    tags: ["Product", "Strategy", "Technical"],
    route: "/templates/product-manager-tech",
    industries: ["Technology"]
  },
  {
    name: "QA Engineer",
    description: "Designed for quality assurance and testing professionals",
    image: "🔍",
    tags: ["Testing", "Quality", "Methodical"],
    route: "/templates/qa-engineer",
    industries: ["Technology"]
  },
  {
    name: "IT Support Specialist",
    description: "Perfect for IT support and help desk professionals",
    image: "🆘",
    tags: ["Support", "Problem-Solving", "Customer-Focused"],
    route: "/templates/it-support-specialist",
    industries: ["Technology"]
  },

  // Healthcare Templates (8 total)
  {
    name: "Healthcare Specialist",
    description: "Perfect for doctors, nurses, and medical professionals",
    image: "🏥",
    tags: ["Professional", "Detailed", "Credible"],
    route: "/templates/healthcare-specialist",
    industries: ["Healthcare"]
  },
  {
    name: "Medical Doctor",
    description: "Sophisticated template for physicians and specialists",
    image: "👨‍⚕️",
    tags: ["Medical", "Professional", "Prestigious"],
    route: "/templates/medical-doctor",
    industries: ["Healthcare"]
  },
  {
    name: "Registered Nurse",
    description: "Caring design for nursing professionals",
    image: "👩‍⚕️",
    tags: ["Compassionate", "Professional", "Detailed"],
    route: "/templates/registered-nurse",
    industries: ["Healthcare"]
  },
  {
    name: "Pharmacist Pro",
    description: "Clinical and retail pharmacy professionals",
    image: "💊",
    tags: ["Clinical", "Precise", "Trustworthy"],
    route: "/templates/pharmacist-pro",
    industries: ["Healthcare"]
  },
  {
    name: "Physical Therapist",
    description: "Rehabilitation and physical therapy specialists",
    image: "🏃‍♂️",
    tags: ["Therapeutic", "Active", "Caring"],
    route: "/templates/physical-therapist",
    industries: ["Healthcare"]
  },
  {
    name: "Medical Research",
    description: "For medical researchers and clinical trial professionals",
    image: "🔬",
    tags: ["Research", "Scientific", "Academic"],
    route: "/templates/medical-research",
    industries: ["Healthcare"]
  },
  {
    name: "Healthcare Administrator",
    description: "Hospital and clinic management professionals",
    image: "📈",
    tags: ["Management", "Operational", "Leadership"],
    route: "/templates/healthcare-administrator",
    industries: ["Healthcare"]
  },
  {
    name: "Mental Health Professional",
    description: "Psychologists, counselors, and therapists",
    image: "🧠",
    tags: ["Empathetic", "Professional", "Trustworthy"],
    route: "/templates/mental-health-professional",
    industries: ["Healthcare"]
  },

  // Finance Templates (10 total)
  {
    name: "Finance Expert",
    description: "Designed for banking, accounting, and finance professionals",
    image: "💼",
    tags: ["Corporate", "Analytical", "Precise"],
    route: "/templates/finance-expert",
    industries: ["Finance"]
  },
  {
    name: "Investment Banker",
    description: "High-stakes finance and investment banking",
    image: "💰",
    tags: ["Elite", "Quantitative", "Professional"],
    route: "/templates/investment-banker",
    industries: ["Finance"]
  },
  {
    name: "Financial Analyst",
    description: "Data-driven design for financial analysis roles",
    image: "📊",
    tags: ["Analytical", "Data-Driven", "Precise"],
    route: "/templates/financial-analyst",
    industries: ["Finance"]
  },
  {
    name: "Accountant Pro",
    description: "Professional template for accounting roles",
    image: "🧮",
    tags: ["Detailed", "Organized", "Trustworthy"],
    route: "/templates/accountant-pro",
    industries: ["Finance"]
  },
  {
    name: "Risk Manager",
    description: "Specialized for risk management professionals",
    image: "⚖️",
    tags: ["Risk-Focused", "Strategic", "Analytical"],
    route: "/templates/risk-manager",
    industries: ["Finance"]
  },
  {
    name: "Portfolio Manager",
    description: "Investment and portfolio management specialists",
    image: "📈",
    tags: ["Investment", "Strategic", "Performance-Driven"],
    route: "/templates/portfolio-manager",
    industries: ["Finance"]
  },
  {
    name: "Corporate Finance",
    description: "Corporate financial planning and analysis",
    image: "🏢",
    tags: ["Corporate", "Strategic", "Executive"],
    route: "/templates/corporate-finance",
    industries: ["Finance"]
  },
  {
    name: "Tax Specialist",
    description: "Tax preparation and compliance professionals",
    image: "📋",
    tags: ["Compliance", "Detail-Oriented", "Precise"],
    route: "/templates/tax-specialist",
    industries: ["Finance"]
  },
  {
    name: "Financial Advisor",
    description: "Client-focused financial advisory roles",
    image: "🤝",
    tags: ["Client-Focused", "Trustworthy", "Advisory"],
    route: "/templates/financial-advisor",
    industries: ["Finance"]
  },
  {
    name: "Audit Manager",
    description: "Internal and external audit professionals",
    image: "🔍",
    tags: ["Audit", "Compliance", "Analytical"],
    route: "/templates/audit-manager",
    industries: ["Finance"]
  },

  // Creative Templates (15 total)
  {
    name: "Creative Professional",
    description: "Ideal for designers, marketers, and creative roles",
    image: "🎨",
    tags: ["Creative", "Visual", "Unique"],
    route: "/templates/creative-professional",
    industries: ["Creative"]
  },
  {
    name: "Graphic Designer",
    description: "Visual-focused design for graphic artists",
    image: "🖌️",
    tags: ["Visual", "Artistic", "Portfolio-Ready"],
    route: "/templates/graphic-designer",
    industries: ["Creative"]
  },
  {
    name: "Marketing Manager",
    description: "Strategic marketing and campaign management",
    image: "📢",
    tags: ["Strategic", "Creative", "Results-Driven"],
    route: "/templates/marketing-manager",
    industries: ["Creative"]
  },
  {
    name: "Content Creator",
    description: "Social media and content creation specialists",
    image: "📝",
    tags: ["Content", "Social Media", "Engaging"],
    route: "/templates/content-creator",
    industries: ["Creative"]
  },
  {
    name: "UX/UI Designer",
    description: "User experience and interface design roles",
    image: "📐",
    tags: ["UX/UI", "User-Centered", "Modern"],
    route: "/templates/ux-ui-designer",
    industries: ["Creative"]
  },
  {
    name: "Photographer",
    description: "Professional photography and visual arts",
    image: "📷",
    tags: ["Visual", "Artistic", "Portfolio"],
    route: "/templates/photographer",
    industries: ["Creative"]
  },
  {
    name: "Video Editor",
    description: "Video production and editing professionals",
    image: "🎬",
    tags: ["Video", "Creative", "Technical"],
    route: "/templates/video-editor",
    industries: ["Creative"]
  },
  {
    name: "Copywriter",
    description: "Creative writing and copywriting specialists",
    image: "✍️",
    tags: ["Writing", "Creative", "Persuasive"],
    route: "/templates/copywriter",
    industries: ["Creative"]
  },
  {
    name: "Brand Manager",
    description: "Brand strategy and management roles",
    image: "🏷️",
    tags: ["Branding", "Strategic", "Creative"],
    route: "/templates/brand-manager",
    industries: ["Creative"]
  },
  {
    name: "Art Director",
    description: "Creative direction and artistic leadership",
    image: "🎭",
    tags: ["Leadership", "Artistic", "Visionary"],
    route: "/templates/art-director",
    industries: ["Creative"]
  },
  {
    name: "Digital Marketer",
    description: "Digital marketing and online campaigns",
    image: "💻",
    tags: ["Digital", "Analytics", "Growth"],
    route: "/templates/digital-marketer",
    industries: ["Creative"]
  },
  {
    name: "Social Media Manager",
    description: "Social media strategy and community management",
    image: "📱",
    tags: ["Social Media", "Community", "Engaging"],
    route: "/templates/social-media-manager",
    industries: ["Creative"]
  },
  {
    name: "Web Designer",
    description: "Website design and development creative roles",
    image: "🌐",
    tags: ["Web Design", "Creative", "Technical"],
    route: "/templates/web-designer",
    industries: ["Creative"]
  },
  {
    name: "Motion Graphics",
    description: "Animation and motion graphics specialists",
    image: "🎞️",
    tags: ["Animation", "Motion", "Creative"],
    route: "/templates/motion-graphics",
    industries: ["Creative"]
  },
  {
    name: "Creative Director",
    description: "Senior creative leadership roles",
    image: "🎪",
    tags: ["Leadership", "Creative", "Strategic"],
    route: "/templates/creative-director",
    industries: ["Creative"]
  },

  // Business Templates (9 total)
  {
    name: "Sales Manager",
    description: "Sales leadership and business development",
    image: "📈",
    tags: ["Sales", "Leadership", "Results"],
    route: "/templates/sales-manager",
    industries: ["Business"]
  },
  {
    name: "Operations Manager",
    description: "Operational excellence and process optimization",
    image: "⚙️",
    tags: ["Operations", "Efficiency", "Management"],
    route: "/templates/operations-manager",
    industries: ["Business"]
  },
  {
    name: "Project Manager",
    description: "Project management and delivery specialists",
    image: "📅",
    tags: ["Project Management", "Organized", "Leadership"],
    route: "/templates/project-manager",
    industries: ["Business"]
  },
  {
    name: "Business Analyst",
    description: "Business analysis and process improvement",
    image: "📊",
    tags: ["Analytical", "Process", "Strategic"],
    route: "/templates/business-analyst",
    industries: ["Business"]
  },
  {
    name: "Consultant",
    description: "Management and strategy consulting roles",
    image: "💼",
    tags: ["Consulting", "Strategic", "Problem-Solving"],
    route: "/templates/consultant",
    industries: ["Business"]
  },
  {
    name: "HR Manager",
    description: "Human resources and talent management",
    image: "👥",
    tags: ["HR", "People-Focused", "Leadership"],
    route: "/templates/hr-manager",
    industries: ["Business"]
  },
  {
    name: "Supply Chain Manager",
    description: "Logistics and supply chain optimization",
    image: "🚛",
    tags: ["Logistics", "Optimization", "Global"],
    route: "/templates/supply-chain-manager",
    industries: ["Business"]
  },
  {
    name: "Business Development",
    description: "Growth strategy and partnership development",
    image: "🤝",
    tags: ["Growth", "Partnerships", "Strategic"],
    route: "/templates/business-development",
    industries: ["Business"]
  },
  {
    name: "Elegant Professional",
    description: "Sophisticated design with refined typography for executives",
    image: "👑",
    tags: ["Sophisticated", "Elegant", "Executive"],
    route: "/templates/elegant-professional",
    industries: ["Business"]
  },

  // Research Templates (7 total)
  {
    name: "Research Scientist",
    description: "Scientists, academics, and research professionals",
    image: "🔬",
    tags: ["Scientific", "Academic", "Detailed"],
    route: "/templates/research-scientist",
    industries: ["Research"]
  },
  {
    name: "Academic Researcher",
    description: "University and academic research positions",
    image: "🎓",
    tags: ["Academic", "Publications", "Research"],
    route: "/templates/academic-researcher",
    industries: ["Research"]
  },
  {
    name: "Lab Technician",
    description: "Laboratory and technical research roles",
    image: "🧪",
    tags: ["Technical", "Laboratory", "Precise"],
    route: "/templates/lab-technician",
    industries: ["Research"]
  },
  {
    name: "Clinical Researcher",
    description: "Clinical trials and medical research",
    image: "📋",
    tags: ["Clinical", "Medical", "Research"],
    route: "/templates/clinical-researcher",
    industries: ["Research"]
  },
  {
    name: "Data Researcher",
    description: "Data science and quantitative research",
    image: "📊",
    tags: ["Data", "Quantitative", "Analytical"],
    route: "/templates/data-researcher",
    industries: ["Research"]
  },
  {
    name: "Environmental Scientist",
    description: "Environmental and sustainability research",
    image: "🌱",
    tags: ["Environmental", "Sustainability", "Scientific"],
    route: "/templates/environmental-scientist",
    industries: ["Research"]
  },
  {
    name: "Recent Graduate",
    description: "Perfect for new graduates and entry-level positions",
    image: "🎓",
    tags: ["Fresh", "Modern", "Entry-Level"],
    route: "/templates/recent-graduate",
    industries: ["Research"]
  },

  // Multi-industry templates
  {
    name: "Gradient Modern",
    description: "Stunning gradient backgrounds with modern typography",
    image: "🌈",
    tags: ["Gradient Design", "Modern", "Eye-Catching"],
    route: "/templates/gradient-modern",
    industries: ["Technology", "Creative", "Business"]
  },
  {
    name: "Minimalist Pro",
    description: "Clean, sophisticated design that lets your content shine",
    image: "✨",
    tags: ["Clean", "Minimalist", "Professional"],
    route: "/templates/minimalist-pro",
    industries: ["Technology", "Finance", "Business", "Healthcare"]
  },
  {
    name: "Colorful Fresh",
    description: "Vibrant and energetic design for dynamic professionals",
    image: "🎯",
    tags: ["Vibrant", "Energetic", "Bold"],
    route: "/templates/colorful-fresh",
    industries: ["Creative", "Technology", "Business"]
  }
];

export const getTemplatesByIndustry = (industry: string): Template[] => {
  return allTemplates.filter(template => 
    template.industries.includes(industry)
  );
};

export const getIndustryTemplateCount = (industry: string): number => {
  return getTemplatesByIndustry(industry).length;
};