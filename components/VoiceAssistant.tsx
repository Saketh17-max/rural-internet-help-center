'use client';
import { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

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
        className={`voice-btn ${listening ? 'listening' : ''}`}
        onClick={() => setShowPanel(o => !o)}
        title="Voice Assistant"
        style={{ bottom: 100 }}
      >
        {listening ? <MicOff size={22} /> : <Mic size={22} />}
      </button>

      {/* Voice Panel */}
      {showPanel && (
        <div style={{
          position: 'fixed', bottom: 168, right: 24,
          width: 300, background: 'var(--card)',
          border: '1px solid var(--card-border)', borderRadius: '16px',
          padding: '20px', boxShadow: '0 16px 48px rgba(0,0,0,0.15)',
          zIndex: 900,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: '15px', display: 'flex', alignItems: 'center', gap: 8 }}>
              🎤 Voice Assistant
            </div>
            <button onClick={() => setShowPanel(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
              <X size={16} />
            </button>
          </div>

          {/* Language indicator */}
          <div style={{
            padding: '8px 12px', borderRadius: '8px', background: 'var(--bg2)',
            fontSize: '12px', color: 'var(--text-muted)', marginBottom: 16, textAlign: 'center',
          }}>
            Language: <strong>{language === 'en' ? 'English' : language === 'te' ? 'తెలుగు' : 'हिंदी'}</strong>
          </div>

          {/* Mic Button */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <div style={{ position: 'relative' }}>
              {listening && (
                <div style={{
                  position: 'absolute', inset: -8,
                  borderRadius: '50%', border: '2px solid var(--secondary)',
                  animation: 'pulse-ring 1.5s ease-out infinite',
                }} />
              )}
              <button
                onClick={toggleListen}
                style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: listening
                    ? 'linear-gradient(135deg, #e74c3c, #c0392b)'
                    : 'linear-gradient(135deg, #1b4f72, #2980b9)',
                  border: 'none', color: 'white', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 20px rgba(27,79,114,0.4)',
                  transition: 'all 0.2s',
                }}
              >
                {listening ? <MicOff size={28} /> : <Mic size={28} />}
              </button>
            </div>
          </div>

          {/* Transcript */}
          {transcript && (
            <div style={{
              padding: '10px 12px', borderRadius: '8px',
              background: 'var(--bg2)', fontSize: '13px', color: 'var(--text)',
              marginBottom: 12, minHeight: 40, lineHeight: 1.5,
            }}>
              {transcript}
            </div>
          )}

          <div style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', marginBottom: 12 }}>
            {listening ? '🔴 Listening... speak now' : 'Tap mic to speak'}
          </div>

          {/* Speak Greeting Button */}
          <button
            onClick={() => speak(greetings[language])}
            style={{
              width: '100%', padding: '10px', borderRadius: '8px',
              background: speaking ? 'var(--bg2)' : 'transparent',
              border: '1.5px solid var(--card-border)',
              color: 'var(--text)', cursor: 'pointer', fontSize: '13px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'all 0.2s',
            }}
          >
            {speaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
            {speaking ? 'Stop Speaking' : 'Hear Welcome Message'}
          </button>
        </div>
      )}
    </>
  );
}
