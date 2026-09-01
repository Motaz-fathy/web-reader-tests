'use client';

import React from 'react';
import Link from 'next/link';
import RenderModeBadge from '@/components/RenderModeBadge';
import { useLanguage } from '@/context/LanguageContext';
import { Article } from '@/types';
import { 
  Sparkles, 
  RefreshCw, 
  Server, 
  Laptop, 
  ArrowLeft, 
  ArrowRight,
  Layers, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  TrendingUp,
  Zap,
  Radio
} from 'lucide-react';

export default function HomePage() {
  const { t, language, articlesData } = useLanguage();
  
  const articlesMap = (articlesData?.articles as unknown as Record<string, Article>) || {};
  const mainStory = articlesMap['c3r0eyydnwgo'] || {};
  const isrStory = articlesMap['isr-premier-league'] || {};
  const ssrStory = articlesMap['ssr-breaking-news'] || {};
  const csrStory = articlesMap['csr-live-match'] || {};

  const mostReadList = articlesData?.mostRead || [];

  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;
  const ChevronIcon = language === 'ar' ? ChevronLeft : ChevronRight;

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Intro Showcase Banner */}
      <section className="bg-gradient-to-b from-neutral-950 via-neutral-900 to-bbc-black text-white py-8 sm:py-12 border-b border-neutral-800">
        <div className="bbc-container space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-800 text-red-300 text-xs font-bold font-mono">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                <span>{t('hero.badge', 'home')}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-cairo leading-tight">
                {t('hero.title', 'home')}{' '}
                <span className="text-bbc-red">{t('hero.brandSpan', 'home')}</span>
              </h1>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                {t('hero.description', 'home')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href="/compare"
                className="px-5 py-3 rounded-xl bg-bbc-red hover:bg-bbc-darkred text-white text-sm font-bold transition flex items-center justify-center gap-2 shadow-lg"
              >
                <Layers className="w-4 h-4" />
                <span>{t('hero.compareBtn', 'home')}</span>
                <ArrowIcon className="w-4 h-4" />
              </Link>
              <Link
                href="/articles/csr-live-match"
                className="px-5 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-sm font-bold transition flex items-center justify-center gap-2 border border-neutral-700"
              >
                <Radio className="w-4 h-4 text-red-400 animate-pulse" />
                <span>{t('hero.liveBtn', 'home')}</span>
              </Link>
            </div>
          </div>

          {/* 4 Quick Mode Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-neutral-800/80">
            <Link
              href="/articles/c3r0eyydnwgo"
              className="p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800 hover:border-emerald-500/60 transition group space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 font-mono">1. GSR / SSG</span>
                <Sparkles className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition" />
              </div>
              <span className="text-xs font-semibold text-white block">{t('quickModes.gsrTitle', 'home')}</span>
              <span className="text-[11px] text-neutral-400 block font-mono">{t('quickModes.gsrDesc', 'home')}</span>
            </Link>

            <Link
              href="/articles/isr-premier-league"
              className="p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800 hover:border-purple-500/60 transition group space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-400 font-mono">2. ISR (30s)</span>
                <RefreshCw className="w-4 h-4 text-purple-400 group-hover:rotate-180 transition duration-500" />
              </div>
              <span className="text-xs font-semibold text-white block">{t('quickModes.isrTitle', 'home')}</span>
              <span className="text-[11px] text-neutral-400 block font-mono">{t('quickModes.isrDesc', 'home')}</span>
            </Link>

            <Link
              href="/articles/ssr-breaking-news"
              className="p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800 hover:border-amber-500/60 transition group space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 font-mono">3. SSR Dynamic</span>
                <Server className="w-4 h-4 text-amber-400 group-hover:scale-110 transition" />
              </div>
              <span className="text-xs font-semibold text-white block">{t('quickModes.ssrTitle', 'home')}</span>
              <span className="text-[11px] text-neutral-400 block font-mono">{t('quickModes.ssrDesc', 'home')}</span>
            </Link>

            <Link
              href="/articles/csr-live-match"
              className="p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800 hover:border-blue-500/60 transition group space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-400 font-mono">4. CSR Realtime</span>
                <Laptop className="w-4 h-4 text-blue-400 group-hover:scale-110 transition" />
              </div>
              <span className="text-xs font-semibold text-white block">{t('quickModes.csrTitle', 'home')}</span>
              <span className="text-[11px] text-neutral-400 block font-mono">{t('quickModes.csrDesc', 'home')}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Stories Grid */}
      <div className="bbc-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Featured Lead (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="border-b-2 border-bbc-red pb-2 flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-black font-cairo text-neutral-950">
                {t('featured.heading', 'home')}
              </h2>
              {mainStory.renderMode && <RenderModeBadge mode={mainStory.renderMode} size="sm" />}
            </div>

            {/* Featured Article Card */}
            {mainStory.title && (
              <article className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={mainStory.mainImage?.url}
                    alt={mainStory.mainImage?.alt || mainStory.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 ltr:left-3 rtl:right-3">
                    <span className="bg-bbc-red text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      {mainStory.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{t('featured.readTime', 'home', { minutes: mainStory.readingTimeMinutes || 4 })}</span>
                    <span>•</span>
                    <span>{t('featured.author', 'home', { name: mainStory.author?.name || '' })}</span>
                  </div>

                  <Link href={`/articles/${mainStory.slug}`}>
                    <h3 className="text-xl sm:text-2xl font-bold font-cairo text-neutral-950 group-hover:text-bbc-red transition leading-snug">
                      {mainStory.title}
                    </h3>
                  </Link>

                  <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3">
                    {mainStory.lead}
                  </p>

                  <div className="pt-4 flex items-center justify-between border-t border-neutral-100">
                    <Link
                      href={`/articles/${mainStory.slug}`}
                      className="inline-flex items-center gap-1.5 text-bbc-red hover:text-bbc-darkred font-bold text-sm"
                    >
                      <span>{t('featured.readFull', 'home')}</span>
                      <ChevronIcon className="w-4 h-4" />
                    </Link>

                    {mainStory.renderMode && <RenderModeBadge mode={mainStory.renderMode} size="sm" />}
                  </div>
                </div>
              </article>
            )}

            {/* Other 3 Mode Cards Grid */}
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-bold font-cairo text-neutral-950 border-b border-neutral-200 pb-2">
                {t('remaining.heading', 'home')}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* ISR Card */}
                {isrStory.title && (
                  <Link
                    href={`/articles/${isrStory.slug}`}
                    className="bg-white p-4 rounded-xl border border-neutral-200 hover:border-purple-500 hover:shadow-md transition space-y-2.5 flex flex-col justify-between group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-purple-700">{t('remaining.isrBadge', 'home')}</span>
                        <RenderModeBadge mode="ISR" size="sm" showIcon={false} />
                      </div>
                      <h4 className="font-bold text-sm text-neutral-900 group-hover:text-purple-700 transition line-clamp-2 font-cairo">
                        {isrStory.title}
                      </h4>
                      <p className="text-xs text-neutral-600 line-clamp-2">{isrStory.lead}</p>
                    </div>
                    <span className="text-xs text-purple-600 font-bold flex items-center gap-1 pt-2 border-t border-neutral-100">
                      {t('remaining.isrLink', 'home')}
                    </span>
                  </Link>
                )}

                {/* SSR Card */}
                {ssrStory.title && (
                  <Link
                    href={`/articles/${ssrStory.slug}`}
                    className="bg-white p-4 rounded-xl border border-neutral-200 hover:border-amber-500 hover:shadow-md transition space-y-2.5 flex flex-col justify-between group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-700">{t('remaining.ssrBadge', 'home')}</span>
                        <RenderModeBadge mode="SSR" size="sm" showIcon={false} />
                      </div>
                      <h4 className="font-bold text-sm text-neutral-900 group-hover:text-amber-700 transition line-clamp-2 font-cairo">
                        {ssrStory.title}
                      </h4>
                      <p className="text-xs text-neutral-600 line-clamp-2">{ssrStory.lead}</p>
                    </div>
                    <span className="text-xs text-amber-600 font-bold flex items-center gap-1 pt-2 border-t border-neutral-100">
                      {t('remaining.ssrLink', 'home')}
                    </span>
                  </Link>
                )}

                {/* CSR Card */}
                {csrStory.title && (
                  <Link
                    href={`/articles/${csrStory.slug}`}
                    className="bg-white p-4 rounded-xl border border-neutral-200 hover:border-blue-500 hover:shadow-md transition space-y-2.5 flex flex-col justify-between group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-700">{t('remaining.csrBadge', 'home')}</span>
                        <RenderModeBadge mode="CSR" size="sm" showIcon={false} />
                      </div>
                      <h4 className="font-bold text-sm text-neutral-900 group-hover:text-blue-700 transition line-clamp-2 font-cairo">
                        {csrStory.title}
                      </h4>
                      <p className="text-xs text-neutral-600 line-clamp-2">{csrStory.lead}</p>
                    </div>
                    <span className="text-xs text-blue-600 font-bold flex items-center gap-1 pt-2 border-t border-neutral-100">
                      {t('remaining.csrLink', 'home')}
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Most Read Box */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3 mb-4">
                <h3 className="text-base font-bold text-neutral-950 font-cairo flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-bbc-red" />
                  {t('sidebar.mostRead', 'home')}
                </h3>
              </div>

              <div className="space-y-4">
                {mostReadList.map((story) => (
                  <Link
                    key={story.rank}
                    href={story.href}
                    className="flex items-start gap-3.5 group pb-3.5 border-b border-neutral-100 last:border-0 last:pb-0"
                  >
                    <span className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-800 font-mono font-black text-base flex items-center justify-center flex-shrink-0 group-hover:bg-bbc-red group-hover:text-white transition duration-200">
                      {story.rank}
                    </span>
                    <div className="space-y-1">
                      <span className="text-[11px] text-bbc-red font-bold">{story.category}</span>
                      <h4 className="text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-bbc-red transition line-clamp-2 font-cairo leading-snug">
                        {story.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Education Card */}
            <div className="rounded-2xl bg-neutral-950 text-white p-5 border border-neutral-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                <Zap className="w-4 h-4" />
                <span>{t('sidebar.quickFact', 'home')}</span>
              </div>
              <h4 className="font-bold text-sm font-cairo leading-snug">
                {t('sidebar.factQuestion', 'home')}
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {t('sidebar.factAnswer', 'home')}
              </p>
              <Link
                href="/compare"
                className="inline-block text-xs text-amber-400 hover:underline font-semibold"
              >
                {t('sidebar.readDetailed', 'home')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
