'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShieldAlert, Key, Briefcase, Smartphone, Phone, Globe, ShieldCheck, HelpCircle, CheckCircle2, Lock, AlertTriangle, MessageSquareWarning } from 'lucide-react';
import { motion } from 'framer-motion';

const TIPS = [
  {
    id: 1, icon: <Globe size={24}/>, title: 'Identify Fake Websites', color: '#E74C3C',
    signs: [
      'Check the URL — official sites end in .gov.in or .nic.in',
      'Look for the padlock icon in browser address bar (HTTPS)',
      'Beware of sites that look like meesseva.com (wrong spelling)',
      'Government sites never ask for OTP via phone calls',
    ],
    realLink: 'meeseva.gov.in',
    fakeLink: 'meesevaonline.com',
  },
  {
    id: 2, icon: <Lock size={24}/>, title: 'Never Share OTPs', color: '#E67E22',
    signs: [
      'OTP stands for One Time Password — it is ONLY for YOU',
      'Banks, police, or government NEVER call to ask for OTP',
      'If someone asks for OTP = 100% FRAUD',
      'Sharing OTP can empty your bank account instantly',
    ],
    realLink: null,
    fakeLink: null,
  },
  {
    id: 3, icon: <Briefcase size={24}/>, title: 'Fake Job Offers', color: '#8E44AD',
    signs: [
      'Jobs offering ₹50,000/month for no skills = FAKE',
      'Never pay "registration fee" or "security deposit" for jobs',
      'WhatsApp job offers from unknown numbers are usually scams',
      'Check company on MCA.gov.in before joining',
    ],
    realLink: 'https://www.ncs.gov.in',
    fakeLink: null,
  },
  {
    id: 4, icon: <Smartphone size={24}/>, title: 'UPI Safety Rules', color: '#1B4F72',
    signs: [
      'QR Code is ONLY for PAYING — never for receiving money',
      'If someone says "scan to receive money" = SCAM',
      'Never share your UPI PIN with anyone',
      'Use only official apps: Google Pay, PhonePe, BHIM',
    ],
    realLink: 'https://www.bhimupi.org.in',
    fakeLink: null,
  },
  {
    id: 5, icon: <MessageSquareWarning size={24}/>, title: 'WhatsApp Scams', color: '#27AE60',
    signs: [
      '"You won a lottery!" = SCAM — delete immediately',
      'Never click suspicious links in WhatsApp',
      '"Your Aadhaar is blocked, click here" = FAKE',
      'PM/CM never contacts citizens via WhatsApp',
    ],
    realLink: null,
    fakeLink: null,
  },
  {
    id: 6, icon: <Key size={24}/>, title: 'Strong Passwords', color: '#16A085',
    signs: [
      'Use at least 8 characters with letters + numbers + symbols',
      'Never use 1234, abcd, your name, or date of birth',
      'Use different passwords for different accounts',
      'Change passwords every 3-6 months',
    ],
    realLink: null,
    fakeLink: null,
  },
  {
    id: 7, icon: <ShieldCheck size={24}/>, title: 'Official Government Websites', color: '#1A6B3A',
    signs: [
      'Income Tax: incometaxindia.gov.in',
      'Aadhaar: uidai.gov.in or myaadhaar.uidai.gov.in',
      'PAN: tin.nsdl.com or onlineservices.nsdl.com',
      'Passport: passportindia.gov.in',
    ],
    realLink: 'https://india.gov.in',
    fakeLink: null,
  },
  {
    id: 8, icon: <Phone size={24}/>, title: 'Cybercrime Helpline: 1930', color: '#C0392B',
    signs: [
      'Call 1930 immediately if you face online fraud',
      'Report at cybercrime.gov.in',
      'Act within 24 hours to block fraudulent transactions',
      'Keep evidence: screenshots, bank statements',
    ],
    realLink: 'https://cybercrime.gov.in',
    fakeLink: null,
  },
];

const QUIZ_QUESTIONS = [
  { q: 'Someone calls you saying your Aadhaar is blocked and asks for your OTP. What do you do?', correct: 1, options: ['Share OTP quickly', 'Hang up immediately — it\'s a scam', 'Ask them for more details', 'Give them your Aadhaar number'] },
  { q: 'You receive a WhatsApp message saying "You won ₹10 lakh! Click this link to claim." What do you do?', correct: 1, options: ['Click the link', 'Delete and ignore — it\'s a scam', 'Share with family', 'Reply asking for more information'] },
  { q: 'An employer says you need to pay ₹2,000 "registration fee" before starting work. What do you do?', correct: 1, options: ['Pay immediately', 'Refuse — legitimate jobs never charge fees', 'Borrow money and pay', 'Pay half now'] },
];

