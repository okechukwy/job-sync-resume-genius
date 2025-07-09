import { LayoutProps } from "./types";

export const ModernMinimalistLayout = ({ data, styles, formatDate, renderExperienceSection, renderEducationSection, renderSkillsSection }: LayoutProps) => (
  <div className="spacing-content animate-slide-up">
    {/* Clean Header */}
    <div className="text-left border-b border-gray-200 pb-10 mb-12 hover-scale">
      <h1 className="typography-display text-5xl font-light mb-3 text-gray-900 tracking-tighter">{data.personalInfo.fullName || 'Your Name'}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mt-4">
        <div className="space-y-1">
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
        </div>
        <div className="space-y-1">
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          {data.personalInfo.website && <div className="text-gray-500">{data.personalInfo.website}</div>}
        </div>
      </div>
    </div>
    {renderExperienceSection()}
    {renderEducationSection()}
    {renderSkillsSection()}
  </div>
);