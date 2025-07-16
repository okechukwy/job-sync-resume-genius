import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
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
import CloudArchitect from "./pages/templates/CloudArchitect";
import CybersecurityExpert from "./pages/templates/CybersecurityExpert";
import AiMlEngineer from "./pages/templates/AiMlEngineer";
import FrontendDeveloper from "./pages/templates/FrontendDeveloper";
import ProductManagerTech from "./pages/templates/ProductManagerTech";
import QaEngineer from "./pages/templates/QaEngineer";
import ItSupportSpecialist from "./pages/templates/ItSupportSpecialist";
import MedicalDoctor from "./pages/templates/MedicalDoctor";
import RegisteredNurse from "./pages/templates/RegisteredNurse";
import ResearchScientist from "./pages/templates/ResearchScientist";
import AcademicResearcher from "./pages/templates/AcademicResearcher";
import LabTechnician from "./pages/templates/LabTechnician";
import ClinicalResearcher from "./pages/templates/ClinicalResearcher";
import DataResearcher from "./pages/templates/DataResearcher";
import EnvironmentalScientist from "./pages/templates/EnvironmentalScientist";
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
import RecentGraduate from "./pages/templates/RecentGraduate";
import VideoEditor from "./pages/templates/VideoEditor";
import Copywriter from "./pages/templates/Copywriter";
import BrandManager from "./pages/templates/BrandManager";
import ArtDirector from "./pages/templates/ArtDirector";
import DigitalMarketer from "./pages/templates/DigitalMarketer";
import SocialMediaManager from "./pages/templates/SocialMediaManager";
import WebDesigner from "./pages/templates/WebDesigner";
import MotionGraphics from "./pages/templates/MotionGraphics";
import CreativeDirector from "./pages/templates/CreativeDirector";
import OperationsManager from "./pages/templates/OperationsManager";
import SalesManager from "./pages/templates/SalesManager";
import ProjectManager from "./pages/templates/ProjectManager";
import BusinessAnalyst from "./pages/templates/BusinessAnalyst";
import HrManager from "./pages/templates/HrManager";
import PharmacistPro from "./pages/templates/PharmacistPro";
import AccountantPro from "./pages/templates/AccountantPro";
import RiskManager from "./pages/templates/RiskManager";
import PortfolioManager from "./pages/templates/PortfolioManager";
import CorporateFinance from "./pages/templates/CorporateFinance";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import HelpCenter from "./pages/HelpCenter";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import GDPR from "./pages/GDPR";
import LinkedInOptimization from "./pages/LinkedInOptimization";
import AIInterviewPrep from "./pages/AIInterviewPrep";
import PersonalBranding from "./pages/PersonalBranding";
import WhiteLabelExports from "./pages/WhiteLabelExports";
import CareerCoaching from "./pages/CareerCoaching";
import PrioritySupport from "./pages/PrioritySupport";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/gdpr" element={<GDPR />} />
            
            {/* Protected routes */}
            <Route path="/get-started" element={<ProtectedRoute><ResumeBuilder /></ProtectedRoute>} />
            <Route path="/resources" element={<ProtectedRoute><Resources /></ProtectedRoute>} />
            <Route path="/templates" element={<ProtectedRoute><Templates /></ProtectedRoute>} />
            <Route path="/resources/resume-writing-guide" element={<ProtectedRoute><ResumeWritingGuide /></ProtectedRoute>} />
            <Route path="/resources/ats-optimization" element={<ProtectedRoute><ATSOptimization /></ProtectedRoute>} />
            <Route path="/resources/interview-preparation" element={<ProtectedRoute><InterviewPreparation /></ProtectedRoute>} />
            <Route path="/resources/salary-negotiation" element={<ProtectedRoute><SalaryNegotiation /></ProtectedRoute>} />
            <Route path="/resources/career-development" element={<ProtectedRoute><CareerDevelopment /></ProtectedRoute>} />
            <Route path="/resources/job-search-strategy" element={<ProtectedRoute><JobSearchStrategy /></ProtectedRoute>} />
            <Route path="/job-matching" element={<ProtectedRoute><JobMatching /></ProtectedRoute>} />
            <Route path="/ats-analysis" element={<ProtectedRoute><ATSAnalysis /></ProtectedRoute>} />
            <Route path="/cover-letter" element={<ProtectedRoute><CoverLetterGenerator /></ProtectedRoute>} />
            <Route path="/performance" element={<ProtectedRoute><PerformanceTracking /></ProtectedRoute>} />
            <Route path="/versions" element={<ProtectedRoute><VersionManagement /></ProtectedRoute>} />
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/linkedin-optimization" element={<ProtectedRoute><LinkedInOptimization /></ProtectedRoute>} />
            <Route path="/ai-interview-prep" element={<ProtectedRoute><AIInterviewPrep /></ProtectedRoute>} />
            <Route path="/personal-branding" element={<ProtectedRoute><PersonalBranding /></ProtectedRoute>} />
            <Route path="/white-label-exports" element={<ProtectedRoute><WhiteLabelExports /></ProtectedRoute>} />
            <Route path="/career-coaching" element={<ProtectedRoute><CareerCoaching /></ProtectedRoute>} />
            <Route path="/priority-support" element={<ProtectedRoute><PrioritySupport /></ProtectedRoute>} />
            {/* Protected Technology Templates */}
            <Route path="/templates/tech-professional" element={<ProtectedRoute><TechProfessional /></ProtectedRoute>} />
            <Route path="/templates/software-engineer-pro" element={<ProtectedRoute><SoftwareEngineerPro /></ProtectedRoute>} />
            <Route path="/templates/data-scientist-elite" element={<ProtectedRoute><DataScientistElite /></ProtectedRoute>} />
            <Route path="/templates/devops-engineer" element={<ProtectedRoute><DevOpsEngineer /></ProtectedRoute>} />
            <Route path="/templates/mobile-developer" element={<ProtectedRoute><MobileDeveloper /></ProtectedRoute>} />
            <Route path="/templates/cloud-architect" element={<ProtectedRoute><CloudArchitect /></ProtectedRoute>} />
            <Route path="/templates/cybersecurity-expert" element={<ProtectedRoute><CybersecurityExpert /></ProtectedRoute>} />
            <Route path="/templates/ai-ml-engineer" element={<ProtectedRoute><AiMlEngineer /></ProtectedRoute>} />
            <Route path="/templates/frontend-developer" element={<ProtectedRoute><FrontendDeveloper /></ProtectedRoute>} />
            <Route path="/templates/product-manager-tech" element={<ProtectedRoute><ProductManagerTech /></ProtectedRoute>} />
            <Route path="/templates/qa-engineer" element={<ProtectedRoute><QaEngineer /></ProtectedRoute>} />
            <Route path="/templates/it-support-specialist" element={<ProtectedRoute><ItSupportSpecialist /></ProtectedRoute>} />
            
            {/* Protected Healthcare Templates */}
            <Route path="/templates/healthcare-specialist" element={<ProtectedRoute><HealthcareSpecialist /></ProtectedRoute>} />
            <Route path="/templates/medical-doctor" element={<ProtectedRoute><MedicalDoctor /></ProtectedRoute>} />
            <Route path="/templates/registered-nurse" element={<ProtectedRoute><RegisteredNurse /></ProtectedRoute>} />
            <Route path="/templates/pharmacist-pro" element={<ProtectedRoute><PharmacistPro /></ProtectedRoute>} />
            
            {/* Protected Finance Templates */}
            <Route path="/templates/finance-expert" element={<ProtectedRoute><FinanceExpert /></ProtectedRoute>} />
            <Route path="/templates/investment-banker" element={<ProtectedRoute><InvestmentBanker /></ProtectedRoute>} />
            <Route path="/templates/financial-analyst" element={<ProtectedRoute><FinancialAnalyst /></ProtectedRoute>} />
            <Route path="/templates/accountant-pro" element={<ProtectedRoute><AccountantPro /></ProtectedRoute>} />
            <Route path="/templates/risk-manager" element={<ProtectedRoute><RiskManager /></ProtectedRoute>} />
            <Route path="/templates/portfolio-manager" element={<ProtectedRoute><PortfolioManager /></ProtectedRoute>} />
            <Route path="/templates/corporate-finance" element={<ProtectedRoute><CorporateFinance /></ProtectedRoute>} />
            
            {/* Protected Creative Templates */}
            <Route path="/templates/creative-professional" element={<ProtectedRoute><CreativeProfessional /></ProtectedRoute>} />
            <Route path="/templates/graphic-designer" element={<ProtectedRoute><GraphicDesigner /></ProtectedRoute>} />
            <Route path="/templates/marketing-manager" element={<ProtectedRoute><MarketingManager /></ProtectedRoute>} />
            <Route path="/templates/content-creator" element={<ProtectedRoute><ContentCreator /></ProtectedRoute>} />
            <Route path="/templates/ux-ui-designer" element={<ProtectedRoute><UxUiDesigner /></ProtectedRoute>} />
            <Route path="/templates/photographer" element={<ProtectedRoute><Photographer /></ProtectedRoute>} />
            <Route path="/templates/video-editor" element={<ProtectedRoute><VideoEditor /></ProtectedRoute>} />
            <Route path="/templates/copywriter" element={<ProtectedRoute><Copywriter /></ProtectedRoute>} />
            <Route path="/templates/brand-manager" element={<ProtectedRoute><BrandManager /></ProtectedRoute>} />
            <Route path="/templates/art-director" element={<ProtectedRoute><ArtDirector /></ProtectedRoute>} />
            <Route path="/templates/digital-marketer" element={<ProtectedRoute><DigitalMarketer /></ProtectedRoute>} />
            <Route path="/templates/social-media-manager" element={<ProtectedRoute><SocialMediaManager /></ProtectedRoute>} />
            <Route path="/templates/web-designer" element={<ProtectedRoute><WebDesigner /></ProtectedRoute>} />
            <Route path="/templates/motion-graphics" element={<ProtectedRoute><MotionGraphics /></ProtectedRoute>} />
            <Route path="/templates/creative-director" element={<ProtectedRoute><CreativeDirector /></ProtectedRoute>} />
            
            {/* Protected Business Templates */}
            <Route path="/templates/elegant-professional" element={<ProtectedRoute><ElegantProfessional /></ProtectedRoute>} />
            <Route path="/templates/operations-manager" element={<ProtectedRoute><OperationsManager /></ProtectedRoute>} />
            <Route path="/templates/sales-manager" element={<ProtectedRoute><SalesManager /></ProtectedRoute>} />
            <Route path="/templates/project-manager" element={<ProtectedRoute><ProjectManager /></ProtectedRoute>} />
            <Route path="/templates/business-analyst" element={<ProtectedRoute><BusinessAnalyst /></ProtectedRoute>} />
            <Route path="/templates/hr-manager" element={<ProtectedRoute><HrManager /></ProtectedRoute>} />
            
            {/* Protected Research Templates */}
            <Route path="/templates/research-scientist" element={<ProtectedRoute><ResearchScientist /></ProtectedRoute>} />
            <Route path="/templates/academic-researcher" element={<ProtectedRoute><AcademicResearcher /></ProtectedRoute>} />
            <Route path="/templates/lab-technician" element={<ProtectedRoute><LabTechnician /></ProtectedRoute>} />
            <Route path="/templates/clinical-researcher" element={<ProtectedRoute><ClinicalResearcher /></ProtectedRoute>} />
            <Route path="/templates/data-researcher" element={<ProtectedRoute><DataResearcher /></ProtectedRoute>} />
            <Route path="/templates/environmental-scientist" element={<ProtectedRoute><EnvironmentalScientist /></ProtectedRoute>} />
            <Route path="/templates/recent-graduate" element={<ProtectedRoute><RecentGraduate /></ProtectedRoute>} />
            
            {/* Protected Multi-industry Templates */}
            <Route path="/templates/gradient-modern" element={<ProtectedRoute><GradientModern /></ProtectedRoute>} />
            <Route path="/templates/minimalist-pro" element={<ProtectedRoute><MinimalistPro /></ProtectedRoute>} />
            <Route path="/templates/colorful-fresh" element={<ProtectedRoute><ColorfulFresh /></ProtectedRoute>} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
