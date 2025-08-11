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

    // Helper: refine to likely job description from HTML/Markdown
    function refineJobDescription({ html, markdown }: { html?: string | null; markdown?: string | null }) {
      let isListing = false;
      let refined: string | null = null;

      const containerPatterns = [
        // Standard job description containers
        /<div[^>]*(id|class)=(['"])\s*job[-_\s]?description[^'\"]*\2[^>]*>([\s\S]*?)<\/div>/i,
        /<section[^>]*(id|class)=(['"])\s*(job[-_\s]?description|description|job[-_\s]?details)[^'\"]*\2[^>]*>([\s\S]*?)<\/section>/i,
        /<article[^>]*(id|class)=(['"])\s*(job[-_\s]?description|description)[^'\"]*\2[^>]*>([\s\S]*?)<\/article>/i,
        /<div[^>]*(data-testid)=(['"])job-description[^'\"]*\2[^>]*>([\s\S]*?)<\/div>/i,
        /<div[^>]*(id|class)=(['"])\s*(job[-_\s]?content|posting[-_\s]?body|vacancy[-_\s]?description|role[-_\s]?description)[^'\"]*\2[^>]*>([\s\S]*?)<\/div>/i,
        /<section[^>]*(id|class)=(['"])\s*(role[-_\s]?description|position[-_\s]?details|about[-_\s]?the[-_\s]?role)[^'\"]*\2[^>]*>([\s\S]*?)<\/section>/i,
        // JobServe-specific patterns
        /<td[^>]*class=(['"])jobdisplay[^'\"]*\1[^>]*>([\s\S]*?)<\/td>/i,
        /<div[^>]*class=(['"])jobdetail[^'\"]*\1[^>]*>([\s\S]*?)<\/div>/i,
        /<table[^>]*class=(['"])jobdata[^'\"]*\1[^>]*>([\s\S]*?)<\/table>/i,
        // Indeed patterns
        /<div[^>]*data-testid=(['"])jobsearch-JobComponent[^'\"]*\1[^>]*>([\s\S]*?)<\/div>/i,
        /<div[^>]*id=(['"])jobDescriptionText[^'\"]*\1[^>]*>([\s\S]*?)<\/div>/i,
        // LinkedIn patterns
        /<div[^>]*class=(['"])description__text[^'\"]*\1[^>]*>([\s\S]*?)<\/div>/i,
        /<section[^>]*class=(['"])description[^'\"]*\1[^>]*>([\s\S]*?)<\/section>/i,
      ];

      const headingKeywords = /(Job\s*Description|About\s*the\s*role|Responsibilities|What\s*you'?ll\s*do|Duties|Requirements|Qualifications|Skills|What\s*we\s*are\s*looking\s*for|About\s*you)/i;

      // 1) Try container patterns on HTML
      if (html) {
        for (const rx of containerPatterns) {
          const m = html.match(rx);
          if (m && m[0]) {
            refined = htmlToText(m[0]);
            break;
          }
        }
        // Try heading section capture
        if (!refined) {
          const h = html.match(new RegExp(`<h[1-6][^>]*>\\s*${headingKeywords.source}\\s*<\\/h[1-6]>[\\s\\S]{0,6000}?(?=<h[1-6]|$)`, 'i'));
          if (h && h[0]) {
            refined = htmlToText(h[0]);
          }
        }

        // Detect obvious listing pages (facets/filters heavy)
        const listingMarkers = [
          /jobs?\s+found/i, 
          /Refine\s+Your\s+Search/i, 
          /Saved\s+Searches/i, 
          /Within\s+\d+\s+miles/i, 
          /Salary\/Rate/i, 
          /Industries/i,
          /JobSearch\.aspx/i,
          /search\s*results/i,
          /Sort\s+by\s+(Best|Latest)\s+Match/i,
          /Loading/i,
          /Recent\s+Searches/i,
          /Consider\s+Another\s+Country/i
        ];
        isListing = listingMarkers.some((rx) => rx.test(html));
      }

      // 2) If still nothing, try markdown split by headings
      if (!refined && markdown) {
        const md = String(markdown);
        const sections = md.split(/\n(?=#+\s)/).filter(Boolean);
        const scored = sections
          .map((sec) => ({
            sec,
            score: (sec.match(headingKeywords) ? 5 : 0) + (sec.match(/\n- |\n\* /g)?.length || 0) + Math.min(5, Math.floor(sec.length / 500)),
          }))
          .sort((a, b) => b.score - a.score);
        if (scored.length && scored[0].score > 3) {
          refined = scored[0].sec;
        }
      }

      // 3) Final cleanup & thresholds
      if (refined) {
        const cleaned = refined
          .split('\n')
          .map((l) => l.trim())
          .filter(Boolean)
          .join('\n')
          .slice(0, 8000);
        if (cleaned.split(/\s+/).length >= 50) {
          return { text: cleaned, isListing };
        }
      }

      return { text: null as string | null, isListing };
    }

    // Detect JobServe-specific URLs and patterns
    const isJobServe = parsed.hostname.includes('jobserve.com');
    const isJobServeJob = isJobServe && /shid=/i.test(parsed.search);
    
    if (isJobServe && !isJobServeJob) {
      return new Response(
        JSON.stringify({ 
          error: "This appears to be a JobServe search results page. Please use a direct job posting URL instead.",
          isListing: true 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Try Firecrawl first for robust extraction
    const apiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!apiKey) {
      console.warn('FIRECRAWL_API_KEY not set - falling back to basic fetch');
      // fallthrough to fallback below
    } else {
      try {
        console.log('Using Firecrawl to scrape:', parsed.toString());
        const fcRes = await fetch('https://api.firecrawl.dev/v1/scrape', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            url: parsed.toString(),
            formats: ['markdown', 'html'],
            includeTags: ['main', 'article', '[class*="job"]', '[id*="job"]', '[class*="description"]'],
            excludeTags: ['nav', 'header', 'footer', 'aside', '[class*="sidebar"]', '[class*="menu"]']
          }),
        });

        if (fcRes.ok) {
          const fcJson = await fcRes.json();
          const data = fcJson?.data ?? fcJson;
          const title = data?.metadata?.title || data?.title || null;
          const markdown = data?.markdown || data?.content || null;
          const html = data?.html || null;

          // Attempt to refine to the job description section
          const refined = refineJobDescription({ html, markdown });
          if (refined.text) {
            return new Response(
              JSON.stringify({ success: true, title, text: refined.text, source: 'firecrawl', isListing: refined.isListing }),
              { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }

          console.warn('Firecrawl returned no refined content, falling back to raw conversion');
          const text = markdown
            ? String(markdown).slice(0, 8000)
            : html
              ? htmlToText(String(html))
              : null;

          if (text) {
            return new Response(
              JSON.stringify({ success: true, title, text, source: 'firecrawl', isListing: refined.isListing }),
              { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }

          console.warn('Firecrawl returned no usable content, falling back');
        } else {
          const errText = await fcRes.text();
          console.warn('Firecrawl error', fcRes.status, errText);
        }
      } catch (err) {
        console.warn('Firecrawl exception, falling back', err);
      }
    }

    // Fallback: direct fetch and HTML-to-text parsing
    const res = await fetch(parsed.toString(), {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      redirect: 'follow',
    });

    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: `Failed to fetch page (${res.status})` }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const html = await res.text();

    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : null;

    // Refine if possible
    const refined = refineJobDescription({ html, markdown: null });
    const text = refined.text || htmlToText(html);

    return new Response(
      JSON.stringify({ success: true, title, text, source: 'fallback', isListing: refined.isListing }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (e) {
    console.error("job-description-extractor error", e);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
