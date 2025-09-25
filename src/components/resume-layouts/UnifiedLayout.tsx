// Enhanced Unified Layout Component - Supports 20 Distinct Template Designs
import { ResumeData } from "@/hooks/useResumeSteps";
import { StylePreset } from "@/config/templateConfig";

interface UnifiedLayoutProps {
  data: ResumeData;
  stylePreset: StylePreset;
  formatDate: (dateString: string) => string;
  previewMode?: boolean;
}

export const UnifiedLayout = ({ data, stylePreset, formatDate, previewMode = false }: UnifiedLayoutProps) => {
  // Safety check for undefined stylePreset
  if (!stylePreset) {
    return (
      <div className="bg-white shadow-lg max-w-4xl mx-auto font-sans p-8">
        <div className="text-center text-gray-500">
          <p>Template configuration not found</p>
        </div>
      </div>
    );
  }

  const { layout, spacing, typography, visualElements } = stylePreset;
  
  // Apply dynamic CSS custom properties for theming
  const layoutStyle = {
    '--template-primary': `hsl(${stylePreset.primary})`,
    '--template-secondary': `hsl(${stylePreset.secondary})`,
    '--template-accent': `hsl(${stylePreset.accent})`,
    '--template-header-bg': stylePreset.headerBg.startsWith('linear-gradient') 
      ? stylePreset.headerBg 
      : `hsl(${stylePreset.headerBg})`,
    '--template-header-text': stylePreset.headerText.startsWith('hsl') 
      ? stylePreset.headerText 
      : `hsl(${stylePreset.headerText})`,
    '--template-section-border': `hsl(${stylePreset.sectionBorder})`,
  } as React.CSSProperties;

  const spacingClass = {
    compact: 'space-y-4',
    standard: 'space-y-6',
    spacious: 'space-y-8'
  }[spacing];

  const typographyClass = {
    serif: 'font-serif',
    sans: 'font-sans',
    modern: 'font-sans',
    technical: 'font-mono'
  }[typography];

  const renderDecorativeElements = () => {
    if (!visualElements.decorativeElements) return null;
    
    // Category-specific decorative elements
    if (stylePreset.id.includes('creative') || stylePreset.id.includes('graphic') || stylePreset.id.includes('art')) {
      return (
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/20"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-white/15"></div>
          <div className="absolute top-1/2 right-8 w-8 h-8 rounded-full bg-white/10"></div>
        </div>
      );
    }
    
    if (stylePreset.id.includes('tech') || stylePreset.id.includes('developer') || stylePreset.id.includes('engineer')) {
      return (
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-2 right-2 w-20 h-1 bg-white/30"></div>
          <div className="absolute top-4 right-2 w-16 h-1 bg-white/25"></div>
          <div className="absolute top-6 right-2 w-12 h-1 bg-white/20"></div>
        </div>
      );
    }
    
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-black/5"></div>
    );
  };

     const renderHeader = () => {
     const getHeaderContent = () => {
       // Enhanced alignment detection for all template types
       const isCenteredHeader = visualElements.headerStyle === 'centered' || 
                               stylePreset.id.includes('classic') || 
                               stylePreset.id.includes('traditional') ||
                               stylePreset.id.includes('academic') ||
                               stylePreset.id.includes('creative') ||
                               stylePreset.id.includes('portfolio');
       
       const isMinimalHeader = visualElements.headerStyle === 'minimal' ||
                              stylePreset.id.includes('minimalist') ||
                              stylePreset.id.includes('bare') ||
                              stylePreset.id.includes('simple');
       
       const isTechnicalHeader = stylePreset.id.includes('tech') ||
                                stylePreset.id.includes('developer') ||
                                stylePreset.id.includes('engineering') ||
                                stylePreset.id.includes('data');
       
       const headerAlignment = isCenteredHeader ? 'text-center' : 
                              isMinimalHeader ? 'text-left' :
                              isTechnicalHeader ? 'text-left' : 'text-left';
       
       return (
         <div className={`relative z-10 ${headerAlignment}`}>
           <h1 className={`font-bold mb-2 ${
             previewMode ? 'text-2xl' :
             visualElements.headerStyle === 'banner' ? 'text-4xl' : 
             visualElements.headerStyle === 'minimal' ? 'text-2xl' :
             visualElements.headerStyle === 'traditional' ? 'text-3xl' : 'text-4xl'
           }`}>
             {data.personalInfo.fullName}
           </h1>
           
           {/* Professional title based on template category */}
           <p className={`opacity-90 mb-4 ${
             previewMode ? 'text-sm' :
             visualElements.headerStyle === 'minimal' ? 'text-sm' : 'text-xl'
           }`}>
             {stylePreset.id.includes('executive') ? 'Executive Professional' :
              stylePreset.id.includes('academic') ? 'Academic Professional' :
              stylePreset.id.includes('creative') || stylePreset.id.includes('designer') ? 'Creative Professional' :
              stylePreset.id.includes('tech') || stylePreset.id.includes('engineer') ? 'Technical Professional' :
              'Professional'}
           </p>
           
           <div className={`flex flex-wrap gap-4 opacity-80 ${
             previewMode ? 'text-xs' :
             visualElements.headerStyle === 'minimal' ? 'text-xs' : 'text-sm'
           } ${isCenteredHeader ? 'justify-center' : 'justify-start'}`}>
             {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
             {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
             {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
           </div>
         </div>
       );
     };

    // Header style variations
    switch (visualElements.headerStyle) {
      case 'banner':
        return (
          <header 
            className={`text-white relative overflow-hidden border-b-4 ${
              previewMode ? 'p-4' : 'p-8'
            }`}
            style={{ 
              background: 'var(--template-header-bg)', 
              color: 'var(--template-header-text)',
              borderColor: 'var(--template-section-border)'
            }}
          >
            {renderDecorativeElements()}
            {getHeaderContent()}
          </header>
        );
      
      case 'centered':
        return (
          <header 
            className={`text-white relative overflow-hidden text-center ${
              previewMode ? 'p-4' : 'p-8'
            }`}
            style={{ background: 'var(--template-header-bg)', color: 'var(--template-header-text)' }}
          >
            {renderDecorativeElements()}
            {getHeaderContent()}
          </header>
        );
      
      case 'split':
        return (
          <header 
            className={`text-white relative overflow-hidden ${
              previewMode ? 'p-4' : 'p-8'
            }`}
            style={{ background: 'var(--template-header-bg)', color: 'var(--template-header-text)' }}
          >
            {renderDecorativeElements()}
            <div className="flex justify-between items-start">
              <div className="flex-1">
                {getHeaderContent()}
              </div>
              {visualElements.iconAccents && (
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white/20"></div>
                </div>
              )}
            </div>
          </header>
        );
      
      case 'minimal':
        return (
          <header 
            className={`text-white relative ${
              previewMode ? 'p-3' : 'p-6'
            }`}
            style={{ background: 'var(--template-header-bg)', color: 'var(--template-header-text)' }}
          >
            {getHeaderContent()}
          </header>
        );
      
      case 'traditional':
        return (
          <header 
            className={`text-white relative border-b-4 ${
              previewMode ? 'p-3' : 'p-6'
            }`}
            style={{ 
              background: 'var(--template-header-bg)', 
              color: 'var(--template-header-text)',
              borderColor: 'var(--template-section-border)'
            }}
          >
            {getHeaderContent()}
          </header>
        );
      
      default:
        return (
          <header 
            className={`text-white relative overflow-hidden ${
              previewMode ? 'p-4' : 'p-8'
            }`}
            style={{ background: 'var(--template-header-bg)', color: 'var(--template-header-text)' }}
          >
            {renderDecorativeElements()}
            {getHeaderContent()}
          </header>
        );
    }
  };

           const renderSection = (title: string, children: React.ReactNode, customBorder?: boolean) => {
      // Enhanced alignment detection for all template types
      const isCenteredTemplate = stylePreset.id.includes('classic') || 
                                stylePreset.id.includes('traditional') ||
                                stylePreset.id.includes('academic') ||
                                stylePreset.id.includes('creative') ||
                                stylePreset.id.includes('portfolio') ||
                                visualElements.headerStyle === 'centered';
      
      const isMinimalTemplate = stylePreset.id.includes('minimalist') ||
                               stylePreset.id.includes('bare') ||
                               stylePreset.id.includes('simple') ||
                               stylePreset.id.includes('clean');
      
      const isTechnicalTemplate = stylePreset.id.includes('tech') ||
                                 stylePreset.id.includes('developer') ||
                                 stylePreset.id.includes('engineering') ||
                                 stylePreset.id.includes('data');
      
      const isExecutiveTemplate = stylePreset.id.includes('executive') ||
                                 stylePreset.id.includes('leadership') ||
                                 stylePreset.id.includes('corporate');
      
      const sectionAlignment = isCenteredTemplate ? 'text-center' : 
                              isMinimalTemplate ? 'text-left' :
                              isTechnicalTemplate ? 'text-left' :
                              isExecutiveTemplate ? 'text-left' : 'text-left';
      
      const titleAlignment = isCenteredTemplate ? 'text-center' : 
                            isMinimalTemplate ? 'text-left' :
                            isTechnicalTemplate ? 'text-left' :
                            isExecutiveTemplate ? 'text-left' : 'text-left';
     
     const borderStyle = customBorder && (layout === 'creative' || layout === 'portfolio') 
       ? 'border-l-4 pl-4 border-b-0' 
       : 'border-b-2';
       
            // Template-specific section margins
       const getSectionMargin = () => {
         if (previewMode) {
           return isMinimalTemplate ? 'mb-2' : 'mb-4';
         }
         return isMinimalTemplate ? 'mb-4' : 'mb-6';
       };
       
       return (
         <section className={getSectionMargin()}>
                    <h2 
             className={`font-bold pb-2 ${borderStyle} ${visualElements.iconAccents ? 'flex items-center gap-2' : ''} ${
               previewMode ? (isMinimalTemplate ? 'text-sm mb-1' : 'text-base mb-2') : 
               (isMinimalTemplate ? 'text-base mb-3' : 'text-lg mb-4')
             } ${titleAlignment}`}
           style={{ 
             borderColor: 'var(--template-section-border)',
             color: 'var(--template-primary)'
           }}
         >
           {visualElements.iconAccents && (
             <div 
               className="w-3 h-3 rounded-full"
               style={{ backgroundColor: 'var(--template-primary)' }}
             ></div>
           )}
           {title}
         </h2>
         <div className={sectionAlignment}>
           {children}
         </div>
       </section>
     );
   };

           const renderSummary = () => {
      if (!data.summary?.content) return null;
      
      // Enhanced alignment detection for all template types
      const isCenteredTemplate = stylePreset.id.includes('classic') || 
                                stylePreset.id.includes('traditional') ||
                                stylePreset.id.includes('academic') ||
                                stylePreset.id.includes('creative') ||
                                stylePreset.id.includes('portfolio') ||
                                visualElements.headerStyle === 'centered';
      
      const isMinimalTemplate = stylePreset.id.includes('minimalist') ||
                               stylePreset.id.includes('bare') ||
                               stylePreset.id.includes('simple') ||
                               stylePreset.id.includes('clean');
      
      const isTechnicalTemplate = stylePreset.id.includes('tech') ||
                                 stylePreset.id.includes('developer') ||
                                 stylePreset.id.includes('engineering') ||
                                 stylePreset.id.includes('data');
      
      const isExecutiveTemplate = stylePreset.id.includes('executive') ||
                                 stylePreset.id.includes('leadership') ||
                                 stylePreset.id.includes('corporate');
      
      const summaryAlignment = isCenteredTemplate ? 'text-center' : 
                              isMinimalTemplate ? 'text-left' :
                              isTechnicalTemplate ? 'text-left' :
                              isExecutiveTemplate ? 'text-left' : 'text-left';
     
     return renderSection(
       "PROFESSIONAL SUMMARY", 
       <p className={`text-gray-700 leading-relaxed avoid-break ${
         previewMode ? 'text-xs' : ''
       } ${summaryAlignment}`}>{data.summary.content}</p>,
       true
     );
   };

           const renderExperience = () => {
      if (!data.experience?.length) return null;
      
      // Enhanced alignment detection for all template types
      const isCenteredTemplate = stylePreset.id.includes('classic') || 
                                stylePreset.id.includes('traditional') ||
                                stylePreset.id.includes('academic') ||
                                stylePreset.id.includes('creative') ||
                                stylePreset.id.includes('portfolio') ||
                                visualElements.headerStyle === 'centered';
      
      const isMinimalTemplate = stylePreset.id.includes('minimalist') ||
                               stylePreset.id.includes('bare') ||
                               stylePreset.id.includes('simple') ||
                               stylePreset.id.includes('clean');
      
      const isTechnicalTemplate = stylePreset.id.includes('tech') ||
                                 stylePreset.id.includes('developer') ||
                                 stylePreset.id.includes('engineering') ||
                                 stylePreset.id.includes('data');
      
      const isExecutiveTemplate = stylePreset.id.includes('executive') ||
                                 stylePreset.id.includes('leadership') ||
                                 stylePreset.id.includes('corporate');
      
      const experienceAlignment = isCenteredTemplate ? 'text-center' : 
                                 isMinimalTemplate ? 'text-left' :
                                 isTechnicalTemplate ? 'text-left' :
                                 isExecutiveTemplate ? 'text-left' : 'text-left';
      
      const contentAlignment = isCenteredTemplate ? 'justify-center' : 
                              isMinimalTemplate ? 'justify-between' :
                              isTechnicalTemplate ? 'justify-between' :
                              isExecutiveTemplate ? 'justify-between' : 'justify-between';
     
     return renderSection(
       layout === 'professional' || layout === 'executive' ? "PROFESSIONAL EXPERIENCE" : "EXPERIENCE",
       <div className={spacingClass}>
         {data.experience.map((exp, index) => (
           <div key={index} className={`${
             previewMode ? (isMinimalTemplate ? 'space-y-1 avoid-break' : 'space-y-1 avoid-break') : 
             (isMinimalTemplate ? 'space-y-2 avoid-break' : 'space-y-2 avoid-break')
           } ${experienceAlignment}`}>
             <div className={`flex ${contentAlignment} items-start`}>
                                <div className={isCenteredTemplate ? 'text-center' : 'text-left'}>
                   <h3 className={`font-semibold text-gray-900 ${
                     previewMode ? (isMinimalTemplate ? 'text-xs' : 'text-sm') : 
                     (isMinimalTemplate ? 'text-sm' : '')
                   }`}>{exp.position}</h3>
                   <p className={`text-gray-600 ${
                     previewMode ? (isMinimalTemplate ? 'text-xs' : 'text-xs') : 
                     (isMinimalTemplate ? 'text-xs' : '')
                   }`}>{exp.company}</p>
                 </div>
               {!isCenteredTemplate && (
                 <span 
                   className={`font-medium px-3 py-1 rounded-full ${
                     previewMode ? (isMinimalTemplate ? 'text-xs' : 'text-xs') : 
                     (isMinimalTemplate ? 'text-xs' : 'text-sm')
                   }`}
                   style={{ 
                     backgroundColor: 'var(--template-accent)',
                     color: 'var(--template-secondary)'
                   }}
                 >
                   {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                 </span>
               )}
             </div>
             {isCenteredTemplate && (
               <div className="text-center mb-2">
                 <span 
                   className={`font-medium px-3 py-1 rounded-full ${
                     previewMode ? (isMinimalTemplate ? 'text-xs' : 'text-xs') : 
                     (isMinimalTemplate ? 'text-xs' : 'text-sm')
                   }`}
                   style={{ 
                     backgroundColor: 'var(--template-accent)',
                     color: 'var(--template-secondary)'
                   }}
                 >
                   {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                 </span>
               </div>
             )}
                           {exp.description && (
                <div className={`text-gray-700 leading-relaxed ${
                  previewMode ? (isMinimalTemplate ? 'text-xs' : 'text-xs') : 
                  (isMinimalTemplate ? 'text-xs' : 'text-sm')
                } ${isCenteredTemplate ? 'text-center' : 'text-left'}`}>
                  {/* Convert description to bullet points for ATS compatibility */}
                  {exp.description.split('. ').map((sentence, idx) => (
                    sentence.trim() && (
                      <div key={idx} className={`${isCenteredTemplate ? 'text-center' : 'text-left'} ${
                        isCenteredTemplate ? '' : 
                        isMinimalTemplate ? 'ml-2' :
                        isTechnicalTemplate ? 'ml-4' :
                        isExecutiveTemplate ? 'ml-3' : 'ml-4'
                      }`}>
                        {!isCenteredTemplate && '• '}{sentence.trim()}{sentence.endsWith('.') ? '' : '.'}
                      </div>
                    )
                  ))}
                </div>
              )}
           </div>
         ))}
       </div>,
       true
     );
   };

           const renderEducation = () => {
      if (!data.education?.length) return null;
      
      // Enhanced alignment detection for all template types
      const isCenteredTemplate = stylePreset.id.includes('classic') || 
                                stylePreset.id.includes('traditional') ||
                                stylePreset.id.includes('academic') ||
                                stylePreset.id.includes('creative') ||
                                stylePreset.id.includes('portfolio') ||
                                visualElements.headerStyle === 'centered';
      
      const isMinimalTemplate = stylePreset.id.includes('minimalist') ||
                               stylePreset.id.includes('bare') ||
                               stylePreset.id.includes('simple') ||
                               stylePreset.id.includes('clean');
      
      const isTechnicalTemplate = stylePreset.id.includes('tech') ||
                                 stylePreset.id.includes('developer') ||
                                 stylePreset.id.includes('engineering') ||
                                 stylePreset.id.includes('data');
      
      const isExecutiveTemplate = stylePreset.id.includes('executive') ||
                                 stylePreset.id.includes('leadership') ||
                                 stylePreset.id.includes('corporate');
      
      const educationAlignment = isCenteredTemplate ? 'text-center' : 
                                isMinimalTemplate ? 'text-left' :
                                isTechnicalTemplate ? 'text-left' :
                                isExecutiveTemplate ? 'text-left' : 'text-left';
      
      const contentAlignment = isCenteredTemplate ? 'justify-center' : 
                              isMinimalTemplate ? 'justify-between' :
                              isTechnicalTemplate ? 'justify-between' :
                              isExecutiveTemplate ? 'justify-between' : 'justify-between';
     
     return renderSection(
       "EDUCATION",
       <div className={spacingClass}>
         {data.education.map((edu, index) => (
           <div key={index} className={`space-y-1 avoid-break ${educationAlignment}`}>
             <div className={`flex ${contentAlignment} items-start`}>
               <div className={isCenteredTemplate ? 'text-center' : 'text-left'}>
                 <h3 className={`font-semibold text-gray-900 ${previewMode ? 'text-sm' : ''}`}>{edu.degree}</h3>
                 <p className={`text-gray-600 ${previewMode ? 'text-xs' : ''}`}>{edu.school}</p>
                 {edu.field && <p className={`text-gray-500 ${previewMode ? 'text-xs' : 'text-sm'}`}>{edu.field}</p>}
               </div>
               {!isCenteredTemplate && (
                 <span className={`text-gray-500 ${previewMode ? 'text-xs' : 'text-sm'}`}>
                   {formatDate(edu.endDate)}
                 </span>
               )}
             </div>
             {isCenteredTemplate && (
               <div className="text-center mb-2">
                 <span className={`text-gray-500 ${previewMode ? 'text-xs' : 'text-sm'}`}>
                   {formatDate(edu.endDate)}
                 </span>
               </div>
             )}
             {edu.gpa && (
               <p className={`text-gray-600 ${previewMode ? 'text-xs' : 'text-sm'} ${isCenteredTemplate ? 'text-center' : 'text-left'}`}>
                 GPA: {edu.gpa}
               </p>
             )}
           </div>
         ))}
       </div>,
       true
     );
   };

           const renderSkills = () => {
      if (!data.skills?.technical?.length && !data.skills?.soft?.length) return null;
      
      // Enhanced alignment detection for all template types
      const isCenteredTemplate = stylePreset.id.includes('classic') || 
                                stylePreset.id.includes('traditional') ||
                                stylePreset.id.includes('academic') ||
                                stylePreset.id.includes('creative') ||
                                stylePreset.id.includes('portfolio') ||
                                visualElements.headerStyle === 'centered';
      
      const isMinimalTemplate = stylePreset.id.includes('minimalist') ||
                               stylePreset.id.includes('bare') ||
                               stylePreset.id.includes('simple') ||
                               stylePreset.id.includes('clean');
      
      const isTechnicalTemplate = stylePreset.id.includes('tech') ||
                                 stylePreset.id.includes('developer') ||
                                 stylePreset.id.includes('engineering') ||
                                 stylePreset.id.includes('data');
      
      const isExecutiveTemplate = stylePreset.id.includes('executive') ||
                                 stylePreset.id.includes('leadership') ||
                                 stylePreset.id.includes('corporate');
      
      const skillsAlignment = isCenteredTemplate ? 'justify-center' : 
                             isMinimalTemplate ? 'justify-start' :
                             isTechnicalTemplate ? 'justify-start' :
                             isExecutiveTemplate ? 'justify-start' : 'justify-start';
      
      const skillsDisplay = layout === 'technical' || layout === 'developer' 
        ? `grid grid-cols-2 gap-2 ${isCenteredTemplate ? 'place-items-center' : ''}` 
        : `flex flex-wrap gap-2 ${skillsAlignment}`;
     
     const allSkills = [...(data.skills.technical || []), ...(data.skills.soft || [])];
     
     return renderSection(
       layout === 'technical' || layout === 'developer' ? "TECHNICAL SKILLS" : "SKILLS",
       <div className={skillsDisplay}>
         {allSkills.slice(0, previewMode ? 6 : allSkills.length).map((skill, index) => (
           <span
             key={index}
             className={`px-3 py-1 rounded-full border ${
               previewMode ? 'text-xs' : 'text-sm'
             } ${isCenteredTemplate ? 'text-center' : 
                isMinimalTemplate ? 'text-left' :
                isTechnicalTemplate ? 'text-center' :
                isExecutiveTemplate ? 'text-center' : 'text-left'}`}
             style={{
               backgroundColor: 'var(--template-accent)',
               borderColor: 'var(--template-primary)',
               color: 'var(--template-secondary)'
             }}
           >
             {skill}
           </span>
         ))}
       </div>,
       true
     );
   };

     const renderContent = () => {
     // Enhanced spacing detection for all template types
     const isMinimalTemplate = stylePreset.id.includes('minimalist') ||
                              stylePreset.id.includes('bare') ||
                              stylePreset.id.includes('simple') ||
                              stylePreset.id.includes('clean');
     
     const isTechnicalTemplate = stylePreset.id.includes('tech') ||
                                stylePreset.id.includes('developer') ||
                                stylePreset.id.includes('engineering') ||
                                stylePreset.id.includes('data');
     
     const isExecutiveTemplate = stylePreset.id.includes('executive') ||
                                stylePreset.id.includes('leadership') ||
                                stylePreset.id.includes('corporate');
     
     const isAcademicTemplate = stylePreset.id.includes('academic') ||
                               stylePreset.id.includes('graduate') ||
                               stylePreset.id.includes('student');
     
     // Template-specific spacing
     const getSpacing = () => {
       if (previewMode) {
         return isMinimalTemplate ? 'gap-2' : 'gap-4';
       }
       return isMinimalTemplate ? 'gap-6' : 'gap-8';
     };
     
     const getSectionSpacing = () => {
       if (previewMode) {
         return isMinimalTemplate ? 'space-y-2' : 'space-y-4';
       }
       return isMinimalTemplate ? 'space-y-4' : 'space-y-6';
     };
     
     switch (layout) {
       case 'portfolio':
       case 'creative':
         return (
           <div className={`grid grid-cols-1 ${getSpacing()}`}>
             <div className={`${getSectionSpacing()}`}>
               {renderSummary()}
               {renderExperience()}
             </div>
             <div className={getSectionSpacing()}>
               {renderEducation()}
               {renderSkills()}
             </div>
           </div>
         );
      
             case 'technical':
       case 'developer':
         return (
           <div className={getSectionSpacing()}>
             {renderSkills()}
             {renderSummary()}
             {renderExperience()}
             {renderEducation()}
           </div>
         );

       case 'sidebar':
         return (
           <div className={`grid grid-cols-1 ${getSpacing()}`}>
             <div className={`${getSectionSpacing()}`}>
               {renderSkills()}
               {renderEducation()}
             </div>
             <div className={`${getSectionSpacing()}`}>
               {renderSummary()}
               {renderExperience()}
             </div>
           </div>
         );

       case 'traditional':
       case 'executive':
         return (
           <div className={getSectionSpacing()}>
             {renderSummary()}
             <div className={`grid grid-cols-1 ${getSpacing()}`}>
               <div className={getSectionSpacing()}>
                 {renderExperience()}
               </div>
               <div className={getSectionSpacing()}>
                 {renderEducation()}
                 {renderSkills()}
               </div>
             </div>
           </div>
         );

       case 'academic':
         return (
           <div className={getSectionSpacing()}>
             {renderSummary()}
             {renderEducation()}
             {renderExperience()}
             {renderSkills()}
           </div>
         );
       
       default: // professional
         return (
           <div className={getSectionSpacing()}>
             {renderSummary()}
             {renderExperience()}
             {renderEducation()}
             {renderSkills()}
           </div>
         );
    }
  };

  return (
    <div 
      className={`bg-white mx-auto ${typographyClass}`}
      style={{
        ...layoutStyle,
        maxWidth: previewMode ? '100%' : '210mm', // A4 width constraint for full mode, flexible for preview
        width: '100%',
      }}
    >
      {renderHeader()}
             <main className={`${
         previewMode ? 'p-2' :
         spacing === 'compact' ? 'p-6' : spacing === 'spacious' ? 'p-12' : 'p-8'
       }`}>
        {renderContent()}
      </main>
    </div>
  );
};
