import { Battery, BatteryCharging, BatteryWarning, Zap } from 'lucide-react';

export interface EnergyLevel {
  id: string;
  level: number; // 0-100
  label: string;
  description: string;
  icon: any;
  recommendation: string;
  color: string;
  protocol: string[];
}

export const energyLevels: EnergyLevel[] = [
  {
    id: 'surge',
    level: 90,
    label: 'Hyper-Capacity',
    description: 'You feel like you can do everything. Danger of overcommitting.',
    icon: Zap,
    recommendation: 'Pick 1 hard thing. Do NOT promise more future work.',
    color: '#D97706', // Amber-600
    protocol: [
      "Identify ONE high-value task",
      "Set a timer for 45 minutes",
      "Write down ideas for later (don't switch tasks)",
      "Drink water (you will forget)"
    ]
  },
  {
    id: 'steady',
    level: 70,
    label: 'Sustainable Flow',
    description: 'Good focus. Calm body.',
    icon: BatteryCharging,
    recommendation: 'Do the "Deep Work" now. It won\'t last all day.',
    color: '#059669', // Emerald-600
    protocol: [
      "Work on the main project",
      "Clear the inbox (batching)",
      "Schedule meetings",
      "Take a 5 min stretch break every hour"
    ]
  },
  {
    id: 'low',
    level: 30,
    label: 'Low Power Mode',
    description: 'Brain fog. Heavy limbs.',
    icon: Battery,
    recommendation: 'Admin tasks, sorting, or passive consumption. No new decisions.',
    color: '#475569', // Slate-600
    protocol: [
      "Delete old files/emails",
      "Organize physical desk",
      "Watch a tutorial (passive learning)",
      "Do laundry or dishes (mindless movement)"
    ]
  },
  {
    id: 'empty',
    level: 10,
    label: 'System Collapse',
    description: 'RSD, tears, or paralysis.',
    icon: BatteryWarning,
    recommendation: 'Stop. Floor time. Sensory deprivation. Eat something.',
    color: '#DC2626', // Red-600
    protocol: [
      "Lie on the floor",
      "Eat a protein snack",
      "Put on noise-canceling headphones",
      "Cancel non-urgent plans",
      "No screens for 20 minutes"
    ]
  }
];
