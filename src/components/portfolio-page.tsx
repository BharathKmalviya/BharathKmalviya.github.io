'use client';

import type {ReactNode} from 'react';
import {motion, useReducedMotion} from 'framer-motion';
import {AboutSection} from '@/components/sections/about-section';
import {ContactSection} from '@/components/sections/contact-section';
import {EducationSection} from '@/components/sections/education-section';
import {ExperienceSection} from '@/components/sections/experience-section';
import {HeroTerminal} from '@/components/sections/hero-terminal';
import {TechStackSection} from '@/components/sections/tech-stack-section';
import {AmbientBackground} from '@/components/ui/ambient-background';
import {SiteNav} from '@/components/ui/site-nav';

const REVEAL = {type: 'spring' as const, stiffness: 160, damping: 24, mass: 0.85};

function SectionReveal({children, delay = 0}: {children: ReactNode; delay?: number}) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return <>{children}</>;
  }
  return (
    <motion.div
      initial={{opacity: 0, y: 36, filter: 'blur(6px)'}}
      whileInView={{opacity: 1, y: 0, filter: 'blur(0px)'}}
      viewport={{once: true, margin: '-10% 0px -10% 0px', amount: 0.2}}
      transition={{...REVEAL, delay}}>
      {children}
    </motion.div>
  );
}

export function PortfolioPage() {
  return (
    <main className="page-shell min-h-dvh text-[var(--text)]">
      <AmbientBackground />
      <div className="page-content">
        <SiteNav />
        <HeroTerminal />
        <SectionReveal>
          <AboutSection />
        </SectionReveal>
        <SectionReveal>
          <ExperienceSection />
        </SectionReveal>
        <SectionReveal>
          <EducationSection />
        </SectionReveal>
        <SectionReveal delay={0.04}>
          <TechStackSection />
        </SectionReveal>
        <SectionReveal delay={0.04}>
          <ContactSection />
        </SectionReveal>
      </div>
    </main>
  );
}
