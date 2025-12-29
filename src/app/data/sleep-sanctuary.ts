import { Moon, Pen, CheckCircle, Coffee, Wind, Activity, Heart, EyeOff } from 'lucide-react';

export const closureOptions = [
  {
    id: 'wait',
    text: 'Write down what can wait until tomorrow',
    icon: Pen
  },
  {
    id: 'well',
    text: 'Choose one thing you did well today',
    icon: CheckCircle
  },
  {
    id: 'pause',
    text: 'Name one unfinished thing and consciously pause it',
    icon: Moon
  }
];

export const mindPrompts = [
  'What is looping right now?',
  'What am I afraid of forgetting?',
  'What feels unresolved but not urgent?'
];

export const somaticRituals = [
  {
    id: 'breath',
    title: 'Slow Breathing',
    icon: Wind,
    description: 'Inhale for 4 counts, exhale for 6 or 8. Signal safety to your vagus nerve.'
  },
  {
    id: 'muscle',
    title: 'Muscle Release',
    icon: Activity,
    description: 'Squeeze your toes, then release. Move up to your calves, thighs, and so on.'
  },
  {
    id: 'warmth',
    title: 'Warmth',
    icon: Coffee,
    description: 'A warm shower, a heavy blanket, or a cup of herbal tea.'
  },
  {
    id: 'stretch',
    title: 'Gentle Stretch',
    icon: Activity,
    description: 'Slow neck rolls or reaching for the sky. No forcing.'
  },
  {
    id: 'touch',
    title: 'Hand on Heart',
    icon: Heart,
    description: 'Place one hand on your chest, one on your belly. Feel the rise and fall.'
  },
  {
    id: 'eyes',
    title: 'Eye Rest',
    icon: EyeOff,
    description: 'Close your eyes or soften your gaze. Let the visual stimulation fade.'
  }
];

export const finalPrompts = [
  'You are allowed to stop.',
  'Nothing else is required.',
  'Rest is happening even if sleep doesn’t.',
  'The day is done. You are safe.'
];
