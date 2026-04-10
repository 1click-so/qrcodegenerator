"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackAdVisible } from "@/lib/analytics";
import { useAdRefresh } from "./useAdRefresh";

const AD_CONFIG = { key: "212aa3cb435cfda71511a789c3f96fd8", width: 160, height: 600 };

// TEMP: ads hidden until qrcodegenerator.to gets its own Adsterra publisher keys.
const ADS_ENABLED = false;

export default function AdSkyscraper() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const enabled = ADS_ENABLED && typeof window !== "undefined" && window.innerWidth >= 1536;
  useAdRefresh(containerRef, AD_CONFIG, enabled, pathname);

  if (!ADS_ENABLED) return null;

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 1536) {
      trackAdVisible("160x600", pathname);
    }
  }, [pathname]);

  return (
    <div className="w-[160px]">
      <div ref={containerRef} />
    </div>
  );
}
