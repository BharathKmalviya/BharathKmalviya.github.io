'use client';

import type {ReactNode} from 'react';
import {motion} from 'framer-motion';
import {EmailIcon, GitHubIcon, LinkedInIcon, TwitterXIcon} from '@/components/icons/social-icons';

const REVEAL_SPRING = {type: 'spring' as const, stiffness: 220, damping: 24, mass: 0.9};

function ArcReveal({children, delay = 0}: {children: ReactNode; delay?: number}) {
  return (
    <motion.div
      initial={{opacity: 0, y: 64, scale: 0.94}}
      whileInView={{opacity: 1, y: 0, scale: 1}}
      viewport={{once: true, margin: '-10% 0px -10% 0px'}}
      transition={{...REVEAL_SPRING, delay}}>
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

// Full-width elliptical arch, not just rounded corners: a 50% horizontal
// radius on both top corners makes them meet at the center, so the curve
// spans the entire top edge as one continuous arc instead of leaving a
// flat segment between two rounded corners. The vertical radius (the
// value after the "/") controls how tall/pronounced the arch is.
const ARCH_RADIUS = '50% 50% 0 0 / 4.5rem 4.5rem 0 0';

export function PortfolioPage() {
  return (
    <main>
      {/* Normal document flow -- the whole page scrolls together as one
          continuous page. The hero scrolls away naturally; only the arch
          panel below gets its own slide-up-into-place entrance animation
          as it scrolls into view. */}
      <section className="flex h-screen flex-col items-center justify-center gap-4 bg-white px-6 text-center text-black">
        <span className="text-sm font-medium tracking-widest text-black/70 uppercase">Android Engineer</span>
        <h1 className="text-5xl font-bold sm:text-7xl">Bharath K Malviya</h1>
        <span className="text-base text-black/70 sm:text-lg">Mumbai, India</span>
      </section>

      <motion.section
        initial={{y: 160, opacity: 0}}
        whileInView={{y: 0, opacity: 1}}
        viewport={{once: true, amount: 0.15}}
        transition={{type: 'spring', stiffness: 90, damping: 20, mass: 1}}
        className="relative z-10 flex flex-col gap-24 px-6 py-24 sm:px-12 sm:py-32"
        style={{
          backgroundColor: 'var(--md-sys-color-primary)',
          color: 'var(--md-sys-color-on-primary)',
          borderRadius: ARCH_RADIUS,
        }}>
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
              {SOCIAL_LINKS.map(({href, label, Icon}, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  initial={{opacity: 0, y: 24, scale: 0.8}}
                  whileInView={{opacity: 1, y: 0, scale: 1}}
                  viewport={{once: true, margin: '-10% 0px -10% 0px'}}
                  transition={{...REVEAL_SPRING, delay: 0.2 + i * 0.08}}
                  whileHover={{scale: 1.1}}
                  className="flex h-14 w-14 items-center justify-center rounded-full border"
                  style={{
                    borderColor: 'var(--md-sys-color-on-primary)',
                    color: 'var(--md-sys-color-on-primary)',
                  }}>
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>
        </ArcReveal>
      </motion.section>
    </main>
  );
}
