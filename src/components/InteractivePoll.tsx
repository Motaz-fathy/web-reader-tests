'use client';

import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, ThumbsUp, Users, Check } from 'lucide-react';

export default function InteractivePoll() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const initialOptions = [
    { id: 1, text: 'نعم، القرارات أصبحت أكثر عدالة وشفافية', votes: 1420 },
    { id: 2, text: 'لا، التوقفات الطويلة أفسدت متعة وحماس المباريات', votes: 1890 },
    { id: 3, text: 'تطبيق التسلل شبه الآلي سيحل المشكلة ويسرع اللعب', votes: 850 },
  ];

  const [options, setOptions] = useState(initialOptions);

  const totalVotes = options.reduce((acc, opt) => acc + opt.votes, 0) + (hasVoted ? 1 : 0);

  const handleVote = (id: number) => {
    if (hasVoted) return;
    setSelectedOption(id);
    setHasVoted(true);
    setOptions((prev) =>
      prev.map((opt) => (opt.id === id ? { ...opt, votes: opt.votes + 1 } : opt))
    );
  };

  return (
    <div className="my-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="p-1 rounded bg-bbc-red/10 text-bbc-red">
          <HelpCircle className="w-4 h-4" />
        </span>
        <span className="text-xs font-bold text-bbc-red font-cairo">استطلاع رأي القراء</span>
      </div>

      <h4 className="font-bold text-sm sm:text-base text-neutral-900 mb-4 font-cairo leading-snug">
        هل تؤيد نشر تقييمات حكام الـ VAR علناً بعد كل جولة في الدوري الإنجليزي؟
      </h4>

      <div className="space-y-2.5">
        {options.map((option) => {
          const percentage = ((option.votes / totalVotes) * 100).toFixed(1);
          const isSelected = selectedOption === option.id;

          return (
            <button
              key={option.id}
              onClick={() => handleVote(option.id)}
              disabled={hasVoted}
              className={`w-full text-right p-3 rounded-xl border transition-all relative overflow-hidden text-xs sm:text-sm font-medium ${
                hasVoted
                  ? isSelected
                    ? 'border-bbc-red bg-red-50 text-neutral-900 font-bold'
                    : 'border-neutral-200 bg-white text-neutral-700'
                  : 'border-neutral-200 bg-white hover:border-bbc-red hover:bg-neutral-50 text-neutral-800'
              }`}
            >
              {/* Background Percentage Fill when voted */}
              {hasVoted && (
                <div
                  className={`absolute inset-y-0 right-0 opacity-15 transition-all duration-700 ${
                    isSelected ? 'bg-bbc-red' : 'bg-neutral-500'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              )}

              <div className="relative flex items-center justify-between z-10">
                <span className="flex items-center gap-2">
                  {isSelected && <Check className="w-4 h-4 text-bbc-red flex-shrink-0" />}
                  <span>{option.text}</span>
                </span>
                {hasVoted && (
                  <span className="font-mono font-bold text-neutral-900 mr-2 flex-shrink-0">
                    {percentage}%
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500">
        <span className="flex items-center gap-1">
          <Users className="w-3.5 h-3.5 text-neutral-400" />
          <span>إجمالي الأصوات: {totalVotes.toLocaleString('ar-EG')}</span>
        </span>
        {hasVoted ? (
          <span className="text-emerald-700 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> شكراً لمشاركتك
          </span>
        ) : (
          <span className="text-neutral-400">انقر على الخيار للتصويت</span>
        )}
      </div>
    </div>
  );
}
