import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Check, Info } from 'lucide-react';
import { workStyles, WorkStyle } from '../data/work-styles';
import { clsx } from 'clsx';

interface WorkStylesWorksheetProps {
  onBack: () => void;
}

export const WorkStylesWorksheet: React.FC<WorkStylesWorksheetProps> = ({ onBack }) => {
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  const toggleStyle = (id: string) => {
    setSelectedStyles(prev => 
      prev.includes(id)
        ? prev.filter(s => s !== id)
        : [...prev, id]
    );
  };

  const getThemeClasses = (theme: WorkStyle['colorTheme'], isSelected: boolean) => {
    switch (theme) {
      case 'blue':
        return isSelected 
          ? "bg-blue-50 border-blue-200 ring-1 ring-blue-200" 
          : "bg-white border-stone-100 hover:border-blue-100 hover:bg-blue-50/30";
      case 'rose':
        return isSelected 
          ? "bg-rose-50 border-rose-200 ring-1 ring-rose-200" 
          : "bg-white border-stone-100 hover:border-rose-100 hover:bg-rose-50/30";
      case 'amber':
        return isSelected 
          ? "bg-amber-50 border-amber-200 ring-1 ring-amber-200" 
          : "bg-white border-stone-100 hover:border-amber-100 hover:bg-amber-50/30";
      case 'emerald':
        return isSelected 
          ? "bg-emerald-50 border-emerald-200 ring-1 ring-emerald-200" 
          : "bg-white border-stone-100 hover:border-emerald-100 hover:bg-emerald-50/30";
    }
  };

  const getIconColors = (theme: WorkStyle['colorTheme']) => {
    switch (theme) {
      case 'blue': return "text-blue-500 bg-blue-100";
      case 'rose': return "text-rose-500 bg-rose-100";
      case 'amber': return "text-amber-500 bg-amber-100";
      case 'emerald': return "text-emerald-500 bg-emerald-100";
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-stone-800 font-sans selection:bg-stone-200">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        
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
        <header className="mb-16 md:mb-20 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-stone-800 mb-6">
              How Your Brain Likes to Work
            </h1>
            <p className="text-lg text-stone-500 leading-relaxed max-w-xl mx-auto">
              There is no "correct" way to be productive. <br/>
              Explore these styles with curiosity, not judgment. You might relate to one, or all of them.
            </p>
          </motion.div>
        </header>

        {/* Styles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {workStyles.map((style, idx) => {
            const isSelected = selectedStyles.includes(style.id);
            const Icon = style.icon;

            return (
              <motion.div
                key={style.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => toggleStyle(style.id)}
                className={clsx(
                  "relative p-8 rounded-3xl border-2 transition-all duration-300 cursor-pointer group",
                  getThemeClasses(style.colorTheme, isSelected),
                  isSelected ? "shadow-sm" : "shadow-[0_4px_20px_rgb(0,0,0,0.02)]"
                )}
              >
                {/* Selection Indicator */}
                <div className={clsx(
                  "absolute top-6 right-6 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                  isSelected 
                    ? "border-transparent bg-stone-800 text-white scale-100" 
                    : "border-stone-200 text-transparent scale-90 group-hover:border-stone-300"
                )}>
                  <Check size={16} strokeWidth={3} />
                </div>

                {/* Header Section */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={clsx("p-3 rounded-2xl transition-colors", getIconColors(style.colorTheme))}>
                    <Icon size={28} strokeWidth={2} />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-800">{style.title}</h3>
                </div>

                <p className="text-stone-600 font-medium leading-relaxed mb-8 pr-8">
                  {style.description}
                </p>

                {/* Details Grid */}
                <div className="grid grid-cols-1 gap-8">
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-bold text-stone-400 uppercase tracking-wider mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                      Works best when...
                    </h4>
                    <ul className="space-y-2">
                      {style.worksBest.map((item, i) => (
                        <li key={i} className="text-stone-600 text-sm leading-relaxed flex items-start gap-2">
                          <span>•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-bold text-stone-400 uppercase tracking-wider mb-3">
                       <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                       Helpful Supports
                    </h4>
                    <ul className="space-y-2">
                      {style.supports.map((item, i) => (
                        <li key={i} className="text-stone-600 text-sm leading-relaxed flex items-start gap-2">
                          <span>•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center">
           <p className="inline-flex items-center gap-2 text-stone-400 text-sm bg-stone-100 px-4 py-2 rounded-full">
             <Info size={16} />
             <span>It is common to switch between styles depending on the day or task.</span>
           </p>
        </div>

      </div>
    </div>
  );
};
