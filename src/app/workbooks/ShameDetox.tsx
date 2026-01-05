import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, RefreshCcw, ShieldCheck, Sparkles } from 'lucide-react';
import { shameReframes, Reframing } from '../data/shame-detox';
import { Layout } from '../components/Layout';
import { toast } from 'sonner';

interface ShameDetoxProps {
  onBack: () => void;
}

export const ShameDetox: React.FC<ShameDetoxProps> = ({ onBack }) => {
  const [activeCard, setActiveCard] = useState<Reframing | null>(null);

  const handleReset = () => {
    setActiveCard(null);
    toast.success("Slate cleared");
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

      <header className="mb-12 text-center max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-5xl font-bold text-[#5C3A3A] mb-4">Shame Detox</h1>
          <p className="text-[#9C7A70] text-lg font-medium">Shame nukes executive function.<br/>Name the narrative to dismantle it.</p>
        </motion.div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {shameReframes.map((item) => (
          <div key={item.id} className="relative h-72 perspective-1000 group cursor-pointer" onClick={() => setActiveCard(activeCard?.id === item.id ? null : item)}>
            <motion.div
              className="w-full h-full relative preserve-3d transition-all duration-700"
              animate={{ rotateY: activeCard?.id === item.id ? 180 : 0 }}
            >
              {/* Front: Toxic Thought */}
              <div className="absolute inset-0 backface-hidden bg-[#FDF9F7] rounded-[2.5rem] p-8 flex flex-col justify-center items-center text-center shadow-[8px_8px_20px_rgba(166,133,119,0.1),-8px_-8px_20px_#FFFFFF] border border-white/50">
                
                {/* Decorative indent */}
                <div className="mb-6 p-4 rounded-full bg-[#EEE6E1] text-[#A8A29D] shadow-[inset_2px_2px_5px_rgba(166,133,119,0.1),inset_-2px_-2px_5px_#FFFFFF]">
                    <div className="w-2 h-2 rounded-full bg-[#D6CFC7]" />
                </div>

                <p className="text-[#8A6A60] text-2xl font-serif italic mb-6 leading-snug">"{item.toxic}"</p>
                
                <div className="text-xs font-bold uppercase tracking-widest text-[#BFA69C] mt-auto flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFF5F5]">
                  <RefreshCcw size={12} /> Tap to Reframe
                </div>
              </div>

              {/* Back: Reframe */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#5C3A3A] rounded-[2.5rem] p-8 flex flex-col items-center text-center text-[#F3EBE6] shadow-2xl overflow-hidden relative">
                 {/* Texture */}
                 <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] mix-blend-overlay" />
                 
                 <div className="relative z-10 flex flex-col h-full items-center">
                    <div className="flex items-center gap-2 mb-6 opacity-80">
                        <Sparkles size={16} className="text-[#EFA896]" />
                        <span className="text-xs font-bold uppercase tracking-widest text-[#EFA896]">The Reframe</span>
                    </div>

                    <p className="text-lg md:text-xl font-medium leading-relaxed my-auto">
                        {item.reframe}
                    </p>

                    <div className="mt-auto opacity-50">
                        <ShieldCheck size={24} />
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </Layout>
  );
};
