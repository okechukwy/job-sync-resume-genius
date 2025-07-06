import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ResumeBuilder from "./pages/ResumeBuilder";
import Resources from "./pages/Resources";
import Templates from "./pages/Templates";
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
import Checkout from "./pages/Checkout";
import TechProfessional from "./pages/templates/TechProfessional";
import HealthcareSpecialist from "./pages/templates/HealthcareSpecialist";
import FinanceExpert from "./pages/templates/FinanceExpert";
import CreativeProfessional from "./pages/templates/CreativeProfessional";
import ExecutiveLeader from "./pages/templates/ExecutiveLeader";
import RecentGraduate from "./pages/templates/RecentGraduate";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import HelpCenter from "./pages/HelpCenter";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import GDPR from "./pages/GDPR";

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
          <Route path="/templates" element={<Templates />} />
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
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/templates/tech-professional" element={<TechProfessional />} />
          <Route path="/templates/healthcare-specialist" element={<HealthcareSpecialist />} />
          <Route path="/templates/finance-expert" element={<FinanceExpert />} />
          <Route path="/templates/creative-professional" element={<CreativeProfessional />} />
          <Route path="/templates/executive-leader" element={<ExecutiveLeader />} />
          <Route path="/templates/recent-graduate" element={<RecentGraduate />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/gdpr" element={<GDPR />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
