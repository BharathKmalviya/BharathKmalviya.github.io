'use client';

import {motion} from 'framer-motion';
import {useSafeReducedMotion} from '@/lib/use-safe-reduced-motion';
import {portfolio} from '@/data/portfolio';

export function AboutSection() {
  const reduceMotion = useSafeReducedMotion();

  return (
    <section id="about" className="section-frame section-frame--wide" aria-labelledby="about-heading">
      <p className="section-path">~/about</p>
      <h2 id="about-heading" className="section-title">
        {portfolio.aboutTitle}
      </h2>

      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-start">
        <div className="relative">
          <div
            className="pointer-events-none absolute -left-4 top-0 hidden h-full w-px bg-gradient-to-b from-[var(--terminal-neon)] via-[var(--terminal-border)] to-transparent sm:block"
            aria-hidden="true"
          />
          <div className="space-y-5 sm:pl-4">
            {portfolio.about.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="font-sans-body text-[1.05rem] leading-[1.8] text-[var(--text-muted)]">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <motion.aside
          className="terminal-panel lg:sticky lg:top-24"
          aria-label="Current status and education"
          initial={reduceMotion ? false : {opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, margin: '-8% 0px'}}
          transition={{type: 'spring', stiffness: 170, damping: 24}}>
          <div className="flex items-center gap-2 border-b border-[var(--terminal-border)] px-5 py-3.5">
            <span className="size-2.5 shrink-0 rounded-full bg-[#ff5f56]" aria-hidden="true" />
            <span className="size-2.5 shrink-0 rounded-full bg-[#ffbd2e]" aria-hidden="true" />
            <span className="size-2.5 shrink-0 rounded-full bg-[#27c93f]" aria-hidden="true" />
            <span className="ml-2 text-[0.7rem] text-[var(--text-muted)]">{portfolio.currently.file}</span>
          </div>
          <div className="px-5 py-6 text-[0.8125rem] leading-loose sm:px-6">
            <p className="mb-4 text-[var(--terminal-neon)]">
              <span className="text-[var(--text-muted)]">$</span> cat {portfolio.currently.file}
            </p>
            <dl>
              {portfolio.currently.lines.map((line) => (
                <div key={line.key} className="flex gap-3">
                  <dt className="w-[5.5rem] shrink-0 text-[var(--terminal-neon-dim)]">{line.key}:</dt>
                  <dd className="text-[var(--text)]">{line.value}</dd>
                </div>
              ))}
              <div className="flex gap-3">
                <dt className="w-[5.5rem] shrink-0 text-[var(--terminal-neon-dim)]">education:</dt>
                <dd className="text-[var(--text)]">
                  {portfolio.education.map((edu) => (
                    <span key={edu.id} className="block">
                      {edu.degree.match(/\(([^)]+)\)/)?.[1] ?? edu.degree} · {edu.school}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
