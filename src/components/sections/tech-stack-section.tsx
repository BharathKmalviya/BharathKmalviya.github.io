'use client';

import {motion, useReducedMotion} from 'framer-motion';
import {portfolio} from '@/data/portfolio';

export function TechStackSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="tech" className="section-frame section-frame--wide" aria-labelledby="tech-heading">
      <p className="section-kicker">{'// stack'}</p>
      <h2 id="tech-heading" className="section-title">
        {portfolio.techTitle}
      </h2>
      <p className="section-lede mb-10">{portfolio.techLede}</p>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {portfolio.tech.map((item, index) => (
          <motion.li
            key={item.id}
            className="tech-card"
            initial={reduceMotion ? false : {opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-8% 0px'}}
            transition={{type: 'spring', stiffness: 180, damping: 22, delay: reduceMotion ? 0 : index * 0.06}}>
            <span
              className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--terminal-neon)_12%,transparent)] text-[0.75rem] font-semibold tracking-wider text-[var(--terminal-neon)] shadow-[0_0_20px_color-mix(in_srgb,var(--terminal-neon)_18%,transparent)]"
              aria-hidden="true">
              {item.tag}
            </span>
            <span className="text-[0.9375rem] tracking-wide text-[var(--text)]">{item.label}</span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
