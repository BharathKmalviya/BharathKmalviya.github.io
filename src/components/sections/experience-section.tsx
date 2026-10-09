import {portfolio} from '@/data/portfolio';

export function ExperienceSection() {
  return (
    <section id="experience" className="section-frame section-frame--wide" aria-labelledby="experience-heading">
      <p className="section-kicker">02 / Experience</p>
      <h2 id="experience-heading" className="section-title">{portfolio.experienceTitle}</h2>
      <ol className="experience-list">
        {portfolio.experience.map((job) => (
          <li key={job.id} className="experience-entry">
            <div>
              <h3 className="text-xl font-semibold tracking-tight">{job.company}</h3>
              <p className="mt-2 font-sans-body text-sm leading-relaxed text-[var(--text-muted)]">
                {job.location}{job.employmentType ? ` · ${job.employmentType}` : ''}
              </p>
            </div>
            <div className="space-y-8">
              {job.roles.map((role) => (
                <div key={`${job.id}-${role.title}-${role.start}`}>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <h4 className="font-sans-body font-medium">{role.title}</h4>
                    <p className="shrink-0 text-xs leading-relaxed text-[var(--text-muted)]">{role.start} to {role.end}</p>
                  </div>
                  <ul className="mt-4 list-disc space-y-2 pl-4 font-sans-body text-sm leading-relaxed text-[var(--text-muted)] marker:text-[var(--terminal-neon)]">
                    {role.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
