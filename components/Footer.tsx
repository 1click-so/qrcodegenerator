import Link from 'next/link';

const ExtIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="border-t border-gray-200/60 bg-white px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto pt-16 pb-10">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 mb-14">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 font-display font-bold text-[15px] tracking-tight text-charcoal">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="1" y="1" width="4" height="4" fill="white" />
                  <rect x="11" y="1" width="4" height="4" fill="white" />
                  <rect x="1" y="11" width="4" height="4" fill="white" />
                  <rect x="7" y="7" width="2" height="2" fill="white" />
                  <rect x="7" y="1" width="2" height="2" fill="white" />
                  <rect x="1" y="7" width="2" height="2" fill="white" />
                  <rect x="11" y="7" width="4" height="2" fill="white" />
                  <rect x="7" y="11" width="2" height="4" fill="white" />
                  <rect x="11" y="11" width="2" height="2" fill="white" />
                </svg>
              </div>
              <span>qrcode<span className="text-primary">generator</span>.to</span>
            </Link>
            <p className="text-sm text-softgray leading-relaxed mt-4 max-w-xs">
              Free QR code generator for URLs, WiFi, contacts, and more. No sign-up, no watermarks, no limits.
            </p>
          </div>

          {/* Free Tools */}
          <div>
            <h4 className="font-display font-bold text-charcoal mb-4 text-[11px] uppercase tracking-[0.12em]">Free Tools</h4>
            <ul className="space-y-2.5 text-sm text-softgray">
              <li>
                <a href="https://generatebarcode.io" target="_blank" className="hover:text-primary transition-colors inline-flex items-center gap-1.5">
                  Barcode Generator <ExtIcon />
                </a>
              </li>
              <li>
                <a href="https://generatesignature.io" target="_blank" className="hover:text-primary transition-colors inline-flex items-center gap-1.5">
                  Signature Generator <ExtIcon />
                </a>
              </li>
              <li>
                <a href="https://generatesignature.io/email-signature" target="_blank" className="hover:text-primary transition-colors inline-flex items-center gap-1.5">
                  Email Signature Generator <ExtIcon />
                </a>
              </li>
              <li>
                <a href="https://generateinvoice.so" target="_blank" className="hover:text-primary transition-colors inline-flex items-center gap-1.5">
                  Invoice Generator <ExtIcon />
                </a>
              </li>
              <li>
                <a href="https://generateimage.io" target="_blank" className="hover:text-primary transition-colors inline-flex items-center gap-1.5">
                  AI Image Generator <ExtIcon />
                </a>
              </li>
              <li>
                <a href="https://generateresume.io" target="_blank" className="hover:text-primary transition-colors inline-flex items-center gap-1.5">
                  Resume Builder <ExtIcon />
                </a>
              </li>
            </ul>
          </div>

          {/* More Free Tools */}
          <div>
            <h4 className="font-display font-bold text-charcoal mb-4 text-[11px] uppercase tracking-[0.12em]">More Free Tools</h4>
            <ul className="space-y-2.5 text-sm text-softgray">
              <li>
                <a href="https://removebackground.so" target="_blank" className="hover:text-primary transition-colors inline-flex items-center gap-1.5">
                  Background Remover <ExtIcon />
                </a>
              </li>
              <li>
                <a href="https://resizeimage.to" target="_blank" className="hover:text-primary transition-colors inline-flex items-center gap-1.5">
                  Image Resizer <ExtIcon />
                </a>
              </li>
              <li>
                <a href="https://compresspdf.so" target="_blank" className="hover:text-primary transition-colors inline-flex items-center gap-1.5">
                  PDF Compressor <ExtIcon />
                </a>
              </li>
              <li>
                <a href="https://filecompressor.io" target="_blank" className="hover:text-primary transition-colors inline-flex items-center gap-1.5">
                  File Compressor <ExtIcon />
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-bold text-charcoal mb-4 text-[11px] uppercase tracking-[0.12em]">Company</h4>
            <ul className="space-y-2.5 text-sm text-softgray">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[13px] text-softgray">
            &copy; {new Date().getFullYear()} QRCodeGenerator.to
          </p>
          <p className="text-[13px] text-softgray">
            Vibe coded with{' '}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#ef4444" stroke="none" className="inline-block -mt-px"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
            {' '}by{' '}
            <a href="https://fam.social" target="_blank" className="text-charcoal font-medium hover:text-primary transition-colors">
              Fam!Social
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}
