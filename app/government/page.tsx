'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useDatabase } from '@/contexts/DatabaseContext';
import { Search, ExternalLink, Clock, DollarSign, FileText, CheckSquare, CheckCircle2, Building, ShieldCheck, FileDigit, Info, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SERVICES = [
  {
    id: 'income', icon: <FileText size={24}/>, label: 'Income Certificate', labelTe: 'ఆదాయ సర్టిఫికేట్', labelHi: 'आय प्रमाण पत्र',
    category: 'Revenue', color: '#0F4C81', fee: '₹35', time: '7-10 days',
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
    id: 'caste', icon: <FileDigit size={24}/>, label: 'Caste Certificate', labelTe: 'కుల సర్టిఫికేట్', labelHi: 'जाति प्रमाण पत्र',
    category: 'Revenue', color: '#0F4C81', fee: '₹35', time: '10-15 days',
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
    id: 'residence', icon: <Building size={24}/>, label: 'Residence Certificate', labelTe: 'నివాస సర్టిఫికేట్', labelHi: 'निवास प्रमाण पत्र',
    category: 'Revenue', color: '#0F4C81', fee: '₹35', time: '5-7 days',
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
    id: 'pan', icon: <ShieldCheck size={24}/>, label: 'PAN Card', labelTe: 'పాన్ కార్డ్', labelHi: 'PAN कार्ड',
    category: 'Tax', color: '#E67E22', fee: '₹107 (Physical) / ₹72 (e-PAN)', time: '15-20 days',
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
    id: 'aadhaar', icon: <ShieldCheck size={24}/>, label: 'Aadhaar Update', labelTe: 'ఆధార్ అప్‌డేట్', labelHi: 'आधार अपडेट',
    category: 'Identity', color: '#8E44AD', fee: 'Free online / ₹50 at center', time: '5-7 days',
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
    id: 'ration', icon: <FileText size={24}/>, label: 'Ration Card', labelTe: 'రేషన్ కార్డ్', labelHi: 'राशन कार्ड',
    category: 'Food', color: '#E74C3C', fee: 'Free (BPL) / ₹10 (APL)', time: '15-30 days',
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
    id: 'driving', icon: <FileDigit size={24}/>, label: 'Driving Licence', labelTe: 'డ్రైవింగ్ లైసెన్స్', labelHi: 'ड्राइविंग लाइसेंस',
    category: 'Transport', color: '#2F80ED', fee: 'LL: ₹200 / DL: ₹300', time: '30+ days',
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
    id: 'pmkisan', icon: <Building size={24}/>, label: 'PM Kisan', labelTe: 'PM కిసాన్', labelHi: 'PM किसान',
    category: 'Agriculture', color: '#27AE60', fee: 'Free', time: '15-45 days',
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
    id: 'passport', icon: <ShieldCheck size={24}/>, label: 'Passport', labelTe: 'పాస్‌పోర్ట్', labelHi: 'पासपोर्ट',
    category: 'Identity', color: '#16A085', fee: '₹1,500-2,000', time: '30-45 days',
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
    id: 'pension', icon: <FileText size={24}/>, label: 'Pension Scheme', labelTe: 'పెన్షన్ పథకం', labelHi: 'पेंशन योजना',
    category: 'Welfare', color: '#F39C12', fee: 'Free', time: '30-60 days',
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
    id: 'land', icon: <FileDigit size={24}/>, label: 'Land Records (Pahani)', labelTe: 'భూమి రికార్డులు', labelHi: 'भूमि अभिलेख',
    category: 'Revenue', color: '#8E44AD', fee: '₹15-25', time: 'Instant',
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
    id: 'electionid', icon: <ShieldCheck size={24}/>, label: 'Voter ID (EPIC)', labelTe: 'ఓటరు ID', labelHi: 'मतदाता ID',
    category: 'Election', color: '#E74C3C', fee: 'Free', time: '30-60 days',
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

  const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

  return (
    <div className="min-h-[90vh] bg-[var(--bg)] pb-12 relative">
      {/* Hero */}
      <div className="bg-[var(--primary)] pt-28 pb-16 px-4 md:px-6 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--secondary)] opacity-10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
        
        <div className="relative z-10 max-w-[1200px] mx-auto">
          <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/20 backdrop-blur-md">
            <Building size={40} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">{t('govServices')}</h1>
          <p className="opacity-80 max-w-[600px] mx-auto mb-8 text-[15px] md:text-[17px] leading-relaxed font-medium">{t('govServicesDesc')}</p>

          <div className="max-w-[600px] mx-auto relative group">
            <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--primary)] transition-colors" />
            <input
              className="w-full py-4 md:py-5 pl-14 pr-6 rounded-2xl border-2 border-white/20 bg-white/95 text-gray-800 text-[15px] md:text-[16px] font-medium outline-none shadow-xl focus:bg-white focus:border-[var(--primary)] transition-all"
              placeholder={`${t('search')} services, certificates...`}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8 md:py-12 -mt-8 relative z-20">
        {/* Category Filter */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white rounded-3xl p-4 md:p-6 shadow-lg border border-[var(--card-border)] mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="flex items-center gap-2 text-[14px] font-bold text-[var(--text)] pl-2 shrink-0"><Filter size={18}/> Categories:</div>
          <div className="flex gap-2 overflow-x-auto w-full hide-scrollbar pb-2 md:pb-0">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-[13px] font-bold cursor-pointer whitespace-nowrap transition-all border-2 shrink-0 ${category === cat ? 'border-[var(--primary)] bg-[var(--primary)] text-white shadow-md shadow-blue-900/10' : 'border-transparent bg-[var(--bg2)] text-[var(--text)] hover:bg-[var(--card-border)]'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Services Grid + Detail Panel */}
        <div className={`grid gap-6 ${selected ? 'grid-cols-1 lg:grid-cols-[1fr_1.2fr]' : 'grid-cols-1'}`}>
          {/* Grid */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${selected ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-6 content-start`}>
            {filtered.map(svc => (
              <motion.div initial="hidden" animate="visible" variants={fadeUp} key={svc.id}
                onClick={() => setSelected(selected?.id === svc.id ? null : svc)}
                className={`bg-white rounded-3xl p-6 cursor-pointer transition-all shadow-sm hover:shadow-lg hover:-translate-y-1 border-2 ${selected?.id === svc.id ? 'border-current shadow-md' : 'border-[var(--card-border)]'}`}
                style={{ borderColor: selected?.id === svc.id ? svc.color : undefined }}
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border border-current/20" style={{ background: `${svc.color}10`, color: svc.color }}>
                    {svc.icon}
                  </div>
                  <div>
                    <div className="font-extrabold text-[16px] text-[var(--text)] leading-tight mb-1">{getLabel(svc)}</div>
                    <div className="text-[12px] font-bold uppercase tracking-wider text-[var(--text-muted)]">{svc.category}</div>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap mb-5 border-t border-[var(--card-border)] pt-4">
                  <span className="px-3 py-1.5 rounded-lg bg-[var(--bg2)] text-[var(--text)] text-[12px] font-bold border border-[var(--card-border)] flex items-center gap-1.5">
                    <Clock size={14} className="text-[var(--text-muted)]"/> {svc.time}
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-[var(--bg2)] text-[var(--text)] text-[12px] font-bold border border-[var(--card-border)] flex items-center gap-1.5">
                    <DollarSign size={14} className="text-[var(--text-muted)]"/> {svc.fee}
                  </span>
                </div>
                <div className="text-[12px] text-green-700 bg-green-50 px-3 py-2 rounded-lg font-bold flex items-center gap-2 border border-green-100">
                  <CheckSquare size={14} className="shrink-0" /> {applications.filter((a: any) => a.serviceId === svc.id).length} Active Applications
                </div>
              </motion.div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full text-center p-16 bg-white border border-[var(--card-border)] rounded-3xl text-[var(--text-muted)] font-bold text-[16px] shadow-sm">
                No services found matching your search.
              </div>
            )}
          </div>

          {/* Detail Panel */}
          <AnimatePresence>
            {selected && (
              <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-[799] lg:hidden backdrop-blur-sm" onClick={() => setSelected(null)} />
                
                <motion.div initial={{ x: '100%', opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: '100%', opacity: 0 }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} 
                  className="fixed lg:sticky lg:top-[100px] bottom-0 left-0 right-0 lg:left-auto lg:right-auto bg-white border-t lg:border border-[var(--card-border)] rounded-t-3xl lg:rounded-3xl p-6 md:p-8 z-[800] lg:z-auto shadow-2xl lg:shadow-xl max-h-[85vh] lg:max-h-none overflow-y-auto w-full lg:w-auto">
                  
                  <div className="flex justify-between items-start mb-8 pb-6 border-b border-[var(--card-border)]">
                    <div className="flex gap-4 items-center">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border border-current/20" style={{ background: `${selected.color}10`, color: selected.color }}>
                        {selected.icon}
                      </div>
                      <div>
                        <h2 className="text-[20px] font-black text-[var(--text)] mb-2 leading-tight">{getLabel(selected)}</h2>
                        <div className="flex gap-2 flex-wrap">
                          <span className="px-3 py-1.5 rounded-lg bg-[var(--bg2)] text-[var(--text)] text-[12px] font-bold border border-[var(--card-border)] flex items-center gap-1.5"><Clock size={14}/> {selected.time}</span>
                          <span className="px-3 py-1.5 rounded-lg bg-[var(--bg2)] text-[var(--text)] text-[12px] font-bold border border-[var(--card-border)] flex items-center gap-1.5"><DollarSign size={14}/> {selected.fee}</span>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => setSelected(null)} className="w-10 h-10 rounded-full bg-[var(--bg2)] flex items-center justify-center border-none cursor-pointer text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--card-border)] transition-colors shrink-0">✕</button>
                  </div>
                  
                  <div className="mb-8 p-4 bg-blue-50 border border-blue-100 rounded-2xl text-[13px] text-blue-700 font-bold flex items-center gap-2">
                    <Info size={18} className="shrink-0" /> {applications.filter((a: any) => a.serviceId === selected.id).length} Active Applications from our portal
                  </div>

                  {/* Eligibility */}
                  <div className="mb-8">
                    <h3 className="text-[15px] font-extrabold text-[var(--text)] mb-4 flex items-center gap-2 pb-2 border-b border-[var(--card-border)]">
                      <CheckCircle2 size={18} className="text-[var(--primary)]" /> {t('eligibility')}
                    </h3>
                    <ul className="list-none flex flex-col gap-3 pl-0">
                      {selected.eligibility.map(e => (
                        <li key={e} className="text-[14px] text-[var(--text)] font-medium flex items-start gap-2.5 leading-relaxed bg-[var(--bg2)] p-3 rounded-xl border border-[var(--card-border)]">
                          <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5"><CheckCircle2 size={12}/></span> {e}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Documents */}
                  <div className="mb-8">
                    <h3 className="text-[15px] font-extrabold text-[var(--text)] mb-4 flex items-center gap-2 pb-2 border-b border-[var(--card-border)]">
                      <FileText size={18} className="text-[var(--secondary)]" /> {t('requiredDocs')}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selected.documents.map(d => (
                        <span key={d} className="px-3 py-1.5 rounded-xl bg-[var(--bg)] text-[var(--text)] text-[13px] font-bold border border-[var(--card-border)] shadow-sm">{d}</span>
                      ))}
                    </div>
                  </div>

                  {/* Steps */}
                  <div className="mb-8">
                    <h3 className="text-[15px] font-extrabold text-[var(--text)] mb-4 flex items-center gap-2 pb-2 border-b border-[var(--card-border)]">
                      <FileDigit size={18} className="text-orange-500" /> {t('steps')}
                    </h3>
                    <div className="flex flex-col gap-3">
                      {selected.steps.map((step, i) => (
                        <div key={i} className="p-4 bg-[var(--bg2)] border border-[var(--card-border)] rounded-2xl flex items-start gap-3">
                          <div className="w-7 h-7 rounded-full bg-[var(--primary)] text-white text-[13px] font-black flex items-center justify-center shrink-0 shadow-sm">{i + 1}</div>
                          <div className="text-[14px] text-[var(--text)] font-medium leading-relaxed pt-1">{step}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a href={selected.link} target="_blank" rel="noopener noreferrer" className="no-underline block sticky bottom-0 pt-4 bg-white">
                    <button className="bg-[var(--primary)] hover:bg-[var(--primary-light)] text-white border-none w-full py-4 rounded-xl text-[15px] font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 transition-all">
                      <ExternalLink size={20} /> Access Official Portal
                    </button>
                  </a>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
