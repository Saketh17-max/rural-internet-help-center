'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { LogIn, Eye, EyeOff, Loader2, User, Briefcase, Building2, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import { UserRole } from '@/contexts/AuthContext';

const ROLES: { id: UserRole; icon: React.ReactNode; label: string; color: string }[] = [
  { id: 'citizen', icon: <User size={20} />, label: 'Citizen', color: '#1a6b3a' },
  { id: 'worker', icon: <Briefcase size={20} />, label: 'Worker', color: '#1b4f72' },
  { id: 'employer', icon: <Building2 size={20} />, label: 'Employer', color: '#e67e22' },
];

export default function LoginPage() {
  const { t } = useLanguage();
  const { login } = useAuth();
  const router = useRouter();
  const [role, setRole] = useState<UserRole>('citizen');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Please fill all fields'); return; }
    setLoading(true);
    try {
      const success = await login(email, password, role);
      if (success) {
        toast.success('Login successful! Welcome back 🙏');
        router.push(`/${role}`);
      } else {
        toast.error('Invalid credentials. Try demo123 as password.');
      }
    } finally {
      setLoading(false);
    }
  };

  const demoLogin = async (demoRole: UserRole, demoEmail: string) => {
    setLoading(true);
    setRole(demoRole);
    const success = await login(demoEmail, 'demo123', demoRole);
    if (success) {
      toast.success('Demo login successful!');
      router.push(`/${demoRole}`);
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: 'var(--bg)' }}>
      <div style={{ width: '100%', maxWidth: 480 }}>
        {/* Card */}
        <div className="glass-card" style={{ padding: '40px 36px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🙏</div>
            <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 6 }}>{t('loginTitle')}</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>{t('loginDesc')}</p>
          </div>

          {/* Role Selector */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 10 }}>{t('selectRole')}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {ROLES.map(r => (
                <button key={r.id} onClick={() => setRole(r.id)}
                  style={{
                    padding: '10px 8px', borderRadius: 10, cursor: 'pointer',
                    border: role === r.id ? `2px solid ${r.color}` : '2px solid var(--card-border)',
                    background: role === r.id ? `${r.color}15` : 'transparent',
                    color: role === r.id ? r.color : 'var(--text-muted)',
                    fontWeight: role === r.id ? 700 : 500, fontSize: 13,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                    transition: 'all 0.2s',
                  }}
                >
                  {r.icon}
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
                {t('mobile')} / {t('email')}
              </label>
              <input
                className="input-field"
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="9876543210 or email@example.com"
                autoComplete="username"
              />
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>{t('password')}</label>
              <div style={{ position: 'relative' }}>
                <input
                  className="input-field"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password"
                  style={{ paddingRight: 44 }}
                  autoComplete="current-password"
                />
                <button type="button"
                  onClick={() => setShowPass(o => !o)}
                  style={{
                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)',
                  }}
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div style={{ textAlign: 'right', marginTop: 4 }}>
                <span style={{ fontSize: 12, color: 'var(--primary)', cursor: 'pointer' }}>{t('forgotPassword')}</span>
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }} disabled={loading}>
              {loading ? <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <LogIn size={18} />}
              {loading ? t('loading') : t('login')}
            </button>
          </form>

          {/* Demo Login */}
          <div style={{ margin: '24px 0', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ flex: 1, height: 1, background: 'var(--card-border)' }} />
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Quick Demo</span>
              <div style={{ flex: 1, height: 1, background: 'var(--card-border)' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              <button onClick={() => demoLogin('citizen', 'priya@example.com')}
                style={{ padding: '8px', borderRadius: 8, border: '1px solid var(--card-border)', background: 'var(--bg2)', cursor: 'pointer', fontSize: 12, color: 'var(--text)' }}>
                👤 Citizen
              </button>
              <button onClick={() => demoLogin('worker', 'raju@example.com')}
                style={{ padding: '8px', borderRadius: 8, border: '1px solid var(--card-border)', background: 'var(--bg2)', cursor: 'pointer', fontSize: 12, color: 'var(--text)' }}>
                👷 Worker
              </button>
              <button onClick={() => demoLogin('employer', 'sunita@example.com')}
                style={{ padding: '8px', borderRadius: 8, border: '1px solid var(--card-border)', background: 'var(--bg2)', cursor: 'pointer', fontSize: 12, color: 'var(--text)' }}>
                🏢 Employer
              </button>
            </div>
          </div>

          {/* Security Note */}
          <div style={{
            display: 'flex', gap: 8, padding: '12px 14px', borderRadius: 10,
            background: 'rgba(26,107,58,0.08)', border: '1px solid rgba(26,107,58,0.2)',
            marginBottom: 20,
          }}>
            <Shield size={16} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: 2 }} />
            <span style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Secured by Aadhaar-linked OTP verification. We never share your data.
            </span>
          </div>

          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-muted)' }}>
            {t('noAccount')}{' '}
            <Link href="/register" style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>{t('register')}</Link>
          </p>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
