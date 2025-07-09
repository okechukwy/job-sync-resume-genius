import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const plan = searchParams.get('plan');
  const price = searchParams.get('price');
  const type = searchParams.get('type');

  const planDetails = {
    starter: {
      name: "Starter",
      price: "$5",
      period: "/month",
      features: [
        "3 resumes per month",
        "1 job description analysis",
        "Basic ATS optimization",
        "Limited templates",
        "PDF export",
        "Email support"
      ]
    },
    professional: {
      name: "Professional",
      price: "$10",
      period: "/month",
      features: [
        "Unlimited resumes & cover letters",
        "5 job description matches",
        "Advanced ATS optimization",
        "All premium templates",
        "Multiple export formats",
        "Cover letter generator",
        "Priority support"
      ]
    },
    premium: {
      name: "Premium",
      price: "$15",
      period: "/month",
      features: [
        "Everything in Professional",
        "Unlimited job matching",
        "AI interview preparation",
        "Personal branding tools",
        "LinkedIn optimization",
        "Career coaching insights",
        "White-label exports",
        "24/7 priority support"
      ]
    }
  };

  const currentPlan = plan ? planDetails[plan as keyof typeof planDetails] : null;

  const handlePayment = () => {
    // This is where payment processing would be implemented
    // For now, show an alert
    alert("Payment processing would be implemented here with Stripe integration");
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <PageHeader />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4 glass-card">
            💳 Secure Checkout
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Complete Your{" "}
            <span className="gradient-text">Purchase</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            {currentPlan ? (
              <Card className="glass-card">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{currentPlan.name}</CardTitle>
                      <div className="flex items-baseline gap-1 mt-2">
                        <span className="text-3xl font-bold">{currentPlan.price}</span>
                        <span className="text-muted-foreground">{currentPlan.period}</span>
                      </div>
                    </div>
                    {plan === 'professional' && (
                      <Badge className="bg-gradient-primary text-primary-foreground">
                        Most Popular
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {currentPlan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm">
                        <Check className="w-4 h-4 text-success flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : type === 'payperuse' ? (
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-xl">Pay Per Use</CardTitle>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-3xl font-bold">{price}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    One-time purchase for {plan?.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card className="glass-card">
                <CardContent className="p-6">
                  <p className="text-muted-foreground">No plan selected</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Payment Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="p-4 border-2 border-dashed border-primary/20 rounded-lg text-center">
                    <p className="text-muted-foreground mb-4">
                      Secure payment processing will be implemented here
                    </p>
                    <Button 
                      onClick={handlePayment}
                      variant="hero" 
                      size="lg" 
                      className="w-full"
                    >
                      Complete Payment
                    </Button>
                  </div>
                  
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full text-sm">
                      <span className="text-xl">🔒</span>
                      <span>Secure 256-bit SSL encryption</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;