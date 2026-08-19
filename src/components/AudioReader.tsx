'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  Headphones, 
  Gauge, 
  Sparkles 
} from 'lucide-react';

interface AudioReaderProps {
  textToRead: string;
  title: string;
  duration?: string;
}

export default function AudioReader({
  textToRead,
  title,
  duration = '3:45',
}: AudioReaderProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 - 100
  const [currentTime, setCurrentTime] = useState('0:00');
  const [speed, setSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(false);
  const [voiceAvailable, setVoiceAvailable] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const totalSeconds = 225; // 3:45

  // Check Web Speech API
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setVoiceAvailable(true);
    }
  }, []);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      setIsPlaying(true);
      
      // Try Web Speech API in Arabic
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(`${title}. ${textToRead.slice(0, 400)}`);
        utterance.lang = 'ar-SA';
        utterance.rate = speed;
        
        utterance.onend = () => {
          setIsPlaying(false);
          setProgress(100);
        };
        
        window.speechSynthesis.speak(utterance);
      }

      // Simulated playback ticker
      const interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + (100 / totalSeconds) * speed;
          if (next >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            return 100;
          }
          setCurrentTime(formatTime((next / 100) * totalSeconds));
          return next;
        });
      }, 1000);
      timerRef.current = interval;
    }
  };

  const handleSpeedChange = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const nextIndex = (speeds.indexOf(speed) + 1) % speeds.length;
    const newSpeed = speeds[nextIndex];
    setSpeed(newSpeed);

    if (isPlaying && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToRead.slice(0, 400));
      utterance.lang = 'ar-SA';
      utterance.rate = newSpeed;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleRewind = () => {
    setProgress((prev) => Math.max(0, prev - (10 / totalSeconds) * 100));
  };

  const handleFastForward = () => {
    setProgress((prev) => Math.min(100, prev + (10 / totalSeconds) * 100));
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    setCurrentTime(formatTime((newProgress / 100) * totalSeconds));
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="my-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 text-white border border-neutral-800 shadow-xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Title & Info */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-bbc-red flex items-center justify-center text-white shadow-md flex-shrink-0">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-red-400 font-cairo">قارئ الأخبار الصوتي (Web Reader)</span>
              <span className="text-[10px] bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded-full font-mono">
                صوت عربي تفاعلي
              </span>
            </div>
            <h4 className="text-sm font-bold text-neutral-100 line-clamp-1 mt-0.5">
              استمع إلى قراءة ملخصة لهذا التقرير
            </h4>
          </div>
        </div>

        {/* Audio Wave Visualizer */}
        <div className="flex items-center gap-1 h-6 px-3 bg-neutral-950 rounded-lg border border-neutral-800">
          {[1, 2, 3, 4, 5, 6, 7].map((bar) => (
            <span
              key={bar}
              className={`w-1 rounded-full bg-bbc-red transition-all ${
                isPlaying ? 'wave-bar' : 'h-2 bg-neutral-700'
              }`}
              style={{
                height: isPlaying ? undefined : `${(bar % 3 + 1) * 4}px`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar & Timestamps */}
      <div className="mt-4 space-y-1.5">
        <div className="relative">
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={progress}
            onChange={handleSeek}
            className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-bbc-red focus:outline-none"
            aria-label="شريط تقدم الاستماع"
          />
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
          <span>{currentTime}</span>
          <span>{duration}</span>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="mt-3 pt-3 border-t border-neutral-800/80 flex items-center justify-between">
        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRewind}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
            title="رجوع 10 ثوانٍ"
            aria-label="إرجاع 10 ثوانٍ"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleTogglePlay}
            className="w-10 h-10 rounded-full bg-white text-bbc-black hover:bg-neutral-200 flex items-center justify-center font-bold shadow-lg transition transform hover:scale-105 active:scale-95"
            aria-label={isPlaying ? 'إيقاف مؤقت' : 'تشغيل القراءة الصوتية'}
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current mr-0.5" />}
          </button>

          <button
            onClick={handleFastForward}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
            title="تقديم 10 ثوانٍ"
            aria-label="تقديم 10 ثوانٍ"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>

        {/* Speed & Mute Options */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSpeedChange}
            className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-mono font-bold flex items-center gap-1 transition"
            title="تغيير سرعة القراءة"
          >
            <Gauge className="w-3.5 h-3.5 text-neutral-400" />
            <span>{speed}x</span>
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
            title={isMuted ? 'إلغاء الكتم' : 'كتم الصوت'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
