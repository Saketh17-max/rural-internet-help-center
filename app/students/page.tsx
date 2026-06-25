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
    <div style={{ background: 'var(--bg)', minHeight: '90vh' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #4a0e8f, #1b4f72)', padding: '50px 24px', color: 'white', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🎓</div>
        <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.4rem)', fontWeight: 900, marginBottom: 10 }}>{t('studentsTitle')}</h1>
        <p style={{ opacity: 0.8, maxWidth: 520, margin: '0 auto' }}>Scholarships, exam registrations, career guidance and more for rural students</p>
      </div>

      <div className="page-container" style={{ padding: '40px 20px' }}>
        {/* Quick Links */}
        <div className="grid-4" style={{ marginBottom: 40 }}>
          {[
            { icon: '🏆', label: t('scholarships'), href: '#scholarships', color: '#8e44ad' },
            { icon: '📝', label: t('examRegTitle'), href: '#exams', color: '#1b4f72' },
            { icon: '📈', label: t('careerGuide'), href: '#career', color: '#27ae60' },
            { icon: '📄', label: t('resumeBuilder'), href: '#resume', color: '#e67e22' },
          ].map(item => (
            <a key={item.label} href={item.href} style={{ textDecoration: 'none' }}>
              <div className="service-card">
                <div style={{ width: 52, height: 52, borderRadius: 12, background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>{item.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{item.label}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Scholarships */}
        <section id="scholarships" style={{ marginBottom: 48 }}>
          <div className="section-header" style={{ textAlign: 'left', marginBottom: 24 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800 }}>🏆 {t('scholarships')}</h2>
            <div className="section-divider" style={{ margin: '10px 0' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {SCHOLARSHIPS.map(s => (
              <div key={s.name} style={{ background: 'var(--card)', border: '1.5px solid var(--card-border)', borderRadius: 14, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                <div style={{ width: 48, height: 48, borderRadius: 10, background: '#8e44ad15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>🏆</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>{s.provider} • {s.eligibility}</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span className="badge badge-success" style={{ fontSize: 11 }}>{s.amount}</span>
                    <span className="badge badge-info" style={{ fontSize: 11 }}>Deadline: {s.deadline}</span>
                    <span className="badge badge-warning" style={{ fontSize: 11 }}>{s.category}</span>
                  </div>
                </div>
                <a href={s.link} target="_blank" rel="noopener noreferrer">
                  <button className="btn-primary" style={{ padding: '8px 16px', fontSize: 13 }}>
                    <ExternalLink size={13} /> Apply
                  </button>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Exam Registration */}
        <section id="exams" style={{ marginBottom: 48 }}>
          <div className="section-header" style={{ textAlign: 'left', marginBottom: 24 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800 }}>📝 {t('examRegTitle')}</h2>
            <div className="section-divider" style={{ margin: '10px 0' }} />
          </div>
          <div className="grid-2">
            {EXAMS.map(e => (
              <div key={e.name} style={{ background: 'var(--card)', border: '1.5px solid var(--card-border)', borderRadius: 14, padding: '20px', display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: '#1b4f7215', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>📝</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{e.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{e.type}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                    <Calendar size={11} style={{ color: 'var(--text-muted)' }} />
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{e.date}</span>
                  </div>
                </div>
                <a href={e.link} target="_blank" rel="noopener noreferrer">
                  <button className="btn-outline" style={{ padding: '6px 14px', fontSize: 12 }}>Register</button>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Career Guidance */}
        <section id="career" style={{ marginBottom: 48 }}>
          <div className="section-header" style={{ textAlign: 'left', marginBottom: 24 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800 }}>📈 {t('careerGuide')}</h2>
            <div className="section-divider" style={{ margin: '10px 0' }} />
          </div>
          <div className="grid-3">
            {CAREER_PATHS.map(c => (
              <div key={c.title} className="glass-card" style={{ padding: 20 }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{c.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{c.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Resume Builder */}
        <section id="resume">
          <div style={{ background: 'linear-gradient(135deg, #1a6b3a, #2980b9)', borderRadius: 20, padding: '32px', color: 'white', textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📄</div>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 10 }}>{t('resumeBuilder')}</h2>
            <p style={{ opacity: 0.8, marginBottom: 20, maxWidth: 480, margin: '0 auto 20px' }}>
              Create a professional resume in minutes. Available in English and Telugu.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, maxWidth: 480, margin: '0 auto 24px' }}>
              {['📝 Fill Details', '🎨 Choose Template', '⬇️ Download PDF'].map(step => (
                <div key={step} style={{ padding: '12px', borderRadius: 10, background: 'rgba(255,255,255,0.12)', fontSize: 12 }}>{step}</div>
              ))}
            </div>
            <button className="btn-primary" style={{ background: 'rgba(255,255,255,0.2)', boxShadow: 'none', border: '2px solid rgba(255,255,255,0.4)', justifyContent: 'center' }}>
              <Briefcase size={16} /> Build My Resume (Coming Soon)
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
