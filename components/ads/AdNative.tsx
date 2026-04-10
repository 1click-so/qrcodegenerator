"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackAdVisible } from "@/lib/analytics";

export default function AdNative() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const wrapper = containerRef.current;
    if (!wrapper) return;

    wrapper.innerHTML = "";

    const adContainer = document.createElement("div");
    adContainer.id = "container-88c27889da3f11c298e5c820c72c0600";
    wrapper.appendChild(adContainer);

    const script = document.createElement("script");
    script.src =
      "https://pl29028956.profitablecpmratenetwork.com/88c27889da3f11c298e5c820c72c0600/invoke.js";
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    wrapper.appendChild(script);

    trackAdVisible("native", pathname);
  }, [pathname]);

  return (
    <div className="py-6 max-w-4xl mx-auto px-6 md:px-12">
      <div ref={containerRef} />
    </div>
  );
}
