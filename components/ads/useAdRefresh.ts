import { useEffect, useRef } from "react";

const REFRESH_INTERVAL = 45_000;

interface AdConfig {
  key: string;
  width: number;
  height: number;
}

export function useAdRefresh(
  containerRef: React.RefObject<HTMLDivElement | null>,
  config: AdConfig,
  enabled: boolean,
  refreshKey?: string
) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const container = containerRef.current;
    if (!container) return;

    function loadAd() {
      const target = containerRef.current;
      if (!target) return;

      if (document.hidden) return;

      const rect = target.getBoundingClientRect();
      const inViewport =
        rect.top < window.innerHeight &&
        rect.bottom > 0 &&
        rect.left < window.innerWidth &&
        rect.right > 0;
      if (!inViewport && target.innerHTML !== "") return;

      target.innerHTML = "";

      const iframe = document.createElement("iframe");
      iframe.width = String(config.width);
      iframe.height = String(config.height);
      iframe.style.border = "none";
      iframe.style.overflow = "hidden";
      iframe.scrolling = "no";
      iframe.srcdoc = `<!DOCTYPE html><html><body style="margin:0;padding:0;overflow:hidden;"><script>atOptions={'key':'${config.key}','format':'iframe','height':${config.height},'width':${config.width},'params':{}};<\/script><script src="https://www.highperformanceformat.com/${config.key}/invoke.js"><\/script></body></html>`;
      target.appendChild(iframe);
    }

    loadAd();

    intervalRef.current = setInterval(loadAd, REFRESH_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled, config.key, config.width, config.height, containerRef, refreshKey]);
}
