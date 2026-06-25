'use client';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Upload, Download, Trash2, FileText, Image, Lock, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

const DOC_TYPES = ['Aadhaar', 'PAN', 'Driving Licence', 'Caste Certificate', 'Income Certificate', 'Ration Card', 'Birth Certificate', 'Mark Sheet', 'Passport', 'Bank Passbook', 'Other'];

const SAMPLE_DOCS = [
  { id: 1, name: 'Aadhaar Card', type: 'Aadhaar', size: '234 KB', date: '2024-01-10', icon: '🔵', verified: true },
  { id: 2, name: 'PAN Card', type: 'PAN', size: '189 KB', date: '2024-01-10', icon: '💳', verified: true },
  { id: 3, name: 'Caste Certificate', type: 'Caste Certificate', size: '456 KB', date: '2024-02-01', icon: '📄', verified: true },
  { id: 4, name: 'Income Certificate 2024', type: 'Income Certificate', size: '312 KB', date: '2024-02-15', icon: '📋', verified: false },
  { id: 5, name: 'SSC Mark Sheet', type: 'Mark Sheet', size: '782 KB', date: '2024-01-20', icon: '🎓', verified: true },
];

export default function DigitalLockerPage() {
  const { t } = useLanguage();
  const [docs, setDocs] = useState(SAMPLE_DOCS);
  const [showUpload, setShowUpload] = useState(false);
  const [newDocName, setNewDocName] = useState('');
  const [newDocType, setNewDocType] = useState('Aadhaar');
  const [search, setSearch] = useState('');

  const filtered = docs.filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || d.type.toLowerCase().includes(search.toLowerCase()));

  const handleUpload = () => {
    if (!newDocName) { toast.error('Enter document name'); return; }
    const newDoc = {
      id: Date.now(), name: newDocName, type: newDocType,
      size: `${Math.floor(100 + Math.random() * 500)} KB`,
      date: new Date().toISOString().split('T')[0],
      icon: '📄', verified: false,
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

  return (
    <div className="bg-[var(--bg)] min-h-[90vh] pb-12">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1b4f72] to-[#16a085] pt-24 pb-12 px-4 md:px-6 text-white text-center">
        <div className="text-4xl md:text-5xl mb-3 md:mb-4">🔒</div>
        <h1 className="text-2xl md:text-[clamp(1.8rem,4vw,2.2rem)] font-black mb-2.5">{t('lockerTitle')}</h1>
        <p className="opacity-90 max-w-[500px] mx-auto mb-6 md:mb-8 text-sm md:text-base leading-relaxed">{t('lockerDesc')}</p>

        <div className="flex gap-2 md:gap-3 justify-center flex-wrap">
          {['🔐 AES-256 Encrypted', '☁️ Secure Cloud', '📱 Access Anytime'].map(badge => (
            <div key={badge} className="py-1.5 px-3 md:py-2 md:px-4 rounded-full bg-[rgba(255,255,255,0.15)] border border-[rgba(255,255,255,0.3)] text-[11px] md:text-[13px] font-semibold backdrop-blur-sm">
              {badge}
            </div>
          ))}
        </div>
      </div>

      <div className="page-container px-4 md:px-6 py-6 md:py-10">
        {/* Storage Info */}
        <div className="bg-[var(--card)] border-[1.5px] border-[var(--card-border)] rounded-2xl p-5 md:p-6 mb-6 md:mb-8 flex flex-col md:flex-row items-center gap-5 md:gap-6 shadow-sm">
          <div className="flex-1 w-full">
            <div className="font-bold mb-2.5 md:mb-3 flex items-center gap-2 md:gap-2.5 text-[13px] md:text-[15px]">
              <Lock size={16} className="text-[var(--primary)]" /> Storage Used: 1.9 MB of 100 MB
            </div>
            <div className="progress-bar h-2.5 md:h-3">
              <div className="progress-fill" style={{ width: '1.9%' }} />
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="text-center p-3 md:p-[10px_16px] rounded-xl bg-[var(--bg2)] flex-1 md:flex-none">
              <div className="font-black text-[20px] md:text-[24px] text-[var(--primary)] leading-tight">{docs.length}</div>
              <div className="text-[11px] md:text-[12px] text-[var(--text-muted)] font-semibold mt-0.5">Documents</div>
            </div>
            <div className="text-center p-3 md:p-[10px_16px] rounded-xl bg-[var(--bg2)] flex-1 md:flex-none">
              <div className="font-black text-[20px] md:text-[24px] text-[#27ae60] leading-tight">{docs.filter(d => d.verified).length}</div>
              <div className="text-[11px] md:text-[12px] text-[var(--text-muted)] font-semibold mt-0.5">Verified</div>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
          <input className="input-field flex-1 py-3 px-4 text-[14px]" placeholder="Search documents..."
            value={search} onChange={e => setSearch(e.target.value)} />
          <button className="btn-primary justify-center w-full md:w-auto min-h-[48px] md:px-6" onClick={() => setShowUpload(true)}>
            <Plus size={18} className="mr-1.5" /> {t('uploadDoc')}
          </button>
        </div>

        {/* Document Type Categories */}
        <div className="flex gap-2 md:gap-2.5 overflow-x-auto hide-scrollbar mb-6 md:mb-8 pb-2">
          {['All', 'Identity', 'Certificates', 'Education', 'Financial'].map(cat => (
            <button key={cat}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-[12px] md:text-[13px] font-bold cursor-pointer transition-all border shrink-0 ${cat === 'All' ? 'border-transparent bg-[var(--primary)] text-white shadow-md' : 'border-[var(--card-border)] bg-transparent text-[var(--text)] hover:bg-[var(--bg2)]'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Documents Grid */}
        {filtered.length === 0 ? (
          <div className="text-center p-8 md:p-16 text-[var(--text-muted)] border-2 border-dashed border-[var(--card-border)] rounded-2xl">
            <div className="text-[48px] md:text-[56px] mb-4">📂</div>
            <p className="text-[14px] md:text-[16px] font-semibold">{t('noDocuments')}</p>
            <button className="btn-primary mx-auto mt-5 min-h-[44px]" onClick={() => setShowUpload(true)}>
              <Upload size={16} className="mr-2" /> Upload First Document
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 md:gap-4">
            {filtered.map(doc => (
              <div key={doc.id} className="bg-[var(--card)] border-[1.5px] border-[var(--card-border)] rounded-2xl p-4 md:p-5 transition-transform hover:-translate-y-1 shadow-sm flex flex-col">
                <div className="flex justify-between items-start mb-3 md:mb-4">
                  <div className="text-[32px] md:text-[36px]">{doc.icon}</div>
                  {doc.verified && <span className="badge badge-verified text-[10px] md:text-[11px] px-2 py-1">✓ Verified</span>}
                </div>
                <div className="font-extrabold text-[14px] md:text-[15px] mb-1 leading-tight truncate">{doc.name}</div>
                <div className="text-[12px] md:text-[13px] text-[var(--text-muted)] mb-3">{doc.type}</div>
                <div className="flex gap-2 mb-4 md:mb-5">
                  <span className="badge badge-info text-[10px] md:text-[11px] px-2 py-0.5">📁 {doc.size}</span>
                  <span className="text-[10px] md:text-[11px] text-[var(--text-muted)] font-medium mt-1">📅 {doc.date}</span>
                </div>
                <div className="grid grid-cols-[1fr_1fr_auto] gap-2 md:gap-2.5 mt-auto">
                  <button className="btn-primary justify-center py-2 px-3 text-[12px] md:text-[13px] rounded-xl min-h-[40px]"
                    onClick={() => toast.success('Downloading...')}>
                    <Download size={14} />
                  </button>
                  <button className="btn-outline justify-center py-2 px-3 text-[12px] md:text-[13px] rounded-xl min-h-[40px]"
                    onClick={() => toast.success('Document shared!')}>
                    Share
                  </button>
                  <button onClick={() => deleteDoc(doc.id)}
                    className="flex items-center justify-center p-2 rounded-xl bg-[rgba(231,76,60,0.1)] border border-[rgba(231,76,60,0.3)] text-[#e74c3c] cursor-pointer hover:bg-[rgba(231,76,60,0.2)] transition-colors active:scale-95 w-10 min-h-[40px]">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upload Modal */}
        {showUpload && (
          <div className="modal-overlay px-4" onClick={() => setShowUpload(false)}>
            <div className="modal-box w-full max-w-[480px] p-5 md:p-8" onClick={e => e.stopPropagation()}>
              <h2 className="font-black text-lg md:text-[22px] mb-1.5 md:mb-2">Upload Document</h2>
              <p className="text-[var(--text-muted)] text-[13px] md:text-[14px] mb-5 md:mb-6">Securely upload your document to Digital Locker</p>

              <div className="mb-4 md:mb-5">
                <label className="text-[12px] md:text-[13px] font-bold block mb-1.5 md:mb-2">Document Name</label>
                <input className="input-field py-2.5 md:py-3.5 text-sm" placeholder="e.g., Aadhaar Card, PAN Card..."
                  value={newDocName} onChange={e => setNewDocName(e.target.value)} />
              </div>

              <div className="mb-4 md:mb-5">
                <label className="text-[12px] md:text-[13px] font-bold block mb-1.5 md:mb-2">Document Type</label>
                <select className="input-field py-2.5 md:py-3.5 text-sm" value={newDocType} onChange={e => setNewDocType(e.target.value)}>
                  {DOC_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>

              <div className="mb-6 md:mb-8">
                <label className="text-[12px] md:text-[13px] font-bold block mb-1.5 md:mb-2">Select File</label>
                <div className="border-2 border-dashed border-[var(--card-border)] hover:border-[var(--primary)] rounded-2xl p-6 md:p-8 text-center cursor-pointer transition-colors bg-[var(--bg2)]">
                  <div className="text-[32px] md:text-[40px] mb-2 md:mb-3">📎</div>
                  <div className="text-[13px] md:text-[15px] font-bold">Drop file here or click to browse</div>
                  <div className="text-[11px] md:text-[12px] text-[var(--text-muted)] mt-1.5">PDF, JPG, PNG up to 5MB</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="btn-outline justify-center min-h-[44px] md:min-h-[48px] text-[13px] md:text-[14px]" onClick={() => setShowUpload(false)}>Cancel</button>
                <button className="btn-primary justify-center min-h-[44px] md:min-h-[48px] text-[13px] md:text-[14px]" onClick={handleUpload}>
                  <Upload size={16} className="mr-1.5" /> Upload
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
