'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import { ExternalLink, BookOpen, Award, Calendar, FileText, TrendingUp, Briefcase, GraduationCap, Monitor, HeartPulse, Scale, Edit3, Sprout, Building } from 'lucide-react';
import { motion } from 'framer-motion';

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
  { icon: <Monitor size={32}/>, title: 'IT / Software', desc: 'B.Tech/BCA → Coding bootcamps → TCS, Infosys, etc.' },
  { icon: <HeartPulse size={32}/>, title: 'Healthcare', desc: 'MBBS/Nursing → Government hospitals → Private hospitals' },
  { icon: <Scale size={32}/>, title: 'Law', desc: 'BA LLB → Judiciary / Advocate / Corporate Law' },
  { icon: <Edit3 size={32}/>, title: 'Teaching', desc: 'B.Ed → TET exam → Government school teacher' },
  { icon: <Sprout size={32}/>, title: 'Agriculture', desc: 'B.Sc Agri → Agri officer / Agricultural entrepreneur' },
  { icon: <Building size={32}/>, title: 'Civil Services', desc: 'Graduation → UPSC/TSPSC → IAS/IPS/IFS' },
];

export default function StudentsPage() {
  const { t } = useLanguage();
  const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

  return (
    <div className="bg-[var(--bg)] min-h-[90vh] pb-12 relative">
      {/* Hero */}
      <div className="bg-[var(--primary)] pt-28 pb-20 px-4 md:px-6 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 opacity-20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
        
        <div className="relative z-10 max-w-[800px] mx-auto">
          <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/20 backdrop-blur-md">
            <GraduationCap size={40} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">{t('studentsTitle')}</h1>
          <p className="opacity-90 max-w-[600px] mx-auto mb-8 text-[15px] md:text-[17px] leading-relaxed font-medium">Scholarships, exam registrations, career guidance and resources empowering rural students.</p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 -mt-12 relative z-20">
        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: <Award size={24}/>, label: t('scholarships'), href: '#scholarships', color: '#8E44AD' },
            { icon: <FileText size={24}/>, label: t('examRegTitle'), href: '#exams', color: '#1B4F72' },
            { icon: <TrendingUp size={24}/>, label: t('careerGuide'), href: '#career', color: '#27AE60' },
            { icon: <Briefcase size={24}/>, label: t('resumeBuilder'), href: '#resume', color: '#E67E22' },
          ].map(item => (
            <a key={item.label} href={item.href} className="no-underline block h-full">
              <div className="bg-white rounded-3xl p-6 border-2 border-[var(--card-border)] hover:border-current flex flex-col items-center justify-center h-full transition-all shadow-sm hover:shadow-md hover:-translate-y-1 group" style={{ color: item.color }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ background: `${item.color}15` }}>{item.icon}</div>
                <div className="font-extrabold text-[14px] md:text-[15px] text-center text-[var(--text)] group-hover:text-current transition-colors">{item.label}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Scholarships */}
        <section id="scholarships" className="mb-12">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white rounded-3xl shadow-sm border border-[var(--card-border)] p-6 md:p-8 mb-6">
            <h2 className="text-[20px] md:text-[24px] font-extrabold flex items-center gap-3 text-[var(--text)]">
              <Award size={24} className="text-[#8E44AD]" /> {t('scholarships')}
            </h2>
          </motion.div>
          <div className="flex flex-col gap-4">
            {SCHOLARSHIPS.map((s, i) => (
              <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={i} key={s.name} className="bg-white border-2 border-[var(--card-border)] hover:border-[#8E44AD] rounded-3xl p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-sm hover:shadow-md transition-all group">
                <div className="flex gap-5 md:items-center">
                  <div className="w-14 h-14 rounded-2xl bg-[#8E44AD10] flex items-center justify-center text-[#8E44AD] shrink-0 border border-[#8E44AD20] group-hover:scale-110 transition-transform"><Award size={24}/></div>
                  <div>
                    <div className="font-black text-[16px] md:text-[18px] mb-1.5 text-[var(--text)] group-hover:text-[#8E44AD] transition-colors">{s.name}</div>
                    <div className="text-[13px] md:text-[14px] font-bold text-[var(--text-muted)] mb-3">{s.provider} • {s.eligibility}</div>
                    <div className="flex gap-2 flex-wrap">
                      <span className="px-3 py-1 rounded-lg bg-green-50 text-green-700 text-[12px] font-bold border border-green-200">{s.amount}</span>
                      <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-[12px] font-bold border border-blue-200 flex items-center gap-1.5"><Calendar size={12}/> Deadline: {s.deadline}</span>
                      <span className="px-3 py-1 rounded-lg bg-orange-50 text-orange-700 text-[12px] font-bold border border-orange-200">{s.category}</span>
                    </div>
                  </div>
                </div>
                <a href={s.link} target="_blank" rel="noopener noreferrer" className="no-underline w-full md:w-auto shrink-0 mt-2 md:mt-0">
                  <button className="bg-[#8E44AD] hover:bg-[#732D91] text-white border-none py-3 px-6 rounded-xl text-[14px] font-bold flex items-center justify-center gap-2 shadow-sm transition-colors w-full">
                    Apply Now <ExternalLink size={16} />
                  </button>
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Exam Registration */}
        <section id="exams" className="mb-12">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white rounded-3xl shadow-sm border border-[var(--card-border)] p-6 md:p-8 mb-6">
            <h2 className="text-[20px] md:text-[24px] font-extrabold flex items-center gap-3 text-[var(--text)]">
              <FileText size={24} className="text-[#1B4F72]" /> {t('examRegTitle')}
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {EXAMS.map((e, i) => (
              <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={i} key={e.name} className="bg-white border-2 border-[var(--card-border)] hover:border-[#1B4F72] rounded-3xl p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center shadow-sm hover:shadow-md transition-all group">
                <div className="flex gap-4 items-center flex-1 min-w-0 w-full">
                  <div className="w-12 h-12 rounded-2xl bg-[#1B4F7210] flex items-center justify-center text-[#1B4F72] shrink-0 border border-[#1B4F7220] group-hover:scale-110 transition-transform"><FileText size={20}/></div>
                  <div className="flex-1 min-w-0">
                    <div className="font-extrabold text-[15px] md:text-[17px] leading-tight truncate text-[var(--text)] group-hover:text-[#1B4F72] transition-colors">{e.name}</div>
                    <div className="text-[12px] md:text-[13px] font-bold text-[var(--text-muted)] mt-1">{e.type}</div>
                    <div className="flex items-center gap-1.5 mt-2 bg-[var(--bg)] w-fit px-2 py-1 rounded-md border border-[var(--card-border)]">
                      <Calendar size={12} className="text-[#1B4F72]" />
                      <span className="text-[11px] text-[var(--text)] font-bold">{e.date}</span>
                    </div>
                  </div>
                </div>
                <a href={e.link} target="_blank" rel="noopener noreferrer" className="no-underline w-full sm:w-auto shrink-0 mt-2 sm:mt-0">
                  <button className="bg-white hover:bg-blue-50 text-[#1B4F72] border-2 border-[#1B4F72] py-2.5 px-5 rounded-xl text-[13px] font-bold w-full transition-colors">Register</button>
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Career Guidance */}
        <section id="career" className="mb-12">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white rounded-3xl shadow-sm border border-[var(--card-border)] p-6 md:p-8 mb-6">
            <h2 className="text-[20px] md:text-[24px] font-extrabold flex items-center gap-3 text-[var(--text)]">
              <TrendingUp size={24} className="text-[#27AE60]" /> {t('careerGuide')}
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAREER_PATHS.map((c, i) => (
              <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={i} key={c.title} className="bg-white border border-[var(--card-border)] rounded-3xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-green-50 text-[#27AE60] flex items-center justify-center mb-5 border border-green-100 group-hover:scale-110 transition-transform">{c.icon}</div>
                <div className="font-black text-[16px] md:text-[18px] mb-2 text-[var(--text)]">{c.title}</div>
                <div className="text-[13px] md:text-[14px] font-medium text-[var(--text-muted)] leading-relaxed">{c.desc}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Resume Builder */}
        <section id="resume">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-gradient-to-br from-[#E67E22] to-[#D35400] rounded-3xl p-8 md:p-12 text-white text-center shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-md">
                <Briefcase size={40} className="text-white" />
              </div>
              <h2 className="text-[24px] md:text-[32px] font-black mb-4">{t('resumeBuilder')}</h2>
              <p className="opacity-90 mb-8 max-w-[500px] mx-auto text-[14px] md:text-[16px] leading-relaxed font-medium">
                Create a professional resume in minutes. Choose from elegant templates, available in English and Telugu.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-[600px] mx-auto mb-10">
                {[{i: <Edit3 size={18}/>, t: 'Fill Details'}, {i: <BookOpen size={18}/>, t: 'Choose Template'}, {i: <FileText size={18}/>, t: 'Download PDF'}].map(step => (
                  <div key={step.t} className="p-4 rounded-2xl bg-white/10 border border-white/20 text-[13px] font-bold flex flex-col items-center gap-2 backdrop-blur-sm">
                    {step.i}
                    {step.t}
                  </div>
                ))}
              </div>
              
              <button className="bg-white text-[#D35400] hover:bg-gray-50 border-none py-4 px-8 rounded-2xl font-black text-[15px] flex items-center justify-center gap-2 mx-auto shadow-lg transition-colors cursor-pointer w-full sm:w-auto">
                <Briefcase size={20} /> Build My Resume (Coming Soon)
              </button>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
