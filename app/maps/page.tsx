'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, ExternalLink, Phone } from 'lucide-react';

const DISTRICTS = [
  'Srikakulam', 'Vizianagaram', 'Visakhapatnam', 'Anakapalli', 'Kakinada', 'East Godavari',
  'Konaseema', 'Eluru', 'West Godavari', 'Krishna', 'NTR', 'Guntur', 'Bapatla', 'Palnadu',
  'Prakasam', 'Nellore', 'Kurnool', 'Nandyal', 'Anantapur', 'Sri Sathya Sai', 'YSR Kadapa',
  'Annamayya', 'Chittoor', 'Tirupati', 'Parvathipuram Manyam'
];

export default function MapsPage() {
  const { t } = useLanguage();

  return (
    <div className="bg-[var(--bg)] min-h-[90vh] pb-12">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1a3a5c] to-[#2980b9] pt-24 pb-12 px-4 md:px-6 text-white text-center">
        <div className="text-4xl md:text-5xl mb-3 md:mb-4">🗺️</div>
        <h1 className="text-2xl md:text-[clamp(1.8rem,4vw,2.2rem)] font-black mb-2.5">{t('mapsTitle')}</h1>
        <p className="opacity-80 max-w-[520px] mx-auto text-sm md:text-base leading-relaxed">{t('mapsDesc')}</p>
      </div>

      <div className="page-container px-4 md:px-6 py-6 md:py-8">

        {/* Map Embed */}
        <div className="mb-8 md:mb-10">
          <h2 className="font-extrabold text-lg md:text-[20px] mb-4 flex items-center gap-2 flex-wrap leading-tight">
            🗺️ Find MeeSeva Centers — Andhra Pradesh
          </h2>
          <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-lg)] border border-[var(--card-border)] bg-[var(--card)]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7637841.448554278!2d79.7400!3d15.9129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1234567890"
              className="w-full h-[300px] md:h-[400px] border-none"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Andhra Pradesh Service Centers Map"
            />
          </div>
          <div className="mt-3 md:mt-4 p-3 md:p-4 rounded-xl bg-[var(--bg2)] text-xs md:text-[13px] text-[var(--text-muted)] flex items-start gap-2 leading-relaxed">
            <span className="shrink-0 mt-0.5">💡</span>
            <span>Search for "MeeSeva near me" or "CSC center [your village]" in Google Maps for exact locations.</span>
          </div>
        </div>

        {/* District Directory */}
        <div className="mb-8 md:mb-10">
          <h2 className="font-extrabold text-lg md:text-[20px] mb-4">📍 District-wise Service Directory</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 md:gap-3">
            {DISTRICTS.map(dist => (
              <div key={dist}
                className="bg-[var(--card)] border-[1.5px] border-[var(--card-border)] rounded-xl p-3 md:p-[14px_16px] cursor-pointer transition-all flex items-center gap-2 hover:border-[var(--primary)] hover:-translate-y-1 active:scale-95 shadow-[var(--shadow)]"
              >
                <MapPin size={14} className="text-[var(--primary)] shrink-0" />
                <span className="font-semibold text-xs md:text-[13px] truncate">{dist}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Contacts */}
        <div className="bg-gradient-to-br from-[#1a3a5c] to-[#2980b9] rounded-2xl p-5 md:p-7 text-white">
          <h2 className="text-base md:text-[18px] font-extrabold mb-4">📞 Important Helplines</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { name: 'MeeSeva Helpline', number: '1100', icon: '🏛️' },
              { name: 'CSC Helpline', number: '1800-121-3468', icon: '🖥️' },
              { name: 'UIDAI (Aadhaar)', number: '1947', icon: '🔵' },
              { name: 'Kisan Call Center', number: '1800-180-1551', icon: '🌾' },
              { name: 'Ambulance', number: '108', icon: '🚑' },
              { name: 'Cybercrime', number: '1930', icon: '🛡️' },
            ].map(h => (
              <div key={h.name} className="p-3.5 md:p-[12px_16px] rounded-xl bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.05)] flex gap-3 items-center hover:bg-[rgba(255,255,255,0.15)] transition-colors">
                <span className="text-2xl md:text-[20px] shrink-0">{h.icon}</span>
                <div>
                  <div className="font-bold text-[16px] md:text-[18px] leading-tight">{h.number}</div>
                  <div className="text-[11px] md:text-[11px] opacity-80 mt-0.5">{h.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
