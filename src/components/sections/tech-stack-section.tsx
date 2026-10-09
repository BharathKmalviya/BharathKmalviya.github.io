import {portfolio} from '@/data/portfolio';

export function TechStackSection() {
  return (
    <section id="tech" className="section-frame section-frame--wide" aria-labelledby="tech-heading">
      <p className="section-kicker">04 / Practice</p>
      <div className="section-heading-row">
        <h2 id="tech-heading" className="section-title">{portfolio.techTitle}</h2>
        <p className="section-lede font-sans-body">{portfolio.techLede}</p>
      </div>
      <div className="practice-list">
        {portfolio.skillGroups.map((group) => (
          <div key={group.id} className="practice-entry">
            <h3 className="text-lg font-semibold tracking-tight">{group.title}</h3>
            <div className="font-sans-body">
              <p className="leading-relaxed text-[var(--text-muted)]">{group.blurb}</p>
              <p className="mt-3 text-sm text-[var(--text-muted)]">{group.chips.join(' · ')}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
