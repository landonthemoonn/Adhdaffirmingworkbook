import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Check, Heart } from 'lucide-react';
import { dailyCareCategories } from '../data/daily-care';
import { clsx } from 'clsx';
import { Layout } from '../components/Layout';
import { toast } from 'sonner';

interface DailyCareProps {
  onBack: () => void;
}

interface Selection {
  categoryId: string;
  optionIndex: number;
}

export const DailyCare: React.FC<DailyCareProps> = ({ onBack }) => {
  const [selection, setSelection] = useState<Selection | null>(null);

  const toggleSelection = (categoryId: string, optionIndex: number) => {
    if (selection?.categoryId === categoryId && selection?.optionIndex === optionIndex) {
      setSelection(null); // Deselect if clicking the same one
    } else {
      setSelection({ categoryId, optionIndex });
    }
  };

  const handleReset = () => {
    setSelection(null);
    toast.success("Ready for a new check-in");
  };

  const handleAdd = () => {
    toast("Check-in saved", { description: "Great job taking care of yourself." });
  };

  const getThemeColor = (theme: string, isSelected: boolean) => {
    // Clay Theme Mapping
    switch (theme) {
      case 'rose': 
        return isSelected 
          ? 'bg-[#EFA896]/20 border-[#EFA896]/50 text-[#5C3A3A] shadow-none' 
          : 'hover:bg-[#FFF5F5] text-[#8A6A60]';
      case 'emerald': 
        return isSelected 
          ? 'bg-[#E6F4EA]/60 border-[#4ADE80]/40 text-[#14532D] shadow-none' 
          : 'hover:bg-[#F0FDF4] text-[#8A6A60]';
      case 'indigo': 
        return isSelected 
          ? 'bg-[#EEF2FF]/60 border-[#818CF8]/40 text-[#1E3A8A] shadow-none' 
          : 'hover:bg-[#F8FAFC] text-[#8A6A60]';
      default: return '';
    }
  };

  return (
    <Layout onDashboard={onBack} onReset={handleReset} onAdd={handleAdd}>
        {/* Navigation */}
        <div className="mb-8">
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
        <header className="mb-12 md:mb-16 text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#5C3A3A] mb-8">
              Daily Care, Not Control
            </h1>
            <div className="inline-block px-8 py-4 rounded-full bg-[#F3EBE6] text-[#9C7A70] font-bold text-lg shadow-[inset_3px_3px_6px_rgba(166,133,119,0.1),inset_-3px_-3px_6px_#FFFFFF]">
              You only need one.
            </div>
          </motion.div>
        </header>

        {/* Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12 mb-20">
          {dailyCareCategories.map((category, colIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: colIndex * 0.1 }}
              className="flex flex-col"
            >
              <h2 className="text-xl font-bold text-[#BFA69C] uppercase tracking-widest mb-6 text-center md:text-left pl-2">
                {category.title}
              </h2>
              
              <div className="space-y-4">
                {category.options.map((option, idx) => {
                  const isSelected = selection?.categoryId === category.id && selection?.optionIndex === idx;
                  const isDimmed = selection !== null && !isSelected;

                  return (
                    <motion.button
                      key={idx}
                      onClick={() => toggleSelection(category.id, idx)}
                      animate={{ 
                        opacity: isDimmed ? 0.4 : 1,
                        scale: isSelected ? 1.02 : 1 
                      }}
                      className={clsx(
                        "w-full text-left p-5 rounded-[1.5rem] border transition-all duration-300 relative overflow-hidden group",
                        isSelected 
                          ? getThemeColor(category.theme, true) 
                          : `bg-[#FDF9F7] border-white/60 shadow-[4px_4px_10px_rgba(166,133,119,0.05),-4px_-4px_10px_#FFFFFF] ${getThemeColor(category.theme, false)} hover:translate-y-[-2px]`
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className={clsx(
                          "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0",
                          isSelected ? "border-transparent bg-white/60" : "border-[#EBE0DA] group-hover:border-[#D6CFC7]"
                        )}>
                          {isSelected && <Check size={14} strokeWidth={4} className="text-[#5C3A3A]" />}
                        </div>
                        <span className="font-bold text-lg leading-snug">{option}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Message */}
        <AnimatePresence>
          {selection && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="fixed bottom-10 left-0 right-0 flex justify-center pointer-events-none z-50"
            >
              <div className="bg-[#F9F3EF]/90 backdrop-blur-xl border border-white/60 shadow-[0_10px_40px_rgba(0,0,0,0.1)] px-8 py-4 rounded-full flex items-center gap-3 text-[#5C3A3A] font-bold text-lg">
                <Heart className="text-[#EFA896] fill-[#EFA896]" size={20} />
                Doing one thing is enough.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    </Layout>
  );
};
