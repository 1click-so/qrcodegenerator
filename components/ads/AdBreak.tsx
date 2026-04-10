"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { trackAdVisible } from "@/lib/analytics";
import { useAdRefresh } from "./useAdRefresh";

const MOBILE_AD = { key: "ce6c9288a6296900d8f5142383523c78", width: 300, height: 250 };
const DESKTOP_AD = { key: "3cf6859f5e25870ca913e8fbafc1d492", width: 728, height: 90 };

// TEMP: ads hidden until qrcodegenerator.to gets its own Adsterra publisher keys.
const ADS_ENABLED = false;

export default function AdBreak() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const config = isMobile ? MOBILE_AD : DESKTOP_AD;
  useAdRefresh(containerRef, config, ADS_ENABLED && isMobile !== null, pathname);

  if (!ADS_ENABLED) return null;

  useEffect(() => {
    if (isMobile === null) return;
    const format = isMobile ? "300x250" : "728x90";
    trackAdVisible(format, pathname);
  }, [pathname, isMobile]);

  return (
    <div className="flex justify-center py-6">
      <div ref={containerRef} />
    </div>
  );
}
