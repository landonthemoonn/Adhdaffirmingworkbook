import React from 'react';
import { Check, Circle } from 'lucide-react';
import { motion } from 'motion/react';
import { clsx } from 'clsx';
import { DayData } from '../data/days';

interface DayCardProps {
  data: DayData;
  isNoticed: boolean;
  onToggle: () => void;
}

export const DayCard: React.FC<DayCardProps> = ({ data, isNoticed, onToggle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: data.day * 0.05 }}
      className={clsx(
        "relative flex flex-col p-8 rounded-[2rem] transition-all duration-300 overflow-hidden",
        // Clay Card Style
        isNoticed 
          ? "bg-[#F3EBE6]/60 border border-white/20 shadow-none opacity-80" 
          : "bg-[#FDF9F7] border border-white/60 shadow-[8px_8px_16px_rgba(166,133,119,0.08),-8px_-8px_16px_#FFFFFF] hover:shadow-[12px_12px_24px_rgba(166,133,119,0.12),-12px_-12px_24px_#FFFFFF] hover:translate-y-[-2px]"
      )}
    >
      <div className="flex justify-between items-start mb-6">
        <span className={clsx(
            "text-xs font-bold tracking-widest uppercase py-1 px-3 rounded-full border border-white/40",
            isNoticed ? "bg-[#EEE6E1] text-[#C9B6AD]" : "bg-[#F3EBE6] text-[#BFA69C]"
        )}>
          Day {data.day}
        </span>
        
        <button
          onClick={onToggle}
          className={clsx(
            "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300",
            isNoticed
              ? "bg-[#EEE6E1] text-[#9C7A70] shadow-[inset_2px_2px_4px_rgba(166,133,119,0.1)]"
              : "bg-[#F3EBE6] text-[#9C7A70] shadow-[4px_4px_8px_rgba(166,133,119,0.1),-4px_-4px_8px_#FFFFFF] hover:shadow-[inset_2px_2px_4px_rgba(166,133,119,0.1)] hover:scale-95"
          )}
          aria-pressed={isNoticed}
        >
          {isNoticed ? (
            <>
              <Check className="w-4 h-4" />
              <span>Noticed</span>
            </>
          ) : (
            <>
              <Circle className="w-4 h-4" />
              <span>Mark Noticed</span>
            </>
          )}
        </button>
      </div>

      <h3 className={clsx(
        "text-2xl font-bold mb-3 transition-colors tracking-tight",
        isNoticed ? "text-[#C9B6AD]" : "text-[#5C3A3A]"
      )}>
        {data.title}
      </h3>

      <p className={clsx(
        "text-sm mb-8 leading-relaxed font-medium",
        isNoticed ? "text-[#C9B6AD]/80" : "text-[#9C7A70]"
      )}>
        {data.why}
      </p>

      <div className="space-y-5 mt-auto">
        <div className={clsx(
          "p-6 rounded-2xl transition-colors border",
          isNoticed 
            ? "bg-[#F3EBE6]/40 border-transparent shadow-none" 
            : "bg-[#F9F3EF] border-white/50 shadow-[inset_3px_3px_6px_rgba(166,133,119,0.05),inset_-3px_-3px_6px_#FFFFFF]"
        )}>
          <span className="block text-[10px] font-bold text-[#C9B6AD] uppercase tracking-widest mb-2">
            Micro-Action
          </span>
          <p className={clsx(
            "text-lg font-bold",
            isNoticed ? "text-[#C9B6AD]" : "text-[#5C3A3A]"
          )}>
            {data.microAction}
          </p>
        </div>

        {data.bonusAction && (
          <div className="px-2">
             <span className="block text-[10px] font-bold text-[#C9B6AD] uppercase tracking-widest mb-1">
              If you have energy
            </span>
            <p className={clsx(
              "text-[#9C7A70] italic font-medium text-sm",
              isNoticed && "text-[#C9B6AD]"
            )}>
              {data.bonusAction}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
