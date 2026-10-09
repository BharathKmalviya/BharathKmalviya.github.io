import {portfolio} from '@/data/portfolio';

export function FeaturedWorkSection() {
  return (
    <section id="work" className="section-frame section-frame--wide" aria-labelledby="work-heading">
      <p className="section-kicker">01 / Projects</p>
      <div className="section-heading-row">
        <h2 id="work-heading" className="section-title">{portfolio.workTitle}</h2>
        <p className="section-lede font-sans-body">{portfolio.workLede}</p>
      </div>
      <div className="work-list">
        {portfolio.projects.map((project, index) => (
          <article key={project.id} className="project-entry" aria-labelledby={`${project.id}-heading`}>
            <div className="project-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
            <div>
              <p className="eyebrow mb-3">{project.category}</p>
              <h3 id={`${project.id}-heading`} className="project-title">{project.title}</h3>
              <p className="mt-4 font-sans-body text-[var(--text-muted)] leading-relaxed">{project.summary}</p>
              <p className="project-tools font-sans-body">{project.tags.join(' · ')}</p>
            </div>
            <div className="project-detail font-sans-body">
              <h4 className="detail-label">My part</h4>
              <p>{project.contribution}</p>
              <h4 className="detail-label mt-6">In use</h4>
              <p>{project.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
