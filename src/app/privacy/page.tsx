import Link from "next/link"

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Last updated: November 2, 2025
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Introduction</h2>
          <p className="text-muted-foreground">
            Welcome to WrenchWork (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), a Software-as-a-Service (SaaS) platform operated by the developer of{" "}
            <a href="https://wrenchwork.northbench.dev" className="text-primary hover:underline">
              https://wrenchwork.northbench.dev
            </a>
            .
          </p>
          <p className="text-muted-foreground">
            This Privacy Policy explains how we collect, use, store, and protect personal data when users (&quot;you,&quot; &quot;your&quot;) access or use our services, including garage owners, their staff, and their customers.
          </p>
          <p className="text-muted-foreground">
            We are committed to ensuring that all processing of personal data complies with the EU General Data Protection Regulation (GDPR) and applicable local laws.
          </p>
          <p className="text-muted-foreground">
            If you have any questions, please contact us at:{" "}
            <a href="mailto:weikietng@gmail.com" className="text-primary hover:underline">
              weikietng@gmail.com
            </a>
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. Data Controller and Processor Roles</h2>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>
              <strong>WrenchWork (the developer)</strong> acts as a <strong>data processor</strong> for customer and vehicle data entered by garages and businesses.
            </li>
            <li>
              The <strong>garage or business</strong> using WrenchWork acts as the <strong>data controller</strong> for their customers&apos; data.
            </li>
            <li>
              We act as a <strong>data controller</strong> for limited information related to your WrenchWork user account (e.g., your business contact details, authentication data).
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. Personal Data We Collect</h2>
          
          <h3 className="text-xl font-semibold">From Garage Owners / Business Users</h3>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Full name</li>
            <li>Business name</li>
            <li>Business email address</li>
            <li>Business phone number</li>
            <li>Login credentials (stored securely using encryption)</li>
            <li>System usage metadata (e.g., logs, device, and browser information)</li>
          </ul>

          <h3 className="text-xl font-semibold mt-4">From Garage Customers (as entered by Garages)</h3>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Full name</li>
            <li>Contact information (e.g., email, phone number, if applicable)</li>
            <li>Vehicle details (make, model, color, year, registration details if applicable)</li>
          </ul>

          <p className="text-muted-foreground">
            We do not intentionally collect or process any sensitive personal data (e.g., racial or ethnic origin, political opinions, religious beliefs, health data).
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">4. Purpose and Legal Basis for Processing</h2>
          <p className="text-muted-foreground">
            We process personal data solely for operational and contractual reasons, as outlined below:
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Purpose</th>
                  <th className="border border-border p-3 text-left">Lawful Basis (GDPR Art. 6)</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr>
                  <td className="border border-border p-3">To provide, operate, and maintain the WrenchWork SaaS platform</td>
                  <td className="border border-border p-3">Art. 6(1)(b) &ndash; Contract performance</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">To create and manage user accounts</td>
                  <td className="border border-border p-3">Art. 6(1)(b) &ndash; Contract performance</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">To enable garages to manage customers and vehicle data</td>
                  <td className="border border-border p-3">Art. 6(1)(f) &ndash; Legitimate interest</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">To provide technical and customer support</td>
                  <td className="border border-border p-3">Art. 6(1)(b) and (f)</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">To communicate important updates or security notices</td>
                  <td className="border border-border p-3">Art. 6(1)(c) and (f)</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">To ensure security, prevent misuse, and maintain service integrity</td>
                  <td className="border border-border p-3">Art. 6(1)(f) &ndash; Legitimate interest</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-muted-foreground font-semibold">
            We do not use your personal data for marketing, profiling, or advertising. Any communication will be strictly service-related.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">5. Data Retention</h2>
          <p className="text-muted-foreground">
            We retain personal data only as long as necessary for the purposes described or as required by law.
          </p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li><strong>Garage account data:</strong> kept for the duration of the active subscription and up to 12 months after termination.</li>
            <li><strong>Customer and vehicle data:</strong> controlled by each garage; we delete this data upon instruction from the garage or account closure.</li>
            <li><strong>Backups and logs:</strong> automatically deleted within 90 days.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">6. Subprocessors</h2>
          <p className="text-muted-foreground">
            We engage the following trusted subprocessors to provide essential hosting and email infrastructure. Each subprocessor is bound by a written Data Processing Agreement (DPA) ensuring GDPR compliance, confidentiality, and security obligations equivalent to our own.
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Subprocessor</th>
                  <th className="border border-border p-3 text-left">Purpose</th>
                  <th className="border border-border p-3 text-left">Location / Data Region</th>
                  <th className="border border-border p-3 text-left">Safeguards</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr>
                  <td className="border border-border p-3">Neon</td>
                  <td className="border border-border p-3">Database hosting and storage</td>
                  <td className="border border-border p-3">EU data centers</td>
                  <td className="border border-border p-3">GDPR-compliant, EU-based infrastructure</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Vercel Inc.</td>
                  <td className="border border-border p-3">Application hosting and deployment</td>
                  <td className="border border-border p-3">EU & global edge network (EU primary)</td>
                  <td className="border border-border p-3">Standard Contractual Clauses (SCCs)</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Resend </td>
                  <td className="border border-border p-3">Transactional email delivery API</td>
                  <td className="border border-border p-3">US-based</td>
                  <td className="border border-border p-3">SCCs + Data Processing Addendum</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-muted-foreground">
            Data transfers outside the EEA (if any) are governed by the European Commission&apos;s Standard Contractual Clauses (SCCs) to ensure adequate protection under Articles 44–49 GDPR.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">7. Data Sharing and Disclosure</h2>
          <p className="text-muted-foreground">
            We do not sell, rent, or otherwise disclose personal data to third parties except:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>When necessary to operate and maintain the service (e.g., subprocessors above)</li>
            <li>When required by law, regulation, or court order</li>
            <li>To protect our rights or comply with legal obligations</li>
          </ul>
          <p className="text-muted-foreground">
            All subprocessors are contractually required to handle your data securely and confidentially.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">8. Security Measures</h2>
          <p className="text-muted-foreground">
            We maintain robust technical and organizational safeguards to protect personal data, including:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>TLS/SSL encryption for all data in transit</li>
            <li>Database encryption at rest</li>
            <li>Strict access controls and authentication requirements</li>
            <li>Periodic vulnerability assessments</li>
            <li>Data minimization and privacy-by-design principles</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">9. Data Subject Rights</h2>
          <p className="text-muted-foreground">
            Under GDPR, individuals have the following rights:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Right of access (Art. 15)</li>
            <li>Right to rectification (Art. 16)</li>
            <li>Right to erasure (Art. 17)</li>
            <li>Right to restrict processing (Art. 18)</li>
            <li>Right to data portability (Art. 20)</li>
            <li>Right to object (Art. 21)</li>
          </ul>
          <p className="text-muted-foreground">
            Requests may be submitted by email to{" "}
            <a href="mailto:weikietng@gmail.com" className="text-primary hover:underline">
              weikietng@gmail.com
            </a>
            . We will respond within 30 days in accordance with GDPR requirements.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">10. Children&apos;s Data</h2>
          <p className="text-muted-foreground">
            WrenchWork is not designed for use by individuals under 16 years of age. We do not knowingly collect personal data from minors.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">11. Changes to This Policy</h2>
          <p className="text-muted-foreground">
            We may modify this Privacy Policy from time to time to reflect changes in our services, legal requirements, or data processing practices.
          </p>
          <p className="text-muted-foreground">
            When updates are made, the revised version and the date of revision will be posted on our website. Material changes will be communicated to users in advance via email or in-app notice.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">12. Contact and Complaints</h2>
          <p className="text-muted-foreground">
            For questions or concerns about this Privacy Policy or your personal data, please contact:
          </p>
          <p className="text-muted-foreground">
            📧{" "}
            <a href="mailto:weikietng@gmail.com" className="text-primary hover:underline">
              weikietng@gmail.com
            </a>
          </p>
          <p className="text-muted-foreground">
            You also have the right to lodge a complaint with your local Data Protection Authority (DPA) if you believe your data rights have been violated.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">13. Governing Law</h2>
          <p className="text-muted-foreground">
            This Privacy Policy is governed by and construed in accordance with the laws of the European Union and the Member State where the developer is established, without regard to conflict-of-law principles.
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
