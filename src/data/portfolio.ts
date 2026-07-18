export type TechItem = {id: string; label: string; tag: string};

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
  seo: {
    title: 'Bharath Malviya | Senior Android Developer @ MagicDecor',
    description:
      'Senior Android Developer at MagicDecor (Mumbai). 6+ years shipping Kotlin & Jetpack Compose apps with MVVM, Clean Architecture, Coroutines, Flow, Hilt, Room, Firebase, REST APIs, and offline-first design.',
    keywords: [
      'Senior Android Developer',
      'Android Engineer Mumbai',
      'Kotlin Android developer',
      'Jetpack Compose developer',
      'Clean Architecture Android',
      'MVVM Android',
      'MVI',
      'Dagger Hilt',
      'Dependency Injection Android',
      'Kotlin Coroutines',
      'Kotlin Flow',
      'StateFlow SharedFlow',
      'Room Database',
      'SQLite Android',
      'Firebase Realtime Database',
      'Firebase Cloud Messaging',
      'Android SDK',
      'Material Design Android',
      'Jetpack libraries',
      'ViewModel LiveData',
      'WorkManager',
      'Retrofit OkHttp',
      'REST API Android',
      'CI/CD Android',
      'offline-first Android',
      'real-time chat Android',
      'performance optimization Android',
      'MagicDecor Android',
      'Bharath Malviya',
      'Bharath K Malviya',
    ],
  },
  aboutTitle: 'About',
  about: [
    'I build Android applications that solve real business problems while delivering a smooth, reliable user experience.',
    'With 6+ years of experience in Android development, I specialize in Kotlin, Java, Android SDK, Jetpack Compose, MVVM, Clean Architecture, Kotlin Coroutines, Flow, Room, and Dagger Hilt. I have built and maintained products ranging from field sales and enterprise applications to real-time chat, video calling, financial platforms, and offline-first solutions that remain dependable even in unreliable network conditions.',
    'At MagicDecor, I lead Android development across multiple business-critical applications for field sales, installers, partners, and design catalogues. I also developed an AI-powered design preview feature that generates instant product visualizations from customer configurations, helping sales teams deliver a better buying experience.',
    'I believe in writing clean, maintainable, and scalable code with a strong focus on performance, architecture, and long-term product quality.',
  ],
  typewriterLines: [
    'I craft Android products that feel fast, native, and dependable.',
    'From offline-first systems to real-time experiences — shipped at scale.',
    'Currently leading Android engineering at MagicDecor.',
  ],
  heroPrompt: 'guest@portfolio:~$ cat intro.txt',
  experienceTitle: 'Experience',
  educationTitle: 'Education',
  techTitle: 'Skills',
  techLede:
    'Core Android stack from my day-to-day work — Kotlin-first, Compose UI, Clean Architecture, and production Firebase.',
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
      location: 'Mumbai, Maharashtra, India',
      employmentType: 'Full-time',
      roles: [
        {
          title: 'Senior Android Developer',
          start: 'Mar 2025',
          end: 'Present',
          bullets: [
            'Developing Android apps from scratch for field sales, installers, partners, and a design catalogue.',
            'Driving end-to-end app development while independently handling most of the Android responsibilities.',
            'Collaborating with web and backend teams for seamless integration.',
            'Ensuring products stay modern by adopting the latest tech and practices.',
            'Built an AI-powered design preview feature that generates instant product visualizations from customer configurations.',
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
            'Led the development of real-time applications leveraging Firebase for seamless data synchronization and performance.',
            'Designed and developed a receipt-printing application deployed in 600+ restaurants, streamlining billing operations.',
            'Optimized database architectures for scalability, security, and efficient data handling.',
            'Collaborated with UX designers and product teams to enhance user experience and ensure intuitive interfaces.',
            'Managed multiple projects simultaneously, ensuring timely delivery and high-quality standards.',
          ],
        },
        {
          title: 'Android Developer',
          start: 'Jan 2020',
          end: 'Feb 2022',
          bullets: [
            'Developed high-performance Android apps with a focus on UX.',
            'Implemented RxJava and Kotlin Coroutines for efficient async tasks.',
            'Built media streaming and real-time communication features.',
            'Designed offline-first architectures for data reliability.',
            'Optimized database structures for security and performance.',
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
          bullets: [
            'Developed and maintained two Android applications with robust performance and maintainability using Java and the Android SDK.',
            'Managed activity lifecycles, UI design, and API integrations, delivering responsive applications tailored to client requirements.',
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
