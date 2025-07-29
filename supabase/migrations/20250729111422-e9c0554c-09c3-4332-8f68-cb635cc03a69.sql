-- Ensure we have a basic personal branding template
INSERT INTO recommendation_templates (
  name,
  category,
  description,
  prompt_template,
  target_audience,
  priority_weight,
  is_active
) VALUES (
  'Basic Personal Branding Strategy',
  'personal_branding',
  'Generate personalized branding strategies for career advancement',
  'Generate 3-5 personalized personal branding strategies for a professional with the following profile:

Current Role: {{currentRole}}
Target Role: {{targetRole}}
Industry: {{industry}}
Key Skills: {{keySkills}}
Achievements: {{achievements}}
Unique Value Proposition: {{uniqueValue}}
Personal Story: {{personalStory}}
Target Audience: {{targetAudience}}
Communication Style: {{communicationStyle}}

For each strategy, provide:
1. A clear title and description
2. 3-5 specific actionable steps
3. Timeline estimates
4. Priority level (high/medium/low)
5. Success metrics

Return the response in this JSON format:
{
  "title": "Personal Branding Strategy Plan",
  "description": "Personalized branding strategies to advance your career",
  "category": "personal_branding",
  "priority": "high",
  "confidence_score": 0.9,
  "reasoning": "Based on your profile and goals",
  "recommended_actions": [
    {
      "action": "Strategy name",
      "description": "Detailed description",
      "priority": "high",
      "timeline": "2-4 weeks",
      "success_metrics": ["metric 1", "metric 2"]
    }
  ],
  "metadata": {
    "industry_specific": true,
    "difficulty": "medium",
    "platforms": ["LinkedIn", "Twitter"]
  }
}',
  ARRAY['career_transition', 'personal_branding', 'all'],
  1.0,
  true
) ON CONFLICT (name) DO UPDATE SET
  prompt_template = EXCLUDED.prompt_template,
  is_active = true;