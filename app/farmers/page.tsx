'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import { ExternalLink, TrendingUp, Cloud, Sun, CloudRain } from 'lucide-react';

const CROP_PRICES = [
  { crop: 'Rice (Fine)', price: '₹2,183/quintal', change: '+2.3%', positive: true },
  { crop: 'Rice (Common)', price: '₹2,060/quintal', change: '+1.8%', positive: true },
  { crop: 'Cotton', price: '₹6,620/quintal', change: '-0.5%', positive: false },
  { crop: 'Red Chilli', price: '₹18,000/quintal', change: '+5.2%', positive: true },
  { crop: 'Maize', price: '₹1,875/quintal', change: '-1.2%', positive: false },
  { crop: 'Turmeric', price: '₹12,500/quintal', change: '+3.8%', positive: true },
  { crop: 'Groundnut', price: '₹6,377/quintal', change: '+0.9%', positive: true },
  { crop: 'Soybean', price: '₹4,600/quintal', change: '-2.1%', positive: false },
];

const SCHEMES = [
  { name: 'PM-KISAN', amount: '₹6,000/year', desc: '₹2,000 every 4 months to small/marginal farmers', link: 'https://pmkisan.gov.in', icon: '🌾' },
  { name: 'PM Fasal Bima Yojana', amount: 'Up to full crop value', desc: 'Crop insurance against natural disasters, pests, and diseases', link: 'https://pmfby.gov.in', icon: '🛡️' },
  { name: 'Kisan Credit Card', amount: 'Up to ₹3 lakh', desc: 'Low-interest credit for crop expenses and other needs', link: 'https://www.rbi.org.in', icon: '💳' },
  { name: 'PM Kisan Maandhan', amount: '₹3,000/month pension', desc: 'Pension scheme for farmers above 60 years', link: 'https://maandhan.in', icon: '👴' },
  { name: 'e-NAM', amount: 'Market access', desc: 'Sell crops directly to buyers across India at best prices', link: 'https://enam.gov.in', icon: '🏪' },
  { name: 'Soil Health Card', amount: 'Free', desc: 'Get detailed soil analysis and fertilizer recommendations', link: 'https://soilhealth.dac.gov.in', icon: '🌱' },
];

const WEATHER = [
  { day: 'Today', icon: '⛅', temp: '32°C', rain: '20%', desc: 'Partly cloudy' },
  { day: 'Tomorrow', icon: '🌧️', temp: '28°C', rain: '70%', desc: 'Heavy rain' },
  { day: 'Wed', icon: '🌤️', temp: '31°C', rain: '10%', desc: 'Mostly sunny' },
  { day: 'Thu', icon: '☀️', temp: '34°C', rain: '5%', desc: 'Clear sky' },
  { day: 'Fri', icon: '🌧️', temp: '27°C', rain: '80%', desc: 'Thunderstorm' },
];

