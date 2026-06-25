'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import { useDatabase } from '@/contexts/DatabaseContext';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, FileText, Briefcase, Users, Wheat, Map, Heart, Lock, BookOpen, ChevronRight, Play, CheckCircle2, TrendingUp, HelpCircle, PhoneCall, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 40);
    return () => clearInterval(timer);
  }, [target]);

  return <>{count.toLocaleString('en-IN')}</>;
}

export default function HomePage() {
  const { t } = useLanguage();
  const { users, workers, jobs } = useDatabase();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };
  const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

  const SERVICES = [
    { href: '/government', icon: <FileText size={32} strokeWidth={1.5} />, label: t('govServices'), desc: t('govServicesDesc') },
    { href: '/marketplace', icon: <Briefcase size={32} strokeWidth={1.5} />, label: t('marketplaceTitle'), desc: t('marketplaceDesc') },
    { href: '/farmers', icon: <Wheat size={32} strokeWidth={1.5} />, label: t('farmersTitle'), desc: t('cropPrices') + ', ' + t('weather') + ' & ' + t('govSchemes') },
    { href: '/students', icon: <BookOpen size={32} strokeWidth={1.5} />, label: t('studentsTitle'), desc: t('scholarships') + ', ' + t('examRegTitle') + ' & ' + t('careerGuide') },
    { href: '/women', icon: <Heart size={32} strokeWidth={1.5} />, label: t('womenTitle'), desc: t('shg') + ', ' + t('bizLoans') + ' & ' + t('healthSchemes') },
    { href: '/seniors', icon: <Users size={32} strokeWidth={1.5} />, label: t('seniorsTitle'), desc: t('pensionInfo') + ', ' + t('healthInfo') + ' & ' + t('emergencyContacts') },
    { href: '/maps', icon: <Map size={32} strokeWidth={1.5} />, label: t('mapsTitle'), desc: t('mapsDesc') },
    { href: '/digital-locker', icon: <Lock size={32} strokeWidth={1.5} />, label: t('lockerTitle'), desc: t('lockerDesc') },
  ];

  return (
    <div className="bg-[var(--bg)] text-[var(--text)] min-h-screen font-sans selection:bg-yellow-400 selection:text-blue-950 overflow-hidden transition-colors duration-300">
      
      {/* Hero Section - Deep Blue High Contrast (Remains dark to preserve striking design, but respects theme via --primary) */}
      <section className="relative bg-[#0A192F] dark:bg-[#050C17] text-white pt-32 pb-40 lg:pt-48 lg:pb-56 overflow-hidden transition-colors duration-300">
        {/* Dynamic Background Elements */}
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-yellow-400/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3"></div>
        </motion.div>
        
        {/* Abstract Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-2xl">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-[14px] font-bold tracking-wide mb-8 backdrop-blur-md hover:bg-blue-500/20 transition-colors cursor-default">
                <Sparkles size={16} className="text-yellow-400" /> {t('heroSubtitle')}
              </motion.div>
              
              <motion.h1 variants={fadeUp} className="text-5xl lg:text-[4.5rem] font-black leading-[1.1] tracking-tight mb-8">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
                  {t('heroTitle')}
                </span>
              </motion.h1>
              
              <motion.p variants={fadeUp} className="text-lg lg:text-2xl text-blue-100/80 font-medium leading-relaxed mb-12 max-w-[540px]">
                {t('heroDesc')}
              </motion.p>
              
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
                <Link href="/register" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-300 text-[#0A192F] border-none py-5 px-10 text-[18px] font-black rounded-full shadow-[0_0_40px_rgba(250,204,21,0.3)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 group">
                    {t('register')} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/government" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-transparent border-2 border-white/20 hover:border-white/60 text-white py-5 px-10 text-[18px] font-bold rounded-full backdrop-blur-sm transition-all flex items-center justify-center gap-3 hover:bg-white/5">
                    <Play size={20} className="fill-current" /> {t('learnMore')}
                  </button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Interactive Element */}
            <motion.div initial={{ opacity: 0, scale: 0.9, rotateY: -15 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} transition={{ duration: 1, delay: 0.2, type: "spring" }} className="relative hidden lg:block perspective-1000">
              <div className="relative z-10 w-[460px] ml-auto">
                {/* Floating Interactive Card 1 */}
                <motion.div 
                  whileHover={{ scale: 1.05, rotateZ: 2 }}
                  className="absolute -top-12 -left-12 bg-[var(--card)] rounded-3xl p-6 shadow-2xl border border-[var(--card-border)] w-72 z-20 cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300"><FileText size={28}/></div>
                    <div>
                      <div className="font-black text-[18px] text-[var(--text)]">{t('citizen')}</div>
                      <div className="text-[14px] text-[var(--text-muted)] font-medium leading-tight mt-1">{t('citizenDesc')}</div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Main Dashboard Mockup */}
                <div className="bg-[#112240] dark:bg-[#081326] rounded-[40px] p-4 shadow-2xl border border-white/10 overflow-hidden transform rotate-2 hover:rotate-0 transition-all duration-500">
                  <div className="bg-[#0A192F] dark:bg-[#050C17] rounded-[32px] h-[400px] border border-white/5 p-6 flex flex-col gap-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="h-4 w-24 bg-white/10 rounded-full"></div>
                      <div className="h-8 w-8 bg-yellow-400/20 rounded-full flex items-center justify-center"><div className="h-3 w-3 bg-yellow-400 rounded-full"></div></div>
                    </div>
                    <div className="h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-white/5 relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-500/20 to-transparent"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 flex-1">
                      <div className="bg-white/5 rounded-2xl p-4 border border-white/5"><div className="h-8 w-8 bg-white/10 rounded-lg mb-3"></div><div className="h-2 w-16 bg-white/10 rounded-full"></div></div>
                      <div className="bg-white/5 rounded-2xl p-4 border border-white/5"><div className="h-8 w-8 bg-white/10 rounded-lg mb-3"></div><div className="h-2 w-16 bg-white/10 rounded-full"></div></div>
                    </div>
                  </div>
                </div>

                {/* Floating Interactive Card 2 */}
                <motion.div 
                  whileHover={{ scale: 1.05, rotateZ: -2 }}
                  className="absolute -bottom-8 -right-8 bg-[var(--card)] rounded-3xl p-6 shadow-2xl border border-[var(--card-border)] w-72 z-20 cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 text-yellow-500 flex items-center justify-center shrink-0 group-hover:bg-yellow-400 group-hover:text-[#0A192F] transition-colors duration-300"><Briefcase size={28}/></div>
                    <div>
                      <div className="font-black text-[18px] text-[var(--text)]">{t('worker')}</div>
                      <div className="text-[14px] text-[var(--text-muted)] font-medium leading-tight mt-1">{t('workerDesc')}</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg className="relative block w-[calc(100%+1.3px)] h-[80px] lg:h-[120px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-[var(--bg)] transition-colors duration-300"></path>
          </svg>
        </div>
      </section>

      {/* Live Impact Stats - Popping out over the wave */}
      <section className="relative z-20 -mt-20 lg:-mt-28 max-w-[1200px] mx-auto px-6 mb-32">
        <div className="bg-[var(--card)] rounded-[32px] shadow-2xl border border-[var(--card-border)] p-8 lg:p-12 transition-colors duration-300">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 divide-x-0 md:divide-x divide-[var(--card-border)]">
            {[
              { label: t('totalUsers'), value: users.length, icon: <Users size={28}/>, color: 'text-blue-500' },
              { label: t('workersReg'), value: workers.length, icon: <Briefcase size={28}/>, color: 'text-yellow-500' },
              { label: t('jobsPosted'), value: jobs.length, icon: <ShieldCheck size={28}/>, color: 'text-green-500' },
              { label: t('servicesUsed'), value: 26, icon: <Map size={28}/>, color: 'text-purple-500' },
            ].map((stat, idx) => (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={idx} key={idx} className="flex flex-col items-center text-center px-4 group">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-[var(--bg2)] transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-md ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className="text-4xl lg:text-5xl font-black text-[var(--text)] mb-2 tracking-tight">
                  <AnimatedCounter target={stat.value} />+
                </div>
                <div className="text-[14px] lg:text-[15px] font-bold uppercase tracking-widest text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Interactive Grid */}
      <section className="py-20 px-6 max-w-[1280px] mx-auto">
        <div className="text-center mb-20">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-black text-[var(--text)] mb-6 tracking-tight">
            {t('services')}
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-[var(--text-muted)] max-w-[600px] mx-auto font-medium">
            {t('govServicesDesc')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((svc, idx) => (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={fadeUp} custom={idx} key={svc.label}>
              <Link href={svc.href} className="block h-full group">
                <div className="bg-[var(--card)] rounded-[32px] p-8 border border-[var(--card-border)] hover:border-blue-500 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.15)] transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                  
                  {/* Hover Background Reveal Effect */}
                  <div className="absolute inset-0 bg-blue-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-[var(--bg2)] text-[var(--primary)] group-hover:scale-110 group-hover:bg-[var(--card)] group-hover:shadow-md transition-all duration-300">
                      {svc.icon}
                    </div>
                    <div className="font-black text-[22px] text-[var(--text)] mb-4 leading-tight">{svc.label}</div>
                    <div className="text-[15px] text-[var(--text-muted)] font-medium leading-relaxed mb-8 flex-1 transition-colors">{svc.desc}</div>
                    <div className="mt-auto flex items-center font-bold text-[14px] transition-colors uppercase tracking-widest text-[var(--primary)] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 duration-300">
                      {t('next')} <ArrowRight size={18} className="ml-2" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Massive CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="bg-[var(--primary)] rounded-[48px] p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden">
            {/* Abstract Backgrounds */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-black/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>
            
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-[1.1] tracking-tight">{t('heroTitle')}</h2>
              <p className="text-white/80 text-[18px] md:text-[20px] font-medium leading-relaxed mb-12 max-w-[700px] mx-auto">
                {t('heroDesc')}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link href="/register" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-300 text-black border-none py-5 px-12 rounded-full font-black text-[18px] shadow-[0_0_40px_rgba(250,204,21,0.2)] transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3">
                    {t('register')} <ArrowRight size={20} />
                  </button>
                </Link>
                <Link href="/contact" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-transparent border-2 border-white/20 hover:border-white/60 text-white py-5 px-12 rounded-full font-bold text-[18px] backdrop-blur-sm transition-all hover:bg-white/10 flex items-center justify-center gap-3">
                    <PhoneCall size={20} /> {t('contactUs')}
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
