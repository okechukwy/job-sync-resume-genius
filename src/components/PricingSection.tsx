import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const PricingSection = () => {
  const plans = [
    {
      name: "Starter",
      price: "$5",
      period: "/month",
      description: "Perfect for occasional job seekers",
      badge: "",
      features: [
        "3 resumes per month",
        "1 job description analysis",
        "Basic ATS optimization",
        "Limited templates",
        "PDF export",
        "Email support"
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      name: "Professional",
      price: "$10",
      period: "/month",
      description: "Ideal for active job searching",
      badge: "Most Popular",
      features: [
        "Unlimited resumes & cover letters",
        "5 job description matches",
        "Advanced ATS optimization",
        "All premium templates",
        "Multiple export formats",
        "Cover letter generator",
        "Priority support"
      ],
      buttonText: "Get Started",
      buttonVariant: "hero" as const,
      popular: true
    },
    {
      name: "Premium",
      price: "$15",
      period: "/month",
      description: "For career professionals and consultants",
      badge: "Best Value",
      features: [
        "Everything in Professional",
        "Unlimited job matching",
        "AI interview preparation",
        "Personal branding tools",
        "LinkedIn optimization",
        "Career coaching insights",
        "White-label exports",
        "24/7 priority support"
      ],
      buttonText: "Go Premium",
      buttonVariant: "gradient" as const,
      popular: false
    }
  ];

  const payPerUse = [
    { item: "Resume Download", price: "$3" },
    { item: "Cover Letter", price: "$2" },
    { item: "Resume + Cover Letter Bundle", price: "$5" },
    { item: "Job Matching Analysis", price: "$3" }
  ];

  return (
    <section id="pricing" className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 glass-card">
            💎 Pricing Plans
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Choose Your{" "}
            <span className="gradient-text">Success Plan</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Whether you're actively job hunting or need occasional resume updates, 
            we have flexible pricing options that grow with your career.
          </p>
          
          {/* Pricing toggle would go here */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-sm text-muted-foreground">Monthly</span>
            <div className="text-sm text-muted-foreground">•</div>
            <span className="text-sm font-medium">Save 20% annually</span>
          </div>
        </div>

        {/* Subscription plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`glass-card relative transition-all duration-300 hover:shadow-glow ${
                plan.popular ? 'ring-2 ring-primary scale-105' : ''
              }`}
            >
              {plan.badge && (
                <Badge 
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-primary-foreground"
                >
                  {plan.badge}
                </Badge>
              )}
              
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-xl mb-2">{plan.name}</CardTitle>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm">
                      <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-success rounded-full" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link to={`/checkout?plan=${plan.name.toLowerCase()}&price=${plan.price}&period=${plan.period}`}>
                  <Button 
                    variant={plan.buttonVariant} 
                    size="lg" 
                    className="w-full"
                  >
                    {plan.buttonText}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pay-per-use section */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold mb-4">
            Or Pay As You <span className="gradient-text">Go</span>
          </h3>
          <p className="text-muted-foreground mb-8">
            Need just one resume or cover letter? No subscription required.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {payPerUse.map((item, index) => (
              <Link key={index} to={`/checkout?type=payperuse&plan=${item.item}&price=${item.price}`}>
                <Card className="glass-card text-center p-4 hover:shadow-glow transition-all duration-300 cursor-pointer">
                  <CardContent className="p-0">
                    <div className="text-2xl font-bold text-primary mb-1">{item.price}</div>
                    <div className="text-sm text-muted-foreground">{item.item}</div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default PricingSection;