'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sun, Moon, Globe, Menu, X, Home, Briefcase, ShoppingBag,
  AlertCircle, BarChart2, LogIn, UserPlus, LogOut, User,
  FileText, Lock, Zap, ChevronDown, Map
} from 'lucide-react';

const LANG_OPTIONS = [
  { code: 'en', label: 'English', flag: '🇮🇳' },
  { code: 'te', label: 'తెలుగు', flag: '🌿' },
  { code: 'hi', label: 'हिंदी', flag: '🪷' },
] as const;

export default function Navbar() {
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
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

  const navLinks = [
    { href: '/', label: t('home'), icon: <Home size={18} /> },
    { href: '/government', label: t('govServices'), icon: <FileText size={18} /> },
    { href: '/marketplace', label: t('marketplace'), icon: <ShoppingBag size={18} /> },
    { href: '/awareness', label: t('awareness'), icon: <AlertCircle size={18} /> },
    { href: '/maps', label: 'Maps', icon: <Map size={18} /> },
    { href: '/survey', label: t('survey'), icon: <BarChart2 size={18} /> },
  ];

  const moreLinks = [
    { href: '/students', label: t('studentsTitle'), icon: '🎓' },
    { href: '/farmers', label: t('farmersTitle'), icon: '🌾' },
    { href: '/women', label: t('womenTitle'), icon: '💜' },
    { href: '/seniors', label: t('seniorsTitle'), icon: '🧓' },
    { href: '/digital-locker', label: t('lockerTitle'), icon: '🔒' },
    { href: '/document-tools', label: t('docToolsTitle'), icon: '📄' },
    { href: '/analytics', label: 'Analytics', icon: '📊' },
  ];

  return (
    <nav className="navbar fixed w-full top-0 z-[1000] px-4 py-3 backdrop-blur-xl bg-[var(--glass)] border-b border-[var(--glass-border)] transition-all">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between md:justify-start md:gap-4 lg:gap-8">
        
        {/* Mobile Hamburger */}
        <button 
          className="md:hidden p-2 rounded-lg text-[var(--text)] hover:bg-[var(--bg2)] transition-colors"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open Menu"
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 md:gap-3 no-underline mr-auto md:mr-0">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-[#1a6b3a] to-[#2980b9] flex items-center justify-center text-lg md:text-xl shrink-0">🌿</div>
          <div className="flex flex-col">
            <div className="font-extrabold text-sm md:text-[15px] text-[var(--primary)] leading-tight">RIHC</div>
            <div className="text-[9px] md:text-[10px] text-[var(--text-muted)] leading-none hidden sm:block">Rural Internet Help</div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2 mr-auto">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} 
              className="flex items-center gap-1.5 px-2 lg:px-3 py-2 rounded-lg no-underline text-[var(--text)] text-[13px] font-medium transition-all hover:bg-[var(--bg2)] whitespace-nowrap"
            >
              {link.icon} {link.label}
            </Link>
          ))}

          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => { setUserOpen(false); setLangOpen(false); }}
              onMouseDown={() => setMenuOpen(o => !o)}
              className="flex items-center gap-1 px-2 lg:px-3 py-2 rounded-lg border-none bg-transparent text-[var(--text)] text-[13px] font-medium cursor-pointer transition-all hover:bg-[var(--bg2)]"
            >
              More <ChevronDown size={14} />
            </button>
            {menuOpen && (
              <div className="absolute top-[110%] left-0 bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-2 min-w-[200px] shadow-[var(--shadow-lg)] z-[100]">
                {moreLinks.map(link => (
                  <Link key={link.href} href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg no-underline text-[var(--text)] text-[13px] transition-all hover:bg-[var(--bg2)]"
                  >
                    <span>{link.icon}</span> {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(o => !o)}
              className="flex items-center gap-1.5 px-2 md:px-3 py-1.5 md:py-2 rounded-lg border-[1.5px] border-[var(--card-border)] bg-transparent text-[var(--text)] text-[12px] md:text-[13px] font-semibold cursor-pointer transition-all hover:bg-[var(--bg2)]"
            >
              <Globe size={15} />
              <span>{LANG_OPTIONS.find(l => l.code === language)?.flag}</span>
              <span className="hidden md:inline">{language.toUpperCase()}</span>
            </button>
            {langOpen && (
              <div className="absolute top-[110%] right-0 bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-2 min-w-[150px] shadow-[var(--shadow-lg)] z-[100]">
                {LANG_OPTIONS.map(opt => (
                  <button key={opt.code}
                    onClick={() => { setLanguage(opt.code); setLangOpen(false); }}
                    className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg border-none text-[14px] cursor-pointer transition-all ${language === opt.code ? 'bg-[var(--bg2)] font-bold' : 'bg-transparent font-normal hover:bg-[var(--bg2)]'}`}
                    style={{ color: 'var(--text)' }}
                  >
                    {opt.flag} {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 md:w-9 md:h-9 rounded-lg border-[1.5px] border-[var(--card-border)] bg-transparent text-[var(--text)] cursor-pointer flex items-center justify-center transition-all hover:bg-[var(--bg2)]"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Auth */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setUserOpen(o => !o)}
                className="flex items-center gap-2 px-2.5 py-1.5 md:px-3 md:py-1.5 rounded-lg border-none text-white cursor-pointer text-[12px] md:text-[13px] font-semibold bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] hover:opacity-90"
              >
                <User size={15} />
                <span className="hidden md:inline">{user.name.split(' ')[0]}</span>
              </button>
              {userOpen && (
                <div className="absolute top-[110%] right-0 bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-3 min-w-[220px] shadow-[var(--shadow-lg)] z-[100]">
                  <div className="px-3 pb-3 border-b border-[var(--card-border)] mb-2">
                    <div className="font-bold">{user.name}</div>
                    <div className="text-[12px] text-[var(--text-muted)]">{user.userId}</div>
                    {user.verified && <span className="badge badge-verified mt-1 text-[11px]">✓ Verified</span>}
                  </div>
                  {[
                    { href: `/${user.role}`, label: t('dashboard'), icon: <BarChart2 size={14} /> },
                    { href: '/digital-locker', label: t('lockerTitle'), icon: <Lock size={14} /> },
                  ].map(item => (
                    <Link key={item.href} href={item.href}
                      onClick={() => setUserOpen(false)}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg no-underline text-[var(--text)] text-[13px] transition-all hover:bg-[var(--bg2)]"
                    >
                      {item.icon} {item.label}
                    </Link>
                  ))}
                  <button onClick={() => { logout(); setUserOpen(false); }}
                    className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg border-none bg-transparent text-[#e74c3c] text-[13px] cursor-pointer transition-all hover:bg-[#e74c3c15]"
                  >
                    <LogOut size={14} /> {t('logout')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="no-underline hidden sm:block">
                <button className="btn-outline px-3 py-1.5 md:px-4 md:py-1.5 text-[12px] md:text-[13px]">
                  <LogIn size={14} /> <span className="hidden md:inline">{t('login')}</span>
                </button>
              </Link>
              <Link href="/register" className="no-underline hidden sm:block">
                <button className="btn-primary px-3 py-1.5 md:px-4 md:py-1.5 text-[12px] md:text-[13px]">
                  <UserPlus size={14} /> <span className="hidden lg:inline">{t('register')}</span>
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[2000] bg-[var(--bg)] flex flex-col md:hidden animate-fade-in overflow-y-auto">
          <div className="flex items-center justify-between p-4 border-b border-[var(--card-border)] bg-[var(--glass)] sticky top-0 z-10">
            <Link href="/" className="flex items-center gap-3 no-underline" onClick={() => setMobileMenuOpen(false)}>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1a6b3a] to-[#2980b9] flex items-center justify-center text-xl shrink-0">🌿</div>
              <div className="flex flex-col">
                <div className="font-extrabold text-[16px] text-[var(--primary)] leading-tight">RIHC</div>
                <div className="text-[11px] text-[var(--text-muted)] leading-none">Rural Internet Help</div>
              </div>
            </Link>
            <button 
              className="p-2 rounded-lg text-[var(--text)] hover:bg-[var(--bg2)] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={28} />
            </button>
          </div>

          <div className="flex flex-col p-4 gap-2">
            <div className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2 ml-2">Main Menu</div>
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-4 rounded-xl no-underline text-[var(--text)] text-[16px] font-semibold bg-[var(--card)] border border-[var(--card-border)] shadow-sm active:scale-95 transition-all"
              >
                <div className="text-[var(--primary)]">{link.icon}</div> 
                {link.label}
              </Link>
            ))}

            <div className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mt-6 mb-2 ml-2">More Resources</div>
            <div className="grid grid-cols-2 gap-2">
              {moreLinks.map(link => (
                <Link key={link.href} href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl no-underline text-[var(--text)] text-[13px] font-medium bg-[var(--card)] border border-[var(--card-border)] shadow-sm active:scale-95 transition-all text-center"
                >
                  <span className="text-2xl">{link.icon}</span> 
                  {link.label}
                </Link>
              ))}
            </div>

            {!isAuthenticated && (
              <div className="mt-8 flex flex-col gap-3">
                <Link href="/login" className="no-underline w-full" onClick={() => setMobileMenuOpen(false)}>
                  <button className="btn-outline w-full justify-center text-[16px] py-3.5">
                    <LogIn size={18} /> {t('login')}
                  </button>
                </Link>
                <Link href="/register" className="no-underline w-full" onClick={() => setMobileMenuOpen(false)}>
                  <button className="btn-primary w-full justify-center text-[16px] py-3.5">
                    <UserPlus size={18} /> {t('register')}
                  </button>
                </Link>
              </div>
            )}
            
            {isAuthenticated && (
               <div className="mt-8">
                 <button onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="flex items-center justify-center gap-2 w-full p-4 rounded-xl border border-[#e74c3c30] bg-[#e74c3c0a] text-[#e74c3c] text-[16px] font-semibold cursor-pointer active:scale-95 transition-all"
                  >
                    <LogOut size={18} /> {t('logout')}
                  </button>
               </div>
            )}
            
            <div className="h-10"></div> {/* Bottom Padding */}
          </div>
        </div>
      )}

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
