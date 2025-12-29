export interface CareCategory {
  id: string;
  title: string;
  options: string[];
  theme: 'rose' | 'emerald' | 'indigo';
}

export const dailyCareCategories: CareCategory[] = [
  {
    id: 'body',
    title: 'Body',
    theme: 'rose',
    options: [
      'Drink a glass of water',
      'Stretch for 30 seconds',
      'Wash your face',
      'Eat something small',
      'Take 3 deep breaths',
      'Put on comfortable clothes'
    ]
  },
  {
    id: 'home',
    title: 'Home',
    theme: 'emerald',
    options: [
      'Open a window',
      'Make the bed (loosely)',
      'Clear one surface',
      'Water a plant',
      'Put one dish away',
      'Adjust the lighting'
    ]
  },
  {
    id: 'mind',
    title: 'Mind',
    theme: 'indigo',
    options: [
      'Listen to one song',
      'Write down one thought',
      'Step outside for a moment',
      'Pet an animal or soft object',
      'Read one page',
      'Close your eyes for a minute'
    ]
  }
];
