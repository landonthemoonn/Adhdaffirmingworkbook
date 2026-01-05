import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Check, Circle } from 'lucide-react';
import { energyLevels, EnergyLevel } from '../data/energy-mapping';
import { clsx } from 'clsx';
import { Layout } from '../components/Layout';
import { toast } from 'sonner';

interface EnergyMappingProps {
  onBack: () => void;
}

export const EnergyMapping: React.FC<EnergyMappingProps> = ({ onBack }) => {
  const [currentEnergy, setCurrentEnergy] = useState<EnergyLevel | null>(null);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  // Reset checklist when energy level changes
  useEffect(() => {
    setCheckedItems([]);
  }, [currentEnergy]);

  const handleReset = () => {
    setCurrentEnergy(null);
    setCheckedItems([]);
    toast.success("Check-in cleared");
  };

  const toggleItem = (item: string) => {
    setCheckedItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item) 
        : [...prev, item]
    );
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
          <h1 className="text-4xl md:text-5xl font-bold text-[#5C3A3A] mb-4">Energy Mapping</h1>
          <p className="text-[#9C7A70] text-lg font-medium">Productivity is borrowed energy.<br/>Check your battery before you spend it.</p>
        </motion.div>
      </header>

      {/* Interactive Battery Visualizer - Clay Style */}
      <div className="flex justify-center mb-16">
        <div className="relative w-full max-w-lg">
           {/* Battery Body (Carved into the clay) */}
           <div className="h-28 rounded-[2.5rem] bg-[#EEE6E1] p-3 shadow-[inset_6px_6px_12px_rgba(166,133,119,0.2),inset_-6px_-6px_12px_rgba(255,255,255,0.7)] relative z-10">
              
              {/* The Liquid */}
              <motion.div 
                className="h-full rounded-[2rem] relative overflow-hidden shadow-sm"
                initial={{ width: "50%", backgroundColor: "#D6CFC7" }}
                animate={{ 
                  width: currentEnergy ? `${currentEnergy.level}%` : "0%",
                  backgroundColor: currentEnergy ? currentEnergy.color : "#D6CFC7"
                }}
                transition={{ type: "spring", stiffness: 50, damping: 15 }}
              >
                {/* Glossy highlight for liquid look */}
                <div className="absolute top-2 left-2 right-2 h-1/3 bg-white/20 rounded-t-[1.5rem] blur-[2px]" />
              </motion.div>

              {/* Percentage Text Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-3xl font-black text-[#5C3A3A]/60 mix-blend-overlay">
                  {currentEnergy ? `${currentEnergy.level}%` : "---"}
                </span>
              </div>
           </div>

           {/* Battery Nipple (Extruded) */}
           <div className="absolute top-1/2 -right-4 -mt-6 w-8 h-12 bg-[#F3EBE6] rounded-r-2xl shadow-[4px_4px_8px_rgba(166,133,119,0.1),-2px_-2px_4px_#FFFFFF] z-0" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {energyLevels.map((level) => {
          const isSelected = currentEnergy?.id === level.id;
          const Icon = level.icon;

          return (
            <button
              key={level.id}
              onClick={() => setCurrentEnergy(level)}
              className={clsx(
                "p-6 rounded-[2.5rem] text-left transition-all duration-300 flex flex-col gap-4 relative overflow-hidden group",
                isSelected
                  ? "bg-[#EEE6E1] shadow-[inset_4px_4px_8px_rgba(166,133,119,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] scale-[0.98]"
                  : "bg-[#FDF9F7] shadow-[8px_8px_16px_rgba(166,133,119,0.08),-8px_-8px_16px_#FFFFFF] hover:-translate-y-1"
              )}
            >
              {/* Indicator Dot */}
              <div className="flex justify-between items-start">
                 <div 
                   className={clsx(
                     "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors shadow-sm",
                     isSelected ? "text-white" : "bg-[#F3EBE6] text-[#A8A29D]"
                   )}
                   style={{ backgroundColor: isSelected ? level.color : undefined }}
                 >
                   <Icon size={22} strokeWidth={2.5} />
                 </div>
                 {isSelected && (
                   <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-3 h-3 rounded-full bg-[#5C3A3A]" />
                 )}
              </div>
              
              <div>
                <h3 className={clsx("font-bold text-lg leading-tight mb-1", isSelected ? "text-[#5C3A3A]" : "text-[#8A6A60]")}>{level.label}</h3>
                <p className="text-xs font-medium text-[#BFA69C] leading-relaxed">{level.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Protocol Panel */}
      <AnimatePresence mode="wait">
        {currentEnergy && (
          <motion.div
            key={currentEnergy.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-[#FDF9F7] rounded-[3rem] p-8 md:p-10 shadow-[12px_12px_24px_rgba(166,133,119,0.1),-12px_-12px_24px_#FFFFFF] relative overflow-hidden"
          >
            {/* Decorative colored accent line */}
            <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: currentEnergy.color }} />

            <div className="flex flex-col md:flex-row gap-10 items-start">
              
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-[#5C3A3A] mb-2">Suggested Protocol</h2>
                <p className="text-[#9C7A70] text-lg mb-8 italic">"{currentEnergy.recommendation}"</p>
                
                <div className="space-y-4">
                  {currentEnergy.protocol.map((item, idx) => {
                    const isChecked = checkedItems.includes(item);
                    return (
                      <button 
                        key={idx}
                        onClick={() => toggleItem(item)}
                        className={clsx(
                            "w-full text-left flex items-center gap-5 p-5 rounded-[2rem] transition-all duration-200 group",
                            isChecked 
                                ? "bg-[#EEE6E1] shadow-[inset_2px_2px_5px_rgba(166,133,119,0.1),inset_-2px_-2px_5px_#FFFFFF] opacity-60" 
                                : "bg-[#F3EBE6] shadow-[4px_4px_10px_rgba(166,133,119,0.05),-4px_-4px_10px_#FFFFFF] hover:scale-[1.01]"
                        )}
                      >
                        {/* Custom Clay Checkbox */}
                        <div className={clsx(
                          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                          isChecked 
                            ? "bg-[#5C3A3A] text-[#F3EBE6] shadow-inner" 
                            : "bg-[#FDF9F7] text-transparent shadow-[2px_2px_5px_rgba(166,133,119,0.1),-2px_-2px_5px_#FFFFFF]"
                        )}>
                          <Check size={16} strokeWidth={3} />
                        </div>
                        
                        <span className={clsx(
                          "text-lg font-medium transition-colors",
                          isChecked ? "text-[#9C7A70] line-through" : "text-[#5C3A3A]"
                        )}>
                          {item}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Sidebar / Summary Card */}
              <div className="w-full md:w-80 bg-[#EEE6E1] rounded-[2.5rem] p-8 shadow-[inset_4px_4px_10px_rgba(166,133,119,0.1),inset_-4px_-4px_10px_#FFFFFF]">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#9C7A70] mb-6 text-center">Status Locked</h3>
                <div className="flex flex-col items-center text-center">
                  <div 
                    className="w-24 h-24 rounded-full flex items-center justify-center mb-5 text-white shadow-[6px_6px_12px_rgba(166,133,119,0.15),-6px_-6px_12px_#FFFFFF]"
                    style={{ backgroundColor: currentEnergy.color }}
                  >
                    <currentEnergy.icon size={40} />
                  </div>
                  <div className="text-4xl font-black text-[#5C3A3A] mb-1">{currentEnergy.level}%</div>
                  <div className="text-base font-bold text-[#8A6A60] mb-8">{currentEnergy.label}</div>
                  
                  <button 
                    onClick={() => toast.success(`Logged energy level: ${currentEnergy.label}`)}
                    className="w-full py-4 rounded-2xl font-bold text-[#FDF9F7] shadow-[4px_4px_10px_rgba(166,133,119,0.2),-4px_-4px_10px_#FFFFFF] hover:scale-[1.02] active:scale-[0.98] transition-all"
                    style={{ backgroundColor: currentEnergy.color }}
                  >
                    Log Check-in
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </Layout>
  );
};
