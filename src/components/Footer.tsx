'use client';

import React from 'react';
import Link from 'next/link';
import { Layers, ShieldCheck, Zap } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-bbc-black text-neutral-300 border-t border-neutral-800 text-sm mt-16">
      {/* Top Banner Accent */}
      <div className="h-1 bg-gradient-to-r from-bbc-red via-red-600 to-amber-500"></div>

      <div className="bbc-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-1">
              <div className="w-6 h-6 bg-white text-bbc-black font-extrabold flex items-center justify-center text-sm font-mono">
                B
              </div>
              <div className="w-6 h-6 bg-white text-bbc-black font-extrabold flex items-center justify-center text-sm font-mono">
                B
              </div>
              <div className="w-6 h-6 bg-white text-bbc-black font-extrabold flex items-center justify-center text-sm font-mono">
                C
              </div>
              <span className="mx-2 font-bold text-white text-base font-cairo">
                {t('header.title', 'common')}
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {t('footer.description', 'common')}
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 p-2 rounded">
              <Zap className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{t('footer.edgeBadge', 'common')}</span>
            </div>
          </div>

          {/* Column 2: Rendering Demos */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4 border-b border-neutral-800 pb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-bbc-red" />
              {t('footer.demosTitle', 'common')}
            </h3>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link
                  href="/articles/c3r0eyydnwgo"
                  className="hover:text-white flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-[-2px] ltr:group-hover:translate-x-[2px] transition">
                    {t('footer.varArticle', 'common')}
                  </span>
                  <span className="bg-emerald-950 text-emerald-400 font-mono text-[10px] px-1.5 py-0.5 rounded border border-emerald-800">
                    GSR / SSG
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/articles/isr-premier-league"
                  className="hover:text-white flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-[-2px] ltr:group-hover:translate-x-[2px] transition">
                    {t('footer.isrReport', 'common')}
                  </span>
                  <span className="bg-purple-950 text-purple-300 font-mono text-[10px] px-1.5 py-0.5 rounded border border-purple-800">
                    ISR (30s)
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/articles/ssr-breaking-news"
                  className="hover:text-white flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-[-2px] ltr:group-hover:translate-x-[2px] transition">
                    {t('footer.ssrConference', 'common')}
                  </span>
                  <span className="bg-amber-950 text-amber-300 font-mono text-[10px] px-1.5 py-0.5 rounded border border-amber-800">
                    SSR Dynamic
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/articles/csr-live-match"
                  className="hover:text-white flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-[-2px] ltr:group-hover:translate-x-[2px] transition">
                    {t('footer.csrCoverage', 'common')}
                  </span>
                  <span className="bg-blue-950 text-blue-300 font-mono text-[10px] px-1.5 py-0.5 rounded border border-blue-800">
                    CSR Live
                  </span>
                </Link>
              </li>
              <li className="pt-1">
                <Link
                  href="/compare"
                  className="text-amber-400 hover:underline font-semibold flex items-center gap-1"
                >
                  <span>{t('footer.compareLink', 'common')}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: News Sections */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4 border-b border-neutral-800 pb-2">
              {t('footer.sectionsTitle', 'common')}
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs text-neutral-400">
              <Link href="/" className="hover:text-white transition">{t('footer.homeSection', 'common')}</Link>
              <Link href="/articles/c3r0eyydnwgo" className="hover:text-white transition">{t('footer.sportsSection', 'common')}</Link>
              <Link href="/articles/ssr-breaking-news" className="hover:text-white transition">{t('footer.breakingSection', 'common')}</Link>
              <Link href="/articles/csr-live-match" className="hover:text-white transition">{t('footer.liveSection', 'common')}</Link>
              <Link href="/compare" className="hover:text-white transition">{t('footer.techSection', 'common')}</Link>
              <Link href="/compare" className="hover:text-white transition">{t('footer.reportsSection', 'common')}</Link>
              <Link href="/" className="hover:text-white transition">{t('footer.podcastSection', 'common')}</Link>
              <Link href="/" className="hover:text-white transition">{t('footer.infographicsSection', 'common')}</Link>
            </div>
          </div>

          {/* Column 4: Architecture & Trust */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4 border-b border-neutral-800 pb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              {t('footer.trustTitle', 'common')}
            </h3>
            <p className="text-xs text-neutral-400 mb-3 leading-relaxed">
              {t('footer.trustDescription', 'common')}
            </p>
            <div className="text-[11px] text-neutral-500 space-y-1">
              <p>{t('footer.ttfbPoint', 'common')}</p>
              <p>{t('footer.a11yPoint', 'common')}</p>
              <p>{t('footer.rtlPoint', 'common')}</p>
            </div>
          </div>
        </div>

        {/* Bottom Legal Notice */}
        <div className="pt-8 border-t border-neutral-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <span className="hover:text-neutral-400 transition cursor-pointer">{t('footer.terms', 'common')}</span>
            <span className="hover:text-neutral-400 transition cursor-pointer">{t('footer.about', 'common')}</span>
            <span className="hover:text-neutral-400 transition cursor-pointer">{t('footer.privacy', 'common')}</span>
            <span className="hover:text-neutral-400 transition cursor-pointer">{t('footer.cookies', 'common')}</span>
            <span className="hover:text-neutral-400 transition cursor-pointer">{t('footer.contact', 'common')}</span>
          </div>

          <div className="text-center md:text-left font-mono text-[11px]">
            {t('footer.copyright', 'common')}
          </div>
        </div>
      </div>
    </footer>
  );
}