export default function AwarenessPage() {
  const { t } = useLanguage();
  const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

  return (
    <div className="bg-[var(--bg)] min-h-[90vh] pb-12 relative">
      {/* Hero */}
      <div className="bg-[var(--primary)] pt-28 pb-20 px-4 md:px-6 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500 opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 opacity-20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
        
        <div className="relative z-10 max-w-[800px] mx-auto">
          <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/20 backdrop-blur-md">
            <ShieldAlert size={40} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">{t('awarenessTitle')}</h1>
          <p className="opacity-90 max-w-[600px] mx-auto mb-8 text-[15px] md:text-[17px] leading-relaxed font-medium">{t('awarenessDesc')}</p>
          
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 py-3 px-6 rounded-2xl bg-red-500/20 border-2 border-red-500/50 text-white font-bold text-[15px] backdrop-blur-md shadow-lg">
            <span className="flex items-center gap-2"><AlertTriangle size={20} className="text-red-300" /> Cybercrime Helpline:</span>
            <span className="font-black text-2xl tracking-widest text-red-200">1930</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 -mt-8 relative z-20">
        {/* Awareness Cards */}
        <div className="mb-12">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white rounded-3xl shadow-sm border border-[var(--card-border)] p-6 mb-8">
            <h2 className="text-[20px] font-extrabold text-[var(--text)] flex items-center gap-2"><ShieldAlert size={20} className="text-[var(--primary)]"/> Common Online Scams & Prevention</h2>
            <p className="text-[14px] text-[var(--text-muted)] font-medium mt-1">Learn to recognize and protect yourself from digital fraud.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TIPS.map((tip, idx) => (
              <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={idx} key={tip.id} className="bg-white rounded-3xl p-6 border-2 transition-all hover:shadow-lg hover:-translate-y-1 relative overflow-hidden group" style={{ borderColor: `${tip.color}30` }}>
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5 rounded-bl-full transition-transform group-hover:scale-110" style={{ background: tip.color }} />
                
                <div className="flex items-start gap-4 mb-5 relative z-10">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border" style={{ background: `${tip.color}15`, color: tip.color, borderColor: `${tip.color}30` }}>
                    {tip.icon}
                  </div>
                  <div className="pt-2">
                    <h3 className="font-black text-[18px] leading-tight" style={{ color: tip.color }}>{tip.title}</h3>
                  </div>
                </div>

                <div className="grid gap-3 mb-6 relative z-10">
                  {tip.signs.map((sign, i) => (
                    <div key={i} className="flex gap-3 items-start text-[14px] leading-relaxed bg-[var(--bg)] p-3 rounded-xl border border-[var(--card-border)]">
                      <CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: tip.color }} />
                      <span className="text-[var(--text)] font-medium">{sign}</span>
                    </div>
                  ))}
                </div>

                {tip.realLink && (
                  <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center pt-4 border-t border-[var(--card-border)] relative z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 text-[12px] font-bold rounded-lg border border-green-200"><CheckCircle2 size={14}/> Real: {tip.realLink}</span>
                    {tip.fakeLink && <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 text-[12px] font-bold rounded-lg border border-red-200"><AlertTriangle size={14}/> Fake: {tip.fakeLink}</span>}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Quiz */}
        <section className="mb-12">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white rounded-3xl shadow-sm border border-[var(--card-border)] p-6 mb-8">
            <h2 className="text-[20px] font-extrabold text-[var(--text)] flex items-center gap-2"><HelpCircle size={20} className="text-[#27AE60]"/> Test Your Digital Safety Knowledge</h2>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {QUIZ_QUESTIONS.map((q, i) => (
              <motion.div initial="hidden" animate="visible" variants={fadeUp} key={i} className="bg-white border border-[var(--card-border)] rounded-3xl p-6 shadow-sm flex flex-col">
                <div className="font-extrabold text-[15px] mb-5 flex gap-3 text-[var(--text)] leading-relaxed">
                  <span className="w-8 h-8 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center text-[14px] font-black shrink-0">{i + 1}</span>
                  <span className="pt-1">{q.q}</span>
                </div>
                <div className="flex flex-col gap-3 mt-auto">
                  {q.options.map((opt, j) => (
                    <div key={j} className={`p-4 rounded-xl text-[14px] cursor-pointer transition-all border-2 flex items-center gap-3 ${j === q.correct ? 'border-green-500 bg-green-50 text-green-700 font-bold' : 'border-[var(--card-border)] bg-[var(--bg2)] text-[var(--text)] font-medium hover:border-[var(--text-muted)]'}`}>
                      {j === q.correct ? <CheckCircle2 size={18} className="text-green-500 shrink-0"/> : <div className="w-4 h-4 rounded-full border-2 border-[var(--text-muted)] shrink-0"/>} 
                      {opt}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Report Cybercrime */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-gradient-to-br from-[#C0392B] to-[#E74C3C] rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-black opacity-10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          
          <div className="relative z-10">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-md">
              <ShieldAlert size={48} className="text-white" />
            </div>
            <h2 className="text-[28px] md:text-[36px] font-black mb-4 tracking-tight">Victim of Online Fraud?</h2>
            <p className="opacity-90 mb-8 max-w-[600px] mx-auto text-[15px] md:text-[17px] leading-relaxed font-medium">
              Act immediately! The faster you report, the better the chances of recovering your money. Do not wait.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="p-5 rounded-2xl bg-white/10 border border-white/30 backdrop-blur-md w-full sm:w-auto">
                <div className="text-[32px] md:text-[40px] font-black tracking-widest leading-none mb-2 text-white shadow-sm">1930</div>
                <div className="text-[13px] opacity-90 font-bold uppercase tracking-wider">National Cybercrime Helpline</div>
              </div>
              <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="no-underline w-full sm:w-auto block">
                <button className="w-full sm:w-auto py-5 px-8 rounded-2xl bg-white text-[#C0392B] border-none font-black text-[15px] flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1">
                  <Globe size={20} /> Report at cybercrime.gov.in
                </button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
