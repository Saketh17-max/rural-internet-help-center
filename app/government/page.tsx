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
    <div className="min-h-[90vh] bg-[var(--bg)] pb-12">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0f4023] to-[#1b4f72] pt-24 pb-12 px-4 md:px-6 text-white text-center">
        <div className="text-4xl md:text-5xl mb-3 md:mb-4">🏛️</div>
        <h1 className="text-2xl md:text-[clamp(1.8rem,4vw,2.6rem)] font-black mb-3">{t('govServices')}</h1>
        <p className="opacity-80 max-w-[560px] mx-auto mb-6 md:mb-7 leading-relaxed text-sm md:text-base">{t('govServicesDesc')}</p>

        {/* Search */}
        <div className="max-w-[480px] mx-auto relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="w-full py-3.5 md:py-4 pl-12 pr-4 rounded-full border-none bg-[rgba(255,255,255,0.95)] text-gray-800 text-sm md:text-[15px] font-[inherit] outline-none shadow-lg focus:shadow-xl transition-shadow"
            placeholder={`${t('search')} services...`}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="page-container px-4 md:px-6 py-6 md:py-8">
        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 md:pb-0 md:flex-wrap mb-6 md:mb-7">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[11px] md:text-xs font-bold cursor-pointer whitespace-nowrap transition-all border shrink-0 ${category === cat ? 'border-transparent bg-[var(--primary)] text-white shadow-md' : 'border-[var(--card-border)] bg-transparent text-[var(--text)] hover:bg-[var(--bg2)]'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid + Detail Panel */}
        <div className={`grid gap-6 ${selected ? 'grid-cols-1 lg:grid-cols-[1fr_1.2fr]' : 'grid-cols-1'}`}>
          {/* Grid */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${selected ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-4 md:gap-5 content-start`}>
            {filtered.map(svc => (
              <div key={svc.id}
                onClick={() => setSelected(selected?.id === svc.id ? null : svc)}
                className={`bg-[var(--card)] rounded-2xl p-4 md:p-5 cursor-pointer transition-all shadow-[var(--shadow)] hover:-translate-y-1 active:scale-[0.98] border-2 ${selected?.id === svc.id ? 'border-current' : 'border-[var(--card-border)] hover:border-[rgba(0,0,0,0.1)] dark:hover:border-[rgba(255,255,255,0.1)]'}`}
                style={{ borderColor: selected?.id === svc.id ? svc.color : undefined }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ background: `${svc.color}15` }}>
                    {svc.icon}
                  </div>
                  <div>
                    <div className="font-bold text-sm md:text-[14px] leading-tight">{getLabel(svc)}</div>
                    <div className="text-[10px] md:text-[11px] text-[var(--text-muted)] mt-0.5">{svc.category}</div>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap mb-3">
                  <span className="badge badge-info text-[9px] md:text-[10px] px-2 py-0.5">
                    <Clock size={10} className="inline mr-1" /> {svc.time}
                  </span>
                  <span className="badge badge-success text-[9px] md:text-[10px] px-2 py-0.5">
                    <DollarSign size={10} className="inline mr-1" /> {svc.fee}
                  </span>
                </div>
                <div className="text-[11px] md:text-[12px] text-[var(--text-muted)] flex items-center gap-1 font-semibold">
                  <CheckSquare size={12} className="shrink-0" /> {applications.filter((a: any) => a.serviceId === svc.id).length} Active Applications
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full text-center p-12 text-[var(--text-muted)] font-medium">
                No services found. Try a different search.
              </div>
            )}
          </div>

          {/* Detail Panel */}
          {selected && (
            <>
              {/* Backdrop for mobile */}
              <div className="fixed inset-0 bg-black/40 z-[799] lg:hidden backdrop-blur-sm" onClick={() => setSelected(null)} />
              
              <div className="fixed lg:sticky lg:top-[90px] bottom-0 left-0 right-0 lg:left-auto lg:right-auto bg-[var(--card)] border-t lg:border border-[var(--card-border)] rounded-t-3xl lg:rounded-2xl p-5 md:p-7 z-[800] lg:z-auto shadow-[0_-8px_32px_rgba(0,0,0,0.12)] lg:shadow-none max-h-[85vh] lg:max-h-none overflow-y-auto transform transition-transform duration-300">
                <div className="flex justify-between items-start mb-5">
                  <div className="flex gap-3 items-center">
                    <div className="w-12 h-12 md:w-[52px] md:h-[52px] rounded-xl flex items-center justify-center text-2xl md:text-[28px] shrink-0" style={{ background: `${selected.color}15` }}>
                      {selected.icon}
                    </div>
                    <div>
                      <h2 className="text-base md:text-[18px] font-extrabold leading-tight mb-1.5">{getLabel(selected)}</h2>
                      <div className="flex gap-2 flex-wrap mb-1.5">
                        <span className="badge badge-info text-[9px] md:text-[10px]"><Clock size={10} className="inline mr-1" /> {selected.time}</span>
                        <span className="badge badge-success text-[9px] md:text-[10px]"><DollarSign size={10} className="inline mr-1" /> {selected.fee}</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setSelected(null)} className="bg-transparent border-none cursor-pointer text-[var(--text-muted)] text-xl p-1 hover:text-[var(--text)] transition-colors">✕</button>
                </div>
                
                <div className="text-[11px] md:text-[13px] text-[var(--text-muted)] font-bold mb-5">
                  ✅ {applications.filter((a: any) => a.serviceId === selected.id).length} Active Applications from our portal
                </div>

                {/* Eligibility */}
                <div className="mb-5">
                  <h3 className="text-xs md:text-[14px] font-bold text-[var(--primary)] mb-2 md:mb-3 flex items-center gap-1.5">
                    <CheckCircle size={14} className="shrink-0" /> {t('eligibility')}
                  </h3>
                  <ul className="list-none flex flex-col gap-1.5 md:gap-2 pl-0">
                    {selected.eligibility.map(e => (
                      <li key={e} className="text-[11px] md:text-[13px] text-[var(--text-muted)] flex items-start gap-1.5 leading-relaxed">
                        <span className="text-[var(--primary)] shrink-0 mt-[2px] font-bold">✓</span> {e}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Documents */}
                <div className="mb-5">
                  <h3 className="text-xs md:text-[14px] font-bold text-[#2980b9] mb-2 md:mb-3 flex items-center gap-1.5">
                    <FileText size={14} className="shrink-0" /> {t('requiredDocs')}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {selected.documents.map(d => (
                      <span key={d} className="badge badge-info text-[10px] md:text-[11px] px-2 md:px-2.5 py-1">{d}</span>
                    ))}
                  </div>
                </div>

                {/* Steps */}
                <div className="mb-6">
                  <h3 className="text-xs md:text-[14px] font-bold mb-3 flex items-center gap-1.5">
                    📋 {t('steps')}
                  </h3>
                  <div className="flex flex-col gap-3">
                    {selected.steps.map((step, i) => (
                      <div key={i} className="step-card p-3 md:p-3.5 bg-[var(--bg2)] rounded-xl flex items-start gap-3">
                        <div className="w-6 h-6 md:w-[26px] md:h-[26px] rounded-full bg-[var(--primary)] text-white text-[11px] md:text-[12px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
                        <div className="text-[11px] md:text-[13px] text-[var(--text)] leading-relaxed">{step}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <a href={selected.link} target="_blank" rel="noopener noreferrer" className="no-underline block">
                  <button className="btn-primary w-full justify-center min-h-[48px] text-[13px] md:text-[14px]">
                    <ExternalLink size={16} /> {t('officialLink')}
                  </button>
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
