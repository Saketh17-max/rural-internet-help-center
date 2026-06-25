'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useDatabase } from '@/contexts/DatabaseContext';
import { Search, ExternalLink, ChevronRight, CheckCircle, AlertCircle, Clock, DollarSign, FileText, CheckSquare } from 'lucide-react';

const SERVICES = [
  {
    id: 'income', icon: '📄', label: 'Income Certificate', labelTe: 'ఆదాయ సర్టిఫికేట్', labelHi: 'आय प्रमाण पत्र',
    category: 'Revenue', color: '#1a6b3a', fee: '₹35', time: '7-10 days',
    eligibility: ['Resident of Andhra Pradesh', 'Annual income < ₹2 lakhs for BPL'],
    documents: ['Aadhaar Card', 'Ration Card', 'Bank Passbook', 'Electricity Bill', 'Passport Photo'],
    steps: [
      'Visit nearest MeeSeva center or go to meeseva.gov.in',
      'Select "Revenue Department" → "Income Certificate"',
      'Fill the application form with family income details',
      'Upload required documents',
      'Pay fee of ₹35 (online/cash)',
      'Note the Application Reference Number',
      'Collect certificate within 7-10 working days',
    ],
    link: 'https://ap.meeseva.gov.in',
  },
  {
    id: 'caste', icon: '📋', label: 'Caste Certificate', labelTe: 'కుల సర్టిఫికేట్', labelHi: 'जाति प्रमाण पत्र',
    category: 'Revenue', color: '#2980b9', fee: '₹35', time: '10-15 days',
    eligibility: ['SC/ST/OBC communities', 'Must be a resident of the state'],
    documents: ['Aadhaar Card', 'Ration Card', "Parent's Caste Certificate", 'School Certificates', 'Passport Photo'],
    steps: [
      'Go to MeeSeva center or Tahsildar office',
      'Fill Caste Certificate application',
      'Attach all required documents',
      'Pay ₹35 fee',
      'Application sent to Tahsildar for approval',
      'Collect certificate within 10-15 days',
    ],
    link: 'https://ap.meeseva.gov.in',
  },
  {
    id: 'residence', icon: '🏠', label: 'Residence Certificate', labelTe: 'నివాస సర్టిఫికేట్', labelHi: 'निवास प्रमाण पत्र',
    category: 'Revenue', color: '#27ae60', fee: '₹35', time: '5-7 days',
    eligibility: ['Residing in the state for 5+ years'],
    documents: ['Aadhaar Card', 'Electricity/Water Bill', 'Ration Card', 'Bank Statement', 'Passport Photo'],
    steps: [
      'Visit MeeSeva or Gram Panchayat office',
      'Fill residence/domicile certificate form',
      'Submit address proof documents',
      'Pay ₹35 fee',
      'Verification by local officials',
      'Certificate issued in 5-7 working days',
    ],
    link: 'https://ap.meeseva.gov.in',
  },
  {
    id: 'pan', icon: '💳', label: 'PAN Card', labelTe: 'పాన్ కార్డ్', labelHi: 'PAN कार्ड',
    category: 'Tax', color: '#e67e22', fee: '₹107 (Physical) / ₹72 (e-PAN)', time: '15-20 days',
    eligibility: ['Indian citizen / resident', 'Required for ITR, banking, high-value transactions'],
    documents: ['Aadhaar Card', 'Passport size photo', 'Address Proof', 'Date of Birth proof'],
    steps: [
      'Visit incometaxindia.gov.in or NSDL/UTI website',
      'Click on "Apply for New PAN" (Form 49A)',
      'Fill personal details and upload photo/signature',
      'Pay fee online (₹107 physical, ₹72 e-PAN)',
      'Submit application and note acknowledgement number',
      'PAN card delivered to address in 15-20 days',
    ],
    link: 'https://www.incometaxindia.gov.in/Pages/pan.aspx',
  },
  {
    id: 'aadhaar', icon: '🔵', label: 'Aadhaar Update', labelTe: 'ఆధార్ అప్‌డేట్', labelHi: 'आधार अपडेट',
    category: 'Identity', color: '#8e44ad', fee: 'Free online / ₹50 at center', time: '5-7 days',
    eligibility: ['All Aadhaar card holders'],
    documents: ['Original Aadhaar', 'Proof of new address/name/DOB', 'Mobile number'],
    steps: [
      'Visit myaadhaar.uidai.gov.in',
      'Login with your Aadhaar and OTP',
      'Select the field to update (Name/Address/DOB/Mobile)',
      'Upload supporting documents',
      'Submit and note URN (Update Request Number)',
      'Update reflected in 5-7 working days',
    ],
    link: 'https://myaadhaar.uidai.gov.in',
  },
  {
    id: 'ration', icon: '🍚', label: 'Ration Card', labelTe: 'రేషన్ కార్డ్', labelHi: 'राशन कार्ड',
    category: 'Food', color: '#e74c3c', fee: 'Free (BPL) / ₹10 (APL)', time: '15-30 days',
    eligibility: ['Economically weaker sections', 'BPL families', 'Migrant workers'],
    documents: ['Aadhaar Card (all members)', 'Family photo', 'Address proof', 'Bank passbook', 'Income certificate'],
    steps: [
      'Visit local Civil Supplies Office or MeeSeva',
      'Obtain Ration Card application form',
      'Fill details for all family members',
      'Attach Aadhaar of all members',
      'Submit with address proof',
      'Verification by inspector',
      'Card issued within 15-30 days',
    ],
    link: 'https://epds2.ap.gov.in',
  },
  {
    id: 'driving', icon: '🚗', label: 'Driving Licence', labelTe: 'డ్రైవింగ్ లైసెన్స్', labelHi: 'ड्राइविंग लाइसेंस',
    category: 'Transport', color: '#1b4f72', fee: 'LL: ₹200 / DL: ₹300', time: '30+ days',
    eligibility: ['Age 18+ (LMV)', 'Age 16+ (MCWOG)', 'Must pass driving test'],
    documents: ['Aadhaar Card', 'Age proof', 'Address proof', 'Passport photo', 'Medical certificate (Form 1A)'],
    steps: [
      'Apply for Learner\'s Licence at parivahan.gov.in',
      'Book slot for LL test at RTO',
      'Pass the online computer-based test',
      'Get Learner\'s Licence (valid 6 months)',
      'Practice driving for 30 days',
      'Apply for Permanent DL and book driving test',
      'Pass driving test at RTO to get permanent DL',
    ],
    link: 'https://parivahan.gov.in',
  },
  {
    id: 'pmkisan', icon: '🌾', label: 'PM Kisan', labelTe: 'PM కిసాన్', labelHi: 'PM किसान',
    category: 'Agriculture', color: '#27ae60', fee: 'Free', time: '15-45 days',
    eligibility: ['Small & marginal farmers', 'Land holding up to 2 hectares', 'Not an income taxpayer'],
    documents: ['Aadhaar Card', 'Bank Passbook', 'Land Records (Patta)', 'Mobile Number'],
    steps: [
      'Visit pmkisan.gov.in',
      'Click "Farmers Corner" → "New Farmer Registration"',
      'Enter Aadhaar number and verify OTP',
      'Fill farm and bank details',
      'Upload land records',
      'Submit application',
      '₹6,000/year credited in 3 installments to bank account',
    ],
    link: 'https://pmkisan.gov.in',
  },
  {
    id: 'passport', icon: '🛂', label: 'Passport', labelTe: 'పాస్‌పోర్ట్', labelHi: 'पासपोर्ट',
    category: 'Identity', color: '#16a085', fee: '₹1,500-2,000', time: '30-45 days',
    eligibility: ['Indian citizens', 'Valid Aadhaar and identity proof'],
    documents: ['Aadhaar Card', 'Birth Certificate', 'Educational Certificates', 'Passport photos', 'Address proof'],
    steps: [
      'Register at passportindia.gov.in',
      'Fill online application (Fresh/Renewal)',
      'Pay fee online',
      'Book appointment at nearest PSK/Passport Seva Kendra',
      'Attend appointment with original documents',
      'Police verification (if required)',
      'Passport delivered by post in 30-45 days',
    ],
    link: 'https://passportindia.gov.in',
  },
  {
    id: 'pension', icon: '👴', label: 'Pension Scheme', labelTe: 'పెన్షన్ పథకం', labelHi: 'पेंशन योजना',
    category: 'Welfare', color: '#e67e22', fee: 'Free', time: '30-60 days',
    eligibility: ['Age 60+ for IGNOAPS', 'BPL category', 'No regular income'],
    documents: ['Aadhaar Card', 'Age proof', 'BPL card', 'Bank passbook', 'Ration card'],
    steps: [
      'Visit local Gram Panchayat or Ward Office',
      'Collect application form for pension scheme',
      'Fill personal and bank details',
      'Attach all documents',
      'Submit to Mandal Revenue Officer',
      'Verification by social welfare department',
      'Pension amount credited monthly to bank account',
    ],
    link: 'https://nsap.nic.in',
  },
  {
    id: 'land', icon: '🌍', label: 'Land Records (Pahani)', labelTe: 'భూమి రికార్డులు', labelHi: 'भूमि अभिलेख',
    category: 'Revenue', color: '#8e44ad', fee: '₹15-25', time: 'Instant',
    eligibility: ['Land owners', 'Agricultural land holders'],
    documents: ['Aadhaar Card', 'Survey Number', 'Khata number'],
    steps: [
      'Visit meebhoomi.ap.gov.in',
      'Select "Pahani" or "Land Records"',
      'Enter district, mandal, village details',
      'Enter survey number or Aadhaar',
      'View and download Pahani online',
      'Pay ₹15-25 for certified copy at MeeSeva',
    ],
    link: 'https://meebhoomi.ap.gov.in',
  },
  {
    id: 'electionid', icon: '🗳️', label: 'Voter ID (EPIC)', labelTe: 'ఓటరు ID', labelHi: 'मतदाता ID',
    category: 'Election', color: '#e74c3c', fee: 'Free', time: '30-60 days',
    eligibility: ['Indian citizen', 'Age 18+', 'Resident of the constituency'],
    documents: ['Aadhaar Card', 'Age proof', 'Address proof', 'Passport photo'],
    steps: [
      'Visit voters.eci.gov.in',
      'Click "New Registration" (Form 6)',
      'Fill personal and address details',
      'Upload photo and documents',
      'Submit application',
      'BLO verification at your address',
      'Voter ID card issued within 30-60 days',
    ],
    link: 'https://voters.eci.gov.in',
  },
];

