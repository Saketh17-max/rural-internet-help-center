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
      <div style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: 20 }}>
        <div className="glass-card" style={{ padding: '48px', textAlign: 'center', maxWidth: 520, width: '100%' }}>
          <div style={{ fontSize: 72, marginBottom: 20 }}>🙏</div>
          <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 12 }}>Thank You!</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 28, lineHeight: 1.7 }}>
            Your responses to the Community Service Project Survey have been securely recorded. Your data is used anonymously to understand community needs and improve rural digital services.
          </p>

          <a href="/analytics" style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <BarChart2 size={16} /> View Live Analytics Dashboard
            </button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '90vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1b4f72, #0a2744)', padding: '32px 24px', color: 'white', textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 10 }}>📋</div>
        <h1 style={{ fontSize: 'clamp(1.4rem,4vw,1.8rem)', fontWeight: 900, marginBottom: 6 }}>Official Community Service Project Survey</h1>
        <p style={{ opacity: 0.8, maxWidth: 600, margin: '0 auto', fontSize: 14 }}>
          This survey helps us understand the digital needs, challenges, and awareness levels of citizens in rural areas to improve the Rural Internet Help Center platform.
        </p>
      </div>

      {/* Progress */}
      <div style={{ background: 'var(--card)', borderBottom: '1px solid var(--card-border)', padding: '16px 24px', position: 'sticky', top: 60, zIndex: 10 }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13 }}>
            <span style={{ color: 'var(--text-muted)' }}>Section {currentSectionIdx + 1} of {SECTIONS.length}</span>
            <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{Math.round(progress)}% complete</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Form Area */}
      <div style={{ flex: 1, padding: '40px 20px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div className="glass-card" style={{ padding: '36px' }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 32, color: 'var(--primary)', borderBottom: '2px solid var(--card-border)', paddingBottom: 16 }}>
              {section.title}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginBottom: 40 }}>
              {section.questions.map(q => {
                const isOptional = q.id === 'name' || q.id === 'remarks';
                
                return (
                  <div key={q.id}>
                    <label style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, display: 'block', color: 'var(--text)' }}>
                      {q.label} {!isOptional && <span style={{ color: '#e74c3c' }}>*</span>}
                    </label>

                    {q.type === 'text' && (
                      <input 
                        type="text" 
                        className="input-field" 
                        value={answers[q.id] || ''} 
                        onChange={(e) => handleAnswer(q.id, e.target.value)}
                        placeholder="Type your answer here..."
                        style={{ width: '100%', padding: '14px', fontSize: 15 }}
                      />
                    )}

                    {q.type === 'textarea' && (
                      <textarea 
                        className="input-field" 
                        rows={4}
                        value={answers[q.id] || ''} 
                        onChange={(e) => handleAnswer(q.id, e.target.value)}
                        placeholder="Type your remarks/suggestions here..."
                        style={{ width: '100%', padding: '14px', fontSize: 15, resize: 'vertical' }}
                      />
                    )}

                    {(q.type === 'radio' || q.type === 'checkbox') && (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
                        {q.options?.map(opt => {
                          const isSelected = q.type === 'checkbox'
                            ? ((answers[q.id] as string[]) || []).includes(opt)
                            : answers[q.id] === opt;

                          return (
                            <button key={opt} onClick={() => handleAnswer(q.id, opt, q.type === 'checkbox')}
                              style={{
                                padding: '14px 16px', borderRadius: 12, cursor: 'pointer', textAlign: 'left',
                                border: isSelected ? '2px solid var(--primary)' : '2px solid var(--card-border)',
                                background: isSelected ? 'rgba(26,107,58,0.08)' : 'transparent',
                                color: isSelected ? 'var(--primary)' : 'var(--text)',
                                fontWeight: isSelected ? 700 : 500, fontSize: 14,
                                display: 'flex', alignItems: 'center', gap: 12, transition: 'all 0.2s',
                              }}>
                              <div style={{
                                width: 20, height: 20, borderRadius: q.type === 'checkbox' ? 6 : '50%', flexShrink: 0,
                                border: isSelected ? '2px solid var(--primary)' : '2px solid var(--card-border)',
                                background: isSelected ? 'var(--primary)' : 'transparent',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                              }}>
                                {isSelected && <CheckCircle size={12} style={{ color: 'white' }} />}
                              </div>
                              {opt}
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
            <div style={{ display: 'flex', gap: 16, borderTop: '2px solid var(--card-border)', paddingTop: 24 }}>
              {currentSectionIdx > 0 && (
                <button className="btn-outline" onClick={() => setCurrentSectionIdx(s => s - 1)}
                  style={{ flex: 1, justifyContent: 'center' }}>
                  ← Previous Section
                </button>
              )}
              
              {currentSectionIdx < SECTIONS.length - 1 ? (
                <button className="btn-primary" 
                  onClick={() => {
                    if (isSectionComplete()) {
                      setCurrentSectionIdx(s => s + 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                      toast.error('Please complete all required fields in this section.');
                    }
                  }}
                  style={{ flex: 2, justifyContent: 'center', opacity: isSectionComplete() ? 1 : 0.5 }}>
                  Next Section <ChevronRight size={18} />
                </button>
              ) : (
                <button className="btn-primary" onClick={() => {
                  if (isSectionComplete()) {
                    handleSubmit();
                  } else {
                    toast.error('Please complete all required fields before submitting.');
                  }
                }}
                  style={{ flex: 2, justifyContent: 'center', opacity: isSectionComplete() && !isSubmitting ? 1 : 0.5 }}
                  disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting securely...' : 'Submit Official Survey ✓'}
                </button>
              )}
            </div>

            <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', marginTop: 20 }}>
              Section {currentSectionIdx + 1} of {SECTIONS.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
