import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Share2, Edit, Copy, Archive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { PageLayout } from '@/components/common/PageLayout';
import { ResumeLayoutRenderer } from '@/components/resume-layouts/ResumeLayoutRenderer';
import { supabase } from '@/integrations/supabase/client';
import { ResumeData } from '@/types/resumeTypes';
import { toast } from 'sonner';
import jsPDF from 'jspdf';

export default function ResumePreview() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [templateId, setTemplateId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (id) {
      loadResumeData();
    }
  }, [id]);

  const loadResumeData = async () => {
    if (!id) return;

    try {
      setLoading(true);
      
      const { data: resume, error } = await supabase
        .from('user_resumes')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      if (resume) {
        // Reconstruct ResumeData from individual fields with proper typing
        const resumeData: ResumeData = {
          personalInfo: resume.personal_info as any,
          summary: resume.summary as any,
          experience: resume.experience as any,
          education: resume.education as any,
          skills: resume.skills as any,
          projects: resume.projects as any,
          certificates: resume.certificates as any,
          awards: resume.awards as any,
          publications: resume.publications as any,
          languages: resume.languages as any,
          interests: resume.interests as any,
          volunteering: resume.volunteering as any,
          additionalInfo: resume.additional_info as any,
        };
        setResumeData(resumeData);
        setTemplateId(resume.template_id || 'modern-minimalist');
      }
    } catch (error) {
      console.error('Error loading resume:', error);
      toast.error('Failed to load resume');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!resumeData) return;

    try {
      setDownloading(true);

      const element = document.getElementById('resume-export');
      if (!element) throw new Error('Resume element not found');

      const pdf = new jsPDF('p', 'mm', 'a4');

      await (pdf as any).html(element, {
        html2canvas: { scale: 2, useCORS: true, allowTaint: true, backgroundColor: '#ffffff' },
        margin: [0, 0, 0, 0],
        autoPaging: 'text',
        callback: (doc: any) => {
          const fileName = resumeData.personalInfo?.fullName 
            ? `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`
            : 'Resume.pdf';
          doc.save(fileName);
          toast.success('Resume downloaded successfully!');
          setDownloading(false);
        }
      });
    } catch (error) {
      console.error('Error downloading resume:', error);
      toast.error('Failed to download resume');
      setDownloading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Resume',
          text: 'Check out my resume',
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleEdit = () => {
    navigate(`/dashboard/resume/builder?resumeId=${id}`);
  };

  const handleDuplicate = async () => {
    if (!resumeData || !id) return;

    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      const { data, error } = await supabase
        .from('user_resumes')
        .insert({
          user_id: user.user.id,
          title: `${resumeData.personalInfo?.fullName || 'Resume'} Copy`,
          personal_info: resumeData.personalInfo,
          summary: resumeData.summary,
          experience: resumeData.experience,
          education: resumeData.education,
          skills: resumeData.skills,
          projects: resumeData.projects,
          certificates: resumeData.certificates,
          awards: resumeData.awards,
          publications: resumeData.publications,
          languages: resumeData.languages,
          interests: resumeData.interests,
          volunteering: resumeData.volunteering,
          additional_info: resumeData.additionalInfo,
          template_id: templateId,
          is_active: false,
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Resume duplicated successfully!');
      navigate(`/dashboard/resume/builder?resumeId=${data.id}`);
    } catch (error) {
      console.error('Error duplicating resume:', error);
      toast.error('Failed to duplicate resume');
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner />
        </div>
      </PageLayout>
    );
  }

  if (!resumeData) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-2xl font-semibold text-foreground mb-4">Resume Not Found</h1>
          <Button onClick={() => navigate('/dashboard/resume/versions')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Versions
          </Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard/resume/versions')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Versions
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Resume Preview</h1>
              <p className="text-muted-foreground">
                {resumeData.personalInfo?.fullName || 'Untitled Resume'}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" onClick={handleDuplicate}>
              <Copy className="w-4 h-4 mr-2" />
              Duplicate
            </Button>
            <Button 
              variant="outline" 
              onClick={handleDownload}
              disabled={downloading}
            >
              <Download className="w-4 h-4 mr-2" />
              {downloading ? 'Downloading...' : 'Download PDF'}
            </Button>
            <Button onClick={handleEdit}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Resume
            </Button>
          </div>
        </div>

        {/* Resume Preview */}
        <Card className="p-6">
          <div id="resume-export" className="max-w-4xl mx-auto">
            <ResumeLayoutRenderer
              data={resumeData}
              templateId={templateId}
              formatDate={formatDate}
              mode="export"
            />
          </div>
        </Card>
      </div>
    </PageLayout>
  );
}