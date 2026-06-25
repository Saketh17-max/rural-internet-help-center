'use client';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useDatabase } from '@/contexts/DatabaseContext';
import { Search, Star, MapPin, CheckCircle2, AlertTriangle, Briefcase, Phone, MessageCircle, User, Filter, Building } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const RECOMMENDED_WAGES: Record<string, number> = {
  'Carpenter': 800, 'Electrician': 900, 'Painter': 700, 'Plumber': 850,
  'Farm Labour': 500, 'Construction Worker': 600, 'Driver': 900, 'Mechanic': 850,
  'Tailor': 600, 'House Maid': 450, 'Tutor': 500, 'Cook': 600,
};

const SKILLS = ['All', 'Carpenter', 'Electrician', 'Painter', 'Plumber', 'Farm Labour', 'Construction Worker', 'Driver', 'Mechanic', 'Tailor', 'House Maid', 'Tutor', 'Cook'];

export default function MarketplacePage() {
  const { t } = useLanguage();
  const { workers } = useDatabase();
  const [search, setSearch] = useState('');
  const [skill, setSkill] = useState('All');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [selected, setSelected] = useState<any | null>(null);
  const [offerWage, setOfferWage] = useState('');
  const [showHireModal, setShowHireModal] = useState(false);

  const filtered = workers.filter(w => {
    const matchSearch = w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.skill.toLowerCase().includes(search.toLowerCase()) ||
      w.location.toLowerCase().includes(search.toLowerCase());
    const matchSkill = skill === 'All' || w.skill === skill;
    const matchAvail = !onlyAvailable || w.available;
    const matchVerified = !onlyVerified || w.verified;
    return matchSearch && matchSkill && matchAvail && matchVerified;
  });

  const wageWarning = selected && offerWage ? parseInt(offerWage) < (RECOMMENDED_WAGES[selected.skill] || 500) : false;

  const handleHire = () => {
    toast.success(`Job invitation sent to ${selected?.name}! 🎉`);
    setShowHireModal(false);
    setOfferWage('');
  };

  const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <div className="min-h-[90vh] bg-[var(--bg)] pb-12 relative">
      {/* Hero */}
      <div className="bg-[var(--primary)] pt-28 pb-16 px-4 md:px-6 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--secondary)] opacity-10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
        
        <div className="relative z-10 max-w-[1200px] mx-auto">
          <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/20 backdrop-blur-md">
            <Building size={40} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">{t('marketplaceTitle')}</h1>
          <p className="opacity-80 mb-8 max-w-[600px] mx-auto text-[15px] md:text-[17px] leading-relaxed font-medium">Connect directly with verified local workers. Negotiate fairly and hire efficiently for your next project.</p>

          <div className="max-w-[600px] mx-auto relative group">
            <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--primary)] transition-colors" />
            <input
              className="w-full py-4 md:py-5 pl-14 pr-6 rounded-2xl border-2 border-white/20 bg-white/95 text-gray-800 text-[15px] md:text-[16px] font-medium outline-none shadow-xl focus:bg-white focus:border-[var(--primary)] transition-all"
              placeholder="Search by name, skill, or location..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8 md:py-12 -mt-8 relative z-20">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-[var(--card-border)] mb-8 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="flex gap-2 overflow-x-auto w-full md:flex-1 hide-scrollbar">
            {SKILLS.map(s => (
              <button key={s} onClick={() => setSkill(s)}
                className={`px-5 py-2.5 rounded-xl text-[13px] font-bold cursor-pointer whitespace-nowrap transition-all border-2 shrink-0 ${skill === s ? 'border-[var(--primary)] bg-[var(--primary)] text-white shadow-md shadow-blue-900/10' : 'border-transparent bg-[var(--bg2)] text-[var(--text)] hover:bg-[var(--card-border)]'}`}
              >{s}</button>
            ))}
          </div>
          <div className="flex items-center gap-6 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 md:border-l border-[var(--card-border)] md:pl-6 w-full md:w-auto">
            <div className="flex items-center gap-2 text-[14px] font-bold text-[var(--text)]"><Filter size={18}/> Filters:</div>
            {[
              { key: 'available', label: 'Available', state: onlyAvailable, set: setOnlyAvailable },
              { key: 'verified', label: 'Verified', state: onlyVerified, set: setOnlyVerified },
            ].map(f => (
              <label key={f.key} className="flex items-center gap-2 cursor-pointer text-[13px] font-bold text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
                <input type="checkbox" checked={f.state} onChange={e => f.set(e.target.checked)}
                  className="accent-[var(--primary)] w-5 h-5 cursor-pointer rounded border-[var(--card-border)]" />
                {f.label}
              </label>
            ))}
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Workers', value: workers.length, color: '#0F4C81' },
            { label: 'Available Now', value: workers.filter(w => w.available).length, color: '#27AE60' },
            { label: 'Verified Profiles', value: workers.filter(w => w.verified).length, color: '#F39C12' },
            { label: 'Showing Results', value: filtered.length, color: '#2F80ED' },
          ].map(stat => (
            <div key={stat.label} className="py-4 px-5 rounded-2xl bg-white border border-[var(--card-border)] flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="font-black text-3xl leading-none" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-[12px] font-bold text-[var(--text-muted)] uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Workers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(worker => (
            <motion.div initial="hidden" animate="visible" variants={fadeUp} key={worker.id}
              onClick={() => setSelected(worker)}
              className={`bg-white rounded-3xl p-6 cursor-pointer transition-all shadow-sm hover:shadow-lg hover:-translate-y-1 border-2 ${selected?.id === worker.id ? 'border-[var(--primary)]' : 'border-[var(--card-border)]'}`}
            >
              {/* Header */}
              <div className="flex gap-4 mb-5">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border-2" style={{ background: `${worker.avatar_color || '#0F4C81'}15`, borderColor: `${worker.avatar_color || '#0F4C81'}30`, color: worker.avatar_color || '#0F4C81' }}>
                  {worker.photo ? <img src={worker.photo} alt={worker.name} className="w-full h-full object-cover rounded-xl" /> : <User size={28} />}
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-extrabold text-[16px] text-[var(--text)] truncate">{worker.name}</span>
                    {worker.verified && <CheckCircle2 size={16} className="text-[#27AE60] shrink-0" />}
                  </div>
                  <div className="text-[13px] font-bold text-[var(--text-muted)] mb-1.5 truncate">{worker.skill || 'Worker'}</div>
                  <div className="flex items-center gap-1.5 text-[12px] font-medium text-[var(--text-muted)] truncate">
                    <MapPin size={12} className="shrink-0" /> <span className="truncate">{worker.location || 'Not Specified'}</span>
                  </div>
                </div>
              </div>

              {/* Rating & Wage */}
              <div className="flex justify-between items-end mb-5 pt-5 border-t border-[var(--card-border)]">
                <div>
                  {worker.reviews > 0 ? (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <Star size={16} className="fill-current text-[#F39C12]" />
                      <span className="text-[14px] font-black text-[var(--text)]">{worker.rating}</span>
                      <span className="text-[12px] font-medium text-[var(--text-muted)]">({worker.reviews})</span>
                    </div>
                  ) : (
                    <span className="text-[12px] font-medium text-[var(--text-muted)]">No ratings yet</span>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[18px] font-black text-[var(--primary)] mb-0.5">{worker.wage ? `₹${worker.wage}` : 'Negotiable'}<span className="text-[12px] text-[var(--text-muted)] font-medium">/day</span></div>
                  <div className="inline-flex px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider" style={{ background: worker.available ? '#E8F5E9' : '#FFEBEE', color: worker.available ? '#2E7D32' : '#C62828' }}>
                    {worker.available ? 'Available' : 'Busy'}
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="flex gap-2 flex-wrap">
                {(worker.skills || []).slice(0, 3).map((s: string) => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-[var(--bg2)] text-[var(--text)] text-[11px] font-bold border border-[var(--card-border)]">{s}</span>
                ))}
                {(worker.skills?.length > 3) && <span className="px-2.5 py-1 rounded-lg bg-[var(--bg2)] text-[var(--text-muted)] text-[11px] font-bold border border-[var(--card-border)]">+{worker.skills.length - 3}</span>}
              </div>
            </motion.div>
          ))}
        </div>

        {workers.length === 0 ? (
          <div className="text-center p-12 md:p-20 bg-white rounded-3xl border border-[var(--card-border)] mt-8 shadow-sm">
            <div className="w-24 h-24 bg-[var(--bg2)] rounded-full flex items-center justify-center mx-auto mb-6">
              <User size={40} className="text-[var(--text-muted)]" />
            </div>
            <h3 className="text-2xl font-black text-[var(--text)] mb-3">No workers registered yet</h3>
            <p className="text-[15px] text-[var(--text-muted)] mb-8 max-w-[400px] mx-auto">Be the first to register a worker profile and start connecting with local employers.</p>
            <a href="/register?role=worker" className="no-underline inline-block">
              <button className="bg-[var(--primary)] hover:bg-[var(--primary-light)] text-white border-none py-4 px-8 rounded-xl font-bold text-[15px] flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-900/20 transition-all">
                <User size={20} /> Register Worker
              </button>
            </a>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center p-20 text-[var(--text-muted)] font-bold text-[16px] bg-white rounded-3xl border border-[var(--card-border)] mt-8 shadow-sm">
            No workers found matching your criteria. Try adjusting your filters.
          </div>
        ) : null}
      </div>

      {/* Worker Detail Side Panel */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-[799] backdrop-blur-sm" onClick={() => setSelected(null)} />
            
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed right-0 top-0 bottom-0 w-full md:w-[460px] max-w-[100vw] bg-white border-l border-[var(--card-border)] overflow-y-auto p-6 md:p-8 z-[800] shadow-2xl">
              <button onClick={() => setSelected(null)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[var(--bg2)] flex items-center justify-center border-none cursor-pointer text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--card-border)] transition-colors z-10"><Filter size={18} className="rotate-45" /></button>

              <div className="text-center mb-8 pt-8">
                <div className="w-28 h-28 rounded-3xl flex items-center justify-center mx-auto mb-5 border-2" style={{ background: `${selected.avatar_color || '#0F4C81'}15`, borderColor: `${selected.avatar_color || '#0F4C81'}30`, color: selected.avatar_color || '#0F4C81' }}>
                  {selected.photo ? <img src={selected.photo} alt={selected.name} className="w-full h-full object-cover rounded-2xl" /> : <User size={48} />}
                </div>
                <div className="font-black text-2xl text-[var(--text)] mb-2">{selected.name}</div>
                <div className="text-[14px] text-[var(--text-muted)] mb-4 font-bold flex items-center justify-center gap-2"><Briefcase size={16}/> {selected.skill} • <MapPin size={16}/> {selected.location}</div>
                <div className="flex justify-center gap-3">
                  {selected.verified && <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50 text-green-600 text-[12px] font-bold uppercase tracking-wider"><CheckCircle2 size={14}/> Verified</span>}
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-[12px] font-bold uppercase tracking-wider ${selected.available ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {selected.available ? 'Available' : 'Busy'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { label: 'Rating', value: selected.reviews > 0 ? selected.rating : '—', icon: <Star size={16} className="text-[#F39C12]"/> },
                  { label: 'Reviews', value: selected.reviews || 0, icon: <MessageCircle size={16} className="text-[var(--primary)]"/> },
                  { label: 'Experience', value: selected.experience ? selected.experience.split(' ')[0] + 'y' : '0y', icon: <Briefcase size={16} className="text-[var(--secondary)]"/> },
                ].map(s => (
                  <div key={s.label} className="text-center p-4 rounded-2xl bg-[var(--bg2)] border border-[var(--card-border)] flex flex-col items-center">
                    <div className="mb-2">{s.icon}</div>
                    <div className="font-black text-[18px] text-[var(--text)] mb-1">{s.value}</div>
                    <div className="text-[11px] text-[var(--text-muted)] font-bold uppercase tracking-widest">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <div className="font-extrabold mb-3 text-[15px] text-[var(--text)]">Skills & Expertise</div>
                <div className="flex gap-2 flex-wrap">
                  {(selected.skills || []).map((s: string) => <span key={s} className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 text-[12px] font-bold border border-blue-100">{s}</span>)}
                </div>
              </div>

              <div className="mb-8">
                <div className="font-extrabold mb-3 text-[15px] text-[var(--text)]">Languages</div>
                <div className="flex gap-2 flex-wrap">
                  {(selected.languages || []).map((l: string) => <span key={l} className="px-3 py-1.5 rounded-xl bg-green-50 text-green-700 text-[12px] font-bold border border-green-100">{l}</span>)}
                </div>
              </div>

              <div className="bg-white border-2 border-[var(--card-border)] rounded-2xl p-5 mb-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--primary)] opacity-5 rounded-bl-full" />
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[13px] text-[var(--text-muted)] font-bold uppercase tracking-wider">Expected Wage</span>
                  <span className="font-black text-[22px] text-[var(--primary)]">₹{selected.wage}<span className="text-[14px] text-[var(--text-muted)] font-medium">/day</span></span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-[var(--text-muted)] font-bold uppercase tracking-wider">Recommended Rate</span>
                  <span className="font-bold text-[15px] text-[#27ae60]">₹{RECOMMENDED_WAGES[selected.skill] || '—'}</span>
                </div>
                {selected.wage < (RECOMMENDED_WAGES[selected.skill] || 9999) && (
                  <div className="mt-4 p-3 rounded-xl bg-green-50 border border-green-100 text-[12px] text-green-700 font-bold leading-relaxed flex items-center gap-2">
                    <CheckCircle2 size={16} className="shrink-0" /> Worker is offering below recommended rate — room to negotiate fairly!
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3 pb-8">
                <button className="bg-[var(--primary)] hover:bg-[var(--primary-light)] text-white border-none w-full py-4 rounded-xl text-[15px] font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => setShowHireModal(true)} disabled={!selected.available}>
                  <Briefcase size={20} /> {selected.available ? t('hireWorker') : 'Worker is Busy'}
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-white hover:bg-[var(--bg2)] text-[var(--text)] border-2 border-[var(--card-border)] py-3.5 rounded-xl text-[14px] font-bold flex items-center justify-center gap-2 transition-colors"
                    onClick={() => toast.success(`Chat opened with ${selected.name}`)}>
                    <MessageCircle size={18} /> Chat
                  </button>
                  <button className="bg-white hover:bg-[var(--bg2)] text-[var(--text)] border-2 border-[var(--card-border)] py-3.5 rounded-xl text-[14px] font-bold flex items-center justify-center gap-2 transition-colors"
                    onClick={() => toast.success(`Calling ${selected.phone}`)}>
                    <Phone size={18} /> Call
                  </button>
                </div>
                <button onClick={() => toast.success('Worker reported. We will review.')}
                  className="bg-transparent border-none text-red-500 text-[12px] font-bold cursor-pointer p-3 mt-2 hover:underline text-center active:scale-95 transition-transform flex items-center justify-center gap-1.5">
                  <AlertTriangle size={14} /> Report this profile
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hire Modal */}
      <AnimatePresence>
        {showHireModal && selected && (
          <div className="fixed inset-0 z-[900] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowHireModal(false)} />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white w-full max-w-[440px] p-6 md:p-8 rounded-3xl shadow-2xl relative z-10" onClick={e => e.stopPropagation()}>
              <h2 className="font-black mb-2 text-2xl text-[var(--text)]">Hire {selected.name}</h2>
              <p className="text-[var(--text-muted)] text-[14px] mb-6 font-medium">Send a job invitation with your offer details.</p>

              <div className="mb-5">
                <label className="text-[13px] font-bold block mb-2 text-[var(--text)]">Offered Daily Wage (₹)</label>
                <input className="w-full px-4 py-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg)] text-[15px] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all font-medium" type="number" placeholder={`Recommended: ₹${RECOMMENDED_WAGES[selected.skill]}`}
                  value={offerWage} onChange={e => setOfferWage(e.target.value)} />
                {wageWarning && (
                  <div className="mt-2.5 p-3 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 text-[12px] font-bold flex items-center gap-2">
                    <AlertTriangle size={16} className="shrink-0" />
                    {t('belowWage')}
                  </div>
                )}
                {offerWage && !wageWarning && (
                  <div className="mt-2 text-[12px] font-bold text-green-600 flex items-center gap-1.5"><CheckCircle2 size={14}/> {t('fairWage')}</div>
                )}
              </div>

              <div className="mb-8">
                <label className="text-[13px] font-bold block mb-2 text-[var(--text)]">Work Description</label>
                <textarea className="w-full px-4 py-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg)] text-[15px] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all font-medium resize-y min-h-[100px]" placeholder="Describe the work, duration, location..." />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="bg-white hover:bg-[var(--bg2)] text-[var(--text)] border-2 border-[var(--card-border)] py-4 rounded-xl text-[14px] font-bold flex items-center justify-center transition-colors" onClick={() => setShowHireModal(false)}>Cancel</button>
                <button className="bg-[var(--primary)] hover:bg-[var(--primary-light)] text-white border-none py-4 rounded-xl text-[14px] font-bold flex items-center justify-center shadow-lg shadow-blue-900/20 transition-all" onClick={handleHire}>
                  Send Invite
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
