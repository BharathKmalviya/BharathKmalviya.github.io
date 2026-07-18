import {test, expect} from '@playwright/test';

const SECTION_IDS = ['about', 'experience', 'education', 'tech', 'contact'];

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
});
