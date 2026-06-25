'use client';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { CheckCircle2, XCircle, Phone, MessageCircle, Star, Briefcase, Map, Banknote, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

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
  const { user, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [available, setAvailable] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'payments' | 'reviews'>('overview');

  useEffect(() => {
    if (!isAuthenticated) router.push('/login');
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) return null;

  const totalEarnings = PAYMENT_HISTORY.reduce((s, p) => s + p.amount, 0);
  const statusColor = (s: string) => ({ pending: 'var(--warning)', accepted: 'var(--primary)', completed: 'var(--success)', rejected: 'var(--danger)' }[s] || 'var(--text-muted)');

  const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <div className="bg-[var(--bg)] min-h-[90vh] py-8 md:py-12 px-4 md:px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Worker ID Card */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-[var(--secondary)] text-white rounded-3xl p-6 md:p-10 mb-8 relative overflow-hidden shadow-lg shadow-green-900/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5 w-full md:w-auto">
              <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 shrink-0 backdrop-blur-md">
                <Briefcase size={36} className="text-white" />
              </div>
              <div>
                <div className="text-[12px] opacity-80 mb-1 font-bold tracking-widest uppercase">WORKER DASHBOARD</div>
                <div className="text-3xl md:text-4xl font-black tracking-widest leading-none mb-2">{user.userId || 'WRK000145'}</div>
                <div className="text-[16px] font-bold mb-1">{user.name}</div>
                <div className="text-[13px] text-green-100 flex items-center gap-1.5"><Map size={14}/> Carpenter • Guntur</div>
              </div>
            </div>
            
            <div className="w-full md:w-auto bg-white/10 p-4 rounded-2xl border border-white/20 backdrop-blur-md flex flex-col items-center md:items-end">
              <div className="text-[11px] opacity-80 font-bold mb-3 tracking-widest uppercase">AVAILABILITY</div>
              <div className="flex items-center gap-3">
                <span className="text-[13px] font-bold">{available ? t('availableNow') : t('notAvailable')}</span>
                <div onClick={() => { setAvailable(!available); toast.success(available ? 'Marked as unavailable' : 'Marked as available!'); }}
                  className={`w-14 h-7 rounded-full cursor-pointer transition-all flex items-center px-1 border border-white/30 ${available ? 'bg-green-500' : 'bg-black/20'}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform shadow-sm ${available ? 'translate-x-7' : 'translate-x-0'}`} />
                </div>
              </div>
              {user.verified && <div className="mt-4"><span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-[11px] font-bold"><CheckCircle2 size={12}/> Verified Worker</span></div>}
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Earnings', value: `₹${totalEarnings.toLocaleString('en-IN')}`, icon: <Banknote size={24}/>, color: '#27AE60' },
            { label: 'Jobs Completed', value: '24', icon: <CheckCircle2 size={24}/>, color: '#0F4C81' },
            { label: 'Rating', value: '4.8★', icon: <Star size={24}/>, color: '#F39C12' },
            { label: 'Active Jobs', value: '2', icon: <Briefcase size={24}/>, color: '#E67E22' },
          ].map(stat => (
            <div key={stat.label} className="bg-white border border-[var(--card-border)] rounded-2xl p-5 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${stat.color}15`, color: stat.color }}>{stat.icon}</div>
              <div>
                <div className="text-[22px] font-black text-[var(--text)] mb-1">{stat.value}</div>
                <div className="text-[12px] font-semibold text-[var(--text-muted)] uppercase tracking-wide">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b-2 border-[var(--card-border)] overflow-x-auto hide-scrollbar">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'jobs', label: 'Invitations' },
            { id: 'payments', label: 'Payments' },
            { id: 'reviews', label: 'Reviews' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-6 py-3 border-none bg-transparent cursor-pointer text-[14px] transition-all border-b-2 font-bold whitespace-nowrap ${activeTab === tab.id ? 'text-[var(--primary)] border-[var(--primary)]' : 'text-[var(--text-muted)] border-transparent hover:text-[var(--text)]'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
            <div className="bg-white border border-[var(--card-border)] rounded-3xl p-6 shadow-sm">
              <h3 className="text-[16px] font-extrabold text-[var(--text)] mb-6">Monthly Earnings</h3>
              <div className="w-full h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={EARNINGS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: 'var(--text-muted)' }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: 'var(--bg2)' }} contentStyle={{ borderRadius: '12px', border: '1px solid var(--card-border)', boxShadow: 'var(--shadow)' }} />
                    <Bar dataKey="amount" fill="var(--secondary)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h3 className="text-[16px] font-extrabold text-[var(--text)] mb-5">Pending Invitations</h3>
              <div className="flex flex-col gap-4">
                {JOB_INVITATIONS.filter(j => j.status === 'pending').map(job => (
                  <div key={job.id} className="bg-white border border-[var(--card-border)] rounded-2xl p-5 shadow-sm hover:border-[var(--secondary)] transition-colors">
                    <div className="font-bold text-[15px] text-[var(--text)] mb-1">{job.work}</div>
                    <div className="text-[13px] text-[var(--text-muted)] mb-3 flex items-center gap-1.5"><Map size={14}/> {job.employer} • {job.location}</div>
                    <div className="text-[18px] font-black text-[var(--secondary)] mb-4">₹{job.wage}<span className="text-[12px] text-[var(--text-muted)] font-medium">/day</span></div>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="bg-[var(--secondary)] hover:bg-[var(--secondary-light)] text-white border-none py-2.5 rounded-xl text-[13px] font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                        onClick={() => toast.success('Job accepted! 🎉')}>
                        <CheckCircle2 size={16} /> Accept
                      </button>
                      <button className="bg-white border-2 border-red-500 text-red-500 hover:bg-red-50 py-2.5 rounded-xl text-[13px] font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                        onClick={() => toast.success('Job rejected.')}>
                        <XCircle size={16} /> Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex flex-col gap-4">
            {JOB_INVITATIONS.map(job => (
              <div key={job.id} className="bg-white border border-[var(--card-border)] rounded-2xl p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="font-bold text-[16px] text-[var(--text)]">{job.work}</div>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider" style={{ background: `${statusColor(job.status)}15`, color: statusColor(job.status) }}>
                      {job.status}
                    </span>
                  </div>
                  <div className="text-[13px] text-[var(--text-muted)] mb-1 flex items-center gap-1.5"><Map size={14}/> {job.employer} ({job.empId}) • {job.location}</div>
                  <div className="text-[13px] text-[var(--text-muted)] flex items-center gap-1.5"><Calendar size={14}/> Date: {job.date}</div>
                </div>
                
                <div className="flex flex-col md:items-end gap-4 border-t border-[var(--card-border)] pt-4 md:border-none md:pt-0">
                  <div className="text-[20px] font-black text-[var(--secondary)]">₹{job.wage}<span className="text-[13px] text-[var(--text-muted)] font-medium">/day</span></div>
                  <div className="flex gap-3">
                    {job.status === 'pending' && (
                      <>
                        <button className="bg-[var(--secondary)] text-white border-none py-2 px-4 rounded-xl text-[13px] font-bold cursor-pointer" onClick={() => toast.success('Accepted!')}>Accept</button>
                        <button className="bg-white text-red-500 border border-red-500 py-2 px-4 rounded-xl text-[13px] font-bold cursor-pointer" onClick={() => toast('Rejected.')}>Reject</button>
                      </>
                    )}
                    <button className="bg-[var(--bg2)] text-[var(--text)] hover:bg-[var(--card-border)] border-none py-2 px-4 rounded-xl text-[13px] font-bold cursor-pointer flex items-center gap-2 transition-colors" onClick={() => toast.success('Chat opened!')}>
                      <MessageCircle size={16} /> Chat
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="bg-white border border-[var(--card-border)] rounded-3xl overflow-hidden shadow-sm mb-8">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-[var(--bg2)]">
                      <th className="text-[13px] text-[var(--text-muted)] font-bold p-4 border-b border-[var(--card-border)]">Date</th>
                      <th className="text-[13px] text-[var(--text-muted)] font-bold p-4 border-b border-[var(--card-border)]">Employer</th>
                      <th className="text-[13px] text-[var(--text-muted)] font-bold p-4 border-b border-[var(--card-border)]">Days</th>
                      <th className="text-[13px] text-[var(--text-muted)] font-bold p-4 border-b border-[var(--card-border)]">Amount</th>
                      <th className="text-[13px] text-[var(--text-muted)] font-bold p-4 border-b border-[var(--card-border)]">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PAYMENT_HISTORY.map((p, i) => (
                      <tr key={i} className="border-b border-[var(--card-border)] last:border-0 hover:bg-[var(--bg)] transition-colors">
                        <td className="text-[14px] text-[var(--text)] p-4 font-medium">{p.date}</td>
                        <td className="text-[14px] text-[var(--text)] p-4 font-bold">{p.employer}</td>
                        <td className="text-[14px] text-[var(--text)] p-4">{p.days}</td>
                        <td className="text-[15px] text-[#27AE60] p-4 font-black">₹{p.amount.toLocaleString('en-IN')}</td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-green-50 text-green-600 text-[12px] font-bold uppercase tracking-wider">
                            <CheckCircle2 size={14}/> {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Total Received', value: `₹${totalEarnings.toLocaleString('en-IN')}`, color: '#27AE60' },
                { label: 'Pending', value: '₹0', color: '#F39C12' },
                { label: 'This Month', value: '₹19,500', color: '#0F4C81' },
              ].map(s => (
                <div key={s.label} className="bg-white border border-[var(--card-border)] rounded-2xl p-6 text-center shadow-sm">
                  <div className="text-[28px] font-black mb-1" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-[13px] font-bold text-[var(--text-muted)] uppercase tracking-widest">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8 p-8 rounded-3xl bg-white border border-[var(--card-border)] shadow-sm">
              <div className="text-center md:text-left min-w-[150px]">
                <div className="text-5xl md:text-6xl font-black text-[#F39C12] mb-2">4.8</div>
                <div className="flex text-xl text-[#F39C12] justify-center md:justify-start mb-1">★★★★★</div>
                <div className="text-[13px] font-medium text-[var(--text-muted)]">Based on 23 reviews</div>
              </div>
              <div className="w-full max-w-sm flex-1">
                {[5, 4, 3, 2, 1].map(star => (
                  <div key={star} className="flex items-center gap-3 mb-2">
                    <span className="text-[13px] font-bold text-[var(--text)] w-8 flex items-center gap-1">{star} <Star size={12} className="fill-current text-[#F39C12]" /></span>
                    <div className="flex-1 h-2.5 rounded-full bg-[var(--bg2)] overflow-hidden">
                      <div className="h-full bg-[#F39C12] rounded-full" style={{ width: star === 5 ? '75%' : star === 4 ? '17%' : '8%' }} />
                    </div>
                    <span className="text-[12px] font-bold text-[var(--text-muted)] w-6 text-right">
                      {star === 5 ? 17 : star === 4 ? 4 : 2}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {REVIEWS.map((r, i) => (
                <div key={i} className="bg-white border border-[var(--card-border)] rounded-2xl p-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                    <span className="font-bold text-[16px] text-[var(--text)]">{r.employer}</span>
                    <div className="flex items-center gap-3">
                      <span className="flex text-[#F39C12] text-sm">{'★'.repeat(r.rating)}</span>
                      <span className="text-[12px] font-medium text-[var(--text-light)]">{r.date}</span>
                    </div>
                  </div>
                  <p className="text-[14px] text-[var(--text-muted)] italic leading-relaxed text-lg">"{r.comment}"</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
