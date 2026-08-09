export interface ChallengeDay {
  dayNumber: number;
  title: string;
  category: string;
  estimatedMinutes: number;
  synergyPoints: number;
  brief: string;
  requirements: string[];
  tips: string;
  aiPromptTemplate?: string;
}

export interface BadgeItem {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  unlockedAt?: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  avatar: string;
  college: string;
  track: string;
  currentDay: number;
  currentStreak: number;
  bestStreak: number;
  totalSynergy: number;
  shieldCount: number;
  completedDays: number[]; // array of day numbers
  missedDays: number[]; // array of day numbers
  submissions: Record<number, { githubUrl: string; linkedinUrl: string; timestamp: string }>;
  unlockedBadges: string[]; // badge IDs
}

export const ACHIEVEMENT_BADGES: BadgeItem[] = [
  {
    id: "night-owl",
    name: "Night Owl Builder",
    icon: "Moon",
    description: "Submitted proof of work past 10 PM IST after college lectures",
    color: "from-indigo-500 to-purple-600",
  },
  {
    id: "seven-day-flame",
    name: "7-Day Flame Master",
    icon: "Flame",
    description: "Maintained a unbroken 7-day public coding streak",
    color: "from-orange-500 to-amber-500",
  },
  {
    id: "synergy-champion",
    name: "Synergy Centurion",
    icon: "Zap",
    description: "Accumulated over 200 Synergy contribution points",
    color: "from-amber-400 to-yellow-600",
  },
  {
    id: "exam-survivor",
    name: "Exam Shield Hero",
    icon: "Shield",
    description: "Used Exam Protection Shield to preserve streak during college midterms",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "proof-master",
    name: "Double Proof Verified",
    icon: "CheckCircle2",
    description: "Verified both GitHub code commit and LinkedIn post links",
    color: "from-emerald-500 to-teal-600",
  },
];

export const TRACKS = [
  {
    id: "claude-ai",
    name: "Claude AI & Vibe Coding",
    icon: "Sparkles",
    tagline: "Build web apps, prompts, and agentic workflows",
    enrolledCount: 1420,
    badge: "Most Popular",
  },
  {
    id: "mern-stack",
    name: "Fullstack Web & AI Agents",
    icon: "Code2",
    tagline: "Master modern TypeScript, React & Node backends",
    enrolledCount: 890,
    badge: "Trending",
  },
  {
    id: "dsa-ai",
    name: "DSA & System Design with AI",
    icon: "BrainCircuit",
    tagline: "Solve coding patterns & crack tech interviews",
    enrolledCount: 650,
    badge: "Interview Prep",
  },
];

