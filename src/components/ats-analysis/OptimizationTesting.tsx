
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TestTube, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";
import { optimizeForATS, ATSOptimizationResult } from "@/services/openaiServices";

interface TestResult {
  testNumber: number;
  atsScore: number;
  suggestionCount: number;
  sectionsCovered: string[];
  timestamp: string;
  success: boolean;
  error?: string;
}

interface OptimizationTestingProps {
  resumeText: string;
  jobDescription?: string;
  industry: string;
}

const OptimizationTesting = ({ resumeText, jobDescription, industry }: OptimizationTestingProps) => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);

  const runConsistencyTest = async (testCount: number = 3) => {
    setIsRunningTests(true);
    const results: TestResult[] = [];

    for (let i = 1; i <= testCount; i++) {
      try {
        console.log(`Running consistency test ${i}/${testCount}`);
        
        const result = await optimizeForATS(resumeText, jobDescription, industry);
        
        const sectionsCovered = [...new Set(
          result.contentOptimizations.map(opt => opt.section)
        )];

        results.push({
          testNumber: i,
          atsScore: result.atsScore,
          suggestionCount: result.contentOptimizations.length,
          sectionsCovered,
          timestamp: new Date().toLocaleTimeString(),
          success: true
        });

      } catch (error) {
        console.error(`Test ${i} failed:`, error);
        results.push({
          testNumber: i,
          atsScore: 0,
          suggestionCount: 0,
          sectionsCovered: [],
          timestamp: new Date().toLocaleTimeString(),
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    setTestResults(results);
    setIsRunningTests(false);
    
    // Log test summary
    const successfulTests = results.filter(r => r.success);
    const avgSuggestions = successfulTests.length > 0 
      ? successfulTests.reduce((sum, r) => sum + r.suggestionCount, 0) / successfulTests.length 
      : 0;
    
    console.log('Consistency test summary:', {
      totalTests: testCount,
      successful: successfulTests.length,
      avgSuggestions: avgSuggestions.toFixed(1),
      suggestionRange: successfulTests.length > 0 
        ? `${Math.min(...successfulTests.map(r => r.suggestionCount))}-${Math.max(...successfulTests.map(r => r.suggestionCount))}`
        : 'N/A'
    });
  };

  const getTestResultColor = (result: TestResult) => {
    if (!result.success) return 'text-destructive';
    if (result.suggestionCount >= 10) return 'text-success';
    if (result.suggestionCount >= 8) return 'text-warning';
    return 'text-destructive';
  };

  const getTestResultBadge = (result: TestResult) => {
    if (!result.success) return 'destructive';
    if (result.suggestionCount >= 10) return 'default';
    if (result.suggestionCount >= 8) return 'secondary';
    return 'destructive';
  };

  const averageScore = testResults.filter(r => r.success).length > 0
    ? testResults.filter(r => r.success).reduce((sum, r) => sum + r.atsScore, 0) / testResults.filter(r => r.success).length
    : 0;

  const averageSuggestions = testResults.filter(r => r.success).length > 0
    ? testResults.filter(r => r.success).reduce((sum, r) => sum + r.suggestionCount, 0) / testResults.filter(r => r.success).length
    : 0;

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TestTube className="h-5 w-5" />
          ATS Optimization Testing
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Test consistency and quality of ATS analysis suggestions
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-3">
          <Button 
            onClick={() => runConsistencyTest(3)}
            disabled={isRunningTests}
            className="flex items-center gap-2"
          >
            {isRunningTests ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <TestTube className="h-4 w-4" />
            )}
            {isRunningTests ? 'Running Tests...' : 'Run 3 Tests'}
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => runConsistencyTest(5)}
            disabled={isRunningTests}
          >
            Run 5 Tests
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => setTestResults([])}
            disabled={isRunningTests || testResults.length === 0}
          >
            Clear Results
          </Button>
        </div>

        {testResults.length > 0 && (
          <>
            {/* Test Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-card p-4 rounded-lg">
                <div className="text-sm text-muted-foreground">Average ATS Score</div>
                <div className="text-2xl font-bold">
                  {averageScore.toFixed(1)}
                </div>
              </div>
              <div className="glass-card p-4 rounded-lg">
                <div className="text-sm text-muted-foreground">Average Suggestions</div>
                <div className="text-2xl font-bold">
                  {averageSuggestions.toFixed(1)}
                </div>
              </div>
              <div className="glass-card p-4 rounded-lg">
                <div className="text-sm text-muted-foreground">Success Rate</div>
                <div className="text-2xl font-bold">
                  {((testResults.filter(r => r.success).length / testResults.length) * 100).toFixed(0)}%
                </div>
              </div>
            </div>

            {/* Test Results */}
            <div className="space-y-3">
              <h4 className="font-medium">Test Results</h4>
              {testResults.map((result) => (
                <div key={`${result.testNumber}-${result.timestamp}`} className="glass-card p-4 rounded-lg border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {result.success ? (
                        <CheckCircle className="h-4 w-4 text-success" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-destructive" />
                      )}
                      <span className="font-medium">Test #{result.testNumber}</span>
                      <Badge variant={getTestResultBadge(result)}>
                        {result.success ? `${result.suggestionCount} suggestions` : 'Failed'}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">{result.timestamp}</span>
                  </div>
                  
                  {result.success ? (
                    <>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <span className="text-sm text-muted-foreground">ATS Score: </span>
                          <span className={`font-medium ${getTestResultColor(result)}`}>
                            {result.atsScore}/100
                          </span>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Sections: </span>
                          <span className="font-medium">{result.sectionsCovered.length}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {result.sectionsCovered.map((section, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {section}
                          </Badge>
                        ))}
                      </div>
                    </>
                  ) : (
                    result.error && (
                      <div className="text-sm text-destructive bg-destructive/10 p-2 rounded">
                        Error: {result.error}
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>

            {/* Quality Analysis */}
            {testResults.filter(r => r.success).length > 1 && (
              <div className="glass-card p-4 rounded-lg">
                <h4 className="font-medium mb-3">Quality Analysis</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Suggestion Count Range:</span>
                    <span className="font-medium">
                      {Math.min(...testResults.filter(r => r.success).map(r => r.suggestionCount))} - {Math.max(...testResults.filter(r => r.success).map(r => r.suggestionCount))}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Target Met (8+ suggestions):</span>
                    <span className="font-medium">
                      {testResults.filter(r => r.success && r.suggestionCount >= 8).length}/{testResults.filter(r => r.success).length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Comprehensive (10+ suggestions):</span>
                    <span className="font-medium">
                      {testResults.filter(r => r.success && r.suggestionCount >= 10).length}/{testResults.filter(r => r.success).length}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default OptimizationTesting;
