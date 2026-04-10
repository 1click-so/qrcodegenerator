import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for QRCodeGenerator.to. Learn how we handle your data.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="px-6 lg:px-10 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-charcoal mb-4">Privacy Policy</h1>
          <p className="text-softgray mb-12">Last updated: April 10, 2026</p>

          <div className="prose prose-gray max-w-none space-y-8 text-[15px] leading-relaxed text-softgray">

            <div>
              <h2 className="font-display text-xl font-bold text-charcoal mb-3">Overview</h2>
              <p>QRCodeGenerator.to is a free online QR code generator operated by Fam!Social. We are committed to protecting your privacy. This policy explains what data we collect, how we use it, and your rights.</p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-charcoal mb-3">Data We Collect</h2>
              <p className="font-medium text-charcoal mb-2">Data you enter into the generator</p>
              <p>All QR code generation happens entirely in your browser using client-side JavaScript. Your data (URLs, WiFi passwords, contact information, text, email content, SMS messages) is never sent to our servers, never stored, and never logged. We have zero access to the content you encode.</p>

              <p className="font-medium text-charcoal mt-4 mb-2">Analytics data</p>
              <p>We use Rybbit Analytics to collect anonymous usage data such as pages visited, referral source, browser type, device type, and country. This data is aggregated and cannot be used to identify you personally. We use this data solely to understand how people use the site and to improve it.</p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-charcoal mb-3">Cookies</h2>
              <p>We use cookies only for analytics purposes. You can disable cookies in your browser settings at any time without affecting the functionality of our QR code generator.</p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-charcoal mb-3">Third-Party Services</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li><span className="text-charcoal font-medium">Rybbit Analytics</span> - for anonymous usage statistics</li>
                <li><span className="text-charcoal font-medium">Vercel</span> - for hosting and serving the website</li>
              </ul>
              <p className="mt-3">We do not sell, share, or transfer your data to any other third parties.</p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-charcoal mb-3">Data Retention</h2>
              <p>Since we do not collect personal data through the generator tool, there is nothing to retain. Analytics data is retained according to the default retention policies of Rybbit Analytics.</p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-charcoal mb-3">Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Disable cookies and analytics tracking via your browser settings</li>
                <li>Request information about any data we may hold about you</li>
                <li>Request deletion of any data associated with you</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-charcoal mb-3">Children&apos;s Privacy</h2>
              <p>Our service is not directed at children under 13. We do not knowingly collect personal information from children.</p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-charcoal mb-3">Changes to This Policy</h2>
              <p>We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date.</p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-charcoal mb-3">Contact</h2>
              <p>If you have questions about this privacy policy, contact us at <a href="mailto:hello@fam.social" className="text-primary hover:underline">hello@fam.social</a>.</p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
