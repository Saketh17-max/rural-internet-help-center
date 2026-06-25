'use client';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Upload, Download, Trash2, FileText, Lock, Plus, CheckCircle2, Shield, Search, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const DOC_TYPES = ['Aadhaar', 'PAN', 'Driving Licence', 'Caste Certificate', 'Income Certificate', 'Ration Card', 'Birth Certificate', 'Mark Sheet', 'Passport', 'Bank Passbook', 'Other'];

const SAMPLE_DOCS = [
  { id: 1, name: 'Aadhaar Card', type: 'Aadhaar', size: '234 KB', date: '2024-01-10', icon: <FileText size={32} className="text-[#0F4C81]"/>, verified: true },
  { id: 2, name: 'PAN Card', type: 'PAN', size: '189 KB', date: '2024-01-10', icon: <FileText size={32} className="text-[#0B6E4F]"/>, verified: true },
  { id: 3, name: 'Caste Certificate', type: 'Caste Certificate', size: '456 KB', date: '2024-02-01', icon: <FileText size={32} className="text-[#2F80ED]"/>, verified: true },
  { id: 4, name: 'Income Certificate 2024', type: 'Income Certificate', size: '312 KB', date: '2024-02-15', icon: <FileText size={32} className="text-[#8E44AD]"/>, verified: false },
  { id: 5, name: 'SSC Mark Sheet', type: 'Mark Sheet', size: '782 KB', date: '2024-01-20', icon: <FileText size={32} className="text-[#E67E22]"/>, verified: true },
];

