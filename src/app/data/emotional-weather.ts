import { Cloud, CloudRain, Sun, Wind, CloudFog, Zap } from 'lucide-react';

export interface WeatherState {
  id: string;
  label: string;
  icon: any; // Using any for Lucide icon component type
  description: string;
  thoughts: string;
  reminder: string;
  gradient: string;
}

export const weatherStates: WeatherState[] = [
  {
    id: 'clear',
    label: 'Clear',
    icon: Sun,
    description: 'Calm, regulated, able to see perspective.',
    thoughts: '"I can handle this."',
    reminder: 'Savor this stability.',
    gradient: 'from-sky-100 to-blue-50'
  },
  {
    id: 'overcast',
    label: 'Overcast',
    icon: Cloud,
    description: 'Heavy, low energy, muted motivation.',
    thoughts: '"Why is this so hard today?"',
    reminder: 'Low energy is not a moral failing.',
    gradient: 'from-gray-100 to-slate-200'
  },
  {
    id: 'drizzle',
    label: 'Drizzle',
    icon: CloudRain,
    description: 'Mild irritation, background anxiety, sadness.',
    thoughts: '"I feel a bit off/sad."',
    reminder: 'It is okay to feel gray.',
    gradient: 'from-blue-100 to-indigo-100'
  },
  {
    id: 'heavy-rain',
    label: 'Heavy Rain',
    icon: CloudRain,
    description: 'Overwhelm, crying, urge to withdraw.',
    thoughts: '"It’s all too much."',
    reminder: 'This storm will run out of rain.',
    gradient: 'from-indigo-200 to-blue-300'
  },
  {
    id: 'thunder',
    label: 'Thunder',
    icon: Zap,
    description: 'Intense anger, rejection sensitivity, fight/flight.',
    thoughts: '"They hate me / I hate them."',
    reminder: 'Feelings are real, stories might not be.',
    gradient: 'from-violet-200 to-purple-300'
  },
  {
    id: 'fog',
    label: 'Fog',
    icon: CloudFog,
    description: 'Confusion, dissociation, brain fog.',
    thoughts: '"I don’t know what I’m doing."',
    reminder: 'Clarity will return in time.',
    gradient: 'from-stone-200 to-zinc-200'
  }
];

export const stormSignals = {
  body: [
    'Tight chest',
    'Jaw clenching',
    'Restlessness / Pacing',
    'Sudden heavy fatigue',
    'Heat or buzzing sensation',
    'Holding breath'
  ],
  thoughts: [
    '“They hate me”',
    '“I messed everything up”',
    'Urge to explain / over-apologize',
    'Urge to disappear / ghost',
    'Replaying conversations',
    '“I am too much”'
  ]
};

export interface RegulationOption {
  id: string;
  title: string;
  duration: string;
  benefit: string;
  description?: string;
}

export const regulationOptions: RegulationOption[] = [
  {
    id: 'senses',
    title: '5-4-3-2-1 Grounding',
    duration: '2 mins',
    benefit: 'Interrupts spinning thoughts',
    description: 'Name 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste.'
  },
  {
    id: 'breathe',
    title: 'Slow Exhale Breathing',
    duration: '1 min',
    benefit: 'Calms the nervous system',
    description: 'Inhale for 4, hold for 4, exhale slowly for 6 or 8.'
  },
  {
    id: 'ground',
    title: 'Floor Press',
    duration: '30 secs',
    benefit: 'Physical grounding',
    description: 'Press your feet firmly into the floor. Feel the support beneath you.'
  },
  {
    id: 'cold',
    title: 'Temperature Shock',
    duration: '1 min',
    benefit: 'Resets the vagus nerve',
    description: 'Splash cold water on your face or run wrists under cold tap.'
  },
  {
    id: 'write',
    title: 'Unsent Letter',
    duration: '5 mins',
    benefit: 'Gets the loop out of your head',
    description: 'Write the angry/sad thought completely unfiltered. Do NOT send it.'
  }
];

export const reflectionPrompts = [
  'What actually happened vs. what I feared?',
  'What support would feel good right now?',
  'What doesn’t need solving tonight?'
];
