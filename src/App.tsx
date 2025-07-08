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
import SoftwareEngineerPro from "./pages/templates/SoftwareEngineerPro";
import DataScientistElite from "./pages/templates/DataScientistElite";
import DevOpsEngineer from "./pages/templates/DevOpsEngineer";
import MobileDeveloper from "./pages/templates/MobileDeveloper";
import UxUiDesigner from "./pages/templates/UxUiDesigner";
import Photographer from "./pages/templates/Photographer";
import BusinessProfessional from "./pages/templates/BusinessProfessional";
import MedicalDoctor from "./pages/templates/MedicalDoctor";
import RegisteredNurse from "./pages/templates/RegisteredNurse";
import InvestmentBanker from "./pages/templates/InvestmentBanker";
import FinancialAnalyst from "./pages/templates/FinancialAnalyst";
import GradientModern from "./pages/templates/GradientModern";
import MinimalistPro from "./pages/templates/MinimalistPro";
import ColorfulFresh from "./pages/templates/ColorfulFresh";
import ElegantProfessional from "./pages/templates/ElegantProfessional";
import HealthcareSpecialist from "./pages/templates/HealthcareSpecialist";
import FinanceExpert from "./pages/templates/FinanceExpert";
import CreativeProfessional from "./pages/templates/CreativeProfessional";
import GraphicDesigner from "./pages/templates/GraphicDesigner";
import MarketingManager from "./pages/templates/MarketingManager";
import ContentCreator from "./pages/templates/ContentCreator";
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
          {/* Technology Templates */}
          <Route path="/templates/tech-professional" element={<TechProfessional />} />
          <Route path="/templates/software-engineer-pro" element={<SoftwareEngineerPro />} />
          <Route path="/templates/data-scientist-elite" element={<DataScientistElite />} />
          <Route path="/templates/devops-engineer" element={<DevOpsEngineer />} />
          <Route path="/templates/mobile-developer" element={<MobileDeveloper />} />
          
          {/* Healthcare Templates */}
          <Route path="/templates/healthcare-specialist" element={<HealthcareSpecialist />} />
          <Route path="/templates/medical-doctor" element={<MedicalDoctor />} />
          <Route path="/templates/registered-nurse" element={<RegisteredNurse />} />
          
          {/* Finance Templates */}
          <Route path="/templates/finance-expert" element={<FinanceExpert />} />
          <Route path="/templates/investment-banker" element={<InvestmentBanker />} />
          <Route path="/templates/financial-analyst" element={<FinancialAnalyst />} />
          
          {/* Creative Templates */}
          <Route path="/templates/creative-professional" element={<CreativeProfessional />} />
          <Route path="/templates/graphic-designer" element={<GraphicDesigner />} />
          <Route path="/templates/marketing-manager" element={<MarketingManager />} />
          <Route path="/templates/content-creator" element={<ContentCreator />} />
          <Route path="/templates/ux-ui-designer" element={<UxUiDesigner />} />
          <Route path="/templates/photographer" element={<Photographer />} />
          
          {/* Business Templates */}
          <Route path="/templates/business-professional" element={<BusinessProfessional />} />
          <Route path="/templates/executive-leader" element={<ExecutiveLeader />} />
          <Route path="/templates/elegant-professional" element={<ElegantProfessional />} />
          
          {/* Research Templates */}
          <Route path="/templates/recent-graduate" element={<RecentGraduate />} />
          
          {/* Multi-industry Templates */}
          <Route path="/templates/gradient-modern" element={<GradientModern />} />
          <Route path="/templates/minimalist-pro" element={<MinimalistPro />} />
          <Route path="/templates/colorful-fresh" element={<ColorfulFresh />} />
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
