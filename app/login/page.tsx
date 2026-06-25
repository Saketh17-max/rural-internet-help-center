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
  { id: 'citizen', icon: <User size={18} />, label: 'Citizen', color: '#1a6b3a' },
  { id: 'worker', icon: <Briefcase size={18} />, label: 'Worker', color: '#1b4f72' },
  { id: 'employer', icon: <Building2 size={18} />, label: 'Employer', color: '#e67e22' },
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
    <div className="min-h-[90vh] flex items-center justify-center p-4 md:p-10 bg-[var(--bg)]">
      <div className="w-full max-w-[480px]">
        {/* Card */}
        <div className="glass-card p-5 md:p-9 shadow-lg">
          {/* Header */}
          <div className="text-center mb-6 md:mb-8">
            <div className="text-[40px] md:text-[48px] mb-2 md:mb-3">🙏</div>
            <h1 className="text-[22px] md:text-[26px] font-black mb-1.5">{t('loginTitle')}</h1>
            <p className="text-[var(--text-muted)] text-[13px] md:text-[14px] leading-relaxed px-4">{t('loginDesc')}</p>
          </div>

          {/* Role Selector */}
          <div className="mb-6 md:mb-8">
            <div className="text-[12px] md:text-[13px] font-bold text-[var(--text-muted)] mb-2.5 md:mb-3 px-1">{t('selectRole')}</div>
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              {ROLES.map(r => (
                <button key={r.id} onClick={() => setRole(r.id)}
                  className="flex flex-col items-center gap-1.5 md:gap-2 p-2.5 md:p-3 rounded-xl cursor-pointer transition-all active:scale-95"
                  style={{
                    border: role === r.id ? `2px solid ${r.color}` : '2px solid var(--card-border)',
                    background: role === r.id ? `${r.color}10` : 'var(--bg2)',
                    color: role === r.id ? r.color : 'var(--text-muted)',
                  }}
                >
                  <span className={`${role === r.id ? 'scale-110' : ''} transition-transform`}>{r.icon}</span>
                  <span className={`text-[11px] md:text-[13px] ${role === r.id ? 'font-bold' : 'font-medium'}`}>{r.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="text-[12px] md:text-[13px] font-bold block mb-1.5 md:mb-2 px-1">
                {t('mobile')} / {t('email')}
              </label>
              <input
                className="input-field w-full py-2.5 md:py-3 px-4 text-[14px]"
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="9876543210 or email@example.com"
                autoComplete="username"
              />
            </div>

            <div>
              <label className="text-[12px] md:text-[13px] font-bold block mb-1.5 md:mb-2 px-1">{t('password')}</label>
              <div className="relative">
                <input
                  className="input-field w-full py-2.5 md:py-3 pl-4 pr-11 text-[14px]"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password"
                  autoComplete="current-password"
                />
                <button type="button"
                  onClick={() => setShowPass(o => !o)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-[var(--text-muted)] p-1 active:scale-90 transition-transform"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="text-right mt-1.5 px-1">
                <span className="text-[11px] md:text-[12px] text-[var(--primary)] font-bold cursor-pointer hover:underline">{t('forgotPassword')}</span>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full justify-center min-h-[48px] mt-2 md:mt-3 text-[14px] font-bold shadow-md" disabled={loading}>
              {loading ? <Loader2 size={18} className="animate-spin mr-1.5" /> : <LogIn size={18} className="mr-1.5" />}
              {loading ? t('loading') : t('login')}
            </button>
          </form>

          {/* Demo Login */}
          <div className="my-6 text-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-[var(--card-border)]" />
              <span className="text-[11px] md:text-[12px] font-semibold text-[var(--text-muted)] tracking-wide uppercase">Quick Demo</span>
              <div className="flex-1 h-px bg-[var(--card-border)]" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button onClick={() => demoLogin('citizen', 'priya@example.com')}
                className="p-2 md:p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg2)] cursor-pointer text-[12px] text-[var(--text)] font-semibold hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">
                👤 Citizen
              </button>
              <button onClick={() => demoLogin('worker', 'raju@example.com')}
                className="p-2 md:p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg2)] cursor-pointer text-[12px] text-[var(--text)] font-semibold hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">
                👷 Worker
              </button>
              <button onClick={() => demoLogin('employer', 'sunita@example.com')}
                className="p-2 md:p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg2)] cursor-pointer text-[12px] text-[var(--text)] font-semibold hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors">
                🏢 Employer
              </button>
            </div>
          </div>

          {/* Security Note */}
          <div className="flex items-start gap-2.5 p-3 md:p-3.5 rounded-xl bg-[rgba(26,107,58,0.05)] border border-[rgba(26,107,58,0.15)] mb-5 md:mb-6">
            <Shield size={16} className="text-[#1a6b3a] shrink-0 mt-0.5" />
            <span className="text-[11px] md:text-[12px] text-[var(--text-muted)] leading-relaxed font-medium">
              Secured by Aadhaar-linked OTP verification. We never share your data.
            </span>
          </div>

          <p className="text-center text-[12px] md:text-[13px] text-[var(--text-muted)] font-medium">
            {t('noAccount')}{' '}
            <Link href="/register" className="text-[var(--primary)] font-black no-underline hover:underline ml-1">{t('register')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
