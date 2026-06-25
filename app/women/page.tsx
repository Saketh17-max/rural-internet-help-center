'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import { ExternalLink, Users, HeartPulse, IndianRupee, BookOpen, Sparkles, MapPin, Phone, HeartHandshake, PhoneCall, HandHeart, Users2, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const SECTIONS = [
  {
    id: 'shg', icon: <Users2 size={24}/>, title: 'Self Help Groups (SHGs)', color: '#E91E63',
    desc: 'SHGs are groups of 10-20 women who save together and support each other financially and socially.',
    items: [
      { label: 'Join an SHG', desc: 'Contact nearest Gram Panchayat or DRDA office to join or form an SHG', link: 'https://drdaguntur.ap.gov.in' },
      { label: 'SHG Bank Linkage', desc: 'After 6 months, SHGs can get bank loans of ₹1-10 lakhs at low interest', link: '#' },
      { label: 'SERP / VELUGU', desc: 'Andhra Pradesh\'s largest SHG federation providing training and support', link: 'https://serp.ap.gov.in' },
    ],
  },
  {
    id: 'health', icon: <HeartPulse size={24}/>, title: 'Health Schemes for Women', color: '#E74C3C',
    desc: 'Government healthcare schemes specifically designed for women and mothers.',
    items: [
      { label: 'Aarogyasri Health Card', desc: 'Free healthcare up to ₹5 lakhs for BPL families — includes maternity', link: 'https://drntraarogyasri.ap.gov.in' },
      { label: 'Janani Suraksha Yojana', desc: 'Cash assistance for institutional delivery — ₹1,400 in rural areas', link: 'https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=842&lid=309' },
      { label: 'PMMVY', desc: 'Pradhan Mantri Matru Vandana Yojana — ₹5,000 for first child', link: 'https://wcd.nic.in/schemes/pradhan-mantri-matru-vandana-yojana' },
    ],
  },
  {
    id: 'loans', icon: <IndianRupee size={24}/>, title: 'Small Business Loans', color: '#27AE60',
    desc: 'Access affordable credit to start or grow your small business.',
    items: [
      { label: 'Mudra Loan (Shishu)', desc: 'Up to ₹50,000 for starting a business — no collateral required', link: 'https://mudra.org.in' },
      { label: 'PM SVANidhi', desc: 'Working capital loans for street vendors — ₹10,000 to ₹50,000', link: 'https://pmsvanidhi.mohua.gov.in' },
      { label: 'Stand Up India', desc: '₹10 lakhs to ₹1 crore for SC/ST/Women entrepreneurs', link: 'https://www.standupmitra.in' },
    ],
  },
  {
    id: 'skill', icon: <BookOpen size={24}/>, title: 'Skill Development', color: '#8E44AD',
    desc: 'Free skill training programs to improve your career prospects.',
    items: [
      { label: 'Pradhan Mantri Kaushal Vikas Yojana', desc: 'Free skill training in 40+ sectors including tailoring, beauty, computer skills', link: 'https://pmkvyofficial.org' },
      { label: 'DigiSakhi', desc: 'Digital literacy training specifically for rural women', link: 'https://www.pmgdisha.in' },
      { label: 'Anganwadi Worker Training', desc: 'Become an Anganwadi worker — government employment with benefits', link: 'https://wcd.nic.in' },
    ],
  },
];

const SUCCESS_STORIES = [
  { name: 'Padma Rao', village: 'Guntur', story: 'Joined SHG in 2019, got ₹50,000 loan, started tailoring business. Now earns ₹12,000/month and employs 3 others.', icon: <Users size={40}/>, achievement: '₹12,000/month income' },
  { name: 'Lakshmi Bai', village: 'Vijayawada', story: 'Used MUDRA loan to buy a buffalo. Sells milk and earns ₹8,000/month. Repaid loan in 2 years.', icon: <HeartHandshake size={40}/>, achievement: 'Self-employed dairy farmer' },
  { name: 'Anitha Kumari', village: 'Rajahmundry', story: 'Completed PMKVY beautician course. Now runs her own parlor in the village serving 30+ clients weekly.', icon: <Sparkles size={40}/>, achievement: 'Owns beauty parlour' },
];

