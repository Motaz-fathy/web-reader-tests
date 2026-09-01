'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Pre-imported JSON translation bundles for instant zero-lag rendering
import arCommon from '../../public/ar/common.json';
import arHome from '../../public/ar/home.json';
import arArticle from '../../public/ar/article.json';
import arCompare from '../../public/ar/compare.json';
import arStreamTester from '../../public/ar/streamTester.json';
import arCategory from '../../public/ar/category.json';

import enCommon from '../../public/en/common.json';
import enHome from '../../public/en/home.json';
import enArticle from '../../public/en/article.json';
import enCompare from '../../public/en/compare.json';
import enStreamTester from '../../public/en/streamTester.json';
import enCategory from '../../public/en/category.json';

export type Language = 'ar' | 'en';
export type Direction = 'rtl' | 'ltr';

const translationsMap: Record<Language, Record<string, any>> = {
  ar: {
    common: arCommon,
    home: arHome,
    article: arArticle,
    compare: arCompare,
    streamTester: arStreamTester,
    category: arCategory,
  },
  en: {
    common: enCommon,
    home: enHome,
    article: enArticle,
    compare: enCompare,
    streamTester: enStreamTester,
    category: enCategory,
  },
};

interface LanguageContextType {
  language: Language;
  dir: Direction;
  setLanguage: (lang: Language) => void;
  t: (key: string, ns?: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'hamsa_bbc_lang';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ar');

  useEffect(() => {
    // Check saved language preference in localStorage
    const savedLang = localStorage.getItem(LOCAL_STORAGE_KEY) as Language | null;
    if (savedLang === 'ar' || savedLang === 'en') {
      setLanguageState(savedLang);
    }
  }, []);

  useEffect(() => {
    // Update HTML attributes for document lang and dir
    const root = document.documentElement;
    const isAr = language === 'ar';
    root.setAttribute('lang', language);
    root.setAttribute('dir', isAr ? 'rtl' : 'ltr');
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, lang);
    } catch {
      // Ignore quota/storage errors
    }
  };

  /**
   * Translate a key path e.g. "header.nav.home" inside a namespace e.g. "common"
   */
  const t = (
    key: string,
    ns: string = 'common',
    params?: Record<string, string | number>
  ): string => {
    const dict = translationsMap[language]?.[ns] || translationsMap['ar']?.[ns] || {};
    const keys = key.split('.');
    
    let current: any = dict;
    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        current = undefined;
        break;
      }
    }

    if (typeof current !== 'string') {
      // Fallback to key itself if not found
      return key;
    }

    let result = current;
    if (params) {
      Object.entries(params).forEach(([pKey, pVal]) => {
        result = result.replace(new RegExp(`{{\\s*${pKey}\\s*}}`, 'g'), String(pVal));
      });
    }

    return result;
  };

  const dir: Direction = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, dir, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
