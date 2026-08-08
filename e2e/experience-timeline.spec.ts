import {test, expect} from '@playwright/test';

test.describe('experience timeline line', () => {
  test('the left border line has no gap between consecutive job entries', async ({page}) => {
    // Regression test: each job entry draws its own border-left line scoped
    // to its own height. If the list uses a flex `gap` between entries
    // instead of padding inside each entry, that gap has no border running
    // through it, breaking the vertical line at every job boundary.
    await page.goto('/');
    await page.locator('#experience').scrollIntoViewIfNeeded();

    const items = page.locator('#experience ol > li');
    const count = await items.count();
    expect(count).toBeGreaterThan(1);

    const rects = await items.evaluateAll((elements) => elements.map((el) => el.getBoundingClientRect().toJSON()));
    for (let i = 0; i < rects.length - 1; i++) {
      const gap = rects[i + 1].top - rects[i].bottom;
      expect(gap, `gap between job ${i} and job ${i + 1}`).toBe(0);
    }
  });
});
