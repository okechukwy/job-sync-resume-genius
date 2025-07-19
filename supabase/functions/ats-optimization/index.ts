
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    console.log('Optimizing resume for ATS compatibility');

    const systemPrompt = `You are an ATS (Applicant Tracking System) optimization expert. Analyze the provided resume comprehensively and return specific recommendations to improve ATS compatibility and keyword matching.

IMPORTANT: Provide COMPREHENSIVE analysis with detailed content optimizations covering ALL resume sections. Analyze EVERY section thoroughly and provide ALL applicable improvements without artificial limits.

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

COMPREHENSIVE SECTION-BY-SECTION ANALYSIS REQUIREMENTS:
Analyze EVERY section present in the resume and provide ALL applicable optimizations:

1. **Professional Summary/Objective**: 
   - Keyword density and industry relevance
   - Impact and quantification opportunities
   - Industry-specific language alignment

2. **Experience Section**: 
   - EACH job entry should be analyzed separately
   - Quantifiable achievements identification
   - Action verb optimization
   - Keyword integration opportunities
   - Achievement vs responsibility transformation

3. **Skills Section**: 
   - Technical skills alignment with industry standards
   - Soft skills relevant to role
   - ATS-friendly formatting
   - Missing critical skills identification

4. **Education Section**: 
   - Proper formatting for ATS parsing
   - Relevant certifications and achievements
   - Industry-relevant coursework highlighting

5. **Additional Sections** (if present):
   - Projects, Publications, Awards, Volunteer work
   - Optimize each for keyword relevance and ATS compatibility

6. **Overall Structure & Formatting**:
   - Section organization and hierarchy
   - ATS-friendly formatting issues
   - Header and contact information optimization

CONTENT OPTIMIZATION CATEGORIES TO COMPREHENSIVELY COVER:
- **Quantification**: Add specific numbers, percentages, metrics to ALL achievements
- **Keywords**: Integrate relevant industry and job-specific keywords throughout ALL sections
- **Action Verbs**: Replace weak verbs with strong, impactful action words in ALL experience entries
- **Achievement**: Transform ALL responsibilities into achievement-focused statements
- **Industry Alignment**: Use industry-standard terminology in ALL applicable sections
- **Formatting**: Improve ATS readability and structure throughout the resume

ANALYSIS APPROACH:
- Go through the resume section by section systematically
- For each section, identify ALL possible improvements
- Provide specific before/after examples for each optimization
- Don't limit the number of suggestions - provide ALL that would benefit the candidate
- Focus on thoroughness and completeness rather than brevity
- Each optimization should be specific, actionable, and impactful

Provide comprehensive analysis covering every improvable aspect of the resume without arbitrary limits on the number of suggestions.`;

    let userPrompt = `Analyze this resume comprehensively for ATS optimization in the ${industry} industry. Provide detailed content optimizations for ALL sections and ALL applicable improvements:\n\n${resumeText}`;
    
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

    } catch (parseError) {
      console.error('Failed to parse OpenAI response as JSON:', parseError);
      console.error('Raw response:', optimizationText);
      
      // Return a comprehensive fallback response with more suggestions
      optimization = {
        atsScore: 50,
        keywordMatches: {
          found: [],
          missing: ['industry-specific keywords', 'technical skills', 'soft skills'],
          suggestions: [
            'Add more industry-relevant keywords throughout your resume',
            'Include technical skills mentioned in job descriptions',
            'Incorporate action verbs that demonstrate leadership and achievement'
          ]
        },
        formatOptimizations: [
          {
            issue: 'Analysis parsing error - comprehensive review needed',
            recommendation: 'Please try uploading your resume again for detailed analysis, or contact support if the problem persists.',
            priority: 'high'
          }
        ],
        contentOptimizations: [
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
            improved: 'Include specific metrics like "increased efficiency by 25%" or "managed $2M budget"',
            reasoning: 'Quantified achievements in the summary immediately demonstrate your value proposition',
            category: 'quantification'
          },
          {
            section: 'Experience - Job Responsibilities',
            current: 'Managed team and handled projects',
            improved: 'Led a cross-functional team of 8 professionals, increasing project delivery speed by 30% through process optimization',
            reasoning: 'Specific numbers and outcomes demonstrate measurable impact rather than just listing duties',
            category: 'quantification'
          },
          {
            section: 'Experience - Action Verbs',
            current: 'Responsible for, handled, worked on',
            improved: 'Achieved, optimized, implemented, spearheaded, delivered',
            reasoning: 'Strong action verbs create more impactful statements and improve ATS parsing',
            category: 'action-verbs'
          },
          {
            section: 'Experience - Achievement Focus',
            current: 'Job duties and responsibilities listed',
            improved: 'Transform each bullet point into a specific achievement with metrics and outcomes',
            reasoning: 'Achievement-focused descriptions demonstrate your impact and value to potential employers',
            category: 'achievement'
          },
          {
            section: 'Skills Section',
            current: 'Basic skills listing without context',
            improved: 'Organize skills into categories (Technical, Leadership, Industry-Specific) with proficiency levels',
            reasoning: 'Structured skills section with relevant categories improves keyword matching and ATS parsing',
            category: 'keywords'
          },
          {
            section: 'Skills Section',
            current: 'Generic skills not aligned with industry',
            improved: 'Include industry-standard tools, technologies, and methodologies relevant to your target role',
            reasoning: 'Industry-aligned skills improve relevance scoring in ATS systems and keyword matching',
            category: 'industry-alignment'
          },
          {
            section: 'Education Section',
            current: 'Basic degree information only',
            improved: 'Include relevant coursework, academic achievements, certifications, and GPA if strong (3.5+)',
            reasoning: 'Comprehensive education details provide additional keyword opportunities and demonstrate qualifications',
            category: 'keywords'
          },
          {
            section: 'Overall Formatting',
            current: 'Complex formatting or graphics',
            improved: 'Use simple, clean formatting with clear section headers and consistent bullet points',
            reasoning: 'ATS-friendly formatting ensures all content is properly parsed and indexed',
            category: 'formatting'
          },
          {
            section: 'Industry Terminology',
            current: 'Generic business language',
            improved: 'Incorporate industry-specific terminology, acronyms, and standard practices throughout',
            reasoning: 'Industry-specific language signals expertise and improves relevance matching',
            category: 'industry-alignment'
          },
          {
            section: 'Contact Information',
            current: 'Basic contact details only',
            improved: 'Include LinkedIn profile, professional website/portfolio, and ensure phone/email are ATS-readable',
            reasoning: 'Complete contact information with professional links enhances your professional presence',
            category: 'formatting'
          },
          {
            section: 'Projects/Portfolio',
            current: 'Missing or briefly mentioned projects',
            improved: 'Add a dedicated projects section with specific technologies used, outcomes achieved, and measurable impact',
            reasoning: 'Project details demonstrate practical application of skills and provide additional keyword opportunities',
            category: 'achievement'
          }
        ],
        overallRecommendations: [
          'There was an issue with the detailed analysis. Please try again for comprehensive optimization suggestions.',
          'Focus on adding quantifiable achievements with specific metrics throughout your resume.',
          'Ensure every job experience includes measurable outcomes and impact statements.',
          'Use strong action verbs to begin each bullet point in your experience section.',
          'Incorporate industry-specific keywords naturally throughout all sections.',
          'Add a compelling professional summary if missing, or enhance the existing one with metrics.',
          'Organize your skills section to highlight the most relevant technical and soft skills.',
          'Consider adding a projects section to showcase practical application of your skills.',
          'Ensure consistent formatting that is ATS-friendly throughout the document.',
          'Tailor your resume content to match the specific job description and industry requirements.'
        ]
      };
    }

    console.log('Successfully generated ATS optimization with score:', optimization.atsScore);
    console.log('Content optimizations provided:', optimization.contentOptimizations?.length || 0);

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
