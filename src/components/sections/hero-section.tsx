'use client';

import {portfolio} from '@/data/portfolio';
import {useSafeReducedMotion} from '@/lib/use-safe-reduced-motion';

export function HeroSection() {
  const reduceMotion = useSafeReducedMotion();

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({behavior: reduceMotion ? 'instant' : 'smooth'});
  }

  return (
    <section id="top" className="hero section-frame section-frame--wide" aria-label="Hero">
      <div className="hero-heading-row">
        <p className="eyebrow">Android developer</p>
        <p className="eyebrow text-[var(--text-muted)]">Mumbai, India</p>
      </div>
      <h1 className="hero-name">
        {portfolio.name.split(' ').map((word, index) => (
          <span key={word} className="block">{index > 0 ? ' ' : ''}{word}</span>
        ))}
      </h1>
      <div className="hero-details">
        <div className="hero-copy">
          <p className="hero-intro font-sans-body">{portfolio.heroIntro}</p>
          <p className="mt-5 font-sans-body leading-relaxed text-[var(--text-muted)]">
            {portfolio.role} at {portfolio.company}.
          </p>
          <p className="mt-3 max-w-[34rem] font-sans-body leading-relaxed text-[var(--text-muted)]">
            {portfolio.heroContext}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" className="btn btn-primary" onClick={() => scrollTo('work')}>
              See my work <span aria-hidden="true">↓</span>
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => scrollTo('contact')}>
              Get in touch
            </button>
          </div>
        </div>
        <dl className="career-notes" aria-label="Career highlights">
          {portfolio.stats.map((stat) => (
            <div key={stat.id} className="career-note">
              <dt className="font-sans-body">{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
