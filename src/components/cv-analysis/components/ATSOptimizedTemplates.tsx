import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Eye, Check, Zap, Target } from "lucide-react";
import { useState } from "react";
import { EnhancedCVResult } from "@/services/cvEnhancement";

interface ATSTemplate {
  id: string;
  name: string;
  description: string;
  industry: string[];
  atsScore: number;
  features: string[];
  preview?: string;
}

interface ATSOptimizedTemplatesProps {
  enhancedResult: EnhancedCVResult;
  originalContent: string;
  uploadedFile: File;
  targetIndustry?: string;
}

const ATSOptimizedTemplates = ({
  enhancedResult,
  originalContent,
  uploadedFile,
  targetIndustry = 'Business'
}: ATSOptimizedTemplatesProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('professional-ats');
  const [exportFormat, setExportFormat] = useState<'pdf' | 'docx' | 'txt'>('pdf');
  const [isExporting, setIsExporting] = useState(false);

  const atsTemplates: ATSTemplate[] = [
    {
      id: 'professional-ats',
      name: 'Professional ATS-Optimized',
      description: 'Clean, ATS-friendly format with optimal keyword placement',
      industry: ['Business', 'Finance', 'Technology', 'Healthcare'],
      atsScore: 95,
      features: [
        'Single-column layout',
        'Standard section headers',
        'Clean typography',
        'Keyword optimization zones',
        'Contact info compatibility'
      ]
    },
    {
      id: 'tech-focused-ats',
      name: 'Technology ATS Template',
      description: 'Specifically designed for tech roles with skill emphasis',
      industry: ['Technology', 'Engineering'],
      atsScore: 98,
      features: [
        'Technical skills prominence',
        'Project showcase sections',
        'GitHub/portfolio integration',
        'Programming language tags',
        'Open source contributions'
      ]
    },
    {
      id: 'executive-ats',
      name: 'Executive ATS Format',
      description: 'Senior-level template with leadership focus',
      industry: ['Business', 'Finance', 'Healthcare'],
      atsScore: 92,
      features: [
        'Leadership achievements',
        'Strategic impact metrics',
        'Board/advisory roles',
        'Company growth highlights',
        'Industry recognition'
      ]
    },
    {
      id: 'creative-ats',
      name: 'Creative ATS-Compatible',
      description: 'Balanced creativity with ATS compatibility',
      industry: ['Creative', 'Marketing', 'Design'],
      atsScore: 88,
      features: [
        'Portfolio integration',
        'Creative project highlights',
        'Brand consistency',
        'Visual hierarchy',
        'Campaign metrics'
      ]
    },
    {
      id: 'healthcare-ats',
      name: 'Healthcare ATS Template',
      description: 'Medical and healthcare industry optimized',
      industry: ['Healthcare', 'Research'],
      atsScore: 94,
      features: [
        'Certification prominence',
        'Clinical experience focus',
        'Research publications',
        'Compliance indicators',
        'Patient care metrics'
      ]
    }
  ];

  const getRecommendedTemplates = () => {
    return atsTemplates
      .filter(template => template.industry.includes(targetIndustry))
      .sort((a, b) => b.atsScore - a.atsScore);
  };

  const handleTemplatePreview = (templateId: string) => {
    // In a real implementation, this would show a preview modal
    console.log('Preview template:', templateId);
  };

  const handleExport = async (templateId: string, format: string) => {
    setIsExporting(true);
    
    try {
      // In a real implementation, this would:
      // 1. Apply the selected template to the optimized content
      // 2. Generate the file in the specified format
      // 3. Trigger download
      
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing
      
      // Mock download
      const blob = new Blob([enhancedResult.resumeContent], { 
        type: format === 'pdf' ? 'application/pdf' : 
             format === 'docx' ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' :
             'text/plain'
      });
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${uploadedFile.name.replace(/\.[^/.]+$/, '')}_ats_optimized.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const selectedTemplateData = atsTemplates.find(t => t.id === selectedTemplate);

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          ATS-Optimized Export Templates
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Choose from industry-specific templates designed for maximum ATS compatibility
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Template Selection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Recommended for {targetIndustry}</h3>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Target className="w-3 h-3 mr-1" />
              Industry Match
            </Badge>
          </div>
          
          <div className="grid gap-3">
            {getRecommendedTemplates().map(template => (
              <div 
                key={template.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedTemplate === template.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{template.name}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {template.atsScore}% ATS Score
                      </Badge>
                      {selectedTemplate === template.id && (
                        <Badge variant="default" className="text-xs bg-primary">
                          <Check className="w-3 h-3 mr-1" />
                          Selected
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {template.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {template.features.slice(0, 3).map(feature => (
                        <Badge key={feature} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {template.features.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{template.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTemplatePreview(template.id);
                    }}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Templates */}
        <div className="space-y-4">
          <h3 className="font-semibold">Other ATS Templates</h3>
          <div className="grid gap-2">
            {atsTemplates
              .filter(template => !template.industry.includes(targetIndustry))
              .map(template => (
                <div 
                  key={template.id}
                  className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                    selectedTemplate === template.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{template.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {template.atsScore}% ATS
                        </Badge>
                        {selectedTemplate === template.id && (
                          <Badge variant="default" className="text-xs bg-primary">
                            <Check className="w-3 h-3 mr-1" />
                            Selected
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {template.description}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTemplatePreview(template.id);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Selected Template Details */}
        {selectedTemplateData && (
          <div className="border rounded-lg p-4 bg-muted/30">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              {selectedTemplateData.name} Features
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {selectedTemplateData.features.map(feature => (
                <div key={feature} className="flex items-center gap-2 text-sm">
                  <Check className="w-3 h-3 text-green-500" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Export Options */}
        <div className="space-y-4 border-t pt-4">
          <h3 className="font-semibold">Export Options</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Format</label>
              <Select value={exportFormat} onValueChange={(value: any) => setExportFormat(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF (Recommended)</SelectItem>
                  <SelectItem value="docx">Word Document (.docx)</SelectItem>
                  <SelectItem value="txt">Plain Text (.txt)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="gradient"
              size="lg"
              onClick={() => handleExport(selectedTemplate, exportFormat)}
              disabled={isExporting}
              className="flex-1"
            >
              {isExporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating ATS-Optimized {exportFormat.toUpperCase()}...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Download ATS-Optimized {exportFormat.toUpperCase()}
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleTemplatePreview(selectedTemplate)}
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </div>
        </div>

        {/* Export Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-2">What's Included in Your Export:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• ATS-optimized formatting and structure</li>
            <li>• All applied keyword optimizations</li>
            <li>• Enhanced action verbs and professional language</li>
            <li>• Quantified achievements and metrics</li>
            <li>• Industry-specific template styling</li>
            <li>• Compatible with major ATS systems (Workday, Taleo, etc.)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ATSOptimizedTemplates;
