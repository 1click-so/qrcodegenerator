'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (open && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [open]);

  return (
    <div className="border border-gray-200/80 rounded-2xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-6 py-5 cursor-pointer hover:bg-gray-50/80 transition-colors text-left"
      >
        <span className="font-display font-semibold text-charcoal text-[15px] pr-6">{question}</span>
        <div
          className="flex-shrink-0 transition-transform duration-[250ms]"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <ChevronDown className="w-5 h-5 text-softgray" />
        </div>
      </button>
      <div
        className="overflow-hidden transition-[height,opacity] duration-[250ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
        style={{ height, opacity: open ? 1 : 0 }}
      >
        <div ref={contentRef}>
          <div className="px-6 pb-5 text-[15px] text-softgray leading-relaxed border-t border-gray-100 pt-4">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}
