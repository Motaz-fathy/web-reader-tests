'use client';

import React, { useState, useEffect } from 'react';
import { LiveEvent } from '@/types';
import { sampleLiveEvents } from '@/data/articles';
import { 
  Play, 
  Pause, 
  Plus, 
  Filter, 
  Activity, 
  Sparkles, 
  Radio, 
  ShieldAlert, 
  RefreshCw,
  Trophy,
  Volume2
} from 'lucide-react';

interface LiveMatchHubProps {
  initialEvents?: LiveEvent[];
}

export default function LiveMatchHub({ initialEvents }: LiveMatchHubProps) {
  const [events, setEvents] = useState<LiveEvent[]>(initialEvents || sampleLiveEvents);
  const [filter, setFilter] = useState<'all' | 'goal' | 'var' | 'card' | 'sub'>('all');
  const [isLiveActive, setIsLiveActive] = useState(true);
  const [matchMinute, setMatchMinute] = useState(90);
  const [homeScore, setHomeScore] = useState(2);
  const [awayScore, setAwayScore] = useState(1);
  const [latestEventFlash, setLatestEventFlash] = useState<string | null>(null);

  // Auto add simulated events periodically if live is active
  useEffect(() => {
    if (!isLiveActive) return;

    const interval = setInterval(() => {
      // Advance match minute slightly
      setMatchMinute((prev) => (prev < 95 ? prev + 1 : 90));
    }, 15000);

    return () => clearInterval(interval);
  }, [isLiveActive]);

  const handleSimulateNewEvent = () => {
    const randomEventTypes: Array<LiveEvent['type']> = ['goal', 'var', 'card', 'sub'];
    const selectedType = randomEventTypes[Math.floor(Math.random() * randomEventTypes.length)];
    const newMinute = Math.min(94, matchMinute + 1);
    setMatchMinute(newMinute);

    let newEvent: LiveEvent;
    if (selectedType === 'goal') {
      const isHome = Math.random() > 0.4;
      if (isHome) setHomeScore((s) => s + 1);
      else setAwayScore((s) => s + 1);

      newEvent = {
        id: `ev-${Date.now()}`,
        minute: newMinute,
        type: 'goal',
        title: isHome ? 'هدف جديد لأرسنال! ⚽🔥' : 'هدف لوست هام يونايتد! ⚽',
        description: isHome
          ? 'تسديدة خرافية لا تصد ولا ترد تسكن شباك الحارس وسط فرحة جنونية في المدرجات!'
          : 'هجمة مرتدة نموذجية وتمريرة بينية متقنة تنهي الكرة داخل الشباك.',
        timestamp: 'الآن مباشرة',
        team: isHome ? 'arsenal' : 'westham',
      };
    } else if (selectedType === 'var') {
      newEvent = {
        id: `ev-${Date.now()}`,
        minute: newMinute,
        type: 'var',
        title: 'مراجعة VAR حاسمة في الدقيقة ' + newMinute + ' 🖥️',
        description: 'غرفة تقنية الفيديو تستدعي الحكم مايكل أوليفر لمراجعة شبهة خطأ قبل الهدف المحتسب.',
        timestamp: 'الآن مباشرة',
        team: 'referee',
      };
    } else if (selectedType === 'card') {
      newEvent = {
        id: `ev-${Date.now()}`,
        minute: newMinute,
        type: 'card',
        title: 'بطاقة صفراء جديدة 🟨',
        description: 'الحكم يشهر البطاقة الصفراء بسبب إضاعة الوقت والاعتراض المبالغ فيه.',
        timestamp: 'الآن مباشرة',
        team: 'westham',
      };
    } else {
      newEvent = {
        id: `ev-${Date.now()}`,
        minute: newMinute,
        type: 'sub',
        title: 'تبديل تكتيكي في اللحظات الأخيرة 🔄',
        description: 'خروج المهاجم ودخول لاعب خط وسط دفاعي لتأمين النتيجة.',
        timestamp: 'الآن مباشرة',
        team: 'arsenal',
      };
    }

    setEvents((prev) => [newEvent, ...prev]);
    setLatestEventFlash(newEvent.id);
    setTimeout(() => setLatestEventFlash(null), 3000);
  };

  const filteredEvents = events.filter((ev) => {
    if (filter === 'all') return true;
    return ev.type === filter;
  });

  const getEventBadge = (type: LiveEvent['type']) => {
    switch (type) {
      case 'goal':
        return { label: 'هدف', bg: 'bg-emerald-600 text-white', icon: '⚽' };
      case 'var':
        return { label: 'VAR', bg: 'bg-purple-600 text-white', icon: '🖥️' };
      case 'card':
        return { label: 'بطاقة', bg: 'bg-amber-500 text-neutral-900', icon: '🟨' };
      case 'sub':
        return { label: 'تبديل', bg: 'bg-blue-600 text-white', icon: '🔄' };
      case 'whistle':
        return { label: 'صافرة', bg: 'bg-neutral-700 text-white', icon: '⏱️' };
      default:
        return { label: 'معلومة', bg: 'bg-neutral-600 text-white', icon: '📌' };
    }
  };

  return (
    <div className="my-8 rounded-2xl border border-neutral-200 bg-neutral-950 text-white shadow-xl overflow-hidden">
      {/* Live Match Scoreboard Header */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 p-5 border-b border-neutral-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-xs font-black tracking-wider text-red-400 uppercase font-mono">
              تغطية حية ومباشرة (CSR Realtime)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLiveActive(!isLiveActive)}
              className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs flex items-center gap-1.5 transition"
            >
              {isLiveActive ? (
                <>
                  <Pause className="w-3 h-3 text-red-400" /> <span>إيقاف البث الحي</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-emerald-400" /> <span>استئناف البث</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Teams & Score */}
        <div className="grid grid-cols-3 items-center text-center py-2">
          {/* Home Team */}
          <div className="space-y-1">
            <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-full bg-red-950 border-2 border-red-600 flex items-center justify-center font-bold text-base sm:text-lg text-white shadow-md">
              ARS
            </div>
            <h4 className="font-bold text-sm sm:text-base font-cairo text-white">أرسنال</h4>
            <span className="text-[11px] text-neutral-400">المتصدر</span>
          </div>

          {/* Center Score & Minute */}
          <div className="space-y-1">
            <div className="inline-block bg-neutral-900 border border-neutral-700 px-3 py-1 rounded-full text-xs font-mono text-amber-400 font-bold">
              الدقيقة {matchMinute}&apos; +4
            </div>
            <div className="text-3xl sm:text-4xl font-black font-mono tracking-widest text-white">
              {homeScore} - {awayScore}
            </div>
            <div className="text-[10px] text-emerald-400 font-medium">استاد الإمارات، لندن</div>
          </div>

          {/* Away Team */}
          <div className="space-y-1">
            <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-full bg-blue-950 border-2 border-blue-600 flex items-center justify-center font-bold text-base sm:text-lg text-white shadow-md">
              WHU
            </div>
            <h4 className="font-bold text-sm sm:text-base font-cairo text-white">وست هام</h4>
            <span className="text-[11px] text-neutral-400">الضيف</span>
          </div>
        </div>

        {/* Live Event Simulator Action */}
        <div className="mt-4 pt-3 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs text-neutral-400">
            تحديثات فورية في المتصفح دون إعادة تحميل الصفحة (CSR)
          </span>
          <button
            onClick={handleSimulateNewEvent}
            className="px-3 py-1.5 rounded-lg bg-bbc-red hover:bg-bbc-darkred text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md transform active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>محاكاة حدث فوري بالمباراة (CSR Action)</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-neutral-900 px-4 py-2.5 border-b border-neutral-800 flex items-center justify-between overflow-x-auto gap-2">
        <div className="flex items-center gap-1.5 text-xs">
          <Filter className="w-3.5 h-3.5 text-neutral-400 mr-1" />
          <button
            onClick={() => setFilter('all')}
            className={`px-2.5 py-1 rounded font-semibold transition ${
              filter === 'all' ? 'bg-bbc-red text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            جميع الأحداث ({events.length})
          </button>
          <button
            onClick={() => setFilter('goal')}
            className={`px-2.5 py-1 rounded font-semibold transition ${
              filter === 'goal' ? 'bg-emerald-600 text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            ⚽ أهداف
          </button>
          <button
            onClick={() => setFilter('var')}
            className={`px-2.5 py-1 rounded font-semibold transition ${
              filter === 'var' ? 'bg-purple-600 text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            🖥️ تقنية VAR
          </button>
          <button
            onClick={() => setFilter('card')}
            className={`px-2.5 py-1 rounded font-semibold transition ${
              filter === 'card' ? 'bg-amber-600 text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            🟨 بطاقات
          </button>
          <button
            onClick={() => setFilter('sub')}
            className={`px-2.5 py-1 rounded font-semibold transition ${
              filter === 'sub' ? 'bg-blue-600 text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            🔄 تبديلات
          </button>
        </div>

        <span className="text-[11px] text-neutral-500 font-mono hidden sm:inline-block">
          {filteredEvents.length} أحداث معروضة
        </span>
      </div>

      {/* Events Timeline */}
      <div className="p-4 sm:p-5 space-y-4 max-h-[500px] overflow-y-auto">
        {filteredEvents.map((event) => {
          const badge = getEventBadge(event.type);
          const isFlashed = latestEventFlash === event.id;

          return (
            <div
              key={event.id}
              className={`p-3.5 rounded-xl border transition-all duration-500 flex gap-3 ${
                isFlashed
                  ? 'bg-amber-950/60 border-amber-500 ring-2 ring-amber-400'
                  : 'bg-neutral-900/90 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              {/* Minute Badge */}
              <div className="flex flex-col items-center flex-shrink-0">
                <span className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 font-mono font-bold text-sm text-yellow-400 flex items-center justify-center shadow-inner">
                  {event.minute}&apos;
                </span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded mt-1.5 font-bold ${badge.bg}`}>
                  {badge.label}
                </span>
              </div>

              {/* Event Content */}
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <h4 className="font-bold text-sm text-white font-cairo flex items-center gap-1.5">
                    <span>{event.title}</span>
                  </h4>
                  <span className="text-[11px] text-neutral-400 font-mono">{event.timestamp}</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">{event.description}</p>
              </div>
            </div>
          );
        })}

        {filteredEvents.length === 0 && (
          <div className="text-center py-8 text-neutral-500 text-xs">
            لا توجد أحداث مطابقة لهذا الفلتر حالياً.
          </div>
        )}
      </div>
    </div>
  );
}
