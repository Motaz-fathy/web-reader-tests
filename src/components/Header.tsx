'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  Search, 
  Radio, 
  Tv, 
  Sparkles, 
  Layers, 
  ExternalLink,
  Flame
} from 'lucide-react';
import RenderComparisonModal from './RenderComparisonModal';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [comparisonModalOpen, setComparisonModalOpen] = useState(false);

  useEffect(() => {
    // Format Arabic Date
    const date = new Date();
    const formatter = new Intl.DateTimeFormat('ar-EG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setCurrentDate(formatter.format(date));
  }, []);

  const navLinks = [
    { label: 'الرئيسية', href: '/' },
    { label: 'رياضة (GSR)', href: '/articles/c3r0eyydnwgo', badge: 'GSR / ثابت' },
    { label: 'تحليل البريميرليغ (ISR)', href: '/articles/isr-premier-league', badge: 'ISR / مجدد' },
    { label: 'عاجل (SSR)', href: '/articles/ssr-breaking-news', badge: 'SSR / خادمي' },
    { label: 'تغطية حية (CSR)', href: '/articles/csr-live-match', badge: 'CSR / عميل', live: true },
    { label: 'مختبر الاستريم', href: '/stream-tester', badge: 'Stream Lab' },
    { label: 'دليل أنماط الرندرة', href: '/compare' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-bbc-black text-white shadow-md">
        {/* Top Mini Bar */}
        <div className="bg-[#0b0b0b] border-b border-neutral-800 text-xs py-1.5 px-4 hidden md:block">
          <div className="bbc-container flex items-center justify-between text-neutral-400">
            <div className="flex items-center gap-4">
              <span>{currentDate || 'الأربعاء 19 أغسطس 2026'}</span>
              <span className="text-neutral-600">|</span>
              <span className="flex items-center gap-1.5 text-red-400 font-medium">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
                بث مباشر وتغطية تفاعلية
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setComparisonModalOpen(true)}
                className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-semibold px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800/60 transition"
              >
                <Layers className="w-3.5 h-3.5" />
                مقارنة أنماط الرندرة (GSR/ISR/SSR/CSR)
              </button>

              <div className="flex items-center gap-2 text-neutral-300">
                <Link href="/articles/csr-live-match" className="hover:text-white flex items-center gap-1 text-xs">
                  <Radio className="w-3 h-3 text-red-500" />
                  راديو بي بي سي
                </Link>
                <span className="text-neutral-600">•</span>
                <Link href="/articles/ssr-breaking-news" className="hover:text-white flex items-center gap-1 text-xs">
                  <Tv className="w-3 h-3 text-red-500" />
                  تلفزيون بي بي سي
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header Bar */}
        <div className="border-b border-neutral-800">
          <div className="bbc-container flex items-center justify-between h-16 sm:h-20">
            {/* BBC Logo */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-1">
                {/* BBC 3 Iconic Square Blocks */}
                <div className="flex gap-1">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white text-bbc-black font-extrabold flex items-center justify-center text-base sm:text-lg font-mono">
                    B
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white text-bbc-black font-extrabold flex items-center justify-center text-base sm:text-lg font-mono">
                    B
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white text-bbc-black font-extrabold flex items-center justify-center text-base sm:text-lg font-mono">
                    C
                  </div>
                </div>
                <div className="flex flex-col mr-2">
                  <span className="text-lg sm:text-xl font-bold font-cairo tracking-tight text-white leading-none">
                    NEWS <span className="text-bbc-red font-black">عربي</span>
                  </span>
                  <span className="text-[10px] text-neutral-400 font-mono tracking-widest leading-none mt-1">
                    RENDERING SHOWCASE
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3 py-2 rounded-sm transition flex items-center gap-1.5 ${
                      isActive
                        ? 'text-white font-bold bg-neutral-900 border-b-2 border-bbc-red'
                        : 'text-neutral-300 hover:text-white hover:bg-neutral-900/60'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.live && (
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setComparisonModalOpen(true)}
                className="hidden sm:flex lg:hidden items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition"
              >
                <Layers className="w-4 h-4 text-amber-400" />
                <span>الأنماط</span>
              </button>

              <Link
                href="/compare"
                className="hidden sm:flex items-center gap-1.5 bg-bbc-red hover:bg-bbc-darkred text-white text-xs sm:text-sm font-bold px-3 py-2 rounded transition shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span>مقارنة Next.js</span>
              </Link>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded text-neutral-300 hover:text-white hover:bg-neutral-800 transition"
                aria-label="القائمة الرئيسية"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-neutral-900 border-b border-neutral-800 px-4 py-4 space-y-2 animate-fadeIn">
            <div className="text-xs text-neutral-400 mb-2 font-mono">{currentDate}</div>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded text-sm ${
                    isActive
                      ? 'bg-neutral-800 text-white font-bold border-r-4 border-bbc-red'
                      : 'text-neutral-300 hover:bg-neutral-800/60 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {link.label}
                    {link.live && (
                      <span className="bg-red-500/20 text-red-400 text-[10px] px-1.5 py-0.5 rounded font-bold">
                        مباشر
                      </span>
                    )}
                  </span>
                  {link.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 font-mono">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="pt-3 mt-3 border-t border-neutral-800">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setComparisonModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded bg-amber-950/80 border border-amber-700/60 text-amber-300 text-sm font-bold"
              >
                <Layers className="w-4 h-4" />
                عرض مقارنة أنماط الرندرة (GSR / ISR / SSR / CSR)
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Comparison Modal */}
      <RenderComparisonModal
        isOpen={comparisonModalOpen}
        onClose={() => setComparisonModalOpen(false)}
      />
    </>
  );
}
