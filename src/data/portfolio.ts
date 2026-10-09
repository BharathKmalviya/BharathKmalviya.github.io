export type SkillGroup = {
  id: string;
  title: string;
  blurb: string;
  chips: string[];
};

export type StatItem = {id: string; value: string; label: string};

export type ProjectItem = {
  id: string;
  title: string;
  category: string;
  summary: string;
  contribution: string;
  detail: string;
  tags: string[];
};

export type ExperienceItem = {
  id: string;
  company: string;
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
      'Android developer in Mumbai. Built seven apps at MagicDecor, a wallpaper room preview, and receipt-printing software deployed in 600+ restaurants.',
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
  heroIntro:
    'I build Android apps for field sales, restaurant billing, and everyday communication.',
  heroContext:
    'My work includes offline quoting for sales teams, receipt printers at billing counters, and wallpaper previews in a customer’s room. I handle the Android architecture, implementation, and releases.',
  stats: [
    {id: 'years', value: '6+', label: 'years working on Android'},
    {id: 'apps', value: '7', label: 'production apps at MagicDecor'},
    {id: 'restaurants', value: '600+', label: 'restaurants using the receipt system'},
  ] satisfies StatItem[],
  workTitle: 'Selected work',
  workLede: 'Android products I’ve worked on, and the part I played in each.',
  projects: [
    {
      id: 'magicdecor-sales',
      title: 'MagicDecor Field Suite',
      category: 'Field sales & installation',
      summary:
        'Seven Android apps for field sales, installation teams, partners, and the design catalogue.',
      contribution:
        'Built the apps from scratch as the sole Android developer, including architecture, UI, and releases.',
      detail:
        'Sales reps can quote and configure products without a connection. Their work syncs when they’re back online.',
      tags: ['Kotlin', 'Jetpack Compose', 'Offline-first'],
    },
    {
      id: 'ai-preview',
      title: 'Wallpaper Room Preview',
      category: 'Product visualization',
      summary: 'A feature that shows customers their chosen wallpaper in a photo of their own room.',
      contribution: 'Shipped the Android integration for generating previews from customer product configurations.',
      detail: 'The preview gives customers a way to see the design in their space before choosing it.',
      tags: ['Android', 'AI integration'],
    },
    {
      id: 'restaurant-receipts',
      title: 'Restaurant Receipt Printing',
      category: 'Billing & hardware',
      summary: 'Billing and receipt-printing software deployed in more than 600 restaurants.',
      contribution: 'Designed and shipped the Android receipt-printing system at GTS Infosoft.',
      detail: 'Connected the billing workflow to receipt printers for staff working at the counter.',
      tags: ['Kotlin', 'Firebase', 'Hardware printing'],
    },
    {
      id: 'realtime-chat',
      title: 'Chat & Video Calling',
      category: 'Communication',
      summary: 'Messaging and video-calling features used by thousands of users.',
      contribution: 'Built real-time communication and media features for Android apps at GTS Infosoft.',
      detail: 'Used Firebase to sync conversations across devices, with voice, video, and media streaming.',
      tags: ['Kotlin', 'Firebase', 'Real-time'],
    },
  ] satisfies ProjectItem[],
  experienceTitle: 'Where I’ve worked',
  aboutTitle: 'A little background',
  about: [
    'I started working on Android in 2019, building client apps in Java at Suncity Techno in Jodhpur. At GTS Infosoft I moved into Kotlin, offline data sync, receipt printing, and real-time communication.',
    'I’m now based in Mumbai and work on Android at MagicDecor. I work with web and backend developers on features that span our apps, and handle the Android architecture, implementation, and releases.',
  ],
  educationTitle: 'Education',
  techTitle: 'How I work',
  techLede: 'The tools and decisions behind the projects above.',
  skillGroups: [
    {
      id: 'build',
      title: 'Android UI',
      blurb: 'I build screens with Kotlin and Jetpack Compose, and maintain existing Java apps. The Field Suite covers sales, installation, partner, and catalogue workflows.',
      chips: ['Kotlin', 'Java', 'Jetpack Compose', 'Android SDK'],
    },
    {
      id: 'architect',
      title: 'App architecture',
      blurb: 'I use MVVM, Clean Architecture, and dependency injection to organize UI, data, and business logic across the apps I maintain.',
      chips: ['MVVM', 'Clean Architecture', 'Dagger Hilt'],
    },
    {
      id: 'sync',
      title: 'Offline data & sync',
      blurb: 'Field sales work needs to continue without a network. I store data locally and reconcile it when connectivity returns, using coroutines and Flow for background work.',
      chips: ['Room', 'Coroutines & Flow', 'Offline-first', 'Firebase'],
    },
    {
      id: 'ship',
      title: 'Releases & maintenance',
      blurb: 'I handle Android work through to Play Store release and maintain it afterwards. At GTS Infosoft, that meant working across several client apps alongside receipt printing and communication features.',
      chips: ['Git', 'Play Store releases', 'Real-time systems', 'Media streaming'],
    },
  ] satisfies SkillGroup[],
  contactTitle: 'Get in touch',
  contactLede: 'For Android roles, project enquiries, or a conversation about the work here, email me.',
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
      location: 'Mumbai, Maharashtra, India',
      employmentType: 'Full-time',
      roles: [
        {
          title: 'Senior Android Developer',
          start: 'Mar 2025',
          end: 'Present',
          bullets: [
            'Built seven production Android apps for field sales, installers, partners, and the design catalogue.',
            'Own Android architecture, implementation, and releases, working with web and backend teams on shared features.',
            'Shipped the wallpaper room-preview feature on Android.',
          ],
        },
      ],
    },
    {
      id: 'gts',
      company: 'GTS Infosoft',
      location: 'Greater Jodhpur Area',
      employmentType: 'Full-time',
      roles: [
        {
          title: 'Senior Android Developer',
          start: 'Mar 2022',
          end: 'Oct 2024',
          bullets: [
            'Designed and shipped a receipt-printing system deployed in 600+ restaurants.',
            'Built real-time chat and video calling used by thousands of users.',
            'Reworked database layers and managed multiple client apps through to store release.',
          ],
        },
        {
          title: 'Android Developer',
          start: 'Jan 2020',
          end: 'Feb 2022',
          bullets: [
            'Built offline data sync, media streaming, and real-time communication features.',
            'Migrated asynchronous code to Kotlin coroutines.',
          ],
        },
      ],
    },
    {
      id: 'suncity',
      company: 'Suncity Techno Pvt. Ltd.',
      location: 'Jodhpur, Rajasthan, India',
      employmentType: 'Full-time',
      roles: [
        {
          title: 'Android Developer',
          start: 'Oct 2019',
          end: 'Jan 2020',
          bullets: ['Built and maintained two client apps in Java, including UI, lifecycle handling, and API integrations.'],
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
};
