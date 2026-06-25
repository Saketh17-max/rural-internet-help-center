'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun, Moon, Globe, Menu, X, Home, Briefcase, ShoppingBag,
  AlertCircle, BarChart2, LogIn, UserPlus, LogOut, User,
  FileText, Lock, ChevronDown, Map, GraduationCap, Sprout,
  Users, HeartPulse, PieChart, ShieldCheck, CheckCircle2,
  Building
} from 'lucide-react';

const LANG_OPTIONS = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'te', label: 'తెలుగు', short: 'TE' },
  { code: 'hi', label: 'हिंदी', short: 'HI' },
] as const;

export default function Navbar() {
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const pathname = usePathname();
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for sticky navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  // Close dropdowns on route change
  useEffect(() => {
    setMenuOpen(false);
    setLangOpen(false);
    setUserOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: t('home'), icon: <Home size={18} /> },
    { href: '/government', label: t('govServices'), icon: <FileText size={18} /> },
    { href: '/marketplace', label: t('marketplace'), icon: <ShoppingBag size={18} /> },
    { href: '/awareness', label: t('awareness'), icon: <ShieldCheck size={18} /> },
    { href: '/maps', label: 'Centers', icon: <Map size={18} /> },
    { href: '/survey', label: t('survey'), icon: <BarChart2 size={18} /> },
  ];

  const moreLinks = [
    { href: '/students', label: t('studentsTitle'), icon: <GraduationCap size={16} /> },
    { href: '/farmers', label: t('farmersTitle'), icon: <Sprout size={16} /> },
    { href: '/women', label: t('womenTitle'), icon: <HeartPulse size={16} /> },
    { href: '/seniors', label: t('seniorsTitle'), icon: <Users size={16} /> },
    { href: '/digital-locker', label: t('lockerTitle'), icon: <Lock size={16} /> },
    { href: '/document-tools', label: t('docToolsTitle'), icon: <FileText size={16} /> },
    { href: '/analytics', label: 'Platform Analytics', icon: <PieChart size={16} /> },
  ];

  return (
    <nav className={`navbar transition-all duration-300 ${scrolled ? 'shadow-md py-2.5' : 'py-3 lg:py-4'}`}>
      <div className="max-w-[1280px] mx-auto flex items-center justify-between">
        
        {/* Mobile Hamburger */}
        <button 
          className="lg:hidden p-2 -ml-2 rounded-lg text-[var(--text)] hover:bg-[var(--bg2)] transition-colors focus:outline-none"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open Menu"
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 no-underline mr-auto lg:mr-8 transition-transform active:scale-95">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-[var(--primary)] flex items-center justify-center shadow-sm">
            <Building size={20} className="text-white" />
          </div>
          <div className="flex flex-col">
            <div className="font-extrabold text-[15px] md:text-[17px] text-[var(--text)] tracking-tight leading-tight">RIHC</div>
            <div className="text-[10px] md:text-[11px] text-[var(--text-muted)] font-medium leading-none">Andhra Pradesh</div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2 mr-auto">
          {navLinks.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} 
                className="relative flex items-center gap-1.5 px-3 py-2 rounded-md no-underline text-[14px] font-medium transition-colors group"
                style={{ color: isActive ? 'var(--primary)' : 'var(--text-muted)' }}
              >
                <span className={`transition-colors ${isActive ? 'text-[var(--primary)]' : 'text-[var(--text-light)] group-hover:text-[var(--primary)]'}`}>
                  {link.icon}
                </span>
                <span className="group-hover:text-[var(--text)] transition-colors">{link.label}</span>
                {isActive && (
                  <motion.div layoutId="navbar-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--primary)] rounded-full" />
                )}
              </Link>
            );
          })}

          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => { setUserOpen(false); setLangOpen(false); setMenuOpen(o => !o); }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-md border-none bg-transparent text-[var(--text-muted)] hover:text-[var(--text)] text-[14px] font-medium cursor-pointer transition-colors"
            >
              More <ChevronDown size={14} className={`transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {menuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full mt-2 left-0 bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-2 min-w-[220px] shadow-lg z-[100]"
                >
                  {moreLinks.map(link => (
                    <Link key={link.href} href={link.href}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg no-underline text-[var(--text)] text-[13px] font-medium transition-colors hover:bg-[var(--bg2)] hover:text-[var(--primary)] group"
                    >
                      <span className="text-[var(--text-light)] group-hover:text-[var(--primary)] transition-colors">{link.icon}</span>
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => { setMenuOpen(false); setUserOpen(false); setLangOpen(o => !o); }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-[var(--card-border)] bg-transparent text-[var(--text-muted)] hover:text-[var(--text)] text-[13px] font-semibold cursor-pointer transition-colors hover:bg-[var(--bg2)]"
            >
              <Globe size={16} />
              <span>{language.toUpperCase()}</span>
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full mt-2 right-0 bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-1.5 min-w-[120px] shadow-lg z-[100]"
                >
                  {LANG_OPTIONS.map(opt => (
                    <button key={opt.code}
                      onClick={() => setLanguage(opt.code)}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-lg border-none text-[13px] cursor-pointer transition-colors ${language === opt.code ? 'bg-[rgba(15,76,129,0.05)] text-[var(--primary)] font-semibold' : 'bg-transparent text-[var(--text)] hover:bg-[var(--bg2)]'}`}
                    >
                      {opt.label}
                      {language === opt.code && <CheckCircle2 size={14} />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-md border border-[var(--card-border)] bg-transparent text-[var(--text-muted)] hover:text-[var(--text)] cursor-pointer flex items-center justify-center transition-colors hover:bg-[var(--bg2)] focus:outline-none"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="w-px h-6 bg-[var(--card-border)] mx-1 hidden sm:block"></div>

          {/* Auth */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => { setMenuOpen(false); setLangOpen(false); setUserOpen(o => !o); }}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-[var(--card-border)] bg-[var(--card)] cursor-pointer transition-all hover:border-[var(--primary-light)] hover:shadow-sm focus:outline-none"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white text-[10px] font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-[13px] font-semibold text-[var(--text)] hidden sm:block">{user.name.split(' ')[0]}</span>
                <ChevronDown size={14} className="text-[var(--text-muted)] hidden sm:block" />
              </button>
              <AnimatePresence>
                {userOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full mt-2 right-0 bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-2 min-w-[240px] shadow-lg z-[100]"
                  >
                    <div className="px-3 py-3 border-b border-[var(--card-border)] mb-2">
                      <div className="font-bold text-[14px]">{user.name}</div>
                      <div className="text-[12px] text-[var(--text-muted)] mb-1.5">{user.email || user.mobile}</div>
                      <span className="badge badge-verified capitalize text-[10px]">{user.role}</span>
                    </div>
                    {[
                      { href: `/${user.role}`, label: t('dashboard'), icon: <BarChart2 size={16} /> },
                      { href: '/digital-locker', label: t('lockerTitle'), icon: <Lock size={16} /> },
                    ].map(item => (
                      <Link key={item.href} href={item.href}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg no-underline text-[var(--text)] text-[13px] font-medium transition-colors hover:bg-[var(--bg2)] group"
                      >
                        <span className="text-[var(--text-light)] group-hover:text-[var(--primary)]">{item.icon}</span> 
                        {item.label}
                      </Link>
                    ))}
                    <div className="h-px bg-[var(--card-border)] my-1.5" />
                    <button onClick={() => logout()}
                      className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg border-none bg-transparent text-[var(--danger)] text-[13px] font-medium cursor-pointer transition-colors hover:bg-[rgba(239,68,68,0.05)]"
                    >
                      <LogOut size={16} /> {t('logout')}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/login" className="no-underline">
                <button className="btn-outline py-1.5 px-4 text-[13px] font-semibold border-[var(--card-border)]">
                  {t('login')}
                </button>
              </Link>
              <Link href="/register" className="no-underline">
                <button className="btn-primary py-1.5 px-4 text-[13px]">
                  {t('register')}
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[2000] bg-[rgba(0,0,0,0.4)] backdrop-blur-sm lg:hidden flex justify-start"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-[85%] max-w-[320px] h-full bg-[var(--bg)] shadow-2xl flex flex-col overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-[var(--card-border)] bg-[var(--card)] sticky top-0 z-10">
                <Link href="/" className="flex items-center gap-3 no-underline" onClick={() => setMobileMenuOpen(false)}>
                  <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center shadow-sm">
                    <Building size={16} className="text-white" />
                  </div>
                  <div className="font-extrabold text-[16px] text-[var(--text)]">RIHC</div>
                </Link>
                <button 
                  className="p-1.5 -mr-1.5 rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg2)] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-4 flex-1 flex flex-col gap-1">
                <div className="text-[11px] font-bold text-[var(--text-light)] uppercase tracking-wider mb-2 px-3 mt-2">Main Menu</div>
                {navLinks.map(link => {
                  const isActive = pathname === link.href;
                  return (
                    <Link key={link.href} href={link.href} 
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-3 rounded-xl no-underline text-[14px] font-semibold transition-colors ${isActive ? 'bg-[rgba(15,76,129,0.08)] text-[var(--primary)]' : 'text-[var(--text)] hover:bg-[var(--card)]'}`}
                    >
                      <span className={isActive ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'}>{link.icon}</span> 
                      {link.label}
                    </Link>
                  );
                })}

                <div className="text-[11px] font-bold text-[var(--text-light)] uppercase tracking-wider mt-6 mb-2 px-3">More Resources</div>
                {moreLinks.map(link => (
                  <Link key={link.href} href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl no-underline text-[var(--text)] text-[14px] font-medium transition-colors hover:bg-[var(--card)]"
                  >
                    <span className="text-[var(--text-muted)]">{link.icon}</span> 
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="p-4 border-t border-[var(--card-border)] bg-[var(--card)]">
                {isAuthenticated && user ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 px-2 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-[14px]">{user.name}</div>
                        <div className="text-[12px] text-[var(--text-muted)] capitalize">{user.role}</div>
                      </div>
                    </div>
                    <button onClick={() => { logout(); setMobileMenuOpen(false); }}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.05)] text-[var(--danger)] text-[14px] font-semibold transition-colors hover:bg-[rgba(239,68,68,0.1)]"
                    >
                      <LogOut size={18} /> {t('logout')}
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link href="/login" className="no-underline w-full" onClick={() => setMobileMenuOpen(false)}>
                      <button className="btn-outline w-full justify-center text-[14px] py-3">
                        <LogIn size={18} /> {t('login')}
                      </button>
                    </Link>
                    <Link href="/register" className="no-underline w-full" onClick={() => setMobileMenuOpen(false)}>
                      <button className="btn-primary w-full justify-center text-[14px] py-3 shadow-md">
                        <UserPlus size={18} /> {t('register')}
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Close dropdowns on outside click */}
      {(langOpen || userOpen || menuOpen) && (
        <div
          className="fixed inset-0 z-[99]"
          onClick={() => { setLangOpen(false); setUserOpen(false); setMenuOpen(false); }}
        />
      )}
    </nav>
  );
}
