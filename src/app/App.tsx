import React, { useState } from 'react';
import { GentleHabitSystem } from './workbooks/GentleHabitSystem';
import { HomeReset } from './workbooks/HomeReset';
import { WorkStylesWorksheet } from './workbooks/WorkStyles';
import { DailyCare } from './workbooks/DailyCare';
import { EmotionalWeather } from './workbooks/EmotionalWeather';
import { SleepSanctuary } from './workbooks/SleepSanctuary';
import { NervousSystem } from './workbooks/NervousSystem';
import { TaskInitiation } from './workbooks/TaskInitiation';
import { ShameDetox } from './workbooks/ShameDetox';
import { EnergyMapping } from './workbooks/EnergyMapping';
import { PrintView } from './workbooks/PrintView';

import { WorkbookCard } from './components/WorkbookCard';
import { Layout } from './components/Layout';
import { Sparkles, Home, Brain, Cloud, Moon, Heart, Wind, Zap, ShieldCheck, PlayCircle } from 'lucide-react';
import { toast, Toaster } from 'sonner';

type View = 
  | 'dashboard' 
  | 'gentle-habit' 
  | 'home-reset' 
  | 'work-styles' 
  | 'daily-care' 
  | 'emotional-weather' 
  | 'sleep-sanctuary'
  | 'nervous-system'
  | 'task-initiation'
  | 'shame-detox'
  | 'energy-mapping'
  | 'print-view';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const goToDashboard = () => setCurrentView('dashboard');
  const goToPrintView = () => setCurrentView('print-view');
  
  // These are handled within Layout/Modal now, but kept for interface compatibility
  const handleReset = () => toast.success("Section refreshed");
  const handleAdd = () => toast("New entry created");

  // Router Switch
  switch (currentView) {
    case 'gentle-habit': return <GentleHabitSystem onBack={goToDashboard} />;
    case 'home-reset': return <HomeReset onBack={goToDashboard} />;
    case 'work-styles': return <WorkStylesWorksheet onBack={goToDashboard} />;
    case 'daily-care': return <DailyCare onBack={goToDashboard} />;
    case 'emotional-weather': return <EmotionalWeather onBack={goToDashboard} />;
    case 'sleep-sanctuary': return <SleepSanctuary onBack={goToDashboard} />;
    case 'nervous-system': return <NervousSystem onBack={goToDashboard} />;
    case 'task-initiation': return <TaskInitiation onBack={goToDashboard} />;
    case 'shame-detox': return <ShameDetox onBack={goToDashboard} />;
    case 'energy-mapping': return <EnergyMapping onBack={goToDashboard} />;
    case 'print-view': return <PrintView onBack={goToDashboard} />;
  }

  return (
    <Layout 
        onDashboard={goToDashboard} 
        onReset={handleReset} 
        onAdd={handleAdd}
        onPrint={goToPrintView}
    >
      <Toaster position="top-center" />
      
      {/* Header Section */}
      <header className="mb-14 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start">
            {/* Brand Pill */}
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#EEE6E1] shadow-[inset_2px_2px_5px_rgba(180,160,150,0.2),inset_-2px_-2px_5px_rgba(255,255,255,0.8)] mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-[#EFA896]" />
                <span className="text-sm font-bold tracking-widest text-[#8A6A60] uppercase">Dashboard</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#5C3A3A] drop-shadow-sm font-sans mb-2">
            ADHDkit
            </h1>
            <p className="text-[#9C7A70] text-base font-medium tracking-wide">
            Your safe executive function space.
            </p>
        </div>
      </header>

      <div className="space-y-16">
        
        {/* Core Regulation & Safety */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-lg font-bold text-[#8A6A60] uppercase tracking-widest">Core Regulation & Safety</h2>
            <div className="h-[1px] bg-[#D6CFC7] flex-grow" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <WorkbookCard
                index={0}
                title="Emotional Weather"
                description="Identifying and riding out the waves of rejection sensitivity."
                icon={Cloud}
                status="active"
                onClick={() => setCurrentView('emotional-weather')}
            />
            <WorkbookCard
                index={1}
                title="Nervous System Reset"
                description="Micro-regulation tools for when everything feels too loud."
                icon={Wind}
                status="new"
                onClick={() => setCurrentView('nervous-system')}
            />
            <WorkbookCard
                index={2}
                title="Shame Detox"
                description="Name and reframe the internalized narratives holding you back."
                icon={ShieldCheck}
                status="new"
                onClick={() => setCurrentView('shame-detox')}
            />
          </div>
        </section>

        {/* Executive Function */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-lg font-bold text-[#8A6A60] uppercase tracking-widest">Executive Function</h2>
            <div className="h-[1px] bg-[#D6CFC7] flex-grow" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <WorkbookCard
                index={3}
                title="Gentle Habit System"
                description="A 20-day support system prioritizing emotional safety over hustle."
                icon={Sparkles}
                status="active"
                onClick={() => setCurrentView('gentle-habit')}
            />
            <WorkbookCard
                index={4}
                title="Home Reset"
                description="Low-pressure weekly maintenance. Resets over cleanliness."
                icon={Home}
                status="active"
                onClick={() => setCurrentView('home-reset')}
            />
            <WorkbookCard
                index={5}
                title="Work Styles"
                description="Recognize your preferred working style without judgment."
                icon={Brain}
                status="active"
                onClick={() => setCurrentView('work-styles')}
            />
            <WorkbookCard
                index={6}
                title="Task Initiation Lab"
                description="Start-only rituals and dopamine pairing to break paralysis."
                icon={PlayCircle}
                status="new"
                onClick={() => setCurrentView('task-initiation')}
            />
          </div>
        </section>

        {/* Body & Brain Care */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-lg font-bold text-[#8A6A60] uppercase tracking-widest">Body & Brain Care</h2>
            <div className="h-[1px] bg-[#D6CFC7] flex-grow" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <WorkbookCard
                index={7}
                title="Daily Care"
                description="A flexible check-in system. You only need one."
                icon={Heart}
                status="active"
                onClick={() => setCurrentView('daily-care')}
            />
            <WorkbookCard
                index={8}
                title="Energy Mapping"
                description="Track capacity, not productivity. Permission to rest."
                icon={Zap}
                status="new"
                onClick={() => setCurrentView('energy-mapping')}
            />
            <WorkbookCard
                index={9}
                title="Sleep Sanctuary"
                description="Rituals to transition from high-alert to rest mode."
                icon={Moon}
                status="active"
                onClick={() => setCurrentView('sleep-sanctuary')}
            />
          </div>
        </section>

      </div>
    </Layout>
  );
}