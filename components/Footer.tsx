'use client';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, Mail, MapPin, ExternalLink, Heart, Building, ShieldCheck, FileText, ChevronRight } from 'lucide-react';

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
      { href: '/maps', label: 'Find Nearby Centers' },
    ],
  };

  return (
    <footer className="mt-auto bg-[#093358] text-white pt-16 pb-8 px-6 border-t-[4px] border-[var(--primary)]">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          
          {/* Brand & About (Col Span 4) */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0">
                <Building size={24} className="text-[#093358]" />
              </div>
              <div>
                <div className="font-black text-xl tracking-tight leading-none mb-1">RIHC</div>
                <div className="text-[12px] font-medium text-blue-200">Rural Internet Help Center</div>
              </div>
            </div>
            <p className="text-[14px] leading-relaxed text-blue-100 mb-6 max-w-sm">
              Empowering rural Andhra Pradesh through accessible digital services, verified employment opportunities, and essential government resources.
            </p>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.1)] transition-colors cursor-pointer"><ShieldCheck size={20} className="text-blue-300" /></div>
              <div className="p-3 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.1)] transition-colors cursor-pointer"><FileText size={20} className="text-blue-300" /></div>
            </div>
          </div>

          {/* Quick Links (Col Span 2) */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-[15px] mb-5 text-white tracking-wide uppercase">Services</h3>
            <ul className="list-none flex flex-col gap-3">
              {links.services.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="group flex items-center gap-2 text-blue-200 no-underline text-[14px] transition-colors hover:text-white">
                    <ChevronRight size={14} className="text-blue-400 group-hover:translate-x-1 transition-transform" /> 
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools & Resources (Col Span 3) */}
          <div className="lg:col-span-3">
            <h3 className="font-bold text-[15px] mb-5 text-white tracking-wide uppercase">Resources</h3>
            <ul className="list-none flex flex-col gap-3">
              {links.tools.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="group flex items-center gap-2 text-blue-200 no-underline text-[14px] transition-colors hover:text-white">
                    <ChevronRight size={14} className="text-blue-400 group-hover:translate-x-1 transition-transform" /> 
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Emergency (Col Span 3) */}
          <div className="lg:col-span-3">
            <h3 className="font-bold text-[15px] mb-5 text-white tracking-wide uppercase">Contact & Support</h3>
            <div className="flex flex-col gap-4 mb-6">
              {[
                { icon: <Phone size={16} />, text: '1800-425-4440 (AP Toll Free)' },
                { icon: <ShieldCheck size={16} />, text: 'Cybercrime: 1930' },
                { icon: <Mail size={16} />, text: 'support@rihc.ap.gov.in' },
                { icon: <MapPin size={16} />, text: 'Find nearest MeeSeva Center' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-[14px] text-blue-100">
                  <span className="text-blue-400 shrink-0 mt-0.5">{item.icon}</span>
                  <span className="leading-snug">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)]">
              <div className="text-[13px] font-bold mb-2 text-red-400 flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
                Emergency Numbers
              </div>
              <div className="text-[12px] text-blue-100 mb-1">Police: <strong className="text-white">100</strong> | Ambulance: <strong className="text-white">108</strong></div>
              <div className="text-[12px] text-blue-100">Women Helpline: <strong className="text-white">181</strong></div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="text-[13px] text-blue-200">
            &copy; {year} Rural Internet Help Center. Govt of Andhra Pradesh.
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {['Privacy Policy', 'Terms of Use', 'Accessibility', 'Grievance'].map(item => (
              <span key={item} className="text-[13px] text-blue-200 cursor-pointer hover:text-white transition-colors">
                {item}
              </span>
            ))}
          </div>
          <div className="text-[13px] text-blue-200 flex items-center justify-center gap-1.5">
            Designed with <Heart size={14} className="text-red-500 fill-red-500 mx-0.5" /> for Rural India
          </div>
        </div>
      </div>
    </footer>
  );
}
