'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface UseCodeGeneratorOptions {
  bcid: string;
  text: string;
  is2D: boolean;
  downloadPrefix: string;
}

const LS_KEY_COLORS = 'qrcodegenerator:colors';

function loadColors(): { barColor: string; bgColor: string; scale: number } {
  if (typeof window === 'undefined') return { barColor: '#000000', bgColor: '#FFFFFF', scale: 3 };
  try {
    const raw = localStorage.getItem(LS_KEY_COLORS);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { barColor: '#000000', bgColor: '#FFFFFF', scale: 3 };
}

function saveColors(barColor: string, bgColor: string, scale: number) {
  try { localStorage.setItem(LS_KEY_COLORS, JSON.stringify({ barColor, bgColor, scale })); } catch {}
}

export function useCodeGenerator({ bcid, text, is2D, downloadPrefix }: UseCodeGeneratorOptions) {
  const [barColor, setBarColor] = useState(() => loadColors().barColor);
  const [bgColor, setBgColor] = useState(() => loadColors().bgColor);
  const [scale, setScale] = useState(() => loadColors().scale);
  const [hasOutput, setHasOutput] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [showColorPanel, setShowColorPanel] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorRef = useRef<HTMLDivElement>(null);

  const buildOptions = useCallback(() => {
    const options: Record<string, unknown> = {
      bcid,
      text,
      scale,
      barcolor: barColor.replace('#', ''),
      backgroundcolor: bgColor.replace('#', ''),
      includetext: !is2D,
      textxalign: 'center',
    };
    if (!is2D) {
      options.height = 12;
    }
    return options;
  }, [bcid, text, scale, barColor, bgColor, is2D]);

  const generate = useCallback(async () => {
    if (!canvasRef.current || !text.trim()) {
      setHasOutput(false);
      setError('');
      return;
    }

    try {
      const { toCanvas } = await import('bwip-js/browser');
      toCanvas(canvasRef.current, buildOptions() as unknown as Parameters<typeof toCanvas>[1]);
      setHasOutput(true);
      setError('');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid input for this format';
      setError(message);
      setHasOutput(false);
    }
  }, [text, buildOptions]);

  useEffect(() => {
    saveColors(barColor, bgColor, scale);
  }, [barColor, bgColor, scale]);

  useEffect(() => {
    if (hasOutput) {
      generate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [barColor, bgColor, scale, bcid, is2D]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (colorRef.current && !colorRef.current.contains(e.target as Node)) {
        setShowColorPanel(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const downloadPng = useCallback(() => {
    if (!hasOutput || !canvasRef.current) return;
    const url = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `${downloadPrefix}-${bcid}.png`;
    a.click();
  }, [hasOutput, downloadPrefix, bcid]);

  const downloadSvg = useCallback(() => {
    if (!hasOutput) return;
    import('bwip-js/browser').then(({ toSVG }) => {
      const svg = toSVG(buildOptions() as unknown as Parameters<typeof toSVG>[0]);
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${downloadPrefix}-${bcid}.svg`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }, [hasOutput, buildOptions, downloadPrefix, bcid]);

  const copyToClipboard = useCallback(async () => {
    if (!hasOutput || !canvasRef.current) return;
    try {
      const blob = await new Promise<Blob | null>((resolve) =>
        canvasRef.current!.toBlob(resolve, 'image/png')
      );
      if (blob) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Silently fail
    }
  }, [hasOutput]);

  const resetColors = useCallback(() => {
    setBarColor('#000000');
    setBgColor('#FFFFFF');
    setScale(3);
  }, []);

  return {
    canvasRef,
    barColor,
    setBarColor,
    bgColor,
    setBgColor,
    scale,
    setScale,
    hasOutput,
    error,
    copied,
    showColorPanel,
    setShowColorPanel,
    colorRef,
    generate,
    downloadPng,
    downloadSvg,
    copyToClipboard,
    resetColors,
  };
}
