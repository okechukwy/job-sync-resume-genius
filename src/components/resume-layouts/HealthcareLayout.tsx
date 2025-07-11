import { LayoutProps } from "./types";
import { Mail, Phone, MapPin, Globe, Linkedin, User, Heart, Shield, Stethoscope } from "lucide-react";

export const HealthcareLayout = ({ data, styles, formatDate, renderSummarySection, renderExperienceSection, renderEducationSection, renderSkillsSection }: LayoutProps) => (
  <div className="spacing-content animate-fade-in">
    {/* Healthcare Header */}
    <div className="bg-gradient-to-r from-teal-50 to-blue-50 border-l-8 border-teal-500 p-8 -mx-8 -mt-8 mb-8 relative">
      {/* Medical cross accent */}
      <div className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center">
        <div className="w-6 h-2 bg-teal-400/30 absolute"></div>
        <div className="w-2 h-6 bg-teal-400/30 absolute"></div>
      </div>
      
      <div className="flex items-center gap-8 mb-6">
        {/* Professional Healthcare Photo */}
        <div className="relative">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center border-4 border-teal-200 shadow-lg hover-scale overflow-hidden">
            {data.personalInfo.profilePicture ? (
              <img 
                src={data.personalInfo.profilePicture} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-16 h-16 text-teal-400" />
            )}
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center border-2 border-white">
            <Stethoscope className="w-4 h-4 text-white" />
          </div>
        </div>
        
        <div className="flex-1">
          <h1 className="typography-heading text-4xl font-bold mb-3 text-gray-800 tracking-tight">
            {data.personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="inline-flex items-center gap-2 bg-teal-100 px-4 py-2 rounded-full border border-teal-200">
            <Heart className="w-4 h-4 text-teal-600" />
            <span className="text-sm text-teal-700 font-medium">Healthcare Professional</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full border border-blue-200 ml-2">
            <Shield className="w-3 h-3 text-blue-600" />
            <span className="text-xs text-blue-700">Licensed</span>
          </div>
        </div>
      </div>
      
      {/* Healthcare Contact Grid */}
      <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-teal-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.personalInfo.email && (
            <div className="flex items-center gap-3 text-gray-700 hover-scale">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                <Mail className="w-4 h-4 text-teal-600" />
              </div>
              <span className="text-sm">{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-3 text-gray-700 hover-scale">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                <Phone className="w-4 h-4 text-teal-600" />
              </div>
              <span className="text-sm">{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center gap-3 text-gray-700 hover-scale">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4 text-teal-600" />
              </div>
              <span className="text-sm">{data.personalInfo.location}</span>
            </div>
          )}
          {data.personalInfo.website && (
            <div className="flex items-center gap-3 text-gray-700 hover-scale">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Globe className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm">{data.personalInfo.website}</span>
            </div>
          )}
          {data.personalInfo.linkedin && (
            <div className="flex items-center gap-3 text-gray-700 hover-scale">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Linkedin className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm">{data.personalInfo.linkedin}</span>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Healthcare sections */}
    <div className="space-y-8">
      {renderSummarySection()}
      {renderExperienceSection()}
      {renderEducationSection()}
      {renderSkillsSection()}
    </div>
  </div>
);