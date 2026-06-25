'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import { ExternalLink, TrendingUp, TrendingDown, Sun, CloudRain, CloudSun, Wind, Droplets, MapPin, FileText, ShieldCheck, CreditCard, HeartPulse, Store, Leaf, Sprout } from 'lucide-react';
import { motion } from 'framer-motion';

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
  { name: 'PM-KISAN', amount: '₹6,000/year', desc: '₹2,000 every 4 months to small/marginal farmers', link: 'https://pmkisan.gov.in', icon: <Sprout size={28}/> },
  { name: 'PM Fasal Bima Yojana', amount: 'Up to full crop value', desc: 'Crop insurance against natural disasters, pests, and diseases', link: 'https://pmfby.gov.in', icon: <ShieldCheck size={28}/> },
  { name: 'Kisan Credit Card', amount: 'Up to ₹3 lakh', desc: 'Low-interest credit for crop expenses and other needs', link: 'https://www.rbi.org.in', icon: <CreditCard size={28}/> },
  { name: 'PM Kisan Maandhan', amount: '₹3,000/month pension', desc: 'Pension scheme for farmers above 60 years', link: 'https://maandhan.in', icon: <HeartPulse size={28}/> },
  { name: 'e-NAM', amount: 'Market access', desc: 'Sell crops directly to buyers across India at best prices', link: 'https://enam.gov.in', icon: <Store size={28}/> },
  { name: 'Soil Health Card', amount: 'Free', desc: 'Get detailed soil analysis and fertilizer recommendations', link: 'https://soilhealth.dac.gov.in', icon: <Leaf size={28}/> },
];

const WEATHER = [
  { day: 'Today', icon: <CloudSun size={32} className="text-yellow-500" />, temp: '32°C', rain: '20%', desc: 'Partly cloudy' },
  { day: 'Tomorrow', icon: <CloudRain size={32} className="text-blue-500" />, temp: '28°C', rain: '70%', desc: 'Heavy rain' },
  { day: 'Wed', icon: <Sun size={32} className="text-yellow-500" />, temp: '31°C', rain: '10%', desc: 'Mostly sunny' },
  { day: 'Thu', icon: <Sun size={32} className="text-yellow-500" />, temp: '34°C', rain: '5%', desc: 'Clear sky' },
  { day: 'Fri', icon: <CloudRain size={32} className="text-gray-500" />, temp: '27°C', rain: '80%', desc: 'Thunderstorm' },
];

export default function FarmersPage() {
  const { t } = useLanguage();
  const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

  return (
    <div className="bg-[var(--bg)] min-h-[90vh] pb-12 relative">
      {/* Hero */}
      <div className="bg-[#1A6B3A] pt-28 pb-20 px-4 md:px-6 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-400 opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400 opacity-20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
        
        <div className="relative z-10 max-w-[800px] mx-auto">
          <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/20 backdrop-blur-md">
            <Sprout size={40} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">{t('farmersTitle')}</h1>
          <p className="opacity-90 max-w-[600px] mx-auto mb-8 text-[15px] md:text-[17px] leading-relaxed font-medium">Crop prices, weather forecasts, government schemes and comprehensive agricultural support for farmers.</p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 -mt-12 relative z-20">
        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: <TrendingUp size={24}/>, label: t('cropPrices'), href: '#prices', color: '#0F4C81' },
            { icon: <CloudSun size={24}/>, label: t('weather'), href: '#weather', color: '#2F80ED' },
            { icon: <FileText size={24}/>, label: t('govSchemes'), href: '#schemes', color: '#E67E22' },
            { icon: <ShieldCheck size={24}/>, label: t('cropInsurance'), href: '#schemes', color: '#8E44AD' },
          ].map(item => (
            <a key={item.label} href={item.href} className="no-underline block h-full">
              <div className="bg-white rounded-3xl p-6 border-2 border-[var(--card-border)] hover:border-current flex flex-col items-center justify-center h-full transition-all shadow-sm hover:shadow-md hover:-translate-y-1 group" style={{ color: item.color }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ background: `${item.color}15` }}>{item.icon}</div>
                <div className="font-extrabold text-[14px] md:text-[15px] text-center text-[var(--text)] group-hover:text-current transition-colors">{item.label}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Weather & Prices Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-6 md:gap-8 mb-12">
          {/* Weather */}
          <section id="weather" className="flex flex-col">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white rounded-3xl shadow-sm border border-[var(--card-border)] p-6 mb-6">
              <h2 className="text-[20px] font-extrabold flex items-center gap-2 text-[var(--text)]">
                <CloudSun size={24} className="text-[#2F80ED]" /> {t('weather')}
              </h2>
            </motion.div>
            
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-gradient-to-br from-[#0F4C81] to-[#2F80ED] rounded-3xl p-6 md:p-8 text-white mb-6 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl" />
              <div className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider mb-6 bg-white/20 w-fit px-3 py-1.5 rounded-lg backdrop-blur-sm"><MapPin size={16}/> Guntur District</div>
              
              <div className="flex items-center gap-6 mb-8">
                <CloudSun size={64} className="text-yellow-300 shrink-0" />
                <div>
                  <div className="text-[48px] md:text-[56px] font-black leading-tight">32°C</div>
                  <div className="opacity-90 text-[14px] md:text-[15px] font-bold">Partly Cloudy • 65% Humidity</div>
                  <div className="opacity-90 text-[13px] md:text-[14px] mt-2 flex items-center gap-2 font-medium bg-black/10 px-3 py-1 rounded-lg w-fit"><Wind size={16}/> Wind: 12 km/h NE</div>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 text-[13px] md:text-[14px] font-medium leading-relaxed border border-white/20 backdrop-blur-sm flex items-start gap-3">
                <Sprout size={20} className="shrink-0 text-green-300 mt-0.5" />
                <div><strong className="font-extrabold text-white">Farming Advisory:</strong> Good day for irrigation. Heavy rain expected tomorrow — accelerate harvest if possible.</div>
              </div>
            </motion.div>
            
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 pt-1 px-1 -mx-1 snap-x">
              {WEATHER.map(w => (
                <div key={w.day} className="bg-white border border-[var(--card-border)] rounded-2xl p-4 text-center min-w-[100px] shrink-0 shadow-sm snap-start">
                  <div className="text-[12px] text-[var(--text-muted)] mb-3 font-bold uppercase tracking-wider">{w.day}</div>
                  <div className="flex justify-center mb-3">{w.icon}</div>
                  <div className="font-black text-[18px] text-[var(--text)]">{w.temp}</div>
                  <div className="text-[12px] text-[#2F80ED] font-bold mt-1 flex items-center justify-center gap-1"><Droplets size={12}/> {w.rain}</div>
                </div>
              ))}
            </motion.div>
          </section>

          {/* Crop Prices */}
          <section id="prices">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white rounded-3xl shadow-sm border border-[var(--card-border)] p-6 mb-6">
              <h2 className="text-[20px] font-extrabold flex items-center gap-2 text-[var(--text)]">
                <TrendingUp size={24} className="text-[#1A6B3A]" /> {t('cropPrices')} — MSP Rates
              </h2>
            </motion.div>
            
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white border border-[var(--card-border)] rounded-3xl overflow-hidden shadow-sm flex flex-col h-[calc(100%-90px)]">
              <div className="overflow-x-auto w-full flex-1">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr>
                      <th className="text-[12px] text-[var(--text-muted)] font-extrabold uppercase tracking-wider p-4 bg-[var(--bg2)] border-b border-[var(--card-border)]">Crop Item</th>
                      <th className="text-[12px] text-[var(--text-muted)] font-extrabold uppercase tracking-wider p-4 bg-[var(--bg2)] border-b border-[var(--card-border)]">MSP / Market Price</th>
                      <th className="text-[12px] text-[var(--text-muted)] font-extrabold uppercase tracking-wider p-4 bg-[var(--bg2)] border-b border-[var(--card-border)] text-right">Daily Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CROP_PRICES.map((c, i) => (
                      <tr key={c.crop} className={`hover:bg-gray-50 transition-colors ${i !== CROP_PRICES.length - 1 ? 'border-b border-[var(--card-border)]' : ''}`}>
                        <td className="font-bold text-[14px] p-4 text-[var(--text)] flex items-center gap-3"><Sprout size={18} className="text-green-600 opacity-50"/> {c.crop}</td>
                        <td className="font-black text-[15px] p-4 text-[var(--text)]">{c.price}</td>
                        <td className="p-4 text-right">
                          <span className={`inline-flex items-center gap-1 font-bold text-[13px] px-2.5 py-1 rounded-lg ${c.positive ? 'text-green-700 bg-green-50 border border-green-100' : 'text-red-700 bg-red-50 border border-red-100'}`}>
                            {c.positive ? <TrendingUp size={14}/> : <TrendingDown size={14}/>} {c.change}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-[var(--card-border)] text-[12px] text-[var(--text-muted)] font-bold bg-[var(--bg2)] flex items-center gap-2">
                <ShieldCheck size={16} /> Source: APMC Market Prices • Updated daily
              </div>
            </motion.div>
          </section>
        </div>

        {/* Government Schemes */}
        <section id="schemes" className="mb-12">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white rounded-3xl shadow-sm border border-[var(--card-border)] p-6 mb-6">
            <h2 className="text-[20px] md:text-[24px] font-extrabold flex items-center gap-3 text-[var(--text)]">
              <FileText size={24} className="text-[#E67E22]" /> {t('govSchemes')}
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SCHEMES.map((scheme, i) => (
              <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={i} key={scheme.name} className="bg-white border-2 border-[var(--card-border)] hover:border-[#E67E22] rounded-3xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
                <div className="flex gap-4 items-center">
                  <div className="w-14 h-14 rounded-2xl bg-orange-50 text-[#E67E22] flex items-center justify-center shrink-0 border border-orange-100 group-hover:scale-110 transition-transform">
                    {scheme.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="font-black text-[16px] md:text-[18px] leading-tight truncate text-[var(--text)] group-hover:text-[#E67E22] transition-colors">{scheme.name}</div>
                    <div className="text-[13px] font-extrabold text-[#27AE60] mt-1 bg-green-50 px-2.5 py-1 rounded-md w-fit border border-green-100">{scheme.amount}</div>
                  </div>
                </div>
                <p className="text-[13px] md:text-[14px] font-medium text-[var(--text-muted)] leading-relaxed flex-1">{scheme.desc}</p>
                <a href={scheme.link} target="_blank" rel="noopener noreferrer" className="no-underline w-full mt-2">
                  <button className="bg-white hover:bg-orange-50 text-[#E67E22] border-2 border-[#E67E22] w-full py-3 rounded-xl text-[13px] font-bold flex items-center justify-center gap-2 transition-colors">
                    Learn More <ExternalLink size={16} />
                  </button>
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Soil & Fertilizer Advisor */}
        <section className="bg-gradient-to-br from-[#1A6B3A] to-[#27AE60] rounded-3xl p-8 md:p-12 text-white shadow-xl overflow-hidden relative">
          <div className="absolute right-0 top-0 opacity-10 text-[200px] pointer-events-none translate-x-1/4 -translate-y-1/4">
            <Leaf size={300} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
            <div>
              <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mb-6 backdrop-blur-md">
                <Leaf size={40} className="text-white" />
              </div>
              <h2 className="text-[24px] md:text-[32px] font-black mb-4 leading-tight">Soil Health & Fertilizer Advisor</h2>
              <p className="opacity-90 leading-relaxed mb-8 text-[15px] md:text-[17px] font-medium max-w-[500px]">
                Get your soil tested at the nearest Krishi Vigyan Kendra (KVK) and receive personalized, scientific fertilizer recommendations to maximize yield.
              </p>
              <a href="https://soilhealth.dac.gov.in" target="_blank" rel="noopener noreferrer" className="inline-block w-full sm:w-auto">
                <button className="w-full sm:w-auto py-4 px-8 rounded-2xl bg-white text-[#1A6B3A] font-black text-[15px] hover:bg-gray-50 transition-colors shadow-lg hover:-translate-y-1">
                  Get Soil Health Card
                </button>
              </a>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Leaf size={24}/>, label: 'N-P-K Analysis', desc: 'Nitrogen, Phosphorus, Potassium' },
                { icon: <ShieldCheck size={24}/>, label: 'pH Level', desc: 'Soil acidity/alkalinity balance' },
                { icon: <Droplets size={24}/>, label: 'Moisture', desc: 'Water retention capacity' },
                { icon: <Sprout size={24}/>, label: 'Organic Matter', desc: 'Organic carbon content' },
              ].map(item => (
                <div key={item.label} className="p-5 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/15 transition-colors backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white mb-4">
                    {item.icon}
                  </div>
                  <div className="font-extrabold text-[14px] md:text-[15px] mb-1">{item.label}</div>
                  <div className="text-[12px] opacity-80 leading-relaxed font-medium">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
