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
    <div className="bg-[var(--bg)] min-h-[90vh] pt-24 pb-12 px-4 md:px-8">
      <div className="page-container">
        {/* Employer ID Card */}
        <div className="id-card mb-7 bg-gradient-to-br from-[#1b4f72] to-[#0a2744]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
              <div className="w-14 h-14 md:w-18 md:h-18 rounded-full bg-[rgba(255,255,255,0.15)] flex items-center justify-center text-3xl md:text-4xl border-2 border-[rgba(255,255,255,0.3)] shrink-0">
                🏢
              </div>
              <div className="flex-1">
                <div className="text-[10px] md:text-[11px] opacity-70">EMPLOYER ID</div>
                <div className="text-xl md:text-2xl font-black tracking-widest leading-none mt-1">{user.userId || 'EMP000321'}</div>
                <div className="text-base md:text-[17px] font-bold mt-1.5">{user.name}</div>
                <div className="text-xs md:text-[13px] opacity-80 mt-0.5">Agriculture / Farming • Guntur</div>
              </div>
            </div>
            
            <div className="flex flex-row md:flex-col items-center justify-between md:items-end md:justify-start w-full md:w-auto border-t border-[rgba(255,255,255,0.2)] pt-4 md:border-none md:pt-0">
              <div className="text-2xl md:mb-2">✅</div>
              {user.verified && <span className="badge badge-verified text-[10px] md:text-[11px]">✓ Verified Employer</span>}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-7">
          {[
            { label: 'Workers Hired', value: '24', icon: '👷', color: '#1a6b3a' },
            { label: 'Active Jobs', value: '2', icon: '💼', color: '#2980b9' },
            { label: 'Total Paid', value: '₹1.2L', icon: '💰', color: '#27ae60' },
            { label: 'Avg Rating', value: '4.7★', icon: '⭐', color: '#f39c12' },
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
            { id: 'workers', label: '👷 My Workers' },
            { id: 'jobs', label: '📋 Posted Jobs' },
            { id: 'post', label: '➕ Post Job' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-3 md:px-[18px] py-2 md:py-2.5 border-none bg-transparent cursor-pointer text-xs md:text-[13px] -mb-[2px] transition-all border-b-2 ${activeTab === tab.id ? 'font-bold text-[var(--primary)] border-[var(--primary)]' : 'font-medium text-[var(--text-muted)] border-transparent'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
            <div className="w-full">
              <h3 className="font-extrabold mb-4 text-[15px]">Monthly Hiring Activity</h3>
              <div className="chart-container overflow-hidden w-full p-2 sm:p-5">
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={MONTHLY_HIRING} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="workers" fill="#1b4f72" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <h3 className="font-extrabold mb-4 text-[15px]">Quick Actions</h3>
              <div className="flex flex-col gap-3">
                {[
                  { label: '🔍 Search Workers', action: () => router.push('/marketplace') },
                  { label: '➕ Post New Job', action: () => setActiveTab('post') },
                  { label: '💰 Pay Salary', action: () => toast.success('Payment portal opening...') },
                  { label: '📊 View Reports', action: () => router.push('/analytics') },
                ].map(btn => (
                  <button key={btn.label} onClick={btn.action} className="btn-outline justify-start text-left py-3 min-h-[44px] text-sm font-semibold rounded-xl">
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* My Workers */}
        {activeTab === 'workers' && (
          <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl overflow-x-auto">
            <table className="data-table min-w-[700px]">
              <thead>
                <tr>
                  <th>Worker</th>
                  <th>Skill</th>
                  <th>Wage/Day</th>
                  <th>Days</th>
                  <th>Total Paid</th>
                  <th>Rating</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {MY_WORKERS.map(w => (
                  <tr key={w.id}>
                    <td className="font-semibold text-xs md:text-sm">{w.name}</td>
                    <td className="text-xs md:text-sm">{w.skill}</td>
                    <td className="font-bold text-[var(--primary)] text-xs md:text-sm">₹{w.wage}</td>
                    <td className="text-xs md:text-sm">{w.days}</td>
                    <td className="font-bold text-[#27ae60] text-xs md:text-sm">₹{w.totalPaid.toLocaleString('en-IN')}</td>
                    <td className="text-xs md:text-sm"><span className="stars">★</span> {w.rating}</td>
                    <td>
                      <span className={`badge text-[10px] md:text-xs ${w.status === 'active' ? 'badge-success' : 'badge-info'}`}>
                        {w.status}
                      </span>
                    </td>
                    <td>
                      <button onClick={() => toast.success(`Message sent to ${w.name}`)}
                        className="bg-transparent border-none text-[var(--primary)] cursor-pointer text-xs md:text-[13px] font-bold p-2 active:scale-95 transition-transform">
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
          <div className="flex flex-col gap-3">
            {JOBS_POSTED.map(job => (
              <div key={job.id} className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-4 md:p-[18px_20px] flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <div className="font-bold text-sm md:text-[15px]">{job.title}</div>
                  <div className="text-[11px] md:text-xs text-[var(--text-muted)] mt-1 flex items-center gap-1">
                    {job.skill} • <MapPin size={12} className="inline shrink-0" /> {job.location} • Posted: {job.postedDate}
                  </div>
                  <div className="text-[11px] md:text-xs text-[var(--text-muted)] mt-1.5">
                    👥 {job.applicants} applicants
                  </div>
                </div>
                
                <div className="flex items-center justify-between md:flex-row md:justify-end gap-4 w-full md:w-auto border-t border-[var(--card-border)] pt-3 md:border-none md:pt-0">
                  <div className="flex flex-col gap-1.5">
                    <div className="font-extrabold text-[16px] md:text-[18px] text-[var(--primary)]">₹{job.wage}/day</div>
                    <span className={`badge text-[10px] w-fit ${job.status === 'active' ? 'badge-success' : 'badge-info'}`}>{job.status}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="btn-outline py-1.5 px-3 md:px-4 text-[11px] md:text-xs min-h-[36px]" onClick={() => toast.success('Viewing applicants')}>View</button>
                    {job.status === 'active' && (
                      <button className="btn-outline py-1.5 px-3 md:px-4 text-[11px] md:text-xs min-h-[36px] border-[#e74c3c] text-[#e74c3c]"
                        onClick={() => toast.success('Job cancelled.')}>Cancel</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Post Job */}
        {activeTab === 'post' && (
          <div className="w-full max-w-[560px] bg-[var(--card)] border border-[var(--card-border)] p-4 md:p-6 rounded-2xl">
            <h3 className="font-extrabold mb-5 text-[16px] md:text-[17px]">Post a New Job</h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-[12px] md:text-[13px] font-bold block mb-1.5">Job Title</label>
                <input className="input-field py-2.5 md:py-3 text-sm" placeholder="e.g., Farm Labour Needed for Rice Harvest"
                  value={postForm.title} onChange={e => setPostForm(f => ({ ...f, title: e.target.value }))} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[12px] md:text-[13px] font-bold block mb-1.5">Skill Required</label>
                  <select className="input-field py-2.5 md:py-3 text-sm" value={postForm.skill}
                    onChange={e => { setPostForm(f => ({ ...f, skill: e.target.value })); checkWage(postForm.wage, e.target.value); }}>
                    {Object.keys(RECOMMENDED_WAGES).map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[12px] md:text-[13px] font-bold block mb-1.5">Location</label>
                  <input className="input-field py-2.5 md:py-3 text-sm" placeholder="Village, District"
                    value={postForm.location} onChange={e => setPostForm(f => ({ ...f, location: e.target.value }))} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[12px] md:text-[13px] font-bold block mb-1.5">
                    Daily Wage (₹) — Rec: ₹{RECOMMENDED_WAGES[postForm.skill]}
                  </label>
                  <input className="input-field py-2.5 md:py-3 text-sm" type="number" placeholder="Enter wage"
                    value={postForm.wage}
                    onChange={e => { setPostForm(f => ({ ...f, wage: e.target.value })); checkWage(e.target.value, postForm.skill); }} />
                  {wageWarning && (
                    <div className="mt-2 p-2 rounded-lg bg-[rgba(243,156,18,0.15)] border border-[rgba(243,156,18,0.4)] text-[#e67e22] text-[11px] flex items-center gap-1.5">
                      <AlertTriangle size={14} className="shrink-0" /> Below recommended rate!
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-[12px] md:text-[13px] font-bold block mb-1.5">Duration (days)</label>
                  <input className="input-field py-2.5 md:py-3 text-sm" type="number" placeholder="e.g., 5"
                    value={postForm.days} onChange={e => setPostForm(f => ({ ...f, days: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="text-[12px] md:text-[13px] font-bold block mb-1.5">Job Description</label>
                <textarea className="input-field py-2.5 md:py-3 text-sm resize-y min-h-[100px]" rows={3} placeholder="Describe the work, requirements, and any special skills needed..."
                  value={postForm.desc} onChange={e => setPostForm(f => ({ ...f, desc: e.target.value }))} />
              </div>
              <button className="btn-primary w-full justify-center mt-2 min-h-[48px] py-3 text-[15px]"
                onClick={() => { toast.success('Job posted successfully! Workers will be notified. 🎉'); setActiveTab('jobs'); }}>
                <Briefcase size={18} /> Post Job
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
