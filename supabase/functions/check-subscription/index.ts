import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CHECK-SUBSCRIPTION] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Use anon key for user authentication
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    logStep("Function started");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    
    const user = userData.user;
    if (!user) throw new Error("User not authenticated");
    logStep("User authenticated", { userId: user.id });

    // Get user subscription
    const { data: subscription, error: subscriptionError } = await supabaseClient
      .from("user_subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (subscriptionError && subscriptionError.code !== 'PGRST116') {
      throw new Error(`Subscription query error: ${subscriptionError.message}`);
    }

    if (!subscription) {
      logStep("No subscription found");
      return new Response(JSON.stringify({ 
        hasSubscription: false,
        needsTrialCreation: true 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    logStep("Subscription found", { status: subscription.subscription_status });

    // Check if trial has expired
    let isTrialExpired = false;
    let daysRemaining = 0;
    
    if (subscription.subscription_status === 'trial' && subscription.trial_end_date) {
      const trialEnd = new Date(subscription.trial_end_date);
      const now = new Date();
      const diffTime = trialEnd.getTime() - now.getTime();
      daysRemaining = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
      isTrialExpired = daysRemaining <= 0;
      
      // Update status if trial expired
      if (isTrialExpired && subscription.subscription_status === 'trial') {
        const { error: updateError } = await supabaseClient
          .from("user_subscriptions")
          .update({ subscription_status: 'expired' })
          .eq("id", subscription.id);
          
        if (updateError) {
          logStep("Error updating expired trial", updateError);
        } else {
          logStep("Updated trial status to expired");
          subscription.subscription_status = 'expired';
        }
      }
    }

    const response = {
      hasSubscription: true,
      subscription: {
        status: subscription.subscription_status,
        plan: subscription.subscription_plan,
        isActive: subscription.subscription_status === 'active',
        isOnTrial: subscription.subscription_status === 'trial',
        isExpired: subscription.subscription_status === 'expired',
        autoUpgradeEnabled: subscription.auto_upgrade_enabled,
        trialDaysRemaining: daysRemaining,
        trialEndDate: subscription.trial_end_date,
      }
    };

    logStep("Returning subscription status", response);

    return new Response(JSON.stringify(response), {
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