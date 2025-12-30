import React from 'react';
import { motion } from 'motion/react';
import { clsx } from 'clsx';

interface LayoutProps {
  children: React.ReactNode;
  isDark?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, isDark = false }) => {
  return (
    <div className={clsx(
      "min-h-screen relative overflow-hidden font-sans flex items-center justify-center py-12 px-4 md:px-8 transition-colors duration-700",
      isDark ? "bg-[#1C1917] selection:bg-[#44403C] selection:text-[#E7E5E4]" : "bg-[#E6D5CC] selection:bg-[#DFA899] selection:text-[#4A3232]"
    )}>
      {/* 
        ========================================
        DEEP DIMENSION BACKGROUND
        ========================================
      */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Base Gradient */}
        <div className={clsx(
          "absolute inset-0 bg-gradient-to-br transition-colors duration-700",
          isDark ? "from-[#1C1917] via-[#292524] to-[#0C0A09]" : "from-[#E6D5CC] via-[#Dcb8ad] to-[#C9A69D]"
        )} />

        {/* Dynamic Mesh Gradients */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, 0],
            opacity: isDark ? [0.3, 0.4, 0.3] : [0.6, 0.8, 0.6] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className={clsx(
            "absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] rounded-full blur-[120px] mix-blend-soft-light transition-colors duration-700",
            isDark ? "bg-indigo-900/30" : "bg-gradient-to-r from-[#FFDBCF] to-[#FFC8B3]"
          )}
        />
        
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, 50, 0],
            opacity: isDark ? [0.2, 0.3, 0.2] : [0.4, 0.6, 0.4] 
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className={clsx(
            "absolute bottom-[-10%] right-[-20%] w-[90vw] h-[90vw] rounded-full blur-[140px] mix-blend-overlay transition-colors duration-700",
            isDark ? "bg-purple-900/30" : "bg-gradient-to-l from-[#E8A598] via-[#DFA899] to-transparent"
          )}
        />

        {/* Texture */}
        <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
        />
      </div>

      {/* 
        ========================================
        THE DEVICE BOARD WRAPPER
        ========================================
      */}
      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-6xl"
      >
        <div className={clsx(
          "rounded-[3.5rem] p-8 md:p-14 transition-all duration-700 border-b-[8px]",
          isDark 
            ? "bg-[#292524] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7),0_20px_60px_-10px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-4px_6px_rgba(0,0,0,0.5)] border-white/10 border-b-black/50"
            : "bg-[#F8F2EE] shadow-[0_40px_100px_-20px_rgba(100,70,60,0.4),0_20px_60px_-10px_rgba(100,70,60,0.2),inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-4px_6px_rgba(200,180,170,0.2)] border-white/60 border-b-[#EBE0DA]/80"
        )}>
          {children}
        </div>
      </motion.div>
    </div>
  );
};
