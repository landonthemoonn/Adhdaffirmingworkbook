import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface WorkbookCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  status: 'active' | 'coming-soon';
  onClick?: () => void;
  index: number;
}

export const WorkbookCard: React.FC<WorkbookCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  status, 
  onClick,
  index 
}) => {
  const isLocked = status === 'coming-soon';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
      onClick={!isLocked ? onClick : undefined}
      className={clsx(
        "relative group p-7 rounded-[2.5rem] transition-all duration-300 overflow-hidden h-full flex flex-col",
        // Card Body Styles - Deep Clay
        isLocked 
          ? "bg-[#F3EBE6]/80 cursor-default opacity-60 shadow-none border border-transparent" 
          : "bg-[#FDF9F7] cursor-pointer border border-white/80 shadow-[6px_6px_12px_rgba(166,133,119,0.08),-6px_-6px_12px_#FFFFFF] hover:shadow-[10px_10px_20px_rgba(166,133,119,0.12),-10px_-10px_20px_#FFFFFF] hover:translate-y-[-4px]"
      )}
    >
      <div className="relative z-10 flex flex-col h-full">
        {/* Header Row: Icon + Status */}
        <div className="flex justify-between items-start mb-5">
            {/* Icon Well - Deep inset for tactile feel */}
            <div className={clsx(
            "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300",
            isLocked 
                ? "bg-[#EEE6E1] text-[#C9B6AD] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05)]" 
                : "bg-[#F4Ece8] text-[#EFA896] shadow-[inset_3px_3px_6px_rgba(166,133,119,0.12),inset_-3px_-3px_6px_#FFFFFF] group-hover:text-[#E08D79] group-hover:scale-105"
            )}>
            <Icon size={26} strokeWidth={2.5} />
            </div>
            
            {/* Subtle dot indicator */}
            {!isLocked && (
                <div className="w-2 h-2 rounded-full bg-[#EFA896]/30 group-hover:bg-[#EFA896] transition-colors" />
            )}
        </div>

        <h3 className={clsx(
          "text-xl font-bold mb-2 tracking-tight",
          isLocked ? "text-[#C9B6AD]" : "text-[#5C3A3A] group-hover:text-[#4A2E2E]"
        )}>
          {title}
        </h3>

        <p className={clsx(
          "text-sm font-medium leading-relaxed",
          isLocked ? "text-[#C9B6AD]/80" : "text-[#9C7A70]"
        )}>
          {description}
        </p>

        {isLocked && (
          <div className="mt-auto pt-6">
            <div className="inline-flex px-3 py-1 rounded-full bg-[#EEE6E1] text-[10px] font-bold text-[#C9B6AD] uppercase tracking-widest">
              Coming Soon
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
