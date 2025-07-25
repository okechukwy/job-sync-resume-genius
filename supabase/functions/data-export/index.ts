import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.51.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface DatabaseError extends Error {
  message: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Data export request received');

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get the authorization header
    const authorization = req.headers.get('authorization');
    if (!authorization) {
      console.error('No authorization header provided');
      return new Response(
        JSON.stringify({ error: 'No authorization header provided' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get user from auth token
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authorization.replace('Bearer ', '')
    );

    if (authError || !user) {
      console.error('Authentication failed:', authError);
      return new Response(
        JSON.stringify({ error: 'Authentication failed' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Exporting data for user: ${user.id}`);

    // Collect all user data
    const exportData: any = {
      export_date: new Date().toISOString(),
      user_id: user.id,
      user_email: user.email,
      user_metadata: user.user_metadata,
      data: {}
    };

    // Helper function to safely fetch data
    const safeFetch = async (tableName: string, query: any) => {
      try {
        const { data, error } = await query;
        if (error) {
          console.error(`Error fetching ${tableName}:`, error);
          return null;
        }
        return data;
      } catch (err) {
        console.error(`Exception fetching ${tableName}:`, err);
        return null;
      }
    };

    // Fetch user profile
    exportData.data.profile = await safeFetch(
      'profiles',
      supabase.from('profiles').select('*').eq('id', user.id).maybeSingle()
    );

    // Fetch user settings
    exportData.data.settings = await safeFetch(
      'user_settings',
      supabase.from('user_settings').select('*').eq('user_id', user.id).maybeSingle()
    );

    // Fetch user security settings
    exportData.data.security_settings = await safeFetch(
      'user_security_settings',
      supabase.from('user_security_settings').select('*').eq('user_id', user.id).maybeSingle()
    );

    // Fetch user privacy settings
    exportData.data.privacy_settings = await safeFetch(
      'user_privacy_settings',
      supabase.from('user_privacy_settings').select('*').eq('user_id', user.id).maybeSingle()
    );

    // Fetch professional info
    exportData.data.professional_info = await safeFetch(
      'user_professional_info',
      supabase.from('user_professional_info').select('*').eq('user_id', user.id).maybeSingle()
    );

    // Fetch job preferences
    exportData.data.job_preferences = await safeFetch(
      'user_job_preferences',
      supabase.from('user_job_preferences').select('*').eq('user_id', user.id).maybeSingle()
    );

    // Fetch resumes
    exportData.data.resumes = await safeFetch(
      'user_resumes',
      supabase.from('user_resumes').select('*').eq('user_id', user.id)
    );

    // Fetch job applications
    exportData.data.job_applications = await safeFetch(
      'job_applications',
      supabase.from('job_applications').select('*').eq('user_id', user.id)
    );

    // Fetch CV analyses
    exportData.data.cv_analyses = await safeFetch(
      'cv_analyses',
      supabase.from('cv_analyses').select('*').eq('user_id', user.id)
    );

    // Fetch interview sessions
    exportData.data.interview_sessions = await safeFetch(
      'interview_sessions',
      supabase.from('interview_sessions').select('*').eq('user_id', user.id)
    );

    // Fetch LinkedIn profiles
    exportData.data.linkedin_profiles = await safeFetch(
      'linkedin_profiles',
      supabase.from('linkedin_profiles').select('*').eq('user_id', user.id)
    );

    // Fetch connected accounts
    exportData.data.connected_accounts = await safeFetch(
      'connected_accounts',
      supabase.from('connected_accounts').select('*').eq('user_id', user.id)
    );

    // Fetch white label configs
    exportData.data.white_label_configs = await safeFetch(
      'white_label_configs',
      supabase.from('white_label_configs').select('*').eq('user_id', user.id)
    );

    // Fetch AI generations
    exportData.data.ai_generations = await safeFetch(
      'ai_generations',
      supabase.from('ai_generations').select('*').eq('user_id', user.id)
    );

    // Fetch performance metrics
    exportData.data.performance_metrics = await safeFetch(
      'performance_metrics',
      supabase.from('performance_metrics').select('*').eq('user_id', user.id)
    );

    // Fetch security events (last 100)
    exportData.data.security_events = await safeFetch(
      'security_events',
      supabase.from('security_events')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(100)
    );

    // Log the export request
    await supabase.from('security_events').insert({
      user_id: user.id,
      event_type: 'data_export_completed',
      event_description: 'User data export completed successfully',
      metadata: { 
        export_timestamp: new Date().toISOString(),
        data_sections: Object.keys(exportData.data).length
      }
    });

    console.log('Data export completed successfully');

    // Return the data as JSON
    const response = JSON.stringify(exportData, null, 2);
    
    return new Response(response, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="user_data_export_${user.id}_${new Date().toISOString().split('T')[0]}.json"`
      }
    });

  } catch (error) {
    console.error('Error in data export:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error during data export',
        details: errorMessage 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});