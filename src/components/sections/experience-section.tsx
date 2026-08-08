'use client';

import {motion} from 'framer-motion';
import {useSafeReducedMotion} from '@/lib/use-safe-reduced-motion';
import {portfolio} from '@/data/portfolio';

export function ExperienceSection() {
  const reduceMotion = useSafeReducedMotion();

  return (
    <section id="experience" className="section-frame section-frame--wide" aria-labelledby="experience-heading">
      <p className="section-kicker">{'// experience'}</p>
      <h2 id="experience-heading" className="section-title">
        {portfolio.experienceTitle}
      </h2>
      <ol className="mt-2 flex flex-col">
        {portfolio.experience.map((job, index) => (
          <motion.li
            key={job.id}
            className="relative border-l border-[var(--terminal-border)] pb-10 pl-6 last:pb-0"
            initial={reduceMotion ? false : {opacity: 0, x: -12}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true, margin: '-8% 0px'}}
            transition={{delay: reduceMotion ? 0 : index * 0.05}}>
            <span
              className="absolute top-1.5 -left-[5px] size-2.5 rounded-full bg-[var(--terminal-neon)] shadow-[0_0_12px_var(--terminal-neon)]"
              aria-hidden="true"
            />
            <div className="mb-4">
              <h3 className="text-lg font-semibold tracking-tight text-[var(--text)]">{job.company}</h3>
              <p className="mt-1 text-[0.8rem] text-[var(--text-muted)]">
                {job.location}
                {job.employmentType ? ` · ${job.employmentType}` : ''}
              </p>
            </div>
            <div className="flex flex-col gap-6">
              {job.roles.map((role) => (
                <div key={`${job.id}-${role.title}-${role.start}`}>
                  <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <h4 className="text-[0.95rem] font-medium text-[var(--terminal-neon)]">{role.title}</h4>
                    <p className="shrink-0 text-[0.75rem] tracking-wide text-[var(--text-muted)]">
                      {role.start} — {role.end}
                    </p>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {role.bullets.map((bullet) => (
                      <li
                        key={bullet.slice(0, 48)}
                        className="text-[0.9rem] leading-relaxed text-[var(--text-muted)] before:mr-2 before:text-[var(--terminal-neon-dim)] before:content-['›']">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
