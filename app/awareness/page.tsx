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
    <div style={{ background: 'var(--bg)', minHeight: '90vh' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1b2631, #2c3e50)', padding: '50px 24px', color: 'white', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🛡️</div>
        <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.4rem)', fontWeight: 900, marginBottom: 10 }}>{t('awarenessTitle')}</h1>
        <p style={{ opacity: 0.8, maxWidth: 560, margin: '0 auto 20px' }}>{t('awarenessDesc')}</p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '12px 24px', borderRadius: '50px', background: 'rgba(231,76,60,0.2)', border: '2px solid rgba(231,76,60,0.5)', color: '#e74c3c', fontWeight: 700 }}>
          🚨 Cybercrime Helpline: <strong>1930</strong>
        </div>
      </div>

      <div className="page-container" style={{ padding: '40px 20px' }}>
        {/* Awareness Cards */}
        <div style={{ marginBottom: 48 }}>
          <div className="section-header">
            <h2>Common <span className="gradient-text">Online Scams</span> & How to Avoid Them</h2>
            <div className="section-divider" />
            <p>Learn to recognize and protect yourself from digital fraud</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {TIPS.map(tip => (
              <div key={tip.id} style={{
                background: 'var(--card)', border: `2px solid ${tip.color}20`,
                borderRadius: 16, padding: '24px', overflow: 'hidden', position: 'relative',
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: 4, bottom: 0, background: tip.color, borderRadius: '16px 0 0 16px' }} />
                <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                  <div style={{ width: 56, height: 56, borderRadius: 12, background: `${tip.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>
                    {tip.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: 17, color: tip.color, marginBottom: 12 }}>{tip.title}</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      {tip.signs.map((sign, i) => (
                        <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13, lineHeight: 1.5 }}>
                          <span style={{ color: tip.color, flexShrink: 0, marginTop: 2 }}>
                            {i < 2 ? '✓' : '✓'}
                          </span>
                          <span style={{ color: 'var(--text-muted)' }}>{sign}</span>
                        </div>
                      ))}
                    </div>
                    {tip.realLink && (
                      <div style={{ marginTop: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span className="badge badge-success" style={{ fontSize: 12 }}>✅ Real: {tip.realLink}</span>
                        {tip.fakeLink && <span className="badge badge-danger" style={{ fontSize: 12 }}>❌ Fake: {tip.fakeLink}</span>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Quiz */}
        <section style={{ marginBottom: 48 }}>
          <div className="section-header">
            <h2>Test Your <span className="gradient-text">Digital Safety</span> Knowledge</h2>
            <div className="section-divider" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {QUIZ_QUESTIONS.map((q, i) => (
              <div key={i} style={{ background: 'var(--card)', border: '1.5px solid var(--card-border)', borderRadius: 16, padding: '24px', overflow: 'hidden' }}>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16, display: 'flex', gap: 12 }}>
                  <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, flexShrink: 0 }}>{i + 1}</span>
                  {q.q}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {q.options.map((opt, j) => (
                    <div key={j} style={{
                      padding: '10px 14px', borderRadius: 10, fontSize: 13, cursor: 'pointer',
                      border: j === q.correct ? '2px solid #27ae60' : '1.5px solid var(--card-border)',
                      background: j === q.correct ? 'rgba(39,174,96,0.08)' : 'var(--bg2)',
                      color: j === q.correct ? '#27ae60' : 'var(--text)',
                      fontWeight: j === q.correct ? 700 : 400, lineHeight: 1.4,
                    }}>
                      {j === q.correct ? '✅ ' : '○ '}{opt}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Report Cybercrime */}
        <div style={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)', borderRadius: 20, padding: '32px', color: 'white', textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>🚨</div>
          <h2 style={{ fontSize: 26, fontWeight: 900, marginBottom: 10 }}>Victim of Online Fraud?</h2>
          <p style={{ opacity: 0.85, marginBottom: 24, maxWidth: 500, margin: '0 auto 24px', lineHeight: 1.7 }}>
            Act immediately! The faster you report, the better the chances of recovering your money.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ padding: '16px 24px', borderRadius: 14, background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.4)' }}>
              <div style={{ fontSize: 32, fontWeight: 900 }}>1930</div>
              <div style={{ fontSize: 13, opacity: 0.9 }}>National Cybercrime Helpline</div>
            </div>
            <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <button style={{ padding: '16px 28px', borderRadius: 14, background: 'white', color: '#c0392b', border: 'none', fontWeight: 800, cursor: 'pointer', fontSize: 14 }}>
                🌐 Report at cybercrime.gov.in
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
