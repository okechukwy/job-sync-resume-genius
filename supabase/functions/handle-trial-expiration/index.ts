import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[TRIAL-EXPIRATION] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Use service role key for admin operations
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    logStep("Processing trial expirations");

    // Get all expired trials that haven't been processed
    const { data: expiredTrials, error: trialsError } = await supabaseClient
      .from("user_subscriptions")
      .select("*")
      .eq("subscription_status", "trial")
      .lt("trial_end_date", new Date().toISOString());

    if (trialsError) {
      throw new Error(`Error fetching expired trials: ${trialsError.message}`);
    }

    logStep(`Found ${expiredTrials?.length || 0} expired trials`);

    if (!expiredTrials || expiredTrials.length === 0) {
      return new Response(JSON.stringify({ 
        message: "No expired trials to process",
        processed: 0
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    let processed = 0;
    let autoUpgraded = 0;

    for (const trial of expiredTrials) {
      try {
        logStep("Processing expired trial", { userId: trial.user_id, autoUpgrade: trial.auto_upgrade_enabled });

        if (trial.auto_upgrade_enabled) {
          // Auto-upgrade to starter plan
          const { error: upgradeError } = await supabaseClient
            .from("user_subscriptions")
            .update({
              subscription_status: "active",
              subscription_plan: "starter",
              subscription_start_date: new Date().toISOString(),
              subscription_end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
            })
            .eq("id", trial.id);

          if (upgradeError) {
            logStep("Error auto-upgrading trial", upgradeError);
          } else {
            logStep("Auto-upgraded trial to starter plan", { userId: trial.user_id });
            autoUpgraded++;
          }
        } else {
          // Just mark as expired
          const { error: expireError } = await supabaseClient
            .from("user_subscriptions")
            .update({ subscription_status: "expired" })
            .eq("id", trial.id);

          if (expireError) {
            logStep("Error marking trial as expired", expireError);
          } else {
            logStep("Marked trial as expired", { userId: trial.user_id });
          }
        }

        processed++;
      } catch (error) {
        logStep("Error processing individual trial", { 
          userId: trial.user_id, 
          error: error instanceof Error ? error.message : String(error) 
        });
      }
    }

    const result = {
      message: "Trial expiration processing completed",
      totalFound: expiredTrials.length,
      processed,
      autoUpgraded,
      failed: expiredTrials.length - processed
    };

    logStep("Processing completed", result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});