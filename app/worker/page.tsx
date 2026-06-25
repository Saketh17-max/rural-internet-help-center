'use client';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { CheckCircle, XCircle, Phone, MessageCircle, Star, TrendingUp, IndianRupee } from 'lucide-react';
import toast from 'react-hot-toast';

const EARNINGS_DATA = [
  { month: 'Aug', amount: 12600 }, { month: 'Sep', amount: 15400 }, { month: 'Oct', amount: 18200 },
  { month: 'Nov', amount: 14800 }, { month: 'Dec', amount: 21000 }, { month: 'Jan', amount: 19500 },
];

const JOB_INVITATIONS = [
  { id: 1, employer: 'Raju Farms', work: 'Carpentry work', location: 'Guntur', wage: 750, date: '2024-02-05', status: 'pending', empId: 'EMP000123' },
  { id: 2, employer: 'ABC Construction', work: 'Door frame installation', location: 'Vijayawada', wage: 800, date: '2024-02-03', status: 'accepted', empId: 'EMP000456' },
  { id: 3, employer: 'Priya Households', work: 'Kitchen cabinet repair', location: 'Rajahmundry', wage: 700, date: '2024-01-28', status: 'completed', empId: 'EMP000789' },
];

const PAYMENT_HISTORY = [
  { date: '2024-01-28', employer: 'Priya Households', days: 5, amount: 3500, status: 'paid' },
  { date: '2024-01-15', employer: 'Sundar Builders', days: 10, amount: 7500, status: 'paid' },
  { date: '2024-01-05', employer: 'Krishna Farms', days: 7, amount: 4900, status: 'paid' },
];

const REVIEWS = [
  { employer: 'Sundar Builders', rating: 5, comment: 'Excellent work! Very professional and on-time.', date: '2024-01-16' },
  { employer: 'Krishna Farms', rating: 4, comment: 'Good carpenter. Completed work within deadline.', date: '2024-01-06' },
];

