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
    { value: 12, label: 'Districts Active', icon: '🗺️', suffix: '' }, // Keep districts static as it's a structural metric, or could derive from distinct worker locations
  ];

  return (
    <div>
      {/* HERO */}
      <section className="hero-bg" style={{ minHeight: '92vh', display: 'flex', alignItems: 'center', padding: '60px 24px', position: 'relative' }}>
        {/* Animated circles */}
        <div style={{ position: 'absolute', top: '10%', right: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(74,222,128,0.12), transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(96,165,250,0.12), transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          {/* Left content */}
          <div>
            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '8px 16px', borderRadius: '50px',
              background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.3)',
              color: '#4ade80', fontSize: 13, fontWeight: 600, marginBottom: 24,
            }}>
              🇮🇳 Digital India Initiative
            </div>

            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, color: 'white', lineHeight: 1.15, marginBottom: 20 }}>
              {t('heroTitle')}
            </h1>

            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: 12, fontWeight: 600 }}>
              {t('heroSubtitle')}
            </p>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 36 }}>
              {t('heroDesc')}
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 40 }}>
              <Link href="/register" style={{ textDecoration: 'none' }}>
                <button style={{
                  background: 'linear-gradient(135deg, #4ade80, #22c55e)',
                  color: '#0f4023', border: 'none', padding: '14px 32px',
                  borderRadius: '50px', fontWeight: 800, fontSize: 16, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 8,
                  boxShadow: '0 4px 20px rgba(74,222,128,0.4)',
                  transition: 'all 0.2s',
                }}>
                  {t('getStarted')} <ChevronRight size={18} />
                </button>
              </Link>
              <Link href="/government" style={{ textDecoration: 'none' }}>
                <button style={{
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white', border: '2px solid rgba(255,255,255,0.3)',
                  padding: '14px 32px', borderRadius: '50px',
                  fontWeight: 600, fontSize: 16, cursor: 'pointer',
                  backdropFilter: 'blur(8px)', transition: 'all 0.2s',
                }}>
                  {t('govServices')}
                </button>
              </Link>
            </div>

            {/* Trust badges */}
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {['✓ Free Services', '✓ Multilingual', '✓ AI-Powered', '✓ Govt Certified'].map(b => (
                <span key={b} style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Role Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { href: '/register?role=citizen', icon: '👤', role: t('citizen'), desc: t('citizenDesc'), color: '#4ade80', id: 'hero-citizen' },
              { href: '/register?role=worker', icon: '👷', role: t('worker'), desc: t('workerDesc'), color: '#60a5fa', id: 'hero-worker' },
              { href: '/register?role=employer', icon: '🏢', role: t('employer'), desc: t('employerDesc'), color: '#fbbf24', id: 'hero-employer' },
            ].map(card => (
              <Link key={card.id} href={card.href} id={card.id} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: `1px solid ${card.color}30`,
                  borderRadius: 16, padding: '20px 24px',
                  display: 'flex', alignItems: 'center', gap: 16,
                  cursor: 'pointer', transition: 'all 0.2s',
                  backdropFilter: 'blur(8px)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.14)';
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateX(8px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.08)';
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateX(0)';
                }}
                >
                  <div style={{
                    width: 52, height: 52, borderRadius: 12,
                    background: `${card.color}20`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 26, flexShrink: 0,
                  }}>{card.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: card.color, fontSize: 16 }}>{card.role}</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>{card.desc}</div>
                  </div>
                  <ChevronRight size={18} style={{ color: card.color }} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 24, height: 40, border: '2px solid rgba(255,255,255,0.3)', borderRadius: 12, display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
            <div style={{ width: 4, height: 8, background: 'white', borderRadius: 2, animation: 'float 1.5s ease-in-out infinite' }} />
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            section > div > div { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* STATS */}
      <section style={{ background: 'var(--bg2)', padding: '60px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 24 }}>
          {dynamicStats.map(stat => (
            <div key={stat.label} style={{
              textAlign: 'center', padding: '32px 20px',
              background: 'var(--card)', borderRadius: 16,
              boxShadow: 'var(--shadow)', border: '1px solid var(--card-border)',
            }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>{stat.icon}</div>
              <div style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 8 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES GRID */}
      <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
        <div className="page-container">
          <div className="section-header">
            <h2 style={{ color: 'var(--text)' }}>Our <span className="gradient-text">Services</span></h2>
            <div className="section-divider" />
            <p>Everything you need — government services, jobs, education, and more, all in one place</p>
          </div>

          <div className="grid-auto">
            {SERVICES.map(svc => (
              <Link key={svc.href} href={svc.href} id={`service-${svc.href.replace('/', '')}`} style={{ textDecoration: 'none' }}>
                <div className="service-card" style={{ border: `1.5px solid ${svc.color}20` }}
                  onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = svc.color)}
                  onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = `${svc.color}20`)}
                >
                  <div style={{
                    width: 64, height: 64, borderRadius: 16,
                    background: `${svc.color}15`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 32,
                  }}>{svc.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>{svc.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{svc.desc}</div>
                  <div style={{ color: svc.color, display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600 }}>
                    Explore <ChevronRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: '80px 24px', background: 'var(--bg2)' }}>
        <div className="page-container">
          <div className="section-header">
            <h2>Why Choose <span className="gradient-text">RIHC?</span></h2>
            <div className="section-divider" />
            <p>Built specifically for rural India — simple, fast, and in your language</p>
          </div>
          <div className="grid-3">
            {FEATURES.map(f => (
              <div key={f.title} className="glass-card" style={{ padding: 28, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 36, flexShrink: 0 }}>{f.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{f.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SALARY FAIRNESS BANNER */}
      <section style={{ padding: '60px 24px', background: 'linear-gradient(135deg, #1a6b3a, #1b4f72)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}>
          <div style={{ color: 'white' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>⚖️</div>
            <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Fair Salary System</h2>
            <p style={{ opacity: 0.8, lineHeight: 1.7, marginBottom: 20 }}>
              Our platform automatically warns employers when they offer below the recommended local wage rate, ensuring fair pay for every worker.
            </p>
            <Link href="/marketplace">
              <button style={{
                background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.4)',
                color: 'white', padding: '12px 28px', borderRadius: '50px',
                fontWeight: 700, cursor: 'pointer', fontSize: 15,
                display: 'flex', alignItems: 'center', gap: 8,
                transition: 'all 0.2s',
              }}>
                View Marketplace <ChevronRight size={16} />
              </button>
            </Link>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 20, padding: 28, border: '1px solid rgba(255,255,255,0.2)' }}>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>Farm Labour — Guntur District</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Recommended</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#4ade80' }}>₹700/day</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Offered</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#fbbf24' }}>₹680/day</div>
              </div>
            </div>
            <div style={{
              padding: '10px 14px', borderRadius: 10,
              background: 'rgba(251,191,36,0.2)', border: '1px solid rgba(251,191,36,0.4)',
              color: '#fbbf24', fontSize: 13,
            }}>
              ⚠️ Wage slightly below recommended rate. Workers can negotiate.
            </div>
            <div style={{ height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3, marginTop: 16 }}>
              <div style={{ height: '100%', width: '97%', background: 'linear-gradient(90deg, #4ade80, #fbbf24)', borderRadius: 3 }} />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
        <div className="page-container">
          <div className="section-header">
            <h2>What Citizens <span className="gradient-text">Say</span></h2>
            <div className="section-divider" />
          </div>
          {testimonials.length === 0 ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 20px', background: 'var(--card)', borderRadius: 16, border: '1px solid var(--card-border)' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>💬</div>
              <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>No testimonials available yet.</h3>
              <p style={{ color: 'var(--text-muted)' }}>When a user submits feedback, it will automatically appear here.</p>
            </div>
          ) : (
            <div className="grid-3">
              {testimonials.map((t2, i) => (
                <div key={i} className="glass-card" style={{ padding: 28 }}>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 16 }}>
                    <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--bg2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>
                      {t2.avatar || '👤'}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700 }}>{t2.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t2.role} • {t2.village || 'India'}</div>
                      {t2.rating && <div className="stars">{'★'.repeat(t2.rating)}</div>}
                    </div>
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, fontStyle: 'italic' }}>
                    "{t2.text}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{
        padding: '80px 24px', textAlign: 'center',
        background: 'linear-gradient(135deg, #0f4023, #0a2744)',
        color: 'white',
      }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>🌿</div>
          <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 900, marginBottom: 16 }}>
            Start Your Digital Journey Today
          </h2>
          <p style={{ opacity: 0.75, fontSize: 16, lineHeight: 1.7, marginBottom: 36 }}>
            Join thousands of citizens from across rural India who are already using RIHC to access services, find jobs, and build a better future.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/register" style={{ textDecoration: 'none' }}>
              <button id="cta-register" style={{
                background: 'linear-gradient(135deg, #4ade80, #22c55e)',
                color: '#0f4023', border: 'none', padding: '16px 40px',
                borderRadius: '50px', fontWeight: 800, fontSize: 17, cursor: 'pointer',
                boxShadow: '0 4px 24px rgba(74,222,128,0.4)',
                transition: 'all 0.2s',
              }}>
                Register Free →
              </button>
            </Link>
            <Link href="/government" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'rgba(255,255,255,0.1)', border: '2px solid rgba(255,255,255,0.3)',
                color: 'white', padding: '16px 40px', borderRadius: '50px',
                fontWeight: 600, fontSize: 17, cursor: 'pointer', backdropFilter: 'blur(8px)',
              }}>
                Explore Services
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
