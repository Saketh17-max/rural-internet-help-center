'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import { ExternalLink, BookOpen, Award, Calendar, FileText, TrendingUp, Briefcase } from 'lucide-react';

const SCHOLARSHIPS = [
  { name: 'PRERANA Scholarship', provider: 'Andhra Pradesh Govt', amount: '₹3,000-15,000/year', eligibility: 'SC/ST students, 75%+ marks', deadline: '31 Mar 2024', link: 'https://jnanabhumi.ap.gov.in', category: 'SC/ST' },
  { name: 'National Scholarship Portal', provider: 'Central Govt', amount: 'Up to ₹36,000/year', eligibility: 'All categories, income < ₹2.5L', deadline: '31 Jan 2024', link: 'https://scholarships.gov.in', category: 'Central' },
  { name: 'EBC Scholarship', provider: 'Andhra Pradesh Govt', amount: '₹10,000-25,000/year', eligibility: 'Economically Backward Class', deadline: '28 Feb 2024', link: 'https://jnanabhumi.ap.gov.in', category: 'EBC' },
  { name: 'OBC Scholarship', provider: 'BC Welfare', amount: '₹8,000-20,000/year', eligibility: 'OBC students, 60%+ marks', deadline: '15 Mar 2024', link: 'https://jnanabhumi.ap.gov.in', category: 'OBC' },
  { name: 'PM YASASVI', provider: 'Central Govt', amount: '₹75,000-1,25,000/year', eligibility: 'OBC/EBC, Class 9-12, income < ₹2.5L', deadline: '30 Apr 2024', link: 'https://yet.nta.ac.in', category: 'Central' },
];

const EXAMS = [
  { name: 'EAMCET (AP/TS)', date: 'May 2024', type: 'Engineering/Medical', link: 'https://cets.apsche.ap.gov.in' },
  { name: 'ICET', date: 'Apr 2024', type: 'MBA/MCA', link: 'https://cets.apsche.ap.gov.in' },
  { name: 'ECET', date: 'Jun 2024', type: 'Lateral Entry Engineering', link: 'https://cets.apsche.ap.gov.in' },
  { name: 'SSC (CHSL/CGL)', date: 'Mar-May 2024', type: 'Central Govt Jobs', link: 'https://ssc.nic.in' },
  { name: 'APPSC / TSPSC', date: 'Ongoing', type: 'State Govt Jobs', link: 'https://tspsc.gov.in' },
];

const CAREER_PATHS = [
  { icon: '💻', title: 'IT / Software', desc: 'B.Tech/BCA → Coding bootcamps → TCS, Infosys, etc.' },
  { icon: '🏥', title: 'Healthcare', desc: 'MBBS/Nursing → Government hospitals → Private hospitals' },
  { icon: '⚖️', title: 'Law', desc: 'BA LLB → Judiciary / Advocate / Corporate Law' },
  { icon: '🎓', title: 'Teaching', desc: 'B.Ed → TET exam → Government school teacher' },
  { icon: '🌾', title: 'Agriculture', desc: 'B.Sc Agri → Agri officer / Agricultural entrepreneur' },
  { icon: '🏛️', title: 'Civil Services', desc: 'Graduation → UPSC/TSPSC → IAS/IPS/IFS' },
];

