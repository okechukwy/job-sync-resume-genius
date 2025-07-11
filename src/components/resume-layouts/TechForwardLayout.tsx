import { LayoutProps } from "./types";
import { Mail, Phone, MapPin, Globe, Linkedin, User, Code, Terminal, Cpu } from "lucide-react";

export const TechForwardLayout = ({ data, styles, formatDate, renderSummarySection, renderExperienceSection, renderEducationSection, renderSkillsSection }: LayoutProps) => (
  <div className="spacing-content animate-fade-in font-mono">
    {/* Tech Header */}
    <div className={`${styles.headerBg} rounded-lg p-8 -mx-8 -mt-8 mb-8 relative overflow-hidden border border-blue-500/30`}>
      {/* Tech grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 gap-1 h-full">
          {Array.from({ length: 48 }, (_, i) => (
            <div key={i} className="bg-blue-400/20 rounded-sm"></div>
          ))}
        </div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-start gap-6 mb-6">
          {/* Tech Photo with terminal styling */}
          <div className="relative">
            <div className="w-28 h-28 bg-gray-900/80 rounded-lg flex items-center justify-center border-2 border-blue-400/50 shadow-xl hover-scale overflow-hidden">
              {data.personalInfo.profilePicture ? (
                <img 
                  src={data.personalInfo.profilePicture} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-14 h-14 text-blue-300" />
              )}
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse border-2 border-gray-900"></div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Terminal className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-blue-300 font-mono">user@resume:~$</span>
            </div>
            <h1 className={`typography-heading text-3xl font-bold mb-3 ${styles.headerText} tracking-tight font-mono`}>
              {data.personalInfo.fullName || 'Your Name'}
            </h1>
            <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded border border-blue-400/30">
              <Code className="w-4 h-4 text-blue-300" />
              <span className={`text-sm ${styles.headerText} font-medium`}>Software Engineer</span>
            </div>
          </div>
          
          <Cpu className="w-8 h-8 text-blue-400 opacity-60" />
        </div>
        
        {/* Tech Contact Interface */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded border border-blue-400/30 p-4">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-blue-400/20">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-xs text-blue-300 ml-2 font-mono">contact.json</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-mono">
            {data.personalInfo.email && (
              <div className={`flex items-center gap-2 ${styles.headerText}`}>
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-blue-300">"email":</span>
                <span>"{data.personalInfo.email}"</span>
              </div>
            )}
            {data.personalInfo.phone && (
              <div className={`flex items-center gap-2 ${styles.headerText}`}>
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-blue-300">"phone":</span>
                <span>"{data.personalInfo.phone}"</span>
              </div>
            )}
            {data.personalInfo.location && (
              <div className={`flex items-center gap-2 ${styles.headerText}`}>
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-blue-300">"location":</span>
                <span>"{data.personalInfo.location}"</span>
              </div>
            )}
            {data.personalInfo.website && (
              <div className={`flex items-center gap-2 ${styles.headerText}`}>
                <Globe className="w-4 h-4 text-blue-400" />
                <span className="text-blue-300">"website":</span>
                <span>"{data.personalInfo.website}"</span>
              </div>
            )}
            {data.personalInfo.linkedin && (
              <div className={`flex items-center gap-2 ${styles.headerText}`}>
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span className="text-blue-300">"linkedin":</span>
                <span>"{data.personalInfo.linkedin}"</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

    {/* Tech sections */}
    <div className="space-y-6">
      {renderSummarySection()}
      {renderExperienceSection()}
      {renderEducationSection()}
      {renderSkillsSection()}
    </div>
  </div>
);