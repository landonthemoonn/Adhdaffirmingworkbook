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
        "relative flex flex-col p-6 rounded-3xl transition-all duration-300 border-2",
        isNoticed 
          ? "bg-stone-50 border-stone-200" 
          : "bg-white border-transparent shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_25px_-5px_rgba(0,0,0,0.05)] hover:border-stone-100"
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm font-medium text-stone-400 tracking-widest uppercase">
          Day {data.day}
        </span>
        <button
          onClick={onToggle}
          className={clsx(
            "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-stone-200 focus:ring-offset-2",
            isNoticed
              ? "bg-stone-200 text-stone-600"
              : "bg-stone-100 text-stone-500 hover:bg-stone-200"
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
        "text-2xl font-bold mb-2 text-stone-800 transition-colors",
        isNoticed && "text-stone-500"
      )}>
        {data.title}
      </h3>

      <p className="text-stone-500 text-sm mb-6 leading-relaxed">
        {data.why}
      </p>

      <div className="space-y-4 mt-auto">
        <div className={clsx(
          "p-4 rounded-xl transition-colors",
          isNoticed ? "bg-stone-100" : "bg-stone-50"
        )}>
          <span className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">
            Micro-Action
          </span>
          <p className={clsx(
            "text-lg font-medium text-stone-700",
            isNoticed && "text-stone-500 decoration-stone-300"
          )}>
            {data.microAction}
          </p>
        </div>

        {data.bonusAction && (
          <div className="px-4 py-2">
             <span className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1">
              If you have energy
            </span>
            <p className={clsx(
              "text-stone-600 italic",
              isNoticed && "text-stone-400"
            )}>
              {data.bonusAction}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
