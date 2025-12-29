import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Check, Sparkles, Coffee, Sun, BatteryLow } from 'lucide-react';
import { weeklyTasks, lowEnergyModeTips } from '../data/home-reset';
import { clsx } from 'clsx';

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

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-stone-800 font-sans selection:bg-amber-100">
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
        
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
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-amber-50 rounded-full text-amber-400">
                <Sun size={32} />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-stone-800 mb-6">
              A Home That Resets Itself
            </h1>
            <p className="text-lg text-stone-500 leading-relaxed max-w-xl mx-auto">
              A gentle weekly rhythm. No deep cleans. No "shoulds." <br/>
              <span className="text-stone-800 font-medium">Just small resets to keep your space livable.</span>
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
                  className="col-span-1 md:col-span-2 lg:col-span-3 bg-amber-50/50 border-2 border-amber-100 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
                >
                  <div className="flex items-center gap-4">
                     <div className="p-3 bg-amber-100 rounded-full text-amber-500">
                       <Coffee size={24} />
                     </div>
                     <div>
                       <h3 className="text-2xl font-bold text-stone-800 mb-1">{item.day}</h3>
                       <p className="text-stone-600 font-medium">{item.task}</p>
                     </div>
                  </div>
                  <div className="bg-white/60 px-6 py-3 rounded-full text-amber-800/70 text-sm font-medium">
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
                  "flex flex-col p-6 rounded-3xl transition-all duration-300 border-2 relative overflow-hidden",
                  (isDone || isGoodEnough)
                    ? "bg-stone-50 border-stone-200"
                    : "bg-white border-stone-100 hover:border-amber-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                )}
              >
                {/* Status Indicator Background */}
                {(isDone || isGoodEnough) && (
                  <div className="absolute top-0 right-0 p-3">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={clsx(
                        "rounded-full p-2",
                        isDone ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
                      )}
                    >
                      <Check size={16} strokeWidth={3} />
                    </motion.div>
                  </div>
                )}

                <div className="mb-4">
                  <span className="text-xs font-bold tracking-widest text-stone-400 uppercase mb-1 block">
                    {item.day}
                  </span>
                  <h3 className={clsx(
                    "text-xl font-bold text-stone-800",
                    (isDone || isGoodEnough) && "text-stone-400"
                  )}>
                    {item.title}
                  </h3>
                </div>

                <div className="space-y-4 mb-6 flex-grow">
                  <div>
                    <p className={clsx(
                      "text-stone-700 font-medium leading-relaxed",
                      (isDone || isGoodEnough) && "text-stone-400 line-through decoration-stone-300"
                    )}>
                      {item.task}
                    </p>
                  </div>
                  
                  <div className="pt-3 border-t border-stone-100">
                    <p className="text-xs font-semibold text-stone-400 uppercase mb-1">
                      Low Energy Option
                    </p>
                    <p className={clsx(
                      "text-sm text-stone-500 italic",
                      (isDone || isGoodEnough) && "text-stone-300"
                    )}>
                      {item.lowEnergyAlt}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => toggleStatus(item.day, 'done')}
                    className={clsx(
                      "flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all duration-200 border-2",
                      isDone
                        ? "bg-emerald-100 border-emerald-100 text-emerald-800"
                        : "bg-white border-stone-100 text-stone-500 hover:border-emerald-200 hover:text-emerald-600 hover:bg-emerald-50"
                    )}
                  >
                    Done
                  </button>
                  <button
                    onClick={() => toggleStatus(item.day, 'good-enough')}
                    className={clsx(
                      "flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all duration-200 border-2",
                      isGoodEnough
                        ? "bg-amber-100 border-amber-100 text-amber-800"
                        : "bg-white border-stone-100 text-stone-500 hover:border-amber-200 hover:text-amber-600 hover:bg-amber-50"
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
        <div className="bg-stone-100/80 rounded-3xl p-8 md:p-10 border border-stone-200/50">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-white rounded-full text-stone-400 shadow-sm">
              <BatteryLow size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-stone-700">Low Energy Mode</h2>
              <p className="text-stone-500 text-sm">When even the small tasks feel too big.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {lowEnergyModeTips.map((tip, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border border-stone-100 text-stone-600 text-sm font-medium flex items-center gap-3">
                <Sparkles size={16} className="text-amber-300 flex-shrink-0" />
                {tip}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
