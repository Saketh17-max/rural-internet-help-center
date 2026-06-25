'use client';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, Mail, MapPin, ExternalLink, Heart } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const links = {
    services: [
      { href: '/government', label: t('govServices') },
      { href: '/marketplace', label: t('marketplace') },
      { href: '/students', label: t('studentsTitle') },
      { href: '/farmers', label: t('farmersTitle') },
      { href: '/women', label: t('womenTitle') },
      { href: '/seniors', label: t('seniorsTitle') },
    ],
    tools: [
      { href: '/digital-locker', label: t('lockerTitle') },
      { href: '/document-tools', label: t('docToolsTitle') },
      { href: '/awareness', label: t('awarenessTitle') },
      { href: '/survey', label: t('surveyTitle') },
      { href: '/analytics', label: 'Analytics' },
      { href: '/maps', label: 'Find Nearby' },
    ],
  };

  return (
    <footer style={{
      background: 'linear-gradient(135deg, #0f4023 0%, #0a2744 100%)',
      color: 'rgba(255,255,255,0.85)',
      padding: '60px 24px 24px',
      marginTop: 'auto',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 40, marginBottom: 40 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 48, height: 48, borderRadius: '12px',
                background: 'linear-gradient(135deg, #4ade80, #60a5fa)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24,
              }}>🌿</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 18, color: '#4ade80' }}>RIHC</div>
                <div style={{ fontSize: 11, opacity: 0.7 }}>Rural Internet Help Center</div>
              </div>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, opacity: 0.8, marginBottom: 16 }}>
              {t('footerDesc')}
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {['🌐', '📘', '🐦', '📱'].map((icon, i) => (
                <div key={i} style={{
                  width: 36, height: 36, borderRadius: '8px',
                  background: 'rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', fontSize: 16, transition: 'all 0.2s',
                }}>
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 style={{ fontWeight: 700, marginBottom: 16, color: '#4ade80', fontSize: 15 }}>{t('services')}</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {links.services.map(link => (
                <li key={link.href}>
                  <Link href={link.href} style={{
                    color: 'rgba(255,255,255,0.75)', textDecoration: 'none',
                    fontSize: 13, transition: 'color 0.2s',
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#4ade80')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 style={{ fontWeight: 700, marginBottom: 16, color: '#60a5fa', fontSize: 15 }}>Tools & Resources</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {links.tools.map(link => (
                <li key={link.href}>
                  <Link href={link.href} style={{
                    color: 'rgba(255,255,255,0.75)', textDecoration: 'none',
                    fontSize: 13, transition: 'color 0.2s',
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#60a5fa')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ fontWeight: 700, marginBottom: 16, color: '#fbbf24', fontSize: 15 }}>{t('contactUs')}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { icon: <Phone size={14} />, text: '1800-XXX-XXXX (Toll Free)' },
                { icon: <Phone size={14} />, text: 'Cybercrime: 1930' },
                { icon: <Mail size={14} />, text: 'help@rihc.gov.in' },
                { icon: <MapPin size={14} />, text: 'MeeSeva / CSC Centers' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, opacity: 0.8 }}>
                  <span style={{ color: '#fbbf24' }}>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>

            <div style={{ marginTop: 20, padding: 16, borderRadius: 12, background: 'rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8, color: '#4ade80' }}>🚨 Emergency</div>
              <div style={{ fontSize: 12, opacity: 0.9 }}>Police: 100 | Ambulance: 108 | Fire: 101</div>
              <div style={{ fontSize: 12, opacity: 0.9, marginTop: 4 }}>Women Helpline: 181 | Child: 1098</div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '24px 0' }} />

        {/* Bottom */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 12, opacity: 0.6 }}>
            © {year} RIHC — Rural Internet Help Center. {t('allRightsReserved')}
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy Policy', 'Terms of Use', 'Accessibility', 'Grievance'].map(item => (
              <span key={item} style={{ fontSize: 12, opacity: 0.6, cursor: 'pointer', transition: 'opacity 0.2s' }}>
                {item}
              </span>
            ))}
          </div>
          <div style={{ fontSize: 12, opacity: 0.6, display: 'flex', alignItems: 'center', gap: 4 }}>
            Made with <Heart size={12} style={{ color: '#e74c3c' }} /> for Rural India
          </div>
        </div>
      </div>
    </footer>
  );
}
