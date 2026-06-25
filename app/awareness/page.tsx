'use client';
import { useLanguage } from '@/contexts/LanguageContext';

const TIPS = [
  {
    id: 1, icon: '🚫', title: 'Identify Fake Websites', color: '#e74c3c',
    signs: [
      'Check the URL — official sites end in .gov.in or .nic.in',
      'Look for the padlock 🔒 in browser address bar (HTTPS)',
      'Beware of sites that look like meesseva.com (wrong spelling)',
      'Government sites never ask for OTP via phone calls',
    ],
    realLink: 'meeseva.gov.in',
    fakeLink: 'meesevaonline.com',
  },
  {
    id: 2, icon: '🔐', title: 'Never Share OTPs', color: '#e67e22',
    signs: [
      'OTP stands for One Time Password — it is ONLY for YOU',
      'Banks, police, or government NEVER call to ask for OTP',
      'If someone asks for OTP = 100% FRAUD',
      'Sharing OTP can empty your bank account',
    ],
    realLink: null,
    fakeLink: null,
  },
  {
    id: 3, icon: '💼', title: 'Fake Job Offers', color: '#8e44ad',
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
    id: 4, icon: '💳', title: 'UPI Safety Rules', color: '#1b4f72',
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
    id: 5, icon: '📱', title: 'WhatsApp Scams', color: '#27ae60',
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
    id: 6, icon: '🔑', title: 'Strong Passwords', color: '#16a085',
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
    id: 7, icon: '🌐', title: 'Official Government Websites', color: '#1a6b3a',
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
    id: 8, icon: '📞', title: 'Cybercrime Helpline: 1930', color: '#c0392b',
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

  return (
    <div className="bg-[var(--bg)] min-h-[90vh] pb-12">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1b2631] to-[#2c3e50] pt-24 pb-10 md:pb-12 px-4 md:px-6 text-white text-center">
        <div className="text-4xl md:text-5xl mb-3 md:mb-4">🛡️</div>
        <h1 className="text-2xl md:text-[clamp(1.8rem,4vw,2.4rem)] font-black mb-2.5">{t('awarenessTitle')}</h1>
        <p className="opacity-90 max-w-[560px] mx-auto mb-5 md:mb-6 text-[13px] md:text-[15px] leading-relaxed">{t('awarenessDesc')}</p>
        <div className="inline-flex items-center gap-2 md:gap-3 py-2.5 px-5 md:py-3 md:px-6 rounded-full bg-[rgba(231,76,60,0.2)] border-2 border-[rgba(231,76,60,0.5)] text-[#e74c3c] font-bold text-[13px] md:text-[15px]">
          🚨 Cybercrime Helpline: <strong className="font-black tracking-wide">1930</strong>
        </div>
      </div>

      <div className="page-container px-4 md:px-6 py-6 md:py-10">
        {/* Awareness Cards */}
        <div className="mb-10 md:mb-12">
          <div className="text-left mb-6 md:mb-8">
            <h2 className="text-[20px] md:text-[24px] font-extrabold leading-tight">Common <span className="text-[var(--primary)]">Online Scams</span> & How to Avoid Them</h2>
            <div className="w-12 h-1 bg-[var(--primary)] mt-3 rounded-full mb-3" />
            <p className="text-[13px] md:text-[15px] text-[var(--text-muted)]">Learn to recognize and protect yourself from digital fraud</p>
          </div>

          <div className="flex flex-col gap-4 md:gap-5">
            {TIPS.map(tip => (
              <div key={tip.id} className="bg-[var(--card)] rounded-2xl p-4 md:p-6 overflow-hidden relative shadow-sm" style={{ border: `1.5px solid ${tip.color}20` }}>
                <div className="absolute top-0 left-0 w-1.5 bottom-0" style={{ background: tip.color, borderRadius: '16px 0 0 16px' }} />
                <div className="flex flex-col sm:flex-row gap-4 md:gap-5 items-start pl-2">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-[26px] md:text-[28px] shrink-0" style={{ background: `${tip.color}15` }}>
                    {tip.icon}
                  </div>
                  <div className="flex-1 min-w-0 w-full">
                    <div className="font-extrabold text-[15px] md:text-[17px] mb-3 md:mb-4" style={{ color: tip.color }}>{tip.title}</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                      {tip.signs.map((sign, i) => (
                        <div key={i} className="flex gap-2.5 items-start text-[12px] md:text-[13px] leading-relaxed">
                          <span className="shrink-0 mt-[1px] font-bold" style={{ color: tip.color }}>✓</span>
                          <span className="text-[var(--text-muted)] font-medium">{sign}</span>
                        </div>
                      ))}
                    </div>
                    {tip.realLink && (
                      <div className="mt-4 md:mt-5 flex flex-col sm:flex-row gap-2 md:gap-3 items-start sm:items-center">
                        <span className="badge badge-success text-[10px] md:text-[11px] px-2.5 py-1">✅ Real: {tip.realLink}</span>
                        {tip.fakeLink && <span className="badge badge-danger text-[10px] md:text-[11px] px-2.5 py-1">❌ Fake: {tip.fakeLink}</span>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Quiz */}
        <section className="mb-10 md:mb-12">
          <div className="text-left mb-6 md:mb-8">
            <h2 className="text-[20px] md:text-[24px] font-extrabold leading-tight">Test Your <span className="text-[var(--primary)]">Digital Safety</span> Knowledge</h2>
            <div className="w-12 h-1 bg-[var(--primary)] mt-3 rounded-full" />
          </div>
          <div className="flex flex-col gap-4 md:gap-5">
            {QUIZ_QUESTIONS.map((q, i) => (
              <div key={i} className="bg-[var(--card)] border-[1.5px] border-[var(--card-border)] rounded-2xl p-4 md:p-6 shadow-sm">
                <div className="font-bold text-[14px] md:text-[15px] mb-4 md:mb-5 flex gap-3 leading-snug">
                  <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-[12px] md:text-[13px] font-black shrink-0 mt-0.5">{i + 1}</span>
                  <span className="pt-1">{q.q}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-3">
                  {q.options.map((opt, j) => (
                    <div key={j} className={`p-3 md:p-3.5 rounded-xl text-[12px] md:text-[13px] cursor-pointer transition-colors ${j === q.correct ? 'border-2 border-[#27ae60] bg-[rgba(39,174,96,0.08)] text-[#27ae60] font-bold' : 'border-[1.5px] border-[var(--card-border)] bg-[var(--bg2)] text-[var(--text)] font-medium hover:border-[rgba(0,0,0,0.1)]'}`}>
                      <span className="mr-1.5">{j === q.correct ? '✅' : '○'}</span> {opt}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Report Cybercrime */}
        <div className="bg-gradient-to-br from-[#c0392b] to-[#e74c3c] rounded-2xl md:rounded-[20px] p-6 md:p-8 text-white text-center shadow-lg">
          <div className="text-[48px] md:text-[56px] mb-3 md:mb-4">🚨</div>
          <h2 className="text-[22px] md:text-[26px] font-black mb-2 md:mb-3">Victim of Online Fraud?</h2>
          <p className="opacity-90 mb-6 md:mb-8 max-w-[500px] mx-auto text-[13px] md:text-[15px] leading-relaxed">
            Act immediately! The faster you report, the better the chances of recovering your money.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
            <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-[rgba(255,255,255,0.2)] border-2 border-[rgba(255,255,255,0.4)] w-full sm:w-auto">
              <div className="text-[28px] md:text-[32px] font-black tracking-widest leading-none mb-1">1930</div>
              <div className="text-[11px] md:text-[13px] opacity-90 font-bold">National Cybercrime Helpline</div>
            </div>
            <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="no-underline w-full sm:w-auto block h-full">
              <button className="w-full h-full py-4 px-6 md:px-8 rounded-xl md:rounded-2xl bg-white text-[#c0392b] border-none font-black text-[13px] md:text-[15px] cursor-pointer hover:bg-gray-100 transition-colors shadow-md">
                🌐 Report at cybercrime.gov.in
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
