import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Check, Info } from 'lucide-react';
import { workStyles, WorkStyle } from '../data/work-styles';
import { clsx } from 'clsx';
import { Layout } from '../components/Layout';
import { toast } from 'sonner';

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

  const handleReset = () => {
    setSelectedStyles([]);
    toast.success("Selection cleared");
  };

  const handleAdd = () => {
    toast("Note added", { description: "Observations saved." });
  };

  // Clay-themed color variants
  const getThemeClasses = (theme: WorkStyle['colorTheme'], isSelected: boolean) => {
    const baseClasses = "transition-all duration-300 relative overflow-hidden";
    
    // Selected = "Pressed/Inset" look or "Highlighted Clay"
    if (isSelected) {
        return clsx(
            baseClasses,
            "bg-[#F3EBE6]/60 border border-white/40 shadow-none opacity-90"
        );
    }
    
    // Default = Floating Clay
    return clsx(
        baseClasses,
        "bg-[#FDF9F7] border border-white/60 shadow-[8px_8px_16px_rgba(166,133,119,0.08),-8px_-8px_16px_#FFFFFF] hover:shadow-[12px_12px_24px_rgba(166,133,119,0.12),-12px_-12px_24px_#FFFFFF] hover:translate-y-[-2px]"
    );
  };

  const getIconContainerStyles = (theme: WorkStyle['colorTheme'], isSelected: boolean) => {
      // Use distinct earth tones for identity, but keep soft
      switch (theme) {
        case 'blue': // Slate Blue
            return isSelected ? "bg-[#E2E8F0] text-[#64748B]" : "bg-[#F1F5F9] text-[#94A3B8] shadow-[inset_2px_2px_5px_rgba(148,163,184,0.1),inset_-2px_-2px_5px_#FFFFFF]";
        case 'rose': // Terracotta
            return isSelected ? "bg-[#FFE4E1] text-[#EFA896]" : "bg-[#FFF1F2] text-[#EFA896] shadow-[inset_2px_2px_5px_rgba(239,168,150,0.1),inset_-2px_-2px_5px_#FFFFFF]";
        case 'amber': // Ochre
            return isSelected ? "bg-[#FEF3C7] text-[#D97706]" : "bg-[#FFFBEB] text-[#F59E0B] shadow-[inset_2px_2px_5px_rgba(245,158,11,0.1),inset_-2px_-2px_5px_#FFFFFF]";
        case 'emerald': // Sage
            return isSelected ? "bg-[#DCFCE7] text-[#166534]" : "bg-[#F0FDF4] text-[#4ADE80] shadow-[inset_2px_2px_5px_rgba(74,222,128,0.1),inset_-2px_-2px_5px_#FFFFFF]";
        default:
            return "bg-[#F3EBE6] text-[#9C7A70]";
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
        <header className="mb-16 md:mb-20 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#5C3A3A] mb-6">
              How Your Brain Likes to Work
            </h1>
            <p className="text-lg text-[#9C7A70] leading-relaxed max-w-xl mx-auto font-medium">
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
                  "relative p-8 rounded-[2.5rem] cursor-pointer group",
                  getThemeClasses(style.colorTheme, isSelected)
                )}
              >
                {/* Selection Indicator */}
                <div className={clsx(
                  "absolute top-8 right-8 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                  isSelected 
                    ? "bg-[#5C3A3A] text-white shadow-inner scale-100" 
                    : "bg-[#F3EBE6] text-transparent shadow-[inset_2px_2px_4px_rgba(166,133,119,0.1)] scale-90 group-hover:shadow-none group-hover:bg-[#EBE0DA]"
                )}>
                  <Check size={16} strokeWidth={3} />
                </div>

                {/* Header Section */}
                <div className="flex items-center gap-5 mb-6">
                  <div className={clsx("p-4 rounded-2xl transition-colors", getIconContainerStyles(style.colorTheme, isSelected))}>
                    <Icon size={28} strokeWidth={2.5} />
                  </div>
                  <h3 className={clsx("text-2xl font-bold transition-colors", isSelected ? "text-[#8A6A60]" : "text-[#5C3A3A]")}>
                    {style.title}
                  </h3>
                </div>

                <p className={clsx("font-medium leading-relaxed mb-8 pr-8 text-base", isSelected ? "text-[#9C7A70]" : "text-[#8A6A60]")}>
                  {style.description}
                </p>

                {/* Details Grid */}
                <div className="grid grid-cols-1 gap-8">
                  <div>
                    <h4 className="flex items-center gap-2 text-xs font-bold text-[#BFA69C] uppercase tracking-widest mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#BFA69C]" />
                      Works best when...
                    </h4>
                    <ul className="space-y-3">
                      {style.worksBest.map((item, i) => (
                        <li key={i} className={clsx("text-sm leading-relaxed flex items-start gap-2.5 font-medium", isSelected ? "text-[#9C7A70]/80" : "text-[#9C7A70]")}>
                          <span className="text-[#EFA896]">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-2 text-xs font-bold text-[#BFA69C] uppercase tracking-widest mb-3">
                       <span className="w-1.5 h-1.5 rounded-full bg-[#BFA69C]" />
                       Helpful Supports
                    </h4>
                    <ul className="space-y-3">
                      {style.supports.map((item, i) => (
                        <li key={i} className={clsx("text-sm leading-relaxed flex items-start gap-2.5 font-medium", isSelected ? "text-[#9C7A70]/80" : "text-[#9C7A70]")}>
                          <span className="text-[#EFA896]">•</span>
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
           <p className="inline-flex items-center gap-3 text-[#9C7A70] text-sm font-bold bg-[#F3EBE6]/60 px-6 py-3 rounded-full border border-white/40">
             <Info size={18} className="text-[#EFA896]" />
             <span>It is common to switch between styles depending on the day or task.</span>
           </p>
        </div>
    </Layout>
  );
};
