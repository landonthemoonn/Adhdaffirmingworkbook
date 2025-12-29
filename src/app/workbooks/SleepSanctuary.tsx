import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Moon, Box, Lock, Sparkles, Send, Check } from 'lucide-react';
import { closureOptions, mindPrompts, somaticRituals, finalPrompts } from '../data/sleep-sanctuary';
import { clsx } from 'clsx';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

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
      restMode ? "bg-black text-slate-400" : "bg-slate-950 text-slate-300"
    )}>
      
      {/* Rest Mode Overlay */}
      <AnimatePresence>
        {restMode && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-8 bg-black"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full bg-indigo-900/20 blur-3xl"
            />
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 2 }}
              className="relative text-2xl md:text-3xl font-medium text-slate-400 text-center leading-relaxed tracking-wide"
            >
              {finalPrompts[finalPromptIndex]}
            </motion.h2>

            <button 
              onClick={() => setRestMode(false)}
              className="absolute bottom-10 text-slate-700 hover:text-slate-500 transition-colors text-sm uppercase tracking-widest"
            >
              Exit Rest Mode
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-3xl mx-auto px-6 py-12 md:py-20 relative z-10">
        
        {/* Navigation */}
        <div className="mb-12">
           <button 
             onClick={onBack}
             className="flex items-center gap-2 text-slate-600 hover:text-slate-400 transition-colors group"
           >
             <div className="p-2 rounded-full bg-slate-900 group-hover:bg-slate-800 transition-colors">
               <ArrowLeft size={20} />
             </div>
             <span className="font-medium">Back to Dashboard</span>
           </button>
        </div>

        {/* Header */}
        <header className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center p-3 mb-6 rounded-full bg-slate-900/80 text-indigo-400/80">
              <Moon size={24} />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-slate-200 mb-4 tracking-tight">
              Sleep Sanctuary
            </h1>
            <p className="text-lg text-slate-500 font-light">
              Rituals to transition from high-alert to rest mode.
            </p>
          </motion.div>
        </header>

        {/* SECTION 1: CLOSING THE DAY */}
        <section className="mb-24">
          <h2 className="text-2xl font-light text-slate-400 mb-8 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-slate-800"></span>
            The day is allowed to end
          </h2>
          
          <div className="space-y-4">
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
                      "w-full p-6 rounded-2xl text-left transition-all duration-500 flex items-center gap-6 group border",
                      isSelected 
                        ? "bg-indigo-950/30 border-indigo-900/50" 
                        : "bg-slate-900/40 border-slate-800 hover:bg-slate-900/60"
                    )}
                  >
                    <div className={clsx(
                      "p-3 rounded-full transition-colors",
                      isSelected ? "bg-indigo-900/50 text-indigo-300" : "bg-slate-800 text-slate-600 group-hover:text-slate-500"
                    )}>
                      <Icon size={20} />
                    </div>
                    <span className={clsx(
                      "text-lg font-light transition-colors",
                      isSelected ? "text-indigo-200" : "text-slate-400"
                    )}>
                      {option.text}
                    </span>
                    {isSelected && !isBriefingOption && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="ml-auto text-indigo-400"
                      >
                        <Sparkles size={16} />
                      </motion.div>
                    )}
                  </motion.button>

                  {/* Expansion for Briefing Note */}
                  <AnimatePresence>
                    {isSelected && isBriefingOption && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 ml-4 md:ml-12 relative">
                          {!isBriefingSaved ? (
                            <>
                              <textarea
                                value={briefingNote}
                                onChange={(e) => setBriefingNote(e.target.value)}
                                placeholder="What needs to happen tomorrow? Clear it from your mind."
                                className="w-full bg-transparent border-none text-slate-300 placeholder:text-slate-600 focus:outline-none focus:ring-0 resize-none h-24 text-base font-light mb-3"
                              />
                              <div className="flex justify-between items-center border-t border-slate-800/50 pt-3">
                                <span className="text-xs text-slate-500">
                                  Scheduled for 6:30 AM Briefing
                                </span>
                                <button
                                  onClick={handleSaveBriefing}
                                  disabled={!briefingNote.trim() || isSaving}
                                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {isSaving ? (
                                    <span>Saving...</span>
                                  ) : (
                                    <>
                                      <Send size={14} />
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
                              className="flex items-center justify-center gap-3 py-6 text-indigo-300"
                            >
                              <div className="p-2 rounded-full bg-indigo-900/50">
                                <Check size={18} />
                              </div>
                              <div className="text-sm">
                                <span className="block font-medium">Saved securely.</span>
                                <span className="text-slate-500">Check your inbox at 6:30 AM.</span>
                              </div>
                              <button 
                                onClick={() => setIsBriefingSaved(false)}
                                className="ml-4 text-xs text-slate-600 hover:text-slate-400 underline"
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
          <h2 className="text-2xl font-light text-slate-400 mb-8 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-slate-800"></span>
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
                  className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6"
                >
                  <textarea
                    value={mindNote}
                    onChange={(e) => setMindNote(e.target.value)}
                    placeholder={mindPrompts[0]}
                    className="w-full bg-transparent border-none text-slate-300 placeholder:text-slate-600 focus:outline-none focus:ring-0 resize-none h-40 text-lg leading-relaxed font-light"
                  />
                  <div className="mt-4 flex justify-between items-center">
                     <p className="text-xs text-slate-600">
                       Write what's looping. We'll hold it for tomorrow.
                     </p>
                     {mindNote.trim().length > 0 && (
                       <button
                         onClick={handleContain}
                         className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-900/30 text-indigo-300 hover:bg-indigo-900/50 transition-colors text-sm font-medium"
                       >
                         <Box size={16} />
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
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col items-center text-center cursor-pointer hover:border-slate-700 transition-colors"
                >
                  <div className="p-4 rounded-full bg-indigo-950/50 text-indigo-400 mb-4">
                    <Lock size={24} />
                  </div>
                  <h3 className="text-slate-300 font-medium mb-1">Safely Contained</h3>
                  <p className="text-slate-500 text-sm">Your thoughts are held here until you're ready.</p>
                  <p className="text-xs text-slate-700 mt-4 uppercase tracking-wider">Tap to reopen</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* SECTION 3: SETTLING THE BODY */}
        <section className="mb-24">
          <h2 className="text-2xl font-light text-slate-400 mb-8 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-slate-800"></span>
            Tell your nervous system it’s safe
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {somaticRituals.map((ritual) => {
              const isSelected = selectedRitual === ritual.id;
              const Icon = ritual.icon;
              
              return (
                <motion.div
                  key={ritual.id}
                  onClick={() => toggleRitual(ritual.id)}
                  layout
                  className={clsx(
                    "cursor-pointer rounded-2xl p-5 border transition-all duration-300 relative overflow-hidden",
                    isSelected 
                      ? "bg-slate-800 border-indigo-900 col-span-2 md:col-span-2 row-span-2 md:row-span-1" 
                      : "bg-slate-900/40 border-slate-800 hover:bg-slate-800/60"
                  )}
                >
                   <div className="flex flex-col h-full justify-between gap-4">
                      <div className="flex justify-between items-start">
                         <Icon className={clsx(isSelected ? "text-indigo-300" : "text-slate-500")} size={24} />
                         {isSelected && (
                           <motion.span 
                             initial={{ opacity: 0 }} 
                             animate={{ opacity: 1 }} 
                             className="text-xs text-indigo-400 uppercase tracking-widest font-medium"
                           >
                             Active
                           </motion.span>
                         )}
                      </div>
                      
                      <div>
                        <h3 className={clsx(
                          "font-medium mb-1 transition-colors",
                          isSelected ? "text-indigo-200 text-lg" : "text-slate-400"
                        )}>
                          {ritual.title}
                        </h3>
                        {isSelected && (
                          <motion.p 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            className="text-slate-400 text-sm leading-relaxed mt-2"
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
          <h2 className="text-2xl font-light text-slate-400 mb-8 text-center">
            You don’t have to sleep. <br/>
            <span className="text-slate-600">You can just rest.</span>
          </h2>

          <button
            onClick={enterRest}
            className="group relative px-8 py-4 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-600 transition-all duration-500 overflow-hidden"
          >
             <span className="relative z-10 flex items-center gap-3 font-medium tracking-wide">
               <Moon size={18} className="fill-slate-300/20" />
               Enter Rest Mode
             </span>
             <div className="absolute inset-0 bg-indigo-900/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </button>
        </section>

      </div>
    </div>
  );
};
