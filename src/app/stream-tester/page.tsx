'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { 
  Play, 
  Pause, 
  Square, 
  Volume2, 
  VolumeX, 
  Download, 
  RefreshCw, 
  Terminal, 
  Activity, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  FileText, 
  Layers, 
  Copy, 
  Check, 
  ExternalLink,
  Sparkles,
  Sliders,
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';
import { 
  WebReaderStreamDemuxer, 
  ControlFrame, 
  ControlFrameStart, 
  ControlFrameProgress, 
  ControlFrameDone, 
  ControlFrameError,
  createWavBlob 
} from '@/utils/stream-protocol';

interface StreamLogItem {
  id: string;
  time: string;
  type: 'info' | 'audio' | 'control' | 'error' | 'success';
  message: string;
  detail?: any;
}

import { useLanguage } from '@/context/LanguageContext';

export default function StreamTesterPage() {
  const { t } = useLanguage();
  // Form State
  const [apiUrl, setApiUrl] = useState('https://api-dev.tryhamsa.com');
  const [projectId, setProjectId] = useState('a5314154-eb11-429e-9b0f-6cfaf459e671');
  const [targetUrl, setTargetUrl] = useState('https://web-reader-tests.vercel.app/articles/csr-live-match');
  const [languageCode, setLanguageCode] = useState('egy');

  // Stream & Status State
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamStage, setStreamStage] = useState<'idle' | 'connecting' | 'streaming' | 'cached_json' | 'queued_202' | 'completed' | 'error'>('idle');
  const [httpStatus, setHttpStatus] = useState<number | null>(null);
  const [contentType, setContentType] = useState<string | null>(null);
  const [ttfbMs, setTtfbMs] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Extracted Article Metadata & Control Frames
  const [extractedMeta, setExtractedMeta] = useState<ControlFrameStart | null>(null);
  const [jsonConversionData, setJsonConversionData] = useState<any | null>(null);
  const [controlFrames, setControlFrames] = useState<ControlFrame[]>([]);
  const [logs, setLogs] = useState<StreamLogItem[]>([]);

  // Audio Playback State (Web Audio API)
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [generatedDuration, setGeneratedDuration] = useState(0);
  const [finalDuration, setFinalDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [receivedBytes, setReceivedBytes] = useState(0);
  const [audioFramesCount, setAudioFramesCount] = useState(0);
  const [downloadWavUrl, setDownloadWavUrl] = useState<string | null>(null);
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'timeline' | 'logs' | 'json'>('content');

  // Web Audio Refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const seekTimeRef = useRef<number>(0);
  const pcmChunksRef = useRef<Uint8Array[]>([]);
  const audioBuffersRef = useRef<AudioBuffer[]>([]);
  const currentSourcesRef = useRef<AudioBufferSourceNode[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const isPlayingRef = useRef<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // HTML5 Fallback Audio Ref (for cached JSON)
  const htmlAudioRef = useRef<HTMLAudioElement | null>(null);

  const addLog = useCallback((type: StreamLogItem['type'], message: string, detail?: any) => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) + '.' + String(Date.now() % 1000).padStart(3, '0');
    setLogs((prev) => [
      {
        id: `${Date.now()}-${Math.random()}`,
        time,
        type,
        message,
        detail,
      },
      ...prev.slice(0, 200),
    ]);
  }, []);

  const getOrCreateAudioContext = useCallback(() => {
    if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const gain = ctx.createGain();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      gain.connect(analyser);
      analyser.connect(ctx.destination);
      gain.gain.value = isMuted ? 0 : volume;
      audioCtxRef.current = ctx;
      gainNodeRef.current = gain;
      analyserRef.current = analyser;
    }
    return { ctx: audioCtxRef.current, gain: gainNodeRef.current!, analyser: analyserRef.current! };
  }, [isMuted, volume]);

  const resetAll = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    currentSourcesRef.current.forEach((src) => {
      try { src.stop(); src.disconnect(); } catch {}
    });
    currentSourcesRef.current = [];
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    gainNodeRef.current = null;
    analyserRef.current = null;
    pcmChunksRef.current = [];
    audioBuffersRef.current = [];
    nextStartTimeRef.current = 0;
    startTimeRef.current = 0;
    seekTimeRef.current = 0;
    isPlayingRef.current = false;

    if (downloadWavUrl) {
      URL.revokeObjectURL(downloadWavUrl);
      setDownloadWavUrl(null);
    }

    setIsStreaming(false);
    setIsPlaying(false);
    setIsBuffering(false);
    setCurrentTime(0);
    setGeneratedDuration(0);
    setFinalDuration(0);
    setReceivedBytes(0);
    setAudioFramesCount(0);
    setExtractedMeta(null);
    setJsonConversionData(null);
    setControlFrames([]);
    setErrorMessage(null);
    setStreamStage('idle');
    setHttpStatus(null);
    setContentType(null);
    setTtfbMs(null);
  }, [downloadWavUrl]);

  // Audio Visualizer Canvas Loop
  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const renderWave = () => {
      const analyser = analyserRef.current;
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      if (analyser && isPlaying && audioCtxRef.current?.state === 'running') {
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);

        const barWidth = (width / bufferLength) * 2.2;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * height;
          const gradient = ctx.createLinearGradient(0, height, 0, 0);
          gradient.addColorStop(0, '#dc2626');
          gradient.addColorStop(1, '#f87171');
          ctx.fillStyle = gradient;
          ctx.fillRect(x, height - barHeight, barWidth - 1.5, barHeight);
          x += barWidth;
        }
      } else {
        // Idle line
        ctx.strokeStyle = '#374151';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.stroke();
      }

      animId = requestAnimationFrame(renderWave);
    };

    renderWave();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  // Time Tracker Loop for Audio Playback
  useEffect(() => {
    const loop = () => {
      const ctx = audioCtxRef.current;
      if (ctx && isPlaying && ctx.state === 'running') {
        const elapsed = (ctx.currentTime - startTimeRef.current) * playbackRate;
        const curr = seekTimeRef.current + elapsed;
        setCurrentTime(curr);

        const maxDur = finalDuration || generatedDuration;
        if (maxDur > 0 && curr >= maxDur) {
          setIsPlaying(false);
          isPlayingRef.current = false;
        }
      }
      animFrameRef.current = requestAnimationFrame(loop);
    };

    if (isPlaying) {
      animFrameRef.current = requestAnimationFrame(loop);
    }
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, playbackRate, finalDuration, generatedDuration]);

  // Play / Pause Controls
  const handlePlayPause = async () => {
    if (streamStage === 'cached_json' && htmlAudioRef.current) {
      if (isPlaying) {
        htmlAudioRef.current.pause();
        setIsPlaying(false);
      } else {
        await htmlAudioRef.current.play();
        setIsPlaying(true);
      }
      return;
    }

    if (audioBuffersRef.current.length === 0) return;
    const { ctx } = getOrCreateAudioContext();

    if (isPlaying) {
      await ctx.suspend().catch(() => {});
      setIsPlaying(false);
      isPlayingRef.current = false;
    } else {
      if (ctx.state === 'suspended') {
        await ctx.resume().catch(() => {});
      }
      setIsPlaying(true);
      isPlayingRef.current = true;
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = isMuted ? 0 : newVol;
    }
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = nextMuted ? 0 : volume;
    }
  };

  // Main Stream Trigger
  const startStreamConversion = async () => {
    resetAll();
    const abortCtrl = new AbortController();
    abortControllerRef.current = abortCtrl;

    setStreamStage('connecting');
    setIsStreaming(true);
    addLog('info', `Connecting to ${apiUrl}/v1/web-reader/convert/stream ...`, {
      webReaderProjectId: projectId,
      url: targetUrl,
      languageCode,
    });

    const startTime = performance.now();

    try {
      const response = await fetch(`${apiUrl}/v1/web-reader/convert/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/octet-stream, application/json',
        },
        body: JSON.stringify({
          webReaderProjectId: projectId,
          url: targetUrl,
          languageCode,
        }),
        signal: abortCtrl.signal,
      });

      const ttfb = Math.round(performance.now() - startTime);
      setTtfbMs(ttfb);
      setHttpStatus(response.status);
      const cType = response.headers.get('content-type') || '';
      setContentType(cType);

      addLog('info', `Response received (${response.status} ${response.statusText}) in ${ttfb}ms`, {
        status: response.status,
        contentType: cType,
      });

      // Branch 1: application/json (Cached 200 or Queued 202 or Error)
      if (cType.includes('application/json') || response.status !== 200 || !response.body) {
        const json = await response.json();
        setJsonConversionData(json);

        if (response.status === 200) {
          setStreamStage('cached_json');
          addLog('success', 'Cache Hit: Received pre-generated conversion payload (200 JSON)', json);
        } else if (response.status === 202) {
          setStreamStage('queued_202');
          addLog('info', 'Received 202 Queued: Another worker is generating or queued', json);
        } else {
          setStreamStage('error');
          setErrorMessage(json.message || `Request failed with status ${response.status}`);
          addLog('error', `Error (${json.code || response.status}): ${json.message || 'Unknown error'}`, json);
        }
        setIsStreaming(false);
        return;
      }

      // Branch 2: application/octet-stream (Live Generation Stream)
      setStreamStage('streaming');
      addLog('success', 'Streaming started: application/octet-stream connected successfully! Parsing binary frames...');

      const { ctx: audioCtx, gain: gainNode } = getOrCreateAudioContext();
      if (audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
      }
      setIsPlaying(true);
      isPlayingRef.current = true;
      startTimeRef.current = audioCtx.currentTime;
      nextStartTimeRef.current = audioCtx.currentTime + 0.05;

      const demuxer = new WebReaderStreamDemuxer();
      const reader = response.body.getReader();
      let totalBytesCount = 0;
      let totalAudioFrames = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done || abortCtrl.signal.aborted) break;

        totalBytesCount += value.length;
        setReceivedBytes(totalBytesCount);

        const frames = demuxer.feed(value);

        for (const frame of frames) {
          if (abortCtrl.signal.aborted) break;

          if (frame.type === 'audio') {
            totalAudioFrames += 1;
            setAudioFramesCount(totalAudioFrames);
            pcmChunksRef.current.push(frame.pcmData);

            // Convert 16-bit LE PCM to AudioBuffer (16kHz mono)
            const sampleRate = extractedMeta?.sampleRate || 16000;
            const channels = extractedMeta?.channels || 1;
            const sampleCount = Math.floor(frame.pcmData.length / 2);

            if (sampleCount > 0) {
              const audioBuf = audioCtx.createBuffer(channels, sampleCount, sampleRate);
              const channelData = audioBuf.getChannelData(0);
              const dataView = new DataView(frame.pcmData.buffer, frame.pcmData.byteOffset, frame.pcmData.byteLength);

              for (let i = 0; i < sampleCount; i++) {
                channelData[i] = dataView.getInt16(i * 2, true) / 32768.0;
              }

              audioBuffersRef.current.push(audioBuf);
              setGeneratedDuration((prev) => prev + audioBuf.duration);

              // Schedule audio chunk in Web Audio API pipeline
              if (audioCtx.state !== 'closed') {
                const source = audioCtx.createBufferSource();
                source.buffer = audioBuf;
                source.playbackRate.value = playbackRate;
                source.connect(gainNode);

                const schedTime = Math.max(audioCtx.currentTime, nextStartTimeRef.current);
                source.start(schedTime);
                currentSourcesRef.current.push(source);

                nextStartTimeRef.current = schedTime + audioBuf.duration / playbackRate;
              }
            }
          } else if (frame.type === 'control') {
            const control = frame.payload;
            setControlFrames((prev) => [...prev, control]);

            if (control.t === 'start') {
              setExtractedMeta(control);
              addLog('control', `Control Frame [START]: ID ${control.conversionId} (${control.title || 'Extracting article...'})`, control);
            } else if (control.t === 'progress') {
              addLog('control', `Control Frame [PROGRESS]: Generated ${control.generatedSeconds.toFixed(1)}s`, control);
            } else if (control.t === 'done') {
              setFinalDuration(control.durationSeconds);
              setStreamStage('completed');
              addLog('success', `Control Frame [DONE]: Complete! Duration ${control.durationSeconds.toFixed(1)}s`, control);

              // Create downloadable WAV Blob
              if (pcmChunksRef.current.length > 0) {
                const wavBlob = createWavBlob(
                  pcmChunksRef.current,
                  extractedMeta?.sampleRate || 16000,
                  extractedMeta?.channels || 1,
                  16
                );
                const wavUrl = URL.createObjectURL(wavBlob);
                setDownloadWavUrl(wavUrl);
              }
            } else if (control.t === 'error') {
              setErrorMessage(control.message);
              setStreamStage('error');
              addLog('error', `Control Frame [ERROR ${control.code}]: ${control.message}`, control);
            }
          }
        }
      }
    } catch (err: any) {
      if (!abortCtrl.signal.aborted) {
        setStreamStage('error');
        setErrorMessage(err.message || 'Stream connection failed');
        addLog('error', `Streaming Network Error: ${err.message}`, err);
      }
    } finally {
      setIsStreaming(false);
    }
  };

  const getCurlSnippet = () => {
    return `curl -X POST "${apiUrl}/v1/web-reader/convert/stream" \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/octet-stream, application/json" \\
  -d '${JSON.stringify({ webReaderProjectId: projectId, url: targetUrl, languageCode }, null, 2)}'`;
  };

  const handleCopyCurl = () => {
    navigator.clipboard.writeText(getCurlSnippet());
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="min-h-screen bg-[#0d0f12] text-neutral-100 font-sans pb-16">
      {/* Top Banner Header */}
      <div className="border-b border-neutral-800 bg-neutral-950/80 backdrop-blur sticky top-0 z-40">
        <div className="bbc-container max-w-7xl mx-auto px-4 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-white font-bold hover:text-red-400 transition">
              <span className="w-6 h-6 bg-bbc-red flex items-center justify-center font-bold text-xs rounded">B</span>
              <span className="font-cairo">BBC Tech Lab</span>
            </Link>
            <span className="text-neutral-600">/</span>
            <div className="flex items-center gap-1.5 bg-red-950/50 border border-red-800/40 text-red-400 text-xs px-2.5 py-1 rounded-full font-mono font-semibold">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>POST /convert/stream Live Tester</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={handleCopyCurl}
              className="flex items-center gap-1 px-3 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition font-mono"
            >
              {copiedCurl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-neutral-400" />}
              <span>{copiedCurl ? 'تم النسخ!' : 'cURL'}</span>
            </button>
            <Link
              href="/articles/csr-live-match"
              className="flex items-center gap-1 px-3 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition"
            >
              <span>المقال التفاعلي</span>
              <ExternalLink className="w-3 h-3 text-neutral-400" />
            </Link>
          </div>
        </div>
      </div>

      <div className="bbc-container max-w-7xl mx-auto px-4 pt-6 space-y-6">
        {/* Intro Banner */}
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-red-950/40 border border-neutral-800 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-cairo flex items-center gap-2.5">
                <Sparkles className="w-6 h-6 text-red-500" />
                {t('title', 'streamTester')}
              </h1>
              <p className="text-sm text-neutral-400 mt-1 max-w-3xl leading-relaxed">
                {t('subtitle', 'streamTester')}
              </p>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-neutral-500 font-semibold">تجارب سريعة:</span>
              <button
                onClick={() => {
                  setTargetUrl('https://web-reader-tests.vercel.app/articles/csr-live-match');
                  setLanguageCode('egy');
                }}
                className="text-xs px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-300 transition"
              >
                كلاسيكو الأرض (CSR)
              </button>
              <button
                onClick={() => {
                  setTargetUrl('https://web-reader-tests.vercel.app/articles/c3r0eyydnwgo');
                  setLanguageCode('egy');
                }}
                className="text-xs px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-300 transition"
              >
                تقنية VAR (GSR)
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid: Left = Form & Controls, Right = Audio Player & Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Form & Configuration (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-lg space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <h2 className="text-base font-bold text-white font-cairo flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-red-500" />
                  إعدادات الطلب (Stream Request)
                </h2>
                <span className="text-[11px] font-mono text-neutral-500">public endpoint</span>
              </div>

              {/* Form Fields */}
              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    رابط الـ API الأساسي (API URL):
                  </label>
                  <input
                    type="text"
                    value={apiUrl}
                    onChange={(e) => setApiUrl(e.target.value)}
                    placeholder="https://api-dev.tryhamsa.com"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-neutral-200 font-mono focus:border-red-500 focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    معرف المشروع (Web Reader Project ID):
                  </label>
                  <input
                    type="text"
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    placeholder="a5314154-eb11-429e-9b0f-6cfaf459e671"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-neutral-200 font-mono focus:border-red-500 focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    رابط المقال المراد قراءته (Article URL):
                  </label>
                  <input
                    type="text"
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                    placeholder="https://example.com/article"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-neutral-200 font-mono focus:border-red-500 focus:outline-none transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-neutral-300 font-medium mb-1">
                      كود اللهجة / اللغة (Language):
                    </label>
                    <select
                      value={languageCode}
                      onChange={(e) => setLanguageCode(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-neutral-200 font-mono focus:border-red-500 focus:outline-none transition"
                    >
                      <option value="egy">مصرية (egy)</option>
                      <option value="ar">فصحى MSA (ar)</option>
                      <option value="sau">سعودية (sau)</option>
                      <option value="uae">إماراتية (uae)</option>
                      <option value="en">English (en)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-neutral-300 font-medium mb-1">
                      سرعة التشغيل (Playback Rate):
                    </label>
                    <select
                      value={playbackRate}
                      onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-neutral-200 font-mono focus:border-red-500 focus:outline-none transition"
                    >
                      <option value="0.75">0.75x</option>
                      <option value="1">1.0x (افتراضي)</option>
                      <option value="1.25">1.25x</option>
                      <option value="1.5">1.5x</option>
                      <option value="2">2.0x</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={startStreamConversion}
                  disabled={isStreaming}
                  className="w-full py-2.5 px-4 rounded-xl bg-bbc-red hover:bg-bbc-darkred text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isStreaming ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>جاري الاستماع للـ Stream...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>بدء طلب الاستريم المباشر (Start Stream)</span>
                    </>
                  )}
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={resetAll}
                    disabled={!isStreaming && streamStage === 'idle'}
                    className="flex-1 py-2 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold transition flex items-center justify-center gap-1.5 disabled:opacity-40"
                  >
                    <Square className="w-3.5 h-3.5" />
                    <span>إيقاف / إعادة تعيين</span>
                  </button>
                  <button
                    onClick={handleCopyCurl}
                    className="py-2 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold transition flex items-center justify-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>نسخ الطلب</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Stream Status Metrics Box */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-lg space-y-3">
              <h3 className="text-xs font-bold text-neutral-400 tracking-wider uppercase font-mono flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                حالة الاستجابة والشبكة (Live Metrics)
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800/80">
                  <span className="text-neutral-500 block text-[11px]">حالة البث (Stage)</span>
                  <span className={`font-bold font-mono text-sm mt-0.5 block ${
                    streamStage === 'streaming' ? 'text-amber-400 animate-pulse' :
                    streamStage === 'completed' ? 'text-emerald-400' :
                    streamStage === 'error' ? 'text-red-400' :
                    streamStage === 'cached_json' ? 'text-sky-400' :
                    'text-neutral-300'
                  }`}>
                    {streamStage.toUpperCase()}
                  </span>
                </div>

                <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800/80">
                  <span className="text-neutral-500 block text-[11px]">كود الاستجابة (Status)</span>
                  <span className="font-bold font-mono text-sm mt-0.5 block text-white">
                    {httpStatus ? `${httpStatus} ${httpStatus === 200 ? 'OK' : httpStatus === 202 ? 'Accepted' : ''}` : '---'}
                  </span>
                </div>

                <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800/80">
                  <span className="text-neutral-500 block text-[11px]">نوع المحتوى (Content-Type)</span>
                  <span className="font-mono text-xs mt-0.5 block truncate text-neutral-300" title={contentType || ''}>
                    {contentType ? contentType.split(';')[0] : '---'}
                  </span>
                </div>

                <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800/80">
                  <span className="text-neutral-500 block text-[11px]">زمن أول إطار (TTFB)</span>
                  <span className="font-bold font-mono text-sm mt-0.5 block text-emerald-400">
                    {ttfbMs !== null ? `${ttfbMs} ms` : '---'}
                  </span>
                </div>

                <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800/80">
                  <span className="text-neutral-500 block text-[11px]">حجم الصوت المستلم (PCM)</span>
                  <span className="font-bold font-mono text-sm mt-0.5 block text-neutral-200">
                    {(receivedBytes / 1024).toFixed(1)} KB ({audioFramesCount} frames)
                  </span>
                </div>

                <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800/80">
                  <span className="text-neutral-500 block text-[11px]">مواصفات الصوت (Format)</span>
                  <span className="font-mono text-xs mt-0.5 block text-neutral-300">
                    {extractedMeta ? `${extractedMeta.sampleRate || 16000}Hz / 16-bit Mono` : '16kHz / 16-bit PCM'}
                  </span>
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-950/60 border border-red-800/60 rounded-xl text-red-300 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                  <div>
                    <span className="font-bold block">خطأ في الاتصال:</span>
                    <span>{errorMessage}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Audio Player & Live Stream Inspector (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Interactive Audio Player Card */}
            <div className="bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-6 shadow-xl space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-red-500 animate-ping' : 'bg-neutral-600'}`} />
                  <h2 className="text-lg font-bold text-white font-cairo">
                    المشغل الصوتي المباشر (Web Audio Stream Player)
                  </h2>
                </div>

                {downloadWavUrl && (
                  <a
                    href={downloadWavUrl}
                    download={`stream-${extractedMeta?.conversionId || 'audio'}.wav`}
                    className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-lg bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 hover:bg-emerald-900 transition font-semibold"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>تحميل ملف WAV</span>
                  </a>
                )}
              </div>

              {/* Audio Visualizer Canvas */}
              <div className="bg-neutral-950 rounded-xl border border-neutral-800 p-3 relative overflow-hidden">
                <canvas
                  ref={canvasRef}
                  width={500}
                  height={80}
                  className="w-full h-20 block rounded"
                />
                <div className="absolute top-2 right-3 flex items-center gap-2 text-[10px] font-mono text-neutral-400">
                  <span>PCM Audio Visualizer</span>
                  {isBuffering && <span className="text-amber-400 animate-pulse font-bold">(Buffering...)</span>}
                </div>
              </div>

              {/* Progress & Timing */}
              <div className="space-y-1.5">
                <div className="h-2 bg-neutral-800 rounded-full overflow-hidden relative">
                  {/* Generated Duration bar */}
                  <div
                    className="h-full bg-neutral-700 transition-all duration-300 absolute left-0 top-0"
                    style={{
                      width: `${finalDuration ? (generatedDuration / finalDuration) * 100 : generatedDuration > 0 ? 100 : 0}%`,
                    }}
                  />
                  {/* Current Playing Time bar */}
                  <div
                    className="h-full bg-bbc-red transition-all duration-100 absolute left-0 top-0"
                    style={{
                      width: `${(finalDuration || generatedDuration) ? (currentTime / (finalDuration || generatedDuration)) * 100 : 0}%`,
                    }}
                  />
                </div>

                <div className="flex justify-between text-xs font-mono text-neutral-400">
                  <span>{formatTime(currentTime)}</span>
                  <span>
                    تم توليد: {formatTime(generatedDuration)}
                    {finalDuration > 0 && ` / الإجمالي: ${formatTime(finalDuration)}`}
                  </span>
                </div>
              </div>

              {/* Player Controls Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-neutral-800/80">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePlayPause}
                    disabled={audioBuffersRef.current.length === 0 && !jsonConversionData?.data?.audio?.[0]?.url}
                    className="w-12 h-12 rounded-full bg-white hover:bg-neutral-200 text-black flex items-center justify-center transition shadow-lg disabled:opacity-40"
                    title={isPlaying ? 'إيقاف مؤقت' : 'تشغيل'}
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                  </button>

                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">
                      {extractedMeta?.title || jsonConversionData?.data?.title || 'في انتظار بدء المقال...'}
                    </span>
                    <span className="text-[11px] text-neutral-400 font-mono">
                      {extractedMeta?.conversionId ? `ID: ${extractedMeta.conversionId}` : '---'}
                    </span>
                  </div>
                </div>

                {/* Volume & Rate */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleToggleMute}
                    className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition"
                  >
                    {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="w-20 accent-red-500 cursor-pointer"
                  />
                  <span className="text-xs font-mono text-neutral-400 w-8">{Math.round((isMuted ? 0 : volume) * 100)}%</span>
                </div>
              </div>

              {/* HTML5 Audio Element for JSON Cache-hit */}
              {jsonConversionData?.data?.audio?.[0]?.url && (
                <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
                  <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> تم جلب التسجيل الصوتي الجاهز من الكاش (Cached Audio):
                  </span>
                  <audio
                    ref={htmlAudioRef}
                    src={jsonConversionData.data.audio[0].url}
                    controls
                    className="w-full h-9 rounded"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />
                </div>
              )}
            </div>

            {/* Stream Inspector & Content Details Tabs */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
              {/* Tab Header */}
              <div className="flex border-b border-neutral-800 bg-neutral-950 px-4 pt-3 gap-2 overflow-x-auto text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('content')}
                  className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition ${
                    activeTab === 'content' ? 'border-bbc-red text-white' : 'border-transparent text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>المحتوى المستخرج (Content)</span>
                </button>
                <button
                  onClick={() => setActiveTab('timeline')}
                  className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition ${
                    activeTab === 'timeline' ? 'border-bbc-red text-white' : 'border-transparent text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>إطارات التحكم (Control Frames ({controlFrames.length}))</span>
                </button>
                <button
                  onClick={() => setActiveTab('logs')}
                  className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition ${
                    activeTab === 'logs' ? 'border-bbc-red text-white' : 'border-transparent text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>سجل الأحداث المباشر (Logs ({logs.length}))</span>
                </button>
                <button
                  onClick={() => setActiveTab('json')}
                  className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition ${
                    activeTab === 'json' ? 'border-bbc-red text-white' : 'border-transparent text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Raw JSON / cURL</span>
                </button>
              </div>

              {/* Tab 1: Extracted Content View */}
              {activeTab === 'content' && (
                <div className="p-5 space-y-4">
                  {extractedMeta || jsonConversionData?.data ? (
                    <div className="space-y-4">
                      <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-2">
                        <span className="text-[11px] text-neutral-500 uppercase font-mono tracking-wider">عنوان المقال المستخرج</span>
                        <h4 className="text-lg font-bold font-cairo text-white">
                          {extractedMeta?.title || jsonConversionData?.data?.title || 'بدون عنوان'}
                        </h4>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                          <span className="text-neutral-500 block text-[11px]">عدد الكلمات</span>
                          <span className="font-bold text-white font-mono mt-0.5 block">
                            {extractedMeta?.wordCount || jsonConversionData?.data?.metadata?.wordCount || '---'} كلمة
                          </span>
                        </div>
                        <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                          <span className="text-neutral-500 block text-[11px]">اللغة المستهدفة</span>
                          <span className="font-bold text-emerald-400 font-mono mt-0.5 block uppercase">
                            {extractedMeta?.languageCode || languageCode}
                          </span>
                        </div>
                        <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                          <span className="text-neutral-500 block text-[11px]">مدة التوليد المقدرة</span>
                          <span className="font-bold text-white font-mono mt-0.5 block">
                            {finalDuration ? `${finalDuration.toFixed(1)} ثانية` : generatedDuration > 0 ? `${generatedDuration.toFixed(1)} ثانية (مستمر)` : '---'}
                          </span>
                        </div>
                        <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                          <span className="text-neutral-500 block text-[11px]">معرف التحويل</span>
                          <span className="font-mono text-neutral-300 truncate mt-0.5 block text-[11px]">
                            {extractedMeta?.conversionId || jsonConversionData?.data?.id || '---'}
                          </span>
                        </div>
                      </div>

                      {jsonConversionData?.data?.metadata?.description && (
                        <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-1 text-xs">
                          <span className="text-neutral-500 block text-[11px]">الملخص المستخرج (Meta Description)</span>
                          <p className="text-neutral-300 leading-relaxed">
                            {jsonConversionData.data.metadata.description}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="py-12 text-center text-neutral-500 space-y-2">
                      <FileText className="w-8 h-8 mx-auto opacity-40" />
                      <p className="text-sm">لم يتم استخراج محتوى بعد. اضغط على زر &quot;بدء الاستريم&quot; لجلب المقال فورياً.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Control Frames Timeline */}
              {activeTab === 'timeline' && (
                <div className="p-5 space-y-3">
                  {controlFrames.length === 0 ? (
                    <div className="py-12 text-center text-neutral-500 space-y-2">
                      <Layers className="w-8 h-8 mx-auto opacity-40" />
                      <p className="text-sm">لم تصل أي إطارات تحكم JSON (0x02 Control Frames) بعد.</p>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {controlFrames.map((frame, idx) => (
                        <div
                          key={idx}
                          className="bg-neutral-950 border border-neutral-800 p-3.5 rounded-xl font-mono text-xs space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                              frame.t === 'start' ? 'bg-blue-950 text-blue-400 border border-blue-800' :
                              frame.t === 'progress' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                              frame.t === 'done' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                              'bg-red-950 text-red-400 border border-red-800'
                            }`}>
                              FRAME 0x02: {frame.t.toUpperCase()}
                            </span>
                            <span className="text-neutral-600 text-[10px]">#{idx + 1}</span>
                          </div>
                          <pre className="text-neutral-300 text-[11px] overflow-x-auto whitespace-pre-wrap bg-neutral-900/60 p-2 rounded">
                            {JSON.stringify(frame, null, 2)}
                          </pre>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Live Logs Console */}
              {activeTab === 'logs' && (
                <div className="p-4 bg-neutral-950 font-mono text-xs max-h-[380px] overflow-y-auto space-y-1.5 divide-y divide-neutral-900">
                  {logs.length === 0 ? (
                    <div className="py-10 text-center text-neutral-600">لا توجد سجلات بعد.</div>
                  ) : (
                    logs.map((item) => (
                      <div key={item.id} className="pt-1.5 flex items-start gap-2.5">
                        <span className="text-neutral-600 text-[10px] shrink-0">{item.time}</span>
                        <span className={`shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          item.type === 'error' ? 'bg-red-950 text-red-400' :
                          item.type === 'success' ? 'bg-emerald-950 text-emerald-400' :
                          item.type === 'control' ? 'bg-purple-950 text-purple-400' :
                          'bg-neutral-800 text-neutral-400'
                        }`}>
                          {item.type.toUpperCase()}
                        </span>
                        <span className="text-neutral-300 break-all">{item.message}</span>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Tab 4: Raw JSON Payload / cURL */}
              {activeTab === 'json' && (
                <div className="p-5 space-y-4 font-mono text-xs">
                  <div>
                    <span className="text-neutral-400 block mb-1 font-sans font-bold">أمر cURL المولد:</span>
                    <pre className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-300 overflow-x-auto">
                      {getCurlSnippet()}
                    </pre>
                  </div>

                  {jsonConversionData && (
                    <div>
                      <span className="text-neutral-400 block mb-1 font-sans font-bold">استجابة السيرفر (Raw Response Data):</span>
                      <pre className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-300 overflow-x-auto max-h-64">
                        {JSON.stringify(jsonConversionData, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
