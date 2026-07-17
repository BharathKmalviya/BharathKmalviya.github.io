'use client';

import {useRef, type ReactNode} from 'react';
import {motion, useScroll, useTransform} from 'framer-motion';
import {EmailIcon, GitHubIcon, LinkedInIcon, TwitterXIcon} from '@/components/icons/social-icons';

// Mirrors the light-mode --md-sys-color-primary / --md-sys-color-on-primary values
// generated in src/styles/md-color-tokens.css. Framer Motion's color interpolation
// needs literal color values, not CSS var() references, so these are duplicated here
// deliberately -- if the seed color or scheme variant ever changes, regenerate the
// tokens (pnpm run generate:theme) and update these two constants to match.
const HERO_START_BG = '#ffffff';
const HERO_END_BG = '#006d3b'; // --md-sys-color-primary
const HERO_START_TEXT = '#000000';
const HERO_END_TEXT = '#ffffff'; // --md-sys-color-on-primary

const ARC_TRANSITION = {duration: 0.7, ease: [0.16, 1, 0.3, 1] as const};

function ArcReveal({children, delay = 0}: {children: ReactNode; delay?: number}) {
  return (
    <motion.div
      initial={{opacity: 0, y: 72, rotate: -3}}
      whileInView={{opacity: 1, y: 0, rotate: 0}}
      viewport={{once: true, margin: '-15% 0px -15% 0px'}}
      transition={{...ARC_TRANSITION, delay}}>
      {children}
    </motion.div>
  );
}

const SOCIAL_LINKS = [
  {href: 'https://linkedin.com/in/bharath-k-malviya', label: 'LinkedIn', Icon: LinkedInIcon},
  {href: 'https://github.com/BharathKmalviya', label: 'GitHub', Icon: GitHubIcon},
  {href: 'https://x.com/BharathKmalviya', label: 'Twitter/X', Icon: TwitterXIcon},
  {href: 'mailto:Bharathkmalviya@gmail.com', label: 'Email', Icon: EmailIcon},
];

export function PortfolioPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const {scrollYProgress} = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroBackground = useTransform(scrollYProgress, [0, 1], [HERO_START_BG, HERO_END_BG]);
  const heroTextColor = useTransform(scrollYProgress, [0, 1], [HERO_START_TEXT, HERO_END_TEXT]);
  const heroChipOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <main>
      <motion.section
        ref={heroRef}
        style={{backgroundColor: heroBackground, color: heroTextColor}}
        className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <motion.span style={{opacity: heroChipOpacity}} className="text-sm font-medium tracking-widest uppercase">
          Android Engineer
        </motion.span>
        <h1 className="text-5xl font-bold sm:text-7xl">Bharath K Malviya</h1>
        <motion.span style={{opacity: heroChipOpacity}} className="text-base sm:text-lg">
          Mumbai, India
        </motion.span>
      </motion.section>

      <section
        className="flex flex-col gap-24 px-6 py-24 sm:px-12"
        style={{backgroundColor: 'var(--md-sys-color-primary)', color: 'var(--md-sys-color-on-primary)'}}>
        <ArcReveal>
          <div className="mx-auto max-w-2xl">
            <p className="mb-2 font-mono text-sm opacity-80">// about_me</p>
            <h2 className="mb-6 text-3xl font-bold sm:text-4xl">About Me</h2>
            <div
              className="rounded-3xl p-8"
              style={{
                backgroundColor: 'var(--md-sys-color-primary-container)',
                color: 'var(--md-sys-color-on-primary-container)',
              }}>
              <p className="text-lg leading-relaxed">
                Results-driven Android Engineer with 6 years of experience in designing, developing,
                and optimizing mobile applications. Proficient in Java, Kotlin, and Android SDK, with
                expertise in MVVM architecture, Dependency Injection (Dagger Hilt), Jetpack
                Components, and Firebase.
              </p>
            </div>
          </div>
        </ArcReveal>

        <ArcReveal delay={0.1}>
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <p className="mb-2 font-mono text-sm opacity-80">// connect</p>
            <h2 className="mb-8 text-3xl font-bold sm:text-4xl">Let&apos;s Connect</h2>
            <div className="flex gap-6">
              {SOCIAL_LINKS.map(({href, label, Icon}) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="flex h-14 w-14 items-center justify-center rounded-full border transition-opacity hover:opacity-70"
                  style={{
                    borderColor: 'var(--md-sys-color-on-primary)',
                    color: 'var(--md-sys-color-on-primary)',
                  }}>
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </ArcReveal>
      </section>
    </main>
  );
}
