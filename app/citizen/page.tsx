'use client';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FileText, Bell, MessageCircle, CheckCircle, Clock, AlertCircle, Lock, ChevronRight, User, BookOpen, Wheat, ShieldCheck, Map } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const APPLICATIONS = [
  { id: 'APP001', service: 'Income Certificate', date: '2024-01-15', status: 'approved', refNo: 'TS2024001234' },
  { id: 'APP002', service: 'Caste Certificate', date: '2024-01-20', status: 'pending', refNo: 'TS2024005678' },
  { id: 'APP003', service: 'Ration Card Renewal', date: '2024-02-01', status: 'processing', refNo: 'CS2024009012' },
];

const NOTIFICATIONS = [
  { icon: <CheckCircle size={16} />, title: 'Application Approved', desc: 'Your Income Certificate is ready to download', time: '2h ago', color: 'var(--success)' },
  { icon: <AlertCircle size={16} />, title: 'PM Kisan Installment', desc: '₹2,000 credited to your bank account', time: '1d ago', color: 'var(--warning)' },
  { icon: <Clock size={16} />, title: 'Scholarship Deadline', desc: 'PRERANA scholarship deadline: Feb 28', time: '2d ago', color: 'var(--primary)' },
];

const QUICK_SERVICES = [
  { href: '/government', icon: <FileText size={24} />, label: 'Apply Certificate', color: '#0F4C81' },
  { href: '/students', icon: <BookOpen size={24} />, label: 'Scholarships', color: '#8E44AD' },
  { href: '/farmers', icon: <Wheat size={24} />, label: 'Farm Schemes', color: '#27AE60' },
  { href: '/digital-locker', icon: <Lock size={24} />, label: 'My Documents', color: '#16A085' },
  { href: '/awareness', icon: <ShieldCheck size={24} />, label: 'Digital Safety', color: '#E91E63' },
  { href: '/maps', icon: <Map size={24} />, label: 'Find Centers', color: '#E67E22' },
];

