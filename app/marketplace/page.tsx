'use client';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useDatabase } from '@/contexts/DatabaseContext';
import { Search, Star, MapPin, CheckCircle, AlertTriangle, Briefcase, Phone, MessageCircle, User } from 'lucide-react';
import toast from 'react-hot-toast';

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

  return (
    <div className="min-h-[90vh] bg-[var(--bg)] pb-12">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1b4f72] to-[#0a2744] pt-24 pb-12 px-4 md:px-6 text-white text-center">
        <div className="text-4xl md:text-5xl mb-3 md:mb-4">💼</div>
        <h1 className="text-2xl md:text-[clamp(1.8rem,4vw,2.4rem)] font-black mb-3">{t('marketplaceTitle')}</h1>
        <p className="opacity-80 mb-6 md:mb-8 max-w-[520px] mx-auto text-sm md:text-base leading-relaxed">{t('marketplaceDesc')}</p>

        <div className="max-w-[480px] mx-auto relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="w-full py-3.5 md:py-4 pl-12 pr-4 rounded-full border-none bg-[rgba(255,255,255,0.95)] text-gray-800 text-sm md:text-[15px] font-[inherit] outline-none shadow-lg focus:shadow-xl transition-shadow"
            placeholder="Search by name, skill, or location..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="page-container px-4 md:px-6 py-6 md:py-8">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center mb-6">
          <div className="flex gap-2 overflow-x-auto w-full md:flex-1 hide-scrollbar pb-2 md:pb-0">
            {SKILLS.map(s => (
              <button key={s} onClick={() => setSkill(s)}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[11px] md:text-xs font-bold cursor-pointer whitespace-nowrap transition-all border ${skill === s ? 'border-transparent bg-[var(--secondary)] text-white shadow-md' : 'border-[var(--card-border)] bg-transparent text-[var(--text)] hover:bg-[var(--bg2)]'}`}
              >{s}</button>
            ))}
          </div>
          <div className="flex gap-4 shrink-0 px-1 md:px-0">
            {[
              { key: 'available', label: '✅ Available', state: onlyAvailable, set: setOnlyAvailable },
              { key: 'verified', label: '🔒 Verified', state: onlyVerified, set: setOnlyVerified },
            ].map(f => (
              <label key={f.key} className="flex items-center gap-2 cursor-pointer text-xs md:text-[13px] font-semibold">
                <input type="checkbox" checked={f.state} onChange={e => f.set(e.target.checked)}
                  className="accent-[var(--primary)] w-4 h-4 cursor-pointer" />
                {f.label}
              </label>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:flex md:flex-row gap-3 md:gap-4 mb-6">
          {[
            { label: 'Total Workers', value: workers.length, color: '#1b4f72' },
            { label: 'Available Now', value: workers.filter(w => w.available).length, color: '#27ae60' },
            { label: 'Verified', value: workers.filter(w => w.verified).length, color: '#e67e22' },
            { label: 'Showing', value: filtered.length, color: 'var(--primary)' },
          ].map(stat => (
            <div key={stat.label} className="py-2.5 px-3 md:px-4 rounded-xl bg-[var(--card)] border border-[var(--card-border)] flex items-center gap-2.5 text-center justify-center md:justify-start flex-col sm:flex-row">
              <span className="font-black text-xl md:text-2xl leading-none" style={{ color: stat.color }}>{stat.value}</span>
              <span className="text-[10px] md:text-xs font-semibold text-[var(--text-muted)] leading-tight">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Workers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filtered.map(worker => (
            <div key={worker.id}
              onClick={() => setSelected(worker)}
              className={`bg-[var(--card)] rounded-2xl p-4 md:p-5 cursor-pointer transition-all shadow-[var(--shadow)] hover:-translate-y-1 active:scale-[0.98] border-2 ${selected?.id === worker.id ? 'border-[var(--primary)]' : 'border-[var(--card-border)] hover:border-[rgba(0,0,0,0.1)] dark:hover:border-[rgba(255,255,255,0.1)]'}`}
            >
              {/* Header */}
              <div className="flex gap-3 md:gap-4 mb-3.5 md:mb-4">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-2xl md:text-3xl shrink-0" style={{ background: `${worker.avatar_color || '#1a6b3a'}20`, border: `2px solid ${worker.avatar_color || '#1a6b3a'}40` }}>
                  {worker.photo || <User size={24} style={{ color: worker.avatar_color || '#1a6b3a' }} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold text-sm md:text-[15px] truncate">{worker.name}</span>
                    {worker.verified && <span title="Verified" className="text-[#27ae60] text-sm shrink-0">✓</span>}
                  </div>
                  <div className="text-[11px] md:text-xs text-[var(--text-muted)] mt-0.5 truncate">{worker.skill || 'Worker'}</div>
                  <div className="flex items-center gap-1 text-[11px] md:text-xs text-[var(--text-muted)] mt-1 truncate">
                    <MapPin size={10} className="shrink-0" /> <span className="truncate">{worker.location || 'Not Specified'}</span>
                  </div>
                </div>
                <div className="px-2 py-1 rounded-full text-[9px] md:text-[10px] font-bold h-fit shrink-0 whitespace-nowrap" style={{ background: worker.available ? 'rgba(39,174,96,0.15)' : 'rgba(231,76,60,0.15)', color: worker.available ? '#27ae60' : '#e74c3c' }}>
                  {worker.available ? '● Available' : '○ Busy'}
                </div>
              </div>

              {/* Rating & Wage */}
              <div className="flex justify-between items-end mb-3 md:mb-4 pt-3 border-t border-[var(--card-border)]">
                <div>
                  {worker.reviews > 0 ? (
                    <div className="flex items-center gap-1 flex-wrap">
                      <span className="stars text-xs md:text-sm">{'★'.repeat(Math.floor(worker.rating))}</span>
                      <span className="text-[11px] md:text-xs font-bold">{worker.rating}</span>
                      <span className="text-[10px] md:text-[11px] text-[var(--text-muted)]">({worker.reviews})</span>
                    </div>
                  ) : (
                    <span className="text-[11px] md:text-xs text-[var(--text-muted)]">No ratings yet</span>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[14px] md:text-[16px] font-black text-[var(--primary)]">{worker.wage ? `₹${worker.wage}/day` : 'Negotiable'}</div>
                  <div className="text-[9px] md:text-[10px] font-semibold text-[var(--text-muted)] mt-0.5">{worker.experience || 'New Profile'}</div>
                </div>
              </div>

              {/* Skills */}
              <div className="flex gap-1.5 flex-wrap">
                {(worker.skills || []).slice(0, 3).map((s: string) => (
                  <span key={s} className="badge badge-info text-[9px] md:text-[10px] px-2 py-0.5">{s}</span>
                ))}
                {(worker.skills?.length > 3) && <span className="badge badge-info text-[9px] md:text-[10px] px-2 py-0.5 opacity-70">+{worker.skills.length - 3}</span>}
              </div>
            </div>
          ))}
        </div>

        {workers.length === 0 ? (
          <div className="text-center p-8 md:p-16 bg-[var(--card)] rounded-2xl border border-[var(--card-border)] mt-10">
            <div className="text-4xl md:text-5xl mb-4">👷‍♀️</div>
            <h3 className="text-lg md:text-xl font-extrabold mb-2">No workers have registered yet</h3>
            <p className="text-sm text-[var(--text-muted)] mb-6">Register the first worker to begin using the marketplace.</p>
            <a href="/register?role=worker" className="no-underline">
              <button className="btn-primary mx-auto justify-center min-w-[200px] min-h-[48px]">
                <User size={18} /> Register Worker
              </button>
            </a>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center p-16 text-[var(--text-muted)] font-medium">
            No workers found. Try different filters.
          </div>
        ) : null}
      </div>

      {/* Worker Detail Side Panel */}
      {selected && (
        <>
          {/* Backdrop for mobile */}
          <div className="fixed inset-0 bg-black/40 z-[799] lg:hidden backdrop-blur-sm" onClick={() => setSelected(null)} />
          
          <div className="fixed right-0 top-0 bottom-0 w-full md:w-[420px] max-w-[100vw] bg-[var(--card)] border-l border-[var(--card-border)] overflow-y-auto p-5 md:p-8 z-[800] shadow-[-8px_0_32px_rgba(0,0,0,0.12)] transform transition-transform duration-300">
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-[var(--bg2)] flex items-center justify-center border-none cursor-pointer text-[var(--text-muted)] text-xl hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)] transition-colors active:scale-95 z-10">✕</button>

            {/* Profile */}
            <div className="text-center mb-6 pt-4 md:pt-6">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-4xl md:text-5xl mx-auto mb-3 md:mb-4" style={{ background: `${selected.avatar_color}20`, border: `3px solid ${selected.avatar_color}50` }}>
                {selected.photo || <User size={40} style={{ color: selected.avatar_color || '#1a6b3a' }} />}
              </div>
              <div className="font-black text-xl md:text-2xl mb-1">{selected.name}</div>
              <div className="text-xs md:text-sm text-[var(--text-muted)] mb-3 font-medium">{selected.skill} • {selected.location}</div>
              <div className="flex justify-center gap-2">
                {selected.verified && <span className="badge badge-verified text-[10px] md:text-xs">✓ Verified</span>}
                <span className={`badge text-[10px] md:text-xs ${selected.available ? 'badge-success' : 'badge-danger'}`}>
                  {selected.available ? '● Available' : '○ Busy'}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 md:gap-3 mb-6">
              {[
                { label: 'Rating', value: selected.reviews > 0 ? selected.rating : '—' },
                { label: 'Reviews', value: selected.reviews || 0 },
                { label: 'Experience', value: selected.experience ? selected.experience.split(' ')[0] + 'y' : '0y' },
              ].map(s => (
                <div key={s.label} className="text-center p-2.5 md:p-3 rounded-xl bg-[var(--bg2)] border border-[var(--card-border)]">
                  <div className="font-black text-[16px] md:text-[18px] text-[var(--primary)]">{s.value}</div>
                  <div className="text-[10px] md:text-[11px] text-[var(--text-muted)] font-semibold mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="mb-5 md:mb-6">
              <div className="font-bold mb-2.5 text-[13px] md:text-[14px]">Skills</div>
              <div className="flex gap-2 flex-wrap">
                {(selected.skills || []).map((s: string) => <span key={s} className="badge badge-info text-[11px] md:text-xs">{s}</span>)}
              </div>
            </div>

            {/* Languages */}
            <div className="mb-5 md:mb-6">
              <div className="font-bold mb-2.5 text-[13px] md:text-[14px]">Languages</div>
              <div className="flex gap-2 flex-wrap">
                {(selected.languages || []).map((l: string) => <span key={l} className="badge badge-success text-[11px] md:text-xs">{l}</span>)}
              </div>
            </div>

            {/* Wage */}
            <div className="bg-[var(--bg2)] border border-[var(--card-border)] rounded-xl p-4 md:p-5 mb-6">
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-[12px] md:text-[13px] text-[var(--text-muted)] font-semibold">Expected Daily Wage</span>
                <span className="font-black text-[16px] md:text-[18px] text-[var(--primary)]">₹{selected.wage}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[12px] md:text-[13px] text-[var(--text-muted)] font-semibold">Recommended Rate</span>
                <span className="font-bold text-[14px] md:text-[16px] text-[#27ae60]">₹{RECOMMENDED_WAGES[selected.skill] || '—'}</span>
              </div>
              {selected.wage < (RECOMMENDED_WAGES[selected.skill] || 9999) && (
                <div className="mt-3.5 p-2.5 rounded-lg bg-[rgba(39,174,96,0.1)] border border-[rgba(39,174,96,0.3)] text-[11px] md:text-[12px] text-[#27ae60] font-medium leading-tight">
                  ✅ Worker is offering below recommended rate — room to negotiate fairly!
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2.5 md:gap-3 pb-8">
              <button className="btn-primary justify-center min-h-[48px] md:min-h-[52px] text-[14px] md:text-[15px]"
                onClick={() => setShowHireModal(true)} disabled={!selected.available}>
                <Briefcase size={18} /> {selected.available ? t('hireWorker') : 'Worker is Busy'}
              </button>
              <div className="grid grid-cols-2 gap-2.5 md:gap-3">
                <button className="btn-outline justify-center text-[13px] md:text-[14px] min-h-[44px] md:min-h-[48px]"
                  onClick={() => toast.success(`Chat opened with ${selected.name}`)}>
                  <MessageCircle size={16} /> Chat
                </button>
                <button className="btn-outline justify-center text-[13px] md:text-[14px] min-h-[44px] md:min-h-[48px]"
                  onClick={() => toast.success(`Calling ${selected.phone}`)}>
                  <Phone size={16} /> Call
                </button>
              </div>
              <button onClick={() => toast.success('Worker reported. We will review.')}
                className="bg-transparent border-none text-[#e74c3c] text-[11px] md:text-[12px] font-semibold cursor-pointer p-2 md:p-3 mt-1 hover:underline text-center active:scale-95 transition-transform">
                🚨 Report this profile
              </button>
            </div>
          </div>
        </>
      )}

      {/* Hire Modal */}
      {showHireModal && selected && (
        <div className="modal-overlay px-4" onClick={() => setShowHireModal(false)}>
          <div className="modal-box w-full max-w-[400px] p-5 md:p-6" onClick={e => e.stopPropagation()}>
            <h2 className="font-black mb-1 md:mb-2 text-lg md:text-xl">Hire {selected.name}</h2>
            <p className="text-[var(--text-muted)] text-[13px] md:text-[14px] mb-5 md:mb-6">Send a job invitation with details</p>

            <div className="mb-4 md:mb-5">
              <label className="text-[12px] md:text-[13px] font-bold block mb-1.5 md:mb-2">Offered Daily Wage (₹)</label>
              <input className="input-field py-2.5 md:py-3 text-sm" type="number" placeholder={`Recommended: ₹${RECOMMENDED_WAGES[selected.skill]}`}
                value={offerWage} onChange={e => setOfferWage(e.target.value)} />
              {wageWarning && (
                <div className="mt-2 p-2.5 rounded-lg bg-[rgba(243,156,18,0.15)] border border-[rgba(243,156,18,0.4)] text-[#e67e22] text-[11px] md:text-[12px] flex items-start gap-1.5 leading-tight">
                  <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                  {t('belowWage')}
                </div>
              )}
              {offerWage && !wageWarning && (
                <div className="mt-2 text-[11px] md:text-[12px] font-semibold text-[#27ae60]">{t('fairWage')}</div>
              )}
            </div>

            <div className="mb-5 md:mb-6">
              <label className="text-[12px] md:text-[13px] font-bold block mb-1.5 md:mb-2">Work Description</label>
              <textarea className="input-field py-2.5 md:py-3 text-sm resize-y min-h-[80px]" rows={3} placeholder="Describe the work, duration, location..." />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="btn-outline justify-center min-h-[44px] md:min-h-[48px] text-[13px] md:text-[14px]" onClick={() => setShowHireModal(false)}>Cancel</button>
              <button className="btn-primary justify-center min-h-[44px] md:min-h-[48px] text-[13px] md:text-[14px]" onClick={handleHire}>
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
