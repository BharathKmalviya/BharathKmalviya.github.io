import {portfolio} from '@/data/portfolio';

export function SiteFooter() {
  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="section-frame section-frame--wide flex flex-wrap items-center justify-between gap-4 py-6 text-xs text-[var(--text-muted)]">
        <p>{portfolio.name}</p>
        <p>Mumbai, India <span aria-hidden="true">·</span> Open to connect</p>
        <a href="#top" className="footer-link">Back to top <span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  );
}
