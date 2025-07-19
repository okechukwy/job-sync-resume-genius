
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
      instructions: 'Use centered header format ONLY for applicant information (name and contact details). All other content including recipient information, date, body, and closing should be left-aligned following standard business letter format.'
    },
    'modern-minimalist': {
      headerStyle: 'left-aligned',
      bodyFormat: 'paragraph',
      instructions: 'Use left-aligned header with clean, modern formatting. All content should be left-aligned including applicant information.'
    },
    'creative-professional': {
      headerStyle: 'creative',
      bodyFormat: 'mixed',
      instructions: 'Use creative header with mixed format (intro paragraph + bullet achievements + closing paragraph). Balance creativity with professionalism using plain text formatting.'
    },
    'executive-format': {
      headerStyle: 'executive',
      bodyFormat: 'paragraph',
      instructions: 'Use sophisticated executive header format with premium spacing. Focus on leadership qualities and strategic thinking.'
    },
    'achievement-bullet': {
      headerStyle: 'left-aligned',
      bodyFormat: 'bullet-points',
      instructions: 'Use left-aligned header with bullet-point format for achievements. Emphasize quantifiable results and metrics using • or - for bullets.'
    },
    'skills-showcase': {
      headerStyle: 'left-aligned',
      bodyFormat: 'skills-focused',
      instructions: 'Use left-aligned header with skills integration. Highlight technical competencies and specialized knowledge throughout the letter.'
    },
    'healthcare-formal': {
      headerStyle: 'centered',
      bodyFormat: 'paragraph',
      instructions: 'Use formal centered header ONLY for applicant information. Emphasize credentials, certifications, and healthcare-specific experience. All other content left-aligned.'
    },
    'startup-dynamic': {
      headerStyle: 'creative',
      bodyFormat: 'mixed',
      instructions: 'Use dynamic creative header with mixed format. Emphasize innovation, adaptability, and startup culture fit using engaging plain text formatting.'
    }
  };
  
  return templates[templateId as keyof typeof templates] || templates['classic-professional'];
};

const cleanHtmlTags = (text: string): string => {
  // Remove common HTML tags that might appear in the output
  return text
    .replace(/<\/?center>/gi, '')
    .replace(/<\/?b>/gi, '')
    .replace(/<\/?strong>/gi, '')
    .replace(/<\/?i>/gi, '')
    .replace(/<\/?em>/gi, '')
    .replace(/<\/?u>/gi, '')
    .replace(/<\/?p>/gi, '')
    .replace(/<\/?div>/gi, '')
    .replace(/<\/?span>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .trim();
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

    // Create template-specific AI prompt with explicit plain text instructions
    const systemPrompt = `You are an expert career coach and professional business letter writer. Your task is to create a complete, properly formatted cover letter using the "${templateId}" template style.

CRITICAL OUTPUT REQUIREMENTS:
- Generate PLAIN TEXT ONLY - NO HTML tags, NO markup, NO special formatting codes
- Use only standard text characters, spaces, line breaks, and basic punctuation
- Do NOT use <center>, <b>, <strong>, <i>, <em>, <p>, <div>, or ANY HTML tags
- Format using spacing, line breaks, and text alignment only
- The output must be ready for plain text display and PDF generation

PROPER CAPITALIZATION RULES:
- Use proper sentence case for all text (first letter capitalized, rest lowercase unless proper nouns)
- Names should be in Title Case (John Smith, not JOHN SMITH)
- Company names should match their official capitalization
- Do NOT use ALL CAPS for any text except maybe section headers if specifically requested
- Job titles should be in Title Case (Software Engineer, not SOFTWARE ENGINEER)
- Avoid excessive capitalization that looks unprofessional

TEMPLATE-SPECIFIC INSTRUCTIONS:
${template.instructions}

BUSINESS LETTER STRUCTURE:
1. Applicant Information (name and contact) - formatting depends on template
2. Date (right-aligned)
3. Recipient Information (hiring manager, company, address) - ALWAYS left-aligned
4. Salutation (Dear [Name]) - left-aligned
5. Body paragraphs - left-aligned
6. Closing phrase (${closingType}) - left-aligned
7. Signature line (applicant name) - left-aligned

HEADER STYLE: ${template.headerStyle}
BODY FORMAT: ${template.bodyFormat}

PLAIN TEXT FORMATTING GUIDELINES:
1. ${template.headerStyle} header: ${template.headerStyle === 'centered' ? 'Center ONLY the applicant name and contact information using appropriate spacing' : 'Align all text to the left margin'}
2. Use proper paragraph spacing with double line breaks between sections
3. For bullet points, use "• " or "- " at the beginning of lines
4. Use standard business letter spacing and structure
5. No HTML tags or markup language of any kind
6. NEVER center recipient information, date, body text, or closing - these should be left-aligned

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

FINAL OUTPUT VALIDATION:
- Ensure NO HTML tags appear anywhere in the letter
- Use only plain text formatting with spaces and line breaks
- Verify professional business letter structure using plain text only
- Use proper sentence case throughout (avoid ALL CAPS except where appropriate)
- Only center applicant information for centered header templates
- All recipient information, body text, and closing should be left-aligned
- The letter should be ready for direct display without any HTML processing

Return ONLY the complete cover letter in plain text format, ready for printing or PDF conversion.`;

    const userPrompt = `Create a ${letterLength} cover letter using the "${templateId}" template with these details:

SENDER INFORMATION (format according to template style):
${senderInfo}

RECIPIENT INFORMATION (ALWAYS left-aligned):
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

CRITICAL FORMATTING REQUIREMENTS:
1. Use PLAIN TEXT ONLY - absolutely no HTML tags or markup
2. Use proper sentence case - avoid ALL CAPS (John Smith, not JOHN SMITH)
3. Format the applicant header according to ${template.headerStyle} style using text spacing only
4. ALWAYS left-align recipient information, regardless of template
5. ALWAYS left-align body paragraphs and closing
6. Use ${template.bodyFormat} body format with plain text techniques
7. Address the hiring manager appropriately (${recipientName})
8. Use "${closingType}" closing with proper signature block - left-aligned
9. Ensure ${letterLength} length appropriate content
10. NO HTML tags like <center>, <b>, <p>, or any other markup
11. Use only spaces, line breaks, and standard punctuation for formatting

REMEMBER: 
- The output must be clean plain text that displays perfectly without any HTML processing
- Use proper capitalization throughout (sentence case, not ALL CAPS)
- Only the applicant's information should be centered for centered templates
- Everything else (recipient, body, closing) should be left-aligned`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-2024-08-06',
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
    let generatedLetter = data.choices[0].message.content;

    // Clean any HTML tags that might have slipped through
    generatedLetter = cleanHtmlTags(generatedLetter);

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
