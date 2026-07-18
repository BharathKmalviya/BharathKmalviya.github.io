'use client';

import {useEffect, useState} from 'react';

const SECTIONS = ['about', 'experience', 'education', 'tech', 'contact'] as const;

const NAV = [
  {href: '#about', id: 'about', label: 'About'},
  {href: '#experience', id: 'experience', label: 'Experience'},
  {href: '#education', id: 'education', label: 'Education'},
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

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActive(visible[0].target.id);
        }
      },
      {rootMargin: '-35% 0px -45% 0px', threshold: [0.15, 0.4, 0.7]},
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="sticky top-0 z-30 border-b border-[var(--terminal-border)] bg-[color-mix(in_srgb,var(--terminal-bg)_72%,transparent)] backdrop-blur-xl"
      aria-label="Primary">
      <div className="mx-auto flex w-full max-w-[56rem] items-center justify-between gap-4 px-[var(--page-pad-x)] py-4">
        <a
          href="#top"
          className="shrink-0 text-[0.8125rem] tracking-wide text-[var(--terminal-neon)] transition-opacity hover:opacity-80"
          onClick={() => setActive(null)}>
          <span className="text-[var(--text-muted)]">~/</span>bharath
        </a>
        <ul className="flex items-center gap-0.5 overflow-x-auto sm:gap-1">
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
