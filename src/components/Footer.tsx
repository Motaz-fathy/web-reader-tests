import React from 'react';
import Link from 'next/link';
import { Layers, ShieldCheck, Zap, Globe, Github } from 'lucide-react';

export default function Footer() {
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
              <span className="mr-2 font-bold text-white text-base font-cairo">NEWS عربي</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              تطبيق استعراضي متقدم لمعمارية Next.js 14 App Router يقدم تحليلاً حياً ومقارنة تفصيلية بين استراتيجيات التقديم الأربع (GSR, ISR, SSR, CSR) في المواقع الإخبارية الكبرى.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 p-2 rounded">
              <Zap className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>جاهز للعمل على Next.js 14 App Router & Edge CDN</span>
            </div>
          </div>

          {/* Column 2: Rendering Demos */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4 border-b border-neutral-800 pb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-bbc-red" />
              نماذج الرندرة التفاعلية
            </h3>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link
                  href="/articles/c3r0eyydnwgo"
                  className="hover:text-white flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-[-2px] transition">مقال الـ VAR التحكيمي</span>
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
                  <span className="group-hover:translate-x-[-2px] transition">تقرير البريميرليغ المجدد</span>
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
                  <span className="group-hover:translate-x-[-2px] transition">مؤتمر الأخبار العاجلة</span>
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
                  <span className="group-hover:translate-x-[-2px] transition">تغطية ديربي لندن المباشرة</span>
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
                  <span>دليل مقارنة الأنماط الشامل ←</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: News Sections */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4 border-b border-neutral-800 pb-2">
              أقسام الموقع الإخباري
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs text-neutral-400">
              <Link href="/" className="hover:text-white transition">الرئيسية</Link>
              <Link href="/articles/c3r0eyydnwgo" className="hover:text-white transition">رياضة بريميرليغ</Link>
              <Link href="/articles/ssr-breaking-news" className="hover:text-white transition">أخبار عاجلة</Link>
              <Link href="/articles/csr-live-match" className="hover:text-white transition">تغطيات مباشرة</Link>
              <Link href="/compare" className="hover:text-white transition">علوم وتكنولوجيا</Link>
              <Link href="/compare" className="hover:text-white transition">تقارير وتحليلات</Link>
              <Link href="/" className="hover:text-white transition">بودكاست وصوتيات</Link>
              <Link href="/" className="hover:text-white transition">مرئيات وإنفوجرافيك</Link>
            </div>
          </div>

          {/* Column 4: Architecture & Trust */}
          <div>
            <h3 className="text-white font-bold text-sm mb-4 border-b border-neutral-800 pb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              المعايير التقنية والمصداقية
            </h3>
            <p className="text-xs text-neutral-400 mb-3 leading-relaxed">
              هيئة الإذاعة البريطانية تلتزم بأعلى معايير الدقة والنزاهة الإخبارية وسرعة إيصال المعلومة عبر أحدث البنى التحتية السحابية.
            </p>
            <div className="text-[11px] text-neutral-500 space-y-1">
              <p>• سرعة التحميل الأولى (TTFB) محسنة لكل نمط</p>
              <p>• توافق تام مع معايير الوصول (Accessibility WCAG)</p>
              <p>• دعم كامل للقراءة بالاتجاه من اليمين إلى اليسار (RTL)</p>
            </div>
          </div>
        </div>

        {/* Bottom Legal Notice */}
        <div className="pt-8 border-t border-neutral-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <span className="hover:text-neutral-400 transition cursor-pointer">شروط الاستخدام</span>
            <span className="hover:text-neutral-400 transition cursor-pointer">عن بي بي سي</span>
            <span className="hover:text-neutral-400 transition cursor-pointer">سياسة الخصوصية</span>
            <span className="hover:text-neutral-400 transition cursor-pointer">ملفات تعريف الارتباط (Cookies)</span>
            <span className="hover:text-neutral-400 transition cursor-pointer">تواصل مع بي بي سي</span>
          </div>

          <div className="text-center md:text-left font-mono text-[11px]">
            © {new Date().getFullYear()} BBC. هيئة الإذاعة البريطانية ليست مسؤولة عن محتوى المواقع الخارجية.
          </div>
        </div>
      </div>
    </footer>
  );
}
