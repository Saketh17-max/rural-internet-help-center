'use client';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FileText, Bell, MessageCircle, Search, CheckCircle, Clock, AlertCircle, Lock, TrendingUp, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

const APPLICATIONS = [
  { id: 'APP001', service: 'Income Certificate', date: '2024-01-15', status: 'approved', refNo: 'TS2024001234' },
  { id: 'APP002', service: 'Caste Certificate', date: '2024-01-20', status: 'pending', refNo: 'TS2024005678' },
  { id: 'APP003', service: 'Ration Card Renewal', date: '2024-02-01', status: 'processing', refNo: 'CS2024009012' },
];

const NOTIFICATIONS = [
  { icon: '✅', title: 'Application Approved', desc: 'Your Income Certificate is ready to download', time: '2h ago', color: '#27ae60' },
  { icon: '📢', title: 'PM Kisan Installment', desc: '₹2,000 credited to your bank account', time: '1d ago', color: '#f39c12' },
  { icon: '📅', title: 'Scholarship Deadline', desc: 'PRERANA scholarship deadline: Feb 28', time: '2d ago', color: '#2980b9' },
];

const QUICK_SERVICES = [
  { href: '/government', icon: '🏛️', label: 'Apply Certificate', color: '#1a6b3a' },
  { href: '/students', icon: '🎓', label: 'Scholarships', color: '#8e44ad' },
  { href: '/farmers', icon: '🌾', label: 'Farm Schemes', color: '#27ae60' },
  { href: '/digital-locker', icon: '🔒', label: 'My Documents', color: '#1b4f72' },
  { href: '/awareness', icon: '🛡️', label: 'Digital Safety', color: '#e74c3c' },
  { href: '/maps', icon: '🗺️', label: 'Find Centers', color: '#e67e22' },
];

