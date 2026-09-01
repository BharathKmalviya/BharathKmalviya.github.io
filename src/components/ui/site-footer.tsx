'use client';

export function SiteFooter() {
  return (
    <footer className="footer-status" aria-label="Site footer">
      <div className="mx-auto flex w-full max-w-[var(--content-wide)] flex-wrap items-center justify-center gap-x-2 gap-y-1 px-[var(--page-pad-x)] py-4 text-[0.7rem] text-[var(--text-muted)]">
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <span className="text-[var(--terminal-neon)]">~/bharath</span>
          <span aria-hidden="true">·</span>
          <span>Mumbai</span>
          <span aria-hidden="true">·</span>
          <span>
            status: <span className="text-[var(--terminal-neon)]">open to connect</span>
          </span>
        </p>
      </div>
    </footer>
  );
}
