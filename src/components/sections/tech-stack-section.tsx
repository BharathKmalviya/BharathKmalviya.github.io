'use client';

import {motion} from 'framer-motion';
import {useSafeReducedMotion} from '@/lib/use-safe-reduced-motion';
import {portfolio} from '@/data/portfolio';

export function TechStackSection() {
  const reduceMotion = useSafeReducedMotion();

  return (
    <section id="tech" className="section-frame section-frame--wide" aria-labelledby="tech-heading">
      <p className="section-path">~/skills</p>
      <h2 id="tech-heading" className="section-title">
        {portfolio.techTitle}
      </h2>
      <p className="section-lede font-sans-body mb-10">{portfolio.techLede}</p>

      <div className="terminal-panel">
        <div className="flex items-center gap-2 border-b border-[var(--terminal-border)] px-5 py-3.5">
          <span className="size-2.5 shrink-0 rounded-full bg-[#ff5f56]" aria-hidden="true" />
          <span className="size-2.5 shrink-0 rounded-full bg-[#ffbd2e]" aria-hidden="true" />
          <span className="size-2.5 shrink-0 rounded-full bg-[#27c93f]" aria-hidden="true" />
          <span className="ml-2 text-[0.7rem] text-[var(--text-muted)]">skills.sh</span>
        </div>

        <div className="px-5 py-6 sm:px-8 sm:py-8">
          <p className="mb-7 text-[0.8125rem] text-[var(--terminal-neon)]">
            <span className="text-[var(--text-muted)]">$</span> ./skills --list
          </p>

          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {portfolio.skillGroups.map((group, index) => (
              <motion.div
                key={group.id}
                initial={reduceMotion ? false : {opacity: 0, y: 16}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, margin: '-8% 0px'}}
                transition={{delay: reduceMotion ? 0 : index * 0.07}}>
                <h3 className="text-[0.8125rem] font-medium text-[var(--terminal-neon)]">
                  <span className="text-[var(--terminal-neon-dim)]">&gt; </span>
                  {group.title}
                </h3>
                <p className="font-sans-body mt-1.5 mb-3.5 text-[0.85rem] leading-relaxed text-[var(--text-muted)]">
                  {group.blurb}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {group.chips.map((chip) => (
                    <li key={chip} className="skill-chip">
                      {chip}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
