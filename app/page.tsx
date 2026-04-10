'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FAQItem from '@/components/FAQItem';
import FadeIn from '@/components/FadeIn';
import QRCodeGenerator from '@/components/QRCodeGenerator';
import { AdBreak, AdNative } from '@/components/ads';
import { trackHeroCtaClicked } from '@/lib/analytics';
import { QrCode, Zap, Link2, Wifi, Contact, Mail, MessageSquare, Type, ArrowRight } from 'lucide-react';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Can I generate a QR code for free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Our QR code generator is 100% free with no limits on how many QR codes you create. No account needed, no watermarks, no hidden charges. We generate static QR codes that never expire. Download as PNG or SVG and use them anywhere.' } },
    { '@type': 'Question', name: 'What happens when I scan a QR code?', acceptedAnswer: { '@type': 'Answer', text: 'It depends on the data type encoded. A URL QR code opens the link in your browser. A WiFi QR code prompts you to join the network. A vCard QR code offers to save the contact to your phone. An email QR code opens your email app with the fields pre-filled. An SMS QR code opens your messaging app.' } },
    { '@type': 'Question', name: 'How do I create a WiFi QR code?', acceptedAnswer: { '@type': 'Answer', text: 'Select the WiFi preset in our generator. Enter your network name (SSID), password, and encryption type (WPA for most modern networks). Click Generate. Print the QR code and place it where guests can scan it. When someone scans with their phone camera, they get prompted to join your network automatically.' } },
    { '@type': 'Question', name: 'How do I create a QR code for my business card?', acceptedAnswer: { '@type': 'Answer', text: 'Select the Contact (vCard) preset. Enter your name, phone number, and email. Click Generate and download the QR code. Print it on your business card, add it to your email signature, or display it at events. When scanned, the contact information saves directly to the person\'s phone.' } },
    { '@type': 'Question', name: 'How long will a free QR code last?', acceptedAnswer: { '@type': 'Answer', text: 'Static QR codes (the type we generate) last forever. The data is encoded directly into the pattern of squares and does not depend on any external server or subscription. As long as the encoded content remains valid, the QR code will keep working. There is no expiration date.' } },
    { '@type': 'Question', name: 'What is the difference between static and dynamic QR codes?', acceptedAnswer: { '@type': 'Answer', text: 'Static QR codes encode data directly into the pattern. They are free, never expire, and work without an internet connection. Dynamic QR codes redirect through a third-party server, allowing you to change the destination and track scans, but they typically require a paid subscription and can stop working if the service shuts down. Our generator creates static codes.' } },
    { '@type': 'Question', name: 'What should I avoid when creating a QR code?', acceptedAnswer: { '@type': 'Answer', text: 'Avoid low-contrast color combinations (light gray on white will not scan). Do not make the QR code too small for the scanning distance. Do not place it on highly reflective or curved surfaces. Always test your QR code with at least two different phones before printing at scale.' } },
    { '@type': 'Question', name: 'What size should a QR code be?', acceptedAnswer: { '@type': 'Answer', text: 'For close-range scanning (business cards, table tents), minimum 2cm x 2cm (about 0.8 inches). For signs or posters scanned from a few feet away, at least 5cm x 5cm. For large signage or billboards, the QR code should be roughly 10% of the expected scanning distance in width.' } },
    { '@type': 'Question', name: 'Can I customize QR code colors?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Use the color picker to change the foreground and background colors. QR scanners need high contrast to read reliably, so keep the foreground dark and the background light. Black on white is the safest. Avoid inverting the colors, as some older phone cameras struggle with inverted codes.' } },
  ],
};

const webAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'QRCodeGenerator.to',
  url: 'https://qrcodegenerator.to',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free online QR code generator. Create QR codes for URLs, WiFi, vCard contacts, email, SMS, and plain text. Customize colors, download as PNG or SVG.',
  featureList: 'URL QR codes, WiFi QR codes, vCard QR codes, Email QR codes, SMS QR codes, Plain text QR codes, Color customization, PNG download, SVG download',
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'QRCodeGenerator.to',
  url: 'https://qrcodegenerator.to',
  description: 'Free online QR code generator for URLs, WiFi, contacts, email, SMS, and plain text.',
};

const LS_KEY = 'qrcodegenerator:qr';

