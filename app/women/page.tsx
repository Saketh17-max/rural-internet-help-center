'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import { ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

const SECTIONS = [
  {
    id: 'shg', icon: '🤝', title: 'Self Help Groups (SHGs)', color: '#e91e8c',
    desc: 'SHGs are groups of 10-20 women who save together and support each other financially and socially.',
    items: [
      { label: 'Join an SHG', desc: 'Contact nearest Gram Panchayat or DRDA office to join or form an SHG', link: 'https://drdaguntur.ap.gov.in' },
      { label: 'SHG Bank Linkage', desc: 'After 6 months, SHGs can get bank loans of ₹1-10 lakhs at low interest', link: '#' },
      { label: 'SERP / VELUGU', desc: 'Andhra Pradesh\'s largest SHG federation providing training and support', link: 'https://serp.ap.gov.in' },
    ],
  },
  {
    id: 'health', icon: '🏥', title: 'Health Schemes for Women', color: '#e74c3c',
    desc: 'Government healthcare schemes specifically designed for women and mothers.',
    items: [
      { label: 'Aarogyasri Health Card', desc: 'Free healthcare up to ₹5 lakhs for BPL families — includes maternity', link: 'https://drntraarogyasri.ap.gov.in' },
      { label: 'Janani Suraksha Yojana', desc: 'Cash assistance for institutional delivery — ₹1,400 in rural areas', link: 'https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=842&lid=309' },
      { label: 'PMMVY', desc: 'Pradhan Mantri Matru Vandana Yojana — ₹5,000 for first child', link: 'https://wcd.nic.in/schemes/pradhan-mantri-matru-vandana-yojana' },
    ],
  },
  {
    id: 'loans', icon: '💰', title: 'Small Business Loans', color: '#27ae60',
    desc: 'Access affordable credit to start or grow your small business.',
    items: [
      { label: 'Mudra Loan (Shishu)', desc: 'Up to ₹50,000 for starting a business — no collateral required', link: 'https://mudra.org.in' },
      { label: 'PM SVANidhi', desc: 'Working capital loans for street vendors — ₹10,000 to ₹50,000', link: 'https://pmsvanidhi.mohua.gov.in' },
      { label: 'Stand Up India', desc: '₹10 lakhs to ₹1 crore for SC/ST/Women entrepreneurs', link: 'https://www.standupmitra.in' },
    ],
  },
  {
    id: 'skill', icon: '📚', title: 'Skill Development', color: '#8e44ad',
    desc: 'Free skill training programs to improve your career prospects.',
    items: [
      { label: 'Pradhan Mantri Kaushal Vikas Yojana', desc: 'Free skill training in 40+ sectors including tailoring, beauty, computer skills', link: 'https://pmkvyofficial.org' },
      { label: 'DigiSakhi', desc: 'Digital literacy training specifically for rural women', link: 'https://www.pmgdisha.in' },
      { label: 'Anganwadi Worker Training', desc: 'Become an Anganwadi worker — government employment with benefits', link: 'https://wcd.nic.in' },
    ],
  },
];

const SUCCESS_STORIES = [
  { name: 'Padma Rao', village: 'Guntur', story: 'Joined SHG in 2019, got ₹50,000 loan, started tailoring business. Now earns ₹12,000/month and employs 3 others.', emoji: '👩‍🏭', achievement: '₹12,000/month income' },
  { name: 'Lakshmi Bai', village: 'Vijayawada', story: 'Used MUDRA loan to buy a buffalo. Sells milk and earns ₹8,000/month. Repaid loan in 2 years.', emoji: '🐄', achievement: 'Self-employed dairy farmer' },
  { name: 'Anitha Kumari', village: 'Rajahmundry', story: 'Completed PMKVY beautician course. Now runs her own parlor in the village serving 30+ clients weekly.', emoji: '💄', achievement: 'Owns beauty parlour' },
];

export default function WomenPage() {
  const { t } = useLanguage();

  return (
    <div style={{ background: 'var(--bg)', minHeight: '90vh' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #880e4f, #c2185b, #e91e8c)', padding: '50px 24px', color: 'white', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>💜</div>
        <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.4rem)', fontWeight: 900, marginBottom: 10 }}>{t('womenTitle')}</h1>
        <p style={{ opacity: 0.85, maxWidth: 560, margin: '0 auto' }}>
          Empowering rural women with financial support, health schemes, skill development, and self-employment opportunities
        </p>
      </div>

      <div className="page-container" style={{ padding: '40px 20px' }}>
        {/* Quick Access */}
        <div className="grid-4" style={{ marginBottom: 40 }}>
          {SECTIONS.map(s => (
            <a key={s.id} href={`#${s.id}`} style={{ textDecoration: 'none' }}>
              <div className="service-card">
                <div style={{ width: 52, height: 52, borderRadius: 12, background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>{s.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{s.title.split(' ')[0]} {s.title.split(' ')[1] || ''}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Main Sections */}
        {SECTIONS.map(section => (
          <section key={section.id} id={section.id} style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: `${section.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>
                {section.icon}
              </div>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800 }}>{section.title}</h2>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 3 }}>{section.desc}</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {section.items.map((item, i) => (
                <div key={i} style={{ background: 'var(--card)', border: `1.5px solid ${section.color}20`, borderRadius: 14, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <button className="btn-outline" style={{ padding: '8px 16px', fontSize: 12, borderColor: section.color, color: section.color, whiteSpace: 'nowrap' }}>
                      <ExternalLink size={12} /> Know More
                    </button>
                  </a>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Emergency Helplines */}
        <div style={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)', borderRadius: 20, padding: '28px', color: 'white', marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>🆘 Women Helplines</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 12 }}>
            {[
              { name: 'Women Helpline', number: '181', desc: '24x7 support for women in distress' },
              { name: 'Domestic Violence', number: '1800-599-0019', desc: 'National DV helpline' },
              { name: 'Child Helpline', number: '1098', desc: 'For child abuse cases' },
              { name: 'Police', number: '100', desc: 'Emergency police help' },
            ].map(h => (
              <div key={h.name} style={{ padding: '14px', borderRadius: 12, background: 'rgba(255,255,255,0.15)' }}>
                <div style={{ fontWeight: 700, fontSize: 20 }}>{h.number}</div>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{h.name}</div>
                <div style={{ fontSize: 11, opacity: 0.8 }}>{h.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <section>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 20 }}>🌟 Success Stories</h2>
          <div className="grid-3">
            {SUCCESS_STORIES.map(story => (
              <div key={story.name} className="glass-card" style={{ padding: 24 }}>
                <div style={{ fontSize: 48, marginBottom: 12, textAlign: 'center' }}>{story.emoji}</div>
                <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 4 }}>{story.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>📍 {story.village}</div>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 12, fontStyle: 'italic' }}>"{story.story}"</p>
                <span className="badge badge-success" style={{ fontSize: 12 }}>✨ {story.achievement}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
