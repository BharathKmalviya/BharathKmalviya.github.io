'use client';

import {useEffect, useState} from 'react';
import {updateActiveSection} from '@/lib/section-scroll-spy';
import {portfolio} from '@/data/portfolio';

const SECTIONS = ['work', 'experience', 'about', 'tech', 'contact'] as const;

const NAV = [
  {href: '#work', id: 'work', label: 'Work'},
  {href: '#experience', id: 'experience', label: 'Experience'},
  {href: '#about', id: 'about', label: 'About'},
  {href: '#tech', id: 'tech', label: 'Skills'},
  {href: '#contact', id: 'contact', label: 'Contact'},
] as const;

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
      className="site-nav sticky top-0 z-30"
      aria-label="Primary">
      <div className="nav-inner">
        <a
          href="#top"
          className="nav-brand"
          onClick={() => setActive(null)}>
          <span className="brand-mark" aria-hidden="true">bm</span>
          {portfolio.name}
        </a>
        <ul className="no-scrollbar flex min-w-0 items-center gap-0.5 overflow-x-auto sm:gap-1">
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
