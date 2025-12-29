import React, { useState } from 'react';
import { days } from '../data/days';
import { DayCard } from '../components/DayCard';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

interface GentleHabitSystemProps {
  onBack: () => void;
}

export const GentleHabitSystem: React.FC<GentleHabitSystemProps> = ({ onBack }) => {
  const [noticedDays, setNoticedDays] = useState<number[]>([]);

  const toggleDay = (day: number) => {
    setNoticedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day) 
        : [...prev, day]
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-stone-800 font-sans selection:bg-stone-200">
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
        
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

        <header className="mb-16 md:mb-24 text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-stone-800 mb-6 leading-tight">
              You Don’t Need Motivation. <br/>
              <span className="text-stone-400">You Need Support.</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-500 leading-relaxed">
              A 20-day gentle habit system prioritizing emotional safety over hustle.
              Progress is optional. <span className="text-stone-800 font-medium">Just noticing is enough.</span>
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {days.map((dayData) => (
            <DayCard
              key={dayData.day}
              data={dayData}
              isNoticed={noticedDays.includes(dayData.day)}
              onToggle={() => toggleDay(dayData.day)}
            />
          ))}
        </div>

        <footer className="mt-20 text-center text-stone-400 text-sm">
          <p>Take what you need. Leave the rest.</p>
        </footer>
      </div>
    </div>
  );
};
