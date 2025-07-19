
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CoverLetterRequest {
  fullName: string;
  email?: string;
  phone?: string;
  location?: string;
  jobTitle: string;
  companyName: string;
  companyAddress?: string;
  hiringManager?: string;
  jobDescription: string;
  tone: string;
  keyPoints?: string;
  userBackground?: string;
  letterLength?: 'brief' | 'standard' | 'detailed';
  closingType?: string;
  templateId?: string;
  industry?: string;
}

const getTemplateInstructions = (templateId: string) => {
  const templates = {
    'classic-professional': {
      headerStyle: 'centered',
      bodyFormat: 'paragraph',
      instructions: 'Use centered header format with formal business letter structure. Focus on traditional paragraph format with professional tone.'
    },
    'modern-minimalist': {
      headerStyle: 'left-aligned',
      bodyFormat: 'paragraph',
      instructions: 'Use left-aligned header with clean, modern formatting. Employ contemporary language while maintaining professionalism.'
    },
    'creative-professional': {
      headerStyle: 'creative',
      bodyFormat: 'mixed',
      instructions: 'Use creative header with mixed format (intro paragraph + bullet achievements + closing paragraph). Balance creativity with professionalism.'
    },
    'executive-format': {
      headerStyle: 'executive',
      bodyFormat: 'paragraph',
      instructions: 'Use sophisticated executive header format. Focus on leadership qualities and strategic thinking.'
    },
    'achievement-bullet': {
      headerStyle: 'left-aligned',
      bodyFormat: 'bullet-points',
      instructions: 'Use left-aligned header with bullet-point format for achievements. Emphasize quantifiable results and metrics.'
    },
    'skills-showcase': {
      headerStyle: 'modern',
      bodyFormat: 'skills-focused',
      instructions: 'Use modern header with skills integration. Highlight technical competencies and specialized knowledge.'
    },
    'healthcare-formal': {
      headerStyle: 'centered',
      bodyFormat: 'paragraph',
      instructions: 'Use formal centered header. Emphasize credentials, certifications, and healthcare-specific experience.'
    },
    'startup-dynamic': {
      headerStyle: 'creative',
      bodyFormat: 'mixed',
      instructions: 'Use dynamic creative header with mixed format. Emphasize innovation, adaptability, and startup culture fit.'
    }
  };
  
  return templates[templateId as keyof typeof templates] || templates['classic-professional'];
};

serve(async (req) => {
  console.log('Cover letter generation request received');
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    const {
      fullName,
      email,
      phone,
      location,
      jobTitle,
      companyName,
      companyAddress,
      hiringManager,
      jobDescription,
      tone,
      keyPoints,
      userBackground,
      letterLength = 'standard',
      closingType = 'Sincerely',
      templateId = 'classic-professional',
      industry
    }: CoverLetterRequest = await req.json();

    console.log('Processing cover letter for:', { jobTitle, companyName, tone, letterLength, templateId });

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Get template configuration
    const template = getTemplateInstructions(templateId);

    // Build contact information
    const contactInfo = [email, phone, location].filter(Boolean).join(' | ');
    const senderInfo = contactInfo ? `${fullName}\n${contactInfo}` : fullName;
    
    // Build recipient information
    const recipientName = hiringManager || 'Hiring Manager';
    const recipientInfo = companyAddress 
      ? `${recipientName}\n${companyName}\n${companyAddress}`
      : `${recipientName}\n${companyName}`;

    // Create template-specific AI prompt
    const systemPrompt = `You are an expert career coach and professional business letter writer. Your task is to create a complete, properly formatted cover letter using the "${templateId}" template style.

TEMPLATE-SPECIFIC INSTRUCTIONS:
${template.instructions}

HEADER STYLE: ${template.headerStyle}
BODY FORMAT: ${template.bodyFormat}

CRITICAL FORMATTING REQUIREMENTS:
1. Apply the specified header style (${template.headerStyle})
2. Use the specified body format (${template.bodyFormat})
3. Include sender's information formatted according to template style
4. Add current date below sender info
5. Add recipient information (hiring manager name, company name, and address if provided)
6. Use professional salutation addressing the hiring manager by name if provided
7. Write ${letterLength} content following the template's body format
8. End with professional closing ("${closingType}")
9. Include signature line with sender's name
10. Use proper paragraph spacing and template-specific structure

BODY FORMAT GUIDELINES:
- paragraph: Traditional paragraph format with 3-4 well-structured paragraphs
- bullet-points: Include bullet-pointed achievements with quantifiable results
- mixed: Intro paragraph + bullet achievements + closing paragraph
- skills-focused: Integrate skills naturally throughout with emphasis on competencies

CONTENT REQUIREMENTS:
- Opening: Express interest and connection to the role/company
- Body: Highlight relevant experience, skills, and achievements matching job requirements
- Closing: Reiterate interest, mention next steps, include call to action
- Match tone: ${tone} throughout the letter
- Incorporate keywords from job description naturally
- Show knowledge of the company and role

TONE GUIDELINES:
- Professional: Formal, respectful, emphasis on qualifications
- Enthusiastic: Energetic, passionate, shows excitement for the role
- Confident: Assertive, highlights achievements, direct communication
- Creative: Innovative language, unique approach, storytelling elements
- Formal: Traditional, conservative, very respectful language

${industry ? `INDUSTRY FOCUS: Tailor language and emphasis for ${industry} industry standards and expectations.` : ''}

CRITICAL: Do NOT use placeholders like [Company Address] or [City, State ZIP Code]. Use the actual information provided or omit if not available.

Return ONLY the complete cover letter in the specified template format, ready for printing or PDF conversion.`;

    const userPrompt = `Create a ${letterLength} cover letter using the "${templateId}" template with these details:

SENDER INFORMATION:
${senderInfo}

RECIPIENT INFORMATION:
${recipientInfo}

POSITION DETAILS:
- Job Title: ${jobTitle}
- Company: ${companyName}

TONE: ${tone}

JOB DESCRIPTION:
${jobDescription}

${keyPoints ? `KEY POINTS TO HIGHLIGHT:
${keyPoints}` : ''}

${userBackground ? `CANDIDATE BACKGROUND:
${userBackground}` : ''}

Please write a complete, professional business letter that:
1. Uses the ${templateId} template format with ${template.headerStyle} header style
2. Employs ${template.bodyFormat} body format as specified
3. Addresses the hiring manager appropriately (${recipientName})
4. Demonstrates clear understanding of the role and company
5. Highlights relevant qualifications and achievements
6. Uses ${tone} tone throughout
7. Ends with "${closingType}" and proper signature block
8. Is ${letterLength} in length
9. Uses ACTUAL information provided, NO PLACEHOLDERS
${industry ? `10. Is optimized for the ${industry} industry` : ''}

IMPORTANT: Use the actual company information provided. Do not include placeholder text. If company address is not provided, simply use the company name in the recipient block.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: letterLength === 'brief' ? 800 : letterLength === 'standard' ? 1200 : 1600,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedLetter = data.choices[0].message.content;

    console.log('Cover letter generated successfully with template:', templateId);

    return new Response(JSON.stringify({ 
      coverLetter: generatedLetter,
      success: true,
      templateUsed: templateId
    }), {
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json' 
      },
    });

  } catch (error) {
    console.error('Error in cover-letter-generator function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json' 
      },
    });
  }
});
