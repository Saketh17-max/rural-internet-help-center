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
    <div style={{ background: 'var(--bg)', minHeight: '90vh', padding: '32px 20px' }}>
      <div className="page-container">
        {/* Worker ID Card */}
        <div className="id-card" style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, border: '2px solid rgba(255,255,255,0.3)' }}>
              👷
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, opacity: 0.7 }}>WORKER ID</div>
              <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: 2 }}>{user.userId || 'WRK000145'}</div>
              <div style={{ fontSize: 17, fontWeight: 700, marginTop: 2 }}>{user.name}</div>
              <div style={{ fontSize: 13, opacity: 0.8 }}>Carpenter • Guntur</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 4 }}>AVAILABILITY</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div onClick={() => { setAvailable(!available); toast.success(available ? 'Marked as unavailable' : 'Marked as available!'); }}
                  style={{
                    width: 52, height: 26, borderRadius: 13, cursor: 'pointer', transition: 'all 0.3s',
                    background: available ? '#4ade80' : 'rgba(255,255,255,0.2)',
                    position: 'relative', display: 'flex', alignItems: 'center', padding: '0 3px',
                  }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%', background: 'white',
                    transition: 'transform 0.3s', transform: available ? 'translateX(26px)' : 'translateX(0)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700 }}>{available ? t('availableNow') : t('notAvailable')}</span>
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 8, justifyContent: 'flex-end' }}>
                {user.verified && <span className="badge badge-verified" style={{ fontSize: 11 }}>✓ Verified</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
          {[
            { label: 'Total Earnings', value: `₹${totalEarnings.toLocaleString('en-IN')}`, icon: '💰', color: '#27ae60' },
            { label: 'Jobs Completed', value: '24', icon: '✅', color: '#1b4f72' },
            { label: 'Rating', value: '4.8★', icon: '⭐', color: '#f39c12' },
            { label: 'Active Jobs', value: '2', icon: '💼', color: '#e67e22' },
          ].map(stat => (
            <div key={stat.label} className="stat-card">
              <div className="stat-icon" style={{ background: `${stat.color}15`, fontSize: 24 }}>{stat.icon}</div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: stat.color }}>{stat.value}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 24, borderBottom: '2px solid var(--card-border)', paddingBottom: 0 }}>
          {[
            { id: 'overview', label: '📊 Overview' },
            { id: 'jobs', label: '💼 Job Invitations' },
            { id: 'payments', label: '💰 Payments' },
            { id: 'reviews', label: '⭐ Reviews' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as typeof activeTab)}
              style={{
                padding: '10px 18px', border: 'none', background: 'none', cursor: 'pointer',
                fontSize: 13, fontWeight: activeTab === tab.id ? 700 : 500,
                color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-muted)',
                borderBottom: activeTab === tab.id ? '2px solid var(--primary)' : '2px solid transparent',
                marginBottom: -2, transition: 'all 0.2s',
              }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24 }}>
            <div>
              <h3 style={{ fontWeight: 800, marginBottom: 16, fontSize: 15 }}>Monthly Earnings</h3>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={EARNINGS_DATA}>
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
                    <Tooltip formatter={(v: number) => [`₹${v.toLocaleString('en-IN')}`, 'Earnings']} />
                    <Bar dataKey="amount" fill="#1a6b3a" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pending Jobs */}
            <div>
              <h3 style={{ fontWeight: 800, marginBottom: 16, fontSize: 15 }}>Pending Invitations</h3>
              {JOB_INVITATIONS.filter(j => j.status === 'pending').map(job => (
                <div key={job.id} style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 12, padding: 16, marginBottom: 12 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{job.work}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>{job.employer} • {job.location}</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--primary)', marginBottom: 12 }}>₹{job.wage}/day</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    <button className="btn-primary" style={{ padding: '8px 12px', fontSize: 12, justifyContent: 'center', borderRadius: 8 }}
                      onClick={() => toast.success('Job accepted! 🎉')}>
                      <CheckCircle size={13} /> Accept
                    </button>
                    <button className="btn-outline" style={{ padding: '8px 12px', fontSize: 12, justifyContent: 'center', borderRadius: 8, borderColor: '#e74c3c', color: '#e74c3c' }}
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {JOB_INVITATIONS.map(job => (
                <div key={job.id} style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 14, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{job.work}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{job.employer} ({job.empId}) • {job.location}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Date: {job.date}</div>
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--primary)' }}>₹{job.wage}/day</div>
                  <span className="badge" style={{ background: `${statusColor(job.status)}20`, color: statusColor(job.status) }}>
                    {job.status}
                  </span>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {job.status === 'pending' && (
                      <>
                        <button className="btn-primary" style={{ padding: '6px 14px', fontSize: 12 }} onClick={() => toast.success('Accepted!')}>Accept</button>
                        <button className="btn-outline" style={{ padding: '6px 14px', fontSize: 12, borderColor: '#e74c3c', color: '#e74c3c' }} onClick={() => toast('Rejected.')}>Reject</button>
                      </>
                    )}
                    <button className="btn-outline" style={{ padding: '6px 14px', fontSize: 12 }} onClick={() => toast.success('Chat opened!')}>
                      <Phone size={12} /> Chat
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div>
            <div style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 16, overflow: 'hidden' }}>
              <table className="data-table">
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
                      <td style={{ fontSize: 13 }}>{p.date}</td>
                      <td style={{ fontWeight: 600 }}>{p.employer}</td>
                      <td>{p.days}</td>
                      <td style={{ fontWeight: 800, color: '#27ae60' }}>₹{p.amount.toLocaleString('en-IN')}</td>
                      <td><span className="badge badge-success">✅ {p.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 20 }}>
              {[
                { label: 'Total Received', value: `₹${totalEarnings.toLocaleString('en-IN')}`, color: '#27ae60' },
                { label: 'Pending', value: '₹0', color: '#f39c12' },
                { label: 'This Month', value: '₹19,500', color: '#1b4f72' },
              ].map(s => (
                <div key={s.label} style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 12, padding: '16px 20px', textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 24, padding: '20px', borderRadius: 16, background: 'var(--card)', border: '1px solid var(--card-border)' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 48, fontWeight: 900, color: '#f39c12' }}>4.8</div>
                <div className="stars" style={{ fontSize: 20 }}>★★★★★</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>23 reviews</div>
              </div>
              <div style={{ flex: 1 }}>
                {[5, 4, 3, 2, 1].map(star => (
                  <div key={star} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 12, width: 20 }}>{star}★</span>
                    <div style={{ flex: 1, height: 6, borderRadius: 3, background: 'var(--bg2)' }}>
                      <div style={{ height: '100%', width: star === 5 ? '75%' : star === 4 ? '17%' : '8%', background: '#f39c12', borderRadius: 3 }} />
                    </div>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)', width: 24 }}>
                      {star === 5 ? 17 : star === 4 ? 4 : 2}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {REVIEWS.map((r, i) => (
              <div key={i} style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 12, padding: '16px 20px', marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontWeight: 700 }}>{r.employer}</span>
                  <div>
                    <span className="stars">{'★'.repeat(r.rating)}</span>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 8 }}>{r.date}</span>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic' }}>"{r.comment}"</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
