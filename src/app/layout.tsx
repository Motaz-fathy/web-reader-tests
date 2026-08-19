import type { Metadata } from "next";
import { Cairo, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import BreakingNewsTicker from "@/components/BreakingNewsTicker";
import Footer from "@/components/Footer";
import HamsaWebReader from "@/components/HamsaWebReader";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | BBC News عربي - منصة عروض التقديم Next.js",
    default: "BBC News عربي | منصة عروض أنماط الرندرة الحديثة في Next.js 14",
  },
  description:
    "منصة إخبارية استعراضية متطورة توضح الفروقات العملية والتقنية بين أنماط التقديم (GSR, ISR, SSR, CSR) في Next.js 14 App Router مع تجربة قراءة تفاعلية ومحاكاة حية للأخبار الرياضية والعاجلة.",
  keywords: [
    "BBC Arabic",
    "Next.js 14",
    "GSR",
    "ISR",
    "SSR",
    "CSR",
    "الدوري الإنجليزي",
    "تقنية الفيديو VAR",
    "Web Reader",
    "رندرة",
  ],
  authors: [{ name: "BBC News Arabic Tech Showcase Team" }],
  metadataBase: new URL("http://localhost:3005"),
  openGraph: {
    title: "BBC News عربي | منصة عروض أنماط الرندرة في Next.js 14",
    description:
      "استكشف كيف تعمل أنماط التقديم الأربعة (GSR, ISR, SSR, CSR) في بيئة إنتاجية إخبارية فائقة السرعة.",
    url: "http://localhost:3005",
    siteName: "BBC News عربي - Tech Showcase",
    locale: "ar_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BBC News عربي | Next.js 14 Rendering Showcase",
    description: "تطبيق عملي لأنماط الرندرة GSR, ISR, SSR, CSR في Next.js 14",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${ibmPlexArabic.variable}`}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-bbc-black selection:bg-bbc-red selection:text-white">
        <Header />
        <BreakingNewsTicker />
        <main className="flex-1">{children}</main>
        <Footer />
        <HamsaWebReader
          projectId="a5314154-eb11-429e-9b0f-6cfaf459e671"
          apiUrl="https://api-dev.tryhamsa.com"
          placement="floating"
          theme="dark"
          language="EGY"
          uiLanguage="ar"
        />
      </body>
    </html>
  );
}