export const MOCK_DAYS: ChallengeDay[] = [
  {
    dayNumber: 1,
    title: "Kickoff: Setup Your Vibe Coding Environment & First AI Prompt",
    category: "Environment Setup",
    estimatedMinutes: 20,
    synergyPoints: 23,
    brief: "Welcome to Day 1 of your 60-Day ABTalks Sprint! Today is all about establishing your public commitment and setting up your repository.",
    requirements: [
      "Create a public GitHub repository named 'abtalks-60days'",
      "Write a clean README.md stating your 60-day goals",
      "Generate your personalized ViCodathon/ABTalks participant post on LinkedIn",
    ],
    tips: "Consistency beats intensity. Spending 20 minutes every night after college builds a lifelong habit.",
    aiPromptTemplate: "Act as a senior tech mentor. Help me write a professional GitHub README.md for my 60-day coding sprint...",
  },
  {
    dayNumber: 2,
    title: "Build a High-Converting Landing Page Hero Section",
    category: "Frontend UI",
    estimatedMinutes: 30,
    synergyPoints: 23,
    brief: "Design a responsive, mobile-first hero section with high-contrast typography and a prominent call-to-action button.",
    requirements: [
      "Mobile-first design (390px viewport optimized)",
      "High-contrast headline and subheadline",
      "Primary call to action button with hover & active states",
    ],
    tips: "Focus on white space and legibility. Use Tailwind CSS utility classes like max-w-[390px] for mobile constraints.",
  },
  {
    dayNumber: 3,
    title: "Interactive Component: Card Grid with Filter Buttons",
    category: "React State",
    estimatedMinutes: 35,
    synergyPoints: 23,
    brief: "Build a filterable card grid showing projects or tracks using React useState and smooth transitions.",
    requirements: [
      "At least 3 filter tags (e.g. All, AI, Web)",
      "Smooth layout animation when filtering items",
      "Empty state message when no items match filter",
    ],
    tips: "Use Framer Motion or simple CSS transitions to make button taps feel responsive.",
  },
  {
    dayNumber: 4,
    title: "Mock Data Layer & LocalStorage State Sync",
    category: "State Management",
    estimatedMinutes: 25,
    synergyPoints: 23,
    brief: "Create a structured data.json file and sync user progress to browser localStorage so data persists across refreshes.",
    requirements: [
      "TypeScript interfaces for items and user state",
      "LocalStorage fallback helper function",
      "Reset state button for testing edge cases",
    ],
    tips: "Always test edge cases like empty storage or missing keys.",
  },
  {
    dayNumber: 5,
    title: "Dark Mode & Eye-Care Night Mode Toggle",
    category: "UI Polish",
    estimatedMinutes: 25,
    synergyPoints: 23,
    brief: "Add a late-night eye-care theme toggle optimized for college students working late at night.",
    requirements: [
      "Eye-safe dark palette (low glare dark blues/slates)",
      "Persistent theme preference in local state",
      "Smooth color transition across all cards and text",
    ],
    tips: "Avoid pure black #000000; prefer deep rich slates like #0f172a for better readability.",
  },
  {
    dayNumber: 6,
    title: "Interactive Form Validation & Proof Submission UI",
    category: "Forms & UX",
    estimatedMinutes: 30,
    synergyPoints: 23,
    brief: "Build a clean form for submitting GitHub commit URLs and LinkedIn post links with real-time URL validation.",
    requirements: [
      "Regex URL validation for GitHub and LinkedIn domains",
      "Disabled state on submit button until inputs are valid",
      "Success celebration modal with Synergy reward badge",
    ],
    tips: "Provide instant inline feedback so students know if their link format is correct.",
  },
  {
    dayNumber: 7,
    title: "7-Day Sprint Recap & Reflection Post",
    category: "Community & Proof",
    estimatedMinutes: 20,
    synergyPoints: 25,
    brief: "Congratulations on completing Week 1! Today you will reflect on what you built and share your 7-day streak on LinkedIn.",
    requirements: [
      "Write a 150-word summary of Week 1 learnings",
      "Tag @ABTalksOnAI and @Anil Bajpai on LinkedIn",
      "Include a screenshot of your 7-day streak graph",
    ],
    tips: "Building in public creates unexpected job opportunities and recruiter inbound messages.",
  },
  {
    dayNumber: 8,
    title: "API Proxy Route & Gemini AI Integration",
    category: "Backend & AI",
    estimatedMinutes: 40,
    synergyPoints: 23,
    brief: "Set up a server-side route to call Gemini AI safely without exposing API keys in client-side code.",
    requirements: [
      "Server-side endpoint handling request",
      "Error handling for missing API keys or rate limits",
      "Clean TypeScript response typing",
    ],
    tips: "Never expose secret API keys in browser JavaScript.",
  },
  {
    dayNumber: 9,
    title: "Streak Heatmap Component with 60-Day Grid",
    category: "Data Visualization",
    estimatedMinutes: 35,
    synergyPoints: 23,
    brief: "Build a compact 60-day streak heatmap grid inspired by GitHub commit graphs, optimized for 390px screens.",
    requirements: [
      "60 square tiles mapped in a 10x6 or 12x5 responsive grid",
      "Color coded status: Completed (Green), Missed (Red), Today (Blue pulse), Upcoming (Gray)",
      "Tooltip or popover showing day details when tapped",
    ],
    tips: "Ensure tap targets are at least 32px on mobile screens.",
  },
  {
    dayNumber: 10,
    title: "Synergy Points Economy & Reward Badges",
    category: "Gamification",
    estimatedMinutes: 30,
    synergyPoints: 23,
    brief: "Implement the Synergy contribution score calculation (+10 daily task, +5 GitHub, +8 LinkedIn) and achievement badges.",
    requirements: [
      "Live Synergy balance counter animation",
      "Breakdown drawer showing earned vs available points",
      "Unlockable badges (e.g. 'Night Owl Builder', '7-Day Flame')",
    ],
    tips: "Visual feedback when earning points reinforces daily consistency.",
  },
  {
    dayNumber: 11,
    title: "Streak Protection Shield & Exam Freeze Mechanic",
    category: "Thoughtful Feature",
    estimatedMinutes: 30,
    synergyPoints: 23,
    brief: "Build the Exam Shield / Synergy Recovery feature allowing students to protect their streak during college midterm exams.",
    requirements: [
      "Modal dialog explaining how Exam Shield works",
      "Option to spend 50 Synergy points to freeze streak for 48 hours",
      "Option to recover a missed day by completing a double-task challenge",
    ],
    tips: "This solves a huge student pain point during college exam weeks!",
  },
  {
    dayNumber: 12,
    title: "Redesign ABTalks: Mobile-First Challenge Dashboard",
    category: "Full UI Redesign",
    estimatedMinutes: 45,
    synergyPoints: 23,
    brief: "Design and build a mobile-first dashboard and single-day challenge screen for the ABTalks 60-Day Sprint platform.",
    requirements: [
      "Mobile-first 390px viewport layout",
      "Interactive streak graph and today's action card",
      "Proof of work submission with GitHub & LinkedIn URLs",
      "Thoughtful student experience feature (Streak Shield / Exam Recovery)",
    ],
    tips: "Ensure clean typography, high contrast, and smooth interactions.",
    aiPromptTemplate: "Create a mobile-first React component for a student dashboard with streak heatmaps and Synergy point badges...",
  },
];

