import Link from "next/link"

export default function DataProcessingAgreementPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Data Processing Agreement</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Last updated: November 2, 2025
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Introduction and Scope</h2>
          <p className="text-muted-foreground">
            This Data Processing Agreement (&quot;DPA&quot;) forms part of the Terms of Service between you (&quot;Controller&quot; or &quot;Customer&quot;) and WrenchWork (&quot;Processor&quot; or &quot;we&quot;) and governs the processing of personal data in accordance with the EU General Data Protection Regulation (GDPR) and applicable data protection laws.
          </p>
          <p className="text-muted-foreground">
            This DPA applies when you use WrenchWork to process personal data of your customers, employees, or other data subjects.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. Definitions</h2>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li><strong>&quot;Personal Data&quot;</strong> means any information relating to an identified or identifiable natural person as defined in GDPR Article 4(1).</li>
            <li><strong>&quot;Processing&quot;</strong> means any operation performed on Personal Data, as defined in GDPR Article 4(2).</li>
            <li><strong>&quot;Controller&quot;</strong> means the entity that determines the purposes and means of processing Personal Data (you, the Customer).</li>
            <li><strong>&quot;Processor&quot;</strong> means the entity that processes Personal Data on behalf of the Controller (WrenchWork).</li>
            <li><strong>&quot;Sub-processor&quot;</strong> means any third party engaged by the Processor to process Personal Data.</li>
            <li><strong>&quot;Data Subject&quot;</strong> means the individual to whom Personal Data relates.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. Roles and Responsibilities</h2>
          <h3 className="text-xl font-semibold">3.1 Controller (Customer)</h3>
          <p className="text-muted-foreground">
            As the Controller, you are responsible for:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Ensuring you have a lawful basis for processing Personal Data</li>
            <li>Obtaining necessary consents from Data Subjects</li>
            <li>Providing privacy notices to Data Subjects</li>
            <li>Responding to Data Subject requests (access, rectification, erasure, etc.)</li>
            <li>Ensuring the accuracy and legality of Personal Data provided to WrenchWork</li>
            <li>Complying with all applicable data protection laws</li>
          </ul>

          <h3 className="text-xl font-semibold mt-4">3.2 Processor (WrenchWork)</h3>
          <p className="text-muted-foreground">
            As the Processor, we are responsible for:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Processing Personal Data only on your documented instructions</li>
            <li>Implementing appropriate technical and organizational security measures</li>
            <li>Assisting you in responding to Data Subject requests</li>
            <li>Notifying you of any Personal Data breaches without undue delay</li>
            <li>Ensuring our personnel are bound by confidentiality obligations</li>
            <li>Deleting or returning Personal Data upon termination of services</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">4. Nature and Purpose of Processing</h2>
          <p className="text-muted-foreground">
            <strong>Subject Matter:</strong> Provision of cloud-based garage management software.
          </p>
          <p className="text-muted-foreground">
            <strong>Duration:</strong> For the term of your subscription and up to 30 days after termination.
          </p>
          <p className="text-muted-foreground">
            <strong>Nature of Processing:</strong> Collection, storage, organization, retrieval, consultation, use, and deletion of Personal Data.
          </p>
          <p className="text-muted-foreground">
            <strong>Purpose:</strong> To enable you to manage customer records, vehicle information, service history, and business operations.
          </p>
          <p className="text-muted-foreground">
            <strong>Categories of Data Subjects:</strong>
          </p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Your customers (vehicle owners)</li>
            <li>Your employees and staff members</li>
            <li>Other individuals whose data you input into the Service</li>
          </ul>
          <p className="text-muted-foreground">
            <strong>Types of Personal Data:</strong>
          </p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Contact information (name, email, phone number, address)</li>
            <li>Vehicle information (make, model, registration, VIN)</li>
            <li>Service history and maintenance records</li>
            <li>Payment and billing information (if applicable)</li>
            <li>Any other data you choose to input into the Service</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">5. Processing Instructions</h2>
          <p className="text-muted-foreground">
            We will process Personal Data only in accordance with your documented instructions, which include:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>These Terms of Service and this DPA</li>
            <li>Your use of the Service and its features</li>
            <li>Any other written instructions you provide that are consistent with these Terms</li>
          </ul>
          <p className="text-muted-foreground">
            If we believe an instruction violates GDPR or other data protection laws, we will inform you immediately.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">6. Security Measures</h2>
          <p className="text-muted-foreground">
            We implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, including:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li><strong>Encryption:</strong> TLS/SSL encryption for data in transit; encryption at rest for database storage</li>
            <li><strong>Access Controls:</strong> Role-based access controls and multi-factor authentication</li>
            <li><strong>Pseudonymization:</strong> Where appropriate and feasible</li>
            <li><strong>Confidentiality:</strong> All personnel with access to Personal Data are bound by confidentiality obligations</li>
            <li><strong>Integrity and Availability:</strong> Regular backups and disaster recovery procedures</li>
            <li><strong>Testing and Assessment:</strong> Periodic security assessments and vulnerability testing</li>
            <li><strong>Incident Response:</strong> Documented procedures for detecting and responding to security incidents</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">7. Sub-processors</h2>
          <p className="text-muted-foreground">
            You authorize us to engage the following sub-processors to assist in providing the Service:
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Sub-processor</th>
                  <th className="border border-border p-3 text-left">Service</th>
                  <th className="border border-border p-3 text-left">Location</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr>
                  <td className="border border-border p-3">Neon</td>
                  <td className="border border-border p-3">Database hosting</td>
                  <td className="border border-border p-3">EU</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Vercel Inc.</td>
                  <td className="border border-border p-3">Application hosting</td>
                  <td className="border border-border p-3">EU/Global</td>
                </tr>
                <tr>
                  <td className="border border-border p-3">Resend</td>
                  <td className="border border-border p-3">Email delivery</td>
                  <td className="border border-border p-3">US</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-muted-foreground">
            We ensure that all sub-processors are bound by written agreements imposing data protection obligations equivalent to those in this DPA. We remain fully liable for the performance of sub-processors.
          </p>
          <p className="text-muted-foreground">
            We will notify you of any intended changes to sub-processors, giving you the opportunity to object to such changes.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">8. International Data Transfers</h2>
          <p className="text-muted-foreground">
            Personal Data is primarily stored and processed within the European Economic Area (EEA). Where data is transferred outside the EEA, we ensure appropriate safeguards are in place:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li><strong>Standard Contractual Clauses (SCCs):</strong> We use the European Commission&apos;s approved SCCs for transfers to third countries</li>
            <li><strong>Adequacy Decisions:</strong> We may transfer data to countries with an adequacy decision from the European Commission</li>
            <li><strong>Additional Safeguards:</strong> Technical measures such as encryption to protect data during transfer</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">9. Data Subject Rights</h2>
          <p className="text-muted-foreground">
            We will assist you in fulfilling your obligations to respond to Data Subject requests, including:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Right of access (GDPR Art. 15)</li>
            <li>Right to rectification (GDPR Art. 16)</li>
            <li>Right to erasure (GDPR Art. 17)</li>
            <li>Right to restriction of processing (GDPR Art. 18)</li>
            <li>Right to data portability (GDPR Art. 20)</li>
            <li>Right to object (GDPR Art. 21)</li>
          </ul>
          <p className="text-muted-foreground">
            We will provide reasonable assistance within 10 business days of your request. You are responsible for responding to Data Subjects within the legally required timeframes.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">10. Data Breach Notification</h2>
          <p className="text-muted-foreground">
            In the event of a Personal Data breach, we will:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Notify you without undue delay and, where feasible, within 72 hours of becoming aware of the breach</li>
            <li>Provide details of the nature of the breach, categories and approximate number of Data Subjects affected, and likely consequences</li>
            <li>Describe measures taken or proposed to address the breach and mitigate its effects</li>
            <li>Provide contact information for further inquiries</li>
          </ul>
          <p className="text-muted-foreground">
            You remain responsible for notifying supervisory authorities and Data Subjects as required by GDPR Articles 33 and 34.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">11. Audits and Compliance</h2>
          <p className="text-muted-foreground">
            We will make available to you all information necessary to demonstrate compliance with this DPA and allow for audits, including inspections, conducted by you or an auditor mandated by you.
          </p>
          <p className="text-muted-foreground">
            Audit requests must be made with reasonable notice (at least 30 days) and conducted during business hours in a manner that does not unreasonably interfere with our operations. You are responsible for the costs of such audits.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">12. Data Retention and Deletion</h2>
          <p className="text-muted-foreground">
            We will retain Personal Data only for as long as necessary to provide the Service or as required by law.
          </p>
          <p className="text-muted-foreground">
            Upon termination of your subscription:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>You may request an export of your data within 30 days</li>
            <li>We will delete or return all Personal Data within 90 days, except where retention is required by law</li>
            <li>Backup copies will be deleted in accordance with our standard backup retention schedule (90 days maximum)</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">13. Liability and Indemnification</h2>
          <p className="text-muted-foreground">
            Each party&apos;s liability under this DPA is subject to the limitations and exclusions set out in the Terms of Service.
          </p>
          <p className="text-muted-foreground">
            You agree to indemnify us against any claims, fines, or penalties arising from your failure to comply with your obligations as a Controller under GDPR or other data protection laws.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">14. Term and Termination</h2>
          <p className="text-muted-foreground">
            This DPA takes effect on the date you first use the Service and continues until termination of the Terms of Service.
          </p>
          <p className="text-muted-foreground">
            Upon termination, the provisions regarding data deletion, confidentiality, and liability shall survive.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">15. Governing Law</h2>
          <p className="text-muted-foreground">
            This DPA is governed by the laws of the European Union and the Member State where WrenchWork is established, consistent with the Terms of Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">16. Contact Information</h2>
          <p className="text-muted-foreground">
            For questions about this DPA or data processing practices, please contact:
          </p>
          <p className="text-muted-foreground">
            📧{" "}
            <a href="mailto:weikietng@gmail.com" className="text-primary hover:underline">
              weikietng@gmail.com
            </a>
          </p>
        </section>

        <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
          <h3 className="mb-2 text-lg font-semibold">Important Notice</h3>
          <p className="text-sm text-muted-foreground">
            By using WrenchWork, you acknowledge that you have read, understood, and agree to be bound by this Data Processing Agreement. This DPA is incorporated into and forms part of our{" "}
            <Link href="/terms" className="text-primary underline-offset-4 hover:underline">
              Terms of Service
            </Link>
            .
          </p>
        </div>

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
