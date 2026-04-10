'use client';

import { useState, useEffect, useMemo } from 'react';
import { QrCode, Link2, Type, Wifi, Contact, Mail, MessageSquare } from 'lucide-react';
import { useCodeGenerator } from '@/hooks/useCodeGenerator';
import GeneratorShell from '@/components/GeneratorShell';
import { trackQrCreated, trackQrDownloaded, trackQrCopied } from '@/lib/analytics';

interface QRField {
  key: string;
  label: string;
  placeholder: string;
  type: 'text' | 'url' | 'email' | 'tel' | 'textarea' | 'select';
  options?: string[];
}

interface QRPreset {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  fields: QRField[];
  encode: (values: Record<string, string>) => string;
  defaults: Record<string, string>;
}

const QR_PRESETS: QRPreset[] = [
  {
    id: 'url',
    label: 'URL',
    icon: Link2,
    fields: [
      { key: 'url', label: 'Website URL', placeholder: 'https://example.com', type: 'url' },
    ],
    encode: (v) => v.url || '',
    defaults: { url: 'https://qrcodegenerator.to' },
  },
  {
    id: 'text',
    label: 'Text',
    icon: Type,
    fields: [
      { key: 'text', label: 'Plain Text', placeholder: 'Enter any text', type: 'textarea' },
    ],
    encode: (v) => v.text || '',
    defaults: { text: 'Hello from QRCodeGenerator.to' },
  },
  {
    id: 'wifi',
    label: 'WiFi',
    icon: Wifi,
    fields: [
      { key: 'ssid', label: 'Network Name (SSID)', placeholder: 'MyNetwork', type: 'text' },
      { key: 'password', label: 'Password', placeholder: 'Enter password', type: 'text' },
      { key: 'encryption', label: 'Encryption', placeholder: '', type: 'select', options: ['WPA', 'WEP', 'None'] },
    ],
    encode: (v) => {
      const enc = v.encryption || 'WPA';
      const ssid = (v.ssid || '').replace(/([\\;,":.])/g, '\\$1');
      const pass = (v.password || '').replace(/([\\;,":.])/g, '\\$1');
      return `WIFI:T:${enc};S:${ssid};P:${pass};;`;
    },
    defaults: { ssid: '', password: '', encryption: 'WPA' },
  },
  {
    id: 'vcard',
    label: 'Contact',
    icon: Contact,
    fields: [
      { key: 'name', label: 'Full Name', placeholder: 'John Doe', type: 'text' },
      { key: 'phone', label: 'Phone', placeholder: '+1 555 123 4567', type: 'tel' },
      { key: 'email', label: 'Email', placeholder: 'john@example.com', type: 'email' },
    ],
    encode: (v) =>
      `BEGIN:VCARD\nVERSION:3.0\nFN:${v.name || ''}\nTEL:${v.phone || ''}\nEMAIL:${v.email || ''}\nEND:VCARD`,
    defaults: { name: '', phone: '', email: '' },
  },
  {
    id: 'email',
    label: 'Email',
    icon: Mail,
    fields: [
      { key: 'to', label: 'To Address', placeholder: 'recipient@example.com', type: 'email' },
      { key: 'subject', label: 'Subject', placeholder: 'Subject line', type: 'text' },
      { key: 'body', label: 'Message', placeholder: 'Email body', type: 'textarea' },
    ],
    encode: (v) =>
      `mailto:${v.to || ''}?subject=${encodeURIComponent(v.subject || '')}&body=${encodeURIComponent(v.body || '')}`,
    defaults: { to: '', subject: '', body: '' },
  },
  {
    id: 'sms',
    label: 'SMS',
    icon: MessageSquare,
    fields: [
      { key: 'phone', label: 'Phone Number', placeholder: '+1 555 123 4567', type: 'tel' },
      { key: 'message', label: 'Message', placeholder: 'Your message', type: 'textarea' },
    ],
    encode: (v) => `smsto:${v.phone || ''}:${v.message || ''}`,
    defaults: { phone: '', message: '' },
  },
];

const LS_KEY_QR = 'qrcodegenerator:qr';

function loadQrPersisted(): { presetId: string; fieldValues: Record<string, string> } {
  if (typeof window === 'undefined') return { presetId: 'url', fieldValues: { url: 'https://qrcodegenerator.to' } };
  try {
    const raw = localStorage.getItem(LS_KEY_QR);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { presetId: 'url', fieldValues: { url: 'https://qrcodegenerator.to' } };
}

export default function QRCodeGenerator() {
  const [presetId, setPresetId] = useState(() => loadQrPersisted().presetId);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>(() => loadQrPersisted().fieldValues);

  const preset = QR_PRESETS.find(p => p.id === presetId)!;
  const encodedText = useMemo(() => preset.encode(fieldValues), [preset, fieldValues]);

  const gen = useCodeGenerator({
    bcid: 'qrcode',
    text: encodedText,
    is2D: true,
    downloadPrefix: 'qrcode',
  });

  useEffect(() => {
    try { localStorage.setItem(LS_KEY_QR, JSON.stringify({ presetId, fieldValues })); } catch {}
  }, [presetId, fieldValues]);

  const handlePresetChange = (id: string) => {
    const newPreset = QR_PRESETS.find(p => p.id === id)!;
    setPresetId(id);
    setFieldValues({ ...newPreset.defaults });
  };

  const updateField = (key: string, value: string) => {
    setFieldValues(prev => ({ ...prev, [key]: value }));
  };

  const handleGenerate = () => {
    gen.generate();
    trackQrCreated(presetId);
  };

  const handleDownloadPng = () => {
    gen.downloadPng();
    trackQrDownloaded(presetId, 'png');
  };

  const handleDownloadSvg = () => {
    gen.downloadSvg();
    trackQrDownloaded(presetId, 'svg');
  };

  const handleCopy = () => {
    gen.copyToClipboard();
    trackQrCopied(presetId);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.currentTarget.tagName !== 'TEXTAREA') {
      handleGenerate();
    }
  };

  const handleReset = () => {
    setFieldValues({ ...preset.defaults });
    gen.resetColors();
  };

  return (
    <GeneratorShell
      controls={
        <div className="flex-1 flex flex-col gap-3">
          {/* Preset Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {QR_PRESETS.map(p => {
              const Icon = p.icon;
              const isActive = p.id === presetId;
              return (
                <button
                  key={p.id}
                  onClick={() => handlePresetChange(p.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'bg-white border border-gray-200 text-charcoal hover:border-primary/30'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {p.label}
                </button>
              );
            })}
          </div>

          {/* Dynamic Fields + Generate Button */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex flex-col sm:flex-row gap-2">
              {preset.fields.map(field => {
                if (field.type === 'textarea') {
                  return (
                    <textarea
                      key={field.key}
                      value={fieldValues[field.key] || ''}
                      onChange={(e) => updateField(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      rows={2}
                      className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-charcoal placeholder:text-softgray/60 focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                    />
                  );
                }
                if (field.type === 'select') {
                  return (
                    <select
                      key={field.key}
                      value={fieldValues[field.key] || field.options?.[0] || ''}
                      onChange={(e) => updateField(field.key, e.target.value)}
                      className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-charcoal focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                    >
                      {field.options?.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  );
                }
                return (
                  <input
                    key={field.key}
                    type={field.type}
                    value={fieldValues[field.key] || ''}
                    onChange={(e) => updateField(field.key, e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={field.placeholder}
                    className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-charcoal placeholder:text-softgray/60 focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  />
                );
              })}
            </div>
            <button
              onClick={handleGenerate}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex-shrink-0 w-full sm:w-auto"
            >
              <QrCode className="w-4 h-4" />
              Generate
            </button>
          </div>
        </div>
      }
      canvasRef={gen.canvasRef}
      hasOutput={gen.hasOutput}
      error={gen.error}
      emptyState={{
        icon: <QrCode className="w-12 h-12 text-gray-200 mx-auto mb-3" />,
        title: 'Choose a preset and click Generate',
        hint: 'Create QR codes for URLs, WiFi, contacts, and more.',
      }}
      colorRef={gen.colorRef}
      showColorPanel={gen.showColorPanel}
      setShowColorPanel={gen.setShowColorPanel}
      barColor={gen.barColor}
      setBarColor={gen.setBarColor}
      bgColor={gen.bgColor}
      setBgColor={gen.setBgColor}
      scale={gen.scale}
      setScale={gen.setScale}
      onReset={handleReset}
      onDownloadPng={handleDownloadPng}
      onDownloadSvg={handleDownloadSvg}
      onCopy={handleCopy}
      copied={gen.copied}
    />
  );
}
