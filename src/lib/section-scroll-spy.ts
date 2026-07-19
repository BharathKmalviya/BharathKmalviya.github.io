export type SectionEntry = {
  id: string;
  isIntersecting: boolean;
};

/**
 * Computes the active nav section from an IntersectionObserver callback.
 *
 * The observer tracks a thin reference line (see the `rootMargin` in
 * site-nav.tsx), not a tall band: `intersectionRatio` is relative to each
 * *target's own height*, so comparing ratios across sections of very
 * different heights is broken by construction — on a typical mobile
 * viewport, a ~20%-of-viewport-tall band is under 15% of a long section's
 * total height (e.g. Experience, Skills) but over 15% of a short one (e.g.
 * Education), so the long sections could never cross a ratio threshold at
 * all and the nav would get stuck on the last short section that could.
 * Tracking plain overlap with a thin line sidesteps that entirely: sections
 * are non-overlapping in normal document flow, so at most one is ever
 * intersecting the line.
 *
 * `entries` only contains sections whose overlap just changed in this
 * specific callback batch — `active` is mutated in place to persist every
 * section's latest known overlap state so the comparison always reflects
 * current state, not just this batch (otherwise a section's "no longer
 * overlapping" update could arrive in its own batch, without the newly
 * active section alongside it, and get silently ignored).
 */
export function updateActiveSection(
  active: Map<string, boolean>,
  entries: readonly SectionEntry[],
  order: readonly string[],
): string | null {
  for (const entry of entries) {
    active.set(entry.id, entry.isIntersecting);
  }

  let bestId: string | null = null;
  for (const id of order) {
    if (active.get(id)) bestId = id;
  }
  return bestId;
}