const CATEGORIES = ['All', 'Revenue', 'Identity', 'Tax', 'Agriculture', 'Transport', 'Food', 'Welfare', 'Election'];

export default function GovernmentServicesPage() {
  const { t, language } = useLanguage();
  const { applications } = useDatabase();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState<typeof SERVICES[0] | null>(null);

  const filtered = SERVICES.filter(s => {
    const name = language === 'te' ? s.labelTe : language === 'hi' ? s.labelHi : s.label;
    const matchSearch = name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || s.category === category;
    return matchSearch && matchCat;
  });

  const getLabel = (s: typeof SERVICES[0]) => language === 'te' ? s.labelTe : language === 'hi' ? s.labelHi : s.label;

  return (
    <div style={{ minHeight: '90vh', background: 'var(--bg)' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0f4023, #1b4f72)', padding: '60px 24px', color: 'white', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🏛️</div>
        <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 900, marginBottom: 12 }}>{t('govServices')}</h1>
        <p style={{ opacity: 0.8, maxWidth: 560, margin: '0 auto 28px', lineHeight: 1.7 }}>{t('govServicesDesc')}</p>

        {/* Search */}
        <div style={{ maxWidth: 480, margin: '0 auto', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          <input
            style={{
              width: '100%', padding: '14px 16px 14px 44px', borderRadius: '50px',
              border: 'none', background: 'rgba(255,255,255,0.95)', fontSize: 15,
              fontFamily: 'inherit', outline: 'none',
            }}
            placeholder={`${t('search')} services...`}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="page-container" style={{ padding: '32px 20px' }}>
        {/* Category Filter */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              style={{
                padding: '6px 16px', borderRadius: '50px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                border: category === cat ? 'none' : '1.5px solid var(--card-border)',
                background: category === cat ? 'var(--primary)' : 'transparent',
                color: category === cat ? 'white' : 'var(--text)',
                transition: 'all 0.2s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid + Detail Panel */}
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1.2fr' : '1fr', gap: 24 }}>
          {/* Grid */}
          <div className="grid-auto" style={{ alignContent: 'start' }}>
            {filtered.map(svc => (
              <div key={svc.id}
                onClick={() => setSelected(selected?.id === svc.id ? null : svc)}
                style={{
                  background: 'var(--card)', border: selected?.id === svc.id ? `2px solid ${svc.color}` : '1.5px solid var(--card-border)',
                  borderRadius: 16, padding: '20px', cursor: 'pointer',
                  transition: 'all 0.2s', boxShadow: 'var(--shadow)',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)')}
                onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.transform = 'none')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: `${svc.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                    {svc.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{getLabel(svc)}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{svc.category}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                  <span className="badge badge-info" style={{ fontSize: 11 }}>
                    <Clock size={10} /> {svc.time}
                  </span>
                  <span className="badge badge-success" style={{ fontSize: 11 }}>
                    <DollarSign size={10} /> {svc.fee}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <CheckSquare size={12} /> {applications.filter((a: any) => a.serviceId === svc.id).length} Applications
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>
                No services found. Try a different search.
              </div>
            )}
          </div>

          {/* Detail Panel */}
          {selected && (
            <div style={{ background: 'var(--card)', border: '1.5px solid var(--card-border)', borderRadius: 20, padding: '28px', alignSelf: 'start', position: 'sticky', top: 90 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 12, background: `${selected.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>
                    {selected.icon}
                  </div>
                  <div>
                    <h2 style={{ fontSize: 18, fontWeight: 800 }}>{getLabel(selected)}</h2>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
                      <span className="badge badge-info"><Clock size={10} /> {selected.time}</span>
                      <span className="badge badge-success"><DollarSign size={10} /> {selected.fee}</span>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600 }}>
                      ✅ {applications.filter((a: any) => a.serviceId === selected.id).length} Active Applications
                    </div>
                  </div>
                </div>
                <button onClick={() => setSelected(null)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 20, padding: 4 }}>✕</button>
              </div>

              {/* Eligibility */}
              <div style={{ marginBottom: 20 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle size={14} /> {t('eligibility')}
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {selected.eligibility.map(e => (
                    <li key={e} style={{ fontSize: 13, color: 'var(--text-muted)', display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                      <span style={{ color: 'var(--primary)', flexShrink: 0, marginTop: 2 }}>✓</span> {e}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Documents */}
              <div style={{ marginBottom: 20 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#2980b9', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <FileText size={14} /> {t('requiredDocs')}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {selected.documents.map(d => (
                    <span key={d} className="badge badge-info" style={{ fontSize: 11 }}>{d}</span>
                  ))}
                </div>
              </div>

              {/* Steps */}
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                  📋 {t('steps')}
                </h3>
                {selected.steps.map((step, i) => (
                  <div key={i} className="step-card">
                    <div className="step-number">{i + 1}</div>
                    <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.6 }}>{step}</div>
                  </div>
                ))}
              </div>

              <a href={selected.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <ExternalLink size={16} /> {t('officialLink')}
                </button>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
