import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Moon, Box, Lock, Sparkles, Send, Check } from 'lucide-react';
import { closureOptions, mindPrompts, somaticRituals, finalPrompts } from '../data/sleep-sanctuary';
import { clsx } from 'clsx';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { Layout } from '../components/Layout';

interface SleepSanctuaryProps {
  onBack: () => void;
}

export const SleepSanctuary: React.FC<SleepSanctuaryProps> = ({ onBack }) => {
  // State
  const [selectedClosures, setSelectedClosures] = useState<string[]>([]);
  const [mindNote, setMindNote] = useState('');
  const [isContained, setIsContained] = useState(false);
  const [selectedRitual, setSelectedRitual] = useState<string | null>(null);
  const [restMode, setRestMode] = useState(false);
  const [finalPromptIndex, setFinalPromptIndex] = useState(0);

  // Briefing State
  const [briefingNote, setBriefingNote] = useState('');
  const [isBriefingSaved, setIsBriefingSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Handlers
  const toggleClosure = (id: string) => {
    setSelectedClosures(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleContain = () => {
    if (mindNote.trim()) {
      setIsContained(true);
    }
  };

  const toggleRitual = (id: string) => {
    setSelectedRitual(prev => prev === id ? null : id);
  };

  const enterRest = () => {
    setRestMode(true);
    setFinalPromptIndex(Math.floor(Math.random() * finalPrompts.length));
  };

  const handleSaveBriefing = async () => {
    if (!briefingNote.trim()) return;
    
    setIsSaving(true);
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-3dfdce46/briefing`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ note: briefingNote })
      });

      if (!response.ok) {
        throw new Error('Failed to save briefing');
      }
      
      setIsBriefingSaved(true);
    } catch (err) {
      console.error('Error saving briefing:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={clsx(
      "min-h-screen transition-colors duration-1000 ease-in-out font-sans",
      restMode ? "bg-black text-[#A8A29D]" : ""
    )}>
      
      {/* Rest Mode Overlay - Full Screen Takeover */}
      <AnimatePresence>
        {restMode && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-8 bg-black"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full bg-[#1C1917] shadow-[0_0_100px_rgba(255,255,255,0.05)]"
            />
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 2 }}
              className="relative text-2xl md:text-3xl font-medium text-[#E7E5E4] text-center leading-relaxed tracking-wide"
            >
              {finalPrompts[finalPromptIndex]}
            </motion.h2>

            <button 
              onClick={() => setRestMode(false)}
              className="absolute bottom-12 text-[#78716C] hover:text-[#A8A29D] transition-colors text-xs uppercase tracking-widest font-bold"
            >
              Exit Rest Mode
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {!restMode && (
        <Layout isDark={true}>
          <div className="max-w-3xl mx-auto relative z-10">
            
            {/* Navigation */}
            <div className="mb-12">
               <button 
                 onClick={onBack}
                 className="flex items-center gap-3 text-[#A8A29D] hover:text-[#E7E5E4] transition-colors group"
               >
                 <div className="p-3 rounded-full bg-[#292524] shadow-[4px_4px_8px_rgba(0,0,0,0.5),-2px_-2px_6px_rgba(255,255,255,0.05)] group-hover:shadow-inner transition-all border border-white/5">
                   <ArrowLeft size={20} />
                 </div>
                 <span className="font-bold tracking-wide uppercase text-xs">Back to Dashboard</span>
               </button>
            </div>

            {/* Header */}
            <header className="mb-20 text-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center justify-center p-5 mb-6 rounded-full bg-[#292524] text-[#E7E5E4] shadow-[inset_3px_3px_6px_rgba(0,0,0,0.5),inset_-1px_-1px_2px_rgba(255,255,255,0.1)]">
                  <Moon size={28} strokeWidth={1.5} />
                </div>
                <h1 className="text-4xl md:text-5xl font-serif text-[#E7E5E4] mb-4 tracking-tight">
                  Sleep Sanctuary
                </h1>
                <p className="text-lg text-[#A8A29D] font-light">
                  Rituals to transition from high-alert to rest mode.
                </p>
              </motion.div>
            </header>

            {/* SECTION 1: CLOSING THE DAY */}
            <section className="mb-24">
              <h2 className="text-xl font-medium text-[#78716C] mb-8 flex items-center gap-4 uppercase tracking-widest text-xs">
                <span className="w-8 h-[1px] bg-[#44403C]"></span>
                The day is allowed to end
              </h2>
              
              <div className="space-y-5">
                {closureOptions.map((option) => {
                  const isSelected = selectedClosures.includes(option.id);
                  const Icon = option.icon;
                  const isBriefingOption = option.id === 'wait';

                  return (
                    <div key={option.id}>
                      <motion.button
                        onClick={() => toggleClosure(option.id)}
                        whileTap={{ scale: 0.98 }}
                        className={clsx(
                          "w-full p-6 rounded-[2rem] text-left transition-all duration-500 flex items-center gap-6 group border overflow-hidden",
                          isSelected 
                            ? "bg-[#292524] border-[#E7E5E4]/20 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.5)]" 
                            : "bg-[#292524] border-white/5 shadow-[6px_6px_12px_rgba(0,0,0,0.5),-2px_-2px_6px_rgba(255,255,255,0.05)] hover:bg-[#2e2a29]"
                        )}
                      >
                        <div className={clsx(
                          "p-3 rounded-full transition-colors flex-shrink-0",
                          isSelected ? "bg-[#1C1917] text-[#E7E5E4] shadow-sm" : "bg-[#1C1917] text-[#57534E] shadow-inner group-hover:text-[#A8A29D]"
                        )}>
                          <Icon size={22} />
                        </div>
                        <span className={clsx(
                          "text-lg font-light transition-colors",
                          isSelected ? "text-[#E7E5E4]" : "text-[#A8A29D]"
                        )}>
                          {option.text}
                        </span>
                        {isSelected && !isBriefingOption && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="ml-auto text-[#E7E5E4]"
                          >
                            <Sparkles size={18} />
                          </motion.div>
                        )}
                      </motion.button>

                      {/* Expansion for Briefing Note */}
                      <AnimatePresence>
                        {isSelected && isBriefingOption && (
                          <motion.div
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="bg-[#1C1917] border border-[#44403C] rounded-[1.5rem] p-6 ml-4 md:ml-12 relative shadow-inner">
                              {!isBriefingSaved ? (
                                <>
                                  <textarea
                                    value={briefingNote}
                                    onChange={(e) => setBriefingNote(e.target.value)}
                                    placeholder="What needs to happen tomorrow? Clear it from your mind."
                                    className="w-full bg-transparent border-none text-[#E7E5E4] placeholder:text-[#57534E] focus:outline-none focus:ring-0 resize-none h-24 text-base font-light mb-4 leading-relaxed"
                                  />
                                  <div className="flex justify-between items-center border-t border-[#44403C] pt-4">
                                    <span className="text-[10px] text-[#57534E] uppercase tracking-wide">
                                      Scheduled for 6:30 AM Briefing
                                    </span>
                                    <button
                                      onClick={handleSaveBriefing}
                                      disabled={!briefingNote.trim() || isSaving}
                                      className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#292524] text-[#E7E5E4] hover:bg-[#44403C] transition-colors text-xs font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed shadow-[2px_2px_4px_rgba(0,0,0,0.5)]"
                                    >
                                      {isSaving ? (
                                        <span>Saving...</span>
                                      ) : (
                                        <>
                                          <Send size={12} />
                                          Send to Future Self
                                        </>
                                      )}
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <motion.div 
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="flex items-center justify-center gap-4 py-6 text-[#E7E5E4]"
                                >
                                  <div className="p-2 rounded-full bg-[#292524] border border-[#44403C]">
                                    <Check size={18} />
                                  </div>
                                  <div className="text-sm">
                                    <span className="block font-bold">Saved securely.</span>
                                    <span className="text-[#78716C]">Check your inbox at 6:30 AM.</span>
                                  </div>
                                  <button 
                                    onClick={() => setIsBriefingSaved(false)}
                                    className="ml-4 text-xs text-[#78716C] hover:text-[#A8A29D] underline"
                                  >
                                    Edit
                                  </button>
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 2: RELEASING THE MIND */}
            <section className="mb-24">
              <h2 className="text-xl font-medium text-[#78716C] mb-8 flex items-center gap-4 uppercase tracking-widest text-xs">
                <span className="w-8 h-[1px] bg-[#44403C]"></span>
                Nothing needs solving tonight
              </h2>

              <div className="relative">
                <AnimatePresence mode="wait">
                  {!isContained ? (
                    <motion.div
                      key="editing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="bg-[#292524] border border-[#44403C] rounded-[2rem] p-8 shadow-[inset_2px_2px_10px_rgba(0,0,0,0.3)]"
                    >
                      <textarea
                        value={mindNote}
                        onChange={(e) => setMindNote(e.target.value)}
                        placeholder={mindPrompts[0]}
                        className="w-full bg-transparent border-none text-[#E7E5E4] placeholder:text-[#57534E] focus:outline-none focus:ring-0 resize-none h-40 text-lg leading-relaxed font-light"
                      />
                      <div className="mt-6 flex justify-between items-center">
                         <p className="text-xs text-[#57534E]">
                           Write what's looping. We'll hold it for tomorrow.
                         </p>
                         {mindNote.trim().length > 0 && (
                           <button
                             onClick={handleContain}
                             className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1C1917] text-[#E7E5E4] hover:bg-black transition-colors text-xs font-bold uppercase tracking-wider shadow-[2px_2px_4px_rgba(0,0,0,0.5)]"
                           >
                             <Box size={14} />
                             Contain for Tomorrow
                           </button>
                         )}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="contained"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      onClick={() => setIsContained(false)}
                      className="bg-[#1C1917] border border-[#292524] rounded-[2rem] p-10 flex flex-col items-center text-center cursor-pointer hover:border-[#44403C] transition-colors shadow-[8px_8px_20px_rgba(0,0,0,0.6)]"
                    >
                      <div className="p-5 rounded-full bg-[#292524] text-[#78716C] mb-6 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.5)]">
                        <Lock size={28} />
                      </div>
                      <h3 className="text-[#E7E5E4] font-medium mb-2 text-xl">Safely Contained</h3>
                      <p className="text-[#78716C] text-sm">Your thoughts are held here until you're ready.</p>
                      <p className="text-[10px] text-[#57534E] mt-6 uppercase tracking-widest font-bold">Tap to reopen</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>

            {/* SECTION 3: SETTLING THE BODY */}
            <section className="mb-24">
              <h2 className="text-xl font-medium text-[#78716C] mb-8 flex items-center gap-4 uppercase tracking-widest text-xs">
                <span className="w-8 h-[1px] bg-[#44403C]"></span>
                Tell your nervous system it’s safe
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {somaticRituals.map((ritual) => {
                  const isSelected = selectedRitual === ritual.id;
                  const Icon = ritual.icon;
                  
                  return (
                    <motion.div
                      key={ritual.id}
                      onClick={() => toggleRitual(ritual.id)}
                      layout
                      className={clsx(
                        "cursor-pointer rounded-[1.5rem] p-6 border transition-all duration-300 relative overflow-hidden",
                        isSelected 
                          ? "bg-[#1C1917] border-[#78716C]/30 col-span-2 md:col-span-2 row-span-2 md:row-span-1 shadow-inner" 
                          : "bg-[#292524] border-white/5 shadow-[4px_4px_8px_rgba(0,0,0,0.4)] hover:bg-[#322e2c]"
                      )}
                    >
                       <div className="flex flex-col h-full justify-between gap-4">
                          <div className="flex justify-between items-start">
                             <Icon className={clsx(isSelected ? "text-[#E7E5E4]" : "text-[#57534E]")} size={24} />
                             {isSelected && (
                               <motion.span 
                                 initial={{ opacity: 0 }} 
                                 animate={{ opacity: 1 }} 
                                 className="text-[10px] text-[#A8A29D] uppercase tracking-widest font-bold"
                               >
                                 Active
                               </motion.span>
                             )}
                          </div>
                          
                          <div>
                            <h3 className={clsx(
                              "font-medium mb-2 transition-colors",
                              isSelected ? "text-[#E7E5E4] text-lg" : "text-[#A8A29D]"
                            )}>
                              {ritual.title}
                            </h3>
                            {isSelected && (
                              <motion.p 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                className="text-[#78716C] text-sm leading-relaxed"
                              >
                                {ritual.description}
                              </motion.p>
                            )}
                          </div>
                       </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 4: ENTERING REST */}
            <section className="mb-12 flex flex-col items-center">
              <h2 className="text-xl font-light text-[#78716C] mb-10 text-center">
                You don’t have to sleep. <br/>
                <span className="text-[#A8A29D]">You can just rest.</span>
              </h2>

              <button
                onClick={enterRest}
                className="group relative px-10 py-5 rounded-full bg-[#1C1917] border border-[#292524] text-[#E7E5E4] hover:text-white hover:border-[#44403C] transition-all duration-500 overflow-hidden shadow-[8px_8px_20px_rgba(0,0,0,0.8),-2px_-2px_5px_rgba(255,255,255,0.05)]"
              >
                 <span className="relative z-10 flex items-center gap-4 font-bold tracking-widest text-sm uppercase">
                   <Moon size={16} className="fill-[#E7E5E4]/20" />
                   Enter Rest Mode
                 </span>
                 <div className="absolute inset-0 bg-[#292524] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </button>
            </section>
          </div>
        </Layout>
      )}
    </div>
  );
};
