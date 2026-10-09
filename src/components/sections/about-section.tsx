import {portfolio} from '@/data/portfolio';

export function AboutSection() {
  return (
    <section id="about" className="section-frame section-frame--wide" aria-labelledby="about-heading">
      <p className="section-kicker">03 / About</p>
      <h2 id="about-heading" className="section-title">{portfolio.aboutTitle}</h2>
      <div className="about-layout">
        <div className="space-y-5 font-sans-body text-[1.0625rem] leading-[1.8] text-[var(--text-muted)]">
          {portfolio.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <aside className="education-note" aria-label="Education">
          <h3 className="eyebrow mb-5">{portfolio.educationTitle}</h3>
          <ul className="space-y-6 font-sans-body">
            {portfolio.education.map((edu) => (
              <li key={edu.id}>
                <p className="text-sm font-medium">{edu.degree}</p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">{edu.school}</p>
                <p className="mt-2 text-xs text-[var(--text-muted)]">{edu.start} to {edu.end}</p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
