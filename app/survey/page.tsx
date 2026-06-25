'use client';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useDatabase } from '@/contexts/DatabaseContext';
import { CheckCircle, ChevronRight, BarChart2, Save } from 'lucide-react';
import toast from 'react-hot-toast';

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
    id: 'C', title: 'Section C: Awareness About Government & Educational Services', questions: [
      { id: 'knowledgeGovt', label: 'Are you aware of platforms like DigiLocker, UMANG, or MeeSeva?', type: 'radio', options: ['Yes, I use them', 'I know them but don’t use them', 'Never heard of them'] },
      { id: 'servicesUsed', label: 'Which online services have you used? (Select all that apply)', type: 'checkbox', options: ['Applying for Certificates (Income/Caste)', 'Scholarship Registration', 'PM Kisan/Agri Schemes', 'Job Portals (NCS)', 'Paying Bills Online', 'None'] },
      { id: 'whoHelps', label: 'Who helps you fill online applications?', type: 'radio', options: ['I do it myself', 'Family/Friends', 'MeeSeva/CSC Agent', 'Internet Cafe'] },
      { id: 'cscAwareness', label: 'Do you know where the nearest Common Service Center (CSC) is?', type: 'radio', options: ['Yes', 'No'] },
      { id: 'preferredLanguage', label: 'What is your preferred language for using online services?', type: 'radio', options: ['Telugu', 'English', 'Hindi', 'Other'] },
      { id: 'missedDeadlines', label: 'Have you ever missed a government scheme or scholarship because you didn’t know the deadline?', type: 'radio', options: ['Yes, often', 'Sometimes', 'No, never'] },
    ]
  },
  {
    id: 'D', title: 'Section D: Challenges & Barriers', questions: [
      { id: 'langProblem', label: 'Language Problems (Everything is in English)', type: 'radio', options: ['Major Challenge', 'Minor Challenge', 'Not a Challenge'] },
      { id: 'digitalKnowledge', label: 'Lack of Digital Knowledge (Don’t know how to navigate)', type: 'radio', options: ['Major Challenge', 'Minor Challenge', 'Not a Challenge'] },
      { id: 'smartphoneAvail', label: 'Smartphone / Internet Availability', type: 'radio', options: ['Major Challenge', 'Minor Challenge', 'Not a Challenge'] },
      { id: 'fearMistakes', label: 'Fear of Making Mistakes (Entering wrong details)', type: 'radio', options: ['Major Challenge', 'Minor Challenge', 'Not a Challenge'] },
      { id: 'privacyConcerns', label: 'Privacy Concerns (Fear of sharing Aadhaar/Bank details)', type: 'radio', options: ['Major Challenge', 'Minor Challenge', 'Not a Challenge'] },
      { id: 'dependenceAgents', label: 'Dependence on Agents (MeeSeva charging extra fees)', type: 'radio', options: ['Major Challenge', 'Minor Challenge', 'Not a Challenge'] },
      { id: 'uploadComfort', label: 'How comfortable are you scanning and uploading documents (e.g., under 200kb)?', type: 'radio', options: ['Very Comfortable', 'Need Help', 'Cannot do it'] },
      { id: 'onlineSafety', label: 'Do you feel safe doing financial transactions or sharing details online?', type: 'radio', options: ['Yes, always', 'Sometimes', 'No, I am afraid of scams'] },
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
    // Optional fields
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

  if (submitted) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center bg-[var(--bg)] p-4 md:p-6">
        <div className="glass-card p-8 md:p-12 text-center w-full max-w-[520px]">
          <div className="text-[64px] md:text-[72px] mb-4 md:mb-5">🙏</div>
          <h2 className="text-[24px] md:text-[28px] font-black mb-3">Thank You!</h2>
          <p className="text-[var(--text-muted)] mb-7 leading-relaxed text-sm md:text-base">
            Your responses to the Community Service Project Survey have been securely recorded. Your data is used anonymously to understand community needs and improve rural digital services.
          </p>

          <a href="/analytics" className="no-underline block w-full">
            <button className="btn-primary w-full justify-center min-h-[48px] md:min-h-[52px]">
              <BarChart2 size={18} /> View Live Analytics Dashboard
            </button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] bg-[var(--bg)] flex flex-col pb-12">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1b4f72] to-[#0a2744] pt-24 pb-8 md:pb-10 px-4 md:px-6 text-white text-center">
        <div className="text-4xl md:text-5xl mb-3 md:mb-4">📋</div>
        <h1 className="text-xl md:text-[clamp(1.4rem,4vw,1.8rem)] font-black mb-2.5">Official Community Service Project Survey</h1>
        <p className="opacity-80 max-w-[600px] mx-auto text-[13px] md:text-sm leading-relaxed">
          This survey helps us understand the digital needs, challenges, and awareness levels of citizens in rural areas to improve the Rural Internet Help Center platform.
        </p>
      </div>

      {/* Progress */}
      <div className="bg-[var(--card)] border-b border-[var(--card-border)] px-4 md:px-6 py-3 md:py-4 sticky top-[60px] md:top-[72px] z-10 shadow-sm">
        <div className="max-w-[800px] mx-auto">
          <div className="flex justify-between mb-2 text-[11px] md:text-[13px]">
            <span className="text-[var(--text-muted)] font-semibold">Section {currentSectionIdx + 1} of {SECTIONS.length}</span>
            <span className="font-bold text-[var(--primary)]">{Math.round(progress)}% complete</span>
          </div>
          <div className="progress-bar h-1.5 md:h-2">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Form Area */}
      <div className="flex-1 px-4 md:px-6 py-6 md:py-10">
        <div className="max-w-[800px] mx-auto">
          <div className="glass-card p-5 md:p-9">
            <h2 className="text-lg md:text-[22px] font-extrabold mb-6 md:mb-8 text-[var(--primary)] border-b-2 border-[var(--card-border)] pb-3 md:pb-4 leading-tight">
              {section.title}
            </h2>

            <div className="flex flex-col gap-6 md:gap-8 mb-8 md:mb-10">
              {section.questions.map(q => {
                const isOptional = q.id === 'name' || q.id === 'remarks';
                
                return (
                  <div key={q.id}>
                    <label className="text-[14px] md:text-[16px] font-bold mb-2 md:mb-3 block text-[var(--text)] leading-snug">
                      {q.label} {!isOptional && <span className="text-[#e74c3c]">*</span>}
                    </label>

                    {q.type === 'text' && (
                      <input 
                        type="text" 
                        className="input-field w-full py-3 md:py-3.5 px-4 text-sm md:text-[15px]" 
                        value={answers[q.id] || ''} 
                        onChange={(e) => handleAnswer(q.id, e.target.value)}
                        placeholder="Type your answer here..."
                      />
                    )}

                    {q.type === 'textarea' && (
                      <textarea 
                        className="input-field w-full py-3 md:py-3.5 px-4 text-sm md:text-[15px] resize-y min-h-[100px]" 
                        rows={4}
                        value={answers[q.id] || ''} 
                        onChange={(e) => handleAnswer(q.id, e.target.value)}
                        placeholder="Type your remarks/suggestions here..."
                      />
                    )}

                    {(q.type === 'radio' || q.type === 'checkbox') && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 md:gap-3">
                        {q.options?.map(opt => {
                          const isSelected = q.type === 'checkbox'
                            ? ((answers[q.id] as string[]) || []).includes(opt)
                            : answers[q.id] === opt;

                          return (
                            <button key={opt} onClick={() => handleAnswer(q.id, opt, q.type === 'checkbox')}
                              className={`p-3 md:p-4 rounded-xl cursor-pointer text-left flex items-start gap-3 transition-all min-h-[44px] border-2 ${isSelected ? 'border-[var(--primary)] bg-[rgba(26,107,58,0.08)] text-[var(--primary)] font-bold' : 'border-[var(--card-border)] bg-transparent text-[var(--text)] font-medium hover:border-[rgba(0,0,0,0.1)] dark:hover:border-[rgba(255,255,255,0.1)]'}`}>
                              <div className={`w-5 h-5 md:w-[22px] md:h-[22px] shrink-0 border-2 flex items-center justify-center mt-0.5 ${q.type === 'checkbox' ? 'rounded-md' : 'rounded-full'} ${isSelected ? 'border-[var(--primary)] bg-[var(--primary)]' : 'border-[var(--card-border)] bg-[var(--bg2)]'}`}>
                                {isSelected && <CheckCircle size={14} className="text-white" />}
                              </div>
                              <span className="text-[13px] md:text-[14px] leading-snug pt-0.5">{opt}</span>
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
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 border-t-2 border-[var(--card-border)] pt-5 md:pt-6">
              {currentSectionIdx > 0 && (
                <button className="btn-outline flex-1 justify-center min-h-[48px] text-[14px] md:text-[15px]" onClick={() => setCurrentSectionIdx(s => s - 1)}>
                  ← Previous Section
                </button>
              )}
              
              {currentSectionIdx < SECTIONS.length - 1 ? (
                <button className="btn-primary sm:flex-[2] justify-center min-h-[48px] text-[14px] md:text-[15px] transition-opacity" 
                  onClick={() => {
                    if (isSectionComplete()) {
                      setCurrentSectionIdx(s => s + 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                      toast.error('Please complete all required fields in this section.');
                    }
                  }}
                  style={{ opacity: isSectionComplete() ? 1 : 0.5 }}>
                  Next Section <ChevronRight size={18} />
                </button>
              ) : (
                <button className="btn-primary sm:flex-[2] justify-center min-h-[48px] text-[14px] md:text-[15px] transition-opacity" onClick={() => {
                  if (isSectionComplete()) {
                    handleSubmit();
                  } else {
                    toast.error('Please complete all required fields before submitting.');
                  }
                }}
                  style={{ opacity: isSectionComplete() && !isSubmitting ? 1 : 0.5 }}
                  disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting securely...' : 'Submit Official Survey ✓'}
                </button>
              )}
            </div>

            <p className="text-center text-[11px] md:text-xs text-[var(--text-muted)] mt-4 md:mt-5 font-semibold">
              Section {currentSectionIdx + 1} of {SECTIONS.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
