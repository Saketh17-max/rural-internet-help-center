'use client';
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  id: string;
  role: 'user' | 'bot';
  text: string;
  time: string;
}

const FAQ_EN: { patterns: string[]; answer: string }[] = [
  { patterns: ['income certificate', 'income cert', 'aay praman'], answer: '📄 **Income Certificate**: Apply at your nearest MeeSeva/CSC center. Required docs: Aadhaar, ration card, bank passbook. Fee: ₹35. Status can be tracked at meeseva.gov.in. Processing time: 7-10 working days.' },
  { patterns: ['caste certificate', 'caste cert'], answer: '📄 **Caste Certificate**: Apply at MeeSeva with your Aadhaar, school certificates, and parent caste cert. Fee: ₹35. Required for reservations, scholarships, and government jobs.' },
  { patterns: ['pm kisan', 'pm-kisan', 'farmer money'], answer: '🌾 **PM-Kisan**: Eligible farmers get ₹6,000/year in 3 installments. Register at pmkisan.gov.in with Aadhaar, bank account, and land records.' },
  { patterns: ['scholarship', 'bursary', 'study help'], answer: '🎓 **Scholarships**: Visit the Student Services section for state and central government scholarships. Key portals: NSP (scholarships.gov.in), PFMS, state welfare boards.' },
  { patterns: ['ration card', 'ration'], answer: '🍚 **Ration Card**: Apply at local civil supplies office or MeeSeva. Required: Aadhaar, family photo, address proof, bank passbook. Track status on state food portal.' },
  { patterns: ['otp', 'fraud', 'scam', 'fake'], answer: '🚨 **Safety Alert**: NEVER share your OTP, Aadhaar, or bank details with anyone. Government officials NEVER ask for OTPs. Call Cybercrime Helpline: **1930** if you face fraud.' },
  { patterns: ['job', 'work', 'employment', 'hire'], answer: '💼 **Jobs**: Visit the Worker Marketplace to find jobs near you. Register as a Worker to get job invitations from verified employers. Workers get a unique WRK ID.' },
  { patterns: ['aadhaar', 'aadhar', 'update'], answer: '🔵 **Aadhaar Update**: Visit uidai.gov.in or your nearest Aadhaar enrollment center. You can update name, address, DOB, and mobile. Appointment booking available online.' },
  { patterns: ['pan card', 'pan', 'income tax'], answer: '💳 **PAN Card**: Apply at incometaxindia.gov.in or UTI/NSDL centers. Fee: ₹107 (physical) or ₹72 (e-PAN). Required for banking, ITR, and high-value transactions.' },
  { patterns: ['driving licence', 'driving license', 'dl'], answer: '🚗 **Driving Licence**: Apply at parivahan.gov.in. First get Learner\'s Licence, then pass driving test for permanent DL. Required: Aadhaar, age proof, address proof, passport photo.' },
  { patterns: ['pension', 'old age'], answer: '👴 **Pension Schemes**: Indira Gandhi National Old Age Pension (above 60 years, BPL), Widow Pension, Disability Pension. Apply at local gram panchayat or taluk office.' },
  { patterns: ['upi', 'payment', 'gpay', 'paytm'], answer: '💰 **UPI Safety**: Only scan QR codes from trusted shops. Never scan QR to RECEIVE money (you only send). Use official apps. Report fraud immediately to your bank.' },
  { patterns: ['meeseva', 'mee seva', 'csc'], answer: '🏛️ **MeeSeva/CSC**: Over 10,000 centers across Andhra Pradesh. Services include certificates, utilities, and registrations. Find nearest center in our Maps section.' },
  { patterns: ['weather', 'rain', 'forecast'], answer: '🌦️ **Weather**: Visit imd.gov.in or check the Farmer Services section for district-wise weather forecasts, rainfall data, and crop advisories.' },
  { patterns: ['hello', 'hi', 'help', 'namaste', 'namaskaram'], answer: '🙏 **Hello!** I\'m your RIHC AI Assistant. I can help with:\n• Government certificates\n• Scholarships & jobs\n• Farmer schemes\n• Digital safety\n• Nearby services\n\nWhat do you need help with today?' },
];

