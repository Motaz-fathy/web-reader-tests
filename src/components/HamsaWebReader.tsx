'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';

interface HamsaWebReaderProps {
  projectId?: string;
  baseUrl?: string;
  apiUrl?: string;
  placement?: 'floating' | 'inline';
  theme?: 'dark' | 'light';
  language?: string;
  uiLanguage?: string;
  className?: string;
}

export default function HamsaWebReader({
  projectId = 'bd235378-cd9d-4d27-97c6-e3b93aae3110',
  baseUrl = 'http://localhost:5173',
  apiUrl = 'https://api-dev.tryhamsa.com',
  placement = 'floating',
  theme = 'dark',
  language = 'EGY',
  uiLanguage = 'ar',
  className = '',
}: HamsaWebReaderProps) {
  // Re-trigger initialization on client-side navigation if Hamsa SDK exposes init/scan
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const win = window as any;
      if (typeof win.HamsaWebReader?.init === 'function') {
        try {
          win.HamsaWebReader.init();
        } catch (err) {
          console.warn('HamsaWebReader re-init:', err);
        }
      }
    }
  }, [placement]);

  return (
    <>
      <div
        {...{ 'hamsa-webreader': '' }}
        data-projectid={projectId}
        data-base-url={baseUrl}
        data-api-url={apiUrl}
        data-placement={placement}
        data-theme={theme}
        data-language={language}
        data-ui-language={uiLanguage}
        className={className}
      />
      <Script
        src={`${baseUrl}/webreader.js`}
        strategy="afterInteractive"
      />
    </>
  );
}
