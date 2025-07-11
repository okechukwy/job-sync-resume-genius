import { LayoutProps } from "./types";
import { Mail, Phone, MapPin, Globe, Linkedin, User, Palette, Sparkles } from "lucide-react";

export const CreativeShowcaseLayout = ({ data, styles, formatDate, renderSummarySection, renderExperienceSection, renderEducationSection, renderSkillsSection }: LayoutProps) => (
  <div className="spacing-content animate-fade-in">
    {/* Creative Header with Gradient */}
    <div className={`${styles.headerBg} rounded-2xl p-8 -mx-8 -mt-8 mb-10 relative overflow-hidden`}>
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
          {/* Creative Photo with decorative border */}
          <div className="relative">
            <div className="w-36 h-36 bg-white/20 rounded-2xl flex items-center justify-center border-4 border-white/30 shadow-2xl hover-scale overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-300">
              {data.personalInfo.profilePicture ? (
                <img 
                  src={data.personalInfo.profilePicture} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-20 h-20 text-white/80" />
              )}
            </div>
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-pulse" />
          </div>
          
          <div className="text-center md:text-left flex-1">
            <h1 className={`typography-heading text-5xl font-bold mb-4 ${styles.headerText} tracking-tight`}>
              {data.personalInfo.fullName || 'Your Name'}
            </h1>
            <div className="inline-flex items-center gap-2 bg-white/25 backdrop-blur-sm px-6 py-3 rounded-full mb-4">
              <Palette className="w-4 h-4 text-white" />
              <span className={`text-sm ${styles.headerText} font-medium`}>Creative Professional</span>
            </div>
          </div>
        </div>
        
        {/* Creative Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.personalInfo.email && (
            <div className={`flex items-center gap-3 ${styles.headerText} bg-white/15 backdrop-blur-sm rounded-lg p-3 hover-scale`}>
              <Mail className="w-5 h-5" />
              <span className="text-sm">{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className={`flex items-center gap-3 ${styles.headerText} bg-white/15 backdrop-blur-sm rounded-lg p-3 hover-scale`}>
              <Phone className="w-5 h-5" />
              <span className="text-sm">{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className={`flex items-center gap-3 ${styles.headerText} bg-white/15 backdrop-blur-sm rounded-lg p-3 hover-scale`}>
              <MapPin className="w-5 h-5" />
              <span className="text-sm">{data.personalInfo.location}</span>
            </div>
          )}
          {data.personalInfo.website && (
            <div className={`flex items-center gap-3 ${styles.headerText} bg-white/15 backdrop-blur-sm rounded-lg p-3 hover-scale`}>
              <Globe className="w-5 h-5" />
              <span className="text-sm">{data.personalInfo.website}</span>
            </div>
          )}
          {data.personalInfo.linkedin && (
            <div className={`flex items-center gap-3 ${styles.headerText} bg-white/15 backdrop-blur-sm rounded-lg p-3 hover-scale`}>
              <Linkedin className="w-5 h-5" />
              <span className="text-sm">{data.personalInfo.linkedin}</span>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Creative sections with card-like styling */}
    <div className="space-y-8">
      {renderSummarySection()}
      {renderExperienceSection()}
      {renderEducationSection()}
      {renderSkillsSection()}
    </div>
  </div>
);