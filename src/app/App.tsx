import React, { useState } from 'react';
import { GentleHabitSystem } from './workbooks/GentleHabitSystem';
import { HomeReset } from './workbooks/HomeReset';
import { WorkStylesWorksheet } from './workbooks/WorkStyles';
import { DailyCare } from './workbooks/DailyCare';
import { EmotionalWeather } from './workbooks/EmotionalWeather';
import { SleepSanctuary } from './workbooks/SleepSanctuary';
import { WorkbookCard } from './components/WorkbookCard';
import { Layout } from './components/Layout';
import { Sparkles, Home, Brain, Cloud, Moon, Heart } from 'lucide-react';
import { toast, Toaster } from 'sonner';

type View = 'dashboard' | 'gentle-habit' | 'home-reset' | 'work-styles' | 'daily-care' | 'emotional-weather' | 'sleep-sanctuary';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const goToDashboard = () => setCurrentView('dashboard');

  // Simple handler to "reset" or reload the current view
  const handleReset = () => {
    // In a real app, this might reset state. For now, we'll just show a toast.
    toast.success("Section refreshed");
  };

  const handleAdd = () => {
    toast("New entry created", {
      description: "This feature will be available soon."
    });
  };

  if (currentView === 'gentle-habit') {
    return <GentleHabitSystem onBack={goToDashboard} />;
  }

  if (currentView === 'home-reset') {
    return <HomeReset onBack={goToDashboard} />;
  }

  if (currentView === 'work-styles') {
    return <WorkStylesWorksheet onBack={goToDashboard} />;
  }

  if (currentView === 'daily-care') {
    return <DailyCare onBack={goToDashboard} />;
  }

  if (currentView === 'emotional-weather') {
    return <EmotionalWeather onBack={goToDashboard} />;
  }

  if (currentView === 'sleep-sanctuary') {
    return <SleepSanctuary onBack={goToDashboard} />;
  }

  return (
    <Layout 
        onDashboard={goToDashboard} 
        onReset={handleReset} 
        onAdd={handleAdd}
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

      {/* Grid of Workbooks */}
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
    </Layout>
  );
}
