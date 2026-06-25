'use client';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Search, Star, MapPin, Phone, CheckCircle2, AlertTriangle, Briefcase, MessageCircle, Map, Building } from 'lucide-react';
import toast from 'react-hot-toast';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

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
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) return null;

  const checkWage = (wage: string, skill: string) => {
    const offered = parseInt(wage);
    const recommended = RECOMMENDED_WAGES[skill] || 500;
    setWageWarning(!!wage && offered < recommended);
  };

  const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <div className="bg-[var(--bg)] min-h-[90vh] py-8 md:py-12 px-4 md:px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Employer ID Card */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-[var(--accent)] text-white rounded-3xl p-6 md:p-10 mb-8 relative overflow-hidden shadow-lg shadow-blue-900/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5 w-full md:w-auto">
              <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 shrink-0 backdrop-blur-md">
                <Building size={36} className="text-white" />
              </div>
              <div>
                <div className="text-[12px] opacity-80 mb-1 font-bold tracking-widest uppercase">EMPLOYER DASHBOARD</div>
                <div className="text-3xl md:text-4xl font-black tracking-widest leading-none mb-2">{user.userId || 'EMP000321'}</div>
                <div className="text-[16px] font-bold mb-1">{user.name}</div>
                <div className="text-[13px] text-blue-100 flex items-center gap-1.5"><MapPin size={14}/> Agriculture / Farming • Guntur</div>
              </div>
            </div>
            
            <div className="w-full md:w-auto p-4 flex flex-col items-center md:items-end">
              {user.verified && (
                <div className="mt-2"><span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/20 rounded-xl border border-white/30 text-[13px] font-bold backdrop-blur-md shadow-sm">
                  <CheckCircle2 size={16}/> Verified Employer
                </span></div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Workers Hired', value: '24', icon: <Briefcase size={24}/>, color: '#0F4C81' },
            { label: 'Active Jobs', value: '2', icon: <Search size={24}/>, color: '#2F80ED' },
            { label: 'Total Paid', value: '₹1.2L', icon: <Briefcase size={24}/>, color: '#27AE60' }, // Use generic icon
            { label: 'Avg Rating', value: '4.7★', icon: <Star size={24}/>, color: '#F39C12' },
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
            { id: 'workers', label: 'My Workers' },
            { id: 'jobs', label: 'Posted Jobs' },
            { id: 'post', label: 'Post Job' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-6 py-3 border-none bg-transparent cursor-pointer text-[14px] transition-all border-b-2 font-bold whitespace-nowrap ${activeTab === tab.id ? 'text-[var(--primary)] border-[var(--primary)]' : 'text-[var(--text-muted)] border-transparent hover:text-[var(--text)]'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === 'overview' && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
            <div className="bg-white border border-[var(--card-border)] rounded-3xl p-6 shadow-sm">
              <h3 className="text-[16px] font-extrabold text-[var(--text)] mb-6">Monthly Hiring Activity</h3>
              <div className="w-full h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MONTHLY_HIRING} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: 'var(--bg2)' }} contentStyle={{ borderRadius: '12px', border: '1px solid var(--card-border)', boxShadow: 'var(--shadow)' }} />
                    <Bar dataKey="workers" fill="var(--accent)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div>
              <h3 className="text-[16px] font-extrabold text-[var(--text)] mb-5">Quick Actions</h3>
              <div className="flex flex-col gap-4">
                {[
                  { label: 'Search Workers', icon: <Search size={18}/>, action: () => router.push('/marketplace') },
                  { label: 'Post New Job', icon: <Briefcase size={18}/>, action: () => setActiveTab('post') },
                  { label: 'Pay Salary', icon: <CheckCircle2 size={18}/>, action: () => toast.success('Payment portal opening...') },
                ].map(btn => (
                  <button key={btn.label} onClick={btn.action} className="bg-white border border-[var(--card-border)] hover:border-[var(--primary)] hover:text-[var(--primary)] text-[var(--text)] text-left px-5 py-4 min-h-[56px] text-[14px] font-bold rounded-2xl cursor-pointer transition-all shadow-sm flex items-center gap-3">
                    <div className="text-[var(--text-muted)] group-hover:text-[var(--primary)]">{btn.icon}</div>
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* My Workers */}
        {activeTab === 'workers' && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white border border-[var(--card-border)] rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-[var(--bg2)]">
                    <th className="text-[13px] text-[var(--text-muted)] font-bold p-4 border-b border-[var(--card-border)]">Worker</th>
                    <th className="text-[13px] text-[var(--text-muted)] font-bold p-4 border-b border-[var(--card-border)]">Skill</th>
                    <th className="text-[13px] text-[var(--text-muted)] font-bold p-4 border-b border-[var(--card-border)]">Wage/Day</th>
                    <th className="text-[13px] text-[var(--text-muted)] font-bold p-4 border-b border-[var(--card-border)]">Days</th>
                    <th className="text-[13px] text-[var(--text-muted)] font-bold p-4 border-b border-[var(--card-border)]">Total Paid</th>
                    <th className="text-[13px] text-[var(--text-muted)] font-bold p-4 border-b border-[var(--card-border)]">Rating</th>
                    <th className="text-[13px] text-[var(--text-muted)] font-bold p-4 border-b border-[var(--card-border)]">Status</th>
                    <th className="text-[13px] text-[var(--text-muted)] font-bold p-4 border-b border-[var(--card-border)]">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {MY_WORKERS.map(w => (
                    <tr key={w.id} className="hover:bg-[var(--bg)] transition-colors border-b border-[var(--card-border)] last:border-b-0">
                      <td className="font-bold text-[14px] text-[var(--text)] p-4">{w.name}</td>
                      <td className="text-[14px] text-[var(--text)] p-4 font-medium">{w.skill}</td>
                      <td className="text-[14px] text-[var(--primary)] p-4 font-black">₹{w.wage}</td>
                      <td className="text-[14px] text-[var(--text)] p-4">{w.days}</td>
                      <td className="text-[15px] text-[#27AE60] p-4 font-black">₹{w.totalPaid.toLocaleString('en-IN')}</td>
                      <td className="text-[13px] text-[var(--text-muted)] font-bold p-4 flex items-center gap-1 mt-1"><Star size={14} className="text-[#F39C12] fill-current" /> {w.rating}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${w.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                          {w.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <button onClick={() => toast.success(`Message sent to ${w.name}`)}
                          className="bg-[var(--bg2)] hover:bg-[var(--card-border)] text-[var(--text)] border-none py-2 px-3 rounded-lg text-[12px] font-bold cursor-pointer transition-colors flex items-center gap-1.5">
                          <MessageCircle size={14} /> Message
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Posted Jobs */}
        {activeTab === 'jobs' && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex flex-col gap-4">
            {JOBS_POSTED.map(job => (
              <div key={job.id} className="bg-white border border-[var(--card-border)] rounded-2xl p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-1">
                  <div className="font-bold text-[16px] text-[var(--text)] mb-2">{job.title}</div>
                  <div className="text-[13px] text-[var(--text-muted)] mb-1.5 flex items-center gap-1.5 font-medium">
                    <Briefcase size={14}/> {job.skill} • <MapPin size={14}/> {job.location} • Posted: {job.postedDate}
                  </div>
                  <div className="text-[13px] font-bold text-[var(--accent)] flex items-center gap-1.5">
                    <Search size={14}/> {job.applicants} applicants reviewing
                  </div>
                </div>
                
                <div className="flex items-center justify-between md:flex-row md:justify-end gap-4 w-full md:w-auto border-t border-[var(--card-border)] pt-4 md:border-none md:pt-0">
                  <div className="flex flex-col gap-1 md:items-end">
                    <div className="font-black text-[20px] text-[var(--primary)]">₹{job.wage}<span className="text-[13px] text-[var(--text-muted)] font-medium">/day</span></div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${job.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-600'}`}>{job.status}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-[var(--accent)] hover:bg-blue-600 text-white border-none py-2 px-4 rounded-xl text-[13px] font-bold cursor-pointer transition-colors" onClick={() => toast.success('Viewing applicants')}>View</button>
                    {job.status === 'active' && (
                      <button className="bg-white text-red-500 border border-red-500 py-2 px-4 rounded-xl text-[13px] font-bold cursor-pointer hover:bg-red-50 transition-colors"
                        onClick={() => toast.success('Job cancelled.')}>Cancel</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Post Job */}
        {activeTab === 'post' && (
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="w-full max-w-[600px] bg-white border border-[var(--card-border)] p-6 md:p-8 rounded-3xl shadow-sm">
            <h3 className="text-[18px] font-extrabold text-[var(--text)] mb-6 flex items-center gap-2"><Briefcase size={20} className="text-[var(--accent)]"/> Post a New Job</h3>
            <div className="flex flex-col gap-5">
              <div>
                <label className="text-[13px] font-bold block mb-2 text-[var(--text)]">Job Title</label>
                <input className="w-full px-4 py-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg)] text-[14px] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all font-medium" placeholder="e.g., Farm Labour Needed for Rice Harvest"
                  value={postForm.title} onChange={e => setPostForm(f => ({ ...f, title: e.target.value }))} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-[13px] font-bold block mb-2 text-[var(--text)]">Skill Required</label>
                  <select className="w-full px-4 py-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg)] text-[14px] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all font-medium" value={postForm.skill}
                    onChange={e => { setPostForm(f => ({ ...f, skill: e.target.value })); checkWage(postForm.wage, e.target.value); }}>
                    {Object.keys(RECOMMENDED_WAGES).map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[13px] font-bold block mb-2 text-[var(--text)]">Location</label>
                  <input className="w-full px-4 py-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg)] text-[14px] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all font-medium" placeholder="Village, District"
                    value={postForm.location} onChange={e => setPostForm(f => ({ ...f, location: e.target.value }))} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-[13px] font-bold block mb-2 text-[var(--text)]">
                    Daily Wage (₹) — Rec: <span className="text-[var(--success)] font-black">₹{RECOMMENDED_WAGES[postForm.skill]}</span>
                  </label>
                  <input className="w-full px-4 py-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg)] text-[14px] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all font-medium" type="number" placeholder="Enter wage"
                    value={postForm.wage}
                    onChange={e => { setPostForm(f => ({ ...f, wage: e.target.value })); checkWage(e.target.value, postForm.skill); }} />
                  {wageWarning && (
                    <div className="mt-2.5 p-3 rounded-xl bg-orange-50 border border-orange-200 text-orange-600 text-[12px] font-bold flex items-center gap-2">
                      <AlertTriangle size={16} className="shrink-0" /> Below recommended rate!
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-[13px] font-bold block mb-2 text-[var(--text)]">Duration (days)</label>
                  <input className="w-full px-4 py-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg)] text-[14px] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all font-medium" type="number" placeholder="e.g., 5"
                    value={postForm.days} onChange={e => setPostForm(f => ({ ...f, days: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="text-[13px] font-bold block mb-2 text-[var(--text)]">Job Description</label>
                <textarea className="w-full px-4 py-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg)] text-[14px] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all font-medium resize-y min-h-[120px]" placeholder="Describe the work, requirements, and any special skills needed..."
                  value={postForm.desc} onChange={e => setPostForm(f => ({ ...f, desc: e.target.value }))} />
              </div>
              <button className="bg-[var(--primary)] hover:bg-[var(--primary-light)] text-white border-none py-4 rounded-xl text-[15px] font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-900/20 transition-all mt-2"
                onClick={() => { toast.success('Job posted successfully! Workers will be notified. 🎉'); setActiveTab('jobs'); }}>
                <CheckCircle2 size={20} /> Post Job
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
