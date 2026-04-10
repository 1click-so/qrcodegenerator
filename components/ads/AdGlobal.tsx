"use client";

import { usePathname } from "next/navigation";
import AdSkyscraper from "./AdSkyscraper";
import AdMobileBanner from "./AdMobileBanner";

const EXCLUDED_PATHS = ["/privacy", "/terms"];

function isExcluded(pathname: string): boolean {
  return EXCLUDED_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
}

export default function AdGlobal() {
  const pathname = usePathname();

  if (isExcluded(pathname)) return null;

  return (
    <>
      <div className="hidden 2xl:block fixed left-4 top-24 z-40">
        <AdSkyscraper />
      </div>
      <div className="hidden 2xl:block fixed right-4 top-24 z-40">
        <AdSkyscraper />
      </div>
      <AdMobileBanner />
    </>
  );
}
