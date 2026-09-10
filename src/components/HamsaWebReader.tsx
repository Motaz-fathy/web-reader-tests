"use client";

import React, { useEffect, Suspense } from "react";
import Script from "next/script";
import { useSearchParams, usePathname } from "next/navigation";

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

const DEFAULT_PROJECT_ID = "a5314154-eb11-429e-9b0f-6cfaf459e671";
const DEFAULT_API_URL =
  process.env.NEXT_PUBLIC_HAMSA_API_URL ||
  "https://facial-broken-walked-competitors.trycloudflare.com/api";

const DEFAULT_BASE_URL =
  process.env.NEXT_PUBLIC_HAMSA_BASE_URL ||
  "https://facial-broken-walked-competitors.trycloudflare.com";

const SCRIPT_URL =
  "https://facial-broken-walked-competitors.trycloudflare.com/webreader.js";

import { useLanguage } from "@/context/LanguageContext";

function HamsaWebReaderContent({
  projectId = DEFAULT_PROJECT_ID,
  baseUrl = DEFAULT_BASE_URL,
  apiUrl = DEFAULT_API_URL,
  placement = "floating",
  theme = "dark",
  language,
  uiLanguage,
  className = "",
}: HamsaWebReaderProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  let currentSiteLang = "ar";
  try {
    const langCtx = useLanguage();
    currentSiteLang = langCtx.language;
  } catch {
    // fallback if context not present
  }

  const activeUiLang = uiLanguage || currentSiteLang;
  const activeLang = language || (currentSiteLang === "en" ? "EN" : "EGY");

  const activeProjectId = searchParams.get("projectId") || projectId;
  const activeApiUrl = searchParams.get("apiUrl") || apiUrl;
  const activeBaseUrl = searchParams.get("baseUrl") || baseUrl;
  const activeTheme = (searchParams.get("theme") as "dark" | "light") || theme;
  const activePlacement =
    (searchParams.get("placement") as "floating" | "inline") || placement;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const win = window as any;
      const reinit =
        win.HamsaWebReader?.reinit ||
        win.HamsaWebReader?.init ||
        win.__hamsaWebReaderMount;
      if (typeof reinit === "function") {
        try {
          reinit();
        } catch (err) {
          console.warn("HamsaWebReader re-init:", err);
        }
      }
    }
  }, [pathname, activeProjectId, activeApiUrl, activeBaseUrl, activePlacement, activeUiLang, activeLang]);

  return (
    <>
      <div
        key={`${pathname}-${activeProjectId}-${activeApiUrl}-${activeBaseUrl}-${activePlacement}-${activeUiLang}`}
        {...{ "hamsa-webreader": "" }}
        data-projectid={activeProjectId}
        data-base-url={activeBaseUrl}
        data-api-url={activeApiUrl}
        data-placement={activePlacement}
        data-theme={activeTheme}
        data-language={activeLang}
        data-ui-language={activeUiLang}
        className={className}
      />
      <Script src={`${activeBaseUrl}/webreader.js`} strategy="afterInteractive" />
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