export default function WorkerDashboard() {
  const { user, isAuthenticated, updateUser } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [available, setAvailable] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'payments' | 'reviews'>('overview');

  useEffect(() => {
    if (!isAuthenticated) router.push('/login');
  }, [isAuthenticated]);

  if (!isAuthenticated || !user) return null;

  const totalEarnings = PAYMENT_HISTORY.reduce((s, p) => s + p.amount, 0);

  const statusColor = (s: string) => ({ pending: '#f39c12', accepted: '#2980b9', completed: '#27ae60', rejected: '#e74c3c' }[s] || '#666');

  return (
    <div className="bg-[var(--bg)] min-h-[90vh] pt-24 pb-12 px-4 md:px-8">
      <div className="page-container">
        {/* Worker ID Card */}
        <div className="id-card mb-7">
          <div className="flex items-start md:items-center justify-between gap-6 flex-col md:flex-row relative z-10">
            <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
              <div className="w-14 h-14 md:w-18 md:h-18 rounded-full bg-[rgba(255,255,255,0.15)] flex items-center justify-center text-3xl md:text-4xl border-2 border-[rgba(255,255,255,0.3)] shrink-0">
                👷
              </div>
              <div className="flex-1">
                <div className="text-[10px] md:text-[11px] opacity-70">WORKER ID</div>
                <div className="text-xl md:text-2xl font-black tracking-widest leading-none mt-1">{user.userId || 'WRK000145'}</div>
                <div className="text-base md:text-[17px] font-bold mt-1.5">{user.name}</div>
                <div className="text-xs md:text-[13px] opacity-80 mt-0.5">Carpenter • Guntur</div>
              </div>
            </div>
            
            <div className="text-left md:text-right w-full md:w-auto border-t border-[rgba(255,255,255,0.2)] pt-4 md:pt-0 md:border-none">
              <div className="text-[10px] md:text-[11px] opacity-70 mb-2 md:mb-1">AVAILABILITY</div>
              <div className="flex items-center md:justify-end gap-3">
                <div onClick={() => { setAvailable(!available); toast.success(available ? 'Marked as unavailable' : 'Marked as available!'); }}
                  className={`w-12 h-6 md:w-[52px] md:h-[26px] rounded-full cursor-pointer transition-all flex items-center px-1 relative ${available ? 'bg-[#4ade80]' : 'bg-[rgba(255,255,255,0.2)]'}`}
                >
                  <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full bg-white transition-transform shadow-[0_2px_4px_rgba(0,0,0,0.2)] ${available ? 'translate-x-6 md:translate-x-[26px]' : 'translate-x-0'}`} />
                </div>
                <span className="text-xs md:text-[12px] font-bold">{available ? t('availableNow') : t('notAvailable')}</span>
              </div>
              <div className="flex gap-1.5 mt-3 md:mt-2 md:justify-end">
                {user.verified && <span className="badge badge-verified text-[10px] md:text-[11px]">✓ Verified</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-7">
          {[
            { label: 'Total Earnings', value: `₹${totalEarnings.toLocaleString('en-IN')}`, icon: '💰', color: '#27ae60' },
            { label: 'Jobs Completed', value: '24', icon: '✅', color: '#1b4f72' },
            { label: 'Rating', value: '4.8★', icon: '⭐', color: '#f39c12' },
            { label: 'Active Jobs', value: '2', icon: '💼', color: '#e67e22' },
          ].map(stat => (
            <div key={stat.label} className="stat-card p-3 md:p-5 flex-col sm:flex-row text-center sm:text-left gap-2 sm:gap-4">
              <div className="w-10 h-10 md:w-[52px] md:h-[52px] rounded-lg md:rounded-xl flex items-center justify-center text-xl md:text-2xl shrink-0 mx-auto sm:mx-0" style={{ background: `${stat.color}15` }}>{stat.icon}</div>
              <div>
                <div className="text-lg md:text-[20px] font-extrabold" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-[10px] md:text-[11px] text-[var(--text-muted)] leading-tight">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 md:gap-4 mb-6 border-b-2 border-[var(--card-border)] pb-0 overflow-x-auto hide-scrollbar whitespace-nowrap">
          {[
            { id: 'overview', label: '📊 Overview' },
            { id: 'jobs', label: '💼 Invitations' },
            { id: 'payments', label: '💰 Payments' },
            { id: 'reviews', label: '⭐ Reviews' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-3 md:px-[18px] py-2 md:py-2.5 border-none bg-transparent cursor-pointer text-xs md:text-[13px] -mb-[2px] transition-all border-b-2 ${activeTab === tab.id ? 'font-bold text-[var(--primary)] border-[var(--primary)]' : 'font-medium text-[var(--text-muted)] border-transparent'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
            <div className="w-full">
              <h3 className="font-extrabold mb-4 text-[15px]">Monthly Earnings</h3>
              <div className="chart-container overflow-hidden w-full p-2 sm:p-5">
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={EARNINGS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
                    <Tooltip formatter={(v) => [`₹${v !== undefined ? Number(v).toLocaleString('en-IN') : 0}`, 'Earnings']} />
                    <Bar dataKey="amount" fill="#1a6b3a" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pending Jobs */}
            <div>
              <h3 className="font-extrabold mb-4 text-[15px]">Pending Invitations</h3>
              {JOB_INVITATIONS.filter(j => j.status === 'pending').map(job => (
                <div key={job.id} className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-4 mb-3">
                  <div className="font-bold text-sm mb-1">{job.work}</div>
                  <div className="text-[11px] md:text-xs text-[var(--text-muted)] mb-2">{job.employer} • {job.location}</div>
                  <div className="text-[15px] md:text-base font-extrabold text-[var(--primary)] mb-3">₹{job.wage}/day</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="btn-primary py-2 px-0 text-[11px] md:text-xs justify-center rounded-lg min-h-[44px]"
                      onClick={() => toast.success('Job accepted! 🎉')}>
                      <CheckCircle size={13} /> Accept
                    </button>
                    <button className="btn-outline py-2 px-0 text-[11px] md:text-xs justify-center rounded-lg min-h-[44px] border-[#e74c3c] text-[#e74c3c]"
                      onClick={() => toast.success('Job rejected.')}>
                      <XCircle size={13} /> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <div>
            <div className="flex flex-col gap-3">
              {JOB_INVITATIONS.map(job => (
                <div key={job.id} className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-4 md:p-[18px_20px] flex flex-col md:flex-row md:align-center gap-4">
                  <div className="flex-1">
                    <div className="font-bold text-sm md:text-[15px]">{job.work}</div>
                    <div className="text-[11px] md:text-xs text-[var(--text-muted)] mt-1">{job.employer} ({job.empId}) • {job.location}</div>
                    <div className="text-[11px] md:text-xs text-[var(--text-muted)] mt-0.5">Date: {job.date}</div>
                  </div>
                  
                  <div className="flex items-center justify-between md:flex-row md:gap-4 md:justify-end w-full md:w-auto border-t border-[var(--card-border)] pt-3 md:border-none md:pt-0">
                    <div className="flex flex-col md:items-end gap-1">
                      <div className="text-[16px] md:text-[18px] font-extrabold text-[var(--primary)]">₹{job.wage}/day</div>
                      <span className="badge text-[10px] self-start md:self-end" style={{ background: `${statusColor(job.status)}20`, color: statusColor(job.status) }}>
                        {job.status}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      {job.status === 'pending' && (
                        <>
                          <button className="btn-primary py-1.5 px-3 text-[11px] min-h-[36px]" onClick={() => toast.success('Accepted!')}>Accept</button>
                          <button className="btn-outline py-1.5 px-3 text-[11px] border-[#e74c3c] text-[#e74c3c] min-h-[36px]" onClick={() => toast('Rejected.')}>Reject</button>
                        </>
                      )}
                      <button className="btn-outline py-1.5 px-3 text-[11px] min-h-[36px]" onClick={() => toast.success('Chat opened!')}>
                        <Phone size={12} /> Chat
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div>
            <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl overflow-x-auto mb-5">
              <table className="data-table min-w-[500px]">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Employer</th>
                    <th>Days</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {PAYMENT_HISTORY.map((p, i) => (
                    <tr key={i}>
                      <td className="text-xs md:text-[13px]">{p.date}</td>
                      <td className="font-semibold text-xs md:text-[14px]">{p.employer}</td>
                      <td className="text-xs md:text-[14px]">{p.days}</td>
                      <td className="font-extrabold text-[#27ae60] text-xs md:text-[14px]">₹{p.amount.toLocaleString('en-IN')}</td>
                      <td><span className="badge badge-success text-[10px] md:text-xs">✅ {p.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {[
                { label: 'Total Received', value: `₹${totalEarnings.toLocaleString('en-IN')}`, color: '#27ae60' },
                { label: 'Pending', value: '₹0', color: '#f39c12' },
                { label: 'This Month', value: '₹19,500', color: '#1b4f72' },
              ].map(s => (
                <div key={s.label} className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-3 md:p-4 text-center col-span-1 md:col-span-1 last:col-span-2 md:last:col-span-1">
                  <div className="text-[18px] md:text-[22px] font-extrabold" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-[11px] md:text-[12px] text-[var(--text-muted)] mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 mb-6 p-5 rounded-xl bg-[var(--card)] border border-[var(--card-border)]">
              <div className="text-center md:text-left min-w-[120px]">
                <div className="text-4xl md:text-5xl font-black text-[#f39c12]">4.8</div>
                <div className="stars text-lg md:text-xl">★★★★★</div>
                <div className="text-[11px] md:text-xs text-[var(--text-muted)]">23 reviews</div>
              </div>
              <div className="w-full max-w-sm mx-auto md:mx-0 flex-1">
                {[5, 4, 3, 2, 1].map(star => (
                  <div key={star} className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11px] md:text-xs w-5 shrink-0">{star}★</span>
                    <div className="flex-1 h-1.5 rounded-full bg-[var(--bg2)] overflow-hidden">
                      <div className="h-full bg-[#f39c12] rounded-full" style={{ width: star === 5 ? '75%' : star === 4 ? '17%' : '8%' }} />
                    </div>
                    <span className="text-[10px] md:text-[11px] text-[var(--text-muted)] w-6 shrink-0 text-right">
                      {star === 5 ? 17 : star === 4 ? 4 : 2}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {REVIEWS.map((r, i) => (
                <div key={i} className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between mb-2 gap-1 sm:gap-0">
                    <span className="font-bold text-[13px] md:text-[14px]">{r.employer}</span>
                    <div className="flex items-center gap-2">
                      <span className="stars text-xs">{'★'.repeat(r.rating)}</span>
                      <span className="text-[11px] md:text-xs text-[var(--text-muted)]">{r.date}</span>
                    </div>
                  </div>
                  <p className="text-[12px] md:text-[13px] text-[var(--text-muted)] italic leading-relaxed">"{r.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
