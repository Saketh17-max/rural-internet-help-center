'use client';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Volume2, ExternalLink, Phone, MapPin, Clock, Plus, Minus } from 'lucide-react';
import toast from 'react-hot-toast';

const SCHEMES = [
  { name: 'Indira Gandhi National Old Age Pension (IGNOAPS)', amount: '₹500-1,000/month', eligibility: 'Age 60+, BPL', link: 'https://nsap.nic.in' },
  { name: 'Atal Vayo Abhyuday Yojana (AVYUKT)', amount: '₹1,000/month', eligibility: 'Age 60+, income < ₹1 lakh/year', link: 'https://avyukt.gov.in' },
  { name: 'Ayushman Bharat PM-JAY', amount: 'Free healthcare up to ₹5 lakh', eligibility: 'BPL families, senior priority', link: 'https://pmjay.gov.in' },
  { name: 'Pradhan Mantri Vaya Vandana Yojana', amount: '8% guaranteed returns', eligibility: 'Age 60+, investment scheme', link: 'https://licindia.in' },
];

const EMERGENCY_CONTACTS = [
  { name: 'Police', number: '100', icon: '👮', color: '#2980b9' },
  { name: 'Ambulance', number: '108', icon: '🚑', color: '#e74c3c' },
  { name: 'Senior Helpline', number: '14567', icon: '👴', color: '#27ae60' },
  { name: 'Elder Abuse', number: '1800-180-1253', icon: '🆘', color: '#e67e22' },
];

const MEDICINE_REMINDERS = [
  { medicine: 'Blood Pressure (Amlodipine)', time: '8:00 AM', taken: true },
  { medicine: 'Diabetes (Metformin)', time: '12:00 PM', taken: true },
  { medicine: 'Vitamin D3', time: '6:00 PM', taken: false },
  { medicine: 'Aspirin', time: '9:00 PM', taken: false },
];

const HOSPITALS = [
  { name: 'Government Area Hospital', dist: '2.3 km', type: 'Government', beds: 200, phone: '08682-234567' },
  { name: 'Primary Health Center, Guntur', dist: '0.8 km', type: 'PHC', beds: 30, phone: '08682-223456' },
  { name: 'Community Health Center', dist: '5.1 km', type: 'CHC', beds: 100, phone: '08682-245678' },
];

