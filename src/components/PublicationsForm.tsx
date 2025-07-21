
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

interface PublicationEntry {
  id: string;
  title: string;
  publisher: string;
  date: string;
  url?: string;
  description?: string;
}

interface PublicationsFormProps {
  data: PublicationEntry[];
  onUpdate: (data: PublicationEntry[]) => void;
  onValidationChange?: (isValid: boolean) => void;
}

const PublicationsForm = ({ data, onUpdate, onValidationChange }: PublicationsFormProps) => {
  const [publications, setPublications] = useState<PublicationEntry[]>(data);

  // Always mark as valid since this is an optional section
  useEffect(() => {
    onValidationChange?.(true);
  }, [onValidationChange]);

  useEffect(() => {
    onUpdate(publications);
  }, [publications, onUpdate]);

  const addPublication = () => {
    const newPublication: PublicationEntry = {
      id: Date.now().toString(),
      title: '',
      publisher: '',
      date: '',
      url: '',
      description: '',
    };
    setPublications([...publications, newPublication]);
    toast.success("Publication added!");
  };

  const removePublication = (id: string) => {
    setPublications(publications.filter(pub => pub.id !== id));
    toast.success("Publication removed!");
  };

  const updatePublication = (id: string, field: keyof PublicationEntry, value: string) => {
    setPublications(publications.map(pub => 
      pub.id === id ? { ...pub, [field]: value } : pub
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Publications</h2>
        <p className="text-muted-foreground mb-6">
          List your published works, research papers, articles, or blog posts. This section is optional.
        </p>
      </div>

      {publications.map((publication, index) => (
        <Card key={publication.id} className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Publication #{index + 1}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removePublication(publication.id)}
                className="text-destructive hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor={`title-${publication.id}`}>Publication Title</Label>
              <Input
                id={`title-${publication.id}`}
                value={publication.title}
                onChange={(e) => updatePublication(publication.id, 'title', e.target.value)}
                placeholder="The Impact of AI on Modern Healthcare"
                className="glass-card"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`publisher-${publication.id}`}>Publisher/Journal</Label>
                <Input
                  id={`publisher-${publication.id}`}
                  value={publication.publisher}
                  onChange={(e) => updatePublication(publication.id, 'publisher', e.target.value)}
                  placeholder="Nature Medicine"
                  className="glass-card"
                />
              </div>
              <div>
                <Label htmlFor={`date-${publication.id}`}>Publication Date</Label>
                <Input
                  id={`date-${publication.id}`}
                  type="date"
                  value={publication.date}
                  onChange={(e) => updatePublication(publication.id, 'date', e.target.value)}
                  className="glass-card"
                />
              </div>
            </div>

            <div>
              <Label htmlFor={`url-${publication.id}`}>URL (Optional)</Label>
              <Input
                id={`url-${publication.id}`}
                type="url"
                value={publication.url || ''}
                onChange={(e) => updatePublication(publication.id, 'url', e.target.value)}
                placeholder="https://doi.org/10.1000/journal.paper"
                className="glass-card"
              />
            </div>

            <div>
              <Label htmlFor={`description-${publication.id}`}>Description (Optional)</Label>
              <Textarea
                id={`description-${publication.id}`}
                value={publication.description || ''}
                onChange={(e) => updatePublication(publication.id, 'description', e.target.value)}
                placeholder="Brief summary of the publication and its significance..."
                rows={3}
                className="glass-card"
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={addPublication} variant="outline" className="w-full glass-card">
        <Plus className="w-4 h-4 mr-2" />
        Add Publication
      </Button>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">📚 Publications Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Include peer-reviewed papers, conference proceedings, and book chapters</p>
          <p>• List publications in reverse chronological order</p>
          <p>• Include DOI or URL when available for easy verification</p>
          <p>• Mention co-authors if it demonstrates collaboration skills</p>
          <p>• Include relevant blog posts or articles for non-academic roles</p>
          <p>• This section is optional - you can skip it if you prefer</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PublicationsForm;
