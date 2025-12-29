export interface DayData {
  day: number;
  title: string;
  why: string;
  microAction: string;
  bonusAction?: string;
}

export const days: DayData[] = [
  {
    day: 1,
    title: "Just One Breath",
    why: "Connecting with your breath signals safety to your nervous system.",
    microAction: "Take one deliberate inhale and exhale. Just one.",
    bonusAction: "Notice where your shoulders are. Can they drop an inch?",
  },
  {
    day: 2,
    title: "Hydrate First",
    why: "Brain fog often starts with mild dehydration.",
    microAction: "Drink one glass of water before you do anything else.",
    bonusAction: "Fill a bottle and put it on your desk for later.",
  },
  {
    day: 3,
    title: "Morning Light",
    why: "Natural light helps regulate your circadian rhythm and mood.",
    microAction: "Look out a window or step outside for 2 minutes.",
    bonusAction: "Open the curtains in one room.",
  },
  {
    day: 4,
    title: "The 2-Minute Clear",
    why: "Visual clutter can create background anxiety.",
    microAction: "Clear one tiny flat surface (like a nightstand or corner of a desk).",
    bonusAction: "Wipe it down so it feels fresh.",
  },
  {
    day: 5,
    title: "Brain Dump",
    why: "Holding tasks in your head uses up valuable working memory.",
    microAction: "Write down 3 things swirling in your mind.",
    bonusAction: "Cross out one thing that doesn't actually need to happen today.",
  },
  {
    day: 6,
    title: "Move Your Body",
    why: "Movement releases dopamine, which ADHD brains crave.",
    microAction: "Stretch your arms up high for 10 seconds.",
    bonusAction: "Do a quick shake-out of your hands and legs.",
  },
  {
    day: 7,
    title: "Eat Something",
    why: "Stable blood sugar prevents energy crashes and irritability.",
    microAction: "Eat a protein-rich snack (nuts, cheese, yogurt).",
    bonusAction: "Plan what you'll eat for your next meal.",
  },
  {
    day: 8,
    title: "Single-Tasking",
    why: "Multitasking increases cognitive load and fatigue.",
    microAction: "Do one thing (like washing a dish) without listening to anything.",
    bonusAction: "Notice the sensory details of the task (temperature, texture).",
  },
  {
    day: 9,
    title: "Digital boundaries",
    why: "Constant notifications keep your nervous system on high alert.",
    microAction: "Turn one non-essential notification off.",
    bonusAction: "Put your phone in another room for 15 minutes.",
  },
  {
    day: 10,
    title: "The 'Good Enough' Bar",
    why: "Perfectionism is often a barrier to starting.",
    microAction: "Identify one task and lower your standard for it today.",
    bonusAction: "Say out loud: 'Done is better than perfect.'",
  },
  {
    day: 11,
    title: "Green Therapy",
    why: "Nature has a restorative effect on attention fatigue.",
    microAction: "Look at a plant, tree, or patch of sky.",
    bonusAction: "Touch a leaf or natural texture.",
  },
  {
    day: 12,
    title: "Body Double",
    why: "Presence of others can help with task initiation.",
    microAction: "Text a friend that you are doing a task.",
    bonusAction: "Work in a common area or cafe for 20 minutes.",
  },
  {
    day: 13,
    title: "Transition Buffer",
    why: "ADHD brains struggle with shifting gears abruptly.",
    microAction: "Sit for 1 minute between tasks doing absolutely nothing.",
    bonusAction: "Close your eyes during this minute.",
  },
  {
    day: 14,
    title: "Sensory Check-in",
    why: "Overstimulation can manifest as anxiety or irritability.",
    microAction: "Notice one sound or light that is annoying you.",
    bonusAction: "Adjust your environment to reduce that input (headphones, dimmer).",
  },
  {
    day: 15,
    title: "Smallest Step",
    why: "Breaking tasks down bypasses executive dysfunction.",
    microAction: "Identify the absolute smallest first step of a scary task.",
    bonusAction: "Do that tiny step.",
  },
  {
    day: 16,
    title: "Dopamine Menu",
    why: "Having ready-to-go healthy rewards helps motivation.",
    microAction: "List 3 things that make you feel good instantly.",
    bonusAction: "Do one of them for 5 minutes.",
  },
  {
    day: 17,
    title: "Forgiveness",
    why: "Shame drains the energy needed for executive function.",
    microAction: "Forgive yourself for one thing you didn't do yesterday.",
    bonusAction: "Visualize that guilt floating away like a balloon.",
  },
  {
    day: 18,
    title: "Pomodoro-ish",
    why: "Time blindness makes indefinite work periods daunting.",
    microAction: "Set a timer for 10 minutes to do a thing.",
    bonusAction: "Stop exactly when the timer goes off if you want to.",
  },
  {
    day: 19,
    title: "Celebrate Small Wins",
    why: "Acknowledging progress reinforces the neural pathways for effort.",
    microAction: "Write down one thing you actually did today.",
    bonusAction: "Share it with someone supportive.",
  },
  {
    day: 20,
    title: "Rest as Fuel",
    why: "Rest is not a reward; it's a physiological necessity.",
    microAction: "Lie down or recline for 5 minutes with zero guilt.",
    bonusAction: "Plan a longer period of unstructured rest for the weekend.",
  },
];
