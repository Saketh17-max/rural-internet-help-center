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
    return <div style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Real-Time Analytics...</div>;
  }

  const totalDataPoints = users.length + workers.length + employers.length + jobs.length + surveys.length + applications.length + testimonials.length;

  if (totalDataPoints === 0) {
    return (
      <div style={{ background: 'var(--bg)', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <div className="glass-card" style={{ maxWidth: 600, padding: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>📊</div>
          <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 12 }}>Analytics Dashboard</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 24, lineHeight: 1.6 }}>
            No data available yet. This dashboard updates in real-time as users interact with the platform.
          </p>
          <div style={{ background: 'var(--bg2)', padding: 24, borderRadius: 16, textAlign: 'left' }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 12 }}>Start generating data by:</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              <li>✅ Registering a new Worker or Employer account</li>
              <li>✅ Submitting a Community Survey</li>
              <li>✅ Posting a new Job from an Employer account</li>
              <li>✅ Applying for a Government Service</li>
              <li>✅ Submitting a platform Testimonial</li>
            </ul>
          </div>
          <div style={{ marginTop: 24, fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
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
    <div style={{ background: 'var(--bg)', minHeight: '90vh' }}>
      <div style={{ background: 'linear-gradient(135deg, #0f4023, #1b4f72)', padding: '40px 24px', color: 'white', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>📊</div>
        <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.2rem)', fontWeight: 900, marginBottom: 8 }}>Real-Time Analytics</h1>
        <p style={{ opacity: 0.8 }}>Live metrics directly from the platform database</p>
      </div>

      <div className="page-container" style={{ padding: '32px 20px' }}>
        {/* Dynamic Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 16, marginBottom: 32 }}>
          {stats.map(stat => (
            <div key={stat.label} className="stat-card">
              <div className="stat-icon" style={{ background: `${stat.color}15`, fontSize: 24 }}>{stat.icon}</div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 900, color: stat.color }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(400px,1fr))', gap: 24, marginBottom: 24 }}>
          {/* Top Challenges */}
          <div className="chart-container">
            <h3 style={{ fontWeight: 800, marginBottom: 16, fontSize: 15 }}>⚠️ Major Rural Challenges</h3>
            {challengesData.length > 0 ? (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={challengesData} layout="vertical" margin={{ left: 40 }}>
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={120} fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#e74c3c" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>No challenge data yet</div>
            )}
          </div>

          {/* Age Distribution Pie */}
          <div className="chart-container">
            <h3 style={{ fontWeight: 800, marginBottom: 16, fontSize: 15 }}>👥 Age Distribution (Survey)</h3>
            {ageData.length > 0 ? (
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={ageData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" paddingAngle={3}>
                    {ageData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v) => [v !== undefined ? Number(v) : 0, 'Responses']} />
                  <Legend iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>No age data yet</div>
            )}
          </div>
        </div>

        {/* Charts Row 2 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(400px,1fr))', gap: 24, marginBottom: 24 }}>
          {/* Services Used */}
          <div className="chart-container">
            <h3 style={{ fontWeight: 800, marginBottom: 16, fontSize: 15 }}>🏛️ Most Used Govt Services</h3>
            {servicesData.length > 0 ? (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={servicesData.slice(0, 5)}>
                  <XAxis dataKey="name" fontSize={11} tickFormatter={(v) => v.length > 15 ? v.substring(0, 15) + '...' : v} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#2980b9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>No services data yet</div>
            )}
          </div>

          {/* Device Usage */}
          <div className="chart-container">
            <h3 style={{ fontWeight: 800, marginBottom: 16, fontSize: 15 }}>📱 Devices Owned</h3>
            {devicesData.length > 0 ? (
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={devicesData} cx="50%" cy="50%" outerRadius={90} dataKey="value">
                    {devicesData.map((_, i) => <Cell key={i} fill={PIE_COLORS[(i+2) % PIE_COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v) => [v !== undefined ? Number(v) : 0, 'Users']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>No device data yet</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
