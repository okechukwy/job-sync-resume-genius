import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/common/PageHeader";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <PageHeader />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Terms of <span className="gradient-text">Service</span>
          </h1>
          <p className="text-muted-foreground">Last updated: March 1, 2024</p>
        </div>

        <Card className="glass-card">
          <CardContent className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Agreement to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using ResumeAI, you accept and agree to be bound by the terms and 
                provision of this agreement. These Terms of Service apply to all visitors, users, 
                and others who access or use the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Use License</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Permission is granted to temporarily use ResumeAI for personal, non-commercial 
                transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for commercial purposes or public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or proprietary notations from the materials</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">User Accounts</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When you create an account with us, you must provide accurate, complete, and current information. 
                You are responsible for safeguarding the password and for maintaining the confidentiality of your account.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>You must be at least 18 years old to use our service</li>
                <li>One person or legal entity may not maintain more than one account</li>
                <li>You are responsible for all activities that occur under your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Subscription Terms</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Billing</h3>
                  <p className="text-muted-foreground">
                    Subscription fees are billed in advance on a monthly or annual basis. 
                    All fees are non-refundable except as required by law.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Cancellation</h3>
                  <p className="text-muted-foreground">
                    You may cancel your subscription at any time. Upon cancellation, 
                    your access will continue until the end of your current billing period.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Prohibited Uses</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You may not use our service:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>For any unlawful purpose or to solicit others to unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations or laws</li>
                <li>To transmit or procure the sending of advertising or promotional material</li>
                <li>To impersonate or attempt to impersonate the company or other users</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Content Ownership</h2>
              <p className="text-muted-foreground leading-relaxed">
                You retain ownership of any content you submit to our service. However, by submitting content, 
                you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and distribute 
                your content solely for the purpose of providing our services to you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                In no event shall ResumeAI or its suppliers be liable for any damages arising out of 
                the use or inability to use the materials on ResumeAI's website, even if authorized 
                representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to update these Terms of Service at any time. We will notify users 
                of any changes by posting the new Terms of Service on this page and updating the 
                "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at 
                legal@resumeai.com or through our contact form.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;