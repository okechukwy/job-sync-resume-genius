import { PageHeader } from "@/components/common/PageHeader";
import { TemplateSelector } from "@/components/template-selection/TemplateSelector";

const Templates = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <PageHeader />
      <TemplateSelector />
    </div>
  );
};

export default Templates;