import { ResumeData } from "@/hooks/useResumeSteps";
import { LayoutProps } from "./types";
import { Mail, Phone, MapPin, Globe, Linkedin, Github, User } from "lucide-react";

export const ClassicProfessionalLayout = ({ data, styles, formatDate, renderExperienceSection, renderEducationSection, renderSkillsSection }: LayoutProps) => (
  <div className="spacing-content animate-fade-in">
    {/* Header */}
    <div className={`${styles.headerBg} ${styles.borderColor} rounded-xl p-10 -mx-8 -mt-8 mb-8 hover-lift`}>
      <div className="flex items-center justify-center gap-8 mb-6">
        {/* Professional Photo Placeholder */}
        <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center border-4 border-white/30 shadow-xl hover-scale">
          <User className="w-16 h-16 text-white/80" />
        </div>
        
        <div className="text-center">
          <h1 className={`typography-heading text-4xl font-bold mb-4 ${styles.headerText} tracking-tight`}>{data.personalInfo.fullName || 'Your Name'}</h1>
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            <span className={`text-sm ${styles.headerText} font-medium`}>Available for opportunities</span>
          </div>
        </div>
      </div>
      
      {/* Enhanced Contact Info with Icons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        <div className="space-y-2">
          {data.personalInfo.email && (
            <div className={`flex items-center gap-2 ${styles.headerText} opacity-90`}>
              <Mail className="w-4 h-4" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className={`flex items-center gap-2 ${styles.headerText} opacity-90`}>
              <Phone className="w-4 h-4" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className={`flex items-center gap-2 ${styles.headerText} opacity-90`}>
              <MapPin className="w-4 h-4" />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          {data.personalInfo.website && (
            <div className={`flex items-center gap-2 ${styles.headerBg.includes('gradient') || styles.headerBg.includes('900') ? 'text-white' : styles.accentColor} font-medium`}>
              <Globe className="w-4 h-4" />
              <span>{data.personalInfo.website}</span>
            </div>
          )}
          {data.personalInfo.linkedin && (
            <div className={`flex items-center gap-2 ${styles.headerBg.includes('gradient') || styles.headerBg.includes('900') ? 'text-white' : styles.accentColor} font-medium`}>
              <Linkedin className="w-4 h-4" />
              <span>{data.personalInfo.linkedin}</span>
            </div>
          )}
        </div>
      </div>
    </div>
    {renderExperienceSection()}
    {renderEducationSection()}
    {renderSkillsSection()}
  </div>
);