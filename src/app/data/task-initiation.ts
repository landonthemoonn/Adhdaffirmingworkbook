import { Music, Coffee, Users, Timer, Sparkles } from 'lucide-react';

export interface Spark {
  id: string;
  title: string;
  icon: any;
  effect: string;
}

export const dopamineMenu: Spark[] = [
  { id: 'audio', title: 'Sonic Drive', icon: Music, effect: 'Rhythm for momentum' },
  { id: 'drink', title: 'Potion', icon: Coffee, effect: 'Sensory bridge' },
  { id: 'body-double', title: 'Body Double', icon: Users, effect: 'Shared presence' },
  { id: 'timer', title: 'Micro-Timer', icon: Timer, effect: 'Urgency burst' },
  { id: 'novelty', title: 'Novelty', icon: Sparkles, effect: 'New environment' },
];

export const initiationScripts = [
  "I don't have to finish. I just have to open the file.",
  "I will do this for 2 minutes, then I am allowed to quit.",
  "I am just setting up the station, not doing the work yet.",
  "I will do the easiest, dumbest part first."
];
