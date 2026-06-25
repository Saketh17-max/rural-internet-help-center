'use client';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Search, Star, MapPin, Phone, CheckCircle, AlertTriangle, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const MONTHLY_HIRING = [
  { month: 'Aug', workers: 8 }, { month: 'Sep', workers: 12 }, { month: 'Oct', workers: 15 },
  { month: 'Nov', workers: 10 }, { month: 'Dec', workers: 18 }, { month: 'Jan', workers: 14 },
];

const MY_WORKERS = [
  { id: 1, name: 'Raju Kumar', skill: 'Carpenter', status: 'active', wage: 750, days: 5, totalPaid: 3750, rating: 4.8 },
  { id: 2, name: 'Suresh Yadav', skill: 'Electrician', status: 'completed', wage: 900, days: 3, totalPaid: 2700, rating: 4.9 },
  { id: 3, name: 'Lakshmi Devi', skill: 'Farm Labour', status: 'active', wage: 480, days: 10, totalPaid: 4800, rating: 4.5 },
];

const JOBS_POSTED = [
  { id: 1, title: 'Farm Labour Needed', skill: 'Farm Labour', location: 'Guntur', wage: 500, status: 'active', applicants: 5, postedDate: '2024-02-01' },
  { id: 2, title: 'Electrical Work', skill: 'Electrician', location: 'Vijayawada', wage: 900, status: 'filled', applicants: 8, postedDate: '2024-01-25' },
  { id: 3, title: 'House Painting', skill: 'Painter', location: 'Rajahmundry', wage: 700, status: 'active', applicants: 3, postedDate: '2024-02-03' },
];

const RECOMMENDED_WAGES: Record<string, number> = {
  'Carpenter': 800, 'Electrician': 900, 'Painter': 700, 'Plumber': 850,
  'Farm Labour': 500, 'Construction Worker': 600, 'Driver': 900, 'Mechanic': 850,
  'Tailor': 600, 'House Maid': 450, 'Tutor': 500, 'Cook': 600,
};

