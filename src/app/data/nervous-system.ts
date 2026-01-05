import { Wind, Anchor, Headphones, Zap } from 'lucide-react';

export interface Regulator {
  id: string;
  title: string;
  description: string;
  icon: any;
  duration: string;
  type: 'breath' | 'sensory' | 'movement';
  steps?: string[];
}

export const regulators: Regulator[] = [
  {
    id: 'box-breath',
    title: 'Box Breathing',
    description: 'Reset your vagus nerve. Inhale 4, Hold 4, Exhale 4, Hold 4.',
    icon: Wind,
    duration: '2 min',
    type: 'breath',
    steps: ['Inhale deeply', 'Hold', 'Exhale slowly', 'Hold empty']
  },
  {
    id: '54321',
    title: '5-4-3-2-1 Grounding',
    description: 'Reconnect with your physical environment.',
    icon: Anchor,
    duration: '3 min',
    type: 'sensory',
    steps: [
      '5 things you see',
      '4 things you can touch',
      '3 things you hear',
      '2 things you can smell',
      '1 emotion you feel'
    ]
  },
  {
    id: 'bilateral',
    title: 'Bilateral Stimulation',
    description: 'Tap your knees alternately or look left/right repeatedly.',
    icon: Zap,
    duration: '1 min',
    type: 'movement',
    steps: ['Tap left knee', 'Tap right knee', 'Repeat rhythmically', 'Focus on the sensation']
  },
  {
    id: 'audio-wall',
    title: 'Sonic Cocoon',
    description: 'Block out the chaos. Put on headphones with brown noise.',
    icon: Headphones,
    duration: 'Instant',
    type: 'sensory'
  }
];
