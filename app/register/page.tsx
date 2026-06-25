'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { UserPlus, Loader2, ChevronRight, CheckCircle2, User, Briefcase, Map, ArrowLeft, Building } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

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
    { id: 'citizen' as UserRole, icon: <User size={28} />, label: t('citizen'), desc: t('citizenDesc'), color: 'var(--primary)' },
    { id: 'worker' as UserRole, icon: <Briefcase size={28} />, label: t('worker'), desc: t('workerDesc'), color: 'var(--secondary)' },
    { id: 'employer' as UserRole, icon: <Map size={28} />, label: t('employer'), desc: t('employerDesc'), color: 'var(--accent)' },
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

  const slideVariants = {
    initial: { x: 20, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: { x: -20, opacity: 0, transition: { duration: 0.2 } },
  };

  if (success) {
    const roleColor = role === 'worker' ? 'var(--secondary)' : role === 'employer' ? 'var(--accent)' : 'var(--primary)';
    return (
      <div className="min-h-[90vh] flex items-center justify-center p-4 md:p-10 bg-[var(--bg)] relative overflow-hidden">
        <div className="w-full max-w-[480px] relative z-10">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-[var(--card-border)] text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-green-600" />
            </div>
            <h2 className="text-2xl md:text-[28px] font-black text-[var(--text)] mb-2">Registration Successful!</h2>
            <p className="text-[var(--text-muted)] text-[15px] mb-8 font-medium">Welcome to RIHC, {form.name}!</p>

            <div className="relative overflow-hidden rounded-2xl p-6 mb-8 text-white shadow-lg text-left" style={{ background: `linear-gradient(135deg, ${roleColor}, #000)` }}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
              <div className="text-[12px] opacity-80 font-bold tracking-widest uppercase mb-1">Your RIHC {role} ID</div>
              <div className="text-3xl md:text-[40px] font-black tracking-[4px] leading-tight mb-4 drop-shadow-md">{success.userId}</div>
              <div className="flex items-center gap-2 text-[13px] font-semibold opacity-90"><Building size={16} /> Rural Internet Help Center</div>
            </div>

            <button className="w-full bg-[var(--primary)] hover:bg-[var(--primary-light)] text-white border-none py-4 rounded-xl font-bold text-[16px] flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-900/20 transition-all"
              onClick={() => router.push(`/${role}`)}>
              Go to Dashboard <ChevronRight size={20} />
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4 md:p-10 bg-[var(--bg)] py-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--primary)] opacity-5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--secondary)] opacity-5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="w-full max-w-[560px] relative z-10">
        <div className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-[var(--card-border)]">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-[28px] font-black text-[var(--text)] mb-2 tracking-tight">{t('registerTitle')}</h1>
            <p className="text-[var(--text-muted)] text-[14px] md:text-[15px] leading-relaxed max-w-[400px] mx-auto">{t('registerDesc')}</p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex gap-2 mb-3">
              {[1, 2, 3].map(s => (
                <div key={s} className="flex-1 h-2 rounded-full transition-all duration-500" style={{ background: step >= s ? 'var(--primary)' : 'var(--bg2)' }} />
              ))}
            </div>
            <div className="text-[12px] font-bold text-[var(--text-muted)] text-center tracking-wider uppercase">Step {step} of 3</div>
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Role */}
            {step === 1 && (
              <motion.div key="step1" variants={slideVariants} initial="initial" animate="animate" exit="exit">
                <div className="text-[16px] font-extrabold text-[var(--text)] mb-4">{t('selectRole')}</div>
                <div className="flex flex-col gap-4 mb-8">
                  {ROLES.map(r => {
                    const isActive = role === r.id;
                    return (
                      <button key={r.id} onClick={() => setRole(r.id)}
                        className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer text-left transition-all duration-300 border-2 bg-white ${isActive ? 'shadow-md scale-[1.01]' : 'hover:bg-[var(--bg2)] hover:border-[var(--card-border)]'}`}
                        style={{ borderColor: isActive ? r.color : 'var(--card-border)' }}
                      >
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isActive ? 'text-white' : 'bg-[var(--bg)] text-[var(--text-muted)] border border-[var(--card-border)]'}`} style={{ backgroundColor: isActive ? r.color : undefined }}>
                          {r.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`font-extrabold text-[16px] mb-1 leading-tight ${isActive ? '' : 'text-[var(--text)]'}`} style={{ color: isActive ? r.color : undefined }}>{r.label}</div>
                          <div className="text-[13px] text-[var(--text-muted)] leading-snug">{r.desc}</div>
                        </div>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${isActive ? 'bg-[var(--primary)] border-none' : 'border-2 border-[var(--card-border)]'}`}>
                          {isActive && <CheckCircle2 size={16} className="text-white" strokeWidth={3} />}
                        </div>
                      </button>
                    );
                  })}
                </div>
                <button className="w-full bg-[var(--primary)] hover:bg-[var(--primary-light)] text-white border-none py-4 rounded-xl font-bold text-[16px] flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-900/20 transition-all" onClick={() => setStep(2)}>
                  Continue <ChevronRight size={20} />
                </button>
              </motion.div>
            )}

            {/* Step 2: Basic Info */}
            {step === 2 && (
              <motion.form key="step2" variants={slideVariants} initial="initial" animate="animate" exit="exit" onSubmit={e => { e.preventDefault(); setStep(3); }} className="flex flex-col gap-5">
                <div className="text-[16px] font-extrabold text-[var(--text)] mb-2">Basic Information</div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { field: 'name', label: t('name'), placeholder: 'Enter your full name', type: 'text' },
                    { field: 'mobile', label: t('mobile'), placeholder: '10-digit mobile number', type: 'tel' },
                  ].map(field => (
                    <div key={field.field}>
                      <label className="text-[13px] font-bold block mb-2 text-[var(--text)]">{field.label}</label>
                      <input className="w-full px-4 py-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg)] text-[14px] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all font-medium" type={field.type} placeholder={field.placeholder}
                        value={form[field.field as keyof typeof form]} onChange={e => update(field.field, e.target.value)} required />
                    </div>
                  ))}
                </div>

                {[
                  { field: 'email', label: t('email') + ' (optional)', placeholder: 'your@email.com', type: 'email' },
                  { field: 'aadhaar', label: t('aadhaar'), placeholder: '12-digit Aadhaar number', type: 'text' },
                  { field: 'address', label: t('address'), placeholder: 'Village, Mandal, District, State', type: 'text' },
                  { field: 'password', label: t('password'), placeholder: 'Create a strong password', type: 'password' },
                ].map(field => (
                  <div key={field.field}>
                    <label className="text-[13px] font-bold block mb-2 text-[var(--text)]">{field.label}</label>
                    <input className="w-full px-4 py-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg)] text-[14px] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all font-medium" type={field.type} placeholder={field.placeholder}
                      value={form[field.field as keyof typeof form]} onChange={e => update(field.field, e.target.value)} required={field.field !== 'email'} minLength={field.field === 'password' ? 6 : undefined} />
                  </div>
                ))}

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <button type="button" className="bg-white hover:bg-[var(--bg2)] text-[var(--text)] border-2 border-[var(--card-border)] py-4 rounded-xl font-bold text-[15px] flex items-center justify-center gap-2 cursor-pointer transition-colors" onClick={() => setStep(1)}><ArrowLeft size={18} /> Back</button>
                  <button type="submit" className="bg-[var(--primary)] hover:bg-[var(--primary-light)] text-white border-none py-4 rounded-xl font-bold text-[15px] flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-900/20 transition-all">Continue <ChevronRight size={18} /></button>
                </div>
              </motion.form>
            )}

            {/* Step 3: Role-specific */}
            {step === 3 && (
              <motion.form key="step3" variants={slideVariants} initial="initial" animate="animate" exit="exit" onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="text-[16px] font-extrabold text-[var(--text)] mb-2">
                  {role === 'worker' ? 'Work Details' : role === 'employer' ? 'Business Details' : 'Preferences'}
                </div>

                {role === 'worker' && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {[
                        { field: 'occupation', label: t('occupation'), placeholder: 'e.g., Carpenter' },
                        { field: 'experience', label: t('experience'), placeholder: 'e.g., 5 years' },
                      ].map(f => (
                        <div key={f.field}>
                          <label className="text-[13px] font-bold block mb-2 text-[var(--text)]">{f.label}</label>
                          <input className="w-full px-4 py-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg)] text-[14px] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all font-medium" placeholder={f.placeholder}
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
                        <label className="text-[13px] font-bold block mb-2 text-[var(--text)]">{f.label}</label>
                        <input className="w-full px-4 py-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg)] text-[14px] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all font-medium" placeholder={f.placeholder}
                          value={form[f.field as keyof typeof form]} onChange={e => update(f.field, e.target.value)} required />
                      </div>
                    ))}
                    <div>
                      <label className="text-[13px] font-bold block mb-2 text-[var(--text)]">{t('availability')}</label>
                      <select className="w-full px-4 py-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg)] text-[14px] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all font-medium" value={form.availability} onChange={e => update('availability', e.target.value)}>
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
                      <label className="text-[13px] font-bold block mb-2 text-[var(--text)]">{t('companyName')}</label>
                      <input className="w-full px-4 py-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg)] text-[14px] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all font-medium" placeholder="e.g., Raju Farms, ABC Construction"
                        value={form.companyName} onChange={e => update('companyName', e.target.value)} required />
                    </div>
                    <div>
                      <label className="text-[13px] font-bold block mb-2 text-[var(--text)]">{t('workType')}</label>
                      <select className="w-full px-4 py-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg)] text-[14px] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all font-medium" value={form.workType} onChange={e => update('workType', e.target.value)} required>
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
                  <div className="p-6 rounded-2xl bg-[rgba(15,76,129,0.05)] border border-[rgba(15,76,129,0.1)] text-center mb-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-[var(--card-border)] shadow-sm">
                      <CheckCircle2 size={32} className="text-[var(--primary)]" />
                    </div>
                    <p className="text-[var(--text-muted)] text-[14px] font-medium leading-relaxed max-w-[320px] mx-auto">
                      Your basic information is complete! As a citizen, you can now access government services, track applications, and use the AI assistant.
                    </p>
                  </div>
                )}

                <div className="mt-2 text-center text-[13px] text-[var(--text-muted)] font-medium">
                  An OTP will be sent to <strong className="text-[var(--text)]">{form.mobile || 'your mobile'}</strong> for verification.
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <button type="button" className="bg-white hover:bg-[var(--bg2)] text-[var(--text)] border-2 border-[var(--card-border)] py-4 rounded-xl font-bold text-[15px] flex items-center justify-center gap-2 cursor-pointer transition-colors" onClick={() => setStep(2)}><ArrowLeft size={18} /> Back</button>
                  <button type="submit" className="bg-[var(--primary)] hover:bg-[var(--primary-light)] text-white border-none py-4 rounded-xl font-bold text-[15px] flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-900/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed" disabled={loading}>
                    {loading ? <Loader2 size={20} className="animate-spin" /> : <UserPlus size={20} />}
                    {loading ? 'Registering...' : t('register')}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          <p className="text-center text-[14px] text-[var(--text-muted)] font-medium mt-8">
            {t('alreadyHaveAccount')}{' '}
            <Link href="/login" className="text-[var(--primary)] font-black no-underline hover:underline ml-1">{t('login')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
