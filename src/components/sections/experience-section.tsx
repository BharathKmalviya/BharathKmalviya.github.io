'use client';

import {motion} from 'framer-motion';
import {useSafeReducedMotion} from '@/lib/use-safe-reduced-motion';
import {portfolio} from '@/data/portfolio';

export function ExperienceSection() {
  const reduceMotion = useSafeReducedMotion();

  return (
    <section id="experience" className="section-frame section-frame--wide" aria-labelledby="experience-heading">
      <p className="section-path">~/experience</p>
      <h2 id="experience-heading" className="section-title">
        {portfolio.experienceTitle}
      </h2>
      {/* Spacing lives as padding inside each entry, never as a flex `gap`, so
          consecutive entries stay flush and nothing can break between them. */}
      <ol className="mt-2 flex flex-col">
        {portfolio.experience.map((job, index) => (
          <motion.li
            key={job.id}
            className="pb-8 last:pb-0"
            initial={reduceMotion ? false : {opacity: 0, y: 24}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-8% 0px'}}
            transition={{type: 'spring', stiffness: 170, damping: 24, delay: reduceMotion ? 0 : index * 0.05}}>
            <div className="terminal-panel">
              <div className="flex items-center gap-2 border-b border-[var(--terminal-border)] px-5 py-3.5">
                <span className="size-2.5 shrink-0 rounded-full bg-[#ff5f56]" aria-hidden="true" />
                <span className="size-2.5 shrink-0 rounded-full bg-[#ffbd2e]" aria-hidden="true" />
                <span className="size-2.5 shrink-0 rounded-full bg-[#27c93f]" aria-hidden="true" />
                <span className="ml-2 truncate text-[0.7rem] text-[var(--text-muted)]">{job.logFile}</span>
                {index === 0 ? (
                  <span className="ml-auto text-[0.65rem] tracking-wider text-[var(--terminal-neon-dim)] uppercase">
                    current
                  </span>
                ) : null}
              </div>

              <div className="px-5 py-6 sm:px-7 sm:py-7">
                <div className="mb-5 flex items-center gap-3.5">
                  <span className="company-mark" aria-hidden="true">
                    {job.initials}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-[var(--text)]">{job.company}</h3>
                    <p className="mt-0.5 text-[0.75rem] text-[var(--text-muted)]">
                      {job.location}
                      {job.employmentType ? ` · ${job.employmentType}` : ''}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  {job.roles.map((role) => (
                    <div key={`${job.id}-${role.title}-${role.start}`}>
                      <div className="mb-2.5 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                        <h4 className="text-[0.95rem] font-medium text-[var(--terminal-neon)]">{role.title}</h4>
                        <p className="shrink-0 text-[0.75rem] tracking-wide text-[var(--text-muted)]">
                          {role.start} — {role.end}
                        </p>
                      </div>
                      <ul className="flex flex-col gap-2">
                        {role.bullets.map((bullet, bulletIndex) => (
                          <motion.li
                            key={bullet.slice(0, 48)}
                            className="font-sans-body text-[0.9rem] leading-relaxed text-[var(--text-muted)] before:mr-2 before:font-mono before:text-[var(--terminal-neon-dim)] before:content-['›']"
                            initial={reduceMotion ? false : {opacity: 0, x: -10}}
                            whileInView={{opacity: 1, x: 0}}
                            viewport={{once: true, margin: '-5% 0px'}}
                            transition={{delay: reduceMotion ? 0 : bulletIndex * 0.05}}>
                            {bullet}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
