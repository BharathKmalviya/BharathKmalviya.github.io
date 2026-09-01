export type TechItem = {id: string; label: string; tag: string};

export type SkillGroup = {
  id: string;
  command: string;
  title: string;
  blurb: string;
  chips: string[];
};

export type StatItem = {id: string; value: string; label: string};

export type ProjectItem = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  bullets: string[];
  tags: string[];
  image: string;
  imageAlt: string;
  badge?: {label: string; tone: 'green' | 'amber'};
  featured?: boolean;
};

export type ExperienceItem = {
  id: string;
  company: string;
  logFile: string;
  initials: string;
  roles: {
    title: string;
    start: string;
    end: string;
    bullets: string[];
  }[];
  location: string;
  employmentType?: string;
};

export type EducationItem = {
  id: string;
  school: string;
  degree: string;
  field: string;
  start: string;
  end: string;
};

export const portfolio = {
  name: 'Bharath Malviya',
  role: 'Senior Android Developer',
  company: 'MagicDecor',
  location: 'Mumbai, Maharashtra, India',
  email: 'Bharathkmalviya@gmail.com',
  siteUrl: 'https://bharathmalviya.com',
  linkedIn: 'https://www.linkedin.com/in/bharath-k-malviya',
  githubUser: 'BharathKmalviya',
  repoUrl: 'https://github.com/BharathKmalviya/BharathKmalviya.github.io',
  seo: {
    title: 'Bharath Malviya | Senior Android Developer @ MagicDecor',
    description:
      'Senior Android Developer in Mumbai. 6+ years shipping apps people rely on daily — seven production apps at MagicDecor, an AI room preview, and a receipt system running in 600+ restaurants.',
    keywords: [
      'Bharath Malviya',
      'Senior Android Developer',
      'Android Developer Mumbai',
      'Kotlin',
      'Jetpack Compose',
      'offline-first Android',
      'MagicDecor Android',
    ],
  },
  aboutTitle: 'About',
  about: [
    'I build Android apps for people who don’t sit at desks — sales reps in the field, installers on site, cashiers at rush hour. If the app fails, their day stops. That constraint shapes everything I build.',
    'Over 6+ years I’ve shipped products used daily at real scale: a receipt system running in 600+ restaurants, real-time chat and video calling used by thousands, and apps that keep working with zero connectivity and sync when the network comes back.',
    'Right now I lead Android at MagicDecor, where I’ve built seven production apps from scratch and shipped an AI preview that shows customers their wallpaper in their own room in seconds.',
    'Away from the keyboard I’m usually exploring what’s new in mobile and AI — or hunting down Mumbai’s best street food.',
  ],
  typewriterLines: [
    'I craft Android products that feel fast, native, and dependable.',
    'From offline-first systems to real-time experiences — shipped at scale.',
    'Currently leading Android engineering at MagicDecor.',
  ],
  heroPrompt: 'guest@portfolio:~$ cat intro.txt',
  stats: [
    {id: 'years', value: '6+', label: 'years of Android'},
    {id: 'apps', value: '7', label: 'apps built at MagicDecor'},
    {id: 'restaurants', value: '600+', label: 'restaurants running my code'},
    {id: 'ai', value: 'AI', label: 'room preview in production'},
  ] satisfies StatItem[],
  currently: {
    file: 'status.yaml',
    lines: [
      {key: 'now', value: 'leading Android at MagicDecor'},
      {key: 'exploring', value: 'AI-powered mobile features'},
      {key: 'open_to', value: 'architecture deep-dives'},
      {key: 'base', value: 'Mumbai, India'},
    ],
  },
  workTitle: 'Featured Work',
  workLede:
    'A few things I’ve shipped that people use every day — in showrooms, restaurants, and pockets.',
  projects: [
    {
      id: 'magicdecor-sales',
      slug: 'magicdecor-suite',
      title: 'MagicDecor Field Suite',
      summary:
        'Seven Android apps that run MagicDecor’s on-the-ground business — from field sales and installation to partners and the design catalogue.',
      bullets: [
        'Used daily by field sales reps and installers across India.',
        'Offline-first: reps can quote and configure with no signal, and everything syncs when they’re back online.',
        'Built from scratch — architecture, UI, releases — as the sole Android owner.',
      ],
      tags: ['Kotlin', 'Jetpack Compose', 'Offline-first'],
      image: '/projects/magicdecor-suite.svg',
      imageAlt: 'Placeholder screenshot of the MagicDecor field sales app',
      badge: {label: 'live', tone: 'green'},
      featured: true,
    },
    {
      id: 'ai-preview',
      slug: 'ai-room-preview',
      title: 'AI Room Preview',
      summary: 'Customers see their chosen wallpaper in their own room — in seconds.',
      bullets: [
        'Generates product visualizations straight from customer configurations.',
        'Turned “imagine how it looks” into “here’s how it looks”, shortening the sales cycle.',
      ],
      tags: ['Android', 'AI integration'],
      image: '/projects/ai-preview.svg',
      imageAlt: 'Placeholder screenshot of the AI room preview feature',
      badge: {label: 'shipped', tone: 'amber'},
    },
    {
      id: 'restaurant-receipts',
      slug: 'receipt-printing',
      title: 'Restaurant Receipt Printing',
      summary: 'Billing and receipt printing deployed in 600+ restaurants.',
      bullets: [
        'Runs the billing counter at rush hour — printing has to work, every time.',
        'Scaled to 600+ locations while keeping billing operations simple for staff.',
      ],
      tags: ['Kotlin', 'Firebase', 'Hardware printing'],
      image: '/projects/receipt-printing.svg',
      imageAlt: 'Placeholder screenshot of the restaurant receipt printing app',
      badge: {label: '600+ deployments', tone: 'amber'},
    },
    {
      id: 'realtime-chat',
      slug: 'realtime-chat',
      title: 'Real-Time Chat & Video Calling',
      summary: 'Messaging and video calls built on Firebase, used by thousands.',
      bullets: [
        'Real-time sync keeps conversations instant across devices.',
        'Voice, video, and media streaming built into one experience.',
      ],
      tags: ['Kotlin', 'Firebase', 'Real-time'],
      image: '/projects/realtime-chat.svg',
      imageAlt: 'Placeholder screenshot of the real-time chat application',
      badge: {label: 'shipped', tone: 'green'},
    },
  ] satisfies ProjectItem[],
  experienceTitle: 'Experience',
  educationTitle: 'Education',
  techTitle: 'Skills',
  techLede:
    'Less a list of libraries, more what I actually do with them — grouped by the problems they solve.',
  skillGroups: [
    {
      id: 'build',
      command: 'build',
      title: 'Build',
      blurb: 'The day-to-day toolkit — Kotlin-first since 2019.',
      chips: ['Kotlin', 'Java', 'Jetpack Compose', 'Android SDK'],
    },
    {
      id: 'architect',
      command: 'architect',
      title: 'Architect',
      blurb: 'Structures that survive feature #40, not just feature #4.',
      chips: ['MVVM', 'Clean Architecture', 'Dagger Hilt'],
    },
    {
      id: 'sync',
      command: 'data --sync',
      title: 'Data & Sync',
      blurb: 'Apps that keep working when the network doesn’t.',
      chips: ['Room', 'Coroutines & Flow', 'Offline-first', 'Firebase'],
    },
    {
      id: 'ship',
      command: 'ship',
      title: 'Ship',
      blurb: 'From first commit to production, at 600+ sites if needed.',
      chips: ['Git', 'Play Store releases', 'Real-time systems', 'Media streaming'],
    },
  ] satisfies SkillGroup[],
  contactTitle: "Let's connect",
  contactLede:
    'Interested in Android engineering or mobile architecture? Reach out — happy to talk about product work and system design.',
  socials: [
    {href: 'https://www.linkedin.com/in/bharath-k-malviya', label: 'LinkedIn'},
    {href: 'https://github.com/BharathKmalviya', label: 'GitHub'},
    {href: 'https://x.com/BharathKmalviya', label: 'Twitter/X'},
    {href: 'mailto:Bharathkmalviya@gmail.com', label: 'Email'},
  ],
  experience: [
    {
      id: 'magicdecor',
      company: 'MagicDecor®',
      logFile: 'magicdecor.log',
      initials: 'MD',
      location: 'Mumbai, Maharashtra, India',
      employmentType: 'Full-time',
      roles: [
        {
          title: 'Senior Android Developer',
          start: 'Mar 2025',
          end: 'Present',
          bullets: [
            'Built 7 production Android apps from scratch — spanning field sales, installers, partners, and a design catalogue — used daily by teams across India.',
            'Own the Android stack end to end: architecture, implementation, and releases.',
            'Shipped an AI room preview that shows customers their wallpaper in their own space in seconds, taking guesswork out of the sales conversation.',
            'Work directly with web and backend teams so features land together, not in pieces.',
          ],
        },
      ],
    },
    {
      id: 'gts',
      company: 'GTS Infosoft',
      logFile: 'gts-infosoft.log',
      initials: 'GTS',
      location: 'Greater Jodhpur Area',
      employmentType: 'Full-time',
      roles: [
        {
          title: 'Senior Android Developer',
          start: 'Mar 2022',
          end: 'Oct 2024',
          bullets: [
            'Designed and shipped a receipt-printing system now running in 600+ restaurants, handling billing at rush-hour pace.',
            'Shipped real-time chat and video calling used by thousands of users.',
            'Reworked database layers for speed and reliability as products scaled.',
            'Kept multiple client projects moving at once, from first commit to store release.',
          ],
        },
        {
          title: 'Android Developer',
          start: 'Jan 2020',
          end: 'Feb 2022',
          bullets: [
            'Designed offline-first sync so users could keep working with zero connectivity, with data reconciling when the network returned.',
            'Built media streaming and real-time communication features into consumer apps.',
            'Modernized async code with Kotlin coroutines, making features faster to build and easier to debug.',
          ],
        },
      ],
    },
    {
      id: 'suncity',
      company: 'Suncity Techno Pvt. Ltd.',
      logFile: 'suncity-techno.log',
      initials: 'ST',
      location: 'Jodhpur, Rajasthan, India',
      employmentType: 'Full-time',
      roles: [
        {
          title: 'Android Developer',
          start: 'Oct 2019',
          end: 'Jan 2020',
          bullets: [
            'First Android role — built and maintained two client apps in Java, owning UI, lifecycle, and API integrations end to end.',
          ],
        },
      ],
    },
  ] satisfies ExperienceItem[],
  education: [
    {
      id: 'manipal',
      school: 'Manipal University Jaipur',
      degree: 'Master of Computer Applications (MCA)',
      field: 'Computer Science',
      start: 'Sep 2022',
      end: 'Apr 2024',
    },
    {
      id: 'davangere',
      school: 'Davangere University, Davangere',
      degree: 'Bachelor of Computer Applications (BCA)',
      field: 'Computer Science',
      start: '2016',
      end: '2019',
    },
  ] satisfies EducationItem[],
  tech: [
    {id: 'kotlin', label: 'Kotlin', tag: 'KT'},
    {id: 'java', label: 'Java', tag: 'JV'},
    {id: 'compose', label: 'Jetpack Compose', tag: 'UI'},
    {id: 'android', label: 'Android SDK', tag: 'AND'},
    {id: 'mvvm', label: 'MVVM', tag: 'ARCH'},
    {id: 'clean', label: 'Clean Architecture', tag: 'CA'},
    {id: 'hilt', label: 'Dagger Hilt', tag: 'DI'},
    {id: 'room', label: 'Room', tag: 'DB'},
    {id: 'coroutines', label: 'Coroutines & Flow', tag: 'ASYNC'},
    {id: 'firebase', label: 'Firebase', tag: 'FB'},
    {id: 'git', label: 'Git', tag: 'VCS'},
  ] satisfies TechItem[],
};
