-- Update Market Research Fundamentals module with enhanced professional content
UPDATE public.learning_modules 
SET 
  title = 'Market Research Fundamentals: Professional Industry Analysis',
  description = 'Master professional market research methodologies, industry analysis frameworks, and data-driven decision making for strategic career transitions and business insights.',
  duration_minutes = 90,
  learning_objectives = ARRAY[
    'Execute comprehensive primary and secondary research methodologies',
    'Apply Porter''s Five Forces and PESTEL analysis frameworks professionally', 
    'Conduct competitive intelligence and market sizing analysis',
    'Validate research findings using multiple data sources and methods',
    'Create actionable market research reports with strategic recommendations',
    'Design research projects aligned with business objectives and career goals'
  ],
  prerequisites = ARRAY[
    'Basic understanding of business fundamentals',
    'Familiarity with Excel or Google Sheets for data analysis',
    'Access to internet for research activities'
  ],
  target_audience = ARRAY[
    'Career changers researching new industries',
    'Business professionals seeking analytical skills',
    'Entrepreneurs planning market entry',
    'Consultants developing industry expertise'
  ],
  industry_applications = ARRAY[
    'Management Consulting',
    'Business Development', 
    'Strategic Planning',
    'Market Analysis',
    'Investment Research',
    'Competitive Intelligence'
  ],
  practical_applications = ARRAY[
    'Industry attractiveness assessment',
    'Competitive landscape mapping',
    'Market opportunity identification',
    'Strategic positioning analysis',
    'Investment decision support',
    'Career transition planning'
  ],
  content_sections = '[
    {
      "id": "research-methodology",
      "title": "Professional Research Methodology",
      "type": "framework_guide",
      "duration_minutes": 15,
      "description": "Master the fundamentals of professional market research design, data collection methods, and validation techniques.",
      "is_required": true,
      "order_index": 1,
      "learning_outcomes": [
        "Design comprehensive research projects with clear objectives",
        "Select appropriate primary and secondary research methods",
        "Implement data validation and quality assurance protocols",
        "Apply research ethics and data privacy standards"
      ],
      "content_blocks": [
        {
          "id": "research-design",
          "type": "framework",
          "title": "Research Project Design Framework",
          "content": {
            "name": "Professional Research Design",
            "description": "Systematic approach to planning and executing market research projects",
            "steps": [
              {
                "step_number": 1,
                "title": "Define Research Objectives",
                "description": "Establish clear, measurable research questions aligned with business goals",
                "key_actions": [
                  "Identify primary research question and 3-5 supporting questions",
                  "Define success metrics and decision criteria",
                  "Establish research scope and constraints",
                  "Align objectives with stakeholder needs"
                ],
                "examples": [
                  "What is the market size and growth potential for AI consulting services?",
                  "How attractive is the renewable energy sector for career transition?",
                  "What competitive advantages exist in the fintech payment space?"
                ]
              },
              {
                "step_number": 2,
                "title": "Select Research Methods",
                "description": "Choose optimal combination of primary and secondary research approaches",
                "key_actions": [
                  "Evaluate secondary sources: industry reports, government data, academic research",
                  "Design primary research: surveys, interviews, focus groups, observations",
                  "Determine sample size and selection criteria",
                  "Create data collection timeline and resource requirements"
                ],
                "examples": [
                  "Secondary: IBISWorld industry reports + LinkedIn industry insights",
                  "Primary: 20 expert interviews + 200-person industry survey",
                  "Observational: Competitor website analysis + social media monitoring"
                ]
              },
              {
                "step_number": 3,
                "title": "Data Collection & Validation",
                "description": "Execute research plan with quality controls and validation checks",
                "key_actions": [
                  "Implement systematic data collection protocols",
                  "Cross-reference findings across multiple sources",
                  "Validate data accuracy and completeness",
                  "Document methodology and potential limitations"
                ],
                "examples": [
                  "Triangulate salary data: Glassdoor + PayScale + Bureau of Labor Statistics",
                  "Verify market size: Top-down (TAM) + Bottom-up (unit economics)",
                  "Validate trends: Multiple time periods + leading indicators"
                ]
              }
            ],
            "when_to_use": "At the beginning of any market research project to ensure systematic, professional approach",
            "benefits": [
              "Reduces research bias and blind spots",
              "Improves data quality and reliability",
              "Enables replicable research processes",
              "Supports evidence-based decision making"
            ],
            "common_pitfalls": [
              "Starting research without clear objectives",
              "Relying on single data sources",
              "Ignoring data quality and validation",
              "Skipping methodology documentation"
            ]
          },
          "order_index": 1
        }
      ],
      "practical_applications": [
        "Industry research project planning",
        "Competitive analysis design",
        "Market opportunity assessment"
      ]
    },
    {
      "id": "industry-analysis-frameworks",
      "title": "Industry Analysis Frameworks",
      "type": "framework_guide", 
      "duration_minutes": 20,
      "description": "Apply professional frameworks including Porter''s Five Forces, PESTEL analysis, and industry life cycle assessment.",
      "is_required": true,
      "order_index": 2,
      "learning_outcomes": [
        "Execute Porter''s Five Forces analysis for industry attractiveness",
        "Conduct PESTEL analysis for macro-environment assessment",
        "Map industry value chains and competitive dynamics",
        "Assess industry life cycle stage and implications"
      ],
      "content_blocks": [
        {
          "id": "porters-five-forces",
          "type": "framework",
          "title": "Porter''s Five Forces Analysis",
          "content": {
            "name": "Porter''s Five Forces Framework",
            "description": "Comprehensive framework for analyzing industry competitiveness and profitability",
            "steps": [
              {
                "step_number": 1,
                "title": "Threat of New Entrants",
                "description": "Assess barriers to entry and likelihood of new competitors",
                "key_actions": [
                  "Evaluate capital requirements and startup costs",
                  "Analyze regulatory barriers and licensing requirements", 
                  "Assess brand loyalty and customer switching costs",
                  "Review economies of scale and learning curve advantages"
                ],
                "examples": [
                  "High barriers: Commercial aviation (capital intensive, regulated)",
                  "Medium barriers: Restaurant industry (moderate capital, local regulations)",
                  "Low barriers: Digital marketing services (low capital, few regulations)"
                ]
              },
              {
                "step_number": 2,
                "title": "Bargaining Power of Suppliers",
                "description": "Evaluate supplier concentration and switching costs",
                "key_actions": [
                  "Count number of viable suppliers and alternatives",
                  "Assess supplier switching costs and contract terms",
                  "Evaluate supplier differentiation and uniqueness",
                  "Analyze forward integration potential of suppliers"
                ],
                "examples": [
                  "High power: Specialized software licenses, rare earth materials",
                  "Medium power: Office space rental, professional services",
                  "Low power: Commodity materials, standardized components"
                ]
              },
              {
                "step_number": 3,
                "title": "Bargaining Power of Buyers",
                "description": "Analyze customer concentration and price sensitivity",
                "key_actions": [
                  "Evaluate customer concentration and purchase volumes",
                  "Assess price sensitivity and switching costs",
                  "Analyze backward integration threats",
                  "Review product differentiation and alternatives"
                ],
                "examples": [
                  "High power: Large enterprise software buyers, government contracts",
                  "Medium power: Small business services, professional consulting",
                  "Low power: Consumer brands, essential services"
                ]
              },
              {
                "step_number": 4,
                "title": "Threat of Substitutes",
                "description": "Identify alternative solutions and technologies",
                "key_actions": [
                  "Map direct and indirect substitute products/services",
                  "Evaluate performance and price comparisons",
                  "Assess switching costs and adoption barriers",
                  "Monitor emerging technologies and trends"
                ],
                "examples": [
                  "High threat: Physical media → Digital streaming",
                  "Medium threat: Traditional taxis → Ride-sharing",
                  "Low threat: Essential utilities, regulated services"
                ]
              },
              {
                "step_number": 5,
                "title": "Competitive Rivalry",
                "description": "Analyze competitive intensity and market dynamics",
                "key_actions": [
                  "Count competitors and market concentration",
                  "Evaluate growth rates and capacity utilization",
                  "Assess differentiation levels and switching costs",
                  "Analyze exit barriers and competitive moves"
                ],
                "examples": [
                  "High rivalry: Airlines, retail, commodities",
                  "Medium rivalry: Professional services, healthcare",
                  "Low rivalry: Utilities, specialized B2B services"
                ]
              }
            ],
            "when_to_use": "For industry attractiveness assessment, competitive strategy development, and investment decisions",
            "benefits": [
              "Systematic industry competitiveness evaluation",
              "Identifies profit potential and strategic opportunities",
              "Guides competitive positioning decisions",
              "Supports market entry and investment analysis"
            ],
            "common_pitfalls": [
              "Static analysis without considering industry evolution",
              "Oversimplifying complex competitive dynamics",
              "Ignoring interdependencies between forces",
              "Focusing only on current state vs. future trends"
            ]
          },
          "order_index": 1
        },
        {
          "id": "pestel-analysis",
          "type": "framework",
          "title": "PESTEL Environmental Analysis",
          "content": {
            "name": "PESTEL Analysis Framework",
            "description": "Comprehensive macro-environment analysis covering Political, Economic, Social, Technological, Environmental, and Legal factors",
            "steps": [
              {
                "step_number": 1,
                "title": "Political Factors",
                "description": "Analyze government policies, regulations, and political stability",
                "key_actions": [
                  "Review government stability and policy changes",
                  "Assess regulatory environment and compliance requirements",
                  "Evaluate trade policies and international relations",
                  "Monitor political risk and corruption levels"
                ],
                "examples": [
                  "Brexit impact on financial services",
                  "Healthcare regulation changes",
                  "Data privacy laws (GDPR, CCPA)",
                  "Trade war effects on supply chains"
                ]
              },
              {
                "step_number": 2,
                "title": "Economic Factors",
                "description": "Evaluate macroeconomic conditions and trends",
                "key_actions": [
                  "Analyze GDP growth, inflation, and interest rates",
                  "Assess unemployment and consumer spending power",
                  "Review exchange rates and economic cycles",
                  "Evaluate access to capital and investment flows"
                ],
                "examples": [
                  "Interest rate impact on real estate",
                  "Currency fluctuations on imports/exports",
                  "Recession effects on luxury goods",
                  "Inflation impact on input costs"
                ]
              },
              {
                "step_number": 3,
                "title": "Social Factors",
                "description": "Examine demographic and cultural trends",
                "key_actions": [
                  "Analyze demographic shifts and population trends",
                  "Assess cultural values and lifestyle changes",
                  "Review education levels and workforce skills",
                  "Evaluate health consciousness and social attitudes"
                ],
                "examples": [
                  "Aging population impact on healthcare",
                  "Remote work culture changes",
                  "Sustainability consciousness",
                  "Digital native consumer behavior"
                ]
              },
              {
                "step_number": 4,
                "title": "Technological Factors",
                "description": "Evaluate technology trends and innovation",
                "key_actions": [
                  "Monitor emerging technologies and adoption rates",
                  "Assess automation and digitization trends",
                  "Review R&D investment and innovation cycles",
                  "Evaluate technology infrastructure and access"
                ],
                "examples": [
                  "AI automation in professional services",
                  "5G network deployment impact",
                  "Cloud computing adoption",
                  "Blockchain technology applications"
                ]
              },
              {
                "step_number": 5,
                "title": "Environmental Factors",
                "description": "Analyze environmental and sustainability concerns",
                "key_actions": [
                  "Assess climate change impacts and risks",
                  "Review environmental regulations and standards",
                  "Evaluate resource scarcity and sustainability",
                  "Monitor renewable energy and green technology trends"
                ],
                "examples": [
                  "Carbon emissions regulations",
                  "Sustainable packaging requirements",
                  "Water scarcity impact on operations",
                  "Renewable energy cost trends"
                ]
              },
              {
                "step_number": 6,
                "title": "Legal Factors",
                "description": "Examine legal framework and regulatory changes",
                "key_actions": [
                  "Review industry-specific regulations",
                  "Assess employment and labor laws",
                  "Evaluate intellectual property protection",
                  "Monitor consumer protection and safety standards"
                ],
                "examples": [
                  "Employment law changes",
                  "Intellectual property enforcement",
                  "Consumer data protection",
                  "Safety and quality standards"
                ]
              }
            ],
            "when_to_use": "For strategic planning, market entry decisions, and long-term industry trend analysis",
            "benefits": [
              "Comprehensive macro-environment understanding",
              "Early identification of opportunities and threats",
              "Strategic planning and risk assessment support",
              "Stakeholder communication and alignment"
            ],
            "common_pitfalls": [
              "Information overload without prioritization",
              "Static analysis without monitoring changes",
              "Lack of quantification and impact assessment",
              "Insufficient connection to business implications"
            ]
          },
          "order_index": 2
        }
      ],
      "case_studies": [
        {
          "id": "fintech-industry-analysis",
          "title": "FinTech Industry Competitive Analysis",
          "scenario": "A traditional banker is considering transitioning to the FinTech industry and needs to understand the competitive landscape and opportunities.",
          "background": "The global FinTech market is experiencing rapid growth, driven by digital transformation, regulatory changes, and changing consumer preferences. Traditional financial institutions are being disrupted by agile startups and tech giants entering the space.",
          "challenge": "Assess the attractiveness of the FinTech industry for career transition, identify key competitive forces, and determine the most promising sub-sectors and roles.",
          "context": {
            "industry": "Financial Technology",
            "company_size": "Individual career assessment",
            "timeline": "6-month research and transition plan"
          },
          "analysis_points": [
            "Apply Porter''s Five Forces to evaluate industry attractiveness",
            "Use PESTEL analysis to identify macro-environmental factors",
            "Assess different FinTech sub-sectors (payments, lending, wealth management, insurtech)",
            "Evaluate skill requirements and career pathways",
            "Identify key players and competitive dynamics"
          ],
          "discussion_questions": [
            "Which FinTech sub-sector presents the most attractive opportunities and why?",
            "How do regulatory changes affect different areas of FinTech?",
            "What competitive advantages do traditional banks have vs. FinTech startups?",
            "How might emerging technologies (AI, blockchain, quantum computing) reshape the industry?"
          ],
          "key_takeaways": [
            "Industry analysis provides structured approach to career decision-making",
            "Multiple frameworks reveal different aspects of industry attractiveness",
            "Regulatory environment significantly impacts FinTech opportunities",
            "Understanding competitive forces helps identify strategic positioning"
          ],
          "related_concepts": [
            "Digital transformation",
            "Regulatory technology (RegTech)",
            "Open banking",
            "Cryptocurrency and DeFi"
          ]
        }
      ],
      "practical_applications": [
        "Industry attractiveness assessment for career transitions",
        "Competitive positioning analysis",
        "Strategic planning and market entry decisions"
      ]
    },
    {
      "id": "competitive-intelligence",
      "title": "Competitive Intelligence & Market Mapping",
      "type": "interactive",
      "duration_minutes": 15,
      "description": "Develop skills in competitor analysis, market mapping, and competitive intelligence gathering using professional tools and techniques.",
      "is_required": true,
      "order_index": 3,
      "learning_outcomes": [
        "Conduct systematic competitor identification and profiling",
        "Map competitive landscapes and strategic groups",
        "Gather competitive intelligence using ethical methods",
        "Analyze competitive strengths, weaknesses, and strategies"
      ],
      "content_blocks": [
        {
          "id": "competitor-mapping",
          "type": "interactive",
          "title": "Competitive Landscape Mapping Exercise",
          "content": {
            "type": "skill_practice",
            "title": "Strategic Group Analysis Workshop",
            "instructions": "Learn to identify and map competitors using strategic group analysis methodology. Practice with real industry examples and develop competitive intelligence gathering skills.",
            "scenarios": [
              {
                "id": "saas-mapping",
                "situation": "You are researching the Customer Relationship Management (CRM) software industry to understand competitive positioning and identify market opportunities.",
                "options": [
                  {
                    "text": "Map competitors by price point and feature complexity",
                    "outcome": "Creates clear strategic groups: Enterprise (Salesforce, Microsoft), Mid-market (HubSpot, Pipedrive), SMB (Zoho, Freshworks)",
                    "feedback": "Excellent approach! Price and feature complexity are key differentiators in SaaS. This reveals white space opportunities and competitive dynamics."
                  },
                  {
                    "text": "Group competitors by target industry vertical",
                    "outcome": "Identifies specialized players: Healthcare (Veeva), Real Estate (Chime), Financial Services (Salesforce Financial Cloud)",
                    "feedback": "Good insight! Vertical specialization is a key competitive strategy. However, also consider horizontal factors like price and features."
                  },
                  {
                    "text": "Analyze competitors by geographic focus only",
                    "outcome": "Limited insight into competitive positioning and strategic differentiation",
                    "feedback": "Geographic analysis is useful but insufficient alone. Consider combining with other strategic dimensions for deeper insights."
                  }
                ]
              },
              {
                "id": "consulting-analysis",
                "situation": "Analyze the management consulting industry to understand career opportunities and competitive positioning.",
                "options": [
                  {
                    "text": "Segment by service type and client size",
                    "outcome": "Clear groups emerge: Strategy (McKinsey, BCG, Bain), Technology (Accenture, Deloitte Digital), Boutique specialists",
                    "feedback": "Excellent framework! Service type and client size are core differentiators. This helps identify career paths and firm positioning."
                  },
                  {
                    "text": "Focus only on revenue size and employee count",
                    "outcome": "Shows scale differences but misses strategic positioning and service differentiation",
                    "feedback": "Size metrics are important but don''t capture strategic differences. Include service offerings and client focus for better analysis."
                  },
                  {
                    "text": "Map by founding date and company age",
                    "outcome": "Historical perspective but limited strategic insight into current competitive dynamics",
                    "feedback": "Company age provides context but doesn''t reveal current competitive advantages or market positioning."
                  }
                ]
              }
            ],
            "reflection_prompts": [
              "How do you identify the most relevant strategic dimensions for competitor mapping?",
              "What sources would you use to gather competitive intelligence ethically?",
              "How might competitive landscapes change over the next 2-3 years?",
              "What competitive blind spots might traditional analysis miss?"
            ],
            "success_criteria": [
              "Identifies 3-5 relevant strategic dimensions for mapping",
              "Creates comprehensive competitor profiles with key data points",
              "Maps strategic groups with clear positioning logic",
              "Identifies market gaps and competitive opportunities"
            ]
          },
          "order_index": 1
        }
      ],
      "interactive_elements": [
        {
          "id": "competitor-research",
          "title": "Competitive Intelligence Research Project",
          "type": "skill_practice",
          "instructions": "Select an industry of interest and conduct a comprehensive competitive analysis using professional research methods and tools.",
          "reflection_prompts": [
            "What competitive intelligence sources proved most valuable?",
            "How did you validate competitive information across multiple sources?",
            "What unexpected competitive dynamics did you discover?",
            "How would you monitor competitive changes over time?"
          ],
          "success_criteria": [
            "Identifies top 10-15 key competitors with detailed profiles",
            "Maps competitive landscape using 2-3 strategic dimensions", 
            "Validates findings using multiple independent sources",
            "Identifies 3-5 strategic opportunities or market gaps"
          ]
        }
      ],
      "practical_applications": [
        "Job market competitive analysis for career planning",
        "Industry competitive landscape assessment",
        "Strategic positioning and differentiation analysis"
      ]
    },
    {
      "id": "market-sizing-validation",
      "title": "Market Sizing & Data Validation",
      "type": "framework_guide",
      "duration_minutes": 15,
      "description": "Master market sizing methodologies including TAM/SAM/SOM analysis and learn data validation techniques for reliable market research.",
      "is_required": true,
      "order_index": 4,
      "learning_outcomes": [
        "Calculate Total Addressable Market (TAM), Serviceable Addressable Market (SAM), and Serviceable Obtainable Market (SOM)",
        "Apply top-down and bottom-up market sizing approaches",
        "Validate market size estimates using multiple methodologies",
        "Assess market growth potential and trends"
      ],
      "content_blocks": [
        {
          "id": "market-sizing-framework",
          "type": "framework",
          "title": "Market Sizing Methodology",
          "content": {
            "name": "TAM/SAM/SOM Market Sizing Framework",
            "description": "Systematic approach to quantifying market opportunities using Total Addressable Market, Serviceable Addressable Market, and Serviceable Obtainable Market analysis",
            "steps": [
              {
                "step_number": 1,
                "title": "Define Total Addressable Market (TAM)",
                "description": "Calculate the total market demand for a product or service across all segments and geographies",
                "key_actions": [
                  "Define product/service category broadly",
                  "Identify all potential customers globally",
                  "Calculate total spending on category",
                  "Use top-down approach with industry reports"
                ],
                "examples": [
                  "Global CRM software market: $58.8 billion (2022)",
                  "US management consulting: $165 billion (2023)",
                  "Global cybersecurity services: $267 billion (2023)"
                ]
              },
              {
                "step_number": 2,
                "title": "Calculate Serviceable Addressable Market (SAM)",
                "description": "Narrow to the portion of TAM that your specific product/service can realistically address",
                "key_actions": [
                  "Apply geographic constraints and regulations",
                  "Filter by customer segment and size",
                  "Consider product/service limitations",
                  "Account for competitive positioning"
                ],
                "examples": [
                  "CRM for SMBs in North America: $8.2 billion",
                  "Strategy consulting for Fortune 500: $12 billion",
                  "Cybersecurity for healthcare sector: $22 billion"
                ]
              },
              {
                "step_number": 3,
                "title": "Determine Serviceable Obtainable Market (SOM)",
                "description": "Estimate the realistic market share achievable given resources, competition, and market dynamics",
                "key_actions": [
                  "Analyze competitive landscape and market share",
                  "Assess go-to-market capabilities and resources",
                  "Consider timeline and growth constraints",
                  "Apply bottom-up validation using sales forecasts"
                ],
                "examples": [
                  "Realistic 5-year capture: 0.1-1.0% of SAM",
                  "Startup SOM typically 0.1-0.5% in mature markets",
                  "Market leaders may achieve 10-30% SOM"
                ]
              },
              {
                "step_number": 4,
                "title": "Validate with Bottom-Up Analysis",
                "description": "Cross-check market sizing using customer-level analysis and unit economics",
                "key_actions": [
                  "Count potential customers in target segments",
                  "Estimate average revenue per customer",
                  "Calculate customer acquisition and lifetime value",
                  "Compare bottom-up to top-down estimates"
                ],
                "examples": [
                  "10,000 target SMBs × $5,000 annual spend = $50M market",
                  "500 enterprise clients × $200K average deal = $100M opportunity",
                  "1M consumers × $50 annual purchase = $50M market"
                ]
              }
            ],
            "when_to_use": "For business planning, investment decisions, market entry assessment, and strategic planning",
            "benefits": [
              "Quantifies market opportunities systematically",
              "Provides realistic growth targets and expectations",
              "Supports investment and resource allocation decisions",
              "Enables market prioritization and strategic focus"
            ],
            "common_pitfalls": [
              "Overestimating addressable market without constraints",
              "Using outdated or unreliable market data",
              "Ignoring competitive dynamics and market maturity",
              "Failing to validate top-down with bottom-up analysis"
            ]
          },
          "order_index": 1
        }
      ],
      "case_studies": [
        {
          "id": "ed-tech-market-sizing",
          "title": "EdTech Market Sizing for Career Transition",
          "scenario": "A corporate trainer is considering transitioning to the EdTech industry and needs to understand market size and growth potential in different segments.",
          "background": "The global EdTech market has experienced rapid growth, accelerated by the COVID-19 pandemic and increased adoption of digital learning. Multiple segments exist including K-12, higher education, corporate training, and professional development.",
          "challenge": "Size the EdTech market opportunity, identify the most attractive segments, and assess growth potential for a career transition decision.",
          "context": {
            "industry": "Education Technology",
            "company_size": "Individual career planning",
            "timeline": "Market analysis for 2024-2027 planning"
          },
          "analysis_points": [
            "Calculate TAM for global EdTech market using multiple sources",
            "Segment SAM by education level and geography",
            "Analyze corporate training vs. academic segments",
            "Validate market size using bottom-up employee training spend",
            "Assess growth rates and market maturity by segment"
          ],
          "discussion_questions": [
            "Which EdTech segments offer the best growth opportunities?",
            "How do you validate market sizing when sources provide different estimates?",
            "What factors drive EdTech adoption and spending decisions?",
            "How might AI and emerging technologies impact market sizing?"
          ],
          "key_takeaways": [
            "Market sizing requires multiple validation methods",
            "Segment analysis reveals different opportunity levels",
            "Growth rates vary significantly by market maturity",
            "Bottom-up validation essential for realistic estimates"
          ],
          "related_concepts": [
            "Digital transformation in education",
            "Learning management systems",
            "Microlearning and mobile education",
            "Corporate learning and development"
          ]
        }
      ],
      "practical_applications": [
        "Business opportunity assessment",
        "Career transition market analysis",
        "Investment and resource planning"
      ]
    },
    {
      "id": "research-tools-databases",
      "title": "Professional Research Tools & Databases",
      "type": "article",
      "duration_minutes": 10,
      "description": "Navigate professional research databases, industry reports, and analytical tools used by consultants and analysts.",
      "is_required": true,
      "order_index": 5,
      "learning_outcomes": [
        "Access and navigate professional research databases effectively",
        "Evaluate research source quality and reliability",
        "Integrate multiple data sources for comprehensive analysis",
        "Use digital tools for competitive intelligence and market monitoring"
      ],
      "content_blocks": [
        {
          "id": "research-databases",
          "type": "text",
          "title": "Professional Research Database Guide",
          "content": "# Professional Research Tools & Databases\n\n## Industry Research Databases\n\n### Premium Industry Reports\n- **IBISWorld**: Comprehensive industry analysis with 5-year forecasts, key statistics, and competitive landscape\n- **Euromonitor**: Global market research with consumer, industrial, and service sector coverage\n- **Frost & Sullivan**: Technology-focused research with growth opportunity analysis\n- **McKinsey Global Institute**: Strategic insights and long-term trend analysis\n- **PwC Industry Reports**: Sector-specific analysis with regulatory and economic context\n\n### Financial & Market Data\n- **Bloomberg Terminal**: Real-time financial data, news, and analytics (professional access)\n- **Reuters Eikon**: Market data, news, and analysis tools\n- **S&P Capital IQ**: Company financials, market data, and industry analysis\n- **Crunchbase**: Startup and private company database with funding information\n- **PitchBook**: Private equity, venture capital, and M&A database\n\n### Government & Statistical Sources\n- **Bureau of Labor Statistics (BLS)**: Employment, wage, and industry statistics\n- **Census Bureau**: Demographic and economic data\n- **SEC EDGAR**: Public company filings and financial statements\n- **Federal Reserve Economic Data (FRED)**: Macroeconomic indicators\n- **OECD Statistics**: International economic and social indicators\n\n## Free & Low-Cost Research Tools\n\n### Market Intelligence\n- **Google Trends**: Search volume trends and geographic insights\n- **Google Market Finder**: International market opportunity identification\n- **SimilarWeb**: Website traffic and digital market intelligence\n- **LinkedIn Sales Navigator**: Professional network insights and company research\n- **AngelList**: Startup ecosystem and job market insights\n\n### Industry Analysis\n- **Company annual reports and 10-K filings**: Direct from company investor relations\n- **Industry association reports**: Trade organizations often publish market data\n- **Academic databases**: Google Scholar, JSTOR for research studies\n- **News aggregators**: Google News, AllSides for industry developments\n- **Podcast and webinar archives**: Industry thought leadership content\n\n## Competitive Intelligence Tools\n\n### Digital Competitive Analysis\n- **SEMrush**: Competitor SEO and digital marketing analysis\n- **Ahrefs**: Backlink analysis and content research\n- **SpyFu**: Competitor PPC and keyword research\n- **Owler**: Company news and competitive intelligence\n- **Glassdoor**: Company culture, salary, and employee insights\n\n### Social Media & Content Monitoring\n- **Social Mention**: Social media monitoring and sentiment analysis\n- **Google Alerts**: Automated news and content monitoring\n- **Twitter Advanced Search**: Real-time industry conversations\n- **LinkedIn Company Pages**: Employee growth, hiring trends, company updates\n- **YouTube**: Industry conference presentations, thought leadership content\n\n## Research Quality Assessment\n\n### Source Evaluation Criteria\n1. **Authority**: Who published the research? What are their credentials?\n2. **Methodology**: How was data collected and analyzed?\n3. **Recency**: When was the research conducted and published?\n4. **Scope**: What geography, time period, and segments are covered?\n5. **Bias**: What potential conflicts of interest exist?\n\n### Data Validation Techniques\n- **Triangulation**: Confirm findings across multiple independent sources\n- **Peer Review**: Check if research is cited by other credible sources\n- **Methodology Review**: Assess sample size, data collection methods, statistical significance\n- **Time Series Analysis**: Look for consistent trends across multiple time periods\n- **Cross-Reference**: Verify key statistics in multiple databases\n\n## Research Workflow Best Practices\n\n### Information Organization\n1. **Create research folders**: Organize by industry, topic, and source type\n2. **Document sources**: Maintain bibliography with access dates and URLs\n3. **Version control**: Track research updates and methodology changes\n4. **Backup systems**: Use cloud storage for research file security\n\n### Research Ethics & Compliance\n- **Respect copyright**: Properly cite sources and follow fair use guidelines\n- **Privacy protection**: Ensure research complies with data privacy regulations\n- **Competitive intelligence ethics**: Use only publicly available information\n- **Source attribution**: Give proper credit to research sources and authors\n\n### Staying Current\n- **Set up alerts**: Monitor key industry topics and competitor mentions\n- **Follow thought leaders**: Industry experts on LinkedIn and Twitter\n- **Subscribe to newsletters**: Industry publications and research firms\n- **Attend virtual events**: Webinars, conferences, and industry presentations",
          "order_index": 1
        }
      ],
      "practical_applications": [
        "Professional research project execution",
        "Competitive intelligence gathering",
        "Market opportunity identification and validation"
      ]
    },
    {
      "id": "research-project-assessment",
      "title": "Applied Research Project & Assessment",
      "type": "assessment",
      "duration_minutes": 15,
      "description": "Complete a comprehensive market research project applying all learned frameworks and methodologies with peer review and self-assessment.",
      "is_required": true,
      "order_index": 6,
      "learning_outcomes": [
        "Execute end-to-end market research project using professional methodologies",
        "Present research findings with actionable recommendations",
        "Evaluate research quality and validate findings",
        "Develop ongoing market monitoring and research capabilities"
      ],
      "content_blocks": [
        {
          "id": "final-project",
          "type": "template",
          "title": "Market Research Project Template",
          "content": "# Market Research Project Framework\n\n## Project Overview\n**Research Question**: [Define specific, measurable research objective]\n**Industry Focus**: [Target industry or market segment]\n**Timeline**: [Research duration and key milestones]\n**Success Metrics**: [How will you measure research success?]\n\n## Research Methodology\n### Primary Research Methods\n- [ ] Expert interviews (target: 5-10 industry professionals)\n- [ ] Industry survey (target: 50+ responses)\n- [ ] Competitive analysis (10-15 key players)\n- [ ] Customer/user research\n\n### Secondary Research Sources\n- [ ] Industry reports (IBISWorld, Euromonitor, etc.)\n- [ ] Government statistics and databases\n- [ ] Company financial filings and reports\n- [ ] Academic research and publications\n- [ ] Trade association data\n\n## Analysis Frameworks\n### Industry Analysis\n- [ ] Porter''s Five Forces Assessment\n- [ ] PESTEL Environmental Analysis\n- [ ] Industry Life Cycle Analysis\n- [ ] Value Chain Mapping\n\n### Market Sizing\n- [ ] TAM/SAM/SOM Calculation\n- [ ] Top-down Market Sizing\n- [ ] Bottom-up Validation\n- [ ] Growth Rate Analysis\n\n### Competitive Intelligence\n- [ ] Strategic Group Mapping\n- [ ] Competitive Positioning Analysis\n- [ ] Strengths/Weaknesses Assessment\n- [ ] Market Share Analysis\n\n## Research Execution Plan\n### Phase 1: Secondary Research (Week 1-2)\n- Industry report analysis\n- Statistical data gathering\n- Competitive landscape mapping\n- Initial market sizing\n\n### Phase 2: Primary Research (Week 3-4)\n- Expert interview scheduling and execution\n- Survey design and deployment\n- Data collection and validation\n- Preliminary analysis\n\n### Phase 3: Analysis & Synthesis (Week 5-6)\n- Framework application\n- Data validation and triangulation\n- Insight development\n- Recommendation formulation\n\n## Deliverables Checklist\n### Research Report Components\n- [ ] Executive Summary (2 pages max)\n- [ ] Methodology and Sources\n- [ ] Industry Analysis (Porter''s Five Forces, PESTEL)\n- [ ] Market Sizing and Growth Projections\n- [ ] Competitive Landscape Analysis\n- [ ] Key Insights and Opportunities\n- [ ] Strategic Recommendations\n- [ ] Implementation Roadmap\n- [ ] Appendices (detailed data, interview notes)\n\n### Presentation Materials\n- [ ] 15-minute presentation deck\n- [ ] Key findings summary\n- [ ] Visual data representations\n- [ ] Q&A preparation\n\n## Quality Assurance\n### Data Validation\n- [ ] Cross-reference key statistics across 3+ sources\n- [ ] Validate methodology with industry expert\n- [ ] Check for bias and limitations\n- [ ] Ensure statistical significance\n\n### Peer Review Process\n- [ ] Present findings to peer group\n- [ ] Incorporate feedback and suggestions\n- [ ] Address questions and challenges\n- [ ] Refine recommendations\n\n## Self-Assessment Criteria\n### Research Quality (25 points)\n- Methodology rigor and source diversity\n- Data accuracy and validation\n- Analysis depth and framework application\n- Objectivity and bias mitigation\n\n### Insight Development (25 points)\n- Novel insights and perspective\n- Practical applicability\n- Strategic thinking demonstration\n- Industry understanding depth\n\n### Communication (25 points)\n- Clear, professional presentation\n- Compelling narrative structure\n- Effective data visualization\n- Audience engagement\n\n### Implementation Focus (25 points)\n- Actionable recommendations\n- Implementation feasibility\n- Success metrics definition\n- Risk assessment and mitigation\n\n## Ongoing Market Monitoring Plan\n### Information Sources Setup\n- [ ] Google Alerts for industry keywords\n- [ ] LinkedIn following of industry thought leaders\n- [ ] Subscription to key industry publications\n- [ ] Quarterly research database reviews\n\n### Monitoring Framework\n- [ ] Key Performance Indicators (KPIs) tracking\n- [ ] Competitive movement monitoring\n- [ ] Regulatory and policy change alerts\n- [ ] Technology and innovation tracking\n\n### Review and Update Schedule\n- Monthly: News and trend review\n- Quarterly: Competitive landscape update\n- Semi-annual: Market sizing validation\n- Annual: Complete research refresh",
          "order_index": 1
        }
      ],
      "assessment_questions": [
        {
          "id": "research-methodology",
          "type": "scenario_based",
          "question": "You are researching the renewable energy consulting market for a potential career transition. Your initial research suggests the market is growing rapidly, but you find conflicting size estimates ranging from $2B to $15B globally. How would you resolve these discrepancies and validate the true market size?",
          "scenario": "Multiple reputable sources provide different market size estimates for renewable energy consulting, creating uncertainty about the true opportunity size.",
          "evaluation_criteria": [
            "Identifies need for definitional alignment (what services are included)",
            "Proposes multiple validation approaches (top-down and bottom-up)",
            "Suggests triangulation across independent sources",
            "Recognizes geographic and temporal factors affecting estimates",
            "Demonstrates understanding of research quality assessment"
          ]
        },
        {
          "id": "competitive-analysis",
          "type": "reflection",
          "question": "Reflect on your competitive analysis process. What was the most challenging aspect of gathering competitive intelligence, and how did you ensure your research remained ethical and legal?",
          "evaluation_criteria": [
            "Demonstrates awareness of ethical research boundaries",
            "Shows understanding of public vs. private information",
            "Reflects on practical challenges in competitive research",
            "Exhibits professional judgment in information gathering",
            "Shows commitment to research integrity"
          ]
        },
        {
          "id": "framework-application",
          "type": "skill_rating",
          "question": "Rate your proficiency in applying each framework covered in this module and identify which framework provided the most valuable insights for your research project.",
          "evaluation_criteria": [
            "Honest self-assessment of framework mastery",
            "Clear explanation of framework value and application",
            "Specific examples of insights generated",
            "Recognition of framework limitations and appropriate use cases",
            "Plans for continued development and application"
          ]
        }
      ],
      "practical_applications": [
        "Complete industry research project for career planning",
        "Develop ongoing market intelligence capabilities",
        "Build professional research portfolio and credentials"
      ]
    }
  ]'::jsonb,
  updated_at = now()
WHERE title LIKE '%Market Research%' OR title LIKE '%Industry Research%';

-- Verify the update
SELECT title, description, duration_minutes, array_length(learning_objectives, 1) as objectives_count
FROM public.learning_modules 
WHERE title LIKE '%Market Research%' OR title LIKE '%Industry Research%';