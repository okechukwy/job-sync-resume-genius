import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ResumeBuilder from "./pages/ResumeBuilder";
import Resources from "./pages/Resources";
import ResumeWritingGuide from "./pages/resources/ResumeWritingGuide";
import ATSOptimization from "./pages/resources/ATSOptimization";
import InterviewPreparation from "./pages/resources/InterviewPreparation";
import SalaryNegotiation from "./pages/resources/SalaryNegotiation";
import CareerDevelopment from "./pages/resources/CareerDevelopment";
import JobSearchStrategy from "./pages/resources/JobSearchStrategy";
import JobMatching from "./pages/JobMatching";
import ATSAnalysis from "./pages/ATSAnalysis";
import CoverLetterGenerator from "./pages/CoverLetterGenerator";
import PerformanceTracking from "./pages/PerformanceTracking";
import VersionManagement from "./pages/VersionManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/get-started" element={<ResumeBuilder />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/resume-writing-guide" element={<ResumeWritingGuide />} />
          <Route path="/resources/ats-optimization" element={<ATSOptimization />} />
          <Route path="/resources/interview-preparation" element={<InterviewPreparation />} />
          <Route path="/resources/salary-negotiation" element={<SalaryNegotiation />} />
          <Route path="/resources/career-development" element={<CareerDevelopment />} />
          <Route path="/resources/job-search-strategy" element={<JobSearchStrategy />} />
          <Route path="/job-matching" element={<JobMatching />} />
          <Route path="/ats-analysis" element={<ATSAnalysis />} />
          <Route path="/cover-letter" element={<CoverLetterGenerator />} />
          <Route path="/performance" element={<PerformanceTracking />} />
          <Route path="/versions" element={<VersionManagement />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
