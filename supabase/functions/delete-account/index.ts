import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.51.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Account deletion request received');

    // Create Supabase client with service role key for admin operations
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

    console.log(`Processing account deletion for user: ${user.id}`);

    // Parse request body for confirmation
    const { confirmed } = await req.json().catch(() => ({ confirmed: false }));
    
    if (!confirmed) {
      return new Response(
        JSON.stringify({ error: 'Account deletion must be confirmed' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Log the deletion request before starting
    await supabase.from('security_events').insert({
      user_id: user.id,
      event_type: 'account_deletion_initiated',
      event_description: 'User initiated account deletion process',
      metadata: { 
        deletion_timestamp: new Date().toISOString(),
        user_email: user.email
      }
    });

    // List of tables to clean up (in order to handle foreign key constraints)
    const tablesToCleanup = [
      'security_events',
      'application_stages',
      'performance_metrics', 
      'ai_generations',
      'export_history',
      'export_jobs',
      'interview_sessions',
      'cv_analyses',
      'job_applications',
      'user_files',
      'linkedin_profiles',
      'connected_accounts',
      'white_label_configs',
      'user_security_settings',
      'user_privacy_settings',
      'user_job_preferences',
      'user_professional_info',
      'user_settings',
      'user_resumes',
      'profiles'
    ];

    console.log('Starting data deletion process...');

    // Delete data from each table
    for (const table of tablesToCleanup) {
      try {
        console.log(`Deleting data from ${table}...`);
        
        // Use appropriate column name for user identification
        const userColumn = table === 'profiles' ? 'id' : 'user_id';
        
        const { error } = await supabase
          .from(table)
          .delete()
          .eq(userColumn, user.id);

        if (error) {
          console.error(`Error deleting from ${table}:`, error);
          // Continue with other tables even if one fails
        } else {
          console.log(`Successfully deleted data from ${table}`);
        }
      } catch (err) {
        console.error(`Exception deleting from ${table}:`, err);
        // Continue with other tables
      }
    }

    console.log('Data deletion completed, now deleting user account...');

    // Delete the user account from auth
    const { error: deleteUserError } = await supabase.auth.admin.deleteUser(user.id);

    if (deleteUserError) {
      console.error('Error deleting user account:', deleteUserError);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to delete user account', 
          details: deleteUserError.message 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Account deletion completed successfully');

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Account and all associated data have been permanently deleted'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in account deletion:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error during account deletion',
        details: errorMessage 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});