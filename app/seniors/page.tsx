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
    <div style={{ background: 'var(--bg)', minHeight: '90vh', fontSize: largeText ? '1.2em' : '1em' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #e65100, #f39c12)', padding: '50px 24px', color: 'white', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🧓</div>
        <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.4rem)', fontWeight: 900, marginBottom: 10 }}>{t('seniorsTitle')}</h1>
        <p style={{ opacity: 0.85, maxWidth: 560, margin: '0 auto 20px' }}>Dedicated support for senior citizens — pension, health, emergency contacts, and medicine reminders</p>

        {/* Accessibility Controls */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => setLargeText(l => !l)}
            style={{ padding: '10px 20px', borderRadius: '50px', background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.4)', color: 'white', cursor: 'pointer', fontWeight: 700, fontSize: 14 }}>
            {largeText ? '🔡 Normal Text' : '🔤 Large Text Mode'}
          </button>
          <button onClick={() => speak('Welcome to the Senior Citizen Support page. This page helps you with pension, health, and emergency contacts.')}
            style={{ padding: '10px 20px', borderRadius: '50px', background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.4)', color: 'white', cursor: 'pointer', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Volume2 size={16} /> Speak Page
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: '50px', background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.3)' }}>
            <button onClick={() => setFontSize(f => Math.max(14, f - 2))} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: 18, padding: 0 }}><Minus size={16} /></button>
            <span style={{ fontSize: 12 }}>Text Size</span>
            <button onClick={() => setFontSize(f => Math.min(24, f + 2))} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: 18, padding: 0 }}><Plus size={16} /></button>
          </div>
        </div>
      </div>

      <div className="page-container" style={{ padding: '40px 20px', fontSize: `${fontSize}px` }}>
        {/* Emergency Contacts - MOST IMPORTANT, shown first */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: '1.4em', fontWeight: 800, marginBottom: 20, color: '#e74c3c' }}>🆘 {t('emergencyContacts')}</h2>
          <div className="grid-4">
            {EMERGENCY_CONTACTS.map(contact => (
              <button key={contact.name}
                onClick={() => { speak(`Calling ${contact.name} at ${contact.number}`); toast.success(`Calling ${contact.number}...`); }}
                style={{
                  background: contact.color, border: 'none', borderRadius: 20, padding: '24px 20px',
                  cursor: 'pointer', textAlign: 'center', color: 'white', transition: 'all 0.2s',
                  boxShadow: `0 4px 20px ${contact.color}40`,
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px)')}
                onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.transform = 'none')}
              >
                <div style={{ fontSize: 40, marginBottom: 8 }}>{contact.icon}</div>
                <div style={{ fontWeight: 900, fontSize: '1.5em', letterSpacing: 2 }}>{contact.number}</div>
                <div style={{ fontSize: '0.9em', opacity: 0.9, marginTop: 4 }}>{contact.name}</div>
                <div style={{ marginTop: 10, padding: '6px 12px', borderRadius: '50px', background: 'rgba(255,255,255,0.2)', fontSize: '0.75em', fontWeight: 700 }}>
                  📞 CALL NOW
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Medicine Reminders */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: '1.4em', fontWeight: 800, marginBottom: 20 }}>💊 {t('medicineReminder')}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {MEDICINE_REMINDERS.map((med, i) => (
              <div key={i} style={{
                background: 'var(--card)', border: med.taken ? '2px solid #27ae60' : '2px solid #f39c12',
                borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16,
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                  background: med.taken ? '#27ae6015' : '#f39c1215',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                }}>
                  {med.taken ? '✅' : '⏰'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '1em' }}>{med.medicine}</div>
                  <div style={{ fontSize: '0.85em', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={12} /> {med.time}
                  </div>
                </div>
                <div>
                  {med.taken ? (
                    <span className="badge badge-success">Taken ✓</span>
                  ) : (
                    <button className="btn-accent" style={{ padding: '8px 16px', fontSize: '0.85em' }}
                      onClick={() => toast.success('Medicine marked as taken!')}>
                      Mark Taken
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button className="btn-outline" style={{ marginTop: 12, fontSize: '0.9em' }}
            onClick={() => toast.success('Add medicine reminder (coming soon)')}>
            ➕ Add Medicine
          </button>
        </section>

        {/* Pension Schemes */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: '1.4em', fontWeight: 800, marginBottom: 20 }}>💰 {t('pensionInfo')}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {SCHEMES.map(scheme => (
              <div key={scheme.name} style={{ background: 'var(--card)', border: '1.5px solid var(--card-border)', borderRadius: 14, padding: '18px 20px', display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '1em', marginBottom: 4 }}>{scheme.name}</div>
                  <div style={{ color: '#27ae60', fontWeight: 700, fontSize: '0.9em', marginBottom: 4 }}>{scheme.amount}</div>
                  <div style={{ fontSize: '0.8em', color: 'var(--text-muted)' }}>Eligibility: {scheme.eligibility}</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => speak(`${scheme.name} provides ${scheme.amount}. Eligibility: ${scheme.eligibility}`)}
                    style={{ padding: '8px', borderRadius: 8, border: '1px solid var(--card-border)', background: 'none', cursor: 'pointer' }}>
                    <Volume2 size={16} style={{ color: 'var(--text-muted)' }} />
                  </button>
                  <a href={scheme.link} target="_blank" rel="noopener noreferrer">
                    <button className="btn-outline" style={{ padding: '8px 16px', fontSize: '0.85em' }}>Apply</button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hospital Locator */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: '1.4em', fontWeight: 800, marginBottom: 20 }}>🏥 {t('hospitalLocator')}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {HOSPITALS.map(h => (
              <div key={h.name} style={{ background: 'var(--card)', border: '1.5px solid var(--card-border)', borderRadius: 14, padding: '18px 20px', display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ fontSize: 32, flexShrink: 0 }}>🏥</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '1em' }}>{h.name}</div>
                  <div style={{ display: 'flex', gap: 12, marginTop: 4, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.8em', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <MapPin size={11} /> {h.dist}
                    </span>
                    <span className="badge badge-info" style={{ fontSize: '0.75em' }}>{h.type}</span>
                    <span style={{ fontSize: '0.8em', color: 'var(--text-muted)' }}>🛏️ {h.beds} beds</span>
                  </div>
                </div>
                <button onClick={() => toast.success(`Calling ${h.phone}`)}
                  className="btn-primary" style={{ padding: '10px 16px', fontSize: '0.85em', flexShrink: 0 }}>
                  <Phone size={14} /> Call
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Health Tips */}
        <div style={{ background: 'linear-gradient(135deg, #e65100, #ef6c00)', borderRadius: 20, padding: '32px', color: 'white' }}>
          <h2 style={{ fontSize: '1.4em', fontWeight: 800, marginBottom: 20 }}>🌟 Daily Health Tips for Seniors</h2>
          <div className="grid-3">
            {[
              { icon: '🚶', tip: 'Walk 20-30 minutes daily for better heart health' },
              { icon: '💧', tip: 'Drink 6-8 glasses of water daily' },
              { icon: '🥗', tip: 'Eat more vegetables, fruits, and less salt/sugar' },
              { icon: '😴', tip: 'Sleep 7-8 hours every night' },
              { icon: '🧘', tip: 'Practice yoga or meditation for mental peace' },
              { icon: '👨‍⚕️', tip: 'Get health checkup every 6 months' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '14px', borderRadius: 12, background: 'rgba(255,255,255,0.12)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
                <span style={{ fontSize: '0.85em', opacity: 0.9, lineHeight: 1.5 }}>{item.tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
