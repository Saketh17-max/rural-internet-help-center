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
    <div className="bg-[var(--bg)] min-h-[90vh] pb-12">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#880e4f] via-[#c2185b] to-[#e91e8c] pt-24 pb-12 px-4 md:px-6 text-white text-center">
        <div className="text-4xl md:text-5xl mb-3 md:mb-4">💜</div>
        <h1 className="text-2xl md:text-[clamp(1.8rem,4vw,2.4rem)] font-black mb-2.5">{t('womenTitle')}</h1>
        <p className="opacity-90 max-w-[560px] mx-auto text-sm md:text-base leading-relaxed">
          Empowering rural women with financial support, health schemes, skill development, and self-employment opportunities
        </p>
      </div>

      <div className="page-container px-4 md:px-6 py-6 md:py-10">
        {/* Quick Access */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10 md:mb-12">
          {SECTIONS.map(s => (
            <a key={s.id} href={`#${s.id}`} className="no-underline block h-full">
              <div className="service-card flex flex-col items-center justify-center p-4 md:p-5 h-full transition-transform active:scale-95">
                <div className="w-12 h-12 md:w-[52px] md:h-[52px] rounded-xl flex items-center justify-center text-2xl md:text-[26px] mb-3" style={{ background: `${s.color}15` }}>{s.icon}</div>
                <div className="font-bold text-[13px] md:text-[14px] text-center text-[var(--text)]">{s.title.split(' ')[0]} {s.title.split(' ')[1] || ''}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Main Sections */}
        {SECTIONS.map(section => (
          <section key={section.id} id={section.id} className="mb-10 md:mb-12">
            <div className="flex gap-4 items-center mb-5 md:mb-6">
              <div className="w-12 h-12 md:w-[52px] md:h-[52px] rounded-xl flex items-center justify-center text-[24px] md:text-[28px] shrink-0" style={{ background: `${section.color}15` }}>
                {section.icon}
              </div>
              <div>
                <h2 className="text-lg md:text-[20px] font-extrabold leading-tight mb-1">{section.title}</h2>
                <p className="text-[12px] md:text-[13px] text-[var(--text-muted)] leading-snug">{section.desc}</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 md:gap-4">
              {section.items.map((item, i) => (
                <div key={i} className="bg-[var(--card)] rounded-xl md:rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row sm:items-center gap-3.5 md:gap-4 shadow-sm" style={{ border: `1.5px solid ${section.color}20` }}>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-[14px] md:text-[15px] mb-1">{item.label}</div>
                    <div className="text-[12px] md:text-[13px] text-[var(--text-muted)] leading-relaxed">{item.desc}</div>
                  </div>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="no-underline w-full sm:w-auto mt-1 sm:mt-0">
                    <button className="btn-outline w-full sm:w-auto justify-center py-2 px-4 text-[12px] md:text-[13px] min-h-[44px]" style={{ borderColor: section.color, color: section.color }}>
                      <ExternalLink size={14} className="mr-1.5" /> Know More
                    </button>
                  </a>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Emergency Helplines */}
        <div className="bg-gradient-to-br from-[#c0392b] to-[#e74c3c] rounded-2xl md:rounded-[20px] p-5 md:p-7 text-white mb-10 md:mb-12 shadow-lg">
          <h2 className="text-[18px] md:text-[20px] font-extrabold mb-4 md:mb-5">🆘 Women Helplines</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { name: 'Women Helpline', number: '181', desc: '24x7 support for women in distress' },
              { name: 'Domestic Violence', number: '1800-599-0019', desc: 'National DV helpline' },
              { name: 'Child Helpline', number: '1098', desc: 'For child abuse cases' },
              { name: 'Police', number: '100', desc: 'Emergency police help' },
            ].map(h => (
              <div key={h.name} className="p-3.5 md:p-4 rounded-xl bg-[rgba(255,255,255,0.15)] hover:bg-[rgba(255,255,255,0.2)] transition-colors">
                <div className="font-black text-[22px] md:text-[24px] mb-0.5">{h.number}</div>
                <div className="font-bold text-[13px] md:text-[14px] mb-1">{h.name}</div>
                <div className="text-[11px] md:text-[12px] opacity-90 leading-snug">{h.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <section>
          <h2 className="text-xl md:text-[22px] font-extrabold mb-5 md:mb-6">🌟 Success Stories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SUCCESS_STORIES.map(story => (
              <div key={story.name} className="glass-card p-5 md:p-6 text-center hover:-translate-y-1 transition-transform flex flex-col h-full">
                <div className="text-[48px] md:text-[56px] mb-2.5">{story.emoji}</div>
                <div className="font-black text-[15px] md:text-[16px] mb-1">{story.name}</div>
                <div className="text-[12px] md:text-[13px] text-[var(--text-muted)] mb-3">📍 {story.village}</div>
                <p className="text-[13px] md:text-[14px] text-[var(--text-muted)] leading-relaxed italic mb-4 flex-1">"{story.story}"</p>
                <div className="mt-auto">
                  <span className="badge badge-success text-[11px] md:text-[12px] px-3 py-1 bg-[rgba(39,174,96,0.1)] text-[#27ae60] font-bold">✨ {story.achievement}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
