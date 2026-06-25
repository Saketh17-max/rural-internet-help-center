'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import toast from 'react-hot-toast';

const TOOLS = [
  { icon: '🗜️', title: 'Compress PDF', desc: 'Reduce PDF file size without losing quality. Ideal for email and uploads.', action: 'Compress', color: '#e74c3c' },
  { icon: '🔄', title: 'JPG to PDF', desc: 'Convert one or multiple JPG/PNG images to a single PDF document.', action: 'Convert', color: '#2980b9' },
  { icon: '📷', title: 'PDF to JPG', desc: 'Extract pages from PDF as high-quality JPG images.', action: 'Convert', color: '#8e44ad' },
  { icon: '✂️', title: 'Resize Photo', desc: 'Resize photos to specific dimensions. Perfect for passport/ID photos (35x45mm).', action: 'Resize', color: '#27ae60' },
  { icon: '📎', title: 'Merge PDFs', desc: 'Combine multiple PDF files into one single document easily.', action: 'Merge', color: '#e67e22' },
  { icon: '✂️', title: 'Split PDF', desc: 'Split a large PDF into smaller files or extract specific pages.', action: 'Split', color: '#1b4f72' },
  { icon: '🔍', title: 'Extract Text (OCR)', desc: 'Extract text from scanned documents and images using OCR technology.', action: 'Extract', color: '#16a085' },
  { icon: '🖼️', title: 'Remove Background', desc: 'Automatically remove background from photos for ID/passport use.', action: 'Process', color: '#c0392b' },
];

const PHOTO_SIZES = [
  { name: 'Passport Photo', size: '35×45mm', pixels: '413×531 px' },
  { name: 'Aadhaar Photo', size: '35×35mm', pixels: '300×300 px' },
  { name: 'Voter ID Photo', size: '20×25mm', pixels: '200×250 px' },
  { name: 'PAN Card Photo', size: '25×35mm', pixels: '200×300 px' },
  { name: 'EAMCET Photo', size: '4.5×3.5cm', pixels: '531×413 px' },
  { name: 'WhatsApp DP', size: '192×192px', pixels: '192×192 px' },
];

export default function DocumentToolsPage() {
  const { t } = useLanguage();

  return (
    <div style={{ background: 'var(--bg)', minHeight: '90vh' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #16213e, #1b4f72)', padding: '40px 24px', color: 'white', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>📄</div>
        <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.2rem)', fontWeight: 900, marginBottom: 8 }}>{t('docToolsTitle')}</h1>
        <p style={{ opacity: 0.8, maxWidth: 520, margin: '0 auto 16px' }}>{t('docToolsDesc')}</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          {['🆓 100% Free', '🔒 Private & Secure', '📱 Works on Mobile', '⚡ Fast Processing'].map(b => (
            <span key={b} style={{ padding: '6px 16px', borderRadius: '50px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', fontSize: 12 }}>{b}</span>
          ))}
        </div>
      </div>

      <div className="page-container" style={{ padding: '40px 20px' }}>
        {/* Tools Grid */}
        <div className="section-header">
          <h2>Document <span className="gradient-text">Processing Tools</span></h2>
          <div className="section-divider" />
          <p>All tools work in your browser — no files are uploaded to our servers</p>
        </div>

        <div className="grid-4" style={{ marginBottom: 48 }}>
          {TOOLS.map(tool => (
            <div key={tool.title} style={{
              background: 'var(--card)', border: '1.5px solid var(--card-border)', borderRadius: 16, padding: '24px',
              display: 'flex', flexDirection: 'column', gap: 12, cursor: 'pointer', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.borderColor = tool.color; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'none'; (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--card-border)'; }}
              onClick={() => toast.success(`${tool.action} tool: Upload your file to proceed`)}
            >
              <div style={{ width: 56, height: 56, borderRadius: 12, background: `${tool.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>
                {tool.icon}
              </div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{tool.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6, flex: 1 }}>{tool.desc}</div>
              <button style={{ padding: '8px 16px', borderRadius: 8, background: tool.color, color: 'white', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 12, marginTop: 'auto' }}>
                {tool.action} Now
              </button>
            </div>
          ))}
        </div>

        {/* Photo Size Guide */}
        <section style={{ marginBottom: 48 }}>
          <div className="section-header" style={{ textAlign: 'left', marginBottom: 20 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800 }}>📸 Standard Photo Sizes Guide</h2>
            <div className="section-divider" style={{ margin: '10px 0' }} />
            <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Resize your photos to the exact size needed for government documents</p>
          </div>
          <div className="grid-3">
            {PHOTO_SIZES.map(size => (
              <div key={size.name} style={{ background: 'var(--card)', border: '1.5px solid var(--card-border)', borderRadius: 12, padding: '16px 20px', display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: 8, background: 'var(--bg2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>🖼️</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{size.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600 }}>{size.size}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{size.pixels}</div>
                </div>
                <button className="btn-outline" style={{ marginLeft: 'auto', padding: '6px 12px', fontSize: 11, flexShrink: 0 }}
                  onClick={() => toast.success(`Setting size: ${size.size}`)}>
                  Resize
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Tips Section */}
        <div style={{ background: 'linear-gradient(135deg, #1a6b3a, #16a085)', borderRadius: 20, padding: '32px', color: 'white' }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>💡 Document Upload Tips</h2>
          <div className="grid-2">
            {[
              { tip: 'Scan documents in good lighting — avoid shadows or blur', icon: '💡' },
              { tip: 'Keep file size under 500KB for MeeSeva/online portals', icon: '📏' },
              { tip: 'Use PDF format for official documents — JPG for photos', icon: '📄' },
              { tip: 'Always keep original copies — never give originals to agents', icon: '🔒' },
            ].map(item => (
              <div key={item.tip} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '12px', borderRadius: 10, background: 'rgba(255,255,255,0.1)' }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
                <span style={{ fontSize: 13, opacity: 0.9, lineHeight: 1.6 }}>{item.tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
