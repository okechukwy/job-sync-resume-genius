import { 
  TemplateHeader, 
  TemplateFeatures, 
  ResumePreviewCard, 
  TemplateActions 
} from "@/components/template-preview";
import { businessProfessionalSample, templateStyles } from "@/data/sampleResumeData";
import { formatDate } from "@/lib/utils";

const BusinessProfessional = () => {
  const templateData = {
    emoji: "📊",
    title: "Business Professional",
    description: "Management, sales, and operations professionals. Perfect for showcasing leadership and business results.",
    badgeText: "Business Professional Template",
    tags: ["Professional", "Leadership", "Results-Driven"],
    features: [
      {
        title: "Leadership Impact",
        description: "Showcase team management and strategic results"
      },
      {
        title: "Financial Results", 
        description: "Highlight revenue growth and cost savings"
      },
      {
        title: "Professional Development",
        description: "Display certifications and continuous learning"
      }
    ],
    roles: [
      { name: "Business Managers" },
      { name: "Operations Directors" },
      { name: "Sales Leaders" },
      { name: "Project Managers" }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-business relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <TemplateHeader
          emoji={templateData.emoji}
          title={templateData.title}
          description={templateData.description}
          tags={templateData.tags}
          badgeText={templateData.badgeText}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <ResumePreviewCard
            data={businessProfessionalSample}
            styles={templateStyles.business}
            layoutVariant="classic-professional"
            formatDate={formatDate}
            backgroundClass="bg-business-background"
            shadowClass="business-shadows"
          />

          <TemplateFeatures
            features={templateData.features}
            roles={templateData.roles}
            themeClass="bg-business"
          />
        </div>

        <TemplateActions />
      </div>
    </div>
  );
};

export default BusinessProfessional;