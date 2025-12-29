import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Check, Anchor, Wind, Droplets, CloudSun } from 'lucide-react';
import { weatherStates, stormSignals, regulationOptions, reflectionPrompts, WeatherState } from '../data/emotional-weather';
import { clsx } from 'clsx';

interface EmotionalWeatherProps {
  onBack: () => void;
}

export const EmotionalWeather: React.FC<EmotionalWeatherProps> = ({ onBack }) => {
  const [currentWeather, setCurrentWeather] = useState<WeatherState | null>(null);
  const [selectedSignals, setSelectedSignals] = useState<string[]>([]);
  const [selectedRegulations, setSelectedRegulations] = useState<string[]>([]);
  
  // Refs for scrolling to new sections
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);

  const handleWeatherSelect = (weather: WeatherState) => {
    setCurrentWeather(weather);
    setTimeout(() => {
      section2Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  };

  const toggleSignal = (signal: string) => {
    setSelectedSignals(prev => 
      prev.includes(signal) ? prev.filter(s => s !== signal) : [...prev, signal]
    );
  };

  const toggleRegulation = (id: string) => {
    setSelectedRegulations(prev => 
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  // Scroll to section 3 once signals are interacted with (after a brief delay or manually?)
  // The prompt says "Gentle affirmation appears when any are selected". 
  // It doesn't strictly say it auto-scrolls, but for flow, let's keep it manual or subtle.
  // I'll just reveal the next sections as they go.

  return (
    <div className={clsx(
      "min-h-screen transition-colors duration-1000 ease-in-out font-sans selection:bg-indigo-100",
      currentWeather ? `bg-gradient-to-br ${currentWeather.gradient}` : "bg-[#F4F6F8]"
    )}>
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        
        {/* Navigation */}
        <div className="mb-12">
           <button 
             onClick={onBack}
             className="flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors group"
           >
             <div className="p-2 rounded-full bg-white/50 group-hover:bg-white/80 transition-colors backdrop-blur-sm">
               <ArrowLeft size={20} />
             </div>
             <span className="font-medium">Back to Dashboard</span>
           </button>
        </div>

        {/* Header */}
        <header className="mb-16 md:mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center p-3 mb-6 rounded-full bg-indigo-100/50 text-indigo-800 backdrop-blur-sm">
              <Wind size={24} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-800 mb-4">
              Emotional Weather
            </h1>
            <p className="text-lg text-slate-500 max-w-lg mx-auto leading-relaxed">
              Identifying and riding out the waves of rejection sensitivity.
              <br />
              <span className="text-sm opacity-75">This is information, not a command.</span>
            </p>
          </motion.div>
        </header>

        {/* SECTION 1: FORECAST */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold text-slate-700 mb-8 text-center">
            What’s the emotional weather right now?
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {weatherStates.map((weather) => {
              const Icon = weather.icon;
              const isSelected = currentWeather?.id === weather.id;
              
              return (
                <button
                  key={weather.id}
                  onClick={() => handleWeatherSelect(weather)}
                  className={clsx(
                    "relative p-6 rounded-2xl text-left transition-all duration-300 group overflow-hidden",
                    isSelected 
                      ? "bg-white ring-2 ring-indigo-300 shadow-md scale-[1.02]" 
                      : "bg-white/60 hover:bg-white/90 hover:scale-[1.01] shadow-sm"
                  )}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className={clsx(
                      "transition-colors",
                      isSelected ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
                    )} size={24} />
                    <span className="font-bold text-slate-700">{weather.label}</span>
                  </div>
                  
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-sm text-slate-600"
                    >
                      <p className="mb-2 font-medium">{weather.description}</p>
                      <p className="italic text-slate-500 mb-2">{weather.thoughts}</p>
                      <div className="inline-block px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-semibold">
                        {weather.reminder}
                      </div>
                    </motion.div>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* SECTION 2: STORM SIGNALS */}
        <AnimatePresence>
          {currentWeather && (
            <motion.section
              ref={section2Ref}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-24"
            >
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-semibold text-slate-700 mb-8 text-center">
                  What signals tell me I’m getting overwhelmed?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 bg-white/50 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-sm">
                  
                  {/* Body Signals */}
                  <div>
                    <h3 className="flex items-center gap-2 font-bold text-slate-400 uppercase tracking-wider text-sm mb-4">
                      <Anchor size={16} /> Body Signals
                    </h3>
                    <div className="space-y-3">
                      {stormSignals.body.map((signal, idx) => (
                        <label key={`body-${idx}`} className="flex items-start gap-3 cursor-pointer group p-2 rounded-lg hover:bg-white/50 transition-colors">
                          <div className={clsx(
                            "mt-1 w-5 h-5 rounded border transition-colors flex items-center justify-center flex-shrink-0",
                            selectedSignals.includes(signal) ? "bg-slate-700 border-slate-700" : "border-slate-300 group-hover:border-slate-400"
                          )}>
                            {selectedSignals.includes(signal) && <Check size={12} className="text-white" strokeWidth={3} />}
                          </div>
                          <input 
                            type="checkbox" 
                            className="hidden" 
                            checked={selectedSignals.includes(signal)}
                            onChange={() => toggleSignal(signal)}
                          />
                          <span className={clsx("text-slate-700 transition-colors", selectedSignals.includes(signal) && "font-medium")}>
                            {signal}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Thought Patterns */}
                  <div>
                    <h3 className="flex items-center gap-2 font-bold text-slate-400 uppercase tracking-wider text-sm mb-4">
                      <Wind size={16} /> Thought Patterns
                    </h3>
                    <div className="space-y-3">
                      {stormSignals.thoughts.map((signal, idx) => (
                        <label key={`thought-${idx}`} className="flex items-start gap-3 cursor-pointer group p-2 rounded-lg hover:bg-white/50 transition-colors">
                          <div className={clsx(
                            "mt-1 w-5 h-5 rounded border transition-colors flex items-center justify-center flex-shrink-0",
                            selectedSignals.includes(signal) ? "bg-slate-700 border-slate-700" : "border-slate-300 group-hover:border-slate-400"
                          )}>
                            {selectedSignals.includes(signal) && <Check size={12} className="text-white" strokeWidth={3} />}
                          </div>
                          <input 
                            type="checkbox" 
                            className="hidden" 
                            checked={selectedSignals.includes(signal)}
                            onChange={() => toggleSignal(signal)}
                          />
                          <span className={clsx("text-slate-700 transition-colors", selectedSignals.includes(signal) && "font-medium")}>
                            {signal}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Validation Message */}
                <div className="h-16 mt-6 flex justify-center items-center">
                  <AnimatePresence>
                    {selectedSignals.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="bg-indigo-100/80 text-indigo-900 px-6 py-3 rounded-full font-medium shadow-sm backdrop-blur-sm"
                      >
                        You’re noticing early. That matters.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* SECTION 3: RIDING THE WAVE */}
        <AnimatePresence>
          {selectedSignals.length > 0 && (
            <motion.section
              ref={section3Ref}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-24"
            >
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-semibold text-slate-700 mb-8 text-center">
                  What helps me stay with this without reacting?
                </h2>

                <div className="space-y-4">
                  {regulationOptions.map((option) => {
                    const isSelected = selectedRegulations.includes(option.id);
                    return (
                      <div
                        key={option.id}
                        onClick={() => toggleRegulation(option.id)}
                        className={clsx(
                          "cursor-pointer group p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden",
                          isSelected 
                            ? "bg-white border-indigo-200 shadow-md" 
                            : "bg-white/40 border-transparent hover:bg-white/70"
                        )}
                      >
                        {isSelected && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-400" />}
                        
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-slate-800 text-lg">{option.title}</h3>
                          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-1 rounded">
                            {option.duration}
                          </span>
                        </div>
                        
                        <p className="text-slate-600 mb-3">{option.description}</p>
                        
                        <div className="flex items-center gap-2 text-sm text-indigo-600/80 font-medium">
                          <Droplets size={14} />
                          {option.benefit}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* SECTION 4: CLEARING SKIES */}
        <AnimatePresence>
          {selectedRegulations.length > 0 && (
            <motion.section
              ref={section4Ref}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-16"
            >
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-semibold text-slate-700 mb-8 text-center flex items-center justify-center gap-2">
                  <CloudSun size={28} className="text-amber-500/80" />
                  After the intensity passes...
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {reflectionPrompts.map((prompt, idx) => (
                    <div key={idx} className="bg-white/60 p-6 rounded-2xl border border-white/60">
                      <label className="block text-slate-700 font-medium mb-3">
                        {prompt}
                      </label>
                      <textarea 
                        className="w-full bg-white/50 border border-slate-200 rounded-xl p-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 resize-none h-32"
                        placeholder="..."
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-12 text-center">
                  <p className="inline-block text-slate-500 font-medium italic opacity-80">
                    “This feeling is information, not a command.”
                  </p>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
