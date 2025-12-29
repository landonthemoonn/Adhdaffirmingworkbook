export interface HomeTask {
  day: string;
  title: string;
  task: string;
  lowEnergyAlt: string;
  isRestDay?: boolean;
}

export const weeklyTasks: HomeTask[] = [
  {
    day: "Monday",
    title: "Surface Reset",
    task: "Clear one nightstand or desk corner (5 mins).",
    lowEnergyAlt: "Just straighten the piles so they look intentional.",
  },
  {
    day: "Tuesday",
    title: "Dish Collection",
    task: "Gather all cups and bottles to the sink.",
    lowEnergyAlt: "Bring just the one closest to you.",
  },
  {
    day: "Wednesday",
    title: "Floor Scan",
    task: "Pick up 3 pieces of trash or laundry.",
    lowEnergyAlt: "Kick items out of the main walking path.",
  },
  {
    day: "Thursday",
    title: "Clothing Refresh",
    task: "Start one wash cycle or put away one pile.",
    lowEnergyAlt: "Move clean clothes from chair to basket (no folding).",
  },
  {
    day: "Friday",
    title: "Fridge Triage",
    task: "Throw away one expired item.",
    lowEnergyAlt: "Identify one leftover to eat today.",
  },
  {
    day: "Saturday",
    title: "Entrance Reset",
    task: "Line up shoes or hang up bags.",
    lowEnergyAlt: "Clear just the path to the door.",
  },
  {
    day: "Sunday",
    title: "Rest Day",
    task: "Do absolutely nothing. You have done enough.",
    lowEnergyAlt: "Breathe.",
    isRestDay: true,
  },
];

export const lowEnergyModeTips = [
  "Open one window for fresh air.",
  "Light a candle or turn on a soft lamp.",
  "Put just one thing back where it belongs.",
];
