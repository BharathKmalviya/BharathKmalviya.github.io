import {test, expect} from '@playwright/test';

const SECTION_IDS = ['work', 'experience', 'about', 'tech', 'contact'];

test.describe('primary nav active-section indicator', () => {
  test('never marks more than one nav link active at once while scrolling', async ({page}) => {
    await page.goto('/');
    const navLinks = page.locator('nav a.nav-link');

    for (const id of SECTION_IDS) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);

      const activeCount = await navLinks.evaluateAll(
        (links) => links.filter((link) => link.getAttribute('aria-current') === 'true').length,
      );
      expect(activeCount, `while "${id}" is in view`).toBeLessThanOrEqual(1);
    }
  });

  test('marks the section actually in view active, not a stale earlier one', async ({page}) => {
    // Regression test: intersectionRatio is relative to each section's own
    // height, so a fixed-height tracked band compared against a fixed ratio
    // threshold is unreliable across sections of very different heights —
    // on real content, tall sections (Experience, Skills) could never cross
    // the threshold at all, leaving the nav permanently stuck on the last
    // short section that could, regardless of how far the user had actually
    // scrolled past it.
    await page.goto('/');

    for (const id of SECTION_IDS) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await expect(async () => {
        await expect(page.locator(`nav a.nav-link[href="#${id}"]`)).toHaveAttribute('aria-current', 'true');
      }).toPass({timeout: 2000});
    }
  });
});
