import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Check, Heart } from 'lucide-react';
import { dailyCareCategories } from '../data/daily-care';
import { clsx } from 'clsx';

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

  const getThemeColor = (theme: string, isSelected: boolean) => {
    switch (theme) {
      case 'rose': return isSelected ? 'bg-rose-100 text-rose-800 border-rose-200' : 'hover:bg-rose-50 text-stone-600';
      case 'emerald': return isSelected ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'hover:bg-emerald-50 text-stone-600';
      case 'indigo': return isSelected ? 'bg-indigo-100 text-indigo-800 border-indigo-200' : 'hover:bg-indigo-50 text-stone-600';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-stone-800 font-sans selection:bg-stone-200">
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
        
        {/* Navigation */}
        <div className="mb-8">
           <button 
             onClick={onBack}
             className="flex items-center gap-2 text-stone-400 hover:text-stone-600 transition-colors group"
           >
             <div className="p-2 rounded-full bg-stone-100 group-hover:bg-stone-200 transition-colors">
               <ArrowLeft size={20} />
             </div>
             <span className="font-medium">Back to Dashboard</span>
           </button>
        </div>

        {/* Header */}
        <header className="mb-12 md:mb-16 text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-stone-800 mb-6">
              Daily Care, Not Control
            </h1>
            <div className="inline-block px-6 py-3 rounded-full bg-stone-100 text-stone-600 font-medium text-lg">
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
              <h2 className="text-2xl font-bold text-stone-400 mb-6 text-center md:text-left">
                {category.title}
              </h2>
              
              <div className="space-y-3">
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
                        "w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden group",
                        isSelected 
                          ? getThemeColor(category.theme, true) 
                          : `bg-white border-stone-100 ${getThemeColor(category.theme, false)}`
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={clsx(
                          "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0",
                          isSelected ? "border-current bg-white/50" : "border-stone-200 group-hover:border-stone-300"
                        )}>
                          {isSelected && <Check size={14} strokeWidth={3} />}
                        </div>
                        <span className="font-medium text-lg leading-snug">{option}</span>
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
              className="fixed bottom-8 left-0 right-0 flex justify-center pointer-events-none"
            >
              <div className="bg-white/90 backdrop-blur-md border border-stone-200 shadow-xl px-8 py-4 rounded-full flex items-center gap-3 text-stone-800 font-medium text-lg">
                <Heart className="text-rose-400 fill-rose-400" size={20} />
                Doing one thing is enough.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
