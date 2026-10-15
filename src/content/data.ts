// Edit this file to change the portfolio's content. Anything marked DUMMY is a placeholder.

export const profile = {
  name: "Aditya Pathak",
  role: "Software Engineer",
  company: "47Billion",
  since: "Jan 2023",
  stance: "I build software that holds up, and I write down why.",
  intro:
    "Engineers get judged on results, but trusted for their decisions. This notebook has both: what I built, and the trade-offs behind it.",
  about: [
    "I'm a software engineer at 47Billion, working there since January 2023. I like turning messy problems into small, dependable systems.",
    "I work on Obsidian, an edtech product, and I have a B.Tech in Information Technology from Medi-Caps University, Indore. Outside work I build side projects, contribute to open source, tinker with AI assistants, and play table tennis.",
  ],
  github: "https://github.com/aditya306b",
  linkedin: "https://www.linkedin.com/in/aditya306b",
  email: "aditya.pathak@47billion.com",
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  problem: string;
  constraints: string[];
  decisions: { chose: string; over: string; why: string }[];
  outcome: string;
  stack: string[];
  link?: string;
  shot?: { src: string; width: number; height: number; caption: string };
};

export const projects: Project[] = [
  {
    slug: "finance-tracker",
    title: "Finance Tracker",
    summary: "An offline Android app to track credits and expenses with a live balance.",
    problem: "Existing expense apps wanted sign-ups and sent data to a server. I wanted a fast, private tracker I fully control.",
    constraints: ["Works offline", "No backend, no account", "Add an entry in under 5 seconds"],
    decisions: [
      { chose: "Expo + React Native", over: "Native Kotlin", why: "One TypeScript codebase and quick APK builds." },
      { chose: "AsyncStorage", over: "SQLite", why: "The data is small; a simple key-value store is enough for v1." },
      { chose: "Credit/Expense toggle", over: "Separate screens", why: "Fewer taps; the balance card updates instantly." },
    ],
    outcome: "Two APK releases in two days: dark UI, income tracking, day-grouped transactions. A backend is the next step.",
    stack: ["Expo", "React Native", "TypeScript", "AsyncStorage"],
    shot: {
      src: "/shots/finance-home.png",
      width: 780,
      height: 1688,
      caption: "Home screen of the app (web build, sample data, not my real finances).",
    },
  },
  {
    slug: "perry-usage-command",
    title: "Perry: /usage command",
    summary: "Open-source contribution that shows how much of a chat's model plan is used and left.",
    problem: "Users of the Perry assistant could not see how much of their model plan remained before hitting a limit.",
    constraints: ["Fit the existing command system", "Work in both chat and web composer", "Date each reading by its own engine"],
    decisions: [
      { chose: "A /usage command", over: "A background banner", why: "On demand, no noise in the chat." },
      { chose: "Reading per engine", over: "One global number", why: "Plans differ per engine and reset at different times." },
    ],
    outcome: "Merged upstream as PR #273 on 9 Oct 2026.",
    stack: ["TypeScript", "Open source"],
    link: "https://github.com/TheM1N9/perry",
  },
  {
    slug: "online-voting-system",
    title: "Online Voting System",
    summary: "A web app for casting votes in college elections, built during my university projects.",
    problem: "College elections needed a way to cast votes online instead of on paper.",
    constraints: [],
    decisions: [],
    outcome: "Built and submitted as a university project at Medicaps University.",
    stack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
  },
  {
    slug: "link-shortener",
    title: "Link Shortener",
    summary: "A small web app that shortens long links.",
    problem: "Long links are hard to share.",
    constraints: [],
    decisions: [],
    outcome: "Live at shortnerurl.rf.gd; source on GitHub.",
    stack: ["Web"],
    link: "https://github.com/aditya306b/Link-Shortner",
  },
  {
    slug: "text-encrypter",
    title: "Text Encrypter",
    summary: "A small web app that encrypts text.",
    problem: "Plain text is readable by anyone who sees it.",
    constraints: [],
    decisions: [],
    outcome: "Live at textencrypt.rf.gd; source on GitHub.",
    stack: ["Web"],
    link: "https://github.com/aditya306b/Text-Encryper",
  },
];

export type Skill = { name: string; group: string };

export const skills: Skill[] = [
  { name: "TypeScript", group: "Languages" },
  { name: "JavaScript", group: "Languages" },
  { name: "Python", group: "Languages" },
  { name: "HTML/CSS", group: "Languages" },
  { name: "PHP", group: "Languages" },
  { name: "FastAPI", group: "Backend" },
  { name: "SocketIO", group: "Backend" },
  { name: "MySQL", group: "Backend" },
  { name: "OpenAI", group: "Tools" },
  { name: "React", group: "Frontend" },
  { name: "Next.js", group: "Frontend" },
  { name: "React Native", group: "Frontend" },
  { name: "Expo", group: "Frontend" },
  { name: "AsyncStorage", group: "Frontend" },
  { name: "Node.js", group: "Backend" },
  { name: "PostgreSQL", group: "Backend" },
  { name: "REST APIs", group: "Backend" },
  { name: "AWS", group: "Cloud" },
  { name: "Docker", group: "Cloud" },
  { name: "Git", group: "Tools" },
];

// Career as a git log. Newest first. Hashes are decorative.
export const journey = [
  { hash: "a3f9c21", date: "Oct 2026", message: "feat: portfolio, finance tracker and open-source PR merged into Perry", body: "Shipped side projects and a merged contribution (PR #273)." },
  { hash: "7be1d04", date: "Jan 2023", message: "feat: join 47Billion as software engineer", body: "Work on Obsidian, an edtech product. Python, FastAPI, SocketIO, Docker, GitHub and generative AI (ChatGPT/OpenAI)." },
  { hash: "0c5aa88", date: "Jun 2023", message: "chore: graduate B.Tech in Information Technology", body: "Medi-Caps University, Indore (Aug 2019 to Jun 2023), CGPA 8.45. Projects included an online voting system." },
];

export const achievements = [
  "Contributed the /usage command to the open-source Perry assistant (merged, Oct 2026).",
  "Graduated B.Tech in Information Technology from Medi-Caps University with a CGPA of 8.45.",
  "Software engineer on Obsidian, an edtech product at 47Billion, since January 2023.",
];

// Every decision from every project, flattened for the decision log and the terminal.
export const allDecisions = projects.flatMap((p) =>
  p.decisions.map((d) => ({ ...d, project: p.title, slug: p.slug })),
);
