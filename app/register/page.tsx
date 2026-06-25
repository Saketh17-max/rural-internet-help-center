'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { UserPlus, Loader2, ChevronRight, CheckCircle, User, Briefcase, Building2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const { t } = useLanguage();
  const { register } = useAuth();
  const router = useRouter();
  const [role, setRole] = useState<UserRole>('citizen');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<{ userId: string } | null>(null);

  const [form, setForm] = useState({
    name: '', mobile: '', email: '', aadhaar: '', password: '',
    address: '', skills: '', occupation: '', experience: '',
    dailyWage: '', languages: '', availability: 'yes',
    companyName: '', workType: '',
  });

  const update = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));

  const ROLES = [
    { id: 'citizen' as UserRole, icon: '👤', label: t('citizen'), desc: t('citizenDesc'), color: '#1a6b3a' },
    { id: 'worker' as UserRole, icon: '👷', label: t('worker'), desc: t('workerDesc'), color: '#1b4f72' },
    { id: 'employer' as UserRole, icon: '🏢', label: t('employer'), desc: t('employerDesc'), color: '#e67e22' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.mobile) { toast.error('Name and mobile are required'); return; }
    setLoading(true);
    try {
      const res = await register({ ...form, role });
      if (res.success) {
        setSuccess({ userId: res.userId });
        toast.success('Registration successful!');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    const prefix = role === 'worker' ? 'WRK' : role === 'employer' ? 'EMP' : 'CTZ';
    return (
      <div className="min-h-[90vh] flex items-center justify-center p-4 md:p-10 bg-[var(--bg)]">
        <div className="glass-card p-6 md:p-10 text-center w-full max-w-[480px] shadow-lg">
          <div className="text-[56px] md:text-[64px] mb-4 md:mb-5">🎉</div>
          <h2 className="text-[22px] md:text-[26px] font-black mb-1.5 md:mb-2">Registration Successful!</h2>
          <p className="text-[var(--text-muted)] text-[14px] md:text-[15px] mb-6 md:mb-8 font-medium">Welcome to RIHC, {form.name}!</p>

          <div className="id-card mb-6 md:mb-8 shadow-sm">
            <div className="text-[11px] md:text-[12px] opacity-80 mb-1.5 font-bold tracking-wide uppercase">Your {role} ID</div>
            <div className="text-[26px] md:text-[32px] font-black tracking-[3px] md:tracking-[4px] leading-none mb-2 md:mb-3">{success.userId}</div>
            <div className="text-[12px] md:text-[13px] opacity-90 font-medium">🌿 Rural Internet Help Center</div>
          </div>

          <div className="flex flex-col gap-2.5 md:gap-3 mb-6 md:mb-8 text-left bg-[var(--bg2)] p-4 md:p-5 rounded-2xl border border-[var(--card-border)]">
            {['Your ID is unique and permanent', 'Share with employers/citizens when needed', 'Keep your Aadhaar details private'].map(tip => (
              <div key={tip} className="flex items-start gap-2.5 text-[12px] md:text-[13px] font-medium text-[var(--text)]">
                <CheckCircle size={16} className="text-[var(--primary)] shrink-0 mt-[1px]" />
                <span className="leading-snug">{tip}</span>
              </div>
            ))}
          </div>

          <button className="btn-primary w-full justify-center min-h-[48px] text-[14px] font-bold shadow-md"
            onClick={() => router.push(`/${role}`)}>
            Go to Dashboard <ChevronRight size={18} className="ml-1" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4 md:p-10 bg-[var(--bg)] py-8">
      <div className="w-full max-w-[560px]">
        <div className="glass-card p-5 md:p-9 shadow-lg">
          <div className="text-center mb-6 md:mb-8">
            <div className="text-[40px] md:text-[48px] mb-2 md:mb-3">🌿</div>
            <h1 className="text-[22px] md:text-[26px] font-black mb-1.5">{t('registerTitle')}</h1>
            <p className="text-[var(--text-muted)] text-[13px] md:text-[14px] leading-relaxed px-4">{t('registerDesc')}</p>
          </div>

          {/* Progress */}
          <div className="flex gap-2 mb-4 md:mb-6">
            {[1, 2, 3].map(s => (
              <div key={s} className="flex-1 h-1.5 md:h-2 rounded-full transition-all duration-300" style={{ background: step >= s ? 'var(--primary)' : 'var(--bg2)' }} />
            ))}
          </div>
          <div className="text-[11px] md:text-[12px] font-bold text-[var(--text-muted)] mb-5 md:mb-6 text-center tracking-wide uppercase">Step {step} of 3</div>

          {/* Step 1: Role */}
          {step === 1 && (
            <div>
              <div className="text-[15px] md:text-[16px] font-extrabold mb-3 md:mb-4 px-1">{t('selectRole')}</div>
              <div className="flex flex-col gap-3 mb-6 md:mb-8">
                {ROLES.map(r => (
                  <button key={r.id} onClick={() => setRole(r.id)}
                    className={`flex items-center gap-3 md:gap-4 p-3.5 md:p-4 rounded-xl md:rounded-2xl cursor-pointer text-left transition-all active:scale-[0.98] ${role === r.id ? 'shadow-sm' : ''}`}
                    style={{
                      border: role === r.id ? `2px solid ${r.color}` : '2px solid var(--card-border)',
                      background: role === r.id ? `${r.color}10` : 'var(--bg2)',
                    }}
                  >
                    <span className="text-[28px] md:text-[32px] shrink-0 bg-white w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center shadow-sm border border-[rgba(0,0,0,0.05)]">{r.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-extrabold text-[14px] md:text-[15px] mb-0.5 leading-tight" style={{ color: role === r.id ? r.color : 'var(--text)' }}>{r.label}</div>
                      <div className="text-[11px] md:text-[12px] text-[var(--text-muted)] leading-snug pr-2">{r.desc}</div>
                    </div>
                    <div className="shrink-0">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${role === r.id ? 'bg-[var(--primary)] text-white' : 'border-2 border-[var(--card-border)]'}`}>
                        {role === r.id && <CheckCircle size={14} className="text-white" strokeWidth={3} />}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <button className="btn-primary w-full justify-center min-h-[48px] text-[14px] font-bold shadow-md" onClick={() => setStep(2)}>
                Continue <ChevronRight size={18} className="ml-1" />
              </button>
            </div>
          )}

          {/* Step 2: Basic Info */}
          {step === 2 && (
            <form onSubmit={e => { e.preventDefault(); setStep(3); }} className="flex flex-col gap-3.5 md:gap-4">
              <div className="text-[14px] md:text-[15px] font-extrabold mb-1 px-1">Basic Information</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 md:gap-4">
                {[
                  { field: 'name', label: t('name'), placeholder: 'Enter your full name', type: 'text' },
                  { field: 'mobile', label: t('mobile'), placeholder: '10-digit mobile number', type: 'tel' },
                ].map(field => (
                  <div key={field.field}>
                    <label className="text-[11px] md:text-[12px] font-bold block mb-1.5 md:mb-2 px-1 text-[var(--text-muted)]">{field.label}</label>
                    <input className="input-field w-full py-2.5 px-3 md:px-4 text-[13px] md:text-[14px]" type={field.type} placeholder={field.placeholder}
                      value={form[field.field as keyof typeof form]} onChange={e => update(field.field, e.target.value)} required />
                  </div>
                ))}
              </div>

              {[
                { field: 'email', label: t('email') + ' (optional)', placeholder: 'your@email.com', type: 'email' },
                { field: 'aadhaar', label: t('aadhaar'), placeholder: '12-digit Aadhaar number', type: 'text' },
                { field: 'address', label: t('address'), placeholder: 'Village, Mandal, District, State', type: 'text' },
              ].map(field => (
                <div key={field.field}>
                  <label className="text-[11px] md:text-[12px] font-bold block mb-1.5 md:mb-2 px-1 text-[var(--text-muted)]">{field.label}</label>
                  <input className="input-field w-full py-2.5 px-3 md:px-4 text-[13px] md:text-[14px]" type={field.type} placeholder={field.placeholder}
                    value={form[field.field as keyof typeof form]} onChange={e => update(field.field, e.target.value)} />
                </div>
              ))}

              {[
                { field: 'password', label: t('password'), placeholder: 'Create a strong password' },
              ].map(field => (
                <div key={field.field}>
                  <label className="text-[11px] md:text-[12px] font-bold block mb-1.5 md:mb-2 px-1 text-[var(--text-muted)]">{field.label}</label>
                  <input className="input-field w-full py-2.5 px-3 md:px-4 text-[13px] md:text-[14px]" type="password" placeholder={field.placeholder}
                    value={form[field.field as keyof typeof form]} onChange={e => update(field.field, e.target.value)} required minLength={6} />
                </div>
              ))}

              <div className="grid grid-cols-2 gap-3 mt-4 md:mt-5">
                <button type="button" className="btn-outline justify-center min-h-[44px] md:min-h-[48px] text-[13px] md:text-[14px] font-bold" onClick={() => setStep(1)}>← Back</button>
                <button type="submit" className="btn-primary justify-center min-h-[44px] md:min-h-[48px] text-[13px] md:text-[14px] font-bold shadow-md">Continue →</button>
              </div>
            </form>
          )}

          {/* Step 3: Role-specific */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 md:gap-4">
              <div className="text-[14px] md:text-[15px] font-extrabold mb-1 px-1">
                {role === 'worker' ? 'Work Details' : role === 'employer' ? 'Business Details' : 'Preferences'}
              </div>

              {role === 'worker' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 md:gap-4">
                    {[
                      { field: 'occupation', label: t('occupation'), placeholder: 'e.g., Carpenter' },
                      { field: 'experience', label: t('experience'), placeholder: 'e.g., 5 years' },
                    ].map(f => (
                      <div key={f.field}>
                        <label className="text-[11px] md:text-[12px] font-bold block mb-1.5 md:mb-2 px-1 text-[var(--text-muted)]">{f.label}</label>
                        <input className="input-field w-full py-2.5 px-3 md:px-4 text-[13px] md:text-[14px]" placeholder={f.placeholder}
                          value={form[f.field as keyof typeof form]} onChange={e => update(f.field, e.target.value)} required />
                      </div>
                    ))}
                  </div>
                  {[
                    { field: 'skills', label: t('skills'), placeholder: 'e.g., Welding, Plumbing, Painting' },
                    { field: 'dailyWage', label: t('dailyWage') + ' (₹)', placeholder: 'e.g., 600' },
                    { field: 'languages', label: t('languages'), placeholder: 'e.g., Telugu, Hindi, English' },
                  ].map(f => (
                    <div key={f.field}>
                      <label className="text-[11px] md:text-[12px] font-bold block mb-1.5 md:mb-2 px-1 text-[var(--text-muted)]">{f.label}</label>
                      <input className="input-field w-full py-2.5 px-3 md:px-4 text-[13px] md:text-[14px]" placeholder={f.placeholder}
                        value={form[f.field as keyof typeof form]} onChange={e => update(f.field, e.target.value)} required />
                    </div>
                  ))}
                  <div>
                    <label className="text-[11px] md:text-[12px] font-bold block mb-1.5 md:mb-2 px-1 text-[var(--text-muted)]">{t('availability')}</label>
                    <select className="input-field w-full py-2.5 px-3 md:px-4 text-[13px] md:text-[14px]" value={form.availability} onChange={e => update('availability', e.target.value)}>
                      <option value="yes">Available Now</option>
                      <option value="weekdays">Weekdays Only</option>
                      <option value="weekends">Weekends Only</option>
                      <option value="no">Not Available</option>
                    </select>
                  </div>
                </>
              )}

              {role === 'employer' && (
                <>
                  <div>
                    <label className="text-[11px] md:text-[12px] font-bold block mb-1.5 md:mb-2 px-1 text-[var(--text-muted)]">{t('companyName')}</label>
                    <input className="input-field w-full py-2.5 px-3 md:px-4 text-[13px] md:text-[14px]" placeholder="e.g., Raju Farms, ABC Construction"
                      value={form.companyName} onChange={e => update('companyName', e.target.value)} required />
                  </div>
                  <div>
                    <label className="text-[11px] md:text-[12px] font-bold block mb-1.5 md:mb-2 px-1 text-[var(--text-muted)]">{t('workType')}</label>
                    <select className="input-field w-full py-2.5 px-3 md:px-4 text-[13px] md:text-[14px]" value={form.workType} onChange={e => update('workType', e.target.value)} required>
                      <option value="">Select work type</option>
                      <option value="agriculture">Agriculture / Farming</option>
                      <option value="construction">Construction</option>
                      <option value="domestic">Domestic / Household</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="services">Services</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </>
              )}

              {role === 'citizen' && (
                <div className="p-5 md:p-6 rounded-2xl bg-[var(--bg2)] text-center border border-[var(--card-border)] mb-2">
                  <div className="text-[40px] md:text-[48px] mb-3">✅</div>
                  <p className="text-[var(--text-muted)] text-[12px] md:text-[13px] font-medium leading-relaxed max-w-[320px] mx-auto">
                    Your basic information is complete! As a citizen, you can now access government services, track applications, and use the AI assistant.
                  </p>
                </div>
              )}

              <div className="flex items-center gap-2.5 p-3 md:p-3.5 rounded-xl bg-[rgba(26,107,58,0.05)] border border-[rgba(26,107,58,0.15)] text-[11px] md:text-[12px] text-[var(--text-muted)] font-medium leading-snug">
                <span className="text-[16px] md:text-[18px]">📱</span> An OTP will be sent to <strong className="text-[var(--text)] mx-1">{form.mobile || 'your mobile'}</strong> for verification.
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4 md:mt-5">
                <button type="button" className="btn-outline justify-center min-h-[44px] md:min-h-[48px] text-[13px] md:text-[14px] font-bold" onClick={() => setStep(2)}>← Back</button>
                <button type="submit" className="btn-primary justify-center min-h-[44px] md:min-h-[48px] text-[13px] md:text-[14px] font-bold shadow-md" disabled={loading}>
                  {loading ? <Loader2 size={16} className="animate-spin mr-1.5" /> : <UserPlus size={16} className="mr-1.5" />}
                  {loading ? 'Registering...' : t('register')}
                </button>
              </div>
            </form>
          )}

          <p className="text-center text-[12px] md:text-[13px] text-[var(--text-muted)] font-medium mt-6 md:mt-8">
            {t('alreadyHaveAccount')}{' '}
            <Link href="/login" className="text-[var(--primary)] font-black no-underline hover:underline ml-1">{t('login')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
