'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Globe,
  ChevronDown,
  Check
} from 'lucide-react';
import RenderComparisonModal from './RenderComparisonModal';
import { useLanguage, Language } from '@/context/LanguageContext';

export default function Header() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [comparisonModalOpen, setComparisonModalOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Format Date according to current active language
    const date = new Date();
    const locale = language === 'ar' ? 'ar-EG' : 'en-US';
    const formatter = new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setCurrentDate(formatter.format(date));
  }, [language]);

  // Close language dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: t('header.nav.home', 'common'), href: '/' },
    { label: t('header.nav.sports', 'common'), href: '/articles/c3r0eyydnwgo', badge: t('header.badges.gsr', 'common') },
    { label: t('header.nav.premierLeague', 'common'), href: '/articles/isr-premier-league', badge: t('header.badges.isr', 'common') },
    { label: t('header.nav.breaking', 'common'), href: '/articles/ssr-breaking-news', badge: t('header.badges.ssr', 'common') },
    { label: t('header.nav.liveMatch', 'common'), href: '/articles/csr-live-match', badge: t('header.badges.csr', 'common'), live: true },
    { label: t('header.nav.streamLab', 'common'), href: '/stream-tester', badge: t('header.badges.streamLab', 'common') },
    { label: t('header.nav.renderingGuide', 'common'), href: '/compare' },
  ];

  const languagesList: { code: Language; name: string; nativeName: string; flag: string }[] = [
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-bbc-black text-white shadow-md">
        {/* Top Mini Bar */}
        <div className="bg-[#0b0b0b] border-b border-neutral-800 text-xs py-1.5 px-4 hidden md:block">
          <div className="bbc-container flex items-center justify-between text-neutral-400">
            <div className="flex items-center gap-4">
              <span>{currentDate}</span>
              <span className="text-neutral-600">|</span>
              <span className="flex items-center gap-1.5 text-red-400 font-medium">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
                {t('header.topBarLive', 'common')}
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Language Selector Dropdown */}
              <div className="relative" ref={langDropdownRef}>
                <button
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="flex items-center gap-1.5 text-xs text-neutral-200 hover:text-white font-medium px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 transition"
                  aria-label={t('header.language.select', 'common')}
                >
                  <Globe className="w-3.5 h-3.5 text-bbc-red" />
                  <span>{language === 'ar' ? 'العربية' : 'English'}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {langDropdownOpen && (
                  <div className={`absolute top-full mt-1.5 w-36 bg-neutral-900 border border-neutral-700 rounded-lg shadow-xl py-1 z-50 animate-fadeIn ${language === 'ar' ? 'left-0' : 'right-0'}`}>
                    <div className="px-3 py-1 text-[10px] font-bold text-neutral-500 uppercase tracking-wider border-b border-neutral-800">
                      {t('header.language.select', 'common')}
                    </div>
                    {languagesList.map((lang) => {
                      const isSelected = language === lang.code;
                      return (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setLangDropdownOpen(false);
                          }}
                          className={`w-full text-left ltr:text-left rtl:text-right px-3 py-2 text-xs flex items-center justify-between transition ${
                            isSelected 
                              ? 'bg-bbc-red/20 text-bbc-red font-bold' 
                              : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span>{lang.flag}</span>
                            <span>{lang.nativeName}</span>
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-bbc-red" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <span className="text-neutral-600">|</span>

              <button
                onClick={() => setComparisonModalOpen(true)}
                className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-semibold px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800/60 transition"
              >
                <Layers className="w-3.5 h-3.5" />
                {t('header.compareModalBtn', 'common')}
              </button>

              <div className="flex items-center gap-2 text-neutral-300">
                <Link href="/articles/csr-live-match" className="hover:text-white flex items-center gap-1 text-xs">
                  <Radio className="w-3 h-3 text-red-500" />
                  {t('header.radio', 'common')}
                </Link>
                <span className="text-neutral-600">•</span>
                <Link href="/articles/ssr-breaking-news" className="hover:text-white flex items-center gap-1 text-xs">
                  <Tv className="w-3 h-3 text-red-500" />
                  {t('header.tv', 'common')}
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
                <div className="flex flex-col ltr:ml-2 rtl:mr-2">
                  <span className="text-lg sm:text-xl font-bold font-cairo tracking-tight text-white leading-none">
                    NEWS <span className="text-bbc-red font-black">{language === 'ar' ? 'عربي' : 'English'}</span>
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
              {/* Language Toggle Button (Mobile/Tablet visible) */}
              <button
                onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                className="flex lg:hidden items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition"
              >
                <Globe className="w-3.5 h-3.5 text-bbc-red" />
                <span>{language === 'ar' ? 'EN' : 'عربي'}</span>
              </button>

              <button
                onClick={() => setComparisonModalOpen(true)}
                className="hidden sm:flex lg:hidden items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition"
              >
                <Layers className="w-4 h-4 text-amber-400" />
                <span>{t('header.quickCompare', 'common')}</span>
              </button>

              <Link
                href="/compare"
                className="hidden sm:flex items-center gap-1.5 bg-bbc-red hover:bg-bbc-darkred text-white text-xs sm:text-sm font-bold px-3 py-2 rounded transition shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t('header.quickCompare', 'common')}</span>
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
          <div className="lg:hidden bg-neutral-900 border-b border-neutral-800 px-4 py-4 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="text-xs text-neutral-400 font-mono">{currentDate}</div>
              
              {/* Mobile Language Switcher */}
              <div className="flex items-center gap-1 bg-neutral-800 p-1 rounded-lg border border-neutral-700">
                {languagesList.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                    }}
                    className={`px-2.5 py-1 text-xs rounded-md font-bold transition flex items-center gap-1 ${
                      language === lang.code
                        ? 'bg-bbc-red text-white shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.nativeName}</span>
                  </button>
                ))}
              </div>
            </div>

            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded text-sm ${
                    isActive
                      ? 'bg-neutral-800 text-white font-bold border-r-4 rtl:border-r-4 ltr:border-l-4 border-bbc-red'
                      : 'text-neutral-300 hover:bg-neutral-800/60 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {link.label}
                    {link.live && (
                      <span className="bg-red-500/20 text-red-400 text-[10px] px-1.5 py-0.5 rounded font-bold">
                        {t('header.badges.live', 'common')}
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
                {t('header.compareModalBtn', 'common')}
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
