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
    <div style={{ background: 'var(--bg)', minHeight: '90vh' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1a3a5c, #2980b9)', padding: '40px 24px', color: 'white', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🗺️</div>
        <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.2rem)', fontWeight: 900, marginBottom: 8 }}>{t('mapsTitle')}</h1>
        <p style={{ opacity: 0.8, maxWidth: 520, margin: '0 auto' }}>{t('mapsDesc')}</p>
      </div>

      <div className="page-container" style={{ padding: '32px 20px' }}>


        {/* Map Embed */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontWeight: 800, fontSize: 20, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            🗺️ Find MeeSeva Centers — Andhra Pradesh
          </h2>
          <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--card-border)' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7637841.448554278!2d79.7400!3d15.9129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Andhra Pradesh Service Centers Map"
            />
          </div>
          <div style={{ marginTop: 12, padding: '12px 16px', borderRadius: 10, background: 'var(--bg2)', fontSize: 13, color: 'var(--text-muted)', display: 'flex', gap: 8 }}>
            💡 <span>Search for "MeeSeva near me" or "CSC center [your village]" in Google Maps for exact locations.</span>
          </div>
        </div>

        {/* District Directory */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontWeight: 800, fontSize: 20, marginBottom: 16 }}>📍 District-wise Service Directory</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 10 }}>
            {DISTRICTS.map(dist => (
              <div key={dist}
                style={{ background: 'var(--card)', border: '1.5px solid var(--card-border)', borderRadius: 12, padding: '14px 16px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8 }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--primary)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--card-border)'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}
              >
                <MapPin size={14} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <span style={{ fontWeight: 600, fontSize: 13 }}>{dist}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Contacts */}
        <div style={{ background: 'linear-gradient(135deg, #1a3a5c, #2980b9)', borderRadius: 20, padding: '28px', color: 'white' }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>📞 Important Helplines</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 12 }}>
            {[
              { name: 'MeeSeva Helpline', number: '1100', icon: '🏛️' },
              { name: 'CSC Helpline', number: '1800-121-3468', icon: '🖥️' },
              { name: 'UIDAI (Aadhaar)', number: '1947', icon: '🔵' },
              { name: 'Kisan Call Center', number: '1800-180-1551', icon: '🌾' },
              { name: 'Ambulance', number: '108', icon: '🚑' },
              { name: 'Cybercrime', number: '1930', icon: '🛡️' },
            ].map(h => (
              <div key={h.name} style={{ padding: '12px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.1)', display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ fontSize: 20 }}>{h.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 18 }}>{h.number}</div>
                  <div style={{ fontSize: 11, opacity: 0.8 }}>{h.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