export default function SeniorsPage() {
  const { t } = useLanguage();
  const [largeText, setLargeText] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'te-IN';
    u.rate = 0.8;
    window.speechSynthesis.speak(u);
  };

  return (
    <div className="bg-[var(--bg)] min-h-[90vh] pb-12" style={{ fontSize: largeText ? '1.2em' : '1em' }}>
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#e65100] to-[#f39c12] pt-24 pb-12 px-4 md:px-6 text-white text-center">
        <div className="text-4xl md:text-5xl mb-3 md:mb-4">🧓</div>
        <h1 className="text-2xl md:text-[clamp(1.8rem,4vw,2.4rem)] font-black mb-2.5">{t('seniorsTitle')}</h1>
        <p className="opacity-90 max-w-[560px] mx-auto mb-6 md:mb-8 text-sm md:text-base leading-relaxed">Dedicated support for senior citizens — pension, health, emergency contacts, and medicine reminders</p>

        {/* Accessibility Controls */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button onClick={() => setLargeText(l => !l)}
            className="w-full sm:w-auto px-5 py-3 rounded-full bg-[rgba(255,255,255,0.2)] border-2 border-[rgba(255,255,255,0.4)] text-white cursor-pointer font-bold text-[14px] md:text-[15px] hover:bg-[rgba(255,255,255,0.3)] transition-colors min-h-[48px]">
            {largeText ? '🔡 Normal Text' : '🔤 Large Text Mode'}
          </button>
          <button onClick={() => speak('Welcome to the Senior Citizen Support page. This page helps you with pension, health, and emergency contacts.')}
            className="w-full sm:w-auto px-5 py-3 rounded-full bg-[rgba(255,255,255,0.2)] border-2 border-[rgba(255,255,255,0.4)] text-white cursor-pointer font-bold text-[14px] md:text-[15px] hover:bg-[rgba(255,255,255,0.3)] transition-colors min-h-[48px] flex items-center justify-center gap-2">
            <Volume2 size={18} /> Speak Page
          </button>
          <div className="w-full sm:w-auto flex justify-between sm:justify-center items-center gap-3 px-5 py-3 rounded-full bg-[rgba(255,255,255,0.15)] border-2 border-[rgba(255,255,255,0.3)] min-h-[48px]">
            <button onClick={() => setFontSize(f => Math.max(14, f - 2))} className="bg-transparent border-none text-white cursor-pointer p-1 active:scale-95"><Minus size={18} /></button>
            <span className="text-[13px] font-bold">Text Size</span>
            <button onClick={() => setFontSize(f => Math.min(24, f + 2))} className="bg-transparent border-none text-white cursor-pointer p-1 active:scale-95"><Plus size={18} /></button>
          </div>
        </div>
      </div>

      <div className="page-container px-4 md:px-6 py-6 md:py-10" style={{ fontSize: `${fontSize}px` }}>
        {/* Emergency Contacts - MOST IMPORTANT, shown first */}
        <section className="mb-10 md:mb-12">
          <h2 className="text-[1.3em] md:text-[1.4em] font-extrabold mb-5 md:mb-6 text-[#e74c3c] flex items-center gap-2">🆘 {t('emergencyContacts')}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {EMERGENCY_CONTACTS.map(contact => (
              <button key={contact.name}
                onClick={() => { speak(`Calling ${contact.name} at ${contact.number}`); toast.success(`Calling ${contact.number}...`); }}
                className="border-none rounded-2xl p-4 md:p-6 cursor-pointer text-center text-white transition-transform active:scale-95 flex flex-col items-center shadow-lg"
                style={{ background: contact.color, boxShadow: `0 4px 20px ${contact.color}40` }}
              >
                <div className="text-[32px] md:text-[40px] mb-2">{contact.icon}</div>
                <div className="font-black text-[1.2em] md:text-[1.5em] tracking-widest leading-none mb-1">{contact.number}</div>
                <div className="text-[0.8em] md:text-[0.9em] opacity-90 mt-1">{contact.name}</div>
                <div className="mt-3 md:mt-4 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-[rgba(255,255,255,0.2)] text-[0.7em] md:text-[0.75em] font-bold w-full max-w-[120px]">
                  📞 CALL NOW
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Medicine Reminders */}
        <section className="mb-10 md:mb-12">
          <h2 className="text-[1.3em] md:text-[1.4em] font-extrabold mb-5 md:mb-6 flex items-center gap-2">💊 {t('medicineReminder')}</h2>
          <div className="flex flex-col gap-3 md:gap-4">
            {MEDICINE_REMINDERS.map((med, i) => (
              <div key={i} className="bg-[var(--card)] rounded-xl md:rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row sm:items-center gap-3.5 md:gap-4 shadow-sm"
                style={{ border: med.taken ? '2px solid #27ae60' : '2px solid #f39c12' }}>
                <div className="flex items-center gap-3 md:gap-4 w-full sm:w-auto flex-1">
                  <div className="w-10 h-10 md:w-11 md:h-11 rounded-full shrink-0 flex items-center justify-center text-[20px] md:text-[22px]"
                    style={{ background: med.taken ? '#27ae6015' : '#f39c1215' }}>
                    {med.taken ? '✅' : '⏰'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-[0.95em] md:text-[1em] mb-0.5 leading-tight">{med.medicine}</div>
                    <div className="text-[0.8em] md:text-[0.85em] text-[var(--text-muted)] flex items-center gap-1 mt-1 font-medium">
                      <Clock size={12} className="shrink-0" /> {med.time}
                    </div>
                  </div>
                </div>
                <div className="w-full sm:w-auto mt-1 sm:mt-0">
                  {med.taken ? (
                    <div className="px-3 py-1.5 rounded-lg bg-[rgba(39,174,96,0.1)] text-[#27ae60] font-bold text-[0.8em] md:text-[0.85em] inline-block w-full sm:w-auto text-center border border-[rgba(39,174,96,0.2)]">
                      Taken ✓
                    </div>
                  ) : (
                    <button className="btn-accent w-full sm:w-auto justify-center py-2 px-4 text-[0.8em] md:text-[0.85em] min-h-[40px] md:min-h-[44px]"
                      onClick={() => toast.success('Medicine marked as taken!')}>
                      Mark Taken
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button className="btn-outline w-full sm:w-auto mt-4 md:mt-5 text-[0.85em] md:text-[0.9em] justify-center min-h-[44px] md:min-h-[48px]"
            onClick={() => toast.success('Add medicine reminder (coming soon)')}>
            ➕ Add Medicine
          </button>
        </section>

        {/* Pension Schemes */}
        <section className="mb-10 md:mb-12">
          <h2 className="text-[1.3em] md:text-[1.4em] font-extrabold mb-5 md:mb-6 flex items-center gap-2">💰 {t('pensionInfo')}</h2>
          <div className="flex flex-col gap-3 md:gap-4">
            {SCHEMES.map(scheme => (
              <div key={scheme.name} className="bg-[var(--card)] border-[1.5px] border-[var(--card-border)] rounded-xl md:rounded-2xl p-4 md:p-5 flex flex-col md:flex-row gap-4 md:gap-5 md:items-center shadow-sm">
                <div className="flex-1 min-w-0">
                  <div className="font-extrabold text-[0.95em] md:text-[1em] mb-1.5 leading-tight">{scheme.name}</div>
                  <div className="text-[#27ae60] font-bold text-[0.85em] md:text-[0.9em] mb-1">{scheme.amount}</div>
                  <div className="text-[0.75em] md:text-[0.8em] text-[var(--text-muted)] font-medium mt-1.5">Eligibility: {scheme.eligibility}</div>
                </div>
                <div className="flex gap-2.5 md:gap-3 mt-2 md:mt-0 w-full md:w-auto">
                  <button onClick={() => speak(`${scheme.name} provides ${scheme.amount}. Eligibility: ${scheme.eligibility}`)}
                    className="p-2.5 md:p-3 rounded-lg border border-[var(--card-border)] bg-[var(--bg2)] cursor-pointer hover:bg-[rgba(0,0,0,0.05)] transition-colors active:scale-95 flex items-center justify-center min-h-[44px]">
                    <Volume2 size={18} className="text-[var(--text)]" />
                  </button>
                  <a href={scheme.link} target="_blank" rel="noopener noreferrer" className="no-underline flex-1 md:flex-none">
                    <button className="btn-outline w-full justify-center text-[0.8em] md:text-[0.85em] min-h-[44px] px-5">Apply</button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hospital Locator */}
        <section className="mb-10 md:mb-12">
          <h2 className="text-[1.3em] md:text-[1.4em] font-extrabold mb-5 md:mb-6 flex items-center gap-2">🏥 {t('hospitalLocator')}</h2>
          <div className="flex flex-col gap-3 md:gap-4">
            {HOSPITALS.map(h => (
              <div key={h.name} className="bg-[var(--card)] border-[1.5px] border-[var(--card-border)] rounded-xl md:rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row gap-3.5 md:gap-4 sm:items-center shadow-sm">
                <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0 w-full">
                  <div className="text-[28px] md:text-[32px] shrink-0">🏥</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-[0.95em] md:text-[1em] leading-tight truncate mb-1">{h.name}</div>
                    <div className="flex gap-2 md:gap-3 flex-wrap mt-1.5 items-center">
                      <span className="text-[0.75em] md:text-[0.8em] text-[var(--text-muted)] flex items-center gap-1 font-semibold">
                        <MapPin size={12} className="shrink-0" /> {h.dist}
                      </span>
                      <span className="badge badge-info text-[0.7em] md:text-[0.75em] px-2 py-0.5">{h.type}</span>
                      <span className="text-[0.75em] md:text-[0.8em] text-[var(--text-muted)] font-medium">🛏️ {h.beds} beds</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => toast.success(`Calling ${h.phone}`)}
                  className="btn-primary w-full sm:w-auto justify-center py-2.5 px-5 text-[0.8em] md:text-[0.85em] min-h-[44px] mt-1 sm:mt-0">
                  <Phone size={14} className="mr-1.5" /> Call
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Health Tips */}
        <div className="bg-gradient-to-br from-[#e65100] to-[#ef6c00] rounded-2xl md:rounded-[20px] p-5 md:p-8 text-white shadow-lg">
          <h2 className="text-[1.3em] md:text-[1.4em] font-extrabold mb-5 md:mb-6">🌟 Daily Health Tips for Seniors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {[
              { icon: '🚶', tip: 'Walk 20-30 minutes daily for better heart health' },
              { icon: '💧', tip: 'Drink 6-8 glasses of water daily' },
              { icon: '🥗', tip: 'Eat more vegetables, fruits, and less salt/sugar' },
              { icon: '😴', tip: 'Sleep 7-8 hours every night' },
              { icon: '🧘', tip: 'Practice yoga or meditation for mental peace' },
              { icon: '👨‍⚕️', tip: 'Get health checkup every 6 months' },
            ].map((item, i) => (
              <div key={i} className="p-3 md:p-4 rounded-xl bg-[rgba(255,255,255,0.15)] flex gap-3 items-start hover:bg-[rgba(255,255,255,0.2)] transition-colors">
                <span className="text-[22px] md:text-[24px] shrink-0 leading-none">{item.icon}</span>
                <span className="text-[0.8em] md:text-[0.85em] opacity-90 leading-relaxed font-medium mt-0.5">{item.tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