// Generate placeholder days up to day 60
for (let i = 13; i <= 60; i++) {
  MOCK_DAYS.push({
    dayNumber: i,
    title: `Day ${i}: Advanced AI Agent & Fullstack Module ${i}`,
    category: i % 2 === 0 ? "AI Agent Dev" : "Fullstack Architecture",
    estimatedMinutes: 30,
    synergyPoints: 23,
    brief: `Challenge Day ${i} of your 60-day sprint. Expand your vibe coding skillset with automated workflows and component design.`,
    requirements: [
      `Implement Day ${i} core functional module`,
      "Push code commit to GitHub repo",
      "Share learning milestone on LinkedIn with #ViCodathon2026 tag",
    ],
    tips: "Focus on clean modular code and thorough documentation.",
  });
}

// Student Profile Presets for Edge Case Testing
export const STUDENT_PRESETS: Record<string, StudentProfile> = {
  "active-challenger": {
    id: "active-challenger",
    name: "Nischay Tilwani",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    college: "IIT Bombay · 3rd Year CSE",
    track: "Claude AI & Vibe Coding",
    currentDay: 12,
    currentStreak: 11,
    bestStreak: 11,
    totalSynergy: 276,
    shieldCount: 2,
    completedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    missedDays: [],
    unlockedBadges: ["night-owl", "seven-day-flame", "synergy-champion", "proof-master"],
    submissions: {
      1: { githubUrl: "https://github.com/nischay/abtalks-60days/commit/d1a2b3", linkedinUrl: "https://linkedin.com/posts/nischay-day1-activity-1001", timestamp: "2026-07-27 22:30" },
      2: { githubUrl: "https://github.com/nischay/abtalks-60days/commit/e2b3c4", linkedinUrl: "https://linkedin.com/posts/nischay-day2-activity-1002", timestamp: "2026-07-28 23:15" },
      3: { githubUrl: "https://github.com/nischay/abtalks-60days/commit/f3c4d5", linkedinUrl: "https://linkedin.com/posts/nischay-day3-activity-1003", timestamp: "2026-07-29 21:45" },
      4: { githubUrl: "https://github.com/nischay/abtalks-60days/commit/a4d5e6", linkedinUrl: "https://linkedin.com/posts/nischay-day4-activity-1004", timestamp: "2026-07-30 22:10" },
      5: { githubUrl: "https://github.com/nischay/abtalks-60days/commit/b5e6f7", linkedinUrl: "https://linkedin.com/posts/nischay-day5-activity-1005", timestamp: "2026-07-31 23:50" },
      6: { githubUrl: "https://github.com/nischay/abtalks-60days/commit/c6f7a8", linkedinUrl: "https://linkedin.com/posts/nischay-day6-activity-1006", timestamp: "2026-08-01 22:05" },
      7: { githubUrl: "https://github.com/nischay/abtalks-60days/commit/d7a8b9", linkedinUrl: "https://linkedin.com/posts/nischay-day7-activity-1007", timestamp: "2026-08-02 21:20" },
      8: { githubUrl: "https://github.com/nischay/abtalks-60days/commit/e8b9c0", linkedinUrl: "https://linkedin.com/posts/nischay-day8-activity-1008", timestamp: "2026-08-03 23:00" },
      9: { githubUrl: "https://github.com/nischay/abtalks-60days/commit/f9c0a1", linkedinUrl: "https://linkedin.com/posts/nischay-day9-activity-1009", timestamp: "2026-08-04 22:40" },
      10: { githubUrl: "https://github.com/nischay/abtalks-60days/commit/a0b1c2", linkedinUrl: "https://linkedin.com/posts/nischay-day10-activity-1010", timestamp: "2026-08-05 23:10" },
      11: { githubUrl: "https://github.com/nischay/abtalks-60days/commit/b1c2d3", linkedinUrl: "https://linkedin.com/posts/nischay-day11-activity-1011", timestamp: "2026-08-06 22:15" },
    },
  },
  "day-1-newbie": {
    id: "day-1-newbie",
    name: "Rohan Sharma",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    college: "NSUT Delhi · 1st Year IT",
    track: "Claude AI & Vibe Coding",
    currentDay: 1,
    currentStreak: 0,
    bestStreak: 0,
    totalSynergy: 0,
    shieldCount: 1,
    completedDays: [],
    missedDays: [],
    unlockedBadges: [],
    submissions: {},
  },
  "missed-streak": {
    id: "missed-streak",
    name: "Priya Patel",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    college: "VIT Vellore · 2nd Year ECE",
    track: "Fullstack Web & AI Agents",
    currentDay: 12,
    currentStreak: 1,
    bestStreak: 8,
    totalSynergy: 195,
    shieldCount: 1,
    completedDays: [1, 2, 3, 4, 5, 6, 7, 8, 11],
    missedDays: [9, 10], // Missed due to college midterms!
    unlockedBadges: ["seven-day-flame", "proof-master"],
    submissions: {
      1: { githubUrl: "https://github.com/priya/abtalks/commit/1", linkedinUrl: "https://linkedin.com/posts/priya-1", timestamp: "2026-07-27" },
      2: { githubUrl: "https://github.com/priya/abtalks/commit/2", linkedinUrl: "https://linkedin.com/posts/priya-2", timestamp: "2026-07-28" },
      3: { githubUrl: "https://github.com/priya/abtalks/commit/3", linkedinUrl: "https://linkedin.com/posts/priya-3", timestamp: "2026-07-29" },
      4: { githubUrl: "https://github.com/priya/abtalks/commit/4", linkedinUrl: "https://linkedin.com/posts/priya-4", timestamp: "2026-07-30" },
      5: { githubUrl: "https://github.com/priya/abtalks/commit/5", linkedinUrl: "https://linkedin.com/posts/priya-5", timestamp: "2026-07-31" },
      6: { githubUrl: "https://github.com/priya/abtalks/commit/6", linkedinUrl: "https://linkedin.com/posts/priya-6", timestamp: "2026-08-01" },
      7: { githubUrl: "https://github.com/priya/abtalks/commit/7", linkedinUrl: "https://linkedin.com/posts/priya-7", timestamp: "2026-08-02" },
      8: { githubUrl: "https://github.com/priya/abtalks/commit/8", linkedinUrl: "https://linkedin.com/posts/priya-8", timestamp: "2026-08-03" },
      11: { githubUrl: "https://github.com/priya/abtalks/commit/11", linkedinUrl: "https://linkedin.com/posts/priya-11", timestamp: "2026-08-06" },
    },
  },
  "empty-profile": {
    id: "empty-profile",
    name: "Guest Student",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    college: "Unregistered Student",
    track: "",
    currentDay: 1,
    currentStreak: 0,
    bestStreak: 0,
    totalSynergy: 0,
    shieldCount: 0,
    completedDays: [],
    missedDays: [],
    unlockedBadges: [],
    submissions: {},
  },
};
