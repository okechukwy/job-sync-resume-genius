-- Insert personal branding recommendation templates
INSERT INTO public.recommendation_templates (name, category, description, prompt_template, target_audience, priority_weight, is_active) VALUES 
(
  'Personal Branding Strategy',
  'personal_branding',
  'Generate personalized branding strategies based on user career profile',
  'Generate personalized personal branding strategies for a professional transitioning from {{currentRole}} to {{targetRole}} in the {{industry}} industry.

User Profile:
- Current Role: {{currentRole}}
- Target Role: {{targetRole}}
- Industry: {{industry}}
- Key Skills: {{keySkills}}
- Achievements: {{achievements}}
- Unique Value Proposition: {{uniqueValue}}
- Personal Story: {{personalStory}}
- Target Audience: {{targetAudience}}
- Communication Style: {{communicationStyle}}

Generate 3-5 specific, actionable branding strategies that:
1. Leverage their unique strengths and background
2. Are tailored to their industry and target role
3. Consider their communication style and preferences
4. Include specific tactics, timelines, and difficulty levels
5. Provide measurable success criteria

For each strategy, include:
- Strategy name and description
- 3-5 specific tactics with actionable steps
- Timeline (e.g., "2-4 weeks", "3-6 months", "ongoing")
- Difficulty level (Easy/Medium/Hard)
- Success metrics and KPIs
- Industry-specific considerations
- Networking opportunities
- Content creation ideas
- Platform-specific recommendations

Focus on strategies that will help them stand out in {{industry}} and position them for {{targetRole}} opportunities.',
  ARRAY['all', 'career_changers', 'professionals', 'executives'],
  1.0,
  true
),
(
  'Industry-Specific Branding',
  'personal_branding',
  'Generate industry-specific branding tactics and content strategies',
  'Create industry-specific personal branding recommendations for {{industry}} professionals.

Context:
- Industry: {{industry}}
- Current Role: {{currentRole}}
- Target Role: {{targetRole}}
- Experience Level: {{experienceLevel}}
- Key Skills: {{keySkills}}

Generate targeted branding tactics that:
1. Align with {{industry}} culture and expectations
2. Showcase relevant expertise and thought leadership
3. Build credibility within the industry
4. Create networking opportunities
5. Position for career advancement

Include specific recommendations for:
- Industry publications and platforms
- Professional associations and events
- Key influencers to engage with
- Content topics that resonate
- Certification or skill development priorities
- Speaking and presentation opportunities',
  ARRAY['professionals', 'industry_specialists'],
  0.9,
  true
),
(
  'Executive Personal Branding',
  'personal_branding',
  'Generate executive-level branding strategies for leadership positioning',
  'Develop executive personal branding strategies for a {{currentRole}} targeting {{targetRole}} positions.

Executive Profile:
- Current Role: {{currentRole}}
- Target Role: {{targetRole}}
- Industry: {{industry}}
- Leadership Experience: {{achievements}}
- Unique Value: {{uniqueValue}}

Create executive-level branding strategies that:
1. Establish thought leadership and industry authority
2. Build executive presence and gravitas
3. Demonstrate strategic thinking and vision
4. Showcase leadership achievements and impact
5. Position for board opportunities and speaking engagements

Focus on:
- Executive content strategy
- Industry thought leadership platforms
- Board readiness and positioning
- Media and speaking opportunities
- Strategic networking approaches
- Executive coaching and development
- Crisis communication preparedness',
  ARRAY['executives', 'senior_professionals'],
  1.2,
  true
);