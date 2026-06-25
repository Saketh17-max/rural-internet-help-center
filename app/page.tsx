'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useDatabase } from '@/contexts/DatabaseContext';
import {
  FileText, Briefcase, Users, ShoppingBag, BookOpen, Wheat,
  Heart, UserCheck, Shield, AlertCircle, BarChart2, Map,
  ChevronRight, Star, CheckCircle, TrendingUp, Award, Zap, Lock
} from 'lucide-react';

const SERVICES = [
  { href: '/government', icon: '🏛️', label: 'Government Services', labelKey: 'govServices', color: '#1a6b3a', desc: '18+ certificates & services' },
  { href: '/marketplace', icon: '💼', label: 'Worker Marketplace', labelKey: 'marketplaceTitle', color: '#1b4f72', desc: 'Find jobs & hire workers' },
  { href: '/students', icon: '🎓', label: 'Student Services', labelKey: 'studentsTitle', color: '#8e44ad', desc: 'Scholarships & admissions' },
  { href: '/farmers', icon: '🌾', label: 'Farmer Services', labelKey: 'farmersTitle', color: '#27ae60', desc: 'Schemes, prices & weather' },
  { href: '/women', icon: '💜', label: 'Women Empowerment', labelKey: 'womenTitle', color: '#e91e8c', desc: 'SHGs, loans & schemes' },
  { href: '/seniors', icon: '🧓', label: 'Senior Citizens', labelKey: 'seniorsTitle', color: '#e67e22', desc: 'Pension & health support' },
  { href: '/awareness', icon: '🛡️', label: 'Digital Awareness', labelKey: 'awarenessTitle', color: '#2980b9', desc: 'Stay safe online' },
  { href: '/digital-locker', icon: '🔒', label: 'Digital Locker', labelKey: 'lockerTitle', color: '#16a085', desc: 'Secure document storage' },
];

const FEATURES = [
  { icon: '🌐', title: 'Multilingual', desc: 'English, Telugu & Hindi support with instant switching' },
  { icon: '🎤', title: 'Voice Assistant', desc: 'Speak in your language and get help hands-free' },
  { icon: '🤖', title: 'AI Chatbot', desc: 'Get instant answers to government service questions' },
  { icon: '🔐', title: 'Secure & Verified', desc: 'Aadhaar-linked verification with fraud protection' },
  { icon: '📱', title: 'Mobile First', desc: 'Works perfectly on any smartphone or tablet' },
  { icon: '📄', title: 'Document Tools', desc: 'Compress, convert & manage documents online' },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true);
        let start = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(start);
        }, 30);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, started]);

  return <div ref={ref}>{count.toLocaleString('en-IN')}{suffix}</div>;
}

export default function HomePage() {
  const { t } = useLanguage();
  const { users, workers, jobs, testimonials } = useDatabase();

  const dynamicStats = [
    { value: users.length, label: 'Citizens Served', icon: '👥', suffix: '' },
    { value: workers.length, label: 'Workers Registered', icon: '👷', suffix: '' },
    { value: jobs.length, label: 'Jobs Matched', icon: '💼', suffix: '' },
    { value: 12, label: 'Districts Active', icon: '🗺️', suffix: '' },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="hero-bg min-h-[92vh] flex items-center pt-24 pb-16 px-4 md:px-8 relative">
        {/* Animated circles */}
        <div className="absolute top-[10%] right-[5%] w-64 h-64 md:w-96 md:h-96 rounded-full bg-[radial-gradient(circle,rgba(74,222,128,0.12),transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-[10%] left-[5%] w-48 h-48 md:w-72 md:h-72 rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.12),transparent_70%)] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left content */}
          <div className="text-center md:text-left z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(74,222,128,0.15)] border border-[rgba(74,222,128,0.3)] text-[#4ade80] text-xs md:text-sm font-semibold mb-6">
              🇮🇳 Digital India Initiative
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-[3.2rem] font-black text-white leading-[1.15] mb-5">
              {t('heroTitle')}
            </h1>

            <p className="text-base md:text-lg text-[rgba(255,255,255,0.75)] leading-relaxed mb-3 font-semibold">
              {t('heroSubtitle')}
            </p>
            <p className="text-sm md:text-[15px] text-[rgba(255,255,255,0.6)] leading-relaxed mb-8">
              {t('heroDesc')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-8">
              <Link href="/register" className="no-underline w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-gradient-to-br from-[#4ade80] to-[#22c55e] text-[#0f4023] border-none px-6 py-3.5 md:py-4 rounded-full font-extrabold text-[15px] md:text-[16px] cursor-pointer flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(74,222,128,0.4)] transition-all hover:scale-105 active:scale-95">
                  {t('getStarted')} <ChevronRight size={18} />
                </button>
              </Link>
              <Link href="/government" className="no-underline w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-[rgba(255,255,255,0.1)] text-white border-2 border-[rgba(255,255,255,0.3)] px-6 py-3.5 md:py-4 rounded-full font-semibold text-[15px] md:text-[16px] cursor-pointer backdrop-blur-md transition-all hover:bg-[rgba(255,255,255,0.2)] active:scale-95">
                  {t('govServices')}
                </button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 lg:gap-6">
              {['✓ Free Services', '✓ Multilingual', '✓ AI-Powered', '✓ Govt Certified'].map(b => (
                <span key={b} className="text-[11px] md:text-xs text-[rgba(255,255,255,0.6)] flex items-center gap-1">
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Role Cards */}
          <div className="flex flex-col gap-4 z-10">
            {[
              { href: '/register?role=citizen', icon: '👤', role: t('citizen'), desc: t('citizenDesc'), color: '#4ade80', id: 'hero-citizen' },
              { href: '/register?role=worker', icon: '👷', role: t('worker'), desc: t('workerDesc'), color: '#60a5fa', id: 'hero-worker' },
              { href: '/register?role=employer', icon: '🏢', role: t('employer'), desc: t('employerDesc'), color: '#fbbf24', id: 'hero-employer' },
            ].map(card => (
              <Link key={card.id} href={card.href} id={card.id} className="no-underline">
                <div 
                  className="bg-[rgba(255,255,255,0.08)] rounded-2xl p-4 md:p-5 flex items-center gap-4 cursor-pointer transition-all backdrop-blur-md hover:bg-[rgba(255,255,255,0.14)] hover:translate-x-2 active:scale-[0.98]"
                  style={{ border: `1px solid ${card.color}30` }}
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-2xl md:text-3xl shrink-0" style={{ background: `${card.color}20` }}>
                    {card.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-[15px] md:text-[16px]" style={{ color: card.color }}>{card.role}</div>
                    <div className="text-[12px] md:text-[13px] text-[rgba(255,255,255,0.65)] mt-1">{card.desc}</div>
                  </div>
                  <ChevronRight size={18} style={{ color: card.color }} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hidden md:flex">
          <div className="w-6 h-10 border-2 border-[rgba(255,255,255,0.3)] rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-white rounded-full animate-[float_1.5s_ease-in-out_infinite]" />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[var(--bg2)] py-12 px-4 md:px-8">
        <div className="max-w-[1000px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {dynamicStats.map(stat => (
            <div key={stat.label} className="text-center p-4 md:p-8 bg-[var(--card)] rounded-2xl shadow-[var(--shadow)] border border-[var(--card-border)]">
              <div className="text-3xl md:text-4xl mb-2 md:mb-3">{stat.icon}</div>
              <div className="text-xl md:text-[clamp(1.6rem,3vw,2.2rem)] font-black text-[var(--primary)] leading-none">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[11px] md:text-[14px] text-[var(--text-muted)] mt-2 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-[var(--bg)]">
        <div className="page-container">
          <div className="section-header">
            <h2 className="text-[var(--text)]">Our <span className="gradient-text">Services</span></h2>
            <div className="section-divider" />
            <p>Everything you need — government services, jobs, education, and more, all in one place</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {SERVICES.map(svc => (
              <Link key={svc.href} href={svc.href} id={`service-${svc.href.replace('/', '')}`} className="no-underline">
                <div 
                  className="service-card group h-full" 
                  style={{ border: `1.5px solid ${svc.color}20` }}
                  onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = svc.color)}
                  onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = `${svc.color}20`)}
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-2xl md:text-3xl mb-1" style={{ background: `${svc.color}15` }}>
                    {svc.icon}
                  </div>
                  <div className="font-bold text-[14px] md:text-[15px] text-[var(--text)]">{svc.label}</div>
                  <div className="text-[11px] md:text-[12px] text-[var(--text-muted)]">{svc.desc}</div>
                  <div className="flex items-center gap-1 text-[12px] md:text-[13px] font-semibold mt-auto pt-2" style={{ color: svc.color }}>
                    Explore <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-[var(--bg2)]">
        <div className="page-container">
          <div className="section-header">
            <h2>Why Choose <span className="gradient-text">RIHC?</span></h2>
            <div className="section-divider" />
            <p>Built specifically for rural India — simple, fast, and in your language</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {FEATURES.map(f => (
              <div key={f.title} className="glass-card p-5 md:p-7 flex gap-4 items-start">
                <div className="text-2xl md:text-4xl shrink-0 mt-1 md:mt-0">{f.icon}</div>
                <div>
                  <div className="font-bold text-[15px] md:text-[16px] mb-1.5">{f.title}</div>
                  <div className="text-[12px] md:text-[13px] text-[var(--text-muted)] leading-relaxed">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SALARY FAIRNESS BANNER */}
      <section className="py-12 md:py-16 px-4 md:px-8 bg-gradient-to-br from-[#1a6b3a] to-[#1b4f72]">
        <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
          <div className="text-white text-center md:text-left">
            <div className="text-3xl md:text-4xl mb-3 md:mb-4">⚖️</div>
            <h2 className="text-2xl md:text-[28px] font-extrabold mb-3">Fair Salary System</h2>
            <p className="opacity-80 leading-relaxed mb-6 text-sm md:text-base">
              Our platform automatically warns employers when they offer below the recommended local wage rate, ensuring fair pay for every worker.
            </p>
            <Link href="/marketplace" className="no-underline inline-block w-full md:w-auto">
              <button className="w-full md:w-auto bg-[rgba(255,255,255,0.15)] border-2 border-[rgba(255,255,255,0.4)] text-white px-6 py-3 rounded-full font-bold cursor-pointer text-sm md:text-[15px] flex items-center justify-center gap-2 transition-all hover:bg-[rgba(255,255,255,0.25)] active:scale-95">
                View Marketplace <ChevronRight size={16} />
              </button>
            </Link>
          </div>
          <div className="bg-[rgba(255,255,255,0.1)] rounded-2xl p-5 md:p-7 border border-[rgba(255,255,255,0.2)]">
            <div className="text-xs md:text-sm text-[rgba(255,255,255,0.7)] mb-2">Farm Labour — Guntur District</div>
            <div className="flex justify-between mb-4">
              <div>
                <div className="text-[11px] md:text-xs text-[rgba(255,255,255,0.6)]">Recommended</div>
                <div className="text-xl md:text-2xl font-extrabold text-[#4ade80]">₹700/day</div>
              </div>
              <div className="text-right">
                <div className="text-[11px] md:text-xs text-[rgba(255,255,255,0.6)]">Offered</div>
                <div className="text-xl md:text-2xl font-extrabold text-[#fbbf24]">₹680/day</div>
              </div>
            </div>
            <div className="p-2.5 md:p-3 rounded-xl bg-[rgba(251,191,36,0.2)] border border-[rgba(251,191,36,0.4)] text-[#fbbf24] text-xs md:text-[13px] leading-snug">
              ⚠️ Wage slightly below recommended rate. Workers can negotiate.
            </div>
            <div className="h-1.5 bg-[rgba(255,255,255,0.1)] rounded-full mt-4">
              <div className="h-full w-[97%] bg-gradient-to-r from-[#4ade80] to-[#fbbf24] rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 md:py-20 px-4 md:px-8 bg-[var(--bg)]">
        <div className="page-container">
          <div className="section-header">
            <h2>What Citizens <span className="gradient-text">Say</span></h2>
            <div className="section-divider" />
          </div>
          {testimonials.length === 0 ? (
            <div className="text-center p-10 md:p-16 bg-[var(--card)] rounded-2xl border border-[var(--card-border)] col-span-full">
              <div className="text-3xl md:text-4xl mb-3">💬</div>
              <h3 className="text-base md:text-lg font-extrabold mb-2">No testimonials available yet.</h3>
              <p className="text-sm text-[var(--text-muted)]">When a user submits feedback, it will automatically appear here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {testimonials.map((t2, i) => (
                <div key={i} className="glass-card p-5 md:p-7">
                  <div className="flex gap-3 items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--bg2)] flex items-center justify-center text-xl shrink-0">
                      {t2.avatar || '👤'}
                    </div>
                    <div>
                      <div className="font-bold text-sm md:text-base">{t2.name}</div>
                      <div className="text-[11px] md:text-[12px] text-[var(--text-muted)]">{t2.role} • {t2.village || 'India'}</div>
                      {t2.rating && <div className="stars text-xs md:text-sm mt-0.5">{'★'.repeat(t2.rating)}</div>}
                    </div>
                  </div>
                  <p className="text-[13px] md:text-[14px] text-[var(--text-muted)] leading-relaxed italic">
                    "{t2.text}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 md:py-24 px-4 md:px-8 text-center bg-gradient-to-br from-[#0f4023] to-[#0a2744] text-white">
        <div className="max-w-[640px] mx-auto">
          <div className="text-4xl md:text-5xl mb-4 md:mb-5">🌿</div>
          <h2 className="text-2xl md:text-3xl lg:text-[2.6rem] font-extrabold mb-4 leading-tight">
            Start Your Digital Journey Today
          </h2>
          <p className="opacity-75 text-sm md:text-base leading-relaxed mb-8 md:mb-10 px-2">
            Join thousands of citizens from across rural India who are already using RIHC to access services, find jobs, and build a better future.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 px-4">
            <Link href="/register" className="no-underline w-full sm:w-auto">
              <button id="cta-register" className="w-full sm:w-auto bg-gradient-to-br from-[#4ade80] to-[#22c55e] text-[#0f4023] border-none px-6 py-4 rounded-full font-extrabold text-[15px] md:text-[17px] cursor-pointer shadow-[0_4px_24px_rgba(74,222,128,0.4)] transition-all hover:scale-105 active:scale-95">
                Register Free →
              </button>
            </Link>
            <Link href="/government" className="no-underline w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-[rgba(255,255,255,0.1)] border-2 border-[rgba(255,255,255,0.3)] text-white px-6 py-4 rounded-full font-semibold text-[15px] md:text-[17px] cursor-pointer backdrop-blur-md transition-all hover:bg-[rgba(255,255,255,0.2)] active:scale-95">
                Explore Services
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
