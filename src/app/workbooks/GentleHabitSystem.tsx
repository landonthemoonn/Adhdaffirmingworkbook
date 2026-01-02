import React, { useState } from 'react';
import { days } from '../data/days';
import { DayCard } from '../components/DayCard';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Layout } from '../components/Layout';
import { toast } from 'sonner';

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

  const handleReset = () => {
    toast.success("Progress refreshed");
  };

  const handleAdd = () => {
    toast("Journal entry added", {
      description: "Saved to your daily log."
    });
  };

  return (
    <Layout onDashboard={onBack} onReset={handleReset} onAdd={handleAdd}>
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

      <header className="mb-16 md:mb-24 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#5C3A3A] mb-6 leading-tight">
            You Don’t Need Motivation. <br/>
            <span className="text-[#C9B6AD]">You Need Support.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#9C7A70] leading-relaxed">
            A 20-day gentle habit system prioritizing emotional safety over hustle.
            Progress is optional. <span className="text-[#5C3A3A] font-bold">Just noticing is enough.</span>
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

      <footer className="mt-20 text-center text-[#9C7A70]/60 text-sm font-medium tracking-wide">
        <p>Take what you need. Leave the rest.</p>
      </footer>
    </Layout>
  );
};