export default function StudentsPage() {
  const { t } = useLanguage();

  return (
    <div className="bg-[var(--bg)] min-h-[90vh] pb-12">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#4a0e8f] to-[#1b4f72] pt-24 pb-12 px-4 md:px-6 text-white text-center">
        <div className="text-4xl md:text-5xl mb-3 md:mb-4">🎓</div>
        <h1 className="text-2xl md:text-[clamp(1.8rem,4vw,2.4rem)] font-black mb-2.5">{t('studentsTitle')}</h1>
        <p className="opacity-80 max-w-[520px] mx-auto text-sm md:text-base leading-relaxed">Scholarships, exam registrations, career guidance and more for rural students</p>
      </div>

      <div className="page-container px-4 md:px-6 py-6 md:py-10">
        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12">
          {[
            { icon: '🏆', label: t('scholarships'), href: '#scholarships', color: '#8e44ad' },
            { icon: '📝', label: t('examRegTitle'), href: '#exams', color: '#1b4f72' },
            { icon: '📈', label: t('careerGuide'), href: '#career', color: '#27ae60' },
            { icon: '📄', label: t('resumeBuilder'), href: '#resume', color: '#e67e22' },
          ].map(item => (
            <a key={item.label} href={item.href} className="no-underline block h-full">
              <div className="service-card flex flex-col items-center justify-center p-4 md:p-5 h-full transition-transform active:scale-95">
                <div className="w-12 h-12 md:w-[52px] md:h-[52px] rounded-xl flex items-center justify-center text-2xl md:text-[26px] mb-3" style={{ background: `${item.color}15` }}>{item.icon}</div>
                <div className="font-bold text-[13px] md:text-[14px] text-center text-[var(--text)]">{item.label}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Scholarships */}
        <section id="scholarships" className="mb-10 md:mb-12">
          <div className="text-left mb-6 md:mb-8">
            <h2 className="text-xl md:text-[22px] font-extrabold flex items-center gap-2">🏆 {t('scholarships')}</h2>
            <div className="w-12 h-1 bg-[var(--primary)] mt-3 rounded-full" />
          </div>
          <div className="flex flex-col gap-3.5 md:gap-4">
            {SCHOLARSHIPS.map(s => (
              <div key={s.name} className="bg-[var(--card)] border-[1.5px] border-[var(--card-border)] rounded-2xl p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-4 md:flex-1">
                  <div className="w-12 h-12 md:w-12 md:h-12 rounded-xl bg-[#8e44ad15] flex items-center justify-center text-2xl shrink-0">🏆</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-extrabold text-[14px] md:text-[15px] mb-1 md:mb-1.5 leading-tight">{s.name}</div>
                    <div className="text-[12px] md:text-[13px] text-[var(--text-muted)] mb-2 md:mb-1.5">{s.provider} • {s.eligibility}</div>
                    <div className="flex gap-1.5 md:gap-2 flex-wrap">
                      <span className="badge badge-success text-[10px] md:text-[11px] px-2 py-0.5">{s.amount}</span>
                      <span className="badge badge-info text-[10px] md:text-[11px] px-2 py-0.5">Deadline: {s.deadline}</span>
                      <span className="badge badge-warning text-[10px] md:text-[11px] px-2 py-0.5">{s.category}</span>
                    </div>
                  </div>
                </div>
                <a href={s.link} target="_blank" rel="noopener noreferrer" className="no-underline w-full md:w-auto">
                  <button className="btn-primary w-full md:w-auto justify-center py-2.5 px-4 text-[13px] md:text-[14px] min-h-[44px]">
                    <ExternalLink size={14} className="mr-1" /> Apply
                  </button>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Exam Registration */}
        <section id="exams" className="mb-10 md:mb-12">
          <div className="text-left mb-6 md:mb-8">
            <h2 className="text-xl md:text-[22px] font-extrabold flex items-center gap-2">📝 {t('examRegTitle')}</h2>
            <div className="w-12 h-1 bg-[var(--primary)] mt-3 rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 md:gap-4">
            {EXAMS.map(e => (
              <div key={e.name} className="bg-[var(--card)] border-[1.5px] border-[var(--card-border)] rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center shadow-sm">
                <div className="flex gap-3 items-center flex-1 min-w-0 w-full">
                  <div className="w-11 h-11 rounded-xl bg-[#1b4f7215] flex items-center justify-center text-[22px] shrink-0">📝</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-[14px] md:text-[15px] leading-tight truncate">{e.name}</div>
                    <div className="text-[11px] md:text-[12px] text-[var(--text-muted)] mt-0.5">{e.type}</div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Calendar size={12} className="text-[var(--text-muted)]" />
                      <span className="text-[11px] text-[var(--text-muted)] font-medium">{e.date}</span>
                    </div>
                  </div>
                </div>
                <a href={e.link} target="_blank" rel="noopener noreferrer" className="no-underline w-full sm:w-auto">
                  <button className="btn-outline w-full sm:w-auto justify-center py-2 px-4 text-[12px] md:text-[13px] min-h-[44px]">Register</button>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Career Guidance */}
        <section id="career" className="mb-10 md:mb-12">
          <div className="text-left mb-6 md:mb-8">
            <h2 className="text-xl md:text-[22px] font-extrabold flex items-center gap-2">📈 {t('careerGuide')}</h2>
            <div className="w-12 h-1 bg-[var(--primary)] mt-3 rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 md:gap-4">
            {CAREER_PATHS.map(c => (
              <div key={c.title} className="glass-card p-4 md:p-5 hover:-translate-y-1 transition-transform">
                <div className="text-[32px] md:text-[36px] mb-3">{c.icon}</div>
                <div className="font-bold text-[14px] md:text-[15px] mb-1.5">{c.title}</div>
                <div className="text-[11px] md:text-[13px] text-[var(--text-muted)] leading-relaxed">{c.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Resume Builder */}
        <section id="resume">
          <div className="bg-gradient-to-br from-[#1a6b3a] to-[#2980b9] rounded-2xl md:rounded-[20px] p-6 md:p-8 text-white text-center shadow-lg">
            <div className="text-4xl md:text-5xl mb-3 md:mb-4">📄</div>
            <h2 className="text-[20px] md:text-[24px] font-extrabold mb-2 md:mb-3">{t('resumeBuilder')}</h2>
            <p className="opacity-90 mb-5 md:mb-6 max-w-[480px] mx-auto text-[13px] md:text-[15px] leading-relaxed">
              Create a professional resume in minutes. Available in English and Telugu.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 md:gap-3 max-w-[480px] mx-auto mb-6 md:mb-8">
              {['📝 Fill Details', '🎨 Choose Template', '⬇️ Download PDF'].map(step => (
                <div key={step} className="p-2.5 md:p-3 rounded-xl bg-[rgba(255,255,255,0.15)] text-[12px] md:text-[13px] font-semibold">{step}</div>
              ))}
            </div>
            <button className="btn-primary bg-[rgba(255,255,255,0.2)] border-2 border-[rgba(255,255,255,0.4)] justify-center w-full sm:w-auto min-h-[48px] px-6 text-[14px] md:text-[15px] hover:bg-[rgba(255,255,255,0.3)] shadow-none">
              <Briefcase size={18} className="mr-2" /> Build My Resume (Coming Soon)
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
