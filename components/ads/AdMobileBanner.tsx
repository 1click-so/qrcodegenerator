"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackAdVisible } from "@/lib/analytics";
import { useAdRefresh } from "./useAdRefresh";

const AD_CONFIG = { key: "fe4c9923bb70dfede483725880659ea0", width: 320, height: 50 };

export default function AdMobileBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const enabled = typeof window !== "undefined" && window.innerWidth < 640;
  useAdRefresh(containerRef, AD_CONFIG, enabled, pathname);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      trackAdVisible("320x50", pathname);
    }
  }, [pathname]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center bg-white/95 py-[5px] sm:hidden">
      <div ref={containerRef} />
    </div>
  );
}