export default function DigitalLockerPage() {
  const { t } = useLanguage();
  const [docs, setDocs] = useState(SAMPLE_DOCS);
  const [showUpload, setShowUpload] = useState(false);
  const [newDocName, setNewDocName] = useState('');
  const [newDocType, setNewDocType] = useState('Aadhaar');
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('All');

  const filtered = docs.filter(d => 
    (d.name.toLowerCase().includes(search.toLowerCase()) || d.type.toLowerCase().includes(search.toLowerCase())) &&
    (activeCat === 'All' || d.type.includes(activeCat) || (activeCat === 'Identity' && ['Aadhaar', 'PAN', 'Passport', 'Driving Licence'].includes(d.type)))
  );

  const handleUpload = () => {
    if (!newDocName) { toast.error('Enter document name'); return; }
    const newDoc = {
      id: Date.now(), name: newDocName, type: newDocType,
      size: `${Math.floor(100 + Math.random() * 500)} KB`,
      date: new Date().toISOString().split('T')[0],
      icon: <FileText size={32} className="text-[var(--primary)]"/>, verified: false,
    };
    setDocs(d => [newDoc, ...d]);
    setShowUpload(false);
    setNewDocName('');
    toast.success('Document uploaded successfully! 🎉');
  };

  const deleteDoc = (id: number) => {
    setDocs(d => d.filter(doc => doc.id !== id));
    toast.success('Document deleted.');
  };

  const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

  return (
    <div className="bg-[var(--bg)] min-h-[90vh] pb-12 relative">
      {/* Hero */}
      <div className="bg-[var(--secondary)] pt-28 pb-16 px-4 md:px-6 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--primary)] opacity-20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
        
        <div className="relative z-10 max-w-[1200px] mx-auto">
          <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/20 backdrop-blur-md">
            <Lock size={40} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">{t('lockerTitle')}</h1>
          <p className="opacity-90 max-w-[600px] mx-auto mb-8 text-[15px] md:text-[17px] leading-relaxed font-medium">{t('lockerDesc')}</p>

          <div className="flex gap-4 justify-center flex-wrap">
            {['🔐 AES-256 Encrypted', '☁️ Secure Cloud Storage', '📱 Access Anywhere'].map(badge => (
              <div key={badge} className="py-2 px-5 rounded-xl bg-white/10 border border-white/20 text-[13px] font-bold backdrop-blur-md shadow-sm">
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8 md:py-12 -mt-8 relative z-20">
        {/* Storage Info */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white border border-[var(--card-border)] rounded-3xl p-6 md:p-8 mb-8 flex flex-col md:flex-row items-center gap-8 shadow-lg">
          <div className="flex-1 w-full">
            <div className="font-extrabold mb-4 flex items-center justify-between text-[15px] text-[var(--text)]">
              <span className="flex items-center gap-2"><Shield size={20} className="text-[#16A085]" /> Storage Utilization</span>
              <span className="text-[var(--text-muted)] font-bold">1.9 MB / 100 MB</span>
            </div>
            <div className="w-full h-4 bg-[var(--bg2)] rounded-full overflow-hidden border border-[var(--card-border)]">
              <div className="h-full bg-[#16A085] rounded-full transition-all" style={{ width: '1.9%' }} />
            </div>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="text-center p-4 md:px-8 rounded-2xl bg-[var(--bg2)] flex-1 md:flex-none border border-[var(--card-border)]">
              <div className="font-black text-[28px] text-[var(--primary)] leading-none mb-1">{docs.length}</div>
              <div className="text-[12px] text-[var(--text-muted)] font-bold uppercase tracking-wider">Documents</div>
            </div>
            <div className="text-center p-4 md:px-8 rounded-2xl bg-green-50 flex-1 md:flex-none border border-green-100">
              <div className="font-black text-[28px] text-[#27AE60] leading-none mb-1">{docs.filter(d => d.verified).length}</div>
              <div className="text-[12px] text-green-700 font-bold uppercase tracking-wider">Verified</div>
            </div>
          </div>
        </motion.div>

        {/* Actions Bar */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 group">
            <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--primary)] transition-colors" />
            <input className="w-full py-4 pl-14 pr-6 rounded-2xl border-2 border-[var(--card-border)] bg-white text-[15px] font-medium outline-none focus:border-[var(--primary)] transition-colors shadow-sm" placeholder="Search documents by name or type..."
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="bg-[var(--primary)] hover:bg-[var(--primary-light)] text-white border-none py-4 px-8 rounded-2xl font-bold text-[15px] flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-900/20 transition-all shrink-0" onClick={() => setShowUpload(true)}>
            <Plus size={20} /> {t('uploadDoc')}
          </button>
        </motion.div>

        {/* Categories */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex gap-3 overflow-x-auto hide-scrollbar mb-8 pb-2">
          {['All', 'Identity', 'Certificates', 'Education', 'Financial'].map(cat => (
            <button key={cat} onClick={() => setActiveCat(cat)}
              className={`px-5 py-2.5 rounded-xl whitespace-nowrap text-[13px] font-bold cursor-pointer transition-all border-2 shrink-0 ${activeCat === cat ? 'border-[var(--primary)] bg-[var(--primary)] text-white shadow-md' : 'border-transparent bg-white text-[var(--text)] hover:border-[var(--card-border)] shadow-sm'}`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Documents Grid */}
        {filtered.length === 0 ? (
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center p-16 md:p-24 bg-white border-2 border-dashed border-[var(--card-border)] rounded-3xl">
            <div className="w-20 h-20 bg-[var(--bg2)] rounded-2xl flex items-center justify-center mx-auto mb-6 text-[var(--text-muted)]">
              <FileText size={32} />
            </div>
            <h3 className="text-[20px] font-black text-[var(--text)] mb-3">{t('noDocuments')}</h3>
            <p className="text-[15px] text-[var(--text-muted)] mb-8 font-medium">Upload your first document to secure it in your digital locker.</p>
            <button className="bg-white border-2 border-[var(--card-border)] hover:border-[var(--primary)] text-[var(--text)] px-8 py-3.5 rounded-xl font-bold text-[14px] flex items-center gap-2 mx-auto transition-colors shadow-sm" onClick={() => setShowUpload(true)}>
              <Upload size={18} /> Upload Document
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filtered.map(doc => (
                <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }} key={doc.id} className="bg-white border border-[var(--card-border)] rounded-3xl p-6 transition-all hover:shadow-lg hover:-translate-y-1 flex flex-col group">
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--bg2)] flex items-center justify-center border border-[var(--card-border)] group-hover:border-[var(--primary)] transition-colors">
                      {doc.icon}
                    </div>
                    {doc.verified && <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-[11px] font-bold px-3 py-1.5 rounded-lg border border-green-100 uppercase tracking-wider"><CheckCircle2 size={14}/> Verified</span>}
                  </div>
                  <div className="font-black text-[16px] text-[var(--text)] mb-1 leading-tight truncate" title={doc.name}>{doc.name}</div>
                  <div className="text-[13px] font-bold text-[var(--text-muted)] mb-5">{doc.type}</div>
                  <div className="flex gap-3 mb-6">
                    <span className="px-3 py-1.5 rounded-lg bg-[var(--bg2)] text-[var(--text)] text-[12px] font-bold border border-[var(--card-border)] flex items-center gap-1.5"><FileText size={14} className="text-[var(--text-muted)]"/> {doc.size}</span>
                    <span className="px-3 py-1.5 rounded-lg bg-[var(--bg2)] text-[var(--text)] text-[12px] font-bold border border-[var(--card-border)]">Added {doc.date}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-auto pt-5 border-t border-[var(--card-border)]">
                    <button className="bg-[var(--bg2)] hover:bg-[var(--card-border)] text-[var(--text)] border-none py-2.5 rounded-xl text-[13px] font-bold flex items-center justify-center transition-colors tooltip-wrap"
                      onClick={() => toast.success('Downloading...')}>
                      <Download size={18} />
                    </button>
                    <button className="bg-[var(--bg2)] hover:bg-[var(--card-border)] text-[var(--text)] border-none py-2.5 rounded-xl text-[13px] font-bold flex items-center justify-center transition-colors"
                      onClick={() => toast.success('Document shared!')}>
                      <ExternalLink size={18} />
                    </button>
                    <button onClick={() => deleteDoc(doc.id)}
                      className="bg-red-50 hover:bg-red-100 text-red-500 border-none py-2.5 rounded-xl text-[13px] font-bold flex items-center justify-center transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Upload Modal */}
        <AnimatePresence>
          {showUpload && (
            <div className="fixed inset-0 z-[900] flex items-center justify-center px-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowUpload(false)} />
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white w-full max-w-[500px] p-6 md:p-8 rounded-3xl shadow-2xl relative z-10" onClick={e => e.stopPropagation()}>
                <h2 className="font-black text-2xl text-[var(--text)] mb-2">Upload Document</h2>
                <p className="text-[var(--text-muted)] text-[14px] mb-8 font-medium">Securely upload your document to Digital Locker</p>

                <div className="mb-5">
                  <label className="text-[13px] font-bold block mb-2 text-[var(--text)]">Document Name</label>
                  <input className="w-full px-4 py-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg)] text-[15px] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all font-medium" placeholder="e.g., Aadhaar Card, PAN Card..."
                    value={newDocName} onChange={e => setNewDocName(e.target.value)} />
                </div>

                <div className="mb-6">
                  <label className="text-[13px] font-bold block mb-2 text-[var(--text)]">Document Type</label>
                  <select className="w-full px-4 py-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--bg)] text-[15px] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all font-medium" value={newDocType} onChange={e => setNewDocType(e.target.value)}>
                    {DOC_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>

                <div className="mb-8">
                  <label className="text-[13px] font-bold block mb-2 text-[var(--text)]">Select File</label>
                  <div className="border-2 border-dashed border-[var(--card-border)] hover:border-[var(--primary)] bg-[var(--bg2)] rounded-2xl p-8 text-center cursor-pointer transition-colors group">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[var(--card-border)] group-hover:border-[var(--primary)] transition-colors shadow-sm">
                      <Upload size={28} className="text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors" />
                    </div>
                    <div className="text-[15px] font-extrabold text-[var(--text)] mb-1">Click to browse or drag file here</div>
                    <div className="text-[12px] font-medium text-[var(--text-muted)]">Supports PDF, JPG, PNG up to 5MB</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-white hover:bg-[var(--bg2)] text-[var(--text)] border-2 border-[var(--card-border)] py-4 rounded-xl text-[14px] font-bold flex items-center justify-center transition-colors" onClick={() => setShowUpload(false)}>Cancel</button>
                  <button className="bg-[var(--primary)] hover:bg-[var(--primary-light)] text-white border-none py-4 rounded-xl text-[14px] font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 transition-all" onClick={handleUpload}>
                    <Upload size={18} /> Upload Securely
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
