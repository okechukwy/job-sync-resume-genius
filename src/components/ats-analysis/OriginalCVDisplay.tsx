import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface OriginalCVDisplayProps {
  content: string;
  fileName?: string;
}

export const OriginalCVDisplay = ({ content, fileName }: OriginalCVDisplayProps) => {
  const handleCopyContent = () => {
    navigator.clipboard.writeText(content);
    toast.success("Original content copied to clipboard");
  };

  const formatContentForDisplay = (text: string) => {
    return text.split('\n').map((line, index) => {
      const trimmedLine = line.trim();
      
      // Empty lines
      if (trimmedLine === '') {
        return <div key={index} className="h-2" />;
      }
      
      // Section headers (all caps, short lines)
      if (trimmedLine.match(/^[A-Z\s\-:]+$/) && trimmedLine.length > 2 && trimmedLine.length < 50) {
        return (
          <div key={index} className="font-semibold text-primary border-b border-border/30 pb-1 mb-2 mt-4">
            {trimmedLine}
          </div>
        );
      }
      
      // Bullet points
      if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-') || trimmedLine.match(/^\d+\./)) {
        return (
          <div key={index} className="text-sm text-foreground ml-2 mb-1">
            {trimmedLine}
          </div>
        );
      }
      
      // Contact info or dates (lines with @ or years)
      if (trimmedLine.includes('@') || trimmedLine.match(/\b(19|20)\d{2}\b/)) {
        return (
          <div key={index} className="text-sm text-muted-foreground mb-1">
            {trimmedLine}
          </div>
        );
      }
      
      // Name or title (first few non-empty lines, typically longer)
      if (index < 10 && trimmedLine.length > 3 && !trimmedLine.includes('•')) {
        return (
          <div key={index} className="font-medium text-foreground mb-2">
            {trimmedLine}
          </div>
        );
      }
      
      // Regular content
      return (
        <div key={index} className="text-sm text-muted-foreground mb-1">
          {trimmedLine}
        </div>
      );
    });
  };

  return (
    <Card className="glass-card h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5" />
            Original Resume
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyContent}
            className="h-8"
          >
            <Copy className="h-3 w-3 mr-1" />
            Copy
          </Button>
        </div>
        {fileName && (
          <p className="text-sm text-muted-foreground">{fileName}</p>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[700px] px-6">
          <div className="space-y-1 pb-6">
            {formatContentForDisplay(content)}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};