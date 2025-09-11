import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Edit3, Eye, Save, X, FileText, MapPin, Mail, Phone, Linkedin } from "lucide-react";
import { EnhancedStructuredResume, parseResumeContent, convertStructuredToText } from "@/utils/enhancedResumeParser";

interface AppliedSuggestion {
  id: string;
  originalText: string;
  newText: string;
  section: string;
  timestamp: number;
}

interface JobscanStyleResumeViewerProps {
  content: string;
  originalContent: string;
  onChange: (content: string) => void;
  appliedSuggestions: AppliedSuggestion[];
}

export const JobscanStyleResumeViewer = ({
  content,
  originalContent,
  onChange,
  appliedSuggestions
}: JobscanStyleResumeViewerProps) => {
  const [structuredResume, setStructuredResume] = useState<EnhancedStructuredResume | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    console.log('📄 JobscanStyleResumeViewer: Content updated, length:', content.length);
    if (content) {
      const parsed = parseResumeContent(content);
      setStructuredResume(parsed);
      console.log('✨ Resume parsed successfully:', parsed.header.name);
    }
  }, [content]);

  useEffect(() => {
    console.log('🎨 Applied suggestions updated in viewer:', appliedSuggestions.length);
  }, [appliedSuggestions]);

  const handleEditClick = () => {
    setEditContent(content);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    onChange(editContent);
    setIsEditDialogOpen(false);
  };

  const highlightChanges = (text: string): string => {
    if (!appliedSuggestions.length) return text;

    let highlightedText = text;
    appliedSuggestions.forEach(suggestion => {
      if (highlightedText.includes(suggestion.newText)) {
        highlightedText = highlightedText.replace(
          suggestion.newText,
          `<mark class="bg-success/20 text-success-foreground">${suggestion.newText}</mark>`
        );
      }
    });

    return highlightedText;
  };

  const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
  const charCount = content.length;

  if (!structuredResume) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center p-8">
          <div className="text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Loading resume content...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <CardTitle className="text-lg">Professional ATS Resume</CardTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{wordCount} words</span>
                <span>{charCount} characters</span>
                {appliedSuggestions.length > 0 && (
                  <Badge variant="secondary" className="text-xs bg-success/10 text-success-foreground">
                    {appliedSuggestions.length} optimizations applied
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleEditClick}
                className="flex items-center gap-2"
              >
                <Edit3 className="h-4 w-4" />
                Edit
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-0">
          <ScrollArea className="h-full px-6 pb-6">
            <div className="space-y-6 max-w-4xl mx-auto bg-white p-8 shadow-sm border rounded-lg">
              {/* Header Section */}
              <div className="text-center border-b pb-6">
                <h1 
                  className="text-3xl font-bold text-foreground mb-2"
                  dangerouslySetInnerHTML={{ __html: highlightChanges(structuredResume.header.name) }}
                />
                {structuredResume.header.title && (
                  <h2 
                    className="text-xl text-muted-foreground mb-4"
                    dangerouslySetInnerHTML={{ __html: highlightChanges(structuredResume.header.title) }}
                  />
                )}
                
                <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                  {structuredResume.header.email && (
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      <span dangerouslySetInnerHTML={{ __html: highlightChanges(structuredResume.header.email) }} />
                    </div>
                  )}
                  {structuredResume.header.phone && (
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      <span dangerouslySetInnerHTML={{ __html: highlightChanges(structuredResume.header.phone) }} />
                    </div>
                  )}
                  {structuredResume.header.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span dangerouslySetInnerHTML={{ __html: highlightChanges(structuredResume.header.location) }} />
                    </div>
                  )}
                  {structuredResume.header.linkedin && (
                    <div className="flex items-center gap-1">
                      <Linkedin className="h-4 w-4" />
                      <span dangerouslySetInnerHTML={{ __html: highlightChanges(structuredResume.header.linkedin) }} />
                    </div>
                  )}
                </div>
              </div>

              {/* Summary Section */}
              {structuredResume.sections.summary && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 uppercase tracking-wide">
                    Professional Summary
                  </h3>
                  <p 
                    className="text-muted-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: highlightChanges(structuredResume.sections.summary) }}
                  />
                </div>
              )}

              {/* Experience Section */}
              {structuredResume.sections.experience.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 uppercase tracking-wide">
                    Work Experience
                  </h3>
                  <div className="space-y-6">
                    {structuredResume.sections.experience.map((exp, index) => (
                      <div key={exp.id || index} className="border-l-2 border-primary/20 pl-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 
                              className="text-lg font-semibold text-foreground"
                              dangerouslySetInnerHTML={{ __html: highlightChanges(exp.title) }}
                            />
                            <p 
                              className="text-primary font-medium"
                              dangerouslySetInnerHTML={{ __html: highlightChanges(exp.company) }}
                            />
                            {exp.location && (
                              <p 
                                className="text-sm text-muted-foreground"
                                dangerouslySetInnerHTML={{ __html: highlightChanges(exp.location) }}
                              />
                            )}
                          </div>
                          {exp.dates && (
                            <Badge 
                              variant="outline" 
                              className="text-xs"
                              dangerouslySetInnerHTML={{ __html: highlightChanges(exp.dates) }}
                            />
                          )}
                        </div>
                        {exp.responsibilities.length > 0 && (
                          <ul className="space-y-1 mt-3">
                            {exp.responsibilities.map((resp, respIndex) => (
                              <li 
                                key={respIndex} 
                                className="text-muted-foreground text-sm leading-relaxed flex items-start gap-2"
                              >
                                <span className="text-primary mt-1.5 text-xs">•</span>
                                <span dangerouslySetInnerHTML={{ __html: highlightChanges(resp) }} />
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education Section */}
              {structuredResume.sections.education.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 uppercase tracking-wide">
                    Education
                  </h3>
                  <div className="space-y-4">
                    {structuredResume.sections.education.map((edu, index) => (
                      <div key={edu.id || index} className="border-l-2 border-primary/20 pl-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 
                              className="font-semibold text-foreground"
                              dangerouslySetInnerHTML={{ __html: highlightChanges(edu.degree) }}
                            />
                            <p 
                              className="text-primary"
                              dangerouslySetInnerHTML={{ __html: highlightChanges(edu.institution) }}
                            />
                            {edu.location && (
                              <p 
                                className="text-sm text-muted-foreground"
                                dangerouslySetInnerHTML={{ __html: highlightChanges(edu.location) }}
                              />
                            )}
                          </div>
                          {edu.dates && (
                            <Badge 
                              variant="outline" 
                              className="text-xs"
                              dangerouslySetInnerHTML={{ __html: highlightChanges(edu.dates) }}
                            />
                          )}
                        </div>
                        {edu.details.length > 0 && (
                          <div className="mt-2 text-sm text-muted-foreground">
                            {edu.details.map((detail, detailIndex) => (
                              <p 
                                key={detailIndex}
                                dangerouslySetInnerHTML={{ __html: highlightChanges(detail) }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills Section */}
              {structuredResume.sections.skills.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 uppercase tracking-wide">
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {structuredResume.sections.skills.map((skill, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="text-sm"
                        dangerouslySetInnerHTML={{ __html: highlightChanges(skill) }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Other Sections */}
              {structuredResume.sections.other.map((section, index) => (
                <div key={section.id || index}>
                  <h3 className="text-lg font-semibold text-foreground mb-3 uppercase tracking-wide">
                    {section.title}
                  </h3>
                  <div className="space-y-2">
                    {section.content.map((item, itemIndex) => (
                      <p 
                        key={itemIndex} 
                        className="text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: highlightChanges(item) }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>Edit Resume Content</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col h-full gap-4">
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="flex-1 font-mono text-sm resize-none"
              placeholder="Edit your resume content here..."
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSaveEdit}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
