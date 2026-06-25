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
    <div className="bg-[var(--bg)] min-h-[90vh] pb-12">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1a4001] to-[#2d6a4f] pt-24 pb-10 md:pb-12 px-4 md:px-6 text-white text-center">
        <div className="text-4xl md:text-5xl mb-3 md:mb-4">🌾</div>
        <h1 className="text-2xl md:text-[clamp(1.8rem,4vw,2.4rem)] font-black mb-2.5">{t('farmersTitle')}</h1>
        <p className="opacity-80 max-w-[520px] mx-auto text-[13px] md:text-[15px] leading-relaxed">Crop prices, weather forecasts, government schemes and agricultural support for farmers</p>
      </div>

      <div className="page-container px-4 md:px-6 py-6 md:py-10">
        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12">
          {[
            { icon: '💹', label: t('cropPrices'), href: '#prices', color: '#27ae60' },
            { icon: '🌤️', label: t('weather'), href: '#weather', color: '#2980b9' },
            { icon: '📋', label: t('govSchemes'), href: '#schemes', color: '#e67e22' },
            { icon: '🛡️', label: t('cropInsurance'), href: '#schemes', color: '#8e44ad' },
          ].map(item => (
            <a key={item.label} href={item.href} className="no-underline block h-full">
              <div className="service-card flex flex-col items-center justify-center p-4 md:p-5 h-full transition-transform active:scale-95">
                <div className="w-12 h-12 md:w-[52px] md:h-[52px] rounded-xl flex items-center justify-center text-2xl md:text-[26px] mb-3" style={{ background: `${item.color}15` }}>{item.icon}</div>
                <div className="font-bold text-[13px] md:text-[14px] text-center text-[var(--text)]">{item.label}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Weather & Prices Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6 md:gap-8 mb-10 md:mb-12">
          {/* Weather */}
          <section id="weather" className="flex flex-col">
            <h2 className="text-[18px] md:text-[20px] font-extrabold mb-4 flex items-center gap-2">
              🌡️ {t('weather')} - Guntur
            </h2>
            <div className="bg-gradient-to-br from-[#1b4f72] to-[#2980b9] rounded-2xl p-5 md:p-6 text-white mb-3 md:mb-4 shadow-md">
              <div className="flex items-center gap-4 md:gap-5 mb-5 md:mb-6">
                <div className="text-[48px] md:text-[56px] leading-none">⛅</div>
                <div>
                  <div className="text-[32px] md:text-[36px] font-black leading-tight">32°C</div>
                  <div className="opacity-90 text-[13px] md:text-[14px] font-medium">Partly Cloudy • 65% Humidity</div>
                  <div className="opacity-80 text-[12px] md:text-[13px] mt-1 flex items-center gap-1">🌬️ Wind: 12 km/h NE</div>
                </div>
              </div>
              <div className="p-3 md:p-3.5 rounded-xl bg-[rgba(255,255,255,0.15)] text-[12px] md:text-[13px] leading-relaxed border border-[rgba(255,255,255,0.1)]">
                🌾 <strong className="font-bold">Farming Advisory:</strong> Good day for irrigation. Rain expected tomorrow — harvest if possible.
              </div>
            </div>
            
            <div className="flex gap-2.5 md:gap-3 overflow-x-auto hide-scrollbar pb-2 pt-1 px-1 -mx-1">
              {WEATHER.map(w => (
                <div key={w.day} className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-2.5 md:p-3 text-center min-w-[72px] md:min-w-[80px] shrink-0 shadow-sm">
                  <div className="text-[10px] md:text-[11px] text-[var(--text-muted)] mb-1 font-semibold">{w.day}</div>
                  <div className="text-2xl md:text-[26px] mb-1">{w.icon}</div>
                  <div className="font-extrabold text-[13px] md:text-[15px]">{w.temp}</div>
                  <div className="text-[10px] text-[#2980b9] font-bold mt-0.5">💧 {w.rain}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Crop Prices */}
          <section id="prices">
            <h2 className="text-[18px] md:text-[20px] font-extrabold mb-4 flex items-center gap-2">
              💹 {t('cropPrices')} — MSP Rates
            </h2>
            <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-2xl overflow-hidden shadow-sm flex flex-col h-full">
              <div className="overflow-x-auto w-full">
                <table className="data-table w-full text-left border-collapse min-w-[400px]">
                  <thead>
                    <tr>
                      <th className="text-[11px] md:text-[12px] text-[var(--text-muted)] font-bold p-3 md:p-4 bg-[var(--bg2)] border-b border-[var(--card-border)]">Crop</th>
                      <th className="text-[11px] md:text-[12px] text-[var(--text-muted)] font-bold p-3 md:p-4 bg-[var(--bg2)] border-b border-[var(--card-border)]">MSP / Market Price</th>
                      <th className="text-[11px] md:text-[12px] text-[var(--text-muted)] font-bold p-3 md:p-4 bg-[var(--bg2)] border-b border-[var(--card-border)]">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CROP_PRICES.map((c, i) => (
                      <tr key={c.crop} className={i !== CROP_PRICES.length - 1 ? 'border-b border-[var(--card-border)]' : ''}>
                        <td className="font-bold text-[13px] md:text-[14px] p-3 md:p-4">🌾 {c.crop}</td>
                        <td className="font-extrabold text-[13px] md:text-[14px] p-3 md:p-4">{c.price}</td>
                        <td className="p-3 md:p-4">
                          <span className={`font-bold text-[12px] md:text-[13px] px-2 py-1 rounded-md ${c.positive ? 'text-[#27ae60] bg-[rgba(39,174,96,0.1)]' : 'text-[#e74c3c] bg-[rgba(231,76,60,0.1)]'}`}>
                            {c.positive ? '▲' : '▼'} {c.change}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-3 md:p-4 border-t border-[var(--card-border)] text-[10px] md:text-[11px] text-[var(--text-muted)] font-medium mt-auto bg-[var(--bg2)]">
                Source: APMC Market Prices • Updated daily • Last updated: 25 Jun 2024
              </div>
            </div>
          </section>
        </div>

        {/* Government Schemes */}
        <section id="schemes" className="mb-10 md:mb-12">
          <h2 className="text-[18px] md:text-[22px] font-extrabold mb-5 md:mb-6 flex items-center gap-2">
            📋 {t('govSchemes')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 md:gap-4">
            {SCHEMES.map(scheme => (
              <div key={scheme.name} className="bg-[var(--card)] border-[1.5px] border-[var(--card-border)] rounded-2xl p-4 md:p-5 flex flex-col gap-3 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                <div className="flex gap-3 items-center">
                  <div className="text-[28px] md:text-[32px] shrink-0">{scheme.icon}</div>
                  <div className="min-w-0">
                    <div className="font-extrabold text-[14px] md:text-[15px] leading-tight truncate">{scheme.name}</div>
                    <div className="text-[12px] md:text-[13px] text-[var(--primary)] font-bold mt-0.5">{scheme.amount}</div>
                  </div>
                </div>
                <p className="text-[12px] md:text-[13px] text-[var(--text-muted)] leading-relaxed flex-1">{scheme.desc}</p>
                <a href={scheme.link} target="_blank" rel="noopener noreferrer" className="no-underline w-full mt-2">
                  <button className="btn-outline w-full justify-center text-[12px] md:text-[13px] min-h-[40px] md:min-h-[44px]">
                    <ExternalLink size={14} className="mr-1.5" /> Learn More
                  </button>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Soil & Fertilizer Advisor */}
        <section className="bg-gradient-to-br from-[#1a6b3a] to-[#27ae60] rounded-2xl md:rounded-[20px] p-5 md:p-8 text-white shadow-lg overflow-hidden relative">
          <div className="absolute right-0 top-0 opacity-10 text-[150px] md:text-[250px] pointer-events-none translate-x-1/4 -translate-y-1/4">🌱</div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center relative z-10">
            <div>
              <div className="text-[40px] md:text-[48px] mb-3 md:mb-4">🌱</div>
              <h2 className="text-[20px] md:text-[24px] font-extrabold mb-2.5 md:mb-3 leading-tight">Soil Health & Fertilizer Advisor</h2>
              <p className="opacity-90 leading-relaxed mb-5 md:mb-6 text-[13px] md:text-[15px] max-w-[480px]">Get your soil tested at nearest Krishi Vigyan Kendra (KVK) and receive personalized fertilizer recommendations.</p>
              <a href="https://soilhealth.dac.gov.in" target="_blank" rel="noopener noreferrer" className="inline-block w-full sm:w-auto">
                <button className="w-full sm:w-auto py-3 px-6 rounded-full bg-[rgba(255,255,255,0.2)] border-2 border-[rgba(255,255,255,0.4)] text-white font-bold text-[14px] md:text-[15px] hover:bg-[rgba(255,255,255,0.3)] transition-colors min-h-[48px] shadow-none">
                  Get Soil Health Card
                </button>
              </a>
            </div>
            
            <div className="grid grid-cols-2 gap-2.5 md:gap-3">
              {[
                { icon: '🧪', label: 'N-P-K Analysis', desc: 'Nitrogen, Phosphorus, Potassium levels' },
                { icon: '⚗️', label: 'pH Level', desc: 'Soil acidity/alkalinity' },
                { icon: '💧', label: 'Moisture', desc: 'Water retention capacity' },
                { icon: '🌿', label: 'Organic Matter', desc: 'Organic carbon content' },
              ].map(item => (
                <div key={item.label} className="p-3 md:p-4 rounded-xl bg-[rgba(255,255,255,0.15)] border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] transition-colors">
                  <div className="text-[20px] md:text-[24px] mb-1.5 md:mb-2">{item.icon}</div>
                  <div className="font-extrabold text-[12px] md:text-[13px] mb-0.5">{item.label}</div>
                  <div className="text-[10px] md:text-[11px] opacity-80 leading-snug">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
