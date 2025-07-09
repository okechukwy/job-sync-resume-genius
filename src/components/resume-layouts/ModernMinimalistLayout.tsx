import { LayoutProps } from "./types";
import { Mail, Phone, MapPin, Globe, Linkedin, Github, User } from "lucide-react";

export const ModernMinimalistLayout = ({ data, styles, formatDate, renderSummarySection, renderExperienceSection, renderEducationSection, renderSkillsSection }: LayoutProps) => (
  <div className="spacing-content animate-slide-up">
    {/* Clean Header */}
    <div className="text-left border-b border-gray-200 pb-10 mb-12 hover-scale">
      <div className="flex items-start gap-8 mb-6">
        {/* Professional Photo Placeholder */}
        <div className="w-28 h-28 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-gray-200 shadow-sm hover-scale overflow-hidden">
          {data.personalInfo.profilePicture ? (
            <img 
              src={data.personalInfo.profilePicture} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-12 h-12 text-gray-400" />
          )}
        </div>
        
        <div className="flex-1">
          <h1 className="typography-display text-5xl font-light mb-3 text-gray-900 tracking-tighter">{data.personalInfo.fullName || 'Your Name'}</h1>
          <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full mb-4">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-600 font-medium">Open to work</span>
          </div>
        </div>
      </div>
      
      {/* Enhanced Contact Info with Icons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="space-y-2">
          {data.personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          {data.personalInfo.website && (
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span className="text-gray-500">{data.personalInfo.website}</span>
            </div>
          )}
          {data.personalInfo.linkedin && (
            <div className="flex items-center gap-2">
              <Linkedin className="w-4 h-4" />
              <span className="text-gray-500">{data.personalInfo.linkedin}</span>
            </div>
          )}
        </div>
      </div>
    </div>
    {renderSummarySection()}
    {renderExperienceSection()}
    {renderEducationSection()}
    {renderSkillsSection()}
  </div>
);