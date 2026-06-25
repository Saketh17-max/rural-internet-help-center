'use client';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Volume2, ExternalLink, Phone, MapPin, Clock, Plus, Minus, Type, ShieldPlus, Ambulance, ShieldAlert, HeartPulse, Pill, CheckCircle2, IndianRupee, Activity, Droplets, Utensils, Moon, Heart, Stethoscope } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const SCHEMES = [
  { name: 'Indira Gandhi National Old Age Pension', amount: '₹500-1,000/month', eligibility: 'Age 60+, BPL', link: 'https://nsap.nic.in' },
  { name: 'Atal Vayo Abhyuday Yojana (AVYUKT)', amount: '₹1,000/month', eligibility: 'Age 60+, income < ₹1 lakh/year', link: 'https://avyukt.gov.in' },
  { name: 'Ayushman Bharat PM-JAY', amount: 'Free healthcare up to ₹5 lakh', eligibility: 'BPL families, senior priority', link: 'https://pmjay.gov.in' },
  { name: 'Pradhan Mantri Vaya Vandana Yojana', amount: '8% guaranteed returns', eligibility: 'Age 60+, investment scheme', link: 'https://licindia.in' },
];

const EMERGENCY_CONTACTS = [
  { name: 'Police Help', number: '100', icon: <ShieldAlert size={40}/>, color: '#2980B9' },
  { name: 'Ambulance', number: '108', icon: <Ambulance size={40}/>, color: '#E74C3C' },
  { name: 'Senior Helpline', number: '14567', icon: <ShieldPlus size={40}/>, color: '#27AE60' },
  { name: 'Elder Abuse', number: '1800-180-1253', icon: <Phone size={40}/>, color: '#E67E22' },
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

  const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

  return (
    <div className="bg-[var(--bg)] min-h-[90vh] pb-12 transition-all duration-300" style={{ fontSize: largeText ? '1.2em' : '1em' }}>
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#D35400] to-[#F39C12] pt-28 pb-20 px-4 md:px-6 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-400 opacity-20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
        
        <div className="relative z-10 max-w-[800px] mx-auto">
          <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/30 backdrop-blur-md">
            <HeartPulse size={40} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">{t('seniorsTitle')}</h1>
          <p className="opacity-90 max-w-[600px] mx-auto mb-8 text-[15px] md:text-[17px] leading-relaxed font-medium">
            Dedicated support for senior citizens — pension info, healthcare access, emergency contacts, and personalized medicine reminders.
          </p>

          {/* Accessibility Controls */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button onClick={() => setLargeText(l => !l)}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/30 text-white cursor-pointer font-bold text-[15px] transition-colors flex items-center justify-center gap-2 backdrop-blur-sm shadow-sm">
              <Type size={20} /> {largeText ? 'Normal Text Mode' : 'Large Text Mode'}
            </button>
            <button onClick={() => speak('Welcome to the Senior Citizen Support page. This page helps you with pension, health, and emergency contacts.')}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/30 text-white cursor-pointer font-bold text-[15px] transition-colors flex items-center justify-center gap-2 backdrop-blur-sm shadow-sm">
              <Volume2 size={20} /> Read Page Aloud
            </button>
            <div className="w-full sm:w-auto flex justify-between sm:justify-center items-center gap-4 px-6 py-4 rounded-2xl bg-black/10 border border-black/10 min-h-[56px] backdrop-blur-sm">
              <button onClick={() => setFontSize(f => Math.max(14, f - 2))} className="bg-transparent border-none text-white cursor-pointer hover:scale-110 active:scale-95 transition-transform"><Minus size={20} /></button>
              <span className="text-[14px] font-black tracking-widest uppercase opacity-90">Text Size</span>
              <button onClick={() => setFontSize(f => Math.min(24, f + 2))} className="bg-transparent border-none text-white cursor-pointer hover:scale-110 active:scale-95 transition-transform"><Plus size={20} /></button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8 -mt-8 relative z-20" style={{ fontSize: `${fontSize}px` }}>
        {/* Emergency Contacts - MOST IMPORTANT */}
        <section className="mb-12">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white rounded-3xl shadow-sm border border-[var(--card-border)] p-6 md:p-8 mb-6">
            <h2 className="text-[1.3em] font-extrabold text-[#E74C3C] flex items-center gap-3">
              <ShieldAlert size={28} /> {t('emergencyContacts')}
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {EMERGENCY_CONTACTS.map((contact, i) => (
              <motion.button initial="hidden" animate="visible" variants={fadeUp} custom={i} key={contact.name}
                onClick={() => { speak(`Calling ${contact.name} at ${contact.number}`); toast.success(`Calling ${contact.number}...`); }}
                className="border-none rounded-3xl p-6 md:p-8 cursor-pointer text-center text-white transition-all hover:scale-[1.02] active:scale-95 flex flex-col items-center shadow-lg relative overflow-hidden group"
                style={{ background: contact.color }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-bl-full transition-transform group-hover:scale-110" />
                <div className="mb-4 drop-shadow-md text-white/90 group-hover:text-white transition-colors">{contact.icon}</div>
                <div className="font-black text-[1.4em] md:text-[1.6em] tracking-wider leading-none mb-2 drop-shadow-sm">{contact.number}</div>
                <div className="text-[0.9em] opacity-90 font-bold uppercase tracking-wider mb-6">{contact.name}</div>
                <div className="mt-auto px-6 py-2.5 rounded-full bg-white text-[0.8em] font-black uppercase tracking-wider w-full shadow-sm group-hover:shadow-md transition-shadow" style={{ color: contact.color }}>
                  <Phone size={14} className="inline mr-1" /> Call Now
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-6 md:gap-8 mb-12">
          {/* Medicine Reminders */}
          <section>
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white rounded-3xl shadow-sm border border-[var(--card-border)] p-6 mb-6">
              <h2 className="text-[1.3em] font-extrabold text-[var(--text)] flex items-center gap-3">
                <Pill size={24} className="text-[#27AE60]"/> {t('medicineReminder')}
              </h2>
            </motion.div>
            <div className="flex flex-col gap-4">
              {MEDICINE_REMINDERS.map((med, i) => (
                <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={i} key={i} className="bg-white rounded-3xl p-5 md:p-6 flex flex-col sm:flex-row sm:items-center gap-4 shadow-sm border-2 transition-colors"
                  style={{ borderColor: med.taken ? '#27AE6030' : '#F39C1240' }}>
                  <div className="flex items-center gap-4 w-full sm:w-auto flex-1">
                    <div className="w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center border"
                      style={{ background: med.taken ? '#27AE6010' : '#F39C1210', color: med.taken ? '#27AE60' : '#F39C12', borderColor: med.taken ? '#27AE6030' : '#F39C1230' }}>
                      {med.taken ? <CheckCircle2 size={28}/> : <Clock size={28}/>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-extrabold text-[1em] mb-1 leading-tight text-[var(--text)]">{med.medicine}</div>
                      <div className="text-[0.85em] text-[var(--text-muted)] flex items-center gap-1.5 font-bold">
                        <Clock size={14} className="shrink-0 text-[var(--primary)]" /> {med.time}
                      </div>
                    </div>
                  </div>
                  <div className="w-full sm:w-auto mt-2 sm:mt-0 shrink-0">
                    {med.taken ? (
                      <div className="px-5 py-3 rounded-xl bg-green-50 text-green-700 font-bold text-[0.85em] w-full sm:w-auto text-center border border-green-200 flex items-center justify-center gap-2">
                        <CheckCircle2 size={16}/> Taken
                      </div>
                    ) : (
                      <button className="bg-[#F39C12] hover:bg-[#D68910] text-white border-none w-full sm:w-auto justify-center py-3 px-6 rounded-xl font-bold text-[0.85em] shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
                        onClick={() => toast.success('Medicine marked as taken!')}>
                        <CheckCircle2 size={16}/> Mark Taken
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
              <motion.button initial="hidden" animate="visible" variants={fadeUp} className="bg-white hover:bg-gray-50 text-[var(--text)] border-2 border-[var(--card-border)] border-dashed w-full py-4 rounded-3xl text-[0.9em] font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer text-[var(--text-muted)] hover:text-[var(--primary)] hover:border-[var(--primary)]"
                onClick={() => toast.success('Add medicine reminder (coming soon)')}>
                <Plus size={20} /> Add New Medicine
              </motion.button>
            </div>
          </section>

          <div className="flex flex-col gap-6 md:gap-8">
            {/* Hospital Locator */}
            <section>
              <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white rounded-3xl shadow-sm border border-[var(--card-border)] p-6 mb-6">
                <h2 className="text-[1.3em] font-extrabold text-[var(--text)] flex items-center gap-3">
                  <Activity size={24} className="text-[#E74C3C]"/> {t('hospitalLocator')}
                </h2>
              </motion.div>
              <div className="flex flex-col gap-4">
                {HOSPITALS.map((h, i) => (
                  <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={i} key={h.name} className="bg-white border-2 border-[var(--card-border)] hover:border-[#E74C3C] rounded-3xl p-5 md:p-6 flex flex-col sm:flex-row gap-5 sm:items-center shadow-sm hover:shadow-md transition-all group">
                    <div className="flex items-center gap-4 flex-1 min-w-0 w-full">
                      <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#E74C3C] flex items-center justify-center shrink-0 border border-red-100 group-hover:scale-110 transition-transform">
                        <Stethoscope size={24} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-extrabold text-[1em] leading-tight truncate mb-1.5 text-[var(--text)] group-hover:text-[#E74C3C] transition-colors">{h.name}</div>
                        <div className="flex gap-2.5 flex-wrap items-center">
                          <span className="text-[0.8em] font-bold text-red-600 flex items-center gap-1 bg-red-50 px-2 py-0.5 rounded-md border border-red-100">
                            <MapPin size={12} className="shrink-0" /> {h.dist}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[0.75em] font-bold border border-blue-100">{h.type}</span>
                          <span className="text-[0.75em] text-[var(--text-muted)] font-bold uppercase tracking-wider">🛏️ {h.beds} beds</span>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => toast.success(`Calling ${h.phone}`)}
                      className="bg-white hover:bg-red-50 text-[#E74C3C] border-2 border-[#E74C3C] w-full sm:w-auto justify-center py-3 px-6 rounded-xl text-[0.85em] font-bold transition-colors flex items-center gap-2 cursor-pointer">
                      <Phone size={16} /> Call Hospital
                    </button>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Pension Schemes */}
        <section className="mb-12">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white rounded-3xl shadow-sm border border-[var(--card-border)] p-6 md:p-8 mb-6">
            <h2 className="text-[1.3em] font-extrabold text-[var(--text)] flex items-center gap-3">
              <IndianRupee size={24} className="text-[#2980B9]"/> {t('pensionInfo')}
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SCHEMES.map((scheme, i) => (
              <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={i} key={scheme.name} className="bg-white border-2 border-[var(--card-border)] hover:border-[#2980B9] rounded-3xl p-6 flex flex-col gap-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
                <div className="flex-1 min-w-0">
                  <div className="font-extrabold text-[1em] mb-2 leading-tight text-[var(--text)] group-hover:text-[#2980B9] transition-colors">{scheme.name}</div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 font-bold text-[0.85em] rounded-lg border border-green-200 mb-3"><IndianRupee size={14}/> {scheme.amount}</div>
                  <div className="text-[0.85em] text-[var(--text-muted)] font-medium leading-relaxed bg-[var(--bg)] p-3 rounded-xl border border-[var(--card-border)]">Eligibility: <span className="font-bold text-[var(--text)]">{scheme.eligibility}</span></div>
                </div>
                <div className="flex gap-3 mt-auto pt-4 border-t border-[var(--card-border)]">
                  <button onClick={() => speak(`${scheme.name} provides ${scheme.amount}. Eligibility: ${scheme.eligibility}`)}
                    className="w-12 h-12 rounded-xl border-2 border-[var(--card-border)] bg-[var(--bg2)] cursor-pointer hover:bg-gray-100 hover:border-gray-300 transition-colors active:scale-95 flex items-center justify-center shrink-0">
                    <Volume2 size={20} className="text-[var(--text-muted)]" />
                  </button>
                  <a href={scheme.link} target="_blank" rel="noopener noreferrer" className="no-underline flex-1">
                    <button className="bg-white hover:bg-blue-50 text-[#2980B9] border-2 border-[#2980B9] w-full h-12 rounded-xl text-[0.85em] font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer">
                      <ExternalLink size={16} /> Apply Online
                    </button>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Health Tips */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-gradient-to-br from-[#16A085] to-[#1ABC9C] rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <h2 className="text-[1.4em] font-black mb-8 flex items-center gap-3 relative z-10"><Heart size={28} className="text-red-200"/> Daily Health Tips for Seniors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {[
              { icon: <Activity size={24}/>, tip: 'Walk 20-30 minutes daily for better heart health' },
              { icon: <Droplets size={24}/>, tip: 'Drink 6-8 glasses of water daily to stay hydrated' },
              { icon: <Utensils size={24}/>, tip: 'Eat more vegetables, fruits, and less salt/sugar' },
              { icon: <Moon size={24}/>, tip: 'Sleep 7-8 hours every night for mental clarity' },
              { icon: <HeartPulse size={24}/>, tip: 'Practice yoga or meditation for mental peace' },
              { icon: <Stethoscope size={24}/>, tip: 'Get a full health checkup every 6 months' },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/15 transition-colors backdrop-blur-sm flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <span className="text-[0.9em] opacity-90 leading-relaxed font-bold mt-1">{item.tip}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
