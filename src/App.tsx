
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import Navigation from "./components/Navigation";

// Page imports
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Templates from "./pages/Templates";
import ResumeBuilder from "./pages/ResumeBuilder";
import AIInterviewPrep from "./pages/AIInterviewPrep";
import LinkedInOptimization from "./pages/LinkedInOptimization";
import PerformanceTracking from "./pages/PerformanceTracking";
import VersionManagement from "./pages/VersionManagement";
import JobMatching from "./pages/JobMatching";
import CoverLetterGenerator from "./pages/CoverLetterGenerator";
import ATSAnalysis from "./pages/ATSAnalysis";
import PersonalBranding from "./pages/PersonalBranding";
import CareerCoaching from "./pages/CareerCoaching";
import Resources from "./pages/Resources";
import PrioritySupport from "./pages/PrioritySupport";
import HelpCenter from "./pages/HelpCenter";
import WhiteLabelExports from "./pages/WhiteLabelExports";

// Resource pages
import ResumeWritingGuide from "./pages/resources/ResumeWritingGuide";
import ATSOptimization from "./pages/resources/ATSOptimization";
import InterviewPreparation from "./pages/resources/InterviewPreparation";
import SalaryNegotiation from "./pages/resources/SalaryNegotiation";
import CareerDevelopment from "./pages/resources/CareerDevelopment";
import JobSearchStrategy from "./pages/resources/JobSearchStrategy";

// Other pages
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import GDPR from "./pages/GDPR";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={
                <div className="min-h-screen">
                  <Navigation />
                  <Index />
                </div>
              } />
              <Route path="/auth" element={<Auth />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/gdpr" element={<GDPR />} />
              <Route path="/checkout" element={<Checkout />} />

              {/* Resource pages (public) */}
              <Route path="/resources" element={<Resources />} />
              <Route path="/resources/resume-writing-guide" element={<ResumeWritingGuide />} />
              <Route path="/resources/ats-optimization" element={<ATSOptimization />} />
              <Route path="/resources/interview-preparation" element={<InterviewPreparation />} />
              <Route path="/resources/salary-negotiation" element={<SalaryNegotiation />} />
              <Route path="/resources/career-development" element={<CareerDevelopment />} />
              <Route path="/resources/job-search-strategy" element={<JobSearchStrategy />} />

              {/* Legacy redirects */}
              <Route path="/get-started" element={<Navigate to="/dashboard/resume/builder" replace />} />
              <Route path="/templates" element={<Navigate to="/dashboard/resume/templates" replace />} />
              <Route path="/ai-interview-prep" element={<Navigate to="/dashboard/career/interview-prep" replace />} />
              <Route path="/linkedin-optimization" element={<Navigate to="/dashboard/career/linkedin" replace />} />
              <Route path="/performance-tracking" element={<Navigate to="/dashboard/job-search/performance" replace />} />
              
              {/* Additional feature redirects */}
              <Route path="/job-matching" element={<Navigate to="/dashboard/job-search/matching" replace />} />
              <Route path="/performance" element={<Navigate to="/dashboard/job-search/performance" replace />} />
              <Route path="/versions" element={<Navigate to="/dashboard/resume/versions" replace />} />
              <Route path="/cover-letter" element={<Navigate to="/dashboard/job-search/cover-letter" replace />} />
              <Route path="/ats-analysis" element={<Navigate to="/dashboard/resume/ats-analysis" replace />} />

              {/* Protected dashboard routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }>
                <Route index element={<Dashboard />} />
                
                {/* Resume Tools */}
                <Route path="resume/builder" element={<ResumeBuilder />} />
                <Route path="resume/templates" element={<Templates />} />
                <Route path="resume/ats-analysis" element={<ATSAnalysis />} />
                <Route path="resume/versions" element={<VersionManagement />} />
                
                {/* Job Search */}
                <Route path="job-search/matching" element={<JobMatching />} />
                <Route path="job-search/performance" element={<PerformanceTracking />} />
                <Route path="job-search/cover-letter" element={<CoverLetterGenerator />} />
                
                {/* Career Development */}
                <Route path="career/interview-prep" element={<AIInterviewPrep />} />
                <Route path="career/linkedin" element={<LinkedInOptimization />} />
                <Route path="career/branding" element={<PersonalBranding />} />
                <Route path="career/coaching" element={<CareerCoaching />} />
                
                {/* Resources & Support */}
                <Route path="resources" element={<Resources />} />
                <Route path="support" element={<PrioritySupport />} />
                <Route path="help" element={<HelpCenter />} />
                
                {/* Advanced */}
                <Route path="exports" element={<WhiteLabelExports />} />
              </Route>

              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
