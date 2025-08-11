import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function htmlToText(html: string): string {
  // Remove scripts and styles
  let cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ");

  // Prefer typical job description containers
  const patterns = [
    /<div[^>]*(id|class)=(['"])\s*job[-_\s]?description[^'"]*\2[^>]*>([\s\S]*?)<\/div>/i,
    /<section[^>]*(id|class)=(['"])\s*(job[-_\s]?description|description|job[-_\s]?details)[^'"]*\2[^>]*>([\s\S]*?)<\/section>/i,
    /<article[^>]*(id|class)=(['"])\s*(job[-_\s]?description|description)[^'"]*\2[^>]*>([\s\S]*?)<\/article>/i,
    /<div[^>]*(data-testid)=(['"])job-description[^'"]*\2[^>]*>([\s\S]*?)<\/div>/i,
  ];

  for (const rx of patterns) {
    const m = cleaned.match(rx);
    if (m && m[0]) {
      cleaned = m[0];
      break;
    }
  }

  // Convert structural tags to newlines
  cleaned = cleaned
    .replace(/<(\/?)(p|div|br|li|ul|ol|section|article|h[1-6])[^>]*>/gi, (m) =>
      /<\//.test(m) || /br\b/i.test(m) ? "\n" : "\n"
    )
    .replace(/<[^>]+>/g, " ") // strip remaining tags
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"');

  // Normalize whitespace
  cleaned = cleaned
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .join("\n");

  // Reasonable cap
  return cleaned.slice(0, 8000);
}

serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    if (!url || typeof url !== "string") {
      return new Response(JSON.stringify({ error: "Missing 'url' in body" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let parsed: URL;
    try {
      parsed = new URL(url);
      if (!/^https?:$/.test(parsed.protocol)) throw new Error("Invalid protocol");
    } catch {
      return new Response(JSON.stringify({ error: "Invalid URL" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch page content
    const res = await fetch(parsed.toString(), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
      redirect: "follow",
    });

    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: `Failed to fetch page (${res.status})` }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const html = await res.text();

    // Get title
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : null;

    const text = htmlToText(html);

    return new Response(
      JSON.stringify({ success: true, title, text }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("job-description-extractor error", e);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