export default function EmployerDashboard() {
  const { user, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'workers' | 'jobs' | 'post'>('overview');
  const [postForm, setPostForm] = useState({ title: '', skill: 'Farm Labour', location: '', wage: '', days: '', desc: '' });
  const [wageWarning, setWageWarning] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) router.push('/login');
  }, [isAuthenticated]);

  if (!isAuthenticated || !user) return null;

  const checkWage = (wage: string, skill: string) => {
    const offered = parseInt(wage);
    const recommended = RECOMMENDED_WAGES[skill] || 500;
    setWageWarning(!!wage && offered < recommended);
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '90vh', padding: '32px 20px' }}>
      <div className="page-container">
        {/* Employer ID Card */}
        <div className="id-card" style={{ marginBottom: 28, background: 'linear-gradient(135deg, #1b4f72, #0a2744)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, border: '2px solid rgba(255,255,255,0.3)' }}>
              🏢
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, opacity: 0.7 }}>EMPLOYER ID</div>
              <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: 2 }}>{user.userId || 'EMP000321'}</div>
              <div style={{ fontSize: 17, fontWeight: 700, marginTop: 2 }}>{user.name}</div>
              <div style={{ fontSize: 13, opacity: 0.8 }}>Agriculture / Farming • Guntur</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>✅</div>
              {user.verified && <span className="badge badge-verified" style={{ fontSize: 11 }}>✓ Verified Employer</span>}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
          {[
            { label: 'Workers Hired', value: '24', icon: '👷', color: '#1a6b3a' },
            { label: 'Active Jobs', value: '2', icon: '💼', color: '#2980b9' },
            { label: 'Total Paid', value: '₹1.2L', icon: '💰', color: '#27ae60' },
            { label: 'Avg Rating', value: '4.7★', icon: '⭐', color: '#f39c12' },
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
        <div style={{ display: 'flex', gap: 4, marginBottom: 24, borderBottom: '2px solid var(--card-border)' }}>
          {[
            { id: 'overview', label: '📊 Overview' },
            { id: 'workers', label: '👷 My Workers' },
            { id: 'jobs', label: '📋 Posted Jobs' },
            { id: 'post', label: '➕ Post Job' },
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

        {/* Overview */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24 }}>
            <div>
              <h3 style={{ fontWeight: 800, marginBottom: 16, fontSize: 15 }}>Monthly Hiring Activity</h3>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={MONTHLY_HIRING}>
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="workers" fill="#1b4f72" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <h3 style={{ fontWeight: 800, marginBottom: 16, fontSize: 15 }}>Quick Actions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { label: '🔍 Search Workers', action: () => router.push('/marketplace') },
                  { label: '➕ Post New Job', action: () => setActiveTab('post') },
                  { label: '💰 Pay Salary', action: () => toast.success('Payment portal opening...') },
                  { label: '📊 View Reports', action: () => router.push('/analytics') },
                ].map(btn => (
                  <button key={btn.label} onClick={btn.action} className="btn-outline"
                    style={{ justifyContent: 'flex-start', textAlign: 'left' }}>
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* My Workers */}
        {activeTab === 'workers' && (
          <div style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 16, overflow: 'hidden' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Worker</th>
                  <th>Skill</th>
                  <th>Wage/Day</th>
                  <th>Days Worked</th>
                  <th>Total Paid</th>
                  <th>Rating</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {MY_WORKERS.map(w => (
                  <tr key={w.id}>
                    <td style={{ fontWeight: 600 }}>{w.name}</td>
                    <td>{w.skill}</td>
                    <td style={{ fontWeight: 700, color: 'var(--primary)' }}>₹{w.wage}</td>
                    <td>{w.days}</td>
                    <td style={{ fontWeight: 700, color: '#27ae60' }}>₹{w.totalPaid.toLocaleString('en-IN')}</td>
                    <td><span className="stars">★</span> {w.rating}</td>
                    <td>
                      <span className={`badge ${w.status === 'active' ? 'badge-success' : 'badge-info'}`}>
                        {w.status}
                      </span>
                    </td>
                    <td>
                      <button onClick={() => toast.success(`Message sent to ${w.name}`)}
                        style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                        Message
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Posted Jobs */}
        {activeTab === 'jobs' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {JOBS_POSTED.map(job => (
              <div key={job.id} style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 14, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{job.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                    {job.skill} • <MapPin size={10} style={{ display: 'inline' }} /> {job.location} • Posted: {job.postedDate}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                    👥 {job.applicants} applicants
                  </div>
                </div>
                <div style={{ fontWeight: 800, fontSize: 18, color: 'var(--primary)' }}>₹{job.wage}/day</div>
                <span className={`badge ${job.status === 'active' ? 'badge-success' : 'badge-info'}`}>{job.status}</span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn-outline" style={{ padding: '6px 14px', fontSize: 12 }} onClick={() => toast.success('Viewing applicants')}>View</button>
                  {job.status === 'active' && (
                    <button style={{ padding: '6px 14px', fontSize: 12, borderRadius: '50px', border: '1.5px solid #e74c3c', color: '#e74c3c', background: 'none', cursor: 'pointer' }}
                      onClick={() => toast.success('Job cancelled.')}>Cancel</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Post Job */}
        {activeTab === 'post' && (
          <div style={{ maxWidth: 560 }}>
            <h3 style={{ fontWeight: 800, marginBottom: 20, fontSize: 17 }}>Post a New Job</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 5 }}>Job Title</label>
                <input className="input-field" placeholder="e.g., Farm Labour Needed for Rice Harvest"
                  value={postForm.title} onChange={e => setPostForm(f => ({ ...f, title: e.target.value }))} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 5 }}>Skill Required</label>
                  <select className="input-field" value={postForm.skill}
                    onChange={e => { setPostForm(f => ({ ...f, skill: e.target.value })); checkWage(postForm.wage, e.target.value); }}>
                    {Object.keys(RECOMMENDED_WAGES).map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 5 }}>Location</label>
                  <input className="input-field" placeholder="Village, District"
                    value={postForm.location} onChange={e => setPostForm(f => ({ ...f, location: e.target.value }))} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 5 }}>
                    Daily Wage (₹) — Recommended: ₹{RECOMMENDED_WAGES[postForm.skill]}
                  </label>
                  <input className="input-field" type="number" placeholder="Enter wage"
                    value={postForm.wage}
                    onChange={e => { setPostForm(f => ({ ...f, wage: e.target.value })); checkWage(e.target.value, postForm.skill); }} />
                  {wageWarning && (
                    <div style={{ marginTop: 6, padding: '6px 10px', borderRadius: 8, background: 'rgba(243,156,18,0.15)', border: '1px solid rgba(243,156,18,0.4)', color: '#e67e22', fontSize: 11, display: 'flex', gap: 4 }}>
                      <AlertTriangle size={12} /> Below recommended rate!
                    </div>
                  )}
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 5 }}>Duration (days)</label>
                  <input className="input-field" type="number" placeholder="e.g., 5"
                    value={postForm.days} onChange={e => setPostForm(f => ({ ...f, days: e.target.value }))} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 5 }}>Job Description</label>
                <textarea className="input-field" rows={3} placeholder="Describe the work, requirements, and any special skills needed..."
                  style={{ resize: 'vertical' }}
                  value={postForm.desc} onChange={e => setPostForm(f => ({ ...f, desc: e.target.value }))} />
              </div>
              <button className="btn-primary" style={{ justifyContent: 'center', marginTop: 8 }}
                onClick={() => { toast.success('Job posted successfully! Workers will be notified. 🎉'); setActiveTab('jobs'); }}>
                <Briefcase size={16} /> Post Job
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
