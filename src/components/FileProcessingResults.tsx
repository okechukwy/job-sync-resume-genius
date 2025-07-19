
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, FileText, Edit3 } from "lucide-react";
import { FileReadResult } from "@/utils/fileReader";
import { useState } from "react";

interface FileProcessingResultsProps {
  fileName: string;
  processingResult: FileReadResult;
  onManualInput: (content: string) => void;
  onRetryAnalysis: () => void;
}

const FileProcessingResults = ({ 
  fileName, 
  processingResult, 
  onManualInput, 
  onRetryAnalysis 
}: FileProcessingResultsProps) => {
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualContent, setManualContent] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const getConfidenceColor = (confidence: FileReadResult['confidence']) => {
    switch (confidence) {
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'destructive';
      default: return 'secondary';
    }
  };

  const getConfidenceIcon = (confidence: FileReadResult['confidence']) => {
    switch (confidence) {
      case 'high': return <CheckCircle className="h-4 w-4" />;
      case 'medium': case 'low': return <AlertCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const handleManualSubmit = () => {
    if (manualContent.trim().length > 50) {
      onManualInput(manualContent);
      setShowManualInput(false);
    }
  };

  const previewText = processingResult.content.substring(0, 300) + 
    (processingResult.content.length > 300 ? '...' : '');

  return (
    <Card className="glass-card mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          File Processing Results
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Processing Summary */}
        <div className="flex items-center justify-between p-3 glass-card rounded-lg">
          <div className="flex items-center gap-3">
            {getConfidenceIcon(processingResult.confidence)}
            <div>
              <p className="font-medium">{fileName}</p>
              <p className="text-sm text-muted-foreground">
                {processingResult.processingMethod}
              </p>
            </div>
          </div>
          <div className="text-right">
            <Badge variant={getConfidenceColor(processingResult.confidence)}>
              {processingResult.confidence.toUpperCase()} CONFIDENCE
            </Badge>
            <p className="text-sm text-muted-foreground mt-1">
              {processingResult.extractedWords} words extracted
            </p>
          </div>
        </div>

        {/* Warnings */}
        {processingResult.warnings.length > 0 && (
          <div className="space-y-2">
            {processingResult.warnings.map((warning, index) => (
              <Alert key={index}>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{warning}</AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        {/* Content Preview */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Extracted Content Preview</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
            >
              {showPreview ? 'Hide' : 'Show'} Preview
            </Button>
          </div>
          
          {showPreview && (
            <div className="p-3 glass-card rounded-lg bg-muted/20 text-sm font-mono whitespace-pre-wrap max-h-32 overflow-y-auto">
              {previewText}
            </div>
          )}
        </div>

        {/* Manual Input Option */}
        {(processingResult.confidence === 'low' || processingResult.extractedWords < 100) && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium flex items-center gap-2">
                <Edit3 className="h-4 w-4" />
                Manual Input Option
              </h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowManualInput(!showManualInput)}
              >
                {showManualInput ? 'Cancel' : 'Paste Resume Text'}
              </Button>
            </div>
            
            {showManualInput && (
              <div className="space-y-3">
                <Textarea
                  placeholder="Paste your resume content here for better analysis..."
                  className="min-h-32"
                  value={manualContent}
                  onChange={(e) => setManualContent(e.target.value)}
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleManualSubmit}
                    disabled={manualContent.trim().length < 50}
                  >
                    Use This Content
                  </Button>
                  <Button
                    variant="outline"
                    onClick={onRetryAnalysis}
                  >
                    Retry File Analysis
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Success Message */}
        {processingResult.confidence === 'high' && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Great! Your resume was processed successfully with high confidence. 
              The analysis below uses your actual resume content.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default FileProcessingResults;
