'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import { FileArchive, RefreshCw, FileImage, Crop, FilePlus, SplitSquareHorizontal, SearchCode, ImageOff, Image as ImageIcon, CheckCircle2, FileText, Settings, Lightbulb, Ruler, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const TOOLS = [
  { icon: <FileArchive size={24}/>, title: 'Compress PDF', desc: 'Reduce PDF file size without losing quality. Ideal for email and uploads.', action: 'Compress', color: '#E74C3C' },
  { icon: <RefreshCw size={24}/>, title: 'JPG to PDF', desc: 'Convert one or multiple JPG/PNG images to a single PDF document.', action: 'Convert', color: '#2980B9' },
  { icon: <FileImage size={24}/>, title: 'PDF to JPG', desc: 'Extract pages from PDF as high-quality JPG images.', action: 'Convert', color: '#8E44AD' },
  { icon: <Crop size={24}/>, title: 'Resize Photo', desc: 'Resize photos to specific dimensions. Perfect for passport/ID photos.', action: 'Resize', color: '#27AE60' },
  { icon: <FilePlus size={24}/>, title: 'Merge PDFs', desc: 'Combine multiple PDF files into one single document easily.', action: 'Merge', color: '#E67E22' },
  { icon: <SplitSquareHorizontal size={24}/>, title: 'Split PDF', desc: 'Split a large PDF into smaller files or extract specific pages.', action: 'Split', color: '#1B4F72' },
  { icon: <SearchCode size={24}/>, title: 'Extract Text (OCR)', desc: 'Extract text from scanned documents and images using OCR technology.', action: 'Extract', color: '#16A085' },
  { icon: <ImageOff size={24}/>, title: 'Remove Background', desc: 'Automatically remove background from photos for ID/passport use.', action: 'Process', color: '#C0392B' },
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

  const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

  return (
    <div className="bg-[var(--bg)] min-h-[90vh] pb-12 relative">
      {/* Hero */}
      <div className="bg-[var(--primary)] pt-28 pb-20 px-4 md:px-6 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--secondary)] opacity-10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
        
        <div className="relative z-10 max-w-[800px] mx-auto">
          <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/20 backdrop-blur-md">
            <Settings size={40} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">{t('docToolsTitle')}</h1>
          <p className="opacity-80 max-w-[600px] mx-auto mb-8 text-[15px] md:text-[17px] leading-relaxed font-medium">{t('docToolsDesc')}</p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            {['🆓 100% Free', '🔒 Private & Secure', '📱 Works Offline', '⚡ Fast Processing'].map(b => (
              <span key={b} className="py-2 px-4 rounded-xl bg-white/10 border border-white/20 text-[13px] font-bold backdrop-blur-md shadow-sm">{b}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 -mt-8 relative z-20">
        {/* Tools Grid */}
        <div className="mb-12">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white rounded-3xl shadow-sm border border-[var(--card-border)] p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-[20px] font-extrabold text-[var(--text)] flex items-center gap-2"><Settings size={20} className="text-[var(--primary)]"/> Document Processing Tools</h2>
              <p className="text-[14px] text-[var(--text-muted)] font-medium mt-1">All tools work securely in your browser — no files are uploaded to our servers.</p>
            </div>
            <div className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-[13px] font-bold border border-green-100 flex items-center gap-2 shrink-0">
              <CheckCircle2 size={16}/> Privacy Guaranteed
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TOOLS.map((tool, idx) => (
              <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={idx} key={tool.title} className="bg-white border-2 border-[var(--card-border)] hover:border-current rounded-3xl p-6 flex flex-col gap-4 cursor-pointer transition-all shadow-sm hover:shadow-lg hover:-translate-y-1 group"
                style={{ color: tool.color }}
                onClick={() => toast.success(`${tool.action} tool: Upload your file to proceed`)}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border border-current/20 group-hover:scale-110 transition-transform" style={{ background: `${tool.color}10` }}>
                  {tool.icon}
                </div>
                <div>
                  <div className="font-black text-[16px] text-[var(--text)] mb-1 group-hover:text-current transition-colors">{tool.title}</div>
                  <div className="text-[13px] text-[var(--text-muted)] leading-relaxed font-medium line-clamp-3">{tool.desc}</div>
                </div>
                <div className="mt-auto pt-4">
                  <button className="w-full py-3 rounded-xl text-white font-bold text-[14px] border-none cursor-pointer shadow-sm active:scale-95 transition-transform" style={{ background: tool.color }}>
                    {tool.action} Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Photo Size Guide */}
        <section className="mb-12">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white rounded-3xl shadow-sm border border-[var(--card-border)] p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-[20px] font-extrabold text-[var(--text)] flex items-center gap-2"><ImageIcon size={20} className="text-[#27AE60]"/> Standard Photo Sizes Guide</h2>
              <p className="text-[14px] text-[var(--text-muted)] font-medium mt-1">Resize your photos to the exact dimensions needed for government applications.</p>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PHOTO_SIZES.map(size => (
              <motion.div initial="hidden" animate="visible" variants={fadeUp} key={size.name} className="bg-white border border-[var(--card-border)] rounded-2xl p-5 flex gap-4 items-center shadow-sm hover:shadow-md transition-shadow group cursor-pointer" onClick={() => toast.success(`Setting size: ${size.size}`)}>
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-[var(--text-muted)] group-hover:text-[var(--primary)] group-hover:bg-blue-50 shrink-0 border border-[var(--card-border)] transition-colors">
                  <Crop size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-extrabold text-[15px] text-[var(--text)] mb-0.5 truncate group-hover:text-[var(--primary)] transition-colors">{size.name}</div>
                  <div className="text-[13px] text-[var(--primary)] font-bold mb-0.5">{size.size}</div>
                  <div className="text-[11px] text-[var(--text-muted)] font-bold uppercase tracking-wider">{size.pixels}</div>
                </div>
                <button className="bg-[var(--bg2)] hover:bg-[var(--primary)] hover:text-white text-[var(--text)] border border-[var(--card-border)] shrink-0 py-2.5 px-4 text-[12px] font-bold rounded-xl transition-colors">
                  Resize
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tips Section */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-gradient-to-br from-[#0B6E4F] to-[#16A085] rounded-3xl p-8 md:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <h2 className="text-[20px] md:text-[24px] font-black mb-8 flex items-center gap-3"><Lightbulb size={28} className="text-yellow-400" /> Pro Tips for Document Uploads</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { tip: 'Scan documents in good lighting — avoid shadows or blur.', icon: <Lightbulb size={24} /> },
              { tip: 'Keep file size under 500KB for MeeSeva and online portals.', icon: <Ruler size={24} /> },
              { tip: 'Use PDF format for official documents — JPG for photos.', icon: <FileText size={24} /> },
              { tip: 'Always keep original copies — never give originals to agents.', icon: <Lock size={24} /> },
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-4 p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 transition-colors backdrop-blur-sm">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0">
                  {item.icon}
                </div>
                <span className="text-[14px] opacity-90 leading-relaxed font-medium">{item.tip}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
