import { LayoutProps } from "./types";

export const ModernMinimalistLayout = ({ data, styles, formatDate, renderExperienceSection, renderEducationSection, renderSkillsSection }: LayoutProps) => (
  <div className="space-y-12">
    {/* Clean Header */}
    <div className="text-left border-b-2 border-gray-100 pb-8">
      <h1 className="text-4xl font-light mb-2 text-gray-900">{data.personalInfo.fullName || 'Your Name'}</h1>
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