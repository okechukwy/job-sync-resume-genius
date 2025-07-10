import { LinkedInProfile, ScannedProfile } from "@/schemas/linkedInSchemas";

export interface ProfileExtractionResult {
  success: boolean;
  data?: ScannedProfile;
  error?: string;
}

export class LinkedInProfileExtractor {
  private static validateLinkedInUrl(url: string): boolean {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.includes('linkedin.com') && url.includes('/in/');
    } catch {
      return false;
    }
  }

  private static extractUsernameFromUrl(url: string): string {
    try {
      const match = url.match(/linkedin\.com\/in\/([^/?]+)/);
      return match ? match[1] : '';
    } catch {
      return '';
    }
  }

  private static simulateProfileExtraction(url: string): Partial<LinkedInProfile> {
    // This simulates what would be extracted from a real LinkedIn profile
    const username = this.extractUsernameFromUrl(url);
    
    // Mock data based on URL - in real implementation this would scrape the actual profile
    return {
      headline: `${username.charAt(0).toUpperCase() + username.slice(1)} | Professional Title | Industry Expert`,
      summary: `Experienced professional with expertise in various fields. Passionate about innovation and driving results. Strong background in leadership and team collaboration.`,
      location: "San Francisco, CA",
      industry: "Technology",
      skills: ["Leadership", "Project Management", "Strategic Planning", "Team Building", "Innovation"],
      photo: true,
      background: true,
    };
  }

  private static calculateProfileStrength(profile: Partial<LinkedInProfile>): number {
    let score = 0;
    if (profile.headline) score += 20;
    if (profile.summary && profile.summary.length > 100) score += 25;
    if (profile.skills && profile.skills.length >= 5) score += 20;
    if (profile.location) score += 10;
    if (profile.industry) score += 10;
    if (profile.photo) score += 10;
    if (profile.background) score += 5;
    return Math.min(score, 100);
  }

  private static analyzeKeywordDensity(profile: Partial<LinkedInProfile>): Record<string, number> {
    const text = `${profile.headline || ''} ${profile.summary || ''}`.toLowerCase();
    const keywords = ["leadership", "management", "strategy", "innovation", "technology", "team", "business", "development"];
    
    return keywords.reduce((acc, keyword) => {
      const count = (text.match(new RegExp(keyword, 'g')) || []).length;
      acc[keyword] = count;
      return acc;
    }, {} as Record<string, number>);
  }

  private static calculateCompetitiveMetrics(profile: Partial<LinkedInProfile>) {
    return {
      headlineOptimization: profile.headline && profile.headline.length > 50 ? 85 : 65,
      summaryLength: profile.summary ? Math.min((profile.summary.length / 2000) * 100, 100) : 0,
      skillsCount: profile.skills ? Math.min((profile.skills.length / 50) * 100, 100) : 0,
      experienceDetail: profile.experience ? profile.experience.length * 20 : 0,
    };
  }

  static async extractProfile(url: string, scanDepth: "basic" | "detailed" | "comprehensive" = "detailed"): Promise<ProfileExtractionResult> {
    if (!this.validateLinkedInUrl(url)) {
      return {
        success: false,
        error: "Invalid LinkedIn profile URL. Please provide a valid URL like https://linkedin.com/in/username"
      };
    }

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const extractedData = this.simulateProfileExtraction(url);
      const profileStrength = this.calculateProfileStrength(extractedData);
      const keywordDensity = this.analyzeKeywordDensity(extractedData);
      const competitiveMetrics = this.calculateCompetitiveMetrics(extractedData);

      const scannedProfile: ScannedProfile = {
        url,
        extractedData,
        profileStrength,
        industryAlignment: Math.floor(Math.random() * 30) + 70, // Simulate industry alignment
        keywordDensity,
        competitiveMetrics,
        scannedAt: new Date(),
      };

      return {
        success: true,
        data: scannedProfile,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to extract profile data"
      };
    }
  }

  static async bulkExtractProfiles(urls: string[]): Promise<ProfileExtractionResult[]> {
    const results = await Promise.allSettled(
      urls.map(url => this.extractProfile(url))
    );

    return results.map(result => 
      result.status === 'fulfilled' 
        ? result.value 
        : { success: false, error: "Failed to process profile" }
    );
  }
}