import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import TemplatesSection from "@/components/TemplatesSection";
import PricingSection from "@/components/PricingSection";
import ResourcesSection from "@/components/ResourcesSection";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <TemplatesSection />
      <PricingSection />
      <ResourcesSection />
      
      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/20 glass-card">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-xl font-bold gradient-text mb-4">ResumeAI</div>
              <p className="text-sm text-muted-foreground">
                AI-powered resume optimization to help you land your dream job.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/get-started" className="hover:text-primary transition-colors">Resume Builder</Link></li>
                <li><Link to="/ats-analysis" className="hover:text-primary transition-colors">ATS Optimization</Link></li>
                <li><Link to="/cover-letter" className="hover:text-primary transition-colors">Cover Letters</Link></li>
                <li><Link to="/templates" className="hover:text-primary transition-colors">Templates</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">GDPR</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border/20 text-center text-sm text-muted-foreground">
            © 2024 ResumeAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
