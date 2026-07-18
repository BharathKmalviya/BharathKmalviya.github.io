'use client';

import {portfolio} from '@/data/portfolio';

export function AboutSection() {
  return (
    <section id="about" className="section-frame" aria-labelledby="about-heading">
      <p className="section-kicker">{'// about'}</p>
      <h2 id="about-heading" className="section-title">
        {portfolio.aboutTitle}
      </h2>
      <div className="relative">
        <div
          className="pointer-events-none absolute -left-4 top-0 hidden h-full w-px bg-gradient-to-b from-[var(--terminal-neon)] via-[var(--terminal-border)] to-transparent sm:block"
          aria-hidden="true"
        />
        <div className="space-y-5 sm:pl-4">
          {portfolio.about.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="section-lede text-[1.125rem] leading-[1.85]">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
