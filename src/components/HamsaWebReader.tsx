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
  process.env.NEXT_PUBLIC_HAMSA_API_URL || "https://api-dev.tryhamsa.com";
const DEFAULT_BASE_URL =
  process.env.NEXT_PUBLIC_HAMSA_BASE_URL ||
  (typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1")
    ? "https://media-dev.tryhamsa.com"
    : "https://media-dev.tryhamsa.com");

function HamsaWebReaderContent({
  projectId = DEFAULT_PROJECT_ID,
  baseUrl = DEFAULT_BASE_URL,
  apiUrl = DEFAULT_API_URL,
  placement = "floating",
  theme = "dark",
  language = "EGY",
  uiLanguage = "ar",
  className = "",
}: HamsaWebReaderProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Allow URL query params override for easy testing on any environment:
  // ?projectId=...&apiUrl=...&baseUrl=...&theme=...
  const activeProjectId = searchParams.get("projectId") || projectId;
  const activeApiUrl = searchParams.get("apiUrl") || apiUrl;
  const activeBaseUrl = searchParams.get("baseUrl") || baseUrl;
  const activeTheme = (searchParams.get("theme") as "dark" | "light") || theme;
  const activePlacement =
    (searchParams.get("placement") as "floating" | "inline") || placement;

  // Re-trigger initialization on client-side navigation or param changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const win = window as any;
      const reinit = win.HamsaWebReader?.reinit || win.HamsaWebReader?.init || win.__hamsaWebReaderMount;
      if (typeof reinit === "function") {
        try {
          reinit();
        } catch (err) {
          console.warn("HamsaWebReader re-init:", err);
        }
      }
    }
  }, [pathname, activeProjectId, activeApiUrl, activeBaseUrl, activePlacement]);

  return (
    <>
      <div
        key={`${pathname}-${activeProjectId}-${activeApiUrl}-${activeBaseUrl}-${activePlacement}`}
        {...{ "hamsa-webreader": "" }}
        data-projectid={activeProjectId}
        data-base-url={activeBaseUrl}
        data-api-url={activeApiUrl}
        data-placement={activePlacement}
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
