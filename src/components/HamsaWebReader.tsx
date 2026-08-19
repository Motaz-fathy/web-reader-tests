"use client";

import React, { useEffect, Suspense } from "react";
import Script from "next/script";
import { useSearchParams } from "next/navigation";

interface HamsaWebReaderProps {
  projectId?: string;
  baseUrl?: string;
  apiUrl?: string;
  placement?: "floating" | "inline";
  theme?: "dark" | "light";
  language?: string;
  uiLanguage?: string;
  className?: string;
}

function HamsaWebReaderContent({
  projectId = "a5314154-eb11-429e-9b0f-6cfaf459e671",
  baseUrl = "http://localhost:5173",
  apiUrl = "https://api-dev.tryhamsa.com",
  placement = "floating",
  theme = "dark",
  language = "EGY",
  uiLanguage = "ar",
  className = "",
}: HamsaWebReaderProps) {
  const searchParams = useSearchParams();

  // Allow URL query params override for testing: ?projectId=...&apiUrl=...&baseUrl=...
  const activeProjectId = searchParams.get("projectId") || projectId;
  const activeApiUrl = searchParams.get("apiUrl") || apiUrl;
  const activeBaseUrl = searchParams.get("baseUrl") || baseUrl;
  const activeTheme = (searchParams.get("theme") as "dark" | "light") || theme;

  // Re-trigger initialization on client-side navigation if Hamsa SDK exposes init/scan
  useEffect(() => {
    if (typeof window !== "undefined") {
      const win = window as any;
      if (typeof win.HamsaWebReader?.init === "function") {
        try {
          win.HamsaWebReader.init();
        } catch (err) {
          console.warn("HamsaWebReader re-init:", err);
        }
      }
    }
  }, [activeProjectId, activeApiUrl, placement]);

  return (
    <>
      <div
        key={`${activeProjectId}-${activeApiUrl}`}
        {...{ "hamsa-webreader": "" }}
        data-projectid={activeProjectId}
        data-base-url={activeBaseUrl}
        data-api-url={activeApiUrl}
        data-placement={placement}
        data-theme={activeTheme}
        data-language={language}
        data-ui-language={uiLanguage}
        className={className}
      />
      <Script
        src={`${activeBaseUrl}/webreader.js`}
        strategy="afterInteractive"
      />
    </>
  );
}

export default function HamsaWebReader(props: HamsaWebReaderProps) {
  return (
    <Suspense fallback={null}>
      <HamsaWebReaderContent {...props} />
    </Suspense>
  );
}
