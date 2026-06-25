'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import { useDatabase } from '@/contexts/DatabaseContext';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { BarChart2, Database, Users, Briefcase, FileText, CheckSquare, MessageSquare, Activity, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const PIE_COLORS = ['#0F4C81', '#0B6E4F', '#2F80ED', '#8E44AD', '#E67E22', '#16A085', '#E74C3C'];

export default function AnalyticsPage() {
  const { t } = useLanguage();
  const { users, workers, employers, jobs, surveys, applications, testimonials, isLoading } = useDatabase();

  if (isLoading) {
    return <div className="min-h-[90vh] flex items-center justify-center bg-[var(--bg)] font-semibold text-[var(--text-muted)] text-lg">Loading Real-Time Analytics...</div>;
  }

  const totalDataPoints = users.length + workers.length + employers.length + jobs.length + surveys.length + applications.length + testimonials.length;

  if (totalDataPoints === 0) {
    return (
      <div className="bg-[var(--bg)] min-h-[90vh] flex items-center justify-center p-4 md:p-6">
        <div className="bg-white border border-[var(--card-border)] rounded-3xl max-w-[600px] w-full p-8 md:p-12 text-center shadow-xl">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <BarChart2 size={40} className="text-[var(--primary)]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black mb-3 text-[var(--text)]">Analytics Dashboard</h2>
          <p className="text-[var(--text-muted)] mb-8 leading-relaxed text-[15px]">
            No data available yet. This dashboard updates in real-time as users interact with the platform.
          </p>
          <div className="bg-[var(--bg2)] p-6 rounded-2xl text-left border border-[var(--card-border)] shadow-inner">
            <h3 className="text-[15px] font-extrabold mb-4 text-[var(--text)]">Start generating data by:</h3>
            <ul className="list-none p-0 m-0 flex flex-col gap-3 text-[14px] text-[var(--text-muted)] font-medium">
              <li className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-green-600"/></div> Registering a new Worker or Employer account</li>
              <li className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-green-600"/></div> Submitting a Community Survey</li>
              <li className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-green-600"/></div> Posting a new Job from an Employer account</li>
              <li className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-green-600"/></div> Applying for a Government Service</li>
              <li className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-green-600"/></div> Submitting a platform Testimonial</li>
            </ul>
          </div>
          <div className="mt-8 text-[13px] text-[var(--primary)] flex items-center justify-center gap-2 font-bold px-4 py-2 bg-blue-50 rounded-lg w-fit mx-auto">
            <Database size={16} /> Connected to Firebase Realtime Database
          </div>
        </div>
      </div>
    );
  }

  // Calculate dynamic stats
  const stats = [
    { label: 'Total Users', value: users.length, icon: <Users size={24}/>, color: '#0F4C81' },
    { label: 'Workers', value: workers.length, icon: <Briefcase size={24}/>, color: '#0B6E4F' },
    { label: 'Employers', value: employers.length, icon: <Users size={24}/>, color: '#2F80ED' },
    { label: 'Jobs Posted', value: jobs.length, icon: <Briefcase size={24}/>, color: '#8E44AD' },
    { label: 'Applications', value: applications.length, icon: <FileText size={24}/>, color: '#27AE60' },
    { label: 'Surveys', value: surveys.length, icon: <CheckSquare size={24}/>, color: '#E67E22' },
    { label: 'Reviews', value: testimonials.length, icon: <MessageSquare size={24}/>, color: '#E74C3C' },
  ];

  // Survey Data Calculation Helpers
  const countOccurrences = (arr: any[], key: string) => {
    const map: Record<string, number> = {};
    arr.forEach(item => {
      const val = item[key];
      if (Array.isArray(val)) {
        val.forEach(v => { map[v] = (map[v] || 0) + 1; });
      } else if (val) {
        map[val] = (map[val] || 0) + 1;
      }
    });
    return Object.entries(map).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  };

  const ageData = countOccurrences(surveys, 'ageGroup');
  const occupationData = countOccurrences(surveys, 'occupation');
  const devicesData = countOccurrences(surveys, 'devices');
  const servicesData = countOccurrences(surveys, 'servicesUsed');

  // Challenges Calculation
  const challengesMap: Record<string, number> = {
    'Language Barrier': 0, 'Digital Knowledge': 0, 'No Smartphone': 0, 
    'Fear of Mistakes': 0, 'Privacy Concerns': 0, 'Agent Dependence': 0
  };
  
  surveys.forEach(s => {
    if (s.langProblem === 'Major Challenge') challengesMap['Language Barrier']++;
    if (s.digitalKnowledge === 'Major Challenge') challengesMap['Digital Knowledge']++;
    if (s.smartphoneAvail === 'Major Challenge') challengesMap['No Smartphone']++;
    if (s.fearMistakes === 'Major Challenge') challengesMap['Fear of Mistakes']++;
    if (s.privacyConcerns === 'Major Challenge') challengesMap['Privacy Concerns']++;
    if (s.dependenceAgents === 'Major Challenge') challengesMap['Agent Dependence']++;
  });

  const challengesData = Object.entries(challengesMap)
    .map(([name, value]) => ({ name, value }))
    .filter(c => c.value > 0)
    .sort((a, b) => b.value - a.value);

  const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <div className="bg-[var(--bg)] min-h-[90vh] pb-12 relative">
      <div className="bg-[var(--primary)] pt-28 pb-16 px-4 md:px-6 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--secondary)] opacity-10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
        
        <div className="relative z-10 max-w-[1200px] mx-auto">
          <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/20 backdrop-blur-md">
            <Activity size={40} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Real-Time Analytics</h1>
          <p className="opacity-80 text-[15px] md:text-[17px] font-medium max-w-[500px] mx-auto">Live metrics and insights aggregated directly from platform database interactions.</p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8 md:py-12 -mt-8 relative z-20">
        {/* Dynamic Stats Grid */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(stat => (
            <div key={stat.label} className="bg-white border border-[var(--card-border)] rounded-2xl p-5 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${stat.color}15`, color: stat.color }}>{stat.icon}</div>
              <div>
                <div className="text-[24px] font-black leading-tight text-[var(--text)] mb-1">{stat.value}</div>
                <div className="text-[12px] font-bold text-[var(--text-muted)] uppercase tracking-wider">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Top Challenges */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white border border-[var(--card-border)] rounded-3xl p-6 md:p-8 shadow-sm">
            <h3 className="font-extrabold mb-6 text-[16px] text-[var(--text)] flex items-center gap-2"><AlertTriangle size={18} className="text-[#E74C3C]"/> Major Rural Challenges</h3>
            {challengesData.length > 0 ? (
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={challengesData} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                    <XAxis type="number" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                    <YAxis dataKey="name" type="category" width={120} fontSize={12} tick={{ fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: 'var(--bg2)' }} contentStyle={{ borderRadius: '12px', border: '1px solid var(--card-border)', boxShadow: 'var(--shadow)' }} />
                    <Bar dataKey="value" fill="#E74C3C" radius={[0, 6, 6, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-[280px] flex items-center justify-center text-[var(--text-muted)] text-[14px] font-bold bg-[var(--bg2)] rounded-2xl border border-dashed border-[var(--card-border)]">No challenge data yet</div>
            )}
          </motion.div>

          {/* Age Distribution Pie */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white border border-[var(--card-border)] rounded-3xl p-6 md:p-8 shadow-sm">
            <h3 className="font-extrabold mb-6 text-[16px] text-[var(--text)] flex items-center gap-2"><Users size={18} className="text-[var(--primary)]"/> Age Distribution (Survey)</h3>
            {ageData.length > 0 ? (
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 20 }}>
                    <Pie data={ageData} cx="50%" cy="45%" innerRadius={60} outerRadius={90} dataKey="value" paddingAngle={4}>
                      {ageData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="transparent" />)}
                    </Pie>
                    <Tooltip formatter={(v) => [v !== undefined ? Number(v) : 0, 'Responses']} contentStyle={{ borderRadius: '12px', border: '1px solid var(--card-border)', boxShadow: 'var(--shadow)' }} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-muted)', bottom: 0 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-[280px] flex items-center justify-center text-[var(--text-muted)] text-[14px] font-bold bg-[var(--bg2)] rounded-2xl border border-dashed border-[var(--card-border)]">No age data yet</div>
            )}
          </motion.div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Services Used */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white border border-[var(--card-border)] rounded-3xl p-6 md:p-8 shadow-sm">
            <h3 className="font-extrabold mb-6 text-[16px] text-[var(--text)] flex items-center gap-2"><FileText size={18} className="text-[#2F80ED]"/> Most Used Govt Services</h3>
            {servicesData.length > 0 ? (
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={servicesData.slice(0, 5)} margin={{ top: 10, right: 10, left: -20, bottom: 30 }}>
                    <XAxis dataKey="name" fontSize={11} tick={{ fill: 'var(--text-muted)' }} angle={-25} textAnchor="end" tickFormatter={(v) => v.length > 15 ? v.substring(0, 15) + '...' : v} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: 'var(--bg2)' }} contentStyle={{ borderRadius: '12px', border: '1px solid var(--card-border)', boxShadow: 'var(--shadow)' }} />
                    <Bar dataKey="value" fill="#2F80ED" radius={[6, 6, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-[280px] flex items-center justify-center text-[var(--text-muted)] text-[14px] font-bold bg-[var(--bg2)] rounded-2xl border border-dashed border-[var(--card-border)]">No services data yet</div>
            )}
          </motion.div>

          {/* Device Usage */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white border border-[var(--card-border)] rounded-3xl p-6 md:p-8 shadow-sm">
            <h3 className="font-extrabold mb-6 text-[16px] text-[var(--text)] flex items-center gap-2"><Activity size={18} className="text-[#8E44AD]"/> Devices Owned</h3>
            {devicesData.length > 0 ? (
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 20 }}>
                    <Pie data={devicesData} cx="50%" cy="45%" outerRadius={90} dataKey="value" paddingAngle={2}>
                      {devicesData.map((_, i) => <Cell key={i} fill={PIE_COLORS[(i+3) % PIE_COLORS.length]} stroke="transparent" />)}
                    </Pie>
                    <Tooltip formatter={(v) => [v !== undefined ? Number(v) : 0, 'Users']} contentStyle={{ borderRadius: '12px', border: '1px solid var(--card-border)', boxShadow: 'var(--shadow)' }} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-muted)', bottom: 0 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-[280px] flex items-center justify-center text-[var(--text-muted)] text-[14px] font-bold bg-[var(--bg2)] rounded-2xl border border-dashed border-[var(--card-border)]">No device data yet</div>
            )}
          </motion.div>
        </div>

      </div>
    </div>
  );
}