export default function CitizenDashboard() {
  const { user, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.push('/login');
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) return null;

  const statusColor = (s: string) => s === 'approved' ? '#27ae60' : s === 'pending' ? '#f39c12' : '#2980b9';
  const statusIcon = (s: string) => s === 'approved' ? <CheckCircle size={13} /> : s === 'pending' ? <Clock size={13} /> : <AlertCircle size={13} />;

  return (
    <div className="bg-[var(--bg)] min-h-[90vh] py-6 md:py-10 px-4 md:px-6">
      <div className="page-container">
        {/* Welcome Banner */}
        <div className="id-card mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 md:gap-5 relative z-10">
            <div>
              <div className="text-[11px] md:text-[12px] opacity-80 mb-1 font-bold tracking-wider">CITIZEN DASHBOARD</div>
              <h1 className="text-[20px] md:text-[24px] font-black mb-1">Welcome, {user.name}! 🙏</h1>
              <div className="text-[12px] md:text-[13px] opacity-90 font-medium">ID: {user.userId}</div>
              {user.verified && <div className="mt-2 md:mt-3"><span className="badge badge-verified text-[11px] md:text-[12px] px-2.5 py-1">✓ Verified Citizen</span></div>}
            </div>
            <div className="hidden sm:block text-right">
              <div className="text-[32px] md:text-[38px] mb-1">👤</div>
              <div className="text-[11px] opacity-80 font-medium">{user.mobile}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Quick Services */}
          <div className="lg:col-span-2">
            <h2 className="font-extrabold mb-4 text-[16px] md:text-[17px]">Quick Access</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
              {QUICK_SERVICES.map(svc => (
                <Link key={svc.href} href={svc.href} className="no-underline block h-full">
                  <div className="service-card flex flex-col items-center justify-center p-3.5 md:p-4 h-full transition-transform active:scale-95 shadow-sm">
                    <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center text-[20px] md:text-[22px] mb-2.5" style={{ background: `${svc.color}15` }}>{svc.icon}</div>
                    <div className="text-[11px] md:text-[12px] font-bold text-center text-[var(--text)]">{svc.label}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div>
            <h2 className="font-extrabold mb-4 text-[16px] md:text-[17px] flex items-center gap-2">
              <Bell size={17} /> Notifications
            </h2>
            <div className="flex flex-col gap-2.5 md:gap-3">
              {NOTIFICATIONS.map((n, i) => (
                <div key={i} className="notification-item bg-[var(--card)] border border-[var(--card-border)] rounded-xl p-3.5 md:p-4 flex gap-3 relative overflow-hidden shadow-sm">
                  <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5" style={{ background: n.color }} />
                  <div className="flex-1 min-w-0 pl-1 md:pl-2">
                    <div className="font-bold text-[12px] md:text-[13px] mb-0.5 leading-tight">{n.icon} {n.title}</div>
                    <div className="text-[11px] text-[var(--text-muted)] leading-snug">{n.desc}</div>
                    <div className="text-[10px] text-[var(--text-light)] mt-1 font-medium">{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h2 className="font-extrabold text-[16px] md:text-[17px] flex items-center gap-2">
              <FileText size={17} /> My Applications
            </h2>
            <Link href="/government" className="no-underline w-full sm:w-auto">
              <button className="btn-outline w-full sm:w-auto justify-center py-2 px-4 text-[12px] md:text-[13px] min-h-[40px]">
                + New Application
              </button>
            </Link>
          </div>

          <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl md:rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="data-table w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr>
                    <th className="text-[11px] md:text-[12px] text-[var(--text-muted)] font-bold p-3 md:p-4 bg-[var(--bg2)] border-b border-[var(--card-border)]">App ID</th>
                    <th className="text-[11px] md:text-[12px] text-[var(--text-muted)] font-bold p-3 md:p-4 bg-[var(--bg2)] border-b border-[var(--card-border)]">Service</th>
                    <th className="text-[11px] md:text-[12px] text-[var(--text-muted)] font-bold p-3 md:p-4 bg-[var(--bg2)] border-b border-[var(--card-border)]">Date</th>
                    <th className="text-[11px] md:text-[12px] text-[var(--text-muted)] font-bold p-3 md:p-4 bg-[var(--bg2)] border-b border-[var(--card-border)]">Reference No.</th>
                    <th className="text-[11px] md:text-[12px] text-[var(--text-muted)] font-bold p-3 md:p-4 bg-[var(--bg2)] border-b border-[var(--card-border)]">Status</th>
                    <th className="text-[11px] md:text-[12px] text-[var(--text-muted)] font-bold p-3 md:p-4 bg-[var(--bg2)] border-b border-[var(--card-border)]">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {APPLICATIONS.map((app, i) => (
                    <tr key={app.id} className={i !== APPLICATIONS.length - 1 ? 'border-b border-[var(--card-border)]' : ''}>
                      <td className="font-bold text-[12px] md:text-[13px] p-3 md:p-4">{app.id}</td>
                      <td className="text-[12px] md:text-[13px] p-3 md:p-4 font-medium">{app.service}</td>
                      <td className="text-[12px] md:text-[13px] text-[var(--text-muted)] p-3 md:p-4">{app.date}</td>
                      <td className="font-mono text-[11px] md:text-[12px] p-3 md:p-4">{app.refNo}</td>
                      <td className="p-3 md:p-4">
                        <span className="badge font-bold text-[10px] md:text-[11px] px-2 py-1 inline-flex items-center gap-1" style={{ background: `${statusColor(app.status)}15`, color: statusColor(app.status) }}>
                          {statusIcon(app.status)} <span className="capitalize">{app.status}</span>
                        </span>
                      </td>
                      <td className="p-3 md:p-4">
                        <button onClick={() => toast.success(`Tracking ${app.refNo}`)}
                          className="bg-transparent border-none text-[var(--primary)] cursor-pointer text-[12px] md:text-[13px] font-bold active:scale-95 transition-transform">
                          Track
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 mt-6 md:mt-8">
          {/* Digital Locker Preview */}
          <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-xl md:rounded-2xl p-5 md:p-6 shadow-sm flex flex-col">
            <h3 className="font-extrabold mb-4 flex items-center gap-2 text-[14px] md:text-[15px]">
              <Lock size={16} /> Digital Locker
            </h3>
            <div className="grid grid-cols-3 gap-2.5 md:gap-3 mb-4 md:mb-5">
              {[{ icon: '🔵', name: 'Aadhaar' }, { icon: '💳', name: 'PAN' }, { icon: '🏠', name: 'Residence' }].map(doc => (
                <div key={doc.name} className="text-center p-3 rounded-xl bg-[var(--bg2)] border border-[var(--card-border)]">
                  <div className="text-[20px] md:text-[24px] mb-1">{doc.icon}</div>
                  <div className="text-[10px] md:text-[11px] font-bold">{doc.name}</div>
                </div>
              ))}
            </div>
            <Link href="/digital-locker" className="no-underline mt-auto">
              <button className="btn-outline w-full justify-center text-[12px] md:text-[13px] min-h-[44px]">Manage Documents <ChevronRight size={14} className="ml-1" /></button>
            </Link>
          </div>

          {/* AI Chatbot */}
          <div className="bg-gradient-to-br from-[#1a6b3a] to-[#1b4f72] rounded-xl md:rounded-2xl p-5 md:p-6 text-white shadow-md flex flex-col">
            <h3 className="font-extrabold mb-2 text-[14px] md:text-[15px]">🤖 AI Assistant</h3>
            <p className="text-[12px] md:text-[13px] opacity-90 mb-4 leading-relaxed">Get instant answers about government services, schemes, and applications in your language.</p>
            <div className="flex flex-col gap-2 mb-4 md:mb-5">
              {['How to apply for income certificate?', 'PM Kisan registration steps', 'Scholarship eligibility'].map(q => (
                <div key={q} className="p-2 md:p-2.5 rounded-lg bg-[rgba(255,255,255,0.15)] text-[11px] md:text-[12px] font-medium cursor-pointer hover:bg-[rgba(255,255,255,0.2)] transition-colors">💬 {q}</div>
              ))}
            </div>
            <button onClick={() => toast.success('Chatbot opened! Click the green button at bottom right.')}
              className="w-full py-2.5 px-4 rounded-xl bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.4)] text-white cursor-pointer text-[12px] md:text-[13px] font-bold hover:bg-[rgba(255,255,255,0.3)] transition-colors min-h-[44px] flex items-center justify-center gap-1.5 mt-auto shadow-none">
              <MessageCircle size={15} /> Open AI Chatbot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
