import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero flex items-center justify-center overflow-hidden px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(270_100%_70%/0.15),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,hsl(240_100%_65%/0.1),transparent_60%)]" />
      
      {/* Floating glass orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/15 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 via-transparent to-accent/5 rounded-full blur-3xl" />
      
      {/* Glass mesh pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,hsl(240_30%_90%/0.3)_1px,transparent_1px),linear-gradient(-45deg,hsl(240_30%_90%/0.3)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Announcement badge */}
        <Badge variant="secondary" className="mb-6 px-4 py-2 glass-card border-primary/20">
          🚀 AI-Powered Resume Optimization
        </Badge>
        
        {/* Main headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-shadow">
          Land the Job You{" "}
          <span className="gradient-text">Deserve</span>
        </h1>
        
        {/* Subheadline */}
        <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Create ATS-optimized resumes, generate tailored cover letters, and get AI-powered suggestions 
          to match your skills with job requirements perfectly.
        </p>
        
        {/* Key benefits */}
        <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm md:text-base">
          <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-full">
            ✅ ATS Score Optimization
          </div>
          <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-full">
            🎯 Job Description Matching
          </div>
          <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-full">
            📝 AI Cover Letter Generator
          </div>
        </div>
        
        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/get-started">
            <Button variant="hero" size="xl" className="min-w-48">
              Get Started Free
            </Button>
          </Link>
          <Button variant="glass" size="xl" className="min-w-48">
            Watch Demo
          </Button>
        </div>
        
        {/* Trust indicators */}
        <div className="mt-12 pt-12 border-t border-border/20">
          <p className="text-sm text-muted-foreground mb-4">Trusted by job seekers at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-lg font-semibold">Google</div>
            <div className="text-lg font-semibold">Microsoft</div>
            <div className="text-lg font-semibold">Amazon</div>
            <div className="text-lg font-semibold">Meta</div>
            <div className="text-lg font-semibold">Netflix</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;