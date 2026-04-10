/**
 * Rybbit Analytics — Clean event tracking for QRCodeGenerator.to
 *
 * QR funnel:
 *   qr_created          → user generated a QR code
 *   qr_downloaded       → user downloaded a QR code
 *   qr_copied           → user copied a QR code to clipboard
 *   hero_cta_clicked    → user clicked the hero CTA to reveal the tool
 */

declare global {
  interface Window {
    rybbit?: {
      event: (eventName: string, eventParams?: Record<string, string | number | boolean>) => void;
    };
  }
}

export function trackEvent(
  eventName: string,
  eventParams?: Record<string, string | number | boolean>
): void {
  try {
    if (typeof window !== 'undefined' && window.rybbit) {
      window.rybbit.event(eventName, { ...eventParams });
    }
  } catch {
    // Silently fail
  }
}

export function trackQrCreated(dataType: string): void {
  trackEvent('qr_created', { data_type: dataType });
}

export function trackQrDownloaded(dataType: string, fileType: 'png' | 'svg'): void {
  trackEvent('qr_downloaded', { data_type: dataType, file_type: fileType });
}

export function trackQrCopied(dataType: string): void {
  trackEvent('qr_copied', { data_type: dataType });
}

export function trackHeroCtaClicked(): void {
  trackEvent('hero_cta_clicked');
}

export function trackAdVisible(format: string, page: string): void {
  trackEvent('ad_visible', { format, page });
}
