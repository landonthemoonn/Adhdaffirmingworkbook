import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Check, Anchor, Wind, Droplets, CloudSun } from 'lucide-react';
import { weatherStates, stormSignals, regulationOptions, reflectionPrompts, WeatherState } from '../data/emotional-weather';
import { clsx } from 'clsx';
import { Layout } from '../components/Layout';
import { toast } from 'sonner';

interface EmotionalWeatherProps {
  onBack: () => void;
}

export const EmotionalWeather: React.FC<EmotionalWeatherProps> = ({ onBack }) => {
  const [currentWeather, setCurrentWeather] = useState<WeatherState | null>(null);
  const [selectedSignals, setSelectedSignals] = useState<string[]>([]);
  const [selectedRegulations, setSelectedRegulations] = useState<string[]>([]);
  
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

  const handleReset = () => {
    setCurrentWeather(null);
    setSelectedSignals([]);
    setSelectedRegulations([]);
    toast.success("Weather report cleared");
  };

  const handleAdd = () => {
    toast("Reflection saved", { description: "Added to your emotional log." });
  };

  return (
    <Layout onDashboard={onBack} onReset={handleReset} onAdd={handleAdd}>
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation */}
        <div className="mb-12">
           <button 
             onClick={onBack}
             className="flex items-center gap-3 text-[#9C7A70] hover:text-[#5C3A3A] transition-colors group"
           >
             <div className="p-3 rounded-full bg-[#EEE6E1] shadow-[4px_4px_8px_rgba(166,133,119,0.1),-4px_-4px_8px_#FFFFFF] group-hover:shadow-[inset_2px_2px_4px_rgba(166,133,119,0.1),inset_-2px_-2px_4px_#FFFFFF] transition-all">
               <ArrowLeft size={20} />
             </div>
             <span className="font-bold tracking-wide uppercase text-xs">Back to Dashboard</span>
           </button>
        </div>

        {/* Header */}
        <header className="mb-16 md:mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center p-5 mb-6 rounded-full bg-[#F3EBE6] text-[#EFA896] shadow-[inset_3px_3px_6px_rgba(166,133,119,0.1),inset_-3px_-3px_6px_#FFFFFF]">
              <Wind size={28} strokeWidth={2.5} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#5C3A3A] mb-4">
              Emotional Weather
            </h1>
            <p className="text-lg text-[#9C7A70] max-w-lg mx-auto leading-relaxed font-medium">
              Identifying and riding out the waves of rejection sensitivity.
              <br />
              <span className="text-sm opacity-80 font-normal">This is information, not a command.</span>
            </p>
          </motion.div>
        </header>

        {/* SECTION 1: FORECAST */}
        <section className="mb-24">
          <h2 className="text-2xl font-bold text-[#8A6A60] mb-8 text-center">
            What’s the emotional weather right now?
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
            {weatherStates.map((weather) => {
              const Icon = weather.icon;
              const isSelected = currentWeather?.id === weather.id;
              
              return (
                <button
                  key={weather.id}
                  onClick={() => handleWeatherSelect(weather)}
                  className={clsx(
                    "relative p-6 rounded-[2rem] text-left transition-all duration-300 group overflow-hidden flex flex-col h-full",
                    isSelected 
                      ? "bg-[#F3EBE6]/80 shadow-inner opacity-100 ring-2 ring-[#EFA896]/30" 
                      : "bg-[#FDF9F7] border border-white/60 shadow-[6px_6px_12px_rgba(166,133,119,0.08),-6px_-6px_12px_#FFFFFF] hover:shadow-[8px_8px_16px_rgba(166,133,119,0.1),-8px_-8px_16px_#FFFFFF] hover:translate-y-[-2px]"
                  )}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className={clsx(
                      "transition-colors",
                      isSelected ? "text-[#5C3A3A]" : "text-[#C9B6AD] group-hover:text-[#9C7A70]"
                    )} size={26} strokeWidth={2.5} />
                    <span className={clsx("font-bold text-lg", isSelected ? "text-[#5C3A3A]" : "text-[#8A6A60]")}>{weather.label}</span>
                  </div>
                  
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-sm text-[#9C7A70] mt-2"
                    >
                      <p className="mb-3 font-medium leading-relaxed">{weather.description}</p>
                      <p className="italic text-[#BFA69C] mb-4 text-xs">{weather.thoughts}</p>
                      <div className="inline-block px-3 py-1.5 bg-[#EFA896]/10 text-[#EFA896] rounded-lg text-xs font-bold uppercase tracking-wide">
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
                <h2 className="text-2xl font-bold text-[#8A6A60] mb-8 text-center">
                  What signals tell me I’m getting overwhelmed?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 bg-[#F3EBE6]/40 backdrop-blur-sm rounded-[2.5rem] p-8 md:p-10 border border-white/40 shadow-inner">
                  
                  {/* Body Signals */}
                  <div>
                    <h3 className="flex items-center gap-2 font-bold text-[#BFA69C] uppercase tracking-widest text-xs mb-6">
                      <Anchor size={14} /> Body Signals
                    </h3>
                    <div className="space-y-3">
                      {stormSignals.body.map((signal, idx) => (
                        <label key={`body-${idx}`} className="flex items-start gap-4 cursor-pointer group p-3 rounded-xl hover:bg-white/40 transition-colors">
                          <div className={clsx(
                            "mt-0.5 w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all",
                            selectedSignals.includes(signal) 
                              ? "bg-[#5C3A3A] text-white shadow-inner" 
                              : "bg-[#F9F3EF] border border-[#D6CFC7] shadow-sm group-hover:border-[#BFA69C]"
                          )}>
                            {selectedSignals.includes(signal) && <Check size={12} strokeWidth={4} />}
                          </div>
                          <input 
                            type="checkbox" 
                            className="hidden" 
                            checked={selectedSignals.includes(signal)}
                            onChange={() => toggleSignal(signal)}
                          />
                          <span className={clsx("text-base transition-colors", selectedSignals.includes(signal) ? "text-[#5C3A3A] font-bold" : "text-[#8A6A60]")}>
                            {signal}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Thought Patterns */}
                  <div>
                    <h3 className="flex items-center gap-2 font-bold text-[#BFA69C] uppercase tracking-widest text-xs mb-6">
                      <Wind size={14} /> Thought Patterns
                    </h3>
                    <div className="space-y-3">
                      {stormSignals.thoughts.map((signal, idx) => (
                        <label key={`thought-${idx}`} className="flex items-start gap-4 cursor-pointer group p-3 rounded-xl hover:bg-white/40 transition-colors">
                          <div className={clsx(
                            "mt-0.5 w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all",
                            selectedSignals.includes(signal) 
                              ? "bg-[#5C3A3A] text-white shadow-inner" 
                              : "bg-[#F9F3EF] border border-[#D6CFC7] shadow-sm group-hover:border-[#BFA69C]"
                          )}>
                            {selectedSignals.includes(signal) && <Check size={12} strokeWidth={4} />}
                          </div>
                          <input 
                            type="checkbox" 
                            className="hidden" 
                            checked={selectedSignals.includes(signal)}
                            onChange={() => toggleSignal(signal)}
                          />
                          <span className={clsx("text-base transition-colors", selectedSignals.includes(signal) ? "text-[#5C3A3A] font-bold" : "text-[#8A6A60]")}>
                            {signal}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Validation Message */}
                <div className="h-20 mt-8 flex justify-center items-center">
                  <AnimatePresence>
                    {selectedSignals.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="bg-[#EFA896]/20 text-[#5C3A3A] px-8 py-4 rounded-full font-bold shadow-sm backdrop-blur-sm"
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
                <h2 className="text-2xl font-bold text-[#8A6A60] mb-8 text-center">
                  What helps me stay with this without reacting?
                </h2>

                <div className="space-y-5">
                  {regulationOptions.map((option) => {
                    const isSelected = selectedRegulations.includes(option.id);
                    return (
                      <div
                        key={option.id}
                        onClick={() => toggleRegulation(option.id)}
                        className={clsx(
                          "cursor-pointer group p-6 rounded-[2rem] transition-all duration-300 relative overflow-hidden",
                          isSelected 
                            ? "bg-[#FDF9F7] border border-[#EFA896]/50 shadow-inner" 
                            : "bg-[#FDF9F7] border border-white/60 shadow-[6px_6px_12px_rgba(166,133,119,0.06),-6px_-6px_12px_#FFFFFF] hover:shadow-[8px_8px_16px_rgba(166,133,119,0.08),-8px_-8px_16px_#FFFFFF] hover:translate-y-[-2px]"
                        )}
                      >
                        {isSelected && <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#EFA896]" />}
                        
                        <div className="flex justify-between items-start mb-2 pl-2">
                          <h3 className="font-bold text-[#5C3A3A] text-lg">{option.title}</h3>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#BFA69C] bg-[#F3EBE6] px-3 py-1 rounded-full shadow-inner">
                            {option.duration}
                          </span>
                        </div>
                        
                        <p className="text-[#8A6A60] mb-4 pl-2 leading-relaxed">{option.description}</p>
                        
                        <div className="flex items-center gap-2 text-sm text-[#EFA896] font-bold pl-2">
                          <Droplets size={16} />
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
                <h2 className="text-2xl font-bold text-[#8A6A60] mb-8 text-center flex items-center justify-center gap-3">
                  <CloudSun size={32} className="text-[#EFA896]" />
                  After the intensity passes...
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {reflectionPrompts.map((prompt, idx) => (
                    <div key={idx} className="bg-[#F3EBE6]/40 p-6 rounded-[2rem] border border-white/40 shadow-inner">
                      <label className="block text-[#8A6A60] font-bold mb-4 text-sm uppercase tracking-wide">
                        {prompt}
                      </label>
                      <textarea 
                        className="w-full bg-[#FDF9F7] border border-white/60 rounded-2xl p-4 text-[#5C3A3A] focus:outline-none focus:ring-2 focus:ring-[#EFA896]/20 resize-none h-40 shadow-inner placeholder-[#C9B6AD]"
                        placeholder="..."
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-16 text-center">
                  <p className="inline-block text-[#BFA69C] font-medium italic">
                    “This feeling is information, not a command.”
                  </p>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

      </div>
    </Layout>
  );
};
