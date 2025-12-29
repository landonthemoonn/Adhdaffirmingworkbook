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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      onClick={!isLocked ? onClick : undefined}
      className={clsx(
        "relative group p-8 rounded-[2rem] border transition-all duration-500 overflow-hidden",
        isLocked 
          ? "bg-white/10 border-white/20 cursor-default opacity-60 backdrop-blur-sm" 
          : "bg-white/30 border-white/40 cursor-pointer backdrop-blur-xl shadow-lg shadow-teal-900/5 hover:bg-white/40 hover:border-white/60 hover:shadow-xl hover:shadow-teal-900/10 hover:scale-[1.02]"
      )}
    >
      {/* Subtle Gradient Shine on Hover */}
      {!isLocked && (
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      )}

      <div className="relative z-10 flex flex-col h-full">
        <div className={clsx(
          "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300",
          isLocked 
            ? "bg-white/20 text-teal-900/40" 
            : "bg-white/60 text-teal-700 shadow-sm group-hover:bg-white/80 group-hover:text-teal-600 group-hover:scale-110 group-hover:rotate-3"
        )}>
          <Icon size={26} strokeWidth={1.5} />
        </div>

        <h3 className={clsx(
          "text-2xl font-light mb-3 tracking-wide",
          isLocked ? "text-teal-900/40" : "text-teal-950"
        )}>
          {title}
        </h3>

        <p className={clsx(
          "text-base font-light leading-relaxed",
          isLocked ? "text-teal-900/30" : "text-teal-900/80"
        )}>
          {description}
        </p>

        {isLocked && (
          <div className="mt-auto pt-6">
            <div className="inline-flex px-3 py-1 rounded-full bg-white/20 border border-white/30 text-xs font-medium text-teal-900/50 uppercase tracking-widest">
              Coming Soon
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
