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
    <div style={{ minHeight: '90vh', background: 'var(--bg)' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1b4f72, #0a2744)', padding: '50px 24px', color: 'white', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>💼</div>
        <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.4rem)', fontWeight: 900, marginBottom: 10 }}>{t('marketplaceTitle')}</h1>
        <p style={{ opacity: 0.8, marginBottom: 28, maxWidth: 520, margin: '0 auto 28px' }}>{t('marketplaceDesc')}</p>

        <div style={{ maxWidth: 480, margin: '0 auto', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          <input
            style={{ width: '100%', padding: '14px 16px 14px 44px', borderRadius: '50px', border: 'none', background: 'rgba(255,255,255,0.95)', fontSize: 15, fontFamily: 'inherit', outline: 'none' }}
            placeholder="Search by name, skill, or location..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="page-container" style={{ padding: '28px 20px' }}>
        {/* Filters */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', flex: 1 }}>
            {SKILLS.map(s => (
              <button key={s} onClick={() => setSkill(s)}
                style={{
                  padding: '6px 14px', borderRadius: '50px', fontSize: 12, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
                  border: skill === s ? 'none' : '1.5px solid var(--card-border)',
                  background: skill === s ? 'var(--secondary)' : 'transparent',
                  color: skill === s ? 'white' : 'var(--text)',
                  transition: 'all 0.2s',
                }}
              >{s}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
            {[
              { key: 'available', label: '✅ Available', state: onlyAvailable, set: setOnlyAvailable },
              { key: 'verified', label: '🔒 Verified', state: onlyVerified, set: setOnlyVerified },
            ].map(f => (
              <label key={f.key} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 13 }}>
                <input type="checkbox" checked={f.state} onChange={e => f.set(e.target.checked)}
                  style={{ accentColor: 'var(--primary)' }} />
                {f.label}
              </label>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
          {[
            { label: 'Total Workers', value: workers.length, color: '#1b4f72' },
            { label: 'Available Now', value: workers.filter(w => w.available).length, color: '#27ae60' },
            { label: 'Verified', value: workers.filter(w => w.verified).length, color: '#e67e22' },
            { label: 'Showing', value: filtered.length, color: 'var(--primary)' },
          ].map(stat => (
            <div key={stat.label} style={{ padding: '10px 16px', borderRadius: 10, background: 'var(--card)', border: '1px solid var(--card-border)', display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontWeight: 800, fontSize: 18, color: stat.color }}>{stat.value}</span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Workers Grid */}
        <div className="grid-3">
          {filtered.map(worker => (
            <div key={worker.id}
              onClick={() => setSelected(worker)}
              style={{
                background: 'var(--card)', border: selected?.id === worker.id ? '2px solid var(--primary)' : '1.5px solid var(--card-border)',
                borderRadius: 16, padding: '20px', cursor: 'pointer', transition: 'all 0.2s', boxShadow: 'var(--shadow)',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)')}
              onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.transform = 'none')}
            >
              {/* Header */}
              <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: `${worker.avatar_color || '#1a6b3a'}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0, border: `2px solid ${worker.avatar_color || '#1a6b3a'}40` }}>
                  {worker.photo || <User size={24} style={{ color: worker.avatar_color || '#1a6b3a' }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontWeight: 700, fontSize: 15 }}>{worker.name}</span>
                    {worker.verified && <span title="Verified" style={{ color: '#27ae60', fontSize: 14 }}>✓</span>}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{worker.skill || 'Worker'}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-muted)' }}>
                    <MapPin size={10} /> {worker.location || 'Not Specified'}
                  </div>
                </div>
                <div style={{
                  padding: '4px 8px', borderRadius: 20, fontSize: 10, fontWeight: 700, height: 'fit-content',
                  background: worker.available ? 'rgba(39,174,96,0.15)' : 'rgba(231,76,60,0.15)',
                  color: worker.available ? '#27ae60' : '#e74c3c',
                }}>
                  {worker.available ? '● Available' : '○ Busy'}
                </div>
              </div>

              {/* Rating & Wage */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <div>
                  {worker.reviews > 0 ? (
                    <>
                      <span className="stars">{'★'.repeat(Math.floor(worker.rating))}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, marginLeft: 4 }}>{worker.rating}</span>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>({worker.reviews})</span>
                    </>
                  ) : (
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>No ratings yet</span>
                  )}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--primary)' }}>{worker.wage ? `₹${worker.wage}/day` : 'Rate Negotiable'}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{worker.experience || 'New Profile'}</div>
                </div>
              </div>

              {/* Skills */}
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                {(worker.skills || []).map((s: string) => (
                  <span key={s} className="badge badge-info" style={{ fontSize: 10 }}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {workers.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--card)', borderRadius: 16, border: '1px solid var(--card-border)', marginTop: 40 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>👷‍♀️</div>
            <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>No workers have registered yet</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>Register the first worker to begin using the marketplace.</p>
            <a href="/register?role=worker" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ margin: '0 auto' }}>
                <User size={16} /> Register Worker
              </button>
            </a>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>
            No workers found. Try different filters.
          </div>
        ) : null}
      </div>

      {/* Worker Detail Side Panel */}
      {selected && (
        <div style={{
          position: 'fixed', right: 0, top: 0, bottom: 0, width: 380, maxWidth: '100vw',
          background: 'var(--card)', borderLeft: '1px solid var(--card-border)',
          overflowY: 'auto', padding: '24px', zIndex: 800, boxShadow: '-8px 0 32px rgba(0,0,0,0.12)',
        }}>
          <button onClick={() => setSelected(null)} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 20 }}>✕</button>

          {/* Profile */}
          <div style={{ textAlign: 'center', marginBottom: 24, paddingTop: 20 }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: `${selected.avatar_color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, margin: '0 auto 12px', border: `3px solid ${selected.avatar_color}50` }}>
              {selected.photo}
            </div>
            <div style={{ fontWeight: 800, fontSize: 20 }}>{selected.name}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 8 }}>{selected.skill} • {selected.location}</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
              {selected.verified && <span className="badge badge-verified">✓ Verified</span>}
              <span className={`badge ${selected.available ? 'badge-success' : 'badge-danger'}`}>
                {selected.available ? '● Available' : '○ Busy'}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
            {[
              { label: 'Rating', value: selected.reviews > 0 ? selected.rating : '—' },
              { label: 'Reviews', value: selected.reviews || 0 },
              { label: 'Experience', value: selected.experience ? selected.experience.split(' ')[0] + 'y' : '0y' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center', padding: '12px', borderRadius: 10, background: 'var(--bg2)' }}>
                <div style={{ fontWeight: 800, fontSize: 18, color: 'var(--primary)' }}>{s.value}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontWeight: 700, marginBottom: 10, fontSize: 14 }}>Skills</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {(selected.skills || []).map((s: string) => <span key={s} className="badge badge-info">{s}</span>)}
            </div>
          </div>

          {/* Languages */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontWeight: 700, marginBottom: 10, fontSize: 14 }}>Languages</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {(selected.languages || []).map((l: string) => <span key={l} className="badge badge-success">{l}</span>)}
            </div>
          </div>

          {/* Wage */}
          <div style={{ background: 'var(--bg2)', borderRadius: 12, padding: '16px', marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Expected Daily Wage</span>
              <span style={{ fontWeight: 800, fontSize: 18, color: 'var(--primary)' }}>₹{selected.wage}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Recommended Rate</span>
              <span style={{ fontWeight: 700, fontSize: 16, color: '#27ae60' }}>₹{RECOMMENDED_WAGES[selected.skill] || '—'}</span>
            </div>
            {selected.wage < (RECOMMENDED_WAGES[selected.skill] || 9999) && (
              <div style={{ marginTop: 10, padding: '8px 12px', borderRadius: 8, background: 'rgba(39,174,96,0.1)', border: '1px solid rgba(39,174,96,0.3)', fontSize: 12, color: '#27ae60' }}>
                ✅ Worker is offering below recommended rate — room to negotiate fairly!
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button className="btn-primary" style={{ justifyContent: 'center' }}
              onClick={() => setShowHireModal(true)} disabled={!selected.available}>
              <Briefcase size={16} /> {selected.available ? t('hireWorker') : 'Worker is Busy'}
            </button>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <button className="btn-outline" style={{ justifyContent: 'center', fontSize: 13 }}
                onClick={() => toast.success(`Chat opened with ${selected.name}`)}>
                <MessageCircle size={14} /> Chat
              </button>
              <button className="btn-outline" style={{ justifyContent: 'center', fontSize: 13 }}
                onClick={() => toast.success(`Calling ${selected.phone}`)}>
                <Phone size={14} /> Call
              </button>
            </div>
            <button onClick={() => toast.success('Worker reported. We will review.')}
              style={{ background: 'none', border: 'none', color: '#e74c3c', fontSize: 12, cursor: 'pointer', padding: 8 }}>
              🚨 Report this profile
            </button>
          </div>
        </div>
      )}

      {/* Hire Modal */}
      {showHireModal && selected && (
        <div className="modal-overlay" onClick={() => setShowHireModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h2 style={{ fontWeight: 800, marginBottom: 6 }}>Hire {selected.name}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 20 }}>Send a job invitation with details</p>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Offered Daily Wage (₹)</label>
              <input className="input-field" type="number" placeholder={`Recommended: ₹${RECOMMENDED_WAGES[selected.skill]}`}
                value={offerWage} onChange={e => setOfferWage(e.target.value)} />
              {wageWarning && (
                <div style={{ marginTop: 8, padding: '8px 12px', borderRadius: 8, background: 'rgba(243,156,18,0.15)', border: '1px solid rgba(243,156,18,0.4)', color: '#e67e22', fontSize: 12, display: 'flex', gap: 6 }}>
                  <AlertTriangle size={14} style={{ flexShrink: 0, marginTop: 1 }} />
                  {t('belowWage')}
                </div>
              )}
              {offerWage && !wageWarning && (
                <div style={{ marginTop: 8, fontSize: 12, color: '#27ae60' }}>{t('fairWage')}</div>
              )}
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Work Description</label>
              <textarea className="input-field" rows={3} placeholder="Describe the work, duration, location..."
                style={{ resize: 'vertical' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <button className="btn-outline" onClick={() => setShowHireModal(false)}>Cancel</button>
              <button className="btn-primary" style={{ justifyContent: 'center' }} onClick={handleHire}>
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
