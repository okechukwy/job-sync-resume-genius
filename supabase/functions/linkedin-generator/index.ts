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
    const { type, data } = await req.json();
    
    if (!type || !data) {
      throw new Error('Type and data are required');
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('Generating LinkedIn content for type:', type);

    let systemPrompt = '';
    let userPrompt = '';

    switch (type) {
      case 'headline':
        systemPrompt = `You are a LinkedIn optimization expert. Generate 5 compelling, professional LinkedIn headlines that are:
- Under 220 characters
- Industry-specific and role-focused
- Achievement-oriented
- Keyword-rich for searchability
- Engaging and memorable

Return only a JSON array of strings, no additional text.`;
        userPrompt = `Generate LinkedIn headlines for: ${JSON.stringify(data)}`;
        break;

      case 'summary':
        systemPrompt = `You are a LinkedIn optimization expert. Create a compelling LinkedIn summary that:
- Is 3-5 paragraphs long
- Starts with a strong hook
- Highlights key achievements with metrics
- Includes relevant keywords
- Ends with a call-to-action
- Uses first person perspective
- Is conversational yet professional

Return only the summary text, no additional formatting.`;
        userPrompt = `Create a LinkedIn summary for: ${JSON.stringify(data)}`;
        break;

      case 'content-suggestions':
        systemPrompt = `You are a LinkedIn content strategist. Generate 10 engaging post ideas that:
- Are relevant to the user's industry and role
- Encourage engagement (likes, comments, shares)
- Mix different content types (insights, tips, stories, questions)
- Are professional yet authentic
- Include trending industry topics

Return a JSON array of objects with "title" and "content" fields.`;
        userPrompt = `Generate LinkedIn post ideas for: ${JSON.stringify(data)}`;
        break;

      default:
        throw new Error('Invalid type specified');
    }

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
        temperature: 0.7,
        max_tokens: type === 'summary' ? 1000 : 800,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const responseData = await response.json();
    const generatedContent = responseData.choices[0].message.content;
    
    console.log('Generated LinkedIn content:', generatedContent);

    // For headlines and content suggestions, parse as JSON
    if (type === 'headline' || type === 'content-suggestions') {
      try {
        const parsedContent = JSON.parse(generatedContent);
        return new Response(JSON.stringify({ content: parsedContent }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (parseError) {
        console.error('Failed to parse JSON response:', parseError);
        throw new Error('Failed to parse generated content');
      }
    }

    // For summary, return as plain text
    return new Response(JSON.stringify({ content: generatedContent }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in linkedin-generator function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Failed to generate LinkedIn content. Please try again.'
      }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});