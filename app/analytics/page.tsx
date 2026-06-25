'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import { useDatabase } from '@/contexts/DatabaseContext';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { BarChart2, Database } from 'lucide-react';

const PIE_COLORS = ['#1a6b3a', '#1b4f72', '#e67e22', '#8e44ad', '#27ae60', '#e74c3c', '#2980b9'];

export default function AnalyticsPage() {
  const { t } = useLanguage();
  const { users, workers, employers, jobs, surveys, applications, testimonials, isLoading } = useDatabase();

  if (isLoading) {
    return <div className="min-h-[90vh] flex items-center justify-center bg-[var(--bg)] font-semibold">Loading Real-Time Analytics...</div>;
  }

  const totalDataPoints = users.length + workers.length + employers.length + jobs.length + surveys.length + applications.length + testimonials.length;

  if (totalDataPoints === 0) {
    return (
      <div className="bg-[var(--bg)] min-h-[90vh] flex items-center justify-center p-4 md:p-6">
        <div className="glass-card max-w-[600px] w-full p-8 md:p-10 text-center">
          <div className="text-[56px] md:text-[64px] mb-3 md:mb-4">📊</div>
          <h2 className="text-[20px] md:text-[24px] font-black mb-2 md:mb-3">Analytics Dashboard</h2>
          <p className="text-[var(--text-muted)] mb-5 md:mb-6 leading-relaxed text-sm md:text-base">
            No data available yet. This dashboard updates in real-time as users interact with the platform.
          </p>
          <div className="bg-[var(--bg2)] p-5 md:p-6 rounded-2xl text-left border border-[var(--card-border)]">
            <h3 className="text-[14px] md:text-[16px] font-extrabold mb-3 md:mb-4">Start generating data by:</h3>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5 md:gap-3 text-[13px] md:text-[14px]">
              <li className="flex items-start gap-2"><span className="shrink-0 mt-0.5">✅</span> Registering a new Worker or Employer account</li>
              <li className="flex items-start gap-2"><span className="shrink-0 mt-0.5">✅</span> Submitting a Community Survey</li>
              <li className="flex items-start gap-2"><span className="shrink-0 mt-0.5">✅</span> Posting a new Job from an Employer account</li>
              <li className="flex items-start gap-2"><span className="shrink-0 mt-0.5">✅</span> Applying for a Government Service</li>
              <li className="flex items-start gap-2"><span className="shrink-0 mt-0.5">✅</span> Submitting a platform Testimonial</li>
            </ul>
          </div>
          <div className="mt-5 md:mt-6 text-[11px] md:text-[12px] text-[var(--text-muted)] flex items-center justify-center gap-1.5 font-medium">
            <Database size={14} /> Connected to Firebase Realtime Database
          </div>
        </div>
      </div>
    );
  }

  // Calculate dynamic stats
  const stats = [
    { label: 'Total Users', value: users.length, icon: '👥', color: '#1a6b3a' },
    { label: 'Workers', value: workers.length, icon: '👷', color: '#1b4f72' },
    { label: 'Employers', value: employers.length, icon: '🏢', color: '#e67e22' },
    { label: 'Jobs Posted', value: jobs.length, icon: '💼', color: '#8e44ad' },
    { label: 'Applications', value: applications.length, icon: '📋', color: '#27ae60' },
    { label: 'Surveys', value: surveys.length, icon: '📊', color: '#16a085' },
    { label: 'Reviews', value: testimonials.length, icon: '💬', color: '#e74c3c' },
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

  // Job Categories Calculation
  const jobPieData = countOccurrences(jobs, 'type');

  return (
    <div className="bg-[var(--bg)] min-h-[90vh] pb-12">
      <div className="bg-gradient-to-br from-[#0f4023] to-[#1b4f72] pt-24 pb-10 md:pb-12 px-4 md:px-6 text-white text-center">
        <div className="text-4xl md:text-5xl mb-3 md:mb-4">📊</div>
        <h1 className="text-2xl md:text-[clamp(1.8rem,4vw,2.2rem)] font-black mb-2 md:mb-2.5">Real-Time Analytics</h1>
        <p className="opacity-80 text-sm md:text-base">Live metrics directly from the platform database</p>
      </div>

      <div className="page-container px-4 md:px-6 py-6 md:py-8">
        {/* Dynamic Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
          {stats.map(stat => (
            <div key={stat.label} className="stat-card p-3 md:p-5 flex-col sm:flex-row text-center sm:text-left gap-2 sm:gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-[20px] md:text-[24px] shrink-0 mx-auto sm:mx-0" style={{ background: `${stat.color}15` }}>{stat.icon}</div>
              <div>
                <div className="text-lg md:text-[22px] font-black leading-tight" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-[10px] md:text-[12px] text-[var(--text-muted)] font-semibold mt-0.5">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
          {/* Top Challenges */}
          <div className="chart-container p-4 md:p-6 overflow-hidden">
            <h3 className="font-extrabold mb-4 text-[14px] md:text-[15px]">⚠️ Major Rural Challenges</h3>
            {challengesData.length > 0 ? (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={challengesData} layout="vertical" margin={{ top: 0, right: 10, left: 20, bottom: 0 }}>
                  <XAxis type="number" tick={{ fontSize: 11 }} />
                  <YAxis dataKey="name" type="category" width={110} fontSize={10} tick={{ fontSize: 10 }} />
                  <Tooltip cursor={{ fill: 'var(--bg2)' }} />
                  <Bar dataKey="value" fill="#e74c3c" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[260px] flex items-center justify-center text-[var(--text-muted)] text-sm font-medium">No challenge data yet</div>
            )}
          </div>

          {/* Age Distribution Pie */}
          <div className="chart-container p-4 md:p-6 overflow-hidden">
            <h3 className="font-extrabold mb-4 text-[14px] md:text-[15px]">👥 Age Distribution (Survey)</h3>
            {ageData.length > 0 ? (
              <ResponsiveContainer width="100%" height={260}>
                <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 20 }}>
                  <Pie data={ageData} cx="50%" cy="45%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                    {ageData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v) => [v !== undefined ? Number(v) : 0, 'Responses']} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', bottom: 0 }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[260px] flex items-center justify-center text-[var(--text-muted)] text-sm font-medium">No age data yet</div>
            )}
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Services Used */}
          <div className="chart-container p-4 md:p-6 overflow-hidden">
            <h3 className="font-extrabold mb-4 text-[14px] md:text-[15px]">🏛️ Most Used Govt Services</h3>
            {servicesData.length > 0 ? (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={servicesData.slice(0, 5)} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                  <XAxis dataKey="name" fontSize={9} tick={{ fontSize: 9 }} angle={-25} textAnchor="end" tickFormatter={(v) => v.length > 15 ? v.substring(0, 15) + '...' : v} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip cursor={{ fill: 'var(--bg2)' }} />
                  <Bar dataKey="value" fill="#2980b9" radius={[4, 4, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[260px] flex items-center justify-center text-[var(--text-muted)] text-sm font-medium">No services data yet</div>
            )}
          </div>

          {/* Device Usage */}
          <div className="chart-container p-4 md:p-6 overflow-hidden">
            <h3 className="font-extrabold mb-4 text-[14px] md:text-[15px]">📱 Devices Owned</h3>
            {devicesData.length > 0 ? (
              <ResponsiveContainer width="100%" height={260}>
                <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 20 }}>
                  <Pie data={devicesData} cx="50%" cy="45%" outerRadius={80} dataKey="value">
                    {devicesData.map((_, i) => <Cell key={i} fill={PIE_COLORS[(i+2) % PIE_COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v) => [v !== undefined ? Number(v) : 0, 'Users']} />
                  <Legend wrapperStyle={{ fontSize: '11px', bottom: 0 }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[260px] flex items-center justify-center text-[var(--text-muted)] text-sm font-medium">No device data yet</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
