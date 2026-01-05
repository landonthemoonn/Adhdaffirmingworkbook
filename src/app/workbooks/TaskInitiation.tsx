import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Sparkles, Plus, PlayCircle, CheckCircle2 } from 'lucide-react';
import { dopamineMenu, initiationScripts, Spark } from '../data/task-initiation';
import { clsx } from 'clsx';
import { Layout } from '../components/Layout';
import { toast } from 'sonner';

interface TaskInitiationProps {
  onBack: () => void;
}

export const TaskInitiation: React.FC<TaskInitiationProps> = ({ onBack }) => {
  const [selectedSparks, setSelectedSparks] = useState<string[]>([]);
  const [activeScript, setActiveScript] = useState<string | null>(null);

  const toggleSpark = (id: string) => {
    setSelectedSparks(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const handleReset = () => {
    setSelectedSparks([]);
    setActiveScript(null);
    toast.success("Lab reset");
  };

  const handleBegin = () => {
    if (selectedSparks.length === 0 && !activeScript) {
      toast.error("Choose at least one spark or script first.");
      return;
    }

    toast.success("Protocol Activated!", {
      description: "Go do the thing for 5 minutes. You are allowed to stop after that.",
      duration: 5000,
    });
    
    // Optional: You could navigate back or just leave it as a reference
    // onBack(); 
  };

  return (
    <Layout onDashboard={onBack} onReset={handleReset}>
      <div className="mb-8">
         <button onClick={onBack} className="flex items-center gap-3 text-[#9C7A70] hover:text-[#5C3A3A] transition-colors group">
           <div className="p-3 rounded-full bg-[#EEE6E1] shadow-[4px_4px_8px_rgba(166,133,119,0.1),-4px_-4px_8px_#FFFFFF]">
             <ArrowLeft size={20} />
           </div>
           <span className="font-bold tracking-wide uppercase text-xs">Back</span>
         </button>
      </div>

      <header className="mb-12 text-center max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-5xl font-bold text-[#5C3A3A] mb-4">Task Initiation Lab</h1>
          <p className="text-[#9C7A70] text-lg font-medium">Starting is the hardest part. <br/>Don't rely on willpower—mix a dopamine cocktail.</p>
        </motion.div>
      </header>

      {/* Dopamine Menu */}
      <section className="mb-16">
        <h2 className="text-xs font-bold uppercase tracking-widest text-[#BFA69C] mb-6 flex items-center gap-2">
          <Sparkles size={14} /> Dopamine Menu
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {dopamineMenu.map((item) => {
            const isSelected = selectedSparks.includes(item.id);
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => toggleSpark(item.id)}
                className={clsx(
                  "p-4 rounded-[1.5rem] flex flex-col items-center text-center gap-3 transition-all duration-200",
                  isSelected 
                    ? "bg-[#5C3A3A] text-[#F3EBE6] shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.1)] scale-[0.98]" 
                    : "bg-[#FDF9F7] shadow-[6px_6px_12px_rgba(166,133,119,0.1),-6px_-6px_12px_#FFFFFF] hover:-translate-y-1 hover:shadow-[8px_8px_16px_rgba(166,133,119,0.12),-8px_-8px_16px_#FFFFFF]"
                )}
              >
                <div className={clsx(
                    "w-10 h-10 rounded-full flex items-center justify-center mb-1",
                    isSelected ? "bg-[#FFFFFF]/20" : "bg-[#EEE6E1]"
                )}>
                    <Icon size={20} strokeWidth={2.5} />
                </div>
                <span className="text-xs font-bold leading-tight">{item.title}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Permission Slips */}
      <section className="mb-24">
        <h2 className="text-xs font-bold uppercase tracking-widest text-[#BFA69C] mb-6 flex items-center gap-2">
          <PlayCircle size={14} /> Permission Slips
        </h2>
        <div className="space-y-4">
          {initiationScripts.map((script, idx) => (
            <button
              key={idx}
              onClick={() => setActiveScript(activeScript === script ? null : script)}
              className={clsx(
                "w-full text-left p-6 rounded-[2rem] transition-all duration-300 border-2",
                activeScript === script
                  ? "bg-[#F3EBE6] border-[#5C3A3A] text-[#5C3A3A] shadow-[inset_4px_4px_8px_rgba(166,133,119,0.1),inset_-4px_-4px_8px_#FFFFFF]"
                  : "bg-[#FDF9F7] border-transparent shadow-[6px_6px_12px_rgba(166,133,119,0.1),-6px_-6px_12px_#FFFFFF] text-[#8A6A60] hover:scale-[1.01]"
              )}
            >
              <div className="flex items-center gap-4">
                  <div className={clsx(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors",
                      activeScript === script ? "border-[#5C3A3A] bg-[#5C3A3A] text-white" : "border-[#D6CFC7]"
                  )}>
                      {activeScript === script && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <p className="font-medium text-lg md:text-xl italic">"{script}"</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Floating Action Button for 'Go' */}
      {(selectedSparks.length > 0 || activeScript) && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-10 left-0 right-0 flex justify-center pointer-events-none z-50 px-4"
        >
          <button 
            onClick={handleBegin}
            className="pointer-events-auto bg-[#5C3A3A] text-[#F3EBE6] pl-8 pr-10 py-5 rounded-full font-bold shadow-[8px_8px_20px_rgba(92,58,58,0.3),-4px_-4px_10px_rgba(255,255,255,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center gap-4"
          >
            <div className="bg-[#FFFFFF]/20 p-2 rounded-full">
                <Plus size={24} /> 
            </div>
            <span className="text-xl tracking-wide">Let's Begin</span>
          </button>
        </motion.div>
      )}
    </Layout>
  );
};
