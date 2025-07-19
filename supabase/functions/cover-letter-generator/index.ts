
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
}

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
      closingType = 'Sincerely'
    }: CoverLetterRequest = await req.json();

    console.log('Processing cover letter for:', { jobTitle, companyName, tone, letterLength });

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Build contact information
    const contactInfo = [email, phone, location].filter(Boolean).join(' | ');
    const senderInfo = contactInfo ? `${fullName}\n${contactInfo}` : fullName;
    
    // Build recipient information
    const recipientName = hiringManager || 'Hiring Manager';
    const recipientInfo = companyAddress 
      ? `${recipientName}\n${companyName}\n${companyAddress}`
      : `${recipientName}\n${companyName}`;

    // Create comprehensive AI prompt for professional business letter format
    const systemPrompt = `You are an expert career coach and professional business letter writer. Your task is to create a complete, properly formatted cover letter that follows standard business letter conventions.

CRITICAL FORMATTING REQUIREMENTS:
1. Start with sender's information (name and contact details) aligned to the left
2. Add current date below sender info
3. Add recipient information (hiring manager name, company name, and address if provided)
4. Use professional salutation addressing the hiring manager by name if provided
5. Write ${letterLength} content (brief: 2-3 paragraphs, standard: 3-4 paragraphs, detailed: 4-5 paragraphs)
6. End with professional closing ("${closingType}")
7. Include signature line with sender's name
8. Use proper paragraph spacing and business letter structure

CONTENT REQUIREMENTS:
- Opening paragraph: Express interest and briefly mention how you learned about the position
- Body paragraph(s): Highlight relevant experience, skills, and achievements that match job requirements
- Closing paragraph: Reiterate interest, mention next steps, and include call to action
- Match tone: ${tone} throughout the letter
- Incorporate keywords from job description naturally
- Show knowledge of the company and role

TONE GUIDELINES:
- Professional: Formal, respectful, emphasis on qualifications
- Enthusiastic: Energetic, passionate, shows excitement for the role
- Confident: Assertive, highlights achievements, direct communication
- Creative: Innovative language, unique approach, storytelling elements
- Formal: Traditional, conservative, very respectful language

CRITICAL: Do NOT use placeholders like [Company Address] or [City, State ZIP Code]. Use the actual information provided or omit if not available.

Return ONLY the complete cover letter in proper business format, ready for printing or PDF conversion.`;

    const userPrompt = `Create a ${letterLength} cover letter with these details:

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
1. Uses proper business letter format with sender info, date, and recipient details
2. Addresses the hiring manager appropriately (${recipientName})
3. Demonstrates clear understanding of the role and company
4. Highlights relevant qualifications and achievements
5. Uses ${tone} tone throughout
6. Ends with "${closingType}" and proper signature block
7. Is ${letterLength} in length
8. Uses ACTUAL information provided, NO PLACEHOLDERS

IMPORTANT: Use the actual company information provided. Do not include placeholder text like "[Company Address]" or "[City, State ZIP Code]". If company address is not provided, simply use the company name in the recipient block.`;

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

    console.log('Cover letter generated successfully');

    return new Response(JSON.stringify({ 
      coverLetter: generatedLetter,
      success: true 
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
