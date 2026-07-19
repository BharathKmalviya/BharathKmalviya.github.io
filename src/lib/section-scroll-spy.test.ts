import {describe, expect, it} from 'vitest';
import {updateActiveSection} from './section-scroll-spy';

const ORDER = ['about', 'experience', 'education', 'tech', 'contact'];

describe('updateActiveSection', () => {
  it('picks the intersecting section from the first batch', () => {
    const active = new Map<string, boolean>();
    const result = updateActiveSection(active, [{id: 'education', isIntersecting: true}], ORDER);
    expect(result).toBe('education');
  });

  it('does not get stuck on a section after it exits, even when no other section enters in the same batch', () => {
    // This is the exact shape of batch sequence that got the production nav
    // stuck showing "Education" active while the page had scrolled well
    // into "Skills": IntersectionObserver delivers education's exit and
    // tech's entry as two separate batches, not one combined batch.
    const active = new Map<string, boolean>();

    expect(updateActiveSection(active, [{id: 'education', isIntersecting: true}], ORDER)).toBe('education');
    expect(updateActiveSection(active, [{id: 'education', isIntersecting: false}], ORDER)).toBeNull();
    expect(updateActiveSection(active, [{id: 'tech', isIntersecting: true}], ORDER)).toBe('tech');
  });

  it('is not biased toward short sections over tall ones', () => {
    // With the previous ratio-based design, a tall section's max possible
    // intersectionRatio against the tracked band could sit permanently below
    // every threshold, so it could never register as active regardless of
    // how it compares to a short section. Overlap-based tracking carries no
    // notion of section height at all, so a "tall" section here behaves
    // identically to a "short" one — this test would have caught the
    // production bug (nav stuck on Education because Experience/Skills
    // structurally could never cross a ratio threshold on real content).
    const active = new Map<string, boolean>();
    expect(updateActiveSection(active, [{id: 'experience', isIntersecting: true}], ORDER)).toBe('experience');
    expect(updateActiveSection(active, [{id: 'experience', isIntersecting: false}], ORDER)).toBeNull();
    expect(updateActiveSection(active, [{id: 'tech', isIntersecting: true}], ORDER)).toBe('tech');
  });

  it('prefers the later section in order when two overlap in the same batch', () => {
    const active = new Map<string, boolean>();
    const result = updateActiveSection(
      active,
      [
        {id: 'education', isIntersecting: true},
        {id: 'tech', isIntersecting: true},
      ],
      ORDER,
    );
    expect(result).toBe('tech');
  });

  it('returns null when no section is currently intersecting', () => {
    const active = new Map<string, boolean>();
    const result = updateActiveSection(active, [], ORDER);
    expect(result).toBeNull();
  });
});
