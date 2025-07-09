import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface TemplateActionsProps {
  templateName: string;
}

export const TemplateActions = ({ templateName }: TemplateActionsProps) => {
  const navigate = useNavigate();

  const handleTemplateClick = () => {
    try {
      console.log('🚀 Template button clicked!', templateName);
      
      // Create template parameter for URL
      const templateParam = templateName.toLowerCase().replace(/\s+/g, '-');
      const url = `/get-started?template=${encodeURIComponent(templateParam)}`;
      
      console.log('🔗 Navigating to:', url);
      console.log('📝 Template parameter:', templateParam);
      
      toast.success(`Navigating to ${templateName} template...`);
      
      // Navigate using useNavigate hook
      navigate(url);
      
      console.log('✅ Navigation completed');
    } catch (error) {
      console.error('❌ Navigation failed:', error);
      toast.error('Failed to navigate. Please try again.');
    }
  };
  const handleDownloadSample = () => {
    toast.success("Sample resume download started!");
    
    // Create formatted HTML content for the template preview
    const sampleContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${templateName} Resume Template Sample</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 8.5in; margin: 0 auto; padding: 1in; background: white; color: black; }
        .header { border-bottom: 2px solid #3B82F6; padding-bottom: 1rem; margin-bottom: 1rem; }
        .name { font-size: 2rem; font-weight: bold; color: #1E3A8A; margin: 0; }
        .title { font-size: 1.2rem; color: #3B82F6; margin: 0.25rem 0; }
        .contact { font-size: 0.9rem; color: #666; }
        .section { margin: 1.5rem 0; }
        .section-title { font-weight: bold; color: #1E3A8A; border-left: 4px solid #3B82F6; padding-left: 0.75rem; margin-bottom: 0.5rem; }
        .experience-item { margin-bottom: 1rem; }
        .job-header { display: flex; justify-content: space-between; align-items: center; }
        .job-title { font-weight: bold; color: #333; }
        .job-date { color: #3B82F6; font-weight: bold; font-size: 0.9rem; }
        .company { color: #666; font-size: 0.9rem; }
        .achievements { font-size: 0.85rem; color: #333; margin-top: 0.25rem; }
        .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.9rem; }
        .education-item { margin-bottom: 0.5rem; font-size: 0.9rem; }
        ul { margin: 0; padding-left: 1.25rem; }
        li { margin-bottom: 0.25rem; }
    </style>
</head>
<body>
    <div class="header">
        <h1 class="name">${templateName === 'Healthcare Specialist' ? 'Dr. Sarah Johnson, MD' : 'Dr. Michael Johnson, MD'}</h1>
        <p class="title">${templateName === 'Healthcare Specialist' ? 'Internal Medicine Physician' : 'Board-Certified Cardiologist'}</p>
        <p class="contact">
            ${templateName === 'Healthcare Specialist' ? 'sarah.johnson@hospital.com' : 'm.johnson@hospital.com'} | 
            (555) 123-4567 | 
            Medical License: #MD12345
        </p>
    </div>
    
    <div class="section">
        <h3 class="section-title">${templateName === 'Healthcare Specialist' ? 'PROFESSIONAL SUMMARY' : 'MEDICAL SUMMARY'}</h3>
        <p>Board-certified ${templateName === 'Healthcare Specialist' ? 'Internal Medicine physician with 8+ years of experience in patient care, chronic disease management, and preventive medicine. Committed to delivering evidence-based healthcare and improving patient outcomes.' : 'cardiologist with 15+ years providing exceptional patient care in interventional cardiology. Expert in cardiac catheterization, heart failure management, and preventive cardiology with a proven track record of clinical excellence.'}</p>
    </div>
    
    <div class="section">
        <h3 class="section-title">${templateName === 'Healthcare Specialist' ? 'MEDICAL EXPERTISE' : 'SPECIALIZATIONS'}</h3>
        <div class="skills-grid">
            <div>• ${templateName === 'Healthcare Specialist' ? 'Internal Medicine' : 'Interventional Cardiology'}</div>
            <div>• ${templateName === 'Healthcare Specialist' ? 'Preventive Care' : 'Cardiac Catheterization'}</div>
            <div>• ${templateName === 'Healthcare Specialist' ? 'Chronic Disease Management' : 'Preventive Cardiology'}</div>
            <div>• ${templateName === 'Healthcare Specialist' ? 'Electronic Health Records' : 'Heart Failure Management'}</div>
        </div>
    </div>
    
    <div class="section">
        <h3 class="section-title">CLINICAL EXPERIENCE</h3>
        <div class="experience-item">
            <div class="job-header">
                <h4 class="job-title">${templateName === 'Healthcare Specialist' ? 'Attending Physician' : 'Senior Cardiologist'}</h4>
                <span class="job-date">${templateName === 'Healthcare Specialist' ? '2020 - Present' : '2015 - Present'}</span>
            </div>
            <p class="company">${templateName === 'Healthcare Specialist' ? 'City General Hospital' : 'Metropolitan Medical Center'}</p>
            <ul class="achievements">
                <li>${templateName === 'Healthcare Specialist' ? 'Manage 40+ patients daily in internal medicine unit' : 'Performed 500+ cardiac catheterizations with 98% success rate'}</li>
                <li>${templateName === 'Healthcare Specialist' ? 'Reduced readmission rates by 25% through care coordination' : 'Led heart failure clinic serving 200+ patients annually'}</li>
                <li>${templateName === 'Healthcare Specialist' ? 'Implemented new electronic health record protocols' : 'Mentored 15+ cardiology fellows and residents'}</li>
            </ul>
        </div>
    </div>
    
    <div class="section">
        <h3 class="section-title">EDUCATION & CERTIFICATIONS</h3>
        <div class="education-item">• MD - Harvard Medical School (${templateName === 'Healthcare Specialist' ? '2015' : '2005'})</div>
        <div class="education-item">• ${templateName === 'Healthcare Specialist' ? 'Internal Medicine Residency - Johns Hopkins (2018)' : 'Cardiology Fellowship - Mayo Clinic (2010)'}</div>
        <div class="education-item">• Board Certified - American Board of ${templateName === 'Healthcare Specialist' ? 'Internal Medicine' : 'Internal Medicine & Cardiology'}</div>
        ${templateName === 'Healthcare Specialist' ? '<div class="education-item">• ACLS & BLS Certified</div>' : '<div class="education-item">• Fellow of American College of Cardiology (FACC)</div>'}
    </div>
</body>
</html>`;

    const blob = new Blob([sampleContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${templateName.toLowerCase().replace(/\s+/g, '-')}-sample.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="text-center space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          variant="hero" 
          size="lg" 
          className="min-w-48" 
          onClick={handleTemplateClick}
        >
          <FileText className="w-4 h-4 mr-2" />
          Use This Template
        </Button>
        <Button variant="glass" size="lg" className="min-w-48" onClick={handleDownloadSample}>
          <Download className="w-4 h-4 mr-2" />
          Download Sample
        </Button>
      </div>
      <p className="text-sm text-contrast-medium">
        Free to use • No credit card required
      </p>
    </div>
  );
};