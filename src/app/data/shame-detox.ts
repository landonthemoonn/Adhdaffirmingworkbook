export interface Reframing {
  id: string;
  toxic: string;
  reframe: string;
}

export const shameReframes: Reframing[] = [
  { 
    id: 'lazy', 
    toxic: "I'm just being lazy.", 
    reframe: "This isn't laziness; it's a freeze response. My battery is empty. Pushing harder will only drain me further. I am allowed to recharge without guilt." 
  },
  { 
    id: 'messy', 
    toxic: "I'm a mess. I can't keep up.", 
    reframe: "My environment is morally neutral. Clutter is just deferred decisions. I am a creative person with a dynamic brain, not a failed robot." 
  },
  { 
    id: 'late', 
    toxic: "I'm disrespectful because I'm late.", 
    reframe: "Time blindness is a symptom, not a character flaw. I care deeply about people. I can apologize for the impact without shaming my existence." 
  },
  { 
    id: 'flaky', 
    toxic: "I'm a bad friend.", 
    reframe: "Object permanence applies to people too. I haven't forgotten them; I've just lost track of time. A real connection can survive a pause." 
  },
  {
    id: 'stupid',
    toxic: "Why can't I just do the simple thing?",
    reframe: "Because my brain prioritizes interest, novelty, and urgency. Boring tasks are physically painful for me. I need to hack the task, not fix my brain."
  },
  {
    id: 'too-much',
    toxic: "I'm too much / too loud / too intense.",
    reframe: "I am passionate and alive. The right people will love my energy. I do not need to shrink myself to fit into small boxes."
  }
];
