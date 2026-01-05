import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Wind, Play, Pause, Check } from 'lucide-react';
import { regulators, Regulator } from '../data/nervous-system';
import { clsx } from 'clsx';
import { Layout } from '../components/Layout';
import { toast } from 'sonner';

interface NervousSystemProps {
  onBack: () => void;
}

export const NervousSystem: React.FC<NervousSystemProps> = ({ onBack }) => {
  const [activeRegulator, setActiveRegulator] = useState<Regulator | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSelect = (regulator: Regulator) => {
    setActiveRegulator(regulator);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      toast("Starting regulation...");
    }
  };

  const handleReset = () => {
    setActiveRegulator(null);
    setIsPlaying(false);
  };

  return (
    <Layout onDashboard={onBack} onReset={handleReset}>
      {/* Nav */}
      <div className="mb-8">
         <button onClick={onBack} className="flex items-center gap-3 text-[#9C7A70] hover:text-[#5C3A3A] transition-colors group">
           <div className="p-3 rounded-full bg-[#EEE6E1] shadow-[4px_4px_8px_rgba(166,133,119,0.1),-4px_-4px_8px_#FFFFFF]">
             <ArrowLeft size={20} />
           </div>
           <span className="font-bold tracking-wide uppercase text-xs">Back</span>
         </button>
      </div>

      <header className="mb-12 text-center max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center justify-center p-5 mb-6 rounded-full bg-[#F3EBE6] text-[#EFA896] shadow-[inset_3px_3px_6px_rgba(166,133,119,0.1),inset_-3px_-3px_6px_#FFFFFF]">
            <Wind size={28} strokeWidth={2.5} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#5C3A3A] mb-4">Nervous System Reset</h1>
          <p className="text-[#9C7A70] text-lg font-medium">ADHD isn't a motivation problem.<br/>It's often just nervous system overwhelm.</p>
        </motion.div>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {regulators.map((item, idx) => {
          const isActive = activeRegulator?.id === item.id;
          const Icon = item.icon;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => handleSelect(item)}
              className={clsx(
                "p-8 rounded-[2.5rem] text-left transition-all duration-300 relative overflow-hidden group",
                isActive 
                  ? "bg-[#F3EBE6]/80 border border-[#EFA896]/50 shadow-inner" 
                  : "bg-[#FDF9F7] border border-white/60 shadow-[8px_8px_16px_rgba(166,133,119,0.08),-8px_-8px_16px_#FFFFFF] hover:translate-y-[-2px]"
              )}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={clsx("p-4 rounded-2xl", isActive ? "bg-[#EFA896]/20 text-[#EFA896]" : "bg-[#F3EBE6] text-[#BFA69C]")}>
                  <Icon size={24} />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#BFA69C] bg-white/50 px-3 py-1 rounded-full">{item.duration}</span>
              </div>
              <h3 className={clsx("text-xl font-bold mb-2", isActive ? "text-[#5C3A3A]" : "text-[#8A6A60]")}>{item.title}</h3>
              <p className="text-[#9C7A70] text-sm leading-relaxed">{item.description}</p>
            </motion.button>
          );
        })}
      </div>

      {/* Active Mode */}
      <AnimatePresence>
        {activeRegulator && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-[#292524] rounded-[3rem] p-8 md:p-12 text-[#E7E5E4] shadow-2xl relative">
               <div className="max-w-xl mx-auto text-center">
                 <h2 className="text-3xl font-serif mb-8">{activeRegulator.title}</h2>
                 
                 {/* Visualizer Placeholder - Simple Breathing Circle */}
                 {activeRegulator.type === 'breath' && (
                   <div className="flex justify-center mb-10">
                     <motion.div
                       animate={isPlaying ? { scale: [1, 1.5, 1.5, 1], opacity: [0.5, 1, 1, 0.5] } : { scale: 1, opacity: 0.5 }}
                       transition={{ duration: 16, repeat: Infinity, times: [0, 0.25, 0.5, 1] }} // 4-4-4-4 ish
                       className="w-32 h-32 rounded-full bg-[#E7E5E4]/10 border border-[#E7E5E4]/20"
                     />
                   </div>
                 )}

                 <div className="space-y-4 mb-10">
                   {activeRegulator.steps?.map((step, i) => (
                     <p key={i} className="text-xl font-light text-[#A8A29D]">
                       {i + 1}. <span className="text-[#E7E5E4]">{step}</span>
                     </p>
                   ))}
                 </div>

                 <button
                   onClick={togglePlay}
                   className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#E7E5E4] text-[#1C1917] font-bold text-lg hover:scale-105 transition-transform"
                 >
                   {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                   {isPlaying ? "Pause" : "Start"}
                 </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};
