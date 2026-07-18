'use client';

import {motion, useReducedMotion} from 'framer-motion';
import {Typewriter} from '@/components/ui/typewriter';
import {portfolio} from '@/data/portfolio';

const ease = {type: 'spring' as const, stiffness: 140, damping: 22};

export function HeroTerminal() {
  const reduceMotion = useReducedMotion();

  const item = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: {opacity: 0, y: 24},
          animate: {opacity: 1, y: 0},
          transition: {...ease, delay},
        };

  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100dvh-3.75rem)] flex-col justify-center px-[var(--page-pad-x)] py-20 sm:py-24"
      aria-label="Hero">
      <div className="mx-auto flex w-full max-w-[42rem] flex-col">
        <motion.p
          className="mb-5 text-[0.75rem] tracking-[0.16em] text-[var(--terminal-neon-dim)] uppercase"
          {...item(0)}>
          {portfolio.role} @ {portfolio.company} · {portfolio.location}
        </motion.p>

        <motion.h1
          className="mb-10 text-[clamp(2.75rem,8vw,4.75rem)] leading-[1.02] font-semibold tracking-[-0.04em] text-[var(--text)]"
          {...item(0.08)}>
          {portfolio.name.split(' ').map((word, i) => (
            <span key={word} className="inline-block">
              {i > 0 ? '\u00A0' : null}
              <motion.span
                className="inline-block"
                initial={reduceMotion ? false : {opacity: 0, y: 18}}
                animate={{opacity: 1, y: 0}}
                transition={{...ease, delay: 0.1 + i * 0.07}}>
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.div className="terminal-panel mb-12" aria-label="Terminal intro" {...item(0.2)}>
          <div className="flex items-center gap-2 border-b border-[var(--terminal-border)] px-5 py-3.5">
            <span className="size-2.5 shrink-0 rounded-full bg-[#ff5f56]/opacity-90" aria-hidden="true" />
            <span className="size-2.5 shrink-0 rounded-full bg-[#ffbd2e]/opacity-90" aria-hidden="true" />
            <span className="size-2.5 shrink-0 rounded-full bg-[#27c93f]/opacity-90" aria-hidden="true" />
            <span className="ml-2 text-[0.7rem] text-[var(--text-muted)]">intro.sh</span>
            <span className="ml-auto text-[0.65rem] tracking-wider text-[var(--terminal-neon-dim)] uppercase">
              live
            </span>
          </div>
          <div className="space-y-5 px-5 py-7 sm:px-8 sm:py-9">
            <p className="text-[0.8125rem] text-[var(--terminal-neon)]">{portfolio.heroPrompt}</p>
            <Typewriter lines={portfolio.typewriterLines} />
          </div>
        </motion.div>

        <motion.div className="flex flex-wrap items-center gap-4" {...item(0.32)}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'})}>
            About me
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}>
            Get in touch
          </button>
        </motion.div>
      </div>
    </section>
  );
}
