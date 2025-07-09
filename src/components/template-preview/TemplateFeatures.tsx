import { Card, CardContent } from "@/components/ui/card";

interface Feature {
  title: string;
  description: string;
}

interface TemplateRole {
  name: string;
}

interface TemplateFeaturesProps {
  features: Feature[];
  roles: TemplateRole[];
  themeClass: string;
}

export const TemplateFeatures = ({ features, roles, themeClass }: TemplateFeaturesProps) => {
  return (
    <div className="space-y-6">
      <Card className="glass-card hover-lift animate-fade-in">
        <CardContent className="p-6 space-y-4">
          <h3 className="typography-heading">Template Features</h3>
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className={`w-2 h-2 ${themeClass}-primary rounded-full mt-2`}></div>
              <div>
                <h4 className="font-medium">{feature.title}</h4>
                <p className="text-sm text-contrast-medium">{feature.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="glass-card hover-lift animate-fade-in">
        <CardContent className="p-6 space-y-4">
          <h3 className="typography-heading">Perfect For</h3>
          <ul className="space-y-2 text-sm">
            {roles.map((role, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 ${themeClass}-accent rounded-full`}></div>
                {role.name}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};