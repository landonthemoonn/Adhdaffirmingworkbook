import { Calendar, Target, Layers, Eye, LucideIcon } from 'lucide-react';

export interface WorkStyle {
  id: string;
  title: string;
  description: string;
  worksBest: string[];
  supports: string[];
  colorTheme: 'blue' | 'rose' | 'amber' | 'emerald';
  icon: LucideIcon;
}

export const workStyles: WorkStyle[] = [
  {
    id: 'planner',
    title: 'The Planner',
    description: 'You find safety and flow in structure, predictability, and knowing exactly what comes next.',
    worksBest: [
      'The day has a clear shape or rhythm',
      'Tasks are broken down into small, visible steps',
      'You can see the "finish line" before starting'
    ],
    supports: [
      'Digital calendars with gentle reminders',
      'Morning roadmap sessions',
      'Checklists that allow for manual ticking'
    ],
    colorTheme: 'blue',
    icon: Calendar
  },
  {
    id: 'priority',
    title: 'The Sprinter',
    description: 'You thrive on momentum and clarity, focusing intensely on the one thing that matters most right now.',
    worksBest: [
      'You have permission to ignore the small stuff',
      'There is a clear, singular goal for the session',
      'You can ride a wave of hyperfocus'
    ],
    supports: [
      'Body doubling (working alongside someone)',
      '"Top 1" sticky notes',
      'Timers to create gentle containers'
    ],
    colorTheme: 'rose',
    icon: Target
  },
  {
    id: 'processor',
    title: 'The Processor',
    description: 'You need space, time, and low pressure to connect dots and understand concepts deeply.',
    worksBest: [
      'You are not being rushed or observed',
      'You can "talk out" or journal your thoughts',
      'You have time to transition between tasks'
    ],
    supports: [
      'Voice memos for brain dumps',
      'Uninterrupted "deep work" blocks',
      'Mind maps instead of linear lists'
    ],
    colorTheme: 'amber',
    icon: Layers
  },
  {
    id: 'visualizer',
    title: 'The Visualizer',
    description: 'If you can’t see it, it doesn’t exist. You need tasks to be tangible, spatial, and colorful.',
    worksBest: [
      'Information is color-coded or spatially arranged',
      'You can move physical objects (post-its, tokens)',
      'Your environment is visually clear'
    ],
    supports: [
      'Kanban boards (To Do / Doing / Done)',
      'Whiteboards or large paper pads',
      'Visual timers (seeing time pass)'
    ],
    colorTheme: 'emerald',
    icon: Eye
  }
];
