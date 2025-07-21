
export const getScoreDescription = (score: number, type: 'overall' | 'ats'): string => {
  if (type === 'overall') {
    if (score >= 90) return 'Outstanding resume with exceptional quality';
    if (score >= 80) return 'Strong resume with minor areas for improvement';
    if (score >= 70) return 'Good foundation with room for enhancement';
    if (score >= 60) return 'Solid base requiring targeted improvements';
    if (score >= 50) return 'Needs significant optimization for better results';
    return 'Requires comprehensive restructuring and enhancement';
  } else { // ats
    if (score >= 90) return 'Excellent ATS compatibility - will pass most systems';
    if (score >= 80) return 'Good ATS compatibility with minor optimizations needed';
    if (score >= 70) return 'Moderate ATS compatibility - needs keyword optimization';
    if (score >= 60) return 'Below average ATS compatibility - requires improvements';
    if (score >= 50) return 'Poor ATS compatibility - significant changes needed';
    return 'Critical ATS issues - major restructuring required';
  }
};

export const getSectionStatusMessage = (section: string, score: number): string => {
  const sectionMessages = {
    contact: {
      excellent: 'Complete professional contact information',
      good: 'Minor contact details could be enhanced',
      fair: 'Some contact information is missing or unclear',
      needs_work: 'Critical contact information is incomplete'
    },
    summary: {
      excellent: 'Compelling professional summary with clear value proposition',
      good: 'Strong summary with minor improvements possible',
      fair: 'Summary present but lacks impact and specificity',
      needs_work: 'Summary missing or needs complete rewrite'
    },
    experience: {
      excellent: 'Outstanding work history with quantified achievements',
      good: 'Strong experience section with room for more metrics',
      fair: 'Experience listed but lacks quantifiable results',
      needs_work: 'Experience section needs significant enhancement'
    },
    education: {
      excellent: 'Comprehensive and well-formatted education section',
      good: 'Education section is clear with minor gaps',
      fair: 'Education information present but could be improved',
      needs_work: 'Education section incomplete or poorly formatted'
    },
    skills: {
      excellent: 'Comprehensive skills section with relevant keywords',
      good: 'Good skills coverage with some missing keywords',
      fair: 'Basic skills listed but needs industry-specific terms',
      needs_work: 'Skills section lacks relevant keywords and depth'
    },
    formatting: {
      excellent: 'Perfect formatting and ATS-friendly structure',
      good: 'Good formatting with minor ATS improvements needed',
      fair: 'Acceptable format but some ATS compatibility issues',
      needs_work: 'Poor formatting creates major ATS scanning problems'
    }
  };

  const getStatus = (score: number): keyof typeof sectionMessages.contact => {
    if (score >= 85) return 'excellent';
    if (score >= 70) return 'good';
    if (score >= 55) return 'fair';
    return 'needs_work';
  };

  const status = getStatus(score);
  return sectionMessages[section as keyof typeof sectionMessages]?.[status] || 
         `Section needs attention (Score: ${score}/100)`;
};
