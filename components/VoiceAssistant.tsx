'use client';
import { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function VoiceAssistant() {
  const { language } = useLanguage();
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [supported, setSupported] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  const langMap = { en: 'en-IN', te: 'te-IN', hi: 'hi-IN' };

  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      setSupported(true);
      const SpeechRec = (window as unknown as { SpeechRecognition?: typeof SpeechRecognition; webkitSpeechRecognition?: typeof SpeechRecognition }).SpeechRecognition || (window as unknown as { webkitSpeechRecognition?: typeof SpeechRecognition }).webkitSpeechRecognition;
      if (SpeechRec) {
        const rec = new SpeechRec();
        rec.continuous = false;
        rec.interimResults = true;
        rec.onresult = (e: SpeechRecognitionEvent) => {
          const t = Array.from(e.results).map((r: SpeechRecognitionResult) => r[0].transcript).join('');
          setTranscript(t);
        };
        rec.onend = () => setListening(false);
        setRecognition(rec);
      }
    }
  }, []);

  const toggleListen = () => {
    if (!recognition) return;
    if (listening) {
      recognition.stop();
      setListening(false);
    } else {
      recognition.lang = langMap[language];
      recognition.start();
      setListening(true);
      setTranscript('');
    }
  };

  const speak = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langMap[language];
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const greetings = {
    en: 'Welcome to Rural Internet Help Center. I can help you with government services, jobs, and more. Click the microphone to speak.',
    te: 'గ్రామీణ ఇంటర్నెట్ సహాయ కేంద్రానికి స్వాగతం. నేను ప్రభుత్వ సేవలు, ఉద్యోగాలు మరియు మరిన్ని విషయాలలో సహాయం చేయగలను.',
    hi: 'ग्रामीण इंटरनेट सहायता केंद्र में आपका स्वागत है। मैं सरकारी सेवाओं, नौकरियों और अधिक में आपकी मदद कर सकता हूं।',
  };

  if (!supported) return null;

  return (
    <>
      {/* Voice FAB */}
      <button
        onClick={() => setShowPanel(o => !o)}
        title="Voice Assistant"
        className={`fixed bottom-[96px] right-6 w-12 h-12 rounded-full border-none cursor-pointer flex items-center justify-center transition-all duration-300 z-[900] shadow-lg hover:scale-110 active:scale-95 ${listening ? 'bg-red-500 text-white animate-pulse' : 'bg-[var(--secondary)] text-white'}`}
      >
        {listening ? <MicOff size={20} /> : <Mic size={20} />}
      </button>

      {/* Voice Panel */}
      <AnimatePresence>
        {showPanel && (
          <motion.div 
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-[160px] right-6 w-[320px] bg-[var(--card)] border border-[var(--card-border)] rounded-2xl p-5 shadow-xl z-[900] overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="font-bold text-[15px] flex items-center gap-2 text-[#0F4C81]">
                <Mic size={18} /> Voice Assistant
              </div>
              <button onClick={() => setShowPanel(false)}
                className="p-1.5 rounded-lg bg-[var(--bg2)] text-[var(--text-muted)] hover:bg-[var(--card-border)] border-none cursor-pointer transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Language indicator */}
            <div className="px-3 py-2 rounded-xl bg-[var(--bg)] text-[12px] text-[var(--text-muted)] mb-5 text-center font-medium border border-[var(--card-border)]">
              Language: <strong className="text-[var(--text)] ml-1">{language === 'en' ? 'English' : language === 'te' ? 'తెలుగు' : 'हिंदी'}</strong>
            </div>

            {/* Mic Button */}
            <div className="flex justify-center mb-5">
              <div className="relative">
                {listening && (
                  <motion.div 
                    className="absolute -inset-2 rounded-full border-2 border-red-500"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
                <button
                  onClick={toggleListen}
                  className={`w-16 h-16 rounded-full border-none text-white cursor-pointer flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ${listening ? 'bg-red-500 shadow-red-500/40' : 'bg-[#0F4C81] shadow-blue-900/40'}`}
                >
                  {listening ? <MicOff size={28} /> : <Mic size={28} />}
                </button>
              </div>
            </div>

            {/* Transcript */}
            <AnimatePresence>
              {transcript && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }}
                  className="p-3.5 rounded-xl bg-[var(--bg)] text-[13px] text-[var(--text)] mb-4 min-h-[48px] leading-relaxed border border-[var(--card-border)] font-medium"
                >
                  {transcript}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="text-[12px] text-[var(--text-muted)] text-center mb-4 font-medium h-4">
              {listening ? <span className="text-red-500">🔴 Listening... speak now</span> : 'Tap mic to speak'}
            </div>

            {/* Speak Greeting Button */}
            <button
              onClick={() => speak(greetings[language])}
              className={`w-full p-3 rounded-xl border border-[var(--card-border)] text-[var(--text)] cursor-pointer text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors ${speaking ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-transparent hover:bg-[var(--bg2)]'}`}
            >
              {speaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
              {speaking ? 'Stop Speaking' : 'Hear Welcome Message'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
