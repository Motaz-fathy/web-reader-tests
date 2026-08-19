'use client';

import React, { useState, useEffect } from 'react';
import { RenderMode } from '@/types';
import RenderModeBadge from './RenderModeBadge';
import { 
  Terminal, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  Clock, 
  RefreshCw, 
  Sparkles, 
  Server, 
  Laptop, 
  Copy, 
  Check,
  Activity,
  Code2,
  Info
} from 'lucide-react';

interface RenderHUDProps {
  mode: RenderMode;
  generatedAt?: string;
  revalidateInterval?: number;
  slug?: string;
  onSimulateEvent?: () => void;
}

export default function RenderHUD({
  mode,
  generatedAt,
  revalidateInterval = 30,
  slug,
  onSimulateEvent,
}: RenderHUDProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isRevalidating, setIsRevalidating] = useState(false);
  const [revalidateMsg, setRevalidateMsg] = useState<string | null>(null);
  const [clientTime, setClientTime] = useState<string>('');
  const [countdown, setCountdown] = useState<number>(revalidateInterval);

  useEffect(() => {
    setClientTime(new Date().toLocaleTimeString('ar-EG'));
    const interval = setInterval(() => {
      setClientTime(new Date().toLocaleTimeString('ar-EG'));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // ISR countdown timer simulation
  useEffect(() => {
    if (mode !== 'ISR') return;
    const timer = setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? revalidateInterval : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [mode, revalidateInterval]);

  const handleTriggerRevalidate = async () => {
    setIsRevalidating(true);
    setRevalidateMsg(null);
    try {
      const res = await fetch(`/api/revalidate?slug=${slug || 'isr-premier-league'}`);
      const data = await res.json();
      if (res.ok) {
        setRevalidateMsg('تمت إعادة توليد الصفحة بنجاح! (Revalidated)');
        setCountdown(revalidateInterval);
        setTimeout(() => window.location.reload(), 800);
      } else {
        setRevalidateMsg(`خطأ: ${data.message || 'فشلت العملية'}`);
      }
    } catch (e) {
      setRevalidateMsg('تعذر الاتصال بـ API');
    } finally {
      setIsRevalidating(false);
    }
  };

  const getCodeSnippet = () => {
    switch (mode) {
      case 'GSR':
        return `// Generated Static Rendering (SSG)
export async function generateStaticParams() {
  return [{ slug: '${slug || 'c3r0eyydnwgo'}' }];
}
export const dynamic = 'force-static';`;
      case 'ISR':
        return `// Incremental Static Regeneration (ISR)
export const revalidate = ${revalidateInterval}; // تجديد كل ${revalidateInterval} ثانية

export async function fetchArticle() {
  const res = await fetch('https://api.bbc.../article', {
    next: { revalidate: ${revalidateInterval} }
  });
  return res.json();
}`;
      case 'SSR':
        return `// Server-Side Rendering (Dynamic)
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function Page() {
  // تُنفذ على الخادم مع كل Request
  const freshData = await getLiveServerData();
  return <View data={freshData} />;
}`;
      case 'CSR':
        return `// Client-Side Rendering (Interactive)
'use client';
import { useState, useEffect } from 'react';

export default function MatchFeed() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const ws = new WebSocket('wss://api.bbc.live');
    ws.onmessage = (msg) => setEvents(prev => [msg.data, ...prev]);
  }, []);
}`;
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(getCodeSnippet());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside
      aria-label="لوحة تشخيص وتفاصيل نمط الرندرة"
      className="my-6 rounded-xl border border-neutral-200 bg-neutral-900 text-white shadow-lg overflow-hidden transition-all duration-300"
    >
      {/* HUD Header Bar */}
      <div className="px-4 py-3 bg-neutral-950 flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-md bg-white/10 text-white flex items-center justify-center">
            <Terminal className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-400 font-mono">Next.js 14 Inspector:</span>
              <RenderModeBadge mode={mode} size="sm" />
            </div>
          </div>
        </div>

        {/* Quick status indicators */}
        <div className="flex items-center gap-3 text-xs">
          {mode === 'GSR' && (
            <span className="hidden sm:flex items-center gap-1 text-emerald-400 font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              Edge Cache: HIT (100% Static)
            </span>
          )}

          {mode === 'ISR' && (
            <span className="flex items-center gap-1 text-purple-300 font-mono">
              <RefreshCw className={`w-3.5 h-3.5 ${countdown <= 5 ? 'animate-spin' : ''}`} />
              إعادة بناء تلقائي بعد: <span className="font-bold text-yellow-300">{countdown}s</span>
            </span>
          )}

          {mode === 'SSR' && (
            <span className="hidden sm:flex items-center gap-1 text-amber-400 font-mono">
              <Server className="w-3.5 h-3.5" />
              Dynamic on-demand (no-store)
            </span>
          )}

          {mode === 'CSR' && (
            <span className="flex items-center gap-1 text-blue-400 font-mono">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              Client Live Feed
            </span>
          )}

          {/* Interactive Trigger Button */}
          {mode === 'ISR' && (
            <button
              onClick={handleTriggerRevalidate}
              disabled={isRevalidating}
              className="px-2.5 py-1 rounded bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1 transition disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${isRevalidating ? 'animate-spin' : ''}`} />
              <span>{isRevalidating ? 'جار التجديد...' : 'تجديد فوري (Revalidate)'}</span>
            </button>
          )}

          {mode === 'SSR' && (
            <button
              onClick={() => window.location.reload()}
              className="px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-1 transition"
            >
              <RefreshCw className="w-3 h-3" />
              <span>طلب خادمي جديد (Request)</span>
            </button>
          )}

          {mode === 'CSR' && onSimulateEvent && (
            <button
              onClick={onSimulateEvent}
              className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1 transition"
            >
              <Zap className="w-3 h-3 text-yellow-300" />
              <span>محاكاة حدث بالمباراة</span>
            </button>
          )}

          {/* Expand/Collapse Toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
            title={isExpanded ? 'طي التفاصيل' : 'عرض تفاصيل النمط والكود'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Success Notification for Revalidation */}
      {revalidateMsg && (
        <div className="bg-purple-950/90 border-b border-purple-800 px-4 py-2 text-xs text-purple-200 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-400" /> {revalidateMsg}
          </span>
          <button onClick={() => setRevalidateMsg(null)} className="text-purple-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Expandable Deep Inspection */}
      {isExpanded && (
        <div className="p-4 bg-neutral-900 border-t border-neutral-800 text-xs space-y-4 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
            <div className="bg-neutral-950 p-2.5 rounded border border-neutral-800">
              <span className="text-neutral-400 block text-[10px]">استراتيجية الكاش (Cache Policy):</span>
              <span className="font-bold text-neutral-200">
                {mode === 'GSR' && 'public, max-age=31536000, immutable'}
                {mode === 'ISR' && `s-maxage=${revalidateInterval}, stale-while-revalidate`}
                {mode === 'SSR' && 'no-store, no-cache, must-revalidate'}
                {mode === 'CSR' && 'client-state (IndexedDB / Memory / React State)'}
              </span>
            </div>

            <div className="bg-neutral-950 p-2.5 rounded border border-neutral-800">
              <span className="text-neutral-400 block text-[10px]">توقيت التوليد (Build / Server Timestamp):</span>
              <span className="font-bold text-neutral-200">
                {generatedAt ? new Date(generatedAt).toLocaleTimeString('ar-EG') : 'وقت الـ Build الأولي'}
              </span>
            </div>

            <div className="bg-neutral-950 p-2.5 rounded border border-neutral-800">
              <span className="text-neutral-400 block text-[10px]">توقيت متصفح العميل (Client Time):</span>
              <span className="font-bold text-emerald-400">{clientTime}</span>
            </div>
          </div>

          {/* Code View */}
          <div className="bg-black rounded-lg border border-neutral-800 overflow-hidden">
            <div className="bg-neutral-950 px-3 py-1.5 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-neutral-400 font-mono text-[11px]">
                <Code2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Next.js 14 Implementation</span>
              </div>
              <button
                onClick={copyCode}
                className="flex items-center gap-1 text-[11px] text-neutral-300 hover:text-white px-2 py-0.5 rounded bg-neutral-800 transition"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'تم النسخ' : 'نسخ'}</span>
              </button>
            </div>
            <pre className="p-3 text-[11px] font-mono text-neutral-200 overflow-x-auto bg-[#0d1117]">
              <code>{getCodeSnippet()}</code>
            </pre>
          </div>
        </div>
      )}
    </aside>
  );
}
