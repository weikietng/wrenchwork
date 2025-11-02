import Link from "next/link"

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Terms of Service</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Last updated: November 2, 2025
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground">
            By accessing or using WrenchWork (&quot;the Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, you may not access or use the Service.
          </p>
          <p className="text-muted-foreground">
            By using our Service, you also consent to our{" "}
            <Link href="/privacy" className="text-primary underline-offset-4 hover:underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/dpa" className="text-primary underline-offset-4 hover:underline">
              Data Processing Agreement
            </Link>
            , which are incorporated into these Terms by reference.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. Description of Service</h2>
          <p className="text-muted-foreground">
            WrenchWork is a cloud-based Software-as-a-Service (SaaS) platform designed to help automotive garages and repair shops manage their operations, including:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Customer and vehicle management</li>
            <li>Job tracking and scheduling</li>
            <li>Parts inventory management</li>
            <li>Service history records</li>
            <li>Business analytics and reporting</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. Account Registration and Security</h2>
          <p className="text-muted-foreground">
            To use the Service, you must:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Create an account with accurate and complete information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Notify us immediately of any unauthorized access</li>
            <li>Be at least 16 years of age</li>
            <li>Accept responsibility for all activities under your account</li>
          </ul>
          <p className="text-muted-foreground">
            You are prohibited from sharing your account credentials or allowing unauthorized access to your account.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">4. User Responsibilities and Acceptable Use</h2>
          <p className="text-muted-foreground">
            You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe upon the rights of others</li>
            <li>Upload malicious code, viruses, or harmful content</li>
            <li>Attempt to gain unauthorized access to the Service or related systems</li>
            <li>Interfere with or disrupt the Service or servers</li>
            <li>Use the Service to transmit spam or unsolicited communications</li>
            <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
            <li>Use automated systems to access the Service without permission</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">5. Data Ownership and Responsibilities</h2>
          <p className="text-muted-foreground">
            <strong>Your Data:</strong> You retain all ownership rights to the data you input into the Service (&quot;Customer Data&quot;). You grant us a limited license to process Customer Data solely to provide the Service.
          </p>
          <p className="text-muted-foreground">
            <strong>Data Controller Responsibilities:</strong> As a garage or business using WrenchWork, you act as the data controller for your customers&apos; personal data. You are responsible for:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Obtaining necessary consents from your customers</li>
            <li>Ensuring lawful processing of personal data</li>
            <li>Complying with applicable data protection laws (GDPR, etc.)</li>
            <li>Responding to data subject requests from your customers</li>
          </ul>
          <p className="text-muted-foreground">
            WrenchWork acts as a data processor for Customer Data. Our data processing practices are governed by our{" "}
            <Link href="/dpa" className="text-primary underline-offset-4 hover:underline">
              Data Processing Agreement
            </Link>
            .
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">6. Subscription and Payment</h2>
          <p className="text-muted-foreground">
            <strong>Subscription Plans:</strong> The Service is offered on a subscription basis. Pricing and plan details are available on our website.
          </p>
          <p className="text-muted-foreground">
            <strong>Payment Terms:</strong>
          </p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Subscriptions are billed in advance on a recurring basis</li>
            <li>All fees are non-refundable except as required by law</li>
            <li>We reserve the right to modify pricing with 30 days&apos; notice</li>
            <li>Failure to pay may result in suspension or termination of your account</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">7. Service Availability and Support</h2>
          <p className="text-muted-foreground">
            <strong>Uptime:</strong> We strive to maintain high availability but do not guarantee uninterrupted access. Scheduled maintenance will be communicated in advance when possible.
          </p>
          <p className="text-muted-foreground">
            <strong>Support:</strong> Technical support is provided via email at{" "}
            <a href="mailto:weikietng@gmail.com" className="text-primary hover:underline">
              weikietng@gmail.com
            </a>
            . Response times vary based on your subscription plan.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">8. Intellectual Property</h2>
          <p className="text-muted-foreground">
            <strong>Our IP:</strong> The Service, including all software, designs, text, graphics, and other content, is owned by WrenchWork and protected by intellectual property laws. You may not copy, modify, distribute, or create derivative works without our express permission.
          </p>
          <p className="text-muted-foreground">
            <strong>Your IP:</strong> You retain all rights to your Customer Data. We claim no ownership over your content.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">9. Termination</h2>
          <p className="text-muted-foreground">
            <strong>By You:</strong> You may terminate your account at any time through your account settings or by contacting us.
          </p>
          <p className="text-muted-foreground">
            <strong>By Us:</strong> We may suspend or terminate your access to the Service if you:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Violate these Terms</li>
            <li>Fail to pay subscription fees</li>
            <li>Engage in fraudulent or illegal activity</li>
            <li>Pose a security risk to the Service or other users</li>
          </ul>
          <p className="text-muted-foreground">
            <strong>Effect of Termination:</strong> Upon termination, your access to the Service will cease. You may request an export of your Customer Data within 30 days of termination. After 30 days, we may delete your data in accordance with our data retention policies.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">10. Disclaimers and Limitation of Liability</h2>
          <p className="text-muted-foreground">
            <strong>AS IS:</strong> The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
          </p>
          <p className="text-muted-foreground">
            <strong>Limitation of Liability:</strong> To the maximum extent permitted by law, WrenchWork shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities, arising from your use of the Service.
          </p>
          <p className="text-muted-foreground">
            Our total liability for any claims arising from these Terms or the Service shall not exceed the amount you paid us in the 12 months preceding the claim.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">11. Indemnification</h2>
          <p className="text-muted-foreground">
            You agree to indemnify and hold harmless WrenchWork, its affiliates, and their respective officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Your use of the Service</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any rights of another party</li>
            <li>Your Customer Data</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">12. Changes to Terms</h2>
          <p className="text-muted-foreground">
            We reserve the right to modify these Terms at any time. Material changes will be communicated via email or in-app notification at least 30 days before taking effect. Your continued use of the Service after changes become effective constitutes acceptance of the modified Terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">13. Governing Law and Dispute Resolution</h2>
          <p className="text-muted-foreground">
            These Terms are governed by the laws of the European Union and the Member State where WrenchWork is established, without regard to conflict-of-law principles.
          </p>
          <p className="text-muted-foreground">
            Any disputes arising from these Terms or the Service shall be resolved through good faith negotiations. If negotiations fail, disputes shall be subject to the exclusive jurisdiction of the courts in the EU Member State where WrenchWork is established.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">14. Miscellaneous</h2>
          <p className="text-muted-foreground">
            <strong>Entire Agreement:</strong> These Terms, together with our Privacy Policy and Data Processing Agreement, constitute the entire agreement between you and WrenchWork.
          </p>
          <p className="text-muted-foreground">
            <strong>Severability:</strong> If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full effect.
          </p>
          <p className="text-muted-foreground">
            <strong>No Waiver:</strong> Our failure to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">15. Contact Information</h2>
          <p className="text-muted-foreground">
            For questions about these Terms, please contact us at:
          </p>
          <p className="text-muted-foreground">
            📧{" "}
            <a href="mailto:weikietng@gmail.com" className="text-primary hover:underline">
              weikietng@gmail.com
            </a>
          </p>
          <p className="text-muted-foreground">
            🌐{" "}
            <a href="https://wrenchwork.northbench.dev" className="text-primary hover:underline">
              https://wrenchwork.northbench.dev
            </a>
          </p>
        </section>

        <div className="border-t pt-8">
          <Link
            href="/"
            className="text-sm text-primary underline-offset-4 hover:underline"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