export default function Home() {
  const [isBuilding, setIsBuilding] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        // Returning user: if they have any non-default values saved
        if (data?.fieldValues) {
          const values = data.fieldValues;
          const hasRealData =
            (values.url && values.url !== 'https://qrcodegenerator.to') ||
            (values.text && values.text !== 'Hello from QRCodeGenerator.to') ||
            values.ssid || values.name || values.to || values.phone || values.message || values.body;
          if (hasRealData) setIsBuilding(true);
        }
      }
    } catch {}
  }, []);

  const startBuilding = () => {
    setIsBuilding(true);
    trackHeroCtaClicked();
  };

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <Navbar />

      {/* Hero + Tool */}
      <section className="qr-dots px-6 lg:px-10 pt-12 sm:pt-20 pb-20 sm:pb-28">
        <div className="max-w-[1400px] mx-auto">
          <AnimatePresence mode="wait">
            {!isBuilding ? (
              <motion.div
                key="hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                className="max-w-3xl"
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary/5 border border-primary/10 rounded-full text-xs font-bold text-primary mb-6 uppercase tracking-wide">
                  <Zap className="w-3.5 h-3.5" />
                  Free Online QR Code Generator
                </div>
                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold text-charcoal leading-[1.05] mb-5">
                  QR Code Generator.<br />
                  <span className="text-primary">Free, fast and easy.</span>
                </h1>
                <p className="text-lg sm:text-xl text-softgray leading-relaxed max-w-xl mb-8">
                  Generate QR codes for URLs, WiFi networks, business cards, email, and SMS. Customize colors, download as PNG or SVG. Static QR codes that never expire.
                </p>
                <button
                  onClick={startBuilding}
                  className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-white text-[15px] font-semibold tracking-wide transition-all duration-300 active:scale-[0.97] shadow-[0_4px_20px_-4px_rgba(124,58,237,0.4)] hover:shadow-[0_8px_30px_-4px_rgba(124,58,237,0.5)] bg-primary hover:bg-primary/90"
                >
                  <QrCode className="w-5 h-5" />
                  Create My QR Code
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                {/* Supported types preview */}
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  {[
                    { icon: Link2, label: 'URL' },
                    { icon: Wifi, label: 'WiFi' },
                    { icon: Contact, label: 'Contact' },
                    { icon: Mail, label: 'Email' },
                    { icon: MessageSquare, label: 'SMS' },
                    { icon: Type, label: 'Text' },
                  ].map(({ icon: Icon, label }) => (
                    <span key={label} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200/80 rounded-xl text-[12px] font-medium text-charcoal">
                      <Icon className="w-3.5 h-3.5 text-primary" />
                      {label}
                    </span>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="tool"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              >
                <div className="max-w-3xl mb-10">
                  <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal leading-[1.05] mb-3">
                    Free QR Code Generator
                  </h1>
                  <p className="text-base sm:text-lg text-softgray leading-relaxed max-w-xl">
                    Pick a preset, enter your data, and download as PNG or SVG.
                  </p>
                </div>
                <QRCodeGenerator />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <AdNative />

      {/* What Can You Encode */}
      <section className="px-6 lg:px-10 py-20 sm:py-28 bg-white border-y border-gray-200/60">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn className="max-w-2xl mb-14">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal mb-4">
              What can you put in a QR code?
            </h2>
            <p className="text-softgray text-lg leading-relaxed">
              A QR code is more than just a link. Our free QR code maker supports six data types, each with its own scanning behavior. When someone scans the QR code, their phone automatically takes the right action.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Link2, title: 'URL', body: 'The most common use case. Create a QR code for any website URL. When scanned, the phone opens the link directly in the browser. Perfect for linking to your website, a product page, or an online form.', scan: 'Opens the URL in the phone\u2019s browser' },
              { icon: Wifi, title: 'WiFi', body: 'Generate a WiFi QR code that lets people connect to your network instantly. Enter your network name (SSID), password, and encryption type. Guests scan the code and connect without typing the password.', scan: 'Prompts to join the WiFi network' },
              { icon: Contact, title: 'Contact Card (vCard)', body: 'Create a QR code for your business card. Enter your name, phone number, and email. When scanned, the contact saves directly to the phone\u2019s address book. Print it on business cards, email signatures, or conference badges.', scan: 'Saves the contact to the phone' },
              { icon: Mail, title: 'Email', body: 'Generate a QR code that opens a pre-filled email. Set the recipient address, subject line, and message body. When scanned, the phone opens the default email app with everything filled in.', scan: 'Opens email app with pre-filled fields' },
              { icon: MessageSquare, title: 'SMS', body: 'Create a QR code that opens a pre-filled text message. Enter the phone number and message. When scanned, the phone opens the messaging app ready to send. Useful for opt-in campaigns and quick replies.', scan: 'Opens messaging app with pre-filled text' },
              { icon: Type, title: 'Plain Text', body: 'Encode any text into a QR code. The text displays on the phone when scanned. Works for serial numbers, reference codes, short messages, instructions, or any data that does not fit the other categories.', scan: 'Displays the text on screen' },
            ].map(({ icon: Icon, title, body, scan }) => (
              <div key={title} className="border border-gray-200/80 rounded-xl p-6 bg-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-charcoal">{title}</h3>
                </div>
                <p className="text-sm text-softgray leading-relaxed mb-3">{body}</p>
                <p className="text-xs text-softgray">
                  <strong className="text-charcoal">When scanned:</strong> {scan}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AdBreak />

      {/* Static vs Dynamic */}
      <section className="px-6 lg:px-10 py-20 sm:py-28">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20">
            <FadeIn>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal mb-6">
                Static vs dynamic QR codes
              </h2>
              <div className="space-y-4 text-softgray leading-relaxed">
                <p>
                  There are two types of QR codes: static and dynamic. Understanding the difference helps you decide which one fits your needs.
                </p>
                <p>
                  <strong className="text-charcoal">Static QR codes</strong> encode the data directly into the pattern of squares. The information is baked into the QR code itself. This means the QR code never expires and does not depend on any external service. Our free QR code generator creates static QR codes.
                </p>
                <p>
                  <strong className="text-charcoal">Dynamic QR codes</strong> contain a short redirect URL instead of the actual data. When scanned, they are redirected through a tracking server. This allows the owner to change the destination and track scans, but dynamic QR codes require a paid subscription.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h3 className="font-display font-bold text-charcoal text-xl mb-6">Quick comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 font-display font-bold text-charcoal text-sm"></th>
                      <th className="text-left py-3 px-4 font-display font-bold text-charcoal text-sm">Static</th>
                      <th className="text-left py-3 px-4 font-display font-bold text-charcoal text-sm">Dynamic</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-softgray">
                    {[
                      ['Price', 'Free', 'Paid subscription'],
                      ['Expires', 'Never', 'When subscription ends'],
                      ['Editable', 'No (data is fixed)', 'Yes'],
                      ['Scan tracking', 'No', 'Yes'],
                      ['Best for', 'Permanent links, WiFi, contacts', 'Campaigns, A/B testing'],
                    ].map(([label, st, dy], i) => (
                      <tr key={label} className={i < 4 ? 'border-b border-gray-100' : ''}>
                        <td className="py-3 px-4 font-medium text-charcoal">{label}</td>
                        <td className="py-3 px-4">{st}</td>
                        <td className="py-3 px-4">{dy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-softgray mt-5 leading-relaxed">
                <strong className="text-charcoal">Our recommendation:</strong> For most use cases (WiFi sharing, business cards, website links, menus), static QR codes are the right choice. They are free, permanent, and work without any external service.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <AdBreak />

      {/* FAQ */}
      <section className="px-6 lg:px-10 py-20 sm:py-28 bg-white border-y border-gray-200/60">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
            <FadeIn>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-3">
                FAQ
              </h2>
              <p className="text-softgray text-lg">
                Common questions about our free QR code generator.
              </p>
            </FadeIn>

            <div className="space-y-3">
              <FAQItem
                question="Can I generate a QR code for free?"
                answer="Yes. Our QR code generator is 100% free with no limits on how many QR codes you create. No account needed, no watermarks, no hidden charges. We generate static QR codes that never expire. Download as PNG or SVG and use them anywhere."
              />
              <FAQItem
                question="What happens when I scan a QR code?"
                answer="It depends on the data type encoded. A URL QR code opens the link in your browser. A WiFi QR code prompts you to join the network. A vCard QR code offers to save the contact to your phone. An email QR code opens your email app with the fields pre-filled. An SMS QR code opens your messaging app."
              />
              <FAQItem
                question="How do I create a WiFi QR code?"
                answer="Select the WiFi preset in our generator. Enter your network name (SSID), password, and encryption type (WPA for most modern networks). Click Generate. Print the QR code and place it where guests can scan it. When someone scans with their phone camera, they get prompted to join your network automatically."
              />
              <FAQItem
                question="How do I create a QR code for my business card?"
                answer="Select the Contact (vCard) preset. Enter your name, phone number, and email. Click Generate and download the QR code. Print it on your business card, add it to your email signature, or display it at events. When scanned, the contact information saves directly to the person's phone."
              />
              <FAQItem
                question="How long will a free QR code last?"
                answer="Static QR codes (the type we generate) last forever. The data is encoded directly into the pattern of squares and does not depend on any external server or subscription. As long as the encoded content remains valid, the QR code will keep working. There is no expiration date."
              />
              <FAQItem
                question="What is the difference between static and dynamic QR codes?"
                answer="Static QR codes encode data directly into the pattern. They are free, never expire, and work without an internet connection. Dynamic QR codes redirect through a third-party server, allowing you to change the destination and track scans, but they typically require a paid subscription and can stop working if the service shuts down. Our generator creates static codes."
              />
              <FAQItem
                question="What should I avoid when creating a QR code?"
                answer="Avoid low-contrast color combinations (light gray on white will not scan). Do not make the QR code too small for the scanning distance. Do not place it on highly reflective or curved surfaces. Always test your QR code with at least two different phones before printing at scale."
              />
              <FAQItem
                question="What size should a QR code be?"
                answer="For close-range scanning (business cards, table tents), minimum 2cm x 2cm (about 0.8 inches). For signs or posters scanned from a few feet away, at least 5cm x 5cm. For large signage or billboards, the QR code should be roughly 10% of the expected scanning distance in width."
              />
              <FAQItem
                question="Can I customize QR code colors?"
                answer="Yes. Use the color picker to change the foreground and background colors. QR scanners need high contrast to read reliably, so keep the foreground dark and the background light. Black on white is the safest. Avoid inverting the colors, as some older phone cameras struggle with inverted codes."
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
