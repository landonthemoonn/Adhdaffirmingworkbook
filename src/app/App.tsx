import React, { useState } from 'react';
import { GentleHabitSystem } from './workbooks/GentleHabitSystem';
import { HomeReset } from './workbooks/HomeReset';
import { WorkStylesWorksheet } from './workbooks/WorkStyles';
import { DailyCare } from './workbooks/DailyCare';
import { EmotionalWeather } from './workbooks/EmotionalWeather';
import { SleepSanctuary } from './workbooks/SleepSanctuary';
import { WorkbookCard } from './components/WorkbookCard';
import { Sparkles, Home, Brain, Cloud, Moon, Heart } from 'lucide-react';
import { motion } from 'motion/react';

type View = 'dashboard' | 'gentle-habit' | 'home-reset' | 'work-styles' | 'daily-care' | 'emotional-weather' | 'sleep-sanctuary';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  if (currentView === 'gentle-habit') {
    return <GentleHabitSystem onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'home-reset') {
    return <HomeReset onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'work-styles') {
    return <WorkStylesWorksheet onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'daily-care') {
    return <DailyCare onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'emotional-weather') {
    return <EmotionalWeather onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'sleep-sanctuary') {
    return <SleepSanctuary onBack={() => setCurrentView('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-[#A8D8E0] relative overflow-hidden font-sans selection:bg-cyan-200">
      {/* Aurora Gradient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Teal/Cyan Orb - Top Left/Center */}
        <div className="absolute top-[-10%] left-[10%] w-[50vw] h-[50vw] bg-[#4ECDC4] rounded-full blur-[120px] opacity-60 mix-blend-multiply animate-pulse duration-[10000ms]" />
        
        {/* Orange/Coral Orb - Center/Left */}
        <div className="absolute top-[20%] left-[15%] w-[45vw] h-[45vw] bg-[#FF9A76] rounded-full blur-[130px] opacity-70 mix-blend-multiply animate-pulse duration-[8000ms]" />
        
        {/* Yellow/Gold Orb - Center/Right */}
        <div className="absolute top-[10%] right-[10%] w-[40vw] h-[40vw] bg-[#FFE681] rounded-full blur-[100px] opacity-60 mix-blend-multiply" />
        
        {/* Pink/Rose Orb - Bottom Left */}
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#FF6B6B] rounded-full blur-[140px] opacity-50 mix-blend-multiply" />

        {/* Soft Noise Texture Overlay for grain effect */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-20">
        <header className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="inline-block"
          >
            <div className="flex flex-col items-center justify-center gap-2 mb-6">
              <h1 className="text-5xl md:text-7xl font-light tracking-[0.2em] text-white uppercase drop-shadow-sm font-sans">
                ADHDkit
              </h1>
              <div className="h-px w-24 bg-white/60 mt-4 rounded-full" />
            </div>
            <p className="text-white/90 text-lg md:text-xl max-w-xl mx-auto font-light tracking-wide drop-shadow-sm">
              IT'S A LONG STORY. <br/>
              <span className="text-white/80 text-base mt-2 block">Safe tools for executive function.</span>
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <WorkbookCard
            index={0}
            title="Gentle Habit System"
            description="A 20-day support system prioritizing emotional safety over hustle."
            icon={Sparkles}
            status="active"
            onClick={() => setCurrentView('gentle-habit')}
          />
          
          <WorkbookCard
            index={1}
            title="Home Reset"
            description="A low-pressure weekly maintenance system. Resets over cleanliness."
            icon={Home}
            status="active"
            onClick={() => setCurrentView('home-reset')}
          />

           <WorkbookCard
            index={2}
            title="Work Styles"
            description="Recognize your preferred working style without judgment."
            icon={Brain}
            status="active"
            onClick={() => setCurrentView('work-styles')}
          />

          <WorkbookCard
            index={3}
            title="Daily Care"
            description="A flexible check-in system. You only need one."
            icon={Heart}
            status="active"
            onClick={() => setCurrentView('daily-care')}
          />

          <WorkbookCard
            index={4}
            title="Emotional Weather"
            description="Identifying and riding out the waves of rejection sensitivity."
            icon={Cloud}
            status="active"
            onClick={() => setCurrentView('emotional-weather')}
          />

          <WorkbookCard
            index={5}
            title="Sleep Sanctuary"
            description="Rituals to transition from high-alert to rest mode."
            icon={Moon}
            status="active"
            onClick={() => setCurrentView('sleep-sanctuary')}
          />
        </div>
      </div>
    </div>
  );
}
