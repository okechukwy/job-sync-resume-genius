
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit3, Save, X } from "lucide-react";
import { toast } from "sonner";

interface SimpleResumeEditorProps {
  content: string;
  onSave: (content: string) => void;
  onCancel: () => void;
}

export const SimpleResumeEditor = ({ content, onSave, onCancel }: SimpleResumeEditorProps) => {
  const [editContent, setEditContent] = useState(content);

  const handleSave = () => {
    onSave(editContent);
    toast.success("Resume updated successfully!");
  };

  const wordCount = editContent.split(/\s+/).filter(word => word.length > 0).length;

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Edit3 className="h-5 w-5" />
            Edit Resume
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{wordCount} words</span>
            <Button variant="outline" size="sm" onClick={onCancel}>
              <X className="h-4 w-4" />
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          className="min-h-[600px] font-mono text-sm"
          placeholder="Edit your resume content here..."
        />
      </CardContent>
    </Card>
  );
};
