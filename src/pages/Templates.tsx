import { PageHeader } from "@/components/common/PageHeader";
import { UnifiedTemplateHub } from "@/components/template-selection/UnifiedTemplateHub";

const Templates = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <PageHeader />
      <UnifiedTemplateHub mode="standalone" />
    </div>
  );
};

export default Templates;