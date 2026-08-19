import React from 'react';
import { RenderMode } from '@/types';
import { Sparkles, RefreshCw, Server, Laptop } from 'lucide-react';

interface RenderModeBadgeProps {
  mode: RenderMode;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function RenderModeBadge({
  mode,
  showIcon = true,
  size = 'md',
  className = '',
}: RenderModeBadgeProps) {
  const getBadgeDetails = () => {
    switch (mode) {
      case 'GSR':
        return {
          title: 'GSR / SSG (ثابت)',
          sub: 'Generated Static Rendering',
          bg: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-700',
          icon: <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />,
          dot: 'bg-emerald-500',
        };
      case 'ISR':
        return {
          title: 'ISR (تجديد تدريجي)',
          sub: 'Incremental Static Regeneration (30s)',
          bg: 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950/80 dark:text-purple-300 dark:border-purple-700',
          icon: <RefreshCw className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />,
          dot: 'bg-purple-500',
        };
      case 'SSR':
        return {
          title: 'SSR (توليد خادمي)',
          sub: 'Server-Side Rendering (Dynamic)',
          bg: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-700',
          icon: <Server className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />,
          dot: 'bg-amber-500',
        };
      case 'CSR':
        return {
          title: 'CSR (عميل حي)',
          sub: 'Client-Side Rendering (Interactive)',
          bg: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/80 dark:text-blue-300 dark:border-blue-700',
          icon: <Laptop className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />,
          dot: 'bg-blue-500',
        };
    }
  };

  const details = getBadgeDetails();

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 font-medium gap-1',
    md: 'text-xs px-2.5 py-1 font-semibold gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 font-bold gap-2',
  };

  return (
    <div
      className={`inline-flex items-center rounded-full border shadow-sm transition-all ${details.bg} ${sizeClasses[size]} ${className}`}
      title={details.sub}
    >
      <span className={`w-2 h-2 rounded-full ${details.dot} animate-pulse flex-shrink-0`} />
      {showIcon && details.icon}
      <span className="font-mono tracking-tight">{details.title}</span>
    </div>
  );
}
