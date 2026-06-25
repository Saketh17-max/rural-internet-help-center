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
  }, [isAuthenticated]);

  if (!isAuthenticated || !user) return null;

  const statusColor = (s: string) => s === 'approved' ? '#27ae60' : s === 'pending' ? '#f39c12' : '#2980b9';
  const statusIcon = (s: string) => s === 'approved' ? <CheckCircle size={13} /> : s === 'pending' ? <Clock size={13} /> : <AlertCircle size={13} />;

  return (
    <div style={{ background: 'var(--bg)', minHeight: '90vh', padding: '32px 20px' }}>
      <div className="page-container">
        {/* Welcome Banner */}
        <div className="id-card" style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
            <div>
              <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 4 }}>CITIZEN DASHBOARD</div>
              <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 4 }}>Welcome, {user.name}! 🙏</h1>
              <div style={{ fontSize: 13, opacity: 0.8 }}>ID: {user.userId}</div>
              {user.verified && <div style={{ marginTop: 8 }}><span className="badge badge-verified" style={{ fontSize: 12 }}>✓ Verified Citizen</span></div>}
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 38 }}>👤</div>
              <div style={{ fontSize: 11, opacity: 0.7, marginTop: 4 }}>{user.mobile}</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginBottom: 28 }}>
          {/* Quick Services */}
          <div style={{ gridColumn: '1 / 3' }}>
            <h2 style={{ fontWeight: 800, marginBottom: 16, fontSize: 17 }}>Quick Access</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {QUICK_SERVICES.map(svc => (
                <Link key={svc.href} href={svc.href} style={{ textDecoration: 'none' }}>
                  <div className="service-card" style={{ padding: '16px 12px', gap: 8 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: `${svc.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{svc.icon}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', textAlign: 'center' }}>{svc.label}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div>
            <h2 style={{ fontWeight: 800, marginBottom: 16, fontSize: 17, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Bell size={17} /> Notifications
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {NOTIFICATIONS.map((n, i) => (
                <div key={i} className="notification-item">
                  <div className="notification-dot" style={{ background: n.color }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{n.icon} {n.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.4 }}>{n.desc}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-light)', marginTop: 2 }}>{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ fontWeight: 800, fontSize: 17, display: 'flex', alignItems: 'center', gap: 8 }}>
              <FileText size={17} /> My Applications
            </h2>
            <Link href="/government">
              <button className="btn-outline" style={{ padding: '6px 16px', fontSize: 13 }}>+ New Application</button>
            </Link>
          </div>

          <div style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 16, overflow: 'hidden' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>App ID</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Reference No.</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {APPLICATIONS.map(app => (
                  <tr key={app.id}>
                    <td style={{ fontWeight: 600, fontSize: 13 }}>{app.id}</td>
                    <td>{app.service}</td>
                    <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{app.date}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{app.refNo}</td>
                    <td>
                      <span className="badge" style={{ background: `${statusColor(app.status)}20`, color: statusColor(app.status), display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        {statusIcon(app.status)} {app.status}
                      </span>
                    </td>
                    <td>
                      <button onClick={() => toast.success(`Tracking ${app.refNo}`)}
                        style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                        Track
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 24 }}>
          {/* Digital Locker Preview */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 16, padding: 24 }}>
            <h3 style={{ fontWeight: 800, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8, fontSize: 15 }}>
              <Lock size={16} /> Digital Locker
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 14 }}>
              {[{ icon: '🔵', name: 'Aadhaar' }, { icon: '💳', name: 'PAN' }, { icon: '🏠', name: 'Residence' }].map(doc => (
                <div key={doc.name} style={{ textAlign: 'center', padding: '12px 8px', borderRadius: 10, background: 'var(--bg2)', fontSize: 11 }}>
                  <div style={{ fontSize: 24, marginBottom: 4 }}>{doc.icon}</div>
                  {doc.name}
                </div>
              ))}
            </div>
            <Link href="/digital-locker">
              <button className="btn-outline" style={{ width: '100%', justifyContent: 'center', fontSize: 13 }}>Manage Documents <ChevronRight size={14} /></button>
            </Link>
          </div>

          {/* AI Chatbot */}
          <div style={{ background: 'linear-gradient(135deg, #1a6b3a, #1b4f72)', borderRadius: 16, padding: 24, color: 'white' }}>
            <h3 style={{ fontWeight: 800, marginBottom: 8, fontSize: 15 }}>🤖 AI Assistant</h3>
            <p style={{ fontSize: 13, opacity: 0.8, marginBottom: 16, lineHeight: 1.6 }}>Get instant answers about government services, schemes, and applications in your language.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
              {['How to apply for income certificate?', 'PM Kisan registration steps', 'Scholarship eligibility'].map(q => (
                <div key={q} style={{ padding: '6px 12px', borderRadius: 20, background: 'rgba(255,255,255,0.12)', fontSize: 12, cursor: 'pointer' }}>💬 {q}</div>
              ))}
            </div>
            <button onClick={() => toast.success('Chatbot opened! Click the green button at bottom right.')}
              style={{ width: '100%', padding: '10px', borderRadius: 10, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
              <MessageCircle size={14} style={{ display: 'inline', marginRight: 6 }} /> Open AI Chatbot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
