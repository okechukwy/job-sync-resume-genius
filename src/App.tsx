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
import ExecutiveLeader from "./pages/templates/ExecutiveLeader";
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
          <Route path="/templates/cloud-architect" element={<CloudArchitect />} />
          <Route path="/templates/cybersecurity-expert" element={<CybersecurityExpert />} />
          <Route path="/templates/ai-ml-engineer" element={<AiMlEngineer />} />
          <Route path="/templates/frontend-developer" element={<FrontendDeveloper />} />
          <Route path="/templates/product-manager-tech" element={<ProductManagerTech />} />
          <Route path="/templates/qa-engineer" element={<QaEngineer />} />
          <Route path="/templates/it-support-specialist" element={<ItSupportSpecialist />} />
          
          {/* Healthcare Templates */}
          <Route path="/templates/healthcare-specialist" element={<HealthcareSpecialist />} />
          <Route path="/templates/medical-doctor" element={<MedicalDoctor />} />
          <Route path="/templates/registered-nurse" element={<RegisteredNurse />} />
          <Route path="/templates/pharmacist-pro" element={<PharmacistPro />} />
          
          {/* Finance Templates */}
          <Route path="/templates/finance-expert" element={<FinanceExpert />} />
          <Route path="/templates/investment-banker" element={<InvestmentBanker />} />
          <Route path="/templates/financial-analyst" element={<FinancialAnalyst />} />
          <Route path="/templates/accountant-pro" element={<AccountantPro />} />
          <Route path="/templates/risk-manager" element={<RiskManager />} />
          <Route path="/templates/portfolio-manager" element={<PortfolioManager />} />
          <Route path="/templates/corporate-finance" element={<CorporateFinance />} />
          
          {/* Creative Templates */}
          <Route path="/templates/creative-professional" element={<CreativeProfessional />} />
          <Route path="/templates/graphic-designer" element={<GraphicDesigner />} />
          <Route path="/templates/marketing-manager" element={<MarketingManager />} />
          <Route path="/templates/content-creator" element={<ContentCreator />} />
          <Route path="/templates/ux-ui-designer" element={<UxUiDesigner />} />
          <Route path="/templates/photographer" element={<Photographer />} />
          <Route path="/templates/video-editor" element={<VideoEditor />} />
          <Route path="/templates/copywriter" element={<Copywriter />} />
          <Route path="/templates/brand-manager" element={<BrandManager />} />
          <Route path="/templates/art-director" element={<ArtDirector />} />
          <Route path="/templates/digital-marketer" element={<DigitalMarketer />} />
          <Route path="/templates/social-media-manager" element={<SocialMediaManager />} />
          <Route path="/templates/web-designer" element={<WebDesigner />} />
          <Route path="/templates/motion-graphics" element={<MotionGraphics />} />
          <Route path="/templates/creative-director" element={<CreativeDirector />} />
          
          {/* Business Templates */}
          <Route path="/templates/business-professional" element={<BusinessProfessional />} />
          <Route path="/templates/executive-leader" element={<ExecutiveLeader />} />
          <Route path="/templates/elegant-professional" element={<ElegantProfessional />} />
          <Route path="/templates/operations-manager" element={<OperationsManager />} />
          <Route path="/templates/sales-manager" element={<SalesManager />} />
          <Route path="/templates/project-manager" element={<ProjectManager />} />
          <Route path="/templates/business-analyst" element={<BusinessAnalyst />} />
          <Route path="/templates/hr-manager" element={<HrManager />} />
          
          {/* Research Templates */}
          <Route path="/templates/research-scientist" element={<ResearchScientist />} />
          <Route path="/templates/academic-researcher" element={<AcademicResearcher />} />
          <Route path="/templates/lab-technician" element={<LabTechnician />} />
          <Route path="/templates/clinical-researcher" element={<ClinicalResearcher />} />
          <Route path="/templates/data-researcher" element={<DataResearcher />} />
          <Route path="/templates/environmental-scientist" element={<EnvironmentalScientist />} />
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
          <Route path="/linkedin-optimization" element={<LinkedInOptimization />} />
          <Route path="/ai-interview-prep" element={<AIInterviewPrep />} />
          <Route path="/personal-branding" element={<PersonalBranding />} />
          <Route path="/white-label-exports" element={<WhiteLabelExports />} />
          <Route path="/career-coaching" element={<CareerCoaching />} />
          <Route path="/priority-support" element={<PrioritySupport />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
