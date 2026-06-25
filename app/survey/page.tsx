'use client';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useDatabase } from '@/contexts/DatabaseContext';
import { CheckCircle2, ChevronRight, BarChart2, Save, FileText, CheckCircle, HelpCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const SECTIONS = [
  {
    id: 'A', title: 'Section A: Basic Information', questions: [
      { id: 'name', label: 'Name (Optional)', type: 'text' },
      { id: 'ageGroup', label: 'Age Group', type: 'radio', options: ['Under 18', '18-25', '26-40', '41-60', 'Above 60'] },
      { id: 'gender', label: 'Gender', type: 'radio', options: ['Male', 'Female', 'Other'] },
      { id: 'occupation', label: 'Occupation', type: 'radio', options: ['Student', 'Farmer', 'Daily Wage Worker', 'Business/Self-Employed', 'Government/Private Employee', 'Unemployed', 'Other'] },
      { id: 'residence', label: 'Area of Residence (Village/Mandal/District)', type: 'text' },
    ]
  },
  {
    id: 'B', title: 'Section B: Digital Access & Device Usage', questions: [
      { id: 'devices', label: 'What devices do you use?', type: 'checkbox', options: ['Smartphone', 'Basic/Feature Phone', 'Laptop/Desktop', 'Tablet', 'None'] },
      { id: 'internet', label: 'What kind of internet connection do you use?', type: 'radio', options: ['Mobile Data (4G/5G)', 'Broadband/Wi-Fi', 'Public Wi-Fi / Panchayat Wi-Fi', 'No Internet Access'] },
      { id: 'digitalConfidence', label: 'How confident are you in using digital platforms?', type: 'radio', options: ['Very Confident', 'Somewhat Confident', 'Need Help', 'Not Confident At All'] },
    ]
  },
  {
    id: 'C', title: 'Section C: Awareness About Govt Services', questions: [
      { id: 'knowledgeGovt', label: 'Are you aware of platforms like DigiLocker, UMANG, or MeeSeva?', type: 'radio', options: ['Yes, I use them', 'I know them but don’t use them', 'Never heard of them'] },
      { id: 'servicesUsed', label: 'Which online services have you used? (Select all that apply)', type: 'checkbox', options: ['Applying for Certificates', 'Scholarship Registration', 'PM Kisan/Agri Schemes', 'Job Portals', 'Paying Bills Online', 'None'] },
      { id: 'whoHelps', label: 'Who helps you fill online applications?', type: 'radio', options: ['I do it myself', 'Family/Friends', 'MeeSeva/CSC Agent', 'Internet Cafe'] },
      { id: 'cscAwareness', label: 'Do you know where the nearest Common Service Center (CSC) is?', type: 'radio', options: ['Yes', 'No'] },
      { id: 'preferredLanguage', label: 'What is your preferred language for using online services?', type: 'radio', options: ['Telugu', 'English', 'Hindi', 'Other'] },
      { id: 'missedDeadlines', label: 'Have you ever missed a scheme because you didn’t know the deadline?', type: 'radio', options: ['Yes, often', 'Sometimes', 'No, never'] },
    ]
  },
  {
    id: 'D', title: 'Section D: Challenges & Barriers', questions: [
      { id: 'langProblem', label: 'Language Problems (Everything is in English)', type: 'radio', options: ['Major Challenge', 'Minor Challenge', 'Not a Challenge'] },
      { id: 'digitalKnowledge', label: 'Lack of Digital Knowledge (Don’t know how to navigate)', type: 'radio', options: ['Major Challenge', 'Minor Challenge', 'Not a Challenge'] },
      { id: 'smartphoneAvail', label: 'Smartphone / Internet Availability', type: 'radio', options: ['Major Challenge', 'Minor Challenge', 'Not a Challenge'] },
      { id: 'fearMistakes', label: 'Fear of Making Mistakes (Entering wrong details)', type: 'radio', options: ['Major Challenge', 'Minor Challenge', 'Not a Challenge'] },
      { id: 'privacyConcerns', label: 'Privacy Concerns (Fear of sharing Aadhaar details)', type: 'radio', options: ['Major Challenge', 'Minor Challenge', 'Not a Challenge'] },
      { id: 'dependenceAgents', label: 'Dependence on Agents (Extra fees)', type: 'radio', options: ['Major Challenge', 'Minor Challenge', 'Not a Challenge'] },
      { id: 'uploadComfort', label: 'How comfortable are you scanning/uploading documents?', type: 'radio', options: ['Very Comfortable', 'Need Help', 'Cannot do it'] },
      { id: 'onlineSafety', label: 'Do you feel safe sharing details online?', type: 'radio', options: ['Yes, always', 'Sometimes', 'No, I am afraid of scams'] },
    ]
  },
  {
    id: 'E', title: 'Section E: Platform Feedback (RIHC)', questions: [
      { id: 'interestRIHC', label: 'If a local web platform (RIHC) existed to help you in Telugu, would you use it?', type: 'radio', options: ['Definitely', 'Maybe', 'No'] },
      { id: 'usefulFeatures', label: 'Which features would be most useful to you? (Select all that apply)', type: 'checkbox', options: ['Step-by-step guides in Telugu', 'Worker/Job Marketplace', 'Voice Search', 'Direct links to Govt schemes', 'Document Resizer/Converter'] },
      { id: 'awarenessCamps', label: 'Would you attend a free digital awareness camp in your village?', type: 'radio', options: ['Yes', 'No'] },
      { id: 'mobileApp', label: 'Would you prefer this platform as a Mobile App or Website?', type: 'radio', options: ['Mobile App', 'Website', 'Both'] },
    ]
  },
  {
    id: 'F', title: 'Section F: Suggestions', questions: [
      { id: 'remarks', label: 'Any other remarks, suggestions, or features you want?', type: 'textarea' },
    ]
  }
];

export default function SurveyPage() {
  const { t } = useLanguage();
  const { addDocument } = useDatabase();
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const section = SECTIONS[currentSectionIdx];
  const progress = ((currentSectionIdx) / SECTIONS.length) * 100;

  const handleAnswer = (questionId: string, value: any, isCheckbox: boolean = false) => {
    if (isCheckbox) {
      const current = (answers[questionId] as string[]) || [];
      if (current.includes(value)) {
        setAnswers({ ...answers, [questionId]: current.filter(v => v !== value) });
      } else {
        setAnswers({ ...answers, [questionId]: [...current, value] });
      }
    } else {
      setAnswers({ ...answers, [questionId]: value });
    }
  };

  const isSectionComplete = () => {
    const optionalFields = ['name', 'remarks'];
    
    for (const q of section.questions) {
      if (optionalFields.includes(q.id)) continue;
      
      const ans = answers[q.id];
      if (q.type === 'checkbox') {
        if (!ans || (ans as string[]).length === 0) return false;
      } else {
        if (!ans || String(ans).trim() === '') return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await addDocument('surveys', answers);
    setSubmitted(true);
    setIsSubmitting(false);
    toast.success('Survey submitted successfully! Thank you! 🙏');
  };

  const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

  if (submitted) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center bg-[var(--bg)] p-4 md:p-6 relative">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white border border-[var(--card-border)] rounded-3xl p-8 md:p-12 text-center w-full max-w-[520px] shadow-2xl relative z-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)] opacity-5 rounded-bl-full" />
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} className="text-[#27AE60]" />
          </div>
          <h2 className="text-3xl font-black mb-4 text-[var(--text)] tracking-tight">Thank You!</h2>
          <p className="text-[var(--text-muted)] mb-8 leading-relaxed text-[15px] font-medium">
            Your responses to the Community Service Project Survey have been securely recorded. Your data is used anonymously to understand community needs and improve rural digital services.
          </p>

          <a href="/analytics" className="no-underline block w-full">
            <button className="bg-[var(--primary)] hover:bg-[var(--primary-light)] text-white border-none py-4 px-6 rounded-xl font-bold text-[15px] flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 transition-all w-full">
              <BarChart2 size={20} /> View Live Analytics Dashboard
            </button>
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] bg-[var(--bg)] flex flex-col pb-12 relative">
      {/* Header */}
      <div className="bg-[var(--primary)] pt-28 pb-20 px-4 md:px-6 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--secondary)] opacity-10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
        
        <div className="relative z-10 max-w-[800px] mx-auto">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-white/20 backdrop-blur-md">
            <FileText size={32} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Community Needs Survey</h1>
          <p className="opacity-80 max-w-[600px] mx-auto text-[15px] md:text-[17px] leading-relaxed font-medium">
            Help us understand the digital challenges and awareness levels in rural Andhra Pradesh to improve the RIHC platform.
          </p>
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="max-w-[800px] mx-auto w-full px-4 md:px-6 -mt-8 relative z-20 mb-8">
        <div className="bg-white rounded-2xl shadow-lg border border-[var(--card-border)] p-5">
          <div className="flex justify-between mb-3 text-[13px]">
            <span className="text-[var(--text-muted)] font-bold uppercase tracking-wider">Section {currentSectionIdx + 1} of {SECTIONS.length}</span>
            <span className="font-black text-[var(--primary)]">{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full h-3 bg-[var(--bg2)] rounded-full overflow-hidden border border-[var(--card-border)]">
            <div className="h-full bg-[var(--primary)] rounded-full transition-all duration-500 ease-out relative" style={{ width: `${progress}%` }}>
              <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]" />
            </div>
          </div>
        </div>
      </div>

      {/* Form Area */}
      <div className="flex-1 px-4 md:px-6 max-w-[800px] mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div key={currentSectionIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="bg-white rounded-3xl shadow-sm border border-[var(--card-border)] p-6 md:p-10 mb-8">
            <h2 className="text-xl md:text-2xl font-black mb-8 text-[var(--text)] pb-4 border-b-2 border-[var(--card-border)] flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[var(--primary)] text-white flex items-center justify-center text-[15px]">{section.id}</span>
              {section.title.split(': ')[1]}
            </h2>

            <div className="flex flex-col gap-8 mb-10">
              {section.questions.map(q => {
                const isOptional = q.id === 'name' || q.id === 'remarks';
                
                return (
                  <div key={q.id}>
                    <label className="text-[15px] md:text-[16px] font-extrabold mb-3 flex items-start gap-2 text-[var(--text)] leading-snug">
                      <HelpCircle size={18} className="text-[var(--primary)] shrink-0 mt-0.5" />
                      <div>
                        {q.label} {!isOptional && <span className="text-[#E74C3C]">*</span>}
                        {isOptional && <span className="text-[12px] text-[var(--text-muted)] font-medium ml-2">(Optional)</span>}
                      </div>
                    </label>

                    {q.type === 'text' && (
                      <input 
                        type="text" 
                        className="w-full py-3.5 px-4 rounded-xl border-2 border-[var(--card-border)] bg-[var(--bg)] text-[15px] focus:outline-none focus:border-[var(--primary)] transition-all font-medium" 
                        value={answers[q.id] || ''} 
                        onChange={(e) => handleAnswer(q.id, e.target.value)}
                        placeholder="Type your answer here..."
                      />
                    )}

                    {q.type === 'textarea' && (
                      <textarea 
                        className="w-full py-3.5 px-4 rounded-xl border-2 border-[var(--card-border)] bg-[var(--bg)] text-[15px] focus:outline-none focus:border-[var(--primary)] transition-all font-medium resize-y min-h-[120px]" 
                        rows={4}
                        value={answers[q.id] || ''} 
                        onChange={(e) => handleAnswer(q.id, e.target.value)}
                        placeholder="Type your remarks/suggestions here..."
                      />
                    )}

                    {(q.type === 'radio' || q.type === 'checkbox') && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {q.options?.map(opt => {
                          const isSelected = q.type === 'checkbox'
                            ? ((answers[q.id] as string[]) || []).includes(opt)
                            : answers[q.id] === opt;

                          return (
                            <button key={opt} onClick={() => handleAnswer(q.id, opt, q.type === 'checkbox')}
                              className={`p-4 rounded-xl cursor-pointer text-left flex items-start gap-3 transition-all min-h-[56px] border-2 ${isSelected ? 'border-[var(--primary)] bg-blue-50 shadow-sm' : 'border-[var(--card-border)] bg-white hover:border-[var(--text-muted)] hover:bg-[var(--bg2)]'}`}>
                              <div className={`w-5 h-5 shrink-0 border-2 flex items-center justify-center mt-0.5 transition-colors ${q.type === 'checkbox' ? 'rounded-md' : 'rounded-full'} ${isSelected ? 'border-[var(--primary)] bg-[var(--primary)]' : 'border-[var(--card-border)] bg-white'}`}>
                                {isSelected && <CheckCircle size={14} className="text-white" strokeWidth={3} />}
                              </div>
                              <span className={`text-[14px] leading-snug pt-0.5 ${isSelected ? 'font-bold text-[var(--primary)]' : 'font-medium text-[var(--text)]'}`}>{opt}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 border-t-2 border-[var(--card-border)] pt-8">
              {currentSectionIdx > 0 && (
                <button className="bg-white hover:bg-[var(--bg2)] text-[var(--text)] border-2 border-[var(--card-border)] py-4 px-6 rounded-xl text-[15px] font-bold flex-1 transition-colors" onClick={() => setCurrentSectionIdx(s => s - 1)}>
                  ← Previous
                </button>
              )}
              
              {currentSectionIdx < SECTIONS.length - 1 ? (
                <button className="bg-[var(--primary)] hover:bg-[var(--primary-light)] text-white border-none py-4 px-6 rounded-xl text-[15px] font-bold flex-[2] flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed" 
                  onClick={() => {
                    if (isSectionComplete()) {
                      setCurrentSectionIdx(s => s + 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                      toast.error('Please complete all required fields in this section.');
                    }
                  }}
                  disabled={!isSectionComplete()}>
                  Next Section <ChevronRight size={20} />
                </button>
              ) : (
                <button className="bg-[#27AE60] hover:bg-[#219653] text-white border-none py-4 px-6 rounded-xl text-[15px] font-bold flex-[2] flex items-center justify-center gap-2 shadow-lg shadow-green-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => {
                  if (isSectionComplete()) {
                    handleSubmit();
                  } else {
                    toast.error('Please complete all required fields before submitting.');
                  }
                }}
                  disabled={!isSectionComplete() || isSubmitting}>
                  {isSubmitting ? 'Submitting securely...' : 'Submit Official Survey ✓'}
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
