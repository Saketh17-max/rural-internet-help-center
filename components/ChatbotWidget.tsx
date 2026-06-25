'use client';
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

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
  }, [open, messages.length, t]);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

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
        onClick={() => setOpen(o => !o)}
        title={t('chatbotTitle')}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full border-none cursor-pointer flex items-center justify-center transition-all duration-300 z-[900] shadow-lg hover:scale-110 active:scale-95 ${open ? 'bg-[var(--card)] text-[var(--text)] border border-[var(--card-border)]' : 'bg-[var(--primary)] text-white'}`}
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-[90px] right-6 w-[360px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-120px)] bg-[var(--card)] border border-[var(--card-border)] rounded-2xl shadow-xl flex flex-col z-[900] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#0F4C81] p-4 flex items-center gap-3 text-white">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Bot size={22} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-[15px] leading-tight truncate">{t('chatbotTitle')}</div>
                <div className="text-[12px] text-blue-200 flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Online • AI Assistant
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white border-none cursor-pointer">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-[var(--bg)]">
              {messages.map(msg => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
                  key={msg.id} 
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`max-w-[85%] p-3 rounded-2xl text-[14px] leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-[var(--primary)] text-white rounded-br-sm' : 'bg-[var(--card)] text-[var(--text)] border border-[var(--card-border)] rounded-bl-sm'}`} style={{ whiteSpace: 'pre-wrap' }}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-[var(--text-muted)] mt-1.5 px-1 font-medium">{msg.time}</span>
                </motion.div>
              ))}
              {loading && (
                <div className="flex items-center gap-2">
                  <div className="bg-[var(--card)] border border-[var(--card-border)] p-3 rounded-2xl rounded-bl-sm flex gap-1.5">
                    {[0, 1, 2].map(i => (
                      <motion.span 
                        key={i} 
                        className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)]"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar bg-[var(--card)] border-t border-[var(--card-border)]">
              {quickReplies.map(q => (
                <button key={q}
                  onClick={() => { setInput(q); }}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full text-[12px] font-medium border border-[var(--primary)] text-[var(--primary)] bg-transparent hover:bg-[rgba(15,76,129,0.05)] transition-colors cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 bg-[var(--card)] border-t border-[var(--card-border)] flex gap-2">
              <input
                className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg)] text-[14px] focus:outline-none focus:border-[var(--primary)] transition-colors"
                placeholder={t('chatbotPlaceholder')}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
              />
              <button 
                onClick={sendMessage} 
                disabled={loading || !input.trim()}
                className="w-11 h-11 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center border-none cursor-pointer disabled:opacity-50 transition-colors hover:bg-[var(--primary-light)] shrink-0"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className="ml-0.5" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
