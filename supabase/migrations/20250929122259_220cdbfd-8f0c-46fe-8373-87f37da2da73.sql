-- Remove external content_url and expand content_sections for Career Transition Mastery modules
UPDATE learning_modules 
SET 
  content_url = NULL,
  content_sections = CASE 
    WHEN title = 'Career Self-Assessment & Discovery' THEN '[
      {
        "id": "overview",
        "title": "Module Overview",
        "type": "article",
        "duration_minutes": 5,
        "description": "Understanding your career foundations",
        "is_required": true,
        "order_index": 1,
        "content": {
          "text": "Career transition begins with deep self-understanding. This module helps you conduct a comprehensive assessment of your skills, values, and career aspirations to build a solid foundation for your transition journey.",
          "key_points": [
            "Complete skills inventory using proven frameworks",
            "Identify core career values and motivators", 
            "Define clear, achievable career goals",
            "Understand your unique value proposition",
            "Assess current market position"
          ],
          "objectives": [
            "Complete a comprehensive skills assessment",
            "Clarify your core values and career motivators",
            "Set specific, measurable career transition goals"
          ]
        }
      },
      {
        "id": "skills_assessment",
        "title": "Skills Assessment Framework",
        "type": "interactive",
        "duration_minutes": 20,
        "description": "Systematic evaluation of your professional capabilities",
        "is_required": true,
        "order_index": 2,
        "content": {
          "text": "Use this comprehensive framework to evaluate your technical, soft, and transferable skills. Understanding your skill portfolio is crucial for identifying transition opportunities.",
          "interactive_elements": [
            {
              "id": "skills_inventory",
              "title": "Skills Inventory Exercise",
              "type": "self_assessment",
              "instructions": "Rate your proficiency in each skill area from 1-5 and identify evidence of your expertise.",
              "scenarios": [
                {
                  "id": "technical_skills",
                  "situation": "Technical Skills Assessment",
                  "options": [
                    {
                      "text": "List your top 10 technical skills",
                      "outcome": "Creates baseline for technical capabilities",
                      "feedback": "Focus on skills most relevant to your target role"
                    },
                    {
                      "text": "Identify skill gaps in target roles",
                      "outcome": "Reveals development opportunities",
                      "feedback": "Prioritize high-impact skills for your transition"
                    }
                  ]
                }
              ],
              "reflection_prompts": [
                "Which skills are your strongest assets?",
                "What skills do you enjoy using most?", 
                "Which skills are most valuable in your target industry?",
                "What evidence do you have of your expertise in each area?"
              ],
              "success_criteria": [
                "Completed comprehensive skills inventory",
                "Identified top 5 transferable skills",
                "Documented skill evidence and examples"
              ]
            }
          ]
        }
      },
      {
        "id": "values_clarification",
        "title": "Values & Motivators Assessment", 
        "type": "interactive",
        "duration_minutes": 15,
        "description": "Identify what drives and fulfills you professionally",
        "is_required": true,
        "order_index": 3,
        "content": {
          "text": "Understanding your core values and motivators is essential for making career decisions that lead to long-term satisfaction and success.",
          "interactive_elements": [
            {
              "id": "values_assessment",
              "title": "Core Values Identification",
              "type": "self_assessment", 
              "instructions": "Rank your career values and identify what motivates you most in work situations.",
              "reflection_prompts": [
                "What aspects of work energize you most?",
                "When have you felt most fulfilled professionally?",
                "What work environments help you thrive?",
                "What values are non-negotiable in your next role?"
              ],
              "success_criteria": [
                "Identified top 5 career values",
                "Clarified key motivators and demotivators",
                "Understood value alignment with target roles"
              ]
            }
          ]
        }
      },
      {
        "id": "goal_setting",
        "title": "Career Transition Goal Setting",
        "type": "framework_guide",
        "duration_minutes": 20,
        "description": "Set clear, actionable goals for your transition",
        "is_required": true,
        "order_index": 4,
        "content": {
          "text": "Transform your self-assessment insights into specific, measurable goals that will guide your career transition strategy.",
          "frameworks": [
            {
              "id": "smart_goals_framework",
              "name": "SMART Career Transition Goals",
              "description": "A framework for setting specific, measurable, achievable, relevant, and time-bound career goals.",
              "steps": [
                {
                  "step_number": 1,
                  "title": "Specific Target Definition",
                  "description": "Define exactly what role, industry, or career path you want to pursue",
                  "key_actions": [
                    "Identify specific job titles and roles",
                    "Define target industries and company types",
                    "Clarify geographic preferences"
                  ],
                  "examples": [
                    "Transition from marketing coordinator to product manager in tech",
                    "Move from corporate finance to startup CFO role"
                  ]
                },
                {
                  "step_number": 2,
                  "title": "Measurable Milestones",
                  "description": "Establish quantifiable metrics to track your progress",
                  "key_actions": [
                    "Set networking targets (e.g., 5 new connections per week)",
                    "Define skill development goals",
                    "Establish application and interview targets"
                  ],
                  "examples": [
                    "Complete 3 relevant certifications within 6 months",
                    "Conduct 20 informational interviews in target industry"
                  ]
                }
              ],
              "when_to_use": "At the beginning of your career transition planning",
              "benefits": [
                "Provides clear direction and focus",
                "Enables progress tracking and accountability",
                "Helps prioritize activities and resources"
              ],
              "common_pitfalls": [
                "Setting unrealistic timelines",
                "Being too vague about desired outcomes",
                "Not considering market realities"
              ]
            }
          ]
        }
      }
    ]'::jsonb
    WHEN title = 'Industry Research & Market Analysis' THEN '[
      {
        "id": "introduction",
        "title": "Market Research Fundamentals",
        "type": "article",
        "duration_minutes": 10,
        "description": "Essential framework for industry and market analysis",
        "is_required": true,
        "order_index": 1,
        "content": {
          "text": "Effective career transitions require deep understanding of your target market. This module provides frameworks for researching industries, companies, and market trends to make informed career decisions.",
          "objectives": [
            "Master industry research methodologies",
            "Analyze company cultures and opportunities", 
            "Identify growth trends and market dynamics",
            "Understand competitive landscape and positioning"
          ],
          "key_points": [
            "Industry research informs strategic decision-making",
            "Company culture fit is crucial for long-term success",
            "Market trends reveal emerging opportunities",
            "Competitive analysis helps positioning"
          ]
        }
      },
      {
        "id": "industry_analysis",
        "title": "Industry Analysis Framework",
        "type": "framework_guide",
        "duration_minutes": 25,
        "description": "Systematic approach to industry research",
        "is_required": true,
        "order_index": 2,
        "content": {
          "text": "Use this comprehensive framework to analyze industries and identify the best opportunities for your career transition.",
          "frameworks": [
            {
              "id": "industry_analysis_model",
              "name": "5-Factor Industry Analysis",
              "description": "Comprehensive framework for evaluating industry attractiveness and opportunities",
              "steps": [
                {
                  "step_number": 1,
                  "title": "Growth & Trends Analysis",
                  "description": "Evaluate industry growth patterns, emerging trends, and future outlook",
                  "key_actions": [
                    "Research industry growth rates and projections",
                    "Identify emerging trends and disruptions",
                    "Analyze regulatory and economic impacts"
                  ],
                  "examples": [
                    "AI/ML driving 25% growth in tech consulting",
                    "Remote work trends reshaping real estate"
                  ]
                },
                {
                  "step_number": 2,
                  "title": "Competitive Landscape",
                  "description": "Map key players, market dynamics, and competitive advantages",
                  "key_actions": [
                    "Identify market leaders and disruptors",
                    "Analyze competitive strategies and positioning",
                    "Understand barriers to entry and success factors"
                  ],
                  "examples": [
                    "Mapping fintech vs traditional banking competition",
                    "Understanding streaming vs traditional media dynamics"
                  ]
                }
              ],
              "when_to_use": "When evaluating potential target industries for career transition",
              "benefits": [
                "Identifies high-opportunity industries",
                "Reveals market positioning strategies",
                "Informs career positioning decisions"
              ],
              "common_pitfalls": [
                "Relying on outdated industry data",
                "Overlooking emerging industry segments",
                "Focusing only on obvious market leaders"
              ]
            }
          ]
        }
      },
      {
        "id": "company_research",
        "title": "Company Culture & Opportunity Analysis",
        "type": "interactive",
        "duration_minutes": 20,
        "description": "Deep dive into target companies and cultures",
        "is_required": true,
        "order_index": 3,
        "content": {
          "text": "Research and evaluate potential employers to ensure cultural fit and identify the best opportunities for your transition goals.",
          "interactive_elements": [
            {
              "id": "company_evaluation",
              "title": "Company Assessment Exercise",
              "type": "skill_practice",
              "instructions": "Use this systematic approach to evaluate potential target companies across multiple dimensions.",
              "scenarios": [
                {
                  "id": "culture_assessment",
                  "situation": "Evaluating Company Culture Fit",
                  "options": [
                    {
                      "text": "Research employee reviews and social media presence",
                      "outcome": "Insights into actual employee experience",
                      "feedback": "Look for patterns in feedback and recent changes"
                    },
                    {
                      "text": "Analyze leadership team backgrounds and values",
                      "outcome": "Understanding of company direction and priorities", 
                      "feedback": "Leadership diversity and experience indicate company priorities"
                    }
                  ]
                }
              ],
              "reflection_prompts": [
                "What company cultures have you thrived in before?",
                "What red flags should you watch for?",
                "How do you evaluate company growth potential?",
                "What questions reveal true company culture?"
              ],
              "success_criteria": [
                "Developed comprehensive company evaluation criteria",
                "Created target company list with rationale",
                "Identified key contacts and entry strategies"
              ]
            }
          ]
        }
      }
    ]'::jsonb
    WHEN title = 'Strategic Networking & Relationship Building' THEN '[
      {
        "id": "networking_fundamentals",
        "title": "Strategic Networking Principles",
        "type": "article", 
        "duration_minutes": 15,
        "description": "Foundation principles for effective professional networking",
        "is_required": true,
        "order_index": 1,
        "content": {
          "text": "Strategic networking is the art of building meaningful professional relationships that create mutual value and open doors to opportunities. Unlike casual networking, strategic networking is intentional, focused, and built on genuine connections.",
          "key_points": [
            "Quality over quantity - focus on meaningful connections",
            "Strategic networking is about giving value, not just taking",
            "Authenticity is crucial for building lasting relationships",
            "Follow-up is what transforms contacts into relationships",
            "Networking is a long-term investment in your career"
          ],
          "objectives": [
            "Understand the difference between networking and strategic networking",
            "Learn the key principles of relationship building",
            "Develop a networking mindset focused on mutual value",
            "Master the fundamentals of professional relationship building"
          ]
        }
      },
      {
        "id": "networking_strategy",
        "title": "Networking Strategy Development",
        "type": "framework_guide",
        "duration_minutes": 25,
        "description": "Systematic approach to building your networking strategy",
        "is_required": true,
        "order_index": 2,
        "content": {
          "text": "Develop a comprehensive networking strategy that aligns with your career transition goals and maximizes your relationship-building efforts.",
          "frameworks": [
            {
              "id": "strategic_networking_framework",
              "name": "CONNECT Framework for Strategic Networking",
              "description": "A systematic approach to building and maintaining professional relationships",
              "steps": [
                {
                  "step_number": 1,
                  "title": "Clarify Your Objectives",
                  "description": "Define specific networking goals aligned with your career transition",
                  "key_actions": [
                    "Identify target roles and industries for relationship building",
                    "Set specific networking goals (e.g., 5 new connections per month)",
                    "Define what value you can offer to others"
                  ],
                  "examples": [
                    "Build relationships with 10 product managers in fintech",
                    "Connect with 5 startup founders in sustainable tech"
                  ]
                },
                {
                  "step_number": 2,
                  "title": "Organize Your Network Map",
                  "description": "Create a systematic view of your current and target network",
                  "key_actions": [
                    "Map current professional relationships",
                    "Identify network gaps in target areas",
                    "Prioritize high-value connection opportunities"
                  ],
                  "examples": [
                    "Categorize contacts by industry, role, and relationship strength",
                    "Identify connectors who can introduce you to others"
                  ]
                }
              ],
              "when_to_use": "At the beginning of your networking initiative and quarterly for review",
              "benefits": [
                "Provides structured approach to relationship building",
                "Ensures networking efforts align with career goals", 
                "Maximizes return on networking time investment"
              ],
              "common_pitfalls": [
                "Focusing only on senior-level contacts",
                "Neglecting to nurture existing relationships",
                "Not having clear value proposition for others"
              ]
            }
          ]
        }
      },
      {
        "id": "relationship_maintenance",
        "title": "Relationship Maintenance & Value Creation",
        "type": "interactive",
        "duration_minutes": 20,
        "description": "Sustaining and deepening professional relationships",
        "is_required": true,
        "order_index": 3,
        "content": {
          "text": "Building relationships is just the beginning. Learn how to maintain and deepen professional connections through consistent value creation and meaningful engagement.",
          "interactive_elements": [
            {
              "id": "relationship_maintenance",
              "title": "Relationship Nurturing Strategy",
              "type": "skill_practice",
              "instructions": "Develop your approach to maintaining and deepening professional relationships over time.",
              "scenarios": [
                {
                  "id": "value_creation",
                  "situation": "Creating Value for Your Network",
                  "options": [
                    {
                      "text": "Share relevant industry insights and opportunities",
                      "outcome": "Positions you as a valuable resource",
                      "feedback": "Consistent value sharing builds your reputation as a connector"
                    },
                    {
                      "text": "Make strategic introductions between contacts",
                      "outcome": "Strengthens your role as a network hub",
                      "feedback": "Being a connector increases your network value exponentially"
                    }
                  ]
                }
              ],
              "reflection_prompts": [
                "How do you currently stay in touch with your professional network?",
                "What unique value can you offer to others in your network?",
                "How do you balance asking for help with providing value?",
                "What system could you create for consistent relationship maintenance?"
              ],
              "success_criteria": [
                "Developed systematic relationship maintenance approach",
                "Created value proposition for network contacts",
                "Established regular outreach and engagement routine"
              ]
            }
          ]
        }
      }
    ]'::jsonb
    WHEN title = 'Personal Brand Development' THEN '[
      {
        "id": "brand_foundation",
        "title": "Personal Brand Foundation",
        "type": "article",
        "duration_minutes": 15,
        "description": "Building the foundation of your professional personal brand",
        "is_required": true,
        "order_index": 1,
        "content": {
          "text": "Your personal brand is how you present your professional identity to the world. In career transitions, a strong personal brand helps you stand out and positions you for opportunities in your target field.",
          "key_points": [
            "Personal brand is your professional reputation and perception",
            "Consistency across all touchpoints builds trust and recognition",
            "Authenticity is more powerful than perfection",
            "Your brand should align with your career transition goals",
            "Digital presence is increasingly important in personal branding"
          ],
          "objectives": [
            "Define your unique value proposition and brand promise",
            "Understand the key elements of personal brand development",
            "Learn how to align brand with career transition goals",
            "Master the fundamentals of professional brand positioning"
          ]
        }
      },
      {
        "id": "brand_strategy",
        "title": "Brand Strategy & Positioning Framework",
        "type": "framework_guide",
        "duration_minutes": 30,
        "description": "Strategic approach to developing and positioning your personal brand",
        "is_required": true,
        "order_index": 2,
        "content": {
          "text": "Develop a comprehensive personal brand strategy that effectively positions you for career transition success and long-term professional growth.",
          "frameworks": [
            {
              "id": "personal_brand_framework",
              "name": "BRAND Framework for Personal Positioning",
              "description": "Comprehensive approach to developing and communicating your personal brand",
              "steps": [
                {
                  "step_number": 1,
                  "title": "Brand Foundation & Values",
                  "description": "Establish the core foundation of your personal brand",
                  "key_actions": [
                    "Define your core values and principles",
                    "Identify your unique strengths and differentiators",
                    "Clarify your professional mission and vision"
                  ],
                  "examples": [
                    "Innovation-focused leader driving digital transformation",
                    "Data-driven marketer specializing in customer experience optimization"
                  ]
                },
                {
                  "step_number": 2,
                  "title": "Reputation & Credibility Building",
                  "description": "Build credibility and establish thought leadership in your field",
                  "key_actions": [
                    "Create valuable content that demonstrates expertise",
                    "Seek speaking and writing opportunities",
                    "Build portfolio of achievements and case studies"
                  ],
                  "examples": [
                    "Publishing weekly insights on industry trends",
                    "Speaking at professional conferences and webinars"
                  ]
                }
              ],
              "when_to_use": "Throughout your career transition and ongoing professional development",
              "benefits": [
                "Creates clear positioning in target market",
                "Builds credibility and trust with stakeholders",
                "Differentiates you from other candidates"
              ],
              "common_pitfalls": [
                "Trying to appeal to everyone instead of target audience",
                "Inconsistency across different platforms and interactions",
                "Focusing on credentials rather than value delivered"
              ]
            }
          ]
        }
      },
      {
        "id": "digital_presence",
        "title": "Digital Brand Implementation",
        "type": "interactive",
        "duration_minutes": 25,
        "description": "Implementing your brand across digital platforms",
        "is_required": true,
        "order_index": 3,
        "content": {
          "text": "Transform your brand strategy into a compelling digital presence that attracts opportunities and builds professional relationships.",
          "interactive_elements": [
            {
              "id": "digital_audit",
              "title": "Digital Presence Audit & Optimization",
              "type": "skill_practice",
              "instructions": "Conduct a comprehensive audit of your current digital presence and develop an optimization plan.",
              "scenarios": [
                {
                  "id": "linkedin_optimization",
                  "situation": "LinkedIn Profile Optimization",
                  "options": [
                    {
                      "text": "Craft compelling headline that includes target keywords",
                      "outcome": "Improves visibility in searches and clearly communicates value",
                      "feedback": "Your headline should immediately convey what you do and for whom"
                    },
                    {
                      "text": "Write summary that tells your professional story",
                      "outcome": "Creates emotional connection and demonstrates career progression",
                      "feedback": "Focus on achievements and impact rather than just responsibilities"
                    }
                  ]
                }
              ],
              "reflection_prompts": [
                "What impression does your current digital presence create?",
                "How well does your online brand align with your career goals?",
                "What content could you create to demonstrate your expertise?",
                "How can you better showcase your unique value proposition online?"
              ],
              "success_criteria": [
                "Completed comprehensive digital presence audit",
                "Optimized LinkedIn profile for target audience",
                "Developed content calendar for thought leadership"
              ]
            }
          ]
        }
      }
    ]'::jsonb
    WHEN title = 'Job Search Strategy & Execution' THEN '[
      {
        "id": "search_strategy",
        "title": "Strategic Job Search Planning",
        "type": "article",
        "duration_minutes": 20,
        "description": "Comprehensive approach to job search strategy and planning",
        "is_required": true,
        "order_index": 1,
        "content": {
          "text": "A successful career transition requires a strategic, multi-channel approach to job searching. This module provides frameworks for developing and executing an effective job search strategy.",
          "key_points": [
            "Strategic job search is more effective than reactive applying",
            "Multiple channels increase your chances of success",
            "Quality applications outperform quantity approaches",
            "Hidden job market represents 70% of opportunities",
            "Personal connections are often the best path to opportunities"
          ],
          "objectives": [
            "Develop comprehensive job search strategy aligned with goals",
            "Master multiple job search channels and approaches",
            "Learn to identify and access hidden job opportunities",
            "Create systematic approach to application tracking and follow-up"
          ]
        }
      },
      {
        "id": "search_execution",
        "title": "Job Search Execution Framework",
        "type": "framework_guide",
        "duration_minutes": 35,
        "description": "Systematic approach to executing your job search strategy",
        "is_required": true,
        "order_index": 2,
        "content": {
          "text": "Execute your job search strategy effectively using proven frameworks and systematic approaches that maximize your chances of landing the right opportunity.",
          "frameworks": [
            {
              "id": "job_search_execution_framework",
              "name": "SEARCH Framework for Job Search Execution",
              "description": "Systematic approach to executing an effective job search strategy",
              "steps": [
                {
                  "step_number": 1,
                  "title": "Sourcing & Opportunity Identification",
                  "description": "Identify and source relevant job opportunities across multiple channels",
                  "key_actions": [
                    "Set up alerts on job boards and company websites",
                    "Leverage networking contacts for referrals and insights",
                    "Research and target specific companies and roles"
                  ],
                  "examples": [
                    "Creating Google alerts for target company hiring news",
                    "Following up with former colleagues about opportunities"
                  ]
                },
                {
                  "step_number": 2,
                  "title": "Evaluation & Application Prioritization",
                  "description": "Evaluate opportunities and prioritize high-potential applications",
                  "key_actions": [
                    "Assess role fit against career goals and requirements",
                    "Research company culture and growth potential",
                    "Prioritize applications based on opportunity score"
                  ],
                  "examples": [
                    "Using scoring rubric to evaluate role attractiveness",
                    "Focusing on companies with strong cultural alignment"
                  ]
                }
              ],
              "when_to_use": "Throughout your active job search period",
              "benefits": [
                "Provides systematic approach to opportunity management",
                "Ensures comprehensive coverage of potential opportunities",
                "Maximizes efficiency and effectiveness of search efforts"
              ],
              "common_pitfalls": [
                "Applying to every available position without strategy",
                "Neglecting to research companies and roles thoroughly",
                "Poor follow-up and relationship management"
              ]
            }
          ]
        }
      },
      {
        "id": "application_optimization",
        "title": "Application & Interview Preparation",
        "type": "interactive",
        "duration_minutes": 25,
        "description": "Optimizing applications and preparing for interviews",
        "is_required": true,
        "order_index": 3,
        "content": {
          "text": "Master the art of creating compelling applications and preparing for interviews that showcase your value and fit for target roles.",
          "interactive_elements": [
            {
              "id": "application_optimization",
              "title": "Application Customization Workshop",
              "type": "skill_practice",
              "instructions": "Learn to customize your application materials for maximum impact and relevance to target roles.",
              "scenarios": [
                {
                  "id": "resume_customization",
                  "situation": "Tailoring Resume for Target Role",
                  "options": [
                    {
                      "text": "Analyze job description for key requirements and keywords",
                      "outcome": "Identifies critical elements to highlight in application",
                      "feedback": "Map your experience to specific job requirements for stronger relevance"
                    },
                    {
                      "text": "Customize achievement statements to match role needs",
                      "outcome": "Creates stronger connection between your background and role",
                      "feedback": "Quantify achievements and use action verbs that match job description language"
                    }
                  ]
                }
              ],
              "reflection_prompts": [
                "How do you currently customize applications for different roles?",
                "What achievements best demonstrate your value for target positions?",
                "How can you better showcase transferable skills from previous roles?",
                "What questions should you prepare to ask in interviews?"
              ],
              "success_criteria": [
                "Developed templates for customizing applications",
                "Created library of achievement statements for different scenarios",
                "Prepared comprehensive interview question bank and responses"
              ]
            }
          ]
        }
      }
    ]'::jsonb
  END
WHERE program_id = '635ec236-225b-4583-8b41-2616ccfc4278';

-- Remove external URLs from learning resources related to career transition
UPDATE learning_resources 
SET resource_url = NULL 
WHERE skill_areas && ARRAY['career_transition'] AND resource_url IS NOT NULL;