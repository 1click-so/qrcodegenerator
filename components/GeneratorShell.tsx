'use client';

import { ReactNode, RefObject } from 'react';
import { Download, Copy, Check, Palette, RotateCcw } from 'lucide-react';

interface GeneratorShellProps {
  controls: ReactNode;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  hasOutput: boolean;
  error: string;
  emptyState: { icon: ReactNode; title: string; hint: string };
  colorRef: RefObject<HTMLDivElement | null>;
  showColorPanel: boolean;
  setShowColorPanel: (v: boolean) => void;
  barColor: string;
  setBarColor: (c: string) => void;
  bgColor: string;
  setBgColor: (c: string) => void;
  scale: number;
  setScale: (s: number) => void;
  onReset: () => void;
  onDownloadPng: () => void;
  onDownloadSvg: () => void;
  onCopy: () => void;
  copied: boolean;
}

export default function GeneratorShell({
  controls,
  canvasRef,
  hasOutput,
  error,
  emptyState,
  colorRef,
  showColorPanel,
  setShowColorPanel,
  barColor,
  setBarColor,
  bgColor,
  setBgColor,
  scale,
  setScale,
  onReset,
  onDownloadPng,
  onDownloadSvg,
  onCopy,
  copied,
}: GeneratorShellProps) {
  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-xl shadow-black/5 border border-gray-200/80 overflow-hidden">
        {/* Controls Bar */}
        <div className="border-b border-gray-100 bg-gray-50/80 px-4 sm:px-6 py-4">
          {controls}
        </div>

        {/* Preview Area */}
        <div className="px-4 sm:px-6 py-8 sm:py-12 bg-[#F8F9FB]">
          <div className="flex items-center justify-center min-h-[200px] rounded-xl border border-gray-200/60 bg-white p-6" style={{ backgroundImage: hasOutput ? 'none' : 'radial-gradient(circle, #E2E8F0 1px, transparent 1px)', backgroundSize: hasOutput ? 'auto' : '16px 16px' }}>
            {error ? (
              <div className="text-center">
                <p className="text-red-500 text-sm font-medium">{error}</p>
                <p className="text-softgray text-xs mt-1">Check your input for this format</p>
              </div>
            ) : !hasOutput ? (
              <div className="text-center">
                {emptyState.icon}
                <p className="text-charcoal text-sm font-medium mb-1">{emptyState.title}</p>
                <p className="text-softgray text-xs">{emptyState.hint}</p>
              </div>
            ) : null}
            <canvas
              ref={canvasRef}
              className={hasOutput && !error ? 'block max-w-full' : 'hidden'}
            />
          </div>
        </div>

        {/* Action Bar */}
        <div className="border-t border-gray-100 bg-gray-50/80 px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Downloads */}
            <div className="flex gap-2 flex-1">
              <button
                onClick={onDownloadPng}
                disabled={!hasOutput}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Download className="w-4 h-4" />
                PNG
              </button>
              <button
                onClick={onDownloadSvg}
                disabled={!hasOutput}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-accent text-white rounded-xl text-sm font-semibold hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Download className="w-4 h-4" />
                SVG
              </button>
            </div>

            {/* Settings + Copy */}
            <div className="flex gap-2">
              <button
                onClick={onCopy}
                disabled={!hasOutput}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-charcoal hover:border-primary/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>

              <div className="relative" ref={colorRef}>
                <button
                  onClick={() => setShowColorPanel(!showColorPanel)}
                  className="flex items-center gap-2 px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm hover:border-primary/30 transition-colors"
                  title="Colors & Scale"
                >
                  <Palette className="w-4 h-4 text-softgray" />
                  <span className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: barColor }} />
                </button>
                {showColorPanel && (
                  <div className="absolute bottom-full right-0 mb-2 w-56 bg-white rounded-xl border border-gray-200 shadow-xl shadow-black/10 z-50 p-4">
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-medium text-softgray block mb-1.5">Foreground</label>
                        <div className="flex items-center gap-2">
                          <input type="color" value={barColor} onChange={e => setBarColor(e.target.value)} className="w-8 h-8 rounded-sm cursor-pointer border-0" />
                          <input type="text" value={barColor} onChange={e => setBarColor(e.target.value)} className="flex-1 px-2 py-1 text-xs border border-gray-200 rounded-lg font-mono" />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-softgray block mb-1.5">Background</label>
                        <div className="flex items-center gap-2">
                          <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-8 h-8 rounded-sm cursor-pointer border-0" />
                          <input type="text" value={bgColor} onChange={e => setBgColor(e.target.value)} className="flex-1 px-2 py-1 text-xs border border-gray-200 rounded-lg font-mono" />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-softgray block mb-1.5">Scale: {scale}x</label>
                        <input type="range" min={1} max={6} step={1} value={scale} onChange={e => setScale(Number(e.target.value))} className="w-full accent-primary" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={onReset}
                className="flex items-center px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-softgray hover:text-charcoal hover:border-primary/30 transition-colors"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