export default function FarmersPage() {
  const { t } = useLanguage();

  return (
    <div style={{ background: 'var(--bg)', minHeight: '90vh' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1a4001, #2d6a4f)', padding: '50px 24px', color: 'white', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🌾</div>
        <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.4rem)', fontWeight: 900, marginBottom: 10 }}>{t('farmersTitle')}</h1>
        <p style={{ opacity: 0.8, maxWidth: 520, margin: '0 auto' }}>Crop prices, weather forecasts, government schemes and agricultural support for farmers</p>
      </div>

      <div className="page-container" style={{ padding: '40px 20px' }}>
        {/* Quick Links */}
        <div className="grid-4" style={{ marginBottom: 40 }}>
          {[
            { icon: '💹', label: t('cropPrices'), href: '#prices', color: '#27ae60' },
            { icon: '🌤️', label: t('weather'), href: '#weather', color: '#2980b9' },
            { icon: '📋', label: t('govSchemes'), href: '#schemes', color: '#e67e22' },
            { icon: '🛡️', label: t('cropInsurance'), href: '#schemes', color: '#8e44ad' },
          ].map(item => (
            <a key={item.label} href={item.href} style={{ textDecoration: 'none' }}>
              <div className="service-card">
                <div style={{ width: 52, height: 52, borderRadius: 12, background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>{item.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{item.label}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Weather & Prices Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 24, marginBottom: 40 }}>
          {/* Weather */}
          <section id="weather">
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              🌡️ {t('weather')} - Guntur
            </h2>
            <div style={{ background: 'linear-gradient(135deg, #1b4f72, #2980b9)', borderRadius: 16, padding: 20, color: 'white', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                <div style={{ fontSize: 56 }}>⛅</div>
                <div>
                  <div style={{ fontSize: 36, fontWeight: 900 }}>32°C</div>
                  <div style={{ opacity: 0.8 }}>Partly Cloudy • 65% Humidity</div>
                  <div style={{ opacity: 0.7, fontSize: 13 }}>🌬️ Wind: 12 km/h NE</div>
                </div>
              </div>
              <div style={{ padding: '12px', borderRadius: 10, background: 'rgba(255,255,255,0.15)', fontSize: 13 }}>
                🌾 <strong>Farming Advisory:</strong> Good day for irrigation. Rain expected tomorrow — harvest if possible.
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
              {WEATHER.map(w => (
                <div key={w.day} style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 12, padding: '12px 10px', textAlign: 'center', minWidth: 72, flexShrink: 0 }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>{w.day}</div>
                  <div style={{ fontSize: 24, marginBottom: 4 }}>{w.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{w.temp}</div>
                  <div style={{ fontSize: 10, color: '#2980b9' }}>💧 {w.rain}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Crop Prices */}
          <section id="prices">
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              💹 {t('cropPrices')} — MSP Rates
            </h2>
            <div style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 16, overflow: 'hidden' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Crop</th>
                    <th>MSP / Market Price</th>
                    <th>Change</th>
                  </tr>
                </thead>
                <tbody>
                  {CROP_PRICES.map(c => (
                    <tr key={c.crop}>
                      <td style={{ fontWeight: 600 }}>🌾 {c.crop}</td>
                      <td style={{ fontWeight: 700 }}>{c.price}</td>
                      <td>
                        <span style={{ color: c.positive ? '#27ae60' : '#e74c3c', fontWeight: 700, fontSize: 13 }}>
                          {c.positive ? '▲' : '▼'} {c.change}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ padding: '12px 16px', borderTop: '1px solid var(--card-border)', fontSize: 11, color: 'var(--text-muted)' }}>
                Source: APMC Market Prices • Updated daily • Last updated: 25 Jun 2024
              </div>
            </div>
          </section>
        </div>

        {/* Government Schemes */}
        <section id="schemes" style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            📋 {t('govSchemes')}
          </h2>
          <div className="grid-3">
            {SCHEMES.map(scheme => (
              <div key={scheme.name} style={{ background: 'var(--card)', border: '1.5px solid var(--card-border)', borderRadius: 16, padding: '20px', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', gap: 10 }}
                onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)')}
                onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.transform = 'none')}
              >
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ fontSize: 32 }}>{scheme.icon}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 14 }}>{scheme.name}</div>
                    <div style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 700 }}>{scheme.amount}</div>
                  </div>
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>{scheme.desc}</p>
                <a href={scheme.link} target="_blank" rel="noopener noreferrer">
                  <button className="btn-outline" style={{ width: '100%', justifyContent: 'center', fontSize: 12, padding: '8px 12px' }}>
                    <ExternalLink size={12} /> Learn More
                  </button>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Soil & Fertilizer Advisor */}
        <section style={{ background: 'linear-gradient(135deg, #1a6b3a, #27ae60)', borderRadius: 20, padding: '32px', color: 'white' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🌱</div>
              <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>Soil Health & Fertilizer Advisor</h2>
              <p style={{ opacity: 0.85, lineHeight: 1.7, marginBottom: 20 }}>Get your soil tested at nearest Krishi Vigyan Kendra (KVK) and receive personalized fertilizer recommendations.</p>
              <a href="https://soilhealth.dac.gov.in" target="_blank" rel="noopener noreferrer">
                <button style={{ padding: '12px 24px', borderRadius: '50px', background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.4)', color: 'white', cursor: 'pointer', fontWeight: 700 }}>
                  Get Soil Health Card
                </button>
              </a>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { icon: '🧪', label: 'N-P-K Analysis', desc: 'Nitrogen, Phosphorus, Potassium levels' },
                { icon: '⚗️', label: 'pH Level', desc: 'Soil acidity/alkalinity' },
                { icon: '💧', label: 'Moisture', desc: 'Water retention capacity' },
                { icon: '🌿', label: 'Organic Matter', desc: 'Organic carbon content' },
              ].map(item => (
                <div key={item.label} style={{ padding: '14px', borderRadius: 12, background: 'rgba(255,255,255,0.12)' }}>
                  <div style={{ fontSize: 24, marginBottom: 6 }}>{item.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 12 }}>{item.label}</div>
                  <div style={{ fontSize: 11, opacity: 0.8 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
