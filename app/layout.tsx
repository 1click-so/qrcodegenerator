import type { Metadata } from 'next';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import Script from 'next/script';
import { AdGlobal } from '@/components/ads';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-outfit',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'QR Code Generator Free, Fast and Easy | No Sign Up',
    template: '%s',
  },
  description: 'Free QR code generator for URLs, WiFi, business cards, email and SMS. Customize colors, download as PNG or SVG. Static QR codes that never expire.',
  keywords: ['qr code generator', 'free qr code generator', 'qr code maker', 'create qr code', 'generate qr code', 'wifi qr code generator', 'vcard qr code generator', 'business card qr code', 'custom qr code generator', 'qr code generator with logo'],
  authors: [{ name: 'QRCodeGenerator.to' }],
  creator: 'QRCodeGenerator.to',
  metadataBase: new URL('https://qrcodegenerator.to'),
  alternates: { canonical: 'https://qrcodegenerator.to' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://qrcodegenerator.to',
    siteName: 'QRCodeGenerator.to',
    title: 'QR Code Generator Free, Fast and Easy | No Sign Up',
    description: 'Free QR code generator for URLs, WiFi, business cards, email and SMS. Customize colors, download as PNG or SVG. Static QR codes that never expire.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QR Code Generator Free, Fast and Easy | No Sign Up',
    description: 'Free QR code generator for URLs, WiFi, business cards, email and SMS. Customize colors, download as PNG or SVG.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${plusJakartaSans.variable}`}>
      <head>
        <meta name="theme-color" content="#7C3AED" />
        <link rel="dns-prefetch" href="https://analytics.fam.social" />
      </head>
      <body className="bg-paper font-body antialiased">
        <AdGlobal />
        {children}

        {/* Rybbit Analytics — site ID to be set once project is created in Rybbit dashboard */}
        <Script
          src="https://analytics.fam.social/api/script.js"
          data-site-id="TODO_RYBBIT_SITE_ID"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
