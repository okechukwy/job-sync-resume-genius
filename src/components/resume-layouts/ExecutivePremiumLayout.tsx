import { LayoutProps } from "./types";
import { Mail, Phone, MapPin, Globe, Linkedin, User, Award, Crown } from "lucide-react";

export const ExecutivePremiumLayout = ({ data, styles, formatDate, renderSummarySection, renderExperienceSection, renderEducationSection, renderSkillsSection }: LayoutProps) => (
  <div className="spacing-content animate-fade-in">
    {/* Executive Header */}
    <div className={`${styles.headerBg} border-b-4 border-amber-400 p-12 -mx-8 -mt-8 mb-10 relative`}>
      {/* Luxury accent line */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-8">
          {/* Executive Photo */}
          <div className="w-32 h-32 bg-amber-100/20 rounded-lg flex items-center justify-center border-2 border-amber-400/30 shadow-2xl hover-scale overflow-hidden">
            {data.personalInfo.profilePicture ? (
              <img 
                src={data.personalInfo.profilePicture} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-16 h-16 text-amber-200" />
            )}
          </div>
          
          <div>
            <h1 className={`typography-heading text-4xl font-bold mb-3 ${styles.headerText} tracking-tight`}>
              {data.personalInfo.fullName || 'Your Name'}
            </h1>
            <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm px-4 py-2 rounded-md">
              <Crown className="w-4 h-4 text-amber-300" />
              <span className={`text-sm ${styles.headerText} font-semibold`}>Executive Leader</span>
            </div>
          </div>
        </div>
        
        <Award className="w-12 h-12 text-amber-400 opacity-60" />
      </div>
      
      {/* Executive Contact Grid */}
      <div className="border-t border-white/20 pt-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {data.personalInfo.email && (
            <div className={`flex flex-col items-center gap-2 ${styles.headerText} hover-scale`}>
              <Mail className="w-5 h-5 text-amber-300" />
              <span className="text-xs text-center">{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className={`flex flex-col items-center gap-2 ${styles.headerText} hover-scale`}>
              <Phone className="w-5 h-5 text-amber-300" />
              <span className="text-xs text-center">{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className={`flex flex-col items-center gap-2 ${styles.headerText} hover-scale`}>
              <MapPin className="w-5 h-5 text-amber-300" />
              <span className="text-xs text-center">{data.personalInfo.location}</span>
            </div>
          )}
          {data.personalInfo.website && (
            <div className={`flex flex-col items-center gap-2 ${styles.headerText} hover-scale`}>
              <Globe className="w-5 h-5 text-amber-300" />
              <span className="text-xs text-center">{data.personalInfo.website}</span>
            </div>
          )}
          {data.personalInfo.linkedin && (
            <div className={`flex flex-col items-center gap-2 ${styles.headerText} hover-scale`}>
              <Linkedin className="w-5 h-5 text-amber-300" />
              <span className="text-xs text-center">{data.personalInfo.linkedin}</span>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Premium sections */}
    <div className="space-y-10">
      {renderSummarySection()}
      {renderExperienceSection()}
      {renderEducationSection()}
      {renderSkillsSection()}
    </div>
  </div>
);