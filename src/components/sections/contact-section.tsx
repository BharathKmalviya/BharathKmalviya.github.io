'use client';

import {motion, useReducedMotion} from 'framer-motion';
import {CopyEmailButton} from '@/components/ui/copy-email-button';
import {EmailIcon, GitHubIcon, LinkedInIcon, TwitterXIcon} from '@/components/icons/social-icons';
import {portfolio} from '@/data/portfolio';

const ICON_BY_LABEL = {
  LinkedIn: LinkedInIcon,
  GitHub: GitHubIcon,
  'Twitter/X': TwitterXIcon,
  Email: EmailIcon,
} as const;

export function ContactSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="contact" className="section-frame pb-[clamp(6rem,16vw,10rem)]" aria-labelledby="contact-heading">
      <p className="section-kicker">{'// contact'}</p>
      <h2 id="contact-heading" className="section-title">
        {portfolio.contactTitle}
      </h2>
      <p className="section-lede mb-10">{portfolio.contactLede}</p>

      <motion.div
        className="terminal-panel mb-12 px-6 py-8 sm:px-8 sm:py-10"
        initial={reduceMotion ? false : {opacity: 0, scale: 0.98}}
        whileInView={{opacity: 1, scale: 1}}
        viewport={{once: true}}
        transition={{type: 'spring', stiffness: 160, damping: 22}}>
        <p className="mb-3 text-[0.75rem] tracking-[0.12em] text-[var(--terminal-neon-dim)] uppercase">
          Email
        </p>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <a
            id="contact-email"
            href={`mailto:${portfolio.email}`}
            tabIndex={0}
            className="text-[clamp(1rem,2.5vw,1.25rem)] break-all text-[var(--terminal-neon)] outline-none transition-opacity hover:opacity-85 focus-visible:ring-2 focus-visible:ring-[var(--terminal-neon)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--terminal-surface)]">
            {portfolio.email}
          </a>
          <CopyEmailButton email={portfolio.email} />
        </div>
      </motion.div>

      <div>
        <p className="mb-4 text-[0.75rem] tracking-[0.12em] text-[var(--terminal-neon-dim)] uppercase">
          Elsewhere
        </p>
        <ul className="flex flex-wrap gap-3">
          {portfolio.socials.map(({href, label}, index) => {
            const Icon = ICON_BY_LABEL[label as keyof typeof ICON_BY_LABEL];
            if (!Icon) return null;
            return (
              <motion.li
                key={label}
                initial={reduceMotion ? false : {opacity: 0, y: 12}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{delay: reduceMotion ? 0 : index * 0.05}}
                whileHover={reduceMotion ? undefined : {y: -3}}>
                <a
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  aria-label={label}
                  title={label}
                  className="flex h-12 items-center gap-2.5 rounded-full border border-[var(--terminal-border)] bg-[color-mix(in_srgb,var(--terminal-surface)_70%,transparent)] px-4 text-[var(--text-muted)] backdrop-blur-sm transition-colors hover:border-[var(--terminal-border-strong)] hover:bg-[color-mix(in_srgb,var(--terminal-neon)_8%,transparent)] hover:text-[var(--terminal-neon)]">
                  <Icon />
                  <span className="text-[0.75rem] tracking-wide">{label}</span>
                </a>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
