export type Project = {
  id: string;
  title: string;
  blurb: string;
  filename: string;
  snippet: string;
  tags: string[];
  repoUrl?: string;
  storeUrl?: string;
  isPlaceholder: boolean;
};

export type BlogPost = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  href: string;
  isPlaceholder: boolean;
};

export type TechItem = {id: string; label: string; icon: string};

export const portfolio = {
  name: 'Bharath K Malviya',
  role: 'Android Engineer',
  location: 'Mumbai, India',
  email: 'Bharathkmalviya@gmail.com',
  githubUser: 'BharathKmalviya',
  about:
    'Results-driven Android Engineer with 6 years of experience in designing, developing, and optimizing mobile applications. Proficient in Java, Kotlin, and Android SDK, with expertise in MVVM architecture, Dependency Injection (Dagger Hilt), Jetpack Components, and Firebase.',
  typewriterLines: [
    'Bharath K Malviya',
    'Android Engineer · Mumbai',
    'Building apps that feel native.',
  ],
  socials: [
    {href: 'https://linkedin.com/in/bharath-k-malviya', label: 'LinkedIn'},
    {href: 'https://github.com/BharathKmalviya', label: 'GitHub'},
    {href: 'https://x.com/BharathKmalviya', label: 'Twitter/X'},
    {href: 'mailto:Bharathkmalviya@gmail.com', label: 'Email'},
  ],
  projects: [
    {
      id: 'p1',
      title: 'Compose Sample Vault',
      blurb: 'Placeholder — Jetpack Compose patterns and Material 3 demos.',
      filename: 'HomeScreen.kt',
      snippet: `@Composable\nfun HomeScreen() {\n  Scaffold { /* ... */ }\n}`,
      tags: ['Kotlin', 'Compose', 'M3'],
      repoUrl: 'https://github.com/BharathKmalviya',
      isPlaceholder: true,
    },
    {
      id: 'p2',
      title: 'Offline-first Notes',
      blurb: 'Placeholder — Room + WorkManager sync sketch.',
      filename: 'NotesRepository.kt',
      snippet: `class NotesRepository(\n  private val dao: NoteDao,\n) {\n  fun observe() = dao.observeAll()\n}`,
      tags: ['Room', 'Hilt', 'Kotlin'],
      repoUrl: 'https://github.com/BharathKmalviya',
      isPlaceholder: true,
    },
    {
      id: 'p3',
      title: 'Firebase Auth Gate',
      blurb: 'Placeholder — secure session bootstrap.',
      filename: 'AuthViewModel.kt',
      snippet: `class AuthViewModel @Inject constructor(\n  private val auth: FirebaseAuth,\n) : ViewModel()`,
      tags: ['Firebase', 'MVVM'],
      repoUrl: 'https://github.com/BharathKmalviya',
      isPlaceholder: true,
    },
  ] satisfies Project[],
  tech: [
    {id: 'kotlin', label: 'Kotlin', icon: 'code'},
    {id: 'compose', label: 'Jetpack Compose', icon: 'widgets'},
    {id: 'android', label: 'Android SDK', icon: 'android'},
    {id: 'firebase', label: 'Firebase', icon: 'local_fire_department'},
    {id: 'hilt', label: 'Hilt', icon: 'hub'},
    {id: 'room', label: 'Room', icon: 'storage'},
  ] satisfies TechItem[],
  blog: [
    {
      id: 'b1',
      title: 'Why Compose state is not just LiveData',
      date: '2026-06-01',
      excerpt: 'Placeholder post — thinking in snapshots and side effects.',
      href: '#',
      isPlaceholder: true,
    },
    {
      id: 'b2',
      title: 'Shipping Material You without losing brand green',
      date: '2026-05-12',
      excerpt: 'Placeholder — seed colors vs dynamic color.',
      href: '#',
      isPlaceholder: true,
    },
  ] satisfies BlogPost[],
};
