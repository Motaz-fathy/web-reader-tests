'use client';

import React, { useState } from 'react';
import { VarStatistic } from '@/types';
import { BarChart3, CheckCircle, AlertTriangle, Info, TrendingUp } from 'lucide-react';

interface VarStatsWidgetProps {
  stats: VarStatistic[];
}

export default function VarStatsWidget({ stats }: VarStatsWidgetProps) {
  const [activeTab, setActiveTab] = useState<'bars' | 'cards'>('bars');

  if (!stats || stats.length === 0) return null;

  const totalInterventions = stats.reduce((acc, curr) => acc + curr.total, 0);
  const totalCorrect = stats.reduce((acc, curr) => acc + curr.correct, 0);
  const overallAccuracy = ((totalCorrect / totalInterventions) * 100).toFixed(1);

  return (
    <div className="my-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 sm:p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded bg-bbc-red/10 text-bbc-red">
              <BarChart3 className="w-5 h-5" />
            </span>
            <h3 className="text-base sm:text-lg font-bold text-neutral-900 font-cairo">
              لوحة بيانات وإحصائيات تقنية الـ VAR الرسمية
            </h3>
          </div>
          <p className="text-xs text-neutral-600 mt-1">
            بيانات لجنة الحوادث الرئيسية (KMI Panel) التابعة للدوري الإنجليزي الممتاز
          </p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => setActiveTab('bars')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
              activeTab === 'bars'
                ? 'bg-bbc-red text-white shadow-sm'
                : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
            }`}
          >
            مخطط الأعمدة
          </button>
          <button
            onClick={() => setActiveTab('cards')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
              activeTab === 'cards'
                ? 'bg-bbc-red text-white shadow-sm'
                : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
            }`}
          >
            بطاقات تفصيلية
          </button>
        </div>
      </div>

      {/* Overview Metric Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
        <div className="bg-white p-3.5 rounded-xl border border-neutral-200 shadow-sm text-center">
          <span className="text-xs text-neutral-500 block mb-1">إجمالي التدخلات</span>
          <span className="text-2xl font-black text-neutral-900 font-mono">{totalInterventions}</span>
          <span className="text-[10px] text-neutral-400 block mt-0.5">حالة محتسبة</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-neutral-200 shadow-sm text-center">
          <span className="text-xs text-neutral-500 block mb-1">القرارات الصحيحة</span>
          <span className="text-2xl font-black text-emerald-600 font-mono">{totalCorrect}</span>
          <span className="text-[10px] text-emerald-600 block mt-0.5">وفق المعايير</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-neutral-200 shadow-sm text-center">
          <span className="text-xs text-neutral-500 block mb-1">التراجع عن قرارات</span>
          <span className="text-2xl font-black text-amber-600 font-mono">{totalInterventions - totalCorrect}</span>
          <span className="text-[10px] text-amber-600 block mt-0.5">تصحيح خطأ</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-neutral-200 shadow-sm text-center">
          <span className="text-xs text-neutral-500 block mb-1">نسبة الدقة الإجمالية</span>
          <span className="text-2xl font-black text-bbc-red font-mono">{overallAccuracy}%</span>
          <span className="text-[10px] text-neutral-400 mt-0.5 flex items-center justify-center gap-0.5">
            <TrendingUp className="w-3 h-3 text-emerald-500" /> +3.4% هذا الموسم
          </span>
        </div>
      </div>

      {/* Main Content View */}
      {activeTab === 'bars' ? (
        <div className="space-y-4 bg-white p-4 sm:p-5 rounded-xl border border-neutral-200">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs sm:text-sm font-medium">
                <span className="text-neutral-800 font-bold">{stat.category}</span>
                <span className="font-mono text-neutral-600">
                  <strong className="text-neutral-900">{stat.correct}</strong> من أصل {stat.total} (
                  <span className="text-emerald-700 font-bold">{stat.percentage}%</span>)
                </span>
              </div>
              {/* Dual Progress Bar */}
              <div className="w-full h-3.5 bg-neutral-100 rounded-full overflow-hidden flex border border-neutral-200">
                <div
                  className="bg-emerald-500 h-full transition-all duration-700 rounded-r-full"
                  style={{ width: `${stat.percentage}%` }}
                  title={`صحيحة: ${stat.percentage}%`}
                />
                <div
                  className="bg-amber-400 h-full transition-all duration-700 rounded-l-full"
                  style={{ width: `${100 - stat.percentage}%` }}
                  title={`تراجع أو خطأ: ${(100 - stat.percentage).toFixed(1)}%`}
                />
              </div>
            </div>
          ))}

          <div className="flex items-center gap-4 text-xs text-neutral-500 pt-2 border-t border-neutral-100">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> قرار تم تأكيده بشكل صحيح
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" /> تم التراجع أو تصحيح القرار
            </span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-neutral-200 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-neutral-900">{stat.category}</h4>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold font-mono">
                  {stat.percentage}%
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-neutral-600">
                <span>الحالات الصحيحة: <strong>{stat.correct}</strong></span>
                <span>الحالات المعكوسة: <strong>{stat.overturned}</strong></span>
                <span>المجموع: <strong>{stat.total}</strong></span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer disclaimer */}
      <div className="mt-4 flex items-center gap-2 text-xs text-neutral-500 bg-neutral-100/80 p-2.5 rounded-lg">
        <Info className="w-4 h-4 text-neutral-500 flex-shrink-0" />
        <span>
          يتم مراجعة كافة هذه الحالات من قبل لجنة الـ KMI المستقلة عقب كل جولة وتُعتمد كمرجع رسمي للدوري الإنجليزي.
        </span>
      </div>
    </div>
  );
}
