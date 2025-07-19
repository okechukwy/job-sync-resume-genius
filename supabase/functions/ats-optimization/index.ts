
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-types',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('ATS optimization request received:', req.method);
    
    // Add safer JSON parsing with validation
    let requestBody;
    try {
      const rawBody = await req.text();
      console.log('Raw request body received, length:', rawBody?.length || 0);
      
      if (!rawBody || rawBody.trim() === '') {
        throw new Error('Empty request body');
      }
      
      requestBody = JSON.parse(rawBody);
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid request format',
          details: 'Request body must be valid JSON'
        }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { resumeText, jobDescription, industry = 'Business' } = requestBody;
    
    console.log('Parsed request data:', { 
      hasResumeText: !!resumeText, 
      resumeLength: resumeText?.length || 0,
      hasJobDescription: !!jobDescription,
      industry 
    });
    
    if (!resumeText || resumeText.trim().length < 50) {
      return new Response(
        JSON.stringify({ 
          error: 'Insufficient resume content',
          details: 'Resume text must be at least 50 characters long'
        }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      console.error('OpenAI API key not configured');
      return new Response(
        JSON.stringify({ 
          error: 'Service configuration error',
          details: 'AI service is not properly configured'
        }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Optimizing resume for ATS compatibility with comprehensive analysis');

    const systemPrompt = `You are an ATS (Applicant Tracking System) optimization expert. Analyze the provided resume comprehensively and return specific recommendations to improve ATS compatibility and keyword matching.

CRITICAL REQUIREMENTS FOR COMPREHENSIVE ANALYSIS:

**MINIMUM SUGGESTION TARGETS BY SECTION:**
- Professional Summary/Objective: Provide 2-3 specific optimizations
- Experience Section: Provide 2-3 optimizations PER job entry (quantification, keywords, achievement focus)
- Skills Section: Provide 2-3 optimizations (technical skills, categorization, keyword alignment)
- Education Section: Provide 1-2 optimizations if applicable
- Additional Sections: Provide 1-2 optimizations per section if present

**TOTAL TARGET: Generate 10-15+ comprehensive content optimizations covering ALL resume sections**

**ANALYSIS DEPTH REQUIREMENTS:**
1. **Section-by-Section Analysis**: Analyze EVERY section present in the resume
2. **Multiple Optimization Types Per Section**: For each section, provide optimizations across different categories
3. **Comprehensive Coverage**: Don't skip any major resume components
4. **Specific Examples**: Provide actual before/after examples for each suggestion

**OPTIMIZATION CATEGORIES TO COVER COMPREHENSIVELY:**
- **Quantification**: Add specific numbers, percentages, metrics to ALL achievements (minimum 3-4 suggestions)
- **Keywords**: Integrate relevant industry and job-specific keywords throughout ALL sections (minimum 2-3 suggestions)
- **Action Verbs**: Replace weak verbs with strong, impactful action words in ALL experience entries (minimum 2-3 suggestions)
- **Achievement Focus**: Transform ALL responsibilities into achievement-focused statements (minimum 2-3 suggestions)
- **Industry Alignment**: Use industry-standard terminology in ALL applicable sections (minimum 1-2 suggestions)
- **Formatting**: Improve ATS readability and structure throughout the resume (minimum 1-2 suggestions)

Return a JSON object with this structure:
{
  "atsScore": number (0-100),
  "keywordMatches": {
    "found": [array of matched keywords],
    "missing": [array of missing important keywords],
    "suggestions": [array of keyword optimization suggestions]
  },
  "formatOptimizations": [
    {
      "issue": "specific formatting issue",
      "recommendation": "how to fix it",
      "priority": "high|medium|low"
    }
  ],
  "contentOptimizations": [
    {
      "section": "which section to improve",
      "current": "current text sample",
      "improved": "optimized version", 
      "reasoning": "why this is better for ATS",
      "category": "quantification|keywords|action-verbs|achievement|industry-alignment|formatting"
    }
  ],
  "overallRecommendations": [
    "specific actionable recommendations"
  ]
}

**COMPREHENSIVE ANALYSIS APPROACH:**
1. Go through the resume systematically, section by section
2. For EACH section, identify ALL possible improvements across multiple optimization categories
3. Provide specific, actionable suggestions with concrete examples
4. Don't limit yourself - if you find 15+ valid optimizations, include them all
5. Focus on thoroughness and completeness rather than brevity
6. Each optimization should be specific, actionable, and impactful

**QUALITY REQUIREMENTS:**
- Each contentOptimization must have a specific "current" example from the resume
- Each "improved" version must be significantly better and more ATS-friendly
- Each "reasoning" must clearly explain the ATS benefit
- Cover multiple optimization categories across all sections
- Provide comprehensive analysis without artificial limits`;

    let userPrompt = `Analyze this resume comprehensively for ATS optimization in the ${industry} industry. Provide comprehensive content optimizations covering ALL sections with multiple suggestions per section:\n\n${resumeText}`;
    
    if (jobDescription) {
      userPrompt += `\n\nTarget job description for keyword matching and alignment:\n${jobDescription}`;
    }

    console.log('Calling OpenAI API with comprehensive analysis prompt...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', response.status, errorData);
      return new Response(
        JSON.stringify({ 
          error: 'AI service error',
          details: `Failed to process resume analysis (${response.status})`
        }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const optimizationText = data.choices[0].message.content;
    
    console.log('Raw OpenAI optimization response length:', optimizationText?.length || 0);

    // Parse the JSON response with better error handling
    let optimization;
    try {
      const jsonText = optimizationText.replace(/```json\n?|\n?```/g, '').trim();
      optimization = JSON.parse(jsonText);
      
      // Validate the structure
      if (!optimization.atsScore || !optimization.keywordMatches || !optimization.overallRecommendations) {
        throw new Error('Invalid response structure from AI');
      }

      // Ensure we have content optimizations array
      if (!optimization.contentOptimizations) {
        optimization.contentOptimizations = [];
      }

      // Log suggestion counts for monitoring
      console.log('AI-generated suggestions:', {
        contentOptimizations: optimization.contentOptimizations?.length || 0,
        formatOptimizations: optimization.formatOptimizations?.length || 0,
        overallRecommendations: optimization.overallRecommendations?.length || 0
      });

      // Check if we have insufficient suggestions and enhance if needed
      if (optimization.contentOptimizations.length < 8) {
        console.log('Insufficient AI suggestions, enhancing with comprehensive fallback');
        optimization = enhanceWithComprehensiveSuggestions(optimization, resumeText, industry);
      }

    } catch (parseError) {
      console.error('Failed to parse OpenAI response as JSON:', parseError);
      console.error('Raw response:', optimizationText);
      
      // Return comprehensive fallback response
      optimization = getComprehensiveFallbackResponse(resumeText, industry);
    }

    console.log('Final optimization result:', {
      atsScore: optimization.atsScore,
      contentOptimizations: optimization.contentOptimizations?.length || 0,
      formatOptimizations: optimization.formatOptimizations?.length || 0
    });

    return new Response(JSON.stringify(optimization), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ats-optimization function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Unknown error',
        details: 'Failed to generate ATS optimization. Please try again.'
      }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function enhanceWithComprehensiveSuggestions(optimization, resumeText, industry) {
  const additionalSuggestions = getComprehensiveContentSuggestions(resumeText, industry);
  
  // Merge existing suggestions with additional ones, avoiding duplicates
  const existingSections = new Set(optimization.contentOptimizations.map(opt => opt.section + opt.category));
  const newSuggestions = additionalSuggestions.filter(suggestion => 
    !existingSections.has(suggestion.section + suggestion.category)
  );
  
  optimization.contentOptimizations = [
    ...optimization.contentOptimizations,
    ...newSuggestions
  ];
  
  console.log('Enhanced suggestions count:', optimization.contentOptimizations.length);
  return optimization;
}

function getComprehensiveFallbackResponse(resumeText, industry) {
  console.log('Using comprehensive fallback response due to AI parsing failure');
  
  return {
    atsScore: 65,
    keywordMatches: {
      found: [],
      missing: ['industry-specific keywords', 'technical skills', 'soft skills', 'certifications'],
      suggestions: [
        'Add more industry-relevant keywords throughout your resume',
        'Include technical skills mentioned in job descriptions',
        'Incorporate action verbs that demonstrate leadership and achievement',
        'Use industry-standard terminology and acronyms',
        'Add relevant certifications and qualifications'
      ]
    },
    formatOptimizations: [
      {
        issue: 'Analysis parsing error - comprehensive review needed',
        recommendation: 'Please try uploading your resume again for detailed analysis, or contact support if the problem persists.',
        priority: 'high'
      }
    ],
    contentOptimizations: getComprehensiveContentSuggestions(resumeText, industry),
    overallRecommendations: [
      'Focus on adding quantifiable achievements with specific metrics throughout your resume.',
      'Ensure every job experience includes measurable outcomes and impact statements.',
      'Use strong action verbs to begin each bullet point in your experience section.',
      'Incorporate industry-specific keywords naturally throughout all sections.',
      'Add a compelling professional summary if missing, or enhance the existing one with metrics.',
      'Organize your skills section to highlight the most relevant technical and soft skills.',
      'Consider adding a projects section to showcase practical application of your skills.',
      'Ensure consistent formatting that is ATS-friendly throughout the document.',
      'Tailor your resume content to match the specific job description and industry requirements.',
      'Review each section for opportunities to demonstrate value and impact rather than just listing duties.'
    ]
  };
}

function getComprehensiveContentSuggestions(resumeText, industry) {
  return [
    // Professional Summary Optimizations (2-3 suggestions)
    {
      section: 'Professional Summary',
      current: 'Generic or missing professional summary',
      improved: 'Add a compelling 2-3 sentence summary highlighting your key achievements with quantifiable results and industry-relevant keywords',
      reasoning: 'A strong professional summary with metrics and keywords improves ATS scoring and recruiter engagement',
      category: 'keywords'
    },
    {
      section: 'Professional Summary',
      current: 'Summary without quantifiable impact',
      improved: 'Include specific metrics like "increased efficiency by 25%" or "managed $2M budget" in your summary',
      reasoning: 'Quantified achievements in the summary immediately demonstrate your value proposition',
      category: 'quantification'
    },
    {
      section: 'Professional Summary',
      current: 'Passive language in summary',
      improved: 'Start summary with strong action verbs like "Achieved," "Led," "Optimized," or "Delivered"',
      reasoning: 'Active language in the summary creates immediate impact and better ATS keyword matching',
      category: 'action-verbs'
    },

    // Experience Section Optimizations (6-9 suggestions, 2-3 per common job)
    {
      section: 'Experience - Current/Recent Role',
      current: 'Managed team and handled projects',
      improved: 'Led a cross-functional team of 8 professionals, increasing project delivery speed by 30% through process optimization',
      reasoning: 'Specific numbers and outcomes demonstrate measurable impact rather than just listing duties',
      category: 'quantification'
    },
    {
      section: 'Experience - Current/Recent Role',
      current: 'Responsible for customer service',
      improved: 'Achieved 95% customer satisfaction rating while resolving 50+ inquiries daily, reducing response time by 40%',
      reasoning: 'Quantified customer service achievements show concrete value and performance metrics',
      category: 'achievement'
    },
    {
      section: 'Experience - Current/Recent Role',
      current: 'Worked with various technologies',
      improved: 'Utilized Python, SQL, and Tableau to automate reporting processes, saving 15 hours weekly',
      reasoning: 'Specific technology keywords and time savings demonstrate technical skills and efficiency impact',
      category: 'keywords'
    },
    {
      section: 'Experience - Previous Role',
      current: 'Handled sales activities',
      improved: 'Generated $500K in new revenue by developing relationships with 25+ key accounts, exceeding targets by 120%',
      reasoning: 'Revenue generation with specific numbers shows direct business impact and goal achievement',
      category: 'quantification'
    },
    {
      section: 'Experience - Previous Role',
      current: 'Worked on marketing campaigns',
      improved: 'Executed integrated marketing campaigns across digital and traditional channels, increasing brand awareness by 35%',
      reasoning: 'Specific marketing activities and measurable outcomes demonstrate strategic marketing impact',
      category: 'achievement'
    },
    {
      section: 'Experience - All Roles',
      current: 'Responsible for, handled, worked on',
      improved: 'Achieved, optimized, implemented, spearheaded, delivered, transformed',
      reasoning: 'Strong action verbs create more impactful statements and improve ATS parsing',
      category: 'action-verbs'
    },

    // Skills Section Optimizations (2-3 suggestions)
    {
      section: 'Skills Section',
      current: 'Basic skills listing without context',
      improved: 'Organize skills into categories (Technical, Leadership, Industry-Specific) with proficiency levels or years of experience',
      reasoning: 'Structured skills section with context improves keyword matching and ATS parsing',
      category: 'keywords'
    },
    {
      section: 'Skills Section',
      current: 'Generic skills not aligned with industry',
      improved: `Include ${industry.toLowerCase()}-specific tools, technologies, and methodologies relevant to your target role`,
      reasoning: 'Industry-aligned skills improve relevance scoring in ATS systems and keyword matching',
      category: 'industry-alignment'
    },
    {
      section: 'Skills Section',
      current: 'Skills without validation or context',
      improved: 'Add context like "Advanced Excel (5+ years, including VBA and pivot tables)" or "Certified in [relevant certification]"',
      reasoning: 'Validated skills with context provide credibility and additional keyword opportunities',
      category: 'achievement'
    },

    // Education Section Optimizations (2 suggestions)
    {
      section: 'Education Section',
      current: 'Basic degree information only',
      improved: 'Include relevant coursework, academic achievements, certifications, and GPA if strong (3.5+)',
      reasoning: 'Comprehensive education details provide additional keyword opportunities and demonstrate qualifications',
      category: 'keywords'
    },
    {
      section: 'Education Section',
      current: 'Education without relevance to role',
      improved: 'Highlight education components most relevant to your target role, including specific projects or concentrations',
      reasoning: 'Role-relevant education details improve ATS relevance scoring and keyword alignment',
      category: 'industry-alignment'
    },

    // Overall Formatting and Structure (2-3 suggestions)
    {
      section: 'Overall Formatting',
      current: 'Complex formatting or graphics',
      improved: 'Use simple, clean formatting with clear section headers and consistent bullet points',
      reasoning: 'ATS-friendly formatting ensures all content is properly parsed and indexed',
      category: 'formatting'
    },
    {
      section: 'Contact Information',
      current: 'Basic contact details only',
      improved: 'Include LinkedIn profile, professional website/portfolio, and ensure phone/email are ATS-readable',
      reasoning: 'Complete contact information with professional links enhances your professional presence',
      category: 'formatting'
    },
    {
      section: 'Industry Terminology',
      current: 'Generic business language',
      improved: `Incorporate ${industry.toLowerCase()}-specific terminology, acronyms, and standard practices throughout`,
      reasoning: 'Industry-specific language signals expertise and improves relevance matching',
      category: 'industry-alignment'
    }
  ];
}
