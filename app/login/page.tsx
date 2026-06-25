'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { LogIn, Eye, EyeOff, Loader2, User, Briefcase, Map, ShieldCheck, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const ROLES: { id: UserRole; icon: React.ReactNode; label: string; color: string }[] = [
  { id: 'citizen', icon: <User size={20} />, label: 'Citizen', color: 'var(--primary)' },
  { id: 'worker', icon: <Briefcase size={20} />, label: 'Worker', color: 'var(--secondary)' },
  { id: 'employer', icon: <Map size={20} />, label: 'Employer', color: 'var(--accent)' },
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
    <div className="min-h-[90vh] flex items-center justify-center p-4 md:p-10 bg-[var(--bg)] relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-96 bg-[var(--primary)] opacity-5 rounded-b-[100px] blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--secondary)] opacity-5 rounded-t-[100px] blur-3xl" />

      <div className="w-full max-w-[480px] relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-[var(--card-border)]"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[var(--bg)] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[var(--card-border)]">
              <ShieldCheck size={32} className="text-[var(--primary)]" />
            </div>
            <h1 className="text-2xl md:text-[28px] font-black text-[var(--text)] mb-2 tracking-tight">{t('loginTitle')}</h1>
            <p className="text-[var(--text-muted)] text-[14px] md:text-[15px] leading-relaxed max-w-[300px] mx-auto">{t('loginDesc')}</p>
          </div>

          {/* Role Selector */}
          <div className="mb-8">
            <div className="text-[13px] font-bold text-[var(--text-muted)] mb-3 uppercase tracking-wider">{t('selectRole')}</div>
            <div className="grid grid-cols-3 gap-3">
              {ROLES.map(r => {
                const isActive = role === r.id;
                return (
                  <button key={r.id} onClick={() => setRole(r.id)}
                    className={`relative flex flex-col items-center justify-center gap-2 p-3 rounded-2xl cursor-pointer transition-all duration-200 border-2 bg-white ${isActive ? 'shadow-md scale-[1.02]' : 'hover:bg-[var(--bg2)]'}`}
                    style={{ borderColor: isActive ? r.color : 'var(--card-border)' }}
                  >
                    <span style={{ color: isActive ? r.color : 'var(--text-light)' }} className="transition-colors">{r.icon}</span>
                    <span className={`text-[13px] ${isActive ? 'font-bold' : 'font-medium text-[var(--text-muted)]'}`} style={{ color: isActive ? r.color : undefined }}>{r.label}</span>
                    {isActive && (
                      <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white flex items-center justify-center border-2" style={{ borderColor: r.color }}>
                        <CheckCircle2 size={12} style={{ color: r.color }} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <label className="text-[13px] font-bold block mb-2 text-[var(--text)]">
                {t('mobile')} / {t('email')}
              </label>
              <input
                className="w-full px-4 py-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg)] text-[15px] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all placeholder-[var(--text-light)] font-medium"
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="9876543210 or email@example.com"
                autoComplete="username"
              />
            </div>

            <div>
              <label className="text-[13px] font-bold block mb-2 text-[var(--text)]">{t('password')}</label>
              <div className="relative">
                <input
                  className="w-full pl-4 pr-12 py-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg)] text-[15px] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all placeholder-[var(--text-light)] font-medium"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password"
                  autoComplete="current-password"
                />
                <button type="button"
                  onClick={() => setShowPass(o => !o)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-[var(--text-muted)] p-1 hover:text-[var(--text)] transition-colors"
                >
                  {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="text-right mt-2">
                <span className="text-[13px] text-[var(--primary)] font-bold cursor-pointer hover:underline">{t('forgotPassword')}</span>
              </div>
            </div>

            <button type="submit" className="w-full bg-[var(--primary)] hover:bg-[var(--primary-light)] text-white border-none py-4 rounded-xl font-bold text-[15px] flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-900/20 transition-all mt-2 disabled:opacity-70 disabled:cursor-not-allowed" disabled={loading}>
              {loading ? <Loader2 size={20} className="animate-spin" /> : <LogIn size={20} />}
              {loading ? t('loading') : t('login')}
            </button>
          </form>

          {/* Demo Login */}
          <div className="mt-8 pt-6 border-t border-[var(--card-border)] text-center">
            <span className="text-[12px] font-bold text-[var(--text-muted)] tracking-wide uppercase mb-4 block">Quick Demo Access</span>
            <div className="flex justify-center gap-3">
              {[
                { r: 'citizen', em: 'priya@example.com', label: 'Citizen', icon: <User size={14} /> },
                { r: 'worker', em: 'raju@example.com', label: 'Worker', icon: <Briefcase size={14} /> },
                { r: 'employer', em: 'sunita@example.com', label: 'Employer', icon: <Map size={14} /> },
              ].map(d => (
                <button key={d.r} onClick={() => demoLogin(d.r as UserRole, d.em)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[var(--bg2)] border border-[var(--card-border)] hover:border-[var(--primary)] hover:text-[var(--primary)] text-[12px] font-semibold text-[var(--text-muted)] cursor-pointer transition-colors"
                >
                  {d.icon} {d.label}
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-[14px] text-[var(--text-muted)] font-medium mt-8">
            {t('noAccount')}{' '}
            <Link href="/register" className="text-[var(--primary)] font-black no-underline hover:underline ml-1">{t('register')}</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
