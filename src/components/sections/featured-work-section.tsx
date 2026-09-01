'use client';

import Image from 'next/image';
import {motion} from 'framer-motion';
import {useSafeReducedMotion} from '@/lib/use-safe-reduced-motion';
import {portfolio, type ProjectItem} from '@/data/portfolio';

function ProjectChrome({project}: {project: ProjectItem}) {
  return (
    <div className="project-card__chrome">
      <span className="project-card__dot bg-[#ff5f56]" aria-hidden="true" />
      <span className="project-card__dot bg-[#ffbd2e]" aria-hidden="true" />
      <span className="project-card__dot bg-[#27c93f]" aria-hidden="true" />
      <span className="ml-1.5 truncate">project: {project.slug}</span>
      {project.badge ? (
        <span className={`badge badge--${project.badge.tone} ml-auto`}>{project.badge.label}</span>
      ) : null}
    </div>
  );
}

function ProjectBody({project, featured = false}: {project: ProjectItem; featured?: boolean}) {
  return (
    <div className="flex flex-1 flex-col gap-4 px-5 py-6 sm:px-6">
      <h3
        className={`font-semibold tracking-tight text-[var(--text)] ${
          featured ? 'text-[1.35rem]' : 'text-[1.05rem]'
        }`}>
        {project.title}
      </h3>
      <p className="font-sans-body text-[0.9rem] leading-relaxed text-[var(--text-muted)]">
        {project.summary}
      </p>
      <ul className="flex flex-col gap-2">
        {project.bullets.map((bullet) => (
          <li
            key={bullet.slice(0, 40)}
            className="font-sans-body text-[0.85rem] leading-relaxed text-[var(--text-muted)] before:mr-2 before:font-mono before:text-[var(--terminal-neon-dim)] before:content-['›']">
            {bullet}
          </li>
        ))}
      </ul>
      <ul className="mt-auto flex flex-wrap gap-2 pt-2">
        {project.tags.map((tag) => (
          <li key={tag} className="tag-chip">
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FeaturedWorkSection() {
  const reduceMotion = useSafeReducedMotion();
  const featured = portfolio.projects.find((p) => p.featured);
  const rest = portfolio.projects.filter((p) => !p.featured);

  const cardMotion = (index: number) =>
    reduceMotion
      ? {}
      : {
          initial: {opacity: 0, y: 24},
          whileInView: {opacity: 1, y: 0},
          viewport: {once: true, margin: '-8% 0px'},
          transition: {type: 'spring' as const, stiffness: 170, damping: 24, delay: index * 0.06},
        };

  return (
    <section id="work" className="section-frame section-frame--wide" aria-labelledby="work-heading">
      <p className="section-path">~/featured-work</p>
      <h2 id="work-heading" className="section-title">
        {portfolio.workTitle}
      </h2>
      <p className="section-lede font-sans-body mb-10">{portfolio.workLede}</p>

      <div className="bento-grid">
        {featured ? (
          <motion.article className="project-card project-card--featured" {...cardMotion(0)}>
            <ProjectChrome project={featured} />
            <div className="grid gap-2 md:grid-cols-[1.4fr_1fr] md:items-center">
              <ProjectBody project={featured} featured />
              <div className="hidden px-6 pb-8 md:block md:pt-8">
                <div className="phone-frame phone-float">
                  <div className="phone-frame__screen">
                    <Image
                      src={featured.image}
                      alt={featured.imageAlt}
                      width={360}
                      height={760}
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        ) : null}

        {rest.map((project, index) => (
          <motion.article key={project.id} className="project-card" {...cardMotion(index + 1)}>
            <ProjectChrome project={project} />
            <ProjectBody project={project} />
            <div className="px-5 pt-2">
              <div
                className={`phone-frame phone-frame--peek ${index % 2 === 0 ? 'phone-tilt-l' : 'phone-tilt-r'}`}>
                <div className="phone-frame__screen">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    width={360}
                    height={480}
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
