'use client';

import {useEffect, useState} from 'react';
import {motion, useScroll, useSpring} from 'framer-motion';
import {updateActiveSection} from '@/lib/section-scroll-spy';
import {useSafeReducedMotion} from '@/lib/use-safe-reduced-motion';
import {portfolio} from '@/data/portfolio';

const BRAND_SLUG = portfolio.name.toLowerCase().replace(/\s+/g, '-');

const SECTIONS = ['work', 'experience', 'about', 'tech', 'contact'] as const;

const NAV = [
  {href: '#work', id: 'work', label: 'Work'},
  {href: '#experience', id: 'experience', label: 'Experience'},
  {href: '#about', id: 'about', label: 'About'},
  {href: '#tech', id: 'tech', label: 'Skills'},
  {href: '#contact', id: 'contact', label: 'Contact'},
] as const;

function ScrollProgress() {
  const reduceMotion = useSafeReducedMotion();
  const {scrollYProgress} = useScroll();
  const scaleX = useSpring(scrollYProgress, {stiffness: 140, damping: 28, restDelta: 0.001});

  if (reduceMotion) return null;
  return <motion.div className="scroll-progress" style={{scaleX}} aria-hidden="true" />;
}

export function SiteNav() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const nodes = SECTIONS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!nodes.length) return;

    const overlapping = new Map<string, boolean>();

    const observer = new IntersectionObserver(
      (entries) => {
        const sectionEntries = entries.map((entry) => ({
          id: entry.target.id,
          isIntersecting: entry.isIntersecting,
        }));
        setActive(updateActiveSection(overlapping, sectionEntries, SECTIONS));
      },
      // A thin reference line ~35% down the viewport, not a tall band —
      // intersectionRatio is relative to each *target's own height*, so a
      // tall band compared against a fixed ratio threshold is unreliable
      // across sections of very different heights (see section-scroll-spy.ts).
      {rootMargin: '-35% 0px -64% 0px', threshold: 0},
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="sticky top-0 z-30 border-b border-[var(--terminal-border)] bg-[color-mix(in_srgb,var(--terminal-bg)_72%,transparent)] backdrop-blur-xl"
      aria-label="Primary">
      <ScrollProgress />
      <div className="mx-auto flex w-full max-w-[var(--content-wide)] items-center justify-between gap-4 px-[var(--page-pad-x)] py-4">
        <a
          href="#top"
          className="shrink-0 text-[0.8125rem] tracking-wide text-[var(--terminal-neon)] transition-opacity hover:opacity-80"
          onClick={() => setActive(null)}>
          <span className="text-[var(--text-muted)]">~/</span>
          {BRAND_SLUG}
        </a>
        <ul className="no-scrollbar flex items-center gap-0.5 overflow-x-auto sm:gap-1">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="nav-link whitespace-nowrap sm:text-[0.8125rem]"
                aria-current={active === item.id ? 'true' : undefined}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