export default function WomenPage() {
  const { t } = useLanguage();
  const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

  return (
    <div className="bg-[var(--bg)] min-h-[90vh] pb-12 relative">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#880E4F] via-[#C2185B] to-[#E91E63] pt-28 pb-20 px-4 md:px-6 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-300 opacity-20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
        
        <div className="relative z-10 max-w-[800px] mx-auto">
          <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/30 backdrop-blur-md">
            <HandHeart size={40} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">{t('womenTitle')}</h1>
          <p className="opacity-90 max-w-[600px] mx-auto mb-8 text-[15px] md:text-[17px] leading-relaxed font-medium">
            Empowering rural women with financial support, health schemes, skill development, and self-employment opportunities.
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 -mt-12 relative z-20">
        {/* Quick Access */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {SECTIONS.map(s => (
            <a key={s.id} href={`#${s.id}`} className="no-underline block h-full">
              <div className="bg-white rounded-3xl p-6 border-2 border-[var(--card-border)] hover:border-current flex flex-col items-center justify-center h-full transition-all shadow-sm hover:shadow-md hover:-translate-y-1 group" style={{ color: s.color }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ background: `${s.color}15` }}>{s.icon}</div>
                <div className="font-extrabold text-[14px] md:text-[15px] text-center text-[var(--text)] group-hover:text-current transition-colors">{s.title.split(' ')[0]} {s.title.split(' ')[1] || ''}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Main Sections */}
        {SECTIONS.map((section, idx) => (
          <motion.section initial="hidden" animate="visible" variants={fadeUp} custom={idx} key={section.id} id={section.id} className="mb-12">
            <div className="bg-white rounded-3xl shadow-sm border border-[var(--card-border)] p-6 md:p-8 mb-6 flex flex-col sm:flex-row gap-5 sm:items-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border" style={{ background: `${section.color}10`, color: section.color, borderColor: `${section.color}30` }}>
                {section.icon}
              </div>
              <div>
                <h2 className="text-[20px] md:text-[24px] font-extrabold leading-tight mb-2 text-[var(--text)]">{section.title}</h2>
                <p className="text-[14px] text-[var(--text-muted)] font-medium leading-relaxed">{section.desc}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {section.items.map((item, i) => (
                <div key={i} className="bg-white rounded-3xl p-6 border-2 flex flex-col gap-4 shadow-sm hover:shadow-md transition-all group" style={{ borderColor: `${section.color}20` }}>
                  <div className="flex-1 min-w-0">
                    <div className="font-extrabold text-[16px] mb-2 text-[var(--text)]">{item.label}</div>
                    <div className="text-[13px] text-[var(--text-muted)] font-medium leading-relaxed">{item.desc}</div>
                  </div>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="no-underline w-full mt-auto pt-4 border-t border-[var(--card-border)]">
                    <button className="w-full py-3 rounded-xl text-[13px] font-bold flex items-center justify-center gap-2 transition-colors" style={{ color: section.color, backgroundColor: `${section.color}10` }}>
                      <ExternalLink size={16} /> Know More
                    </button>
                  </a>
                </div>
              ))}
            </div>
          </motion.section>
        ))}

        {/* Emergency Helplines */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-gradient-to-br from-[#C0392B] to-[#E74C3C] rounded-3xl p-8 md:p-12 text-white mb-12 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <h2 className="text-[24px] font-black mb-8 flex items-center gap-3 relative z-10"><ShieldAlert size={28} className="text-white"/> Women Helplines</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {[
              { name: 'Women Helpline', number: '181', desc: '24x7 support for women in distress' },
              { name: 'Domestic Violence', number: '1800-599-0019', desc: 'National DV helpline' },
              { name: 'Child Helpline', number: '1098', desc: 'For child abuse cases' },
              { name: 'Police', number: '100', desc: 'Emergency police help' },
            ].map(h => (
              <div key={h.name} className="p-6 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/15 transition-colors backdrop-blur-sm group cursor-pointer">
                <div className="font-black text-[32px] mb-2 text-white drop-shadow-sm group-hover:scale-105 transition-transform origin-left">{h.number}</div>
                <div className="font-bold text-[15px] mb-1.5 uppercase tracking-wider">{h.name}</div>
                <div className="text-[13px] opacity-90 leading-relaxed font-medium">{h.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Success Stories */}
        <motion.section initial="hidden" animate="visible" variants={fadeUp}>
          <div className="bg-white rounded-3xl shadow-sm border border-[var(--card-border)] p-6 md:p-8 mb-6">
            <h2 className="text-[24px] font-extrabold flex items-center gap-3 text-[var(--text)]">
              <Sparkles size={24} className="text-[#F39C12]" /> Success Stories
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SUCCESS_STORIES.map(story => (
              <div key={story.name} className="bg-white border border-[var(--card-border)] rounded-3xl p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all flex flex-col h-full group">
                <div className="w-20 h-20 rounded-full bg-pink-50 text-[#E91E63] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-inner border border-pink-100">
                  {story.icon}
                </div>
                <div className="font-black text-[18px] mb-2 text-[var(--text)]">{story.name}</div>
                <div className="text-[13px] font-bold text-[#E91E63] mb-4 flex items-center justify-center gap-1"><MapPin size={14}/> {story.village}</div>
                <p className="text-[14px] text-[var(--text-muted)] font-medium leading-relaxed italic mb-6 flex-1 relative">
                  <span className="text-4xl text-gray-200 absolute -top-4 -left-2 -z-10">"</span>
                  {story.story}
                  <span className="text-4xl text-gray-200 absolute -bottom-4 -right-2 -z-10">"</span>
                </p>
                <div className="mt-auto pt-5 border-t border-[var(--card-border)]">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 font-bold text-[13px] rounded-xl border border-green-200">
                    <Sparkles size={14} className="text-green-500" /> {story.achievement}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
