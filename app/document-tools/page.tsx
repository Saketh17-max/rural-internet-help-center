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
    <div className="bg-[var(--bg)] min-h-[90vh] pb-12">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#16213e] to-[#1b4f72] pt-24 pb-10 md:pb-12 px-4 md:px-6 text-white text-center">
        <div className="text-4xl md:text-5xl mb-3 md:mb-4">📄</div>
        <h1 className="text-2xl md:text-[clamp(1.8rem,4vw,2.2rem)] font-black mb-2.5">{t('docToolsTitle')}</h1>
        <p className="opacity-90 max-w-[520px] mx-auto mb-5 md:mb-6 text-[13px] md:text-[15px] leading-relaxed">{t('docToolsDesc')}</p>
        <div className="flex gap-2 md:gap-3 justify-center flex-wrap">
          {['🆓 100% Free', '🔒 Private & Secure', '📱 Works on Mobile', '⚡ Fast Processing'].map(b => (
            <span key={b} className="py-1.5 px-3 md:py-2 md:px-4 rounded-full bg-[rgba(255,255,255,0.12)] border border-[rgba(255,255,255,0.25)] text-[11px] md:text-[12px] font-semibold backdrop-blur-sm">{b}</span>
          ))}
        </div>
      </div>

      <div className="page-container px-4 md:px-6 py-6 md:py-10">
        {/* Tools Grid */}
        <div className="mb-10 md:mb-12">
          <div className="text-left mb-6 md:mb-8">
            <h2 className="text-[20px] md:text-[24px] font-extrabold leading-tight">Document <span className="text-[var(--primary)]">Processing Tools</span></h2>
            <div className="w-12 h-1 bg-[var(--primary)] mt-3 rounded-full mb-3" />
            <p className="text-[13px] md:text-[14px] text-[var(--text-muted)] font-medium">All tools work in your browser — no files are uploaded to our servers</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 md:gap-4">
            {TOOLS.map(tool => (
              <div key={tool.title} className="bg-[var(--card)] border-[1.5px] border-[var(--card-border)] rounded-2xl p-4 md:p-5 flex flex-col gap-3 cursor-pointer transition-all hover:-translate-y-1 shadow-sm"
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = tool.color; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--card-border)'; }}
                onClick={() => toast.success(`${tool.action} tool: Upload your file to proceed`)}
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-[24px] md:text-[28px] mb-1" style={{ background: `${tool.color}15` }}>
                  {tool.icon}
                </div>
                <div className="font-extrabold text-[14px] md:text-[15px]">{tool.title}</div>
                <div className="text-[11px] md:text-[13px] text-[var(--text-muted)] leading-relaxed flex-1">{tool.desc}</div>
                <button className="py-2.5 md:py-2 px-4 rounded-xl text-white font-bold text-[12px] md:text-[13px] mt-2 md:mt-3 border-none cursor-pointer w-full min-h-[44px] md:min-h-[40px] shadow-sm active:scale-95 transition-transform" style={{ background: tool.color }}>
                  {tool.action} Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Photo Size Guide */}
        <section className="mb-10 md:mb-12">
          <div className="text-left mb-6 md:mb-8">
            <h2 className="text-[18px] md:text-[22px] font-extrabold flex items-center gap-2">📸 Standard Photo Sizes Guide</h2>
            <div className="w-12 h-1 bg-[var(--primary)] mt-3 rounded-full mb-3" />
            <p className="text-[13px] md:text-[14px] text-[var(--text-muted)] font-medium">Resize your photos to the exact size needed for government documents</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {PHOTO_SIZES.map(size => (
              <div key={size.name} className="bg-[var(--card)] border-[1.5px] border-[var(--card-border)] rounded-xl md:rounded-2xl p-4 md:p-5 flex gap-3.5 items-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-[var(--bg2)] flex items-center justify-center text-[20px] md:text-[22px] shrink-0 border border-[var(--card-border)]">🖼️</div>
                <div className="flex-1 min-w-0">
                  <div className="font-extrabold text-[13px] md:text-[14px] mb-0.5 truncate">{size.name}</div>
                  <div className="text-[12px] md:text-[13px] text-[var(--primary)] font-bold mb-0.5">{size.size}</div>
                  <div className="text-[10px] md:text-[11px] text-[var(--text-muted)] font-medium">{size.pixels}</div>
                </div>
                <button className="btn-outline shrink-0 py-2.5 px-3 md:px-4 text-[11px] md:text-[12px] min-h-[40px]"
                  onClick={() => toast.success(`Setting size: ${size.size}`)}>
                  Resize
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Tips Section */}
        <div className="bg-gradient-to-br from-[#1a6b3a] to-[#16a085] rounded-2xl md:rounded-[20px] p-5 md:p-8 text-white shadow-lg">
          <h2 className="text-[18px] md:text-[20px] font-extrabold mb-5 md:mb-6">💡 Document Upload Tips</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {[
              { tip: 'Scan documents in good lighting — avoid shadows or blur', icon: '💡' },
              { tip: 'Keep file size under 500KB for MeeSeva/online portals', icon: '📏' },
              { tip: 'Use PDF format for official documents — JPG for photos', icon: '📄' },
              { tip: 'Always keep original copies — never give originals to agents', icon: '🔒' },
            ].map(item => (
              <div key={item.tip} className="flex gap-3 items-start p-3.5 md:p-4 rounded-xl bg-[rgba(255,255,255,0.15)] hover:bg-[rgba(255,255,255,0.2)] transition-colors">
                <span className="text-[20px] md:text-[22px] shrink-0 mt-0.5 leading-none">{item.icon}</span>
                <span className="text-[12px] md:text-[13px] opacity-90 leading-relaxed font-medium">{item.tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
