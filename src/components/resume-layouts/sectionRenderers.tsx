import { ResumeData } from "@/hooks/useResumeSteps";
import { TemplateStyles } from "./types";
import { Progress } from "@/components/ui/progress";
import { 
  Mail, Phone, MapPin, Globe, Linkedin, Github, 
  Calendar, MapPinIcon, Building, GraduationCap, 
  Code, Lightbulb, Award, TrendingUp, Star,
  CheckCircle, Target, Users, Zap, User, FileText,
  Shield, ExternalLink, Languages, Heart,
  Trophy, BookOpen, Coffee, Plus
} from "lucide-react";

export const createSectionRenderers = (data: ResumeData, styles: TemplateStyles, formatDate: (dateString: string) => string) => {
  const renderSummarySection = () => (
    data.summary.content && (
      <div className="space-y-6 animate-fade-in">
        <h2 className={`resume-section-title ${styles.sectionBorder} hover-lift flex items-center gap-2`}>
          <FileText className="w-5 h-5" />
          PROFESSIONAL SUMMARY
        </h2>
        <div className="bg-contrast-medium rounded-lg p-6 hover-scale border-l-4 border-primary">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-1">
              <User className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="resume-content-text text-contrast-high leading-relaxed">
                {data.summary.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
  const renderExperienceSection = () => (
    data.experience.length > 0 && (
      <div className="space-y-6 animate-fade-in">
        <h2 className={`resume-section-title ${styles.sectionBorder} hover-lift flex items-center gap-2`}>
          <Building className="w-5 h-5" />
          EXPERIENCE
        </h2>
        <div className="relative">
          {/* Visual Timeline */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent"></div>
          
          {data.experience.map((exp, index) => (
            <div key={exp.id} className="relative space-y-4 hover-lift bg-contrast-medium rounded-lg p-6 ml-8" style={{ animationDelay: `${index * 0.1}s` }}>
              {/* Timeline Node */}
              <div className="absolute -left-9 top-8 w-4 h-4 bg-primary rounded-full border-2 border-background shadow-lg hover-scale">
                <div className="w-2 h-2 bg-background rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="typography-heading text-lg font-semibold text-contrast-high flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    {exp.position}
                  </h3>
                  <p className="typography-body text-contrast-medium font-medium flex items-center gap-2 mt-1">
                    <Building className="w-4 h-4" />
                    {exp.company}
                  </p>
                </div>
                <div className={`text-right ${styles.accentColor} resume-meta-text flex items-center gap-2`}>
                  <Calendar className="w-4 h-4" />
                  <p>{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
                </div>
              </div>
              
              {/* Achievement Infographic */}
              <div className="grid grid-cols-3 gap-4 my-4">
                <div className="bg-primary/10 rounded-lg p-3 text-center hover-scale">
                  <TrendingUp className="w-5 h-5 text-primary mx-auto mb-1" />
                  <div className="text-xs text-contrast-medium font-medium">Growth</div>
                </div>
                <div className="bg-accent/10 rounded-lg p-3 text-center hover-scale">
                  <Award className="w-5 h-5 text-accent mx-auto mb-1" />
                  <div className="text-xs text-contrast-medium font-medium">Excellence</div>
                </div>
                <div className="bg-primary/10 rounded-lg p-3 text-center hover-scale">
                  <Users className="w-5 h-5 text-primary mx-auto mb-1" />
                  <div className="text-xs text-contrast-medium font-medium">Leadership</div>
                </div>
              </div>
              
              <div className="resume-content-text whitespace-pre-line">
                {exp.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );

  const renderEducationSection = () => (
    data.education.length > 0 && (
      <div className="space-y-6 animate-fade-in">
        <h2 className={`resume-section-title ${styles.sectionBorder} hover-lift flex items-center gap-2`}>
          <GraduationCap className="w-5 h-5" />
          EDUCATION
        </h2>
        {data.education.map((edu, index) => (
          <div key={edu.id} className="bg-contrast-medium rounded-lg p-6 hover-scale border-l-4 border-primary" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="typography-heading font-semibold text-contrast-high flex items-center gap-2">
                  <Star className="w-4 h-4 text-primary" />
                  {edu.degree} in {edu.field}
                </h3>
                <p className="typography-body text-contrast-medium flex items-center gap-2 mt-1">
                  <Building className="w-4 h-4" />
                  {edu.school}
                </p>
                {edu.gpa && (
                  <div className="flex items-center gap-2 mt-2">
                    <Target className="w-4 h-4 text-accent" />
                    <p className="resume-meta-text">GPA: {edu.gpa}</p>
                  </div>
                )}
              </div>
              <div className={`text-right ${styles.accentColor} resume-meta-text flex items-center gap-2`}>
                <Calendar className="w-4 h-4" />
                <p>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
              </div>
            </div>
            
            {/* Achievement Badge */}
            <div className="mt-4 inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              <Award className="w-4 h-4" />
              Academic Excellence
            </div>
          </div>
        ))}
      </div>
    )
  );

  const renderSkillsSection = () => {
    // Generate random skill levels for demonstration
    const getSkillLevel = (index: number) => {
      const levels = [95, 90, 85, 80, 88, 92, 78, 85, 90, 87];
      return levels[index % levels.length];
    };

    return (
      (data.skills.technical.length > 0 || data.skills.soft.length > 0) && (
        <div className="space-y-6 animate-fade-in">
          <h2 className={`resume-section-title ${styles.sectionBorder} hover-lift flex items-center gap-2`}>
            <Code className="w-5 h-5" />
            SKILLS & EXPERTISE
          </h2>
          
          {data.skills.technical.length > 0 && (
            <div className="bg-contrast-medium rounded-lg p-6 hover-scale border-l-4 border-primary">
              <h3 className="typography-heading font-semibold text-contrast-high mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Technical Skills
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {data.skills.technical.map((skill, index) => (
                  <div key={index} className="flex items-center gap-3 hover-lift group">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Code className="w-4 h-4 text-primary" />
                    </div>
                    <span className={`${styles.accentColor} typography-body font-medium`}>
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {data.skills.soft.length > 0 && (
            <div className="bg-contrast-medium rounded-lg p-6 hover-scale border-l-4 border-accent">
              <h3 className="typography-heading font-semibold text-contrast-high mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-accent" />
                Core Competencies
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {data.skills.soft.map((skill, index) => (
                  <div key={index} className="flex items-center gap-3 hover-lift group">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <Star className="w-4 h-4 text-accent" />
                    </div>
                    <span className={`${styles.accentColor} typography-body font-medium`}>
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )
    );
  };

  const renderCertificatesSection = () => (
    data.certificates && data.certificates.length > 0 && (
      <div className="space-y-6 animate-fade-in">
        <h2 className={`resume-section-title ${styles.sectionBorder} hover-lift flex items-center gap-2`}>
          <Shield className="w-5 h-5" />
          CERTIFICATIONS
        </h2>
        {data.certificates.map((cert, index) => (
          <div key={cert.id || index} className="bg-contrast-medium rounded-lg p-6 hover-scale border-l-4 border-primary" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="typography-heading font-semibold text-contrast-high flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary" />
                  {cert.name}
                </h3>
                <p className="typography-body text-contrast-medium flex items-center gap-2 mt-1">
                  <Building className="w-4 h-4" />
                  {cert.issuer}
                </p>
                {cert.credentialId && (
                  <div className="flex items-center gap-2 mt-2">
                    <Shield className="w-4 h-4 text-accent" />
                    <p className="resume-meta-text">ID: {cert.credentialId}</p>
                  </div>
                )}
                {cert.credentialUrl && (
                  <div className="flex items-center gap-2 mt-1">
                    <ExternalLink className="w-4 h-4 text-primary" />
                    <p className="resume-meta-text text-primary">View Certificate</p>
                  </div>
                )}
              </div>
              <div className={`text-right ${styles.accentColor} resume-meta-text flex items-center gap-2`}>
                <Calendar className="w-4 h-4" />
                <p>{formatDate(cert.issueDate)} {cert.expiryDate && `- ${formatDate(cert.expiryDate)}`}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  );

  const renderProjectsSection = () => (
    data.projects && data.projects.length > 0 && (
      <div className="space-y-6 animate-fade-in">
        <h2 className={`resume-section-title ${styles.sectionBorder} hover-lift flex items-center gap-2`}>
          <Code className="w-5 h-5" />
          PROJECTS
        </h2>
        {data.projects.map((project, index) => (
          <div key={project.id || index} className="bg-contrast-medium rounded-lg p-6 hover-scale border-l-4 border-accent" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="typography-heading font-semibold text-contrast-high flex items-center gap-2">
                  <Star className="w-4 h-4 text-accent" />
                  {project.name}
                </h3>
                {project.description && (
                  <p className="typography-body text-contrast-medium mt-2">{project.description}</p>
                )}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {project.projectUrl && (
                  <div className="flex items-center gap-2 mt-2">
                    <ExternalLink className="w-4 h-4 text-primary" />
                    <p className="resume-meta-text text-primary">View Project</p>
                  </div>
                )}
              </div>
              <div className={`text-right ${styles.accentColor} resume-meta-text flex items-center gap-2`}>
                <Calendar className="w-4 h-4" />
                <p>{formatDate(project.startDate)} - {project.endDate ? formatDate(project.endDate) : 'Present'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  );

  const renderLanguagesSection = () => (
    data.languages && data.languages.length > 0 && (
      <div className="space-y-6 animate-fade-in">
        <h2 className={`resume-section-title ${styles.sectionBorder} hover-lift flex items-center gap-2`}>
          <Languages className="w-5 h-5" />
          LANGUAGES
        </h2>
        <div className="bg-contrast-medium rounded-lg p-6 hover-scale border-l-4 border-primary">
          <div className="grid grid-cols-2 gap-4">
            {data.languages.map((language, index) => (
              <div key={language.id || index} className="flex items-center justify-between hover-lift group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Globe className="w-4 h-4 text-primary" />
                  </div>
                  <span className="typography-body font-medium text-contrast-high">
                    {language.language}
                  </span>
                </div>
                <span className={`${styles.accentColor} text-sm font-medium px-2 py-1 rounded-full bg-primary/10`}>
                  {language.proficiency}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );

  const renderVolunteeringSection = () => (
    data.volunteering && data.volunteering.length > 0 && (
      <div className="space-y-6 animate-fade-in">
        <h2 className={`resume-section-title ${styles.sectionBorder} hover-lift flex items-center gap-2`}>
          <Heart className="w-5 h-5" />
          VOLUNTEERING
        </h2>
        {data.volunteering.map((vol, index) => (
          <div key={vol.id || index} className="bg-contrast-medium rounded-lg p-6 hover-scale border-l-4 border-accent" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="typography-heading font-semibold text-contrast-high flex items-center gap-2">
                  <Heart className="w-4 h-4 text-accent" />
                  {vol.role}
                </h3>
                <p className="typography-body text-contrast-medium flex items-center gap-2 mt-1">
                  <Building className="w-4 h-4" />
                  {vol.organization}
                </p>
                {vol.description && (
                  <p className="typography-body text-contrast-medium mt-2">{vol.description}</p>
                )}
              </div>
              <div className={`text-right ${styles.accentColor} resume-meta-text flex items-center gap-2`}>
                <Calendar className="w-4 h-4" />
                <p>{formatDate(vol.startDate)} - {vol.current ? 'Present' : formatDate(vol.endDate)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  );

  const renderAwardsSection = () => (
    data.awards && data.awards.length > 0 && (
      <div className="space-y-6 animate-fade-in">
        <h2 className={`resume-section-title ${styles.sectionBorder} hover-lift flex items-center gap-2`}>
          <Trophy className="w-5 h-5" />
          AWARDS & ACHIEVEMENTS
        </h2>
        {data.awards.map((award, index) => (
          <div key={award.id || index} className="bg-contrast-medium rounded-lg p-6 hover-scale border-l-4 border-primary" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="typography-heading font-semibold text-contrast-high flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-primary" />
                  {award.title}
                </h3>
                <p className="typography-body text-contrast-medium flex items-center gap-2 mt-1">
                  <Building className="w-4 h-4" />
                  {award.issuer}
                </p>
                {award.description && (
                  <p className="typography-body text-contrast-medium mt-2">{award.description}</p>
                )}
              </div>
              <div className={`text-right ${styles.accentColor} resume-meta-text flex items-center gap-2`}>
                <Calendar className="w-4 h-4" />
                <p>{formatDate(award.date)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  );

  const renderPublicationsSection = () => (
    data.publications && data.publications.length > 0 && (
      <div className="space-y-6 animate-fade-in">
        <h2 className={`resume-section-title ${styles.sectionBorder} hover-lift flex items-center gap-2`}>
          <BookOpen className="w-5 h-5" />
          PUBLICATIONS
        </h2>
        {data.publications.map((pub, index) => (
          <div key={pub.id || index} className="bg-contrast-medium rounded-lg p-6 hover-scale border-l-4 border-accent" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="typography-heading font-semibold text-contrast-high flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-accent" />
                  {pub.title}
                </h3>
                <p className="typography-body text-contrast-medium flex items-center gap-2 mt-1">
                  <Building className="w-4 h-4" />
                  {pub.publisher}
                </p>
                {pub.description && (
                  <p className="typography-body text-contrast-medium mt-2">{pub.description}</p>
                )}
                {pub.url && (
                  <div className="flex items-center gap-2 mt-2">
                    <ExternalLink className="w-4 h-4 text-primary" />
                    <p className="resume-meta-text text-primary">View Publication</p>
                  </div>
                )}
              </div>
              <div className={`text-right ${styles.accentColor} resume-meta-text flex items-center gap-2`}>
                <Calendar className="w-4 h-4" />
                <p>{formatDate(pub.date)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  );

  const renderInterestsSection = () => (
    data.interests && data.interests.interests && data.interests.interests.length > 0 && (
      <div className="space-y-6 animate-fade-in">
        <h2 className={`resume-section-title ${styles.sectionBorder} hover-lift flex items-center gap-2`}>
          <Coffee className="w-5 h-5" />
          INTERESTS & HOBBIES
        </h2>
        <div className="bg-contrast-medium rounded-lg p-6 hover-scale border-l-4 border-accent">
          <div className="flex flex-wrap gap-3">
            {data.interests.interests.map((interest, index) => (
              <div key={index} className="flex items-center gap-2 bg-accent/10 text-accent px-3 py-2 rounded-full hover-scale">
                <Coffee className="w-4 h-4" />
                <span className="typography-body font-medium">{interest}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );

  const renderAdditionalInfoSection = () => (
    data.additionalInfo && data.additionalInfo.content && (
      <div className="space-y-6 animate-fade-in">
        <h2 className={`resume-section-title ${styles.sectionBorder} hover-lift flex items-center gap-2`}>
          <Plus className="w-5 h-5" />
          ADDITIONAL INFORMATION
        </h2>
        <div className="bg-contrast-medium rounded-lg p-6 hover-scale border-l-4 border-primary">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-1">
              <Plus className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="resume-content-text text-contrast-high leading-relaxed">
                {data.additionalInfo.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );

  return { 
    renderSummarySection, 
    renderExperienceSection, 
    renderEducationSection, 
    renderSkillsSection,
    renderCertificatesSection,
    renderProjectsSection,
    renderLanguagesSection,
    renderVolunteeringSection,
    renderAwardsSection,
    renderPublicationsSection,
    renderInterestsSection,
    renderAdditionalInfoSection
  };
};