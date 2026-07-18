'use client';

import {motion} from 'framer-motion';
import {useSafeReducedMotion} from '@/lib/use-safe-reduced-motion';
import {portfolio} from '@/data/portfolio';

export function EducationSection() {
  const reduceMotion = useSafeReducedMotion();

  return (
    <section id="education" className="section-frame" aria-labelledby="education-heading">
      <p className="section-kicker">{'// education'}</p>
      <h2 id="education-heading" className="section-title">
        {portfolio.educationTitle}
      </h2>
      <ul className="flex flex-col gap-5">
        {portfolio.education.map((item, index) => (
          <motion.li
            key={item.id}
            className="rounded-2xl border border-[var(--terminal-border)] bg-[color-mix(in_srgb,var(--terminal-surface)_88%,transparent)] px-5 py-5 backdrop-blur-sm sm:px-6"
            initial={reduceMotion ? false : {opacity: 0, y: 16}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{delay: reduceMotion ? 0 : index * 0.06}}>
            <h3 className="text-[1.05rem] font-semibold text-[var(--text)]">{item.school}</h3>
            <p className="mt-2 text-[0.9rem] text-[var(--terminal-neon)]">
              {item.degree}
              <span className="text-[var(--text-muted)]"> · {item.field}</span>
            </p>
            <p className="mt-2 text-[0.75rem] tracking-wide text-[var(--text-muted)]">
              {item.start} — {item.end}
            </p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
