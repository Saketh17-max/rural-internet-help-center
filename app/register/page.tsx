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
      <div style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, background: 'var(--bg)' }}>
        <div className="glass-card" style={{ padding: '48px 40px', textAlign: 'center', maxWidth: 480, width: '100%' }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>Registration Successful!</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 28 }}>Welcome to RIHC, {form.name}!</p>

          <div className="id-card" style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 8 }}>Your {role.toUpperCase()} ID</div>
            <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: 4 }}>{success.userId}</div>
            <div style={{ fontSize: 13, opacity: 0.8, marginTop: 8 }}>🌿 Rural Internet Help Center</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            {['Your ID is unique and permanent', 'Share with employers/citizens when needed', 'Keep your Aadhaar details private'].map(tip => (
              <div key={tip} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                <CheckCircle size={16} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                {tip}
              </div>
            ))}
          </div>

          <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => router.push(`/${role}`)}>
            Go to Dashboard <ChevronRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: 'var(--bg)' }}>
      <div style={{ width: '100%', maxWidth: 560 }}>
        <div className="glass-card" style={{ padding: '40px 36px' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🌿</div>
            <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 6 }}>{t('registerTitle')}</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>{t('registerDesc')}</p>
          </div>

          {/* Progress */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
            {[1, 2, 3].map(s => (
              <div key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: step >= s ? 'var(--primary)' : 'var(--bg2)', transition: 'all 0.3s' }} />
            ))}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>Step {step} of 3</div>

          {/* Step 1: Role */}
          {step === 1 && (
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>{t('selectRole')}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                {ROLES.map(r => (
                  <button key={r.id} onClick={() => setRole(r.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 16,
                      padding: '16px 20px', borderRadius: 12, cursor: 'pointer',
                      border: role === r.id ? `2px solid ${r.color}` : '2px solid var(--card-border)',
                      background: role === r.id ? `${r.color}10` : 'transparent',
                      textAlign: 'left', transition: 'all 0.2s',
                    }}
                  >
                    <span style={{ fontSize: 32 }}>{r.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, color: role === r.id ? r.color : 'var(--text)', fontSize: 15 }}>{r.label}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{r.desc}</div>
                    </div>
                    {role === r.id && <CheckCircle size={20} style={{ marginLeft: 'auto', color: r.color }} />}
                  </button>
                ))}
              </div>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setStep(2)}>
                Continue <ChevronRight size={16} />
              </button>
            </div>
          )}

          {/* Step 2: Basic Info */}
          {step === 2 && (
            <form onSubmit={e => { e.preventDefault(); setStep(3); }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Basic Information</div>

              {[
                { field: 'name', label: t('name'), placeholder: 'Enter your full name', type: 'text' },
                { field: 'mobile', label: t('mobile'), placeholder: '10-digit mobile number', type: 'tel' },
                { field: 'email', label: t('email') + ' (optional)', placeholder: 'your@email.com', type: 'email' },
                { field: 'aadhaar', label: t('aadhaar'), placeholder: '12-digit Aadhaar number', type: 'text' },
                { field: 'address', label: t('address'), placeholder: 'Village, Mandal, District, State', type: 'text' },
              ].map(field => (
                <div key={field.field}>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 5 }}>{field.label}</label>
                  <input className="input-field" type={field.type} placeholder={field.placeholder}
                    value={form[field.field as keyof typeof form]} onChange={e => update(field.field, e.target.value)} />
                </div>
              ))}

              {[
                { field: 'password', label: t('password'), placeholder: 'Create a strong password' },
              ].map(field => (
                <div key={field.field}>
                  <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 5 }}>{field.label}</label>
                  <input className="input-field" type="password" placeholder={field.placeholder}
                    value={form[field.field as keyof typeof form]} onChange={e => update(field.field, e.target.value)} />
                </div>
              ))}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 8 }}>
                <button type="button" className="btn-outline" onClick={() => setStep(1)}>← Back</button>
                <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>Continue →</button>
              </div>
            </form>
          )}

          {/* Step 3: Role-specific */}
          {step === 3 && (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>
                {role === 'worker' ? 'Work Details' : role === 'employer' ? 'Business Details' : 'Preferences'}
              </div>

              {role === 'worker' && (
                <>
                  {[
                    { field: 'occupation', label: t('occupation'), placeholder: 'e.g., Carpenter, Electrician, Farm Labour' },
                    { field: 'skills', label: t('skills'), placeholder: 'e.g., Welding, Plumbing, Painting' },
                    { field: 'experience', label: t('experience'), placeholder: 'e.g., 5 years' },
                    { field: 'dailyWage', label: t('dailyWage') + ' (₹)', placeholder: 'e.g., 600' },
                    { field: 'languages', label: t('languages'), placeholder: 'e.g., Telugu, Hindi, English' },
                  ].map(f => (
                    <div key={f.field}>
                      <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 5 }}>{f.label}</label>
                      <input className="input-field" placeholder={f.placeholder}
                        value={form[f.field as keyof typeof form]} onChange={e => update(f.field, e.target.value)} />
                    </div>
                  ))}
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 5 }}>{t('availability')}</label>
                    <select className="input-field" value={form.availability} onChange={e => update('availability', e.target.value)}>
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
                    <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 5 }}>{t('companyName')}</label>
                    <input className="input-field" placeholder="e.g., Raju Farms, ABC Construction"
                      value={form.companyName} onChange={e => update('companyName', e.target.value)} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 5 }}>{t('workType')}</label>
                    <select className="input-field" value={form.workType} onChange={e => update('workType', e.target.value)}>
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
                <div style={{ padding: '20px', borderRadius: 12, background: 'var(--bg2)', textAlign: 'center' }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
                  <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
                    Your basic information is complete! As a citizen, you can now access government services, track applications, and use the AI assistant.
                  </p>
                </div>
              )}

              <div style={{ padding: '12px 14px', borderRadius: 10, background: 'rgba(26,107,58,0.08)', border: '1px solid rgba(26,107,58,0.2)', fontSize: 12, color: 'var(--text-muted)' }}>
                📱 An OTP will be sent to {form.mobile || 'your mobile'} for verification.
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 8 }}>
                <button type="button" className="btn-outline" onClick={() => setStep(2)}>← Back</button>
                <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }} disabled={loading}>
                  {loading ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <UserPlus size={16} />}
                  {loading ? 'Registering...' : t('register')}
                </button>
              </div>
            </form>
          )}

          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-muted)', marginTop: 20 }}>
            {t('alreadyHaveAccount')}{' '}
            <Link href="/login" style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>{t('login')}</Link>
          </p>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
