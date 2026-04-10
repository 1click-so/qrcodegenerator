import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for QRCodeGenerator.to.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="px-6 lg:px-10 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-charcoal mb-4">Terms of Service</h1>
          <p className="text-softgray mb-12">Last updated: April 10, 2026</p>

          <div className="prose prose-gray max-w-none space-y-8 text-[15px] leading-relaxed text-softgray">

            <div>
              <h2 className="font-display text-xl font-bold text-charcoal mb-3">Acceptance of Terms</h2>
              <p>By accessing and using QRCodeGenerator.to, you agree to be bound by these terms of service. If you do not agree, please do not use the site.</p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-charcoal mb-3">Service Description</h2>
              <p>QRCodeGenerator.to is a free online tool that generates QR codes. The service runs entirely in your browser. We do not store, process, or have access to the data you enter into the generator.</p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-charcoal mb-3">Use of Generated QR Codes</h2>
              <p>QR codes generated using our tool are yours to use freely for any lawful purpose, including commercial use. We claim no ownership or rights over the output you create.</p>
              <p className="mt-3">You are solely responsible for ensuring that the data you encode is accurate and that your use of QR codes complies with relevant standards and applicable laws.</p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-charcoal mb-3">No Warranty</h2>
              <p>The service is provided &quot;as is&quot; without warranties of any kind, express or implied. While we strive for accuracy, we do not guarantee that generated QR codes will scan correctly in all environments or meet specific industry requirements. Always test your QR codes before printing at scale.</p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-charcoal mb-3">Limitation of Liability</h2>
              <p>QRCodeGenerator.to and its operators (Fam!Social) shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the service, including but not limited to losses from QR codes that fail to scan or contain incorrect data.</p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-charcoal mb-3">Acceptable Use</h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Use the service for any unlawful purpose</li>
                <li>Attempt to disrupt or overload the service</li>
                <li>Scrape, crawl, or automate access to the service in a way that degrades performance for other users</li>
                <li>Generate QR codes intended to deceive, defraud, or facilitate phishing attacks</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-charcoal mb-3">Intellectual Property</h2>
              <p>The QRCodeGenerator.to website, its design, branding, and code are the property of Fam!Social. The QR code output you generate belongs to you.</p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-charcoal mb-3">Changes to Terms</h2>
              <p>We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the updated terms.</p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-charcoal mb-3">Contact</h2>
              <p>For questions about these terms, contact us at <a href="mailto:hello@fam.social" className="text-primary hover:underline">hello@fam.social</a>.</p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
