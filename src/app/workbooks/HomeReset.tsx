import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Check, Sparkles, Coffee, Sun, BatteryLow } from 'lucide-react';
import { weeklyTasks, lowEnergyModeTips } from '../data/home-reset';
import { clsx } from 'clsx';
import { Layout } from '../components/Layout';
import { toast } from 'sonner';

interface HomeResetProps {
  onBack: () => void;
}

type TaskStatus = 'pending' | 'done' | 'good-enough';

export const HomeReset: React.FC<HomeResetProps> = ({ onBack }) => {
  const [taskStates, setTaskStates] = useState<Record<string, TaskStatus>>({});

  const toggleStatus = (day: string, status: TaskStatus) => {
    setTaskStates(prev => ({
      ...prev,
      [day]: prev[day] === status ? 'pending' : status
    }));
  };

  const handleReset = () => {
    setTaskStates({});
    toast.success("Week reset");
  };

  const handleAdd = () => {
    toast("Custom task added", {
      description: "Added to your list."
    });
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
            <div className="flex justify-center mb-6">
              <div className="p-5 bg-[#F9F3EF] rounded-full text-[#EFA896] shadow-[inset_4px_4px_8px_rgba(166,133,119,0.15),inset_-4px_-4px_8px_#FFFFFF]">
                <Sun size={32} strokeWidth={2.5} />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#5C3A3A] mb-6">
              A Home That Resets Itself
            </h1>
            <p className="text-lg text-[#9C7A70] leading-relaxed max-w-xl mx-auto font-medium">
              A gentle weekly rhythm. No deep cleans. No "shoulds." <br/>
              <span className="text-[#5C3A3A] font-bold">Just small resets to keep your space livable.</span>
            </p>
          </motion.div>
        </header>

        {/* Weekly Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {weeklyTasks.map((item, idx) => {
            const status = taskStates[item.day] || 'pending';
            const isDone = status === 'done';
            const isGoodEnough = status === 'good-enough';
            
            if (item.isRestDay) {
              return (
                <motion.div
                  key={item.day}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="col-span-1 md:col-span-2 lg:col-span-3 bg-[#F3EBE6]/60 border border-white/40 p-10 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left shadow-none"
                >
                  <div className="flex items-center gap-6">
                     <div className="p-4 bg-[#F9F3EF] rounded-full text-[#EFA896] shadow-[inset_2px_2px_5px_rgba(166,133,119,0.1),inset_-2px_-2px_5px_#FFFFFF]">
                       <Coffee size={28} />
                     </div>
                     <div>
                       <h3 className="text-2xl font-bold text-[#5C3A3A] mb-1">{item.day}</h3>
                       <p className="text-[#9C7A70] font-medium">{item.task}</p>
                     </div>
                  </div>
                  <div className="bg-[#EEE6E1] px-6 py-3 rounded-full text-[#9C7A70] text-sm font-bold tracking-wide uppercase shadow-[inset_2px_2px_4px_rgba(166,133,119,0.1),inset_-2px_-2px_4px_#FFFFFF]">
                    No tasks allowed.
                  </div>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={item.day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={clsx(
                  "flex flex-col p-8 rounded-[2.5rem] transition-all duration-300 relative overflow-hidden",
                  (isDone || isGoodEnough)
                    ? "bg-[#F3EBE6]/60 border border-transparent opacity-80"
                    : "bg-[#FDF9F7] border border-white/60 shadow-[8px_8px_16px_rgba(166,133,119,0.08),-8px_-8px_16px_#FFFFFF] hover:shadow-[12px_12px_24px_rgba(166,133,119,0.12),-12px_-12px_24px_#FFFFFF] hover:translate-y-[-2px]"
                )}
              >
                {/* Status Indicator Background */}
                {(isDone || isGoodEnough) && (
                  <div className="absolute top-6 right-6">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={clsx(
                        "rounded-full p-2 shadow-inner",
                        isDone ? "bg-[#E6F4EA] text-emerald-600" : "bg-[#FFF4E6] text-amber-600"
                      )}
                    >
                      <Check size={18} strokeWidth={3} />
                    </motion.div>
                  </div>
                )}

                <div className="mb-6">
                  <span className="text-xs font-bold tracking-widest text-[#BFA69C] uppercase mb-2 block">
                    {item.day}
                  </span>
                  <h3 className={clsx(
                    "text-xl font-bold text-[#5C3A3A]",
                    (isDone || isGoodEnough) && "text-[#BFA69C]"
                  )}>
                    {item.title}
                  </h3>
                </div>

                <div className="space-y-6 mb-8 flex-grow">
                  <div>
                    <p className={clsx(
                      "text-[#8A6A60] font-medium leading-relaxed text-base",
                      (isDone || isGoodEnough) && "text-[#BFA69C] line-through decoration-[#D6CFC7]"
                    )}>
                      {item.task}
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t border-[#EEE6E1]">
                    <p className="text-[10px] font-bold text-[#BFA69C] uppercase tracking-widest mb-1">
                      Low Energy Option
                    </p>
                    <p className={clsx(
                      "text-sm text-[#9C7A70] italic",
                      (isDone || isGoodEnough) && "text-[#D6CFC7]"
                    )}>
                      {item.lowEnergyAlt}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 mt-auto">
                  <button
                    onClick={() => toggleStatus(item.day, 'done')}
                    className={clsx(
                      "flex-1 py-3 px-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-200",
                      isDone
                        ? "bg-[#E6F4EA] shadow-inner text-emerald-700"
                        : "bg-[#F3EBE6] text-[#9C7A70] shadow-[4px_4px_8px_rgba(166,133,119,0.1),-4px_-4px_8px_#FFFFFF] hover:shadow-inner hover:bg-[#E6F4EA] hover:text-emerald-700"
                    )}
                  >
                    Done
                  </button>
                  <button
                    onClick={() => toggleStatus(item.day, 'good-enough')}
                    className={clsx(
                      "flex-1 py-3 px-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-200",
                      isGoodEnough
                        ? "bg-[#FFF4E6] shadow-inner text-amber-700"
                        : "bg-[#F3EBE6] text-[#9C7A70] shadow-[4px_4px_8px_rgba(166,133,119,0.1),-4px_-4px_8px_#FFFFFF] hover:shadow-inner hover:bg-[#FFF4E6] hover:text-amber-700"
                    )}
                  >
                    Good Enough
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Low Energy Mode Section */}
        <div className="bg-[#F3EBE6]/60 rounded-[2.5rem] p-8 md:p-12 border border-white/30 shadow-[inset_4px_4px_10px_rgba(166,133,119,0.05),inset_-4px_-4px_10px_rgba(255,255,255,0.8)]">
          <div className="flex items-center gap-6 mb-8">
            <div className="p-4 bg-[#F9F3EF] rounded-full text-[#BFA69C] shadow-[4px_4px_8px_rgba(166,133,119,0.1),-4px_-4px_8px_#FFFFFF]">
              <BatteryLow size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#5C3A3A]">Low Energy Mode</h2>
              <p className="text-[#9C7A70] text-base font-medium">When even the small tasks feel too big.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {lowEnergyModeTips.map((tip, i) => (
              <div key={i} className="bg-[#FDF9F7] p-6 rounded-2xl border border-white/60 shadow-sm text-[#8A6A60] text-sm font-medium flex items-center gap-4">
                <Sparkles size={18} className="text-[#EFA896] flex-shrink-0" />
                {tip}
              </div>
            ))}
          </div>
        </div>
    </Layout>
  );
};
