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
    <div style={{ background: 'var(--bg)', minHeight: '90vh' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1b4f72, #16a085)', padding: '40px 24px', color: 'white', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🔒</div>
        <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.2rem)', fontWeight: 900, marginBottom: 8 }}>{t('lockerTitle')}</h1>
        <p style={{ opacity: 0.8, maxWidth: 500, margin: '0 auto 20px' }}>{t('lockerDesc')}</p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          {['🔐 AES-256 Encrypted', '☁️ Secure Cloud', '📱 Access Anytime'].map(badge => (
            <div key={badge} style={{ padding: '6px 16px', borderRadius: '50px', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', fontSize: 13 }}>{badge}</div>
          ))}
        </div>
      </div>

      <div className="page-container" style={{ padding: '32px 20px' }}>
        {/* Storage Info */}
        <div style={{ background: 'var(--card)', border: '1px solid var(--card-border)', borderRadius: 16, padding: '20px 24px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Lock size={16} style={{ color: 'var(--primary)' }} /> Storage Used: 1.9 MB of 100 MB
            </div>
            <div className="progress-bar" style={{ height: 10 }}>
              <div className="progress-fill" style={{ width: '1.9%' }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ textAlign: 'center', padding: '10px 16px', borderRadius: 10, background: 'var(--bg2)' }}>
              <div style={{ fontWeight: 800, fontSize: 20, color: 'var(--primary)' }}>{docs.length}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Documents</div>
            </div>
            <div style={{ textAlign: 'center', padding: '10px 16px', borderRadius: 10, background: 'var(--bg2)' }}>
              <div style={{ fontWeight: 800, fontSize: 20, color: '#27ae60' }}>{docs.filter(d => d.verified).length}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Verified</div>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
          <input className="input-field" style={{ flex: 1, minWidth: 200 }} placeholder="Search documents..."
            value={search} onChange={e => setSearch(e.target.value)} />
          <button className="btn-primary" onClick={() => setShowUpload(true)}>
            <Plus size={16} /> {t('uploadDoc')}
          </button>
        </div>

        {/* Document Type Categories */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 24, paddingBottom: 4 }}>
          {['All', 'Identity', 'Certificates', 'Education', 'Financial'].map(cat => (
            <button key={cat}
              style={{ padding: '6px 16px', borderRadius: '50px', whiteSpace: 'nowrap', fontSize: 13, cursor: 'pointer', border: cat === 'All' ? 'none' : '1.5px solid var(--card-border)', background: cat === 'All' ? 'var(--primary)' : 'transparent', color: cat === 'All' ? 'white' : 'var(--text)', fontWeight: cat === 'All' ? 700 : 500 }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Documents Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📂</div>
            <p>{t('noDocuments')}</p>
            <button className="btn-primary" style={{ marginTop: 16 }} onClick={() => setShowUpload(true)}>
              <Upload size={16} /> Upload First Document
            </button>
          </div>
        ) : (
          <div className="grid-3">
            {filtered.map(doc => (
              <div key={doc.id} style={{ background: 'var(--card)', border: '1.5px solid var(--card-border)', borderRadius: 16, padding: '20px', transition: 'all 0.2s', boxShadow: 'var(--shadow)' }}
                onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)')}
                onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.transform = 'none')}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ fontSize: 36 }}>{doc.icon}</div>
                  {doc.verified && <span className="badge badge-verified" style={{ fontSize: 10 }}>✓ Verified</span>}
                </div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{doc.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>{doc.type}</div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                  <span className="badge badge-info" style={{ fontSize: 10 }}>📁 {doc.size}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>📅 {doc.date}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 6 }}>
                  <button className="btn-primary" style={{ padding: '7px 12px', fontSize: 12, justifyContent: 'center', borderRadius: 8 }}
                    onClick={() => toast.success('Downloading...')}>
                    <Download size={12} />
                  </button>
                  <button className="btn-outline" style={{ padding: '7px 12px', fontSize: 12, justifyContent: 'center', borderRadius: 8 }}
                    onClick={() => toast.success('Document shared!')}>
                    Share
                  </button>
                  <button onClick={() => deleteDoc(doc.id)}
                    style={{ padding: '7px 10px', borderRadius: 8, background: 'rgba(231,76,60,0.1)', border: '1px solid rgba(231,76,60,0.3)', color: '#e74c3c', cursor: 'pointer' }}>
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upload Modal */}
        {showUpload && (
          <div className="modal-overlay" onClick={() => setShowUpload(false)}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
              <h2 style={{ fontWeight: 800, marginBottom: 6 }}>Upload Document</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 24 }}>Securely upload your document to Digital Locker</p>

              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Document Name</label>
                <input className="input-field" placeholder="e.g., Aadhaar Card, PAN Card..."
                  value={newDocName} onChange={e => setNewDocName(e.target.value)} />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Document Type</label>
                <select className="input-field" value={newDocType} onChange={e => setNewDocType(e.target.value)}>
                  {DOC_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Select File</label>
                <div style={{
                  border: '2px dashed var(--card-border)', borderRadius: 12, padding: '32px',
                  textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'var(--primary)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'var(--card-border)')}
                >
                  <div style={{ fontSize: 36, marginBottom: 8 }}>📎</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>Drop file here or click to browse</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>PDF, JPG, PNG up to 5MB</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <button className="btn-outline" onClick={() => setShowUpload(false)}>Cancel</button>
                <button className="btn-primary" style={{ justifyContent: 'center' }} onClick={handleUpload}>
                  <Upload size={16} /> Upload
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
