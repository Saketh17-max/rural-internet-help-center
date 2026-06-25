'use client';
import { useState } from 'react';
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

  const navLinks = [
    { href: '/', label: t('home'), icon: <Home size={16} /> },
    { href: '/government', label: t('govServices'), icon: <FileText size={16} /> },
    { href: '/marketplace', label: t('marketplace'), icon: <ShoppingBag size={16} /> },
    { href: '/awareness', label: t('awareness'), icon: <AlertCircle size={16} /> },
    { href: '/maps', label: 'Maps', icon: <Map size={16} /> },
    { href: '/survey', label: t('survey'), icon: <BarChart2 size={16} /> },
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
    <nav className="navbar">
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginRight: 'auto' }}>
          <div style={{
            width: 40, height: 40, borderRadius: '10px',
            background: 'linear-gradient(135deg, #1a6b3a, #2980b9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '20px', flexShrink: 0
          }}>🌿</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '15px', color: 'var(--primary)', lineHeight: 1.1 }}>RIHC</div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', lineHeight: 1 }}>Rural Internet Help</div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="hidden-mobile">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              padding: '7px 12px', borderRadius: '8px', textDecoration: 'none',
              color: 'var(--text)', fontSize: '13px', fontWeight: 500,
              transition: 'all 0.2s', whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg2)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {link.icon} {link.label}
            </Link>
          ))}

          {/* More Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => { setUserOpen(false); setLangOpen(false); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                padding: '7px 12px', borderRadius: '8px', border: 'none',
                background: 'transparent', color: 'var(--text)', fontSize: '13px',
                fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              onMouseDown={() => setMenuOpen(o => !o)}
            >
              More <ChevronDown size={14} />
            </button>
            {menuOpen && (
              <div style={{
                position: 'absolute', top: '110%', left: 0,
                background: 'var(--card)', border: '1px solid var(--card-border)',
                borderRadius: '12px', padding: '8px', minWidth: '200px',
                boxShadow: 'var(--shadow-lg)', zIndex: 100,
              }}>
                {moreLinks.map(link => (
                  <Link key={link.href} href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '10px 12px', borderRadius: '8px', textDecoration: 'none',
                      color: 'var(--text)', fontSize: '13px', transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg2)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <span>{link.icon}</span> {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Language Switcher */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setLangOpen(o => !o)}
              style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                padding: '7px 10px', borderRadius: '8px', border: '1.5px solid var(--card-border)',
                background: 'transparent', color: 'var(--text)', fontSize: '13px',
                fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              <Globe size={15} />
              <span>{LANG_OPTIONS.find(l => l.code === language)?.flag}</span>
              <span className="hidden-mobile">{language.toUpperCase()}</span>
            </button>
            {langOpen && (
              <div style={{
                position: 'absolute', top: '110%', right: 0,
                background: 'var(--card)', border: '1px solid var(--card-border)',
                borderRadius: '12px', padding: '8px', minWidth: '150px',
                boxShadow: 'var(--shadow-lg)', zIndex: 100,
              }}>
                {LANG_OPTIONS.map(opt => (
                  <button key={opt.code}
                    onClick={() => { setLanguage(opt.code); setLangOpen(false); }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      width: '100%', padding: '10px 12px', borderRadius: '8px',
                      border: 'none', background: language === opt.code ? 'var(--bg2)' : 'transparent',
                      color: 'var(--text)', fontSize: '14px', cursor: 'pointer',
                      fontWeight: language === opt.code ? 700 : 400,
                      transition: 'all 0.2s',
                    }}
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
            style={{
              width: 36, height: 36, borderRadius: '8px', border: '1.5px solid var(--card-border)',
              background: 'transparent', color: 'var(--text)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Auth */}
          {isAuthenticated && user ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setUserOpen(o => !o)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '6px 12px', borderRadius: '8px',
                  background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                  border: 'none', color: 'white', cursor: 'pointer', fontSize: '13px', fontWeight: 600,
                }}
              >
                <User size={15} />
                <span className="hidden-mobile">{user.name.split(' ')[0]}</span>
              </button>
              {userOpen && (
                <div style={{
                  position: 'absolute', top: '110%', right: 0,
                  background: 'var(--card)', border: '1px solid var(--card-border)',
                  borderRadius: '12px', padding: '12px', minWidth: '220px',
                  boxShadow: 'var(--shadow-lg)', zIndex: 100,
                }}>
                  <div style={{ padding: '8px 12px 12px', borderBottom: '1px solid var(--card-border)', marginBottom: '8px' }}>
                    <div style={{ fontWeight: 700 }}>{user.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{user.userId}</div>
                    {user.verified && <span className="badge badge-verified" style={{ marginTop: 4, fontSize: '11px' }}>✓ Verified</span>}
                  </div>
                  {[
                    { href: `/${user.role}`, label: t('dashboard'), icon: <BarChart2 size={14} /> },
                    { href: '/digital-locker', label: t('lockerTitle'), icon: <Lock size={14} /> },
                  ].map(item => (
                    <Link key={item.href} href={item.href}
                      onClick={() => setUserOpen(false)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '10px 12px', borderRadius: '8px', textDecoration: 'none',
                        color: 'var(--text)', fontSize: '13px', transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg2)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      {item.icon} {item.label}
                    </Link>
                  ))}
                  <button onClick={() => { logout(); setUserOpen(false); }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      width: '100%', padding: '10px 12px', borderRadius: '8px',
                      border: 'none', background: 'transparent', color: '#e74c3c',
                      fontSize: '13px', cursor: 'pointer', transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(231,76,60,0.08)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <LogOut size={14} /> {t('logout')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" style={{ textDecoration: 'none' }}>
                <button className="btn-outline" style={{ padding: '7px 16px', fontSize: '13px' }}>
                  <LogIn size={14} /> <span className="hidden-mobile">{t('login')}</span>
                </button>
              </Link>
              <Link href="/register" style={{ textDecoration: 'none' }} className="hidden-mobile">
                <button className="btn-primary" style={{ padding: '7px 16px', fontSize: '13px' }}>
                  <UserPlus size={14} /> {t('register')}
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Close dropdowns on outside click */}
      {(langOpen || userOpen || menuOpen) && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 99 }}
          onClick={() => { setLangOpen(false); setUserOpen(false); setMenuOpen(false); }}
        />
      )}

      <style>{`
        .hidden-mobile { }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
