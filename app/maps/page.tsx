'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, ExternalLink, Phone, Map as MapIcon, Info, Building2, MonitorSmartphone, ShieldCheck, Wheat, Ambulance, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const DISTRICTS = [
  'Srikakulam', 'Vizianagaram', 'Visakhapatnam', 'Anakapalli', 'Kakinada', 'East Godavari',
  'Konaseema', 'Eluru', 'West Godavari', 'Krishna', 'NTR', 'Guntur', 'Bapatla', 'Palnadu',
  'Prakasam', 'Nellore', 'Kurnool', 'Nandyal', 'Anantapur', 'Sri Sathya Sai', 'YSR Kadapa',
  'Annamayya', 'Chittoor', 'Tirupati', 'Parvathipuram Manyam'
];

export default function MapsPage() {
  const { t } = useLanguage();
  const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

  return (
    <div className="bg-[var(--bg)] min-h-[90vh] pb-12 relative">
      {/* Hero */}
      <div className="bg-[var(--primary)] pt-28 pb-20 px-4 md:px-6 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--secondary)] opacity-10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
        
        <div className="relative z-10 max-w-[800px] mx-auto">
          <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/20 backdrop-blur-md">
            <MapIcon size={40} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">{t('mapsTitle')}</h1>
          <p className="opacity-90 max-w-[600px] mx-auto mb-8 text-[15px] md:text-[17px] leading-relaxed font-medium">{t('mapsDesc')}</p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 -mt-12 relative z-20">
        {/* Map Embed */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-12">
          <div className="bg-white rounded-3xl shadow-xl border border-[var(--card-border)] overflow-hidden">
            <div className="p-6 md:p-8 border-b border-[var(--card-border)] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="font-extrabold text-[20px] md:text-[24px] flex items-center gap-3 text-[var(--text)]">
                <MapPin size={24} className="text-[var(--primary)]" /> Find MeeSeva Centers — Andhra Pradesh
              </h2>
              <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-[13px] font-bold border border-blue-100 flex items-center gap-2">
                <Info size={16} className="shrink-0" /> Interactive Map
              </div>
            </div>
            
            <div className="relative w-full h-[400px] md:h-[500px] bg-[var(--bg2)]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7637841.448554278!2d79.7400!3d15.9129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1234567890"
                className="absolute inset-0 w-full h-full border-none"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Andhra Pradesh Service Centers Map"
              />
            </div>
            
            <div className="p-5 md:p-6 bg-[var(--bg2)] border-t border-[var(--card-border)]">
              <div className="flex items-start md:items-center gap-3 text-[13px] md:text-[14px] text-[var(--text-muted)] font-medium">
                <Info size={18} className="text-[var(--primary)] shrink-0 md:mt-0 mt-0.5" />
                <p>Search for <strong className="text-[var(--text)]">"MeeSeva near me"</strong> or <strong className="text-[var(--text)]">"CSC center [your village]"</strong> in Google Maps for precise directions to your nearest service center.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* District Directory */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-12">
          <div className="bg-white rounded-3xl shadow-sm border border-[var(--card-border)] p-6 md:p-8">
            <h2 className="font-extrabold text-[20px] md:text-[24px] mb-6 flex items-center gap-3 text-[var(--text)]">
              <Building2 size={24} className="text-[var(--secondary)]" /> District-wise Service Directory
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {DISTRICTS.map(dist => (
                <div key={dist}
                  className="bg-[var(--bg)] border-2 border-[var(--card-border)] rounded-2xl p-4 cursor-pointer transition-all flex items-center gap-3 hover:border-[var(--primary)] hover:bg-blue-50 group hover:-translate-y-1 shadow-sm"
                >
                  <MapPin size={18} className="text-[var(--text-muted)] group-hover:text-[var(--primary)] shrink-0 transition-colors" />
                  <span className="font-bold text-[13px] md:text-[14px] text-[var(--text)] truncate group-hover:text-[var(--primary)] transition-colors">{dist}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quick Contacts */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-gradient-to-br from-[#0F4C81] to-[#1B4F72] rounded-3xl p-6 md:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          
          <h2 className="text-[20px] md:text-[24px] font-black mb-8 flex items-center gap-3 relative z-10">
            <Phone size={28} className="text-blue-300" /> Important Helplines & Contacts
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 relative z-10">
            {[
              { name: 'MeeSeva Helpline', number: '1100', icon: <Building2 size={24}/> },
              { name: 'CSC Helpline', number: '1800-121-3468', icon: <MonitorSmartphone size={24}/> },
              { name: 'UIDAI (Aadhaar)', number: '1947', icon: <ShieldCheck size={24}/> },
              { name: 'Kisan Call Center', number: '1800-180-1551', icon: <Wheat size={24}/> },
              { name: 'Ambulance', number: '108', icon: <Ambulance size={24}/> },
              { name: 'Cybercrime', number: '1930', icon: <ShieldAlert size={24}/> },
            ].map(h => (
              <div key={h.name} className="p-5 md:p-6 rounded-2xl bg-white/10 border border-white/20 flex gap-4 items-center hover:bg-white/15 transition-colors backdrop-blur-sm group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                  {h.icon}
                </div>
                <div>
                  <div className="font-black text-[20px] md:text-[22px] leading-tight mb-1">{h.number}</div>
                  <div className="text-[12px] md:text-[13px] opacity-90 font-bold uppercase tracking-wider">{h.name}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