export default function CitizenDashboard() {
  const { user, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.push('/login');
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) return null;

  const statusColor = (s: string) => s === 'approved' ? 'var(--success)' : s === 'pending' ? 'var(--warning)' : 'var(--primary)';
  const statusIcon = (s: string) => s === 'approved' ? <CheckCircle size={14} /> : s === 'pending' ? <Clock size={14} /> : <AlertCircle size={14} />;

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="bg-[var(--bg)] min-h-[90vh] py-8 md:py-12 px-4 md:px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Welcome Banner */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-[var(--primary)] text-white rounded-3xl p-6 md:p-10 mb-8 relative overflow-hidden shadow-lg shadow-blue-900/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="text-[12px] opacity-80 mb-2 font-bold tracking-widest uppercase">CITIZEN DASHBOARD</div>
              <h1 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">Welcome, {user.name}!</h1>
              <div className="text-[14px] opacity-90 font-medium font-mono">ID: {user.userId}</div>
              {user.verified && (
                <div className="mt-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/20 border border-green-500/30 text-green-100 text-[12px] font-bold">
                    <CheckCircle size={14} /> Verified Citizen
                  </span>
                </div>
              )}
            </div>
            <div className="hidden sm:flex flex-col items-end">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-3 border border-white/20 backdrop-blur-md">
                <User size={32} className="text-white" />
              </div>
              <div className="text-[13px] opacity-80 font-medium">{user.mobile}</div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Quick Services */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="lg:col-span-2">
            <h2 className="text-[18px] font-extrabold text-[var(--text)] mb-5">Quick Access</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {QUICK_SERVICES.map(svc => (
                <Link key={svc.href} href={svc.href} className="no-underline block h-full">
                  <div className="bg-white border border-[var(--card-border)] hover:border-[var(--primary)] rounded-2xl flex flex-col items-center justify-center p-5 h-full transition-all duration-300 hover:shadow-md group">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110" style={{ background: `${svc.color}15`, color: svc.color }}>
                      {svc.icon}
                    </div>
                    <div className="text-[13px] font-bold text-center text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">{svc.label}</div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[18px] font-extrabold text-[var(--text)] flex items-center gap-2">
                <Bell size={20} className="text-[var(--primary)]" /> Notifications
              </h2>
            </div>
            <div className="flex flex-col gap-3">
              {NOTIFICATIONS.map((n, i) => (
                <div key={i} className="bg-white border border-[var(--card-border)] rounded-2xl p-4 flex gap-4 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: n.color }} />
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 ml-1" style={{ background: `${n.color}15`, color: n.color }}>
                    {n.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-[14px] text-[var(--text)] mb-1 leading-tight truncate">{n.title}</div>
                    <div className="text-[13px] text-[var(--text-muted)] leading-snug line-clamp-2">{n.desc}</div>
                    <div className="text-[11px] text-[var(--text-light)] mt-2 font-medium font-mono">{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Applications Table */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <h2 className="text-[18px] font-extrabold text-[var(--text)] flex items-center gap-2">
              <FileText size={20} className="text-[var(--primary)]" /> My Applications
            </h2>
            <Link href="/government" className="no-underline">
              <button className="btn-primary py-2.5 px-5 text-[14px] rounded-xl shadow-md">
                + New Application
              </button>
            </Link>
          </div>

          <div className="bg-white border border-[var(--card-border)] rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-[var(--bg2)]">
                    <th className="text-[13px] text-[var(--text-muted)] font-bold p-4 border-b border-[var(--card-border)]">App ID</th>
                    <th className="text-[13px] text-[var(--text-muted)] font-bold p-4 border-b border-[var(--card-border)]">Service</th>
                    <th className="text-[13px] text-[var(--text-muted)] font-bold p-4 border-b border-[var(--card-border)]">Date</th>
                    <th className="text-[13px] text-[var(--text-muted)] font-bold p-4 border-b border-[var(--card-border)]">Reference No.</th>
                    <th className="text-[13px] text-[var(--text-muted)] font-bold p-4 border-b border-[var(--card-border)]">Status</th>
                    <th className="text-[13px] text-[var(--text-muted)] font-bold p-4 border-b border-[var(--card-border)]">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {APPLICATIONS.map((app, i) => (
                    <tr key={app.id} className="hover:bg-[var(--bg)] transition-colors border-b border-[var(--card-border)] last:border-b-0">
                      <td className="font-bold text-[14px] text-[var(--text)] p-4">{app.id}</td>
                      <td className="text-[14px] text-[var(--text)] p-4 font-medium">{app.service}</td>
                      <td className="text-[13px] text-[var(--text-muted)] p-4">{app.date}</td>
                      <td className="font-mono text-[13px] text-[var(--text-muted)] p-4">{app.refNo}</td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1.5 font-bold text-[12px] px-3 py-1.5 rounded-full" style={{ background: `${statusColor(app.status)}15`, color: statusColor(app.status) }}>
                          {statusIcon(app.status)} <span className="capitalize">{app.status}</span>
                        </span>
                      </td>
                      <td className="p-4">
                        <button onClick={() => toast.success(`Tracking ${app.refNo}`)}
                          className="bg-transparent border-none text-[var(--primary)] hover:text-[var(--primary-light)] cursor-pointer text-[13px] font-bold active:scale-95 transition-all">
                          Track Status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Bottom Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Digital Locker Preview */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white border border-[var(--card-border)] rounded-2xl p-6 shadow-sm flex flex-col hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[16px] font-extrabold text-[var(--text)] flex items-center gap-2">
                <Lock size={18} className="text-[#16A085]" /> Digital Locker
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[{ icon: <FileText size={24} />, name: 'Aadhaar', color: '#0F4C81' }, { icon: <FileText size={24} />, name: 'PAN', color: '#0B6E4F' }, { icon: <FileText size={24} />, name: 'Residence', color: '#2F80ED' }].map(doc => (
                <div key={doc.name} className="text-center p-4 rounded-xl bg-[var(--bg2)] border border-[var(--card-border)] group hover:border-[var(--primary)] transition-colors cursor-pointer">
                  <div className="flex justify-center mb-2 text-[var(--text-light)] group-hover:text-[var(--primary)] transition-colors" style={{ color: doc.color }}>{doc.icon}</div>
                  <div className="text-[12px] font-bold text-[var(--text)]">{doc.name}</div>
                </div>
              ))}
            </div>
            <Link href="/digital-locker" className="no-underline mt-auto">
              <button className="w-full bg-[var(--bg2)] hover:bg-[var(--card-border)] text-[var(--text)] border-none py-3 rounded-xl text-[14px] font-bold flex items-center justify-center gap-2 transition-colors">
                Manage Documents <ChevronRight size={16} />
              </button>
            </Link>
          </motion.div>

          {/* AI Chatbot */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-[var(--secondary)] rounded-2xl p-6 text-white shadow-md flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />
            <h3 className="text-[18px] font-extrabold mb-2 flex items-center gap-2">
              <MessageCircle size={20} /> AI Assistant
            </h3>
            <p className="text-[14px] text-green-100 mb-6 leading-relaxed max-w-[90%]">Get instant answers about government services, schemes, and applications in your local language.</p>
            <div className="flex flex-col gap-3 mb-6">
              {['How to apply for income certificate?', 'PM Kisan registration steps', 'Scholarship eligibility'].map(q => (
                <div key={q} className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-[13px] font-medium cursor-pointer transition-colors backdrop-blur-sm flex items-center gap-2">
                  <MessageCircle size={14} className="opacity-70" /> {q}
                </div>
              ))}
            </div>
            <button onClick={() => toast.success('Chatbot opened! Click the green button at bottom right.')}
              className="mt-auto w-full bg-white hover:bg-green-50 text-[var(--secondary)] border-none py-3 rounded-xl text-[14px] font-bold flex items-center justify-center gap-2 transition-colors shadow-sm">
              <MessageCircle size={18} /> Open AI Chatbot
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
