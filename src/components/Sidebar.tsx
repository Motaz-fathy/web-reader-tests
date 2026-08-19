'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { mostReadArticles, relatedArticles } from '@/data/articles';
import RenderModeBadge from './RenderModeBadge';
import InteractivePoll from './InteractivePoll';
import { 
  TrendingUp, 
  Radio, 
  Flame, 
  Sparkles, 
  Eye, 
  Volume2, 
  Play, 
  Pause,
  ExternalLink 
} from 'lucide-react';

export default function Sidebar() {
  const [isRadioPlaying, setIsRadioPlaying] = useState(false);

  return (
    <aside aria-label="الشريط الجانبي والأخبار ذات الصلة" className="space-y-8">
      {/* BBC Live Radio Card */}
      <div className="rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-bbc-black p-5 text-white border border-neutral-800 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-red-600 text-white">
              <Radio className="w-4 h-4 animate-pulse" />
            </span>
            <span className="text-xs font-bold text-red-400 font-cairo">بث راديو بي بي سي</span>
          </div>
          <span className="text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full font-bold">
            مباشر 24/7
          </span>
        </div>

        <h4 className="font-bold text-sm text-white font-cairo mb-2">
          نشرات الأخبار العالمية وتحليلات الشرق الأوسط
        </h4>
        <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
          استمع إلى البث المباشر لإذاعة BBC عربي مع تغطية شاملة لآخر التطورات الرياضية والسياسية.
        </p>

        <button
          onClick={() => setIsRadioPlaying(!isRadioPlaying)}
          className="w-full py-2.5 px-4 rounded-xl bg-bbc-red hover:bg-bbc-darkred text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-md"
        >
          {isRadioPlaying ? (
            <>
              <Pause className="w-4 h-4" />
              <span>إيقاف البث الإذاعي</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>تشغيل البث المباشر الآن</span>
            </>
          )}
        </button>
      </div>

      {/* Most Read Articles (الأكثر قراءة) */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between border-b border-neutral-200 pb-3 mb-4">
          <h3 className="text-base font-bold text-neutral-950 font-cairo flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-bbc-red" />
            الأكثر قراءة
          </h3>
          <span className="text-xs text-neutral-400 font-mono">تحديث مستمر</span>
        </div>

        <div className="space-y-4">
          {mostReadArticles.map((story) => (
            <Link
              key={story.rank}
              href={story.href}
              className="flex items-start gap-3.5 group pb-3.5 border-b border-neutral-100 last:border-0 last:pb-0"
            >
              {/* Numeric Ranking Badge */}
              <span className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-800 font-mono font-black text-lg flex items-center justify-center flex-shrink-0 group-hover:bg-bbc-red group-hover:text-white transition duration-200 shadow-2xs">
                {story.rank}
              </span>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] text-neutral-400">
                  <span className="text-bbc-red font-bold">{story.category}</span>
                  {story.viewsCount && (
                    <span className="flex items-center gap-1 font-mono">
                      <Eye className="w-3 h-3" /> {story.viewsCount}
                    </span>
                  )}
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-bbc-red transition line-clamp-2 leading-snug font-cairo">
                  {story.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Interactive Poll */}
      <InteractivePoll />

      {/* Related Stories (أخبار ذات صلة) */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs">
        <h3 className="text-base font-bold text-neutral-950 font-cairo mb-4 border-b border-neutral-200 pb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          أخبار وتقارير ذات صلة
        </h3>

        <div className="space-y-4">
          {relatedArticles.map((story) => (
            <Link
              key={story.id}
              href={story.href}
              className="block group space-y-2 pb-3.5 border-b border-neutral-100 last:border-0 last:pb-0"
            >
              <div className="flex items-center justify-between text-[11px] text-neutral-500">
                <span className="font-bold text-bbc-red">{story.category}</span>
                {story.renderMode && (
                  <RenderModeBadge mode={story.renderMode} size="sm" />
                )}
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-bbc-red transition line-clamp-2 leading-snug font-cairo">
                {story.title}
              </h4>
              <span className="text-[11px] text-neutral-400 font-mono block">
                {story.timeAgo}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