const FAQ_TE: { patterns: string[]; answer: string }[] = [
  { patterns: ['ఆదాయ', 'income', 'aadaya'], answer: '📄 **ఆదాయ సర్టిఫికేట్**: మీసేవ/CSC కేంద్రంలో దరఖాస్తు చేయండి. అవసరమైన పత్రాలు: ఆధార్, రేషన్ కార్డ్, బ్యాంక్ పాస్బుక్. రుసుము: ₹35. meeseva.gov.in లో స్థితి ట్రాక్ చేయవచ్చు.' },
  { patterns: ['pm కిసాన్', 'pm kisan', 'రైతు'], answer: '🌾 **PM-కిసాన్**: అర్హత కలిగిన రైతులకు సంవత్సరానికి ₹6,000 3 వాయిదాలలో. pmkisan.gov.in లో ఆధార్, బ్యాంక్ ఖాతా, భూమి రికార్డులతో నమోదు చేయండి.' },
  { patterns: ['మోసం', 'otp', 'fraud', 'scam'], answer: '🚨 **భద్రత హెచ్చరిక**: మీ OTP, ఆధార్ లేదా బ్యాంక్ వివరాలను ఎవరికీ చెప్పకండి. ప్రభుత్వ అధికారులు OTP అడగరు. మోసం ఎదుర్కొంటే: **1930** కి కాల్ చేయండి.' },
  { patterns: ['ఉద్యోగం', 'job', 'work', 'పని'], answer: '💼 **ఉద్యోగాలు**: మీ దగ్గర ఉద్యోగాలు కనుగొనడానికి Worker Marketplace సందర్శించండి. Worker గా నమోదు చేసుకుని ధృవీకరించిన యజమానుల నుండి ఆహ్వానాలు పొందండి.' },
  { patterns: ['స్కాలర్షిప్', 'scholarship', 'చదువు'], answer: '🎓 **స్కాలర్షిప్‌లు**: Student Services విభాగంలో రాష్ట్ర మరియు కేంద్ర ప్రభుత్వ స్కాలర్షిప్‌లు చూడండి. scholarships.gov.in వెబ్‌సైట్ చూడండి.' },
  { patterns: ['నమస్కారం', 'నమస్కారాలు', 'హలో', 'help', 'సహాయం'], answer: '🙏 **నమస్కారం!** నేను మీ RIHC AI సహాయకుడిని. నేను ఇలాంటి విషయాలలో సహాయం చేయగలను:\n• ప్రభుత్వ సర్టిఫికేట్లు\n• స్కాలర్షిప్‌లు & ఉద్యోగాలు\n• రైతు పథకాలు\n• డిజిటల్ భద్రత\n\nఈ రోజు మీకు ఎలా సహాయం చేయగలను?' },
];

function getResponse(query: string, language: string): string {
  const q = query.toLowerCase();
  const faqs = language === 'te' ? FAQ_TE : FAQ_EN;
  for (const faq of faqs) {
    if (faq.patterns.some(p => q.includes(p))) {
      return faq.answer;
    }
  }
  // Fallback
  if (language === 'te') {
    return '🤔 మీ ప్రశ్న అర్థమైంది. మరింత సమాచారం కోసం సేవలు విభాగం చూడండి లేదా helpline 1800-XXX-XXXX కి కాల్ చేయండి. మీరు ఏ సేవ గురించి అడగాలనుకుంటున్నారు?';
  }
  return '🤔 I understand your query. For more information, please visit the relevant Services section or call our helpline at 1800-XXX-XXXX. Could you be more specific about what you need help with? Try asking about: certificates, scholarships, PM Kisan, jobs, or digital safety.';
}

export default function ChatbotWidget() {
  const { t, language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        id: '0',
        role: 'bot',
        text: t('chatbotWelcome'),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    await new Promise(r => setTimeout(r, 800 + Math.random() * 500));
    const response = getResponse(input, language);
    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'bot',
      text: response,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, botMsg]);
    setLoading(false);
  };

  const quickReplies = language === 'te'
    ? ['ఆదాయ సర్టిఫికేట్', 'ఉద్యోగాలు', 'స్కాలర్షిప్', 'మోసం']
    : ['Income Certificate', 'Find Jobs', 'Scholarships', 'UPI Safety'];

  return (
    <>
      {/* Chatbot FAB */}
      <button
        className="chatbot-fab"
        onClick={() => setOpen(o => !o)}
        title={t('chatbotTitle')}
        style={{ bottom: 24, right: 24 }}
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 96, right: 24, width: 360, maxWidth: 'calc(100vw - 32px)',
          height: 500, background: 'var(--card)', border: '1px solid var(--card-border)',
          borderRadius: '20px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          display: 'flex', flexDirection: 'column', zIndex: 900, overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px',
            background: 'linear-gradient(135deg, #1a6b3a, #1b4f72)',
            color: 'white',
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Bot size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '15px' }}>{t('chatbotTitle')}</div>
              <div style={{ fontSize: '11px', opacity: 0.8 }}>
                <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#4ade80', marginRight: 4 }} />
                Online • EN/TE/HI
              </div>
            </div>
            <button onClick={() => setOpen(false)}
              style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.map(msg => (
              <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div className={`chat-bubble ${msg.role}`} style={{ whiteSpace: 'pre-wrap', fontSize: '13px' }}>
                  {msg.text}
                </div>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: 3 }}>{msg.time}</span>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div className="chat-bubble bot" style={{ display: 'flex', gap: 4 }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{
                      width: 7, height: 7, borderRadius: '50%', background: 'var(--primary)',
                      animation: `pulse 1s ease-in-out ${i * 0.2}s infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Replies */}
          <div style={{ padding: '8px 12px', display: 'flex', gap: '6px', flexWrap: 'wrap', borderTop: '1px solid var(--card-border)' }}>
            {quickReplies.map(q => (
              <button key={q}
                onClick={() => { setInput(q); }}
                style={{
                  padding: '4px 10px', borderRadius: '20px', fontSize: '11px',
                  border: '1px solid var(--primary)', background: 'transparent',
                  color: 'var(--primary)', cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: '12px 16px', display: 'flex', gap: '8px', borderTop: '1px solid var(--card-border)' }}>
            <input
              className="input-field"
              placeholder={t('chatbotPlaceholder')}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              style={{ fontSize: '13px', padding: '10px 14px' }}
            />
            <button onClick={sendMessage} className="btn-primary"
              style={{ padding: '10px 14px', borderRadius: '10px', flexShrink: 0 }}
              disabled={loading}
            >
              {loading ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={16} />}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}
