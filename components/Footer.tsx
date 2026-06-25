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
    <footer className="mt-auto bg-gradient-to-br from-[#0f4023] to-[#0a2744] text-[rgba(255,255,255,0.85)] pt-16 pb-8 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10 text-center sm:text-left">
          {/* Brand */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center justify-center sm:justify-start gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4ade80] to-[#60a5fa] flex items-center justify-center text-2xl shrink-0">🌿</div>
              <div className="text-left">
                <div className="font-extrabold text-lg text-[#4ade80]">RIHC</div>
                <div className="text-[11px] opacity-70">Rural Internet Help Center</div>
              </div>
            </div>
            <p className="text-[13px] leading-relaxed opacity-80 mb-4 max-w-xs mx-auto sm:mx-0">
              {t('footerDesc')}
            </p>
            <div className="flex justify-center sm:justify-start gap-2">
              {['🌐', '📘', '🐦', '📱'].map((icon, i) => (
                <div key={i} className="w-9 h-9 rounded-lg bg-[rgba(255,255,255,0.1)] flex items-center justify-center cursor-pointer text-base transition-colors hover:bg-[rgba(255,255,255,0.2)]">
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold mb-4 text-[#4ade80] text-[15px]">{t('services')}</h3>
            <ul className="list-none flex flex-col gap-2">
              {links.services.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[rgba(255,255,255,0.75)] no-underline text-[13px] transition-colors hover:text-[#4ade80] flex items-center justify-center sm:justify-start gap-1.5">
                    <span>→</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-bold mb-4 text-[#60a5fa] text-[15px]">Tools & Resources</h3>
            <ul className="list-none flex flex-col gap-2">
              {links.tools.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[rgba(255,255,255,0.75)] no-underline text-[13px] transition-colors hover:text-[#60a5fa] flex items-center justify-center sm:justify-start gap-1.5">
                    <span>→</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="font-bold mb-4 text-[#fbbf24] text-[15px]">{t('contactUs')}</h3>
            <div className="flex flex-col gap-3 w-full max-w-[250px] mx-auto sm:mx-0">
              {[
                { icon: <Phone size={14} />, text: '1800-XXX-XXXX (Toll Free)' },
                { icon: <Phone size={14} />, text: 'Cybercrime: 1930' },
                { icon: <Mail size={14} />, text: 'help@rihc.gov.in' },
                { icon: <MapPin size={14} />, text: 'MeeSeva / CSC Centers' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-center sm:justify-start gap-2.5 text-[13px] opacity-80">
                  <span className="text-[#fbbf24] shrink-0">{item.icon}</span>
                  <span className="truncate">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 p-4 rounded-xl bg-[rgba(255,255,255,0.08)] w-full max-w-[250px] mx-auto sm:mx-0 text-center sm:text-left">
              <div className="text-[12px] font-bold mb-2 text-[#4ade80]">🚨 Emergency</div>
              <div className="text-[12px] opacity-90">Police: 100 | Ambulance: 108 | Fire: 101</div>
              <div className="text-[12px] opacity-90 mt-1">Women Helpline: 181 | Child: 1098</div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-[rgba(255,255,255,0.1)] my-6" />

        {/* Bottom */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 text-center">
          <div className="text-[12px] opacity-60">
            © {year} RIHC — Rural Internet Help Center. {t('allRightsReserved')}
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-5">
            {['Privacy Policy', 'Terms of Use', 'Accessibility', 'Grievance'].map(item => (
              <span key={item} className="text-[12px] opacity-60 cursor-pointer hover:opacity-100 transition-opacity">
                {item}
              </span>
            ))}
          </div>
          <div className="text-[12px] opacity-60 flex items-center justify-center gap-1.5 mt-2 lg:mt-0">
            Made with <Heart size={12} className="text-[#e74c3c]" /> for Rural India
          </div>
        </div>
      </div>
    </footer>
  );
}
