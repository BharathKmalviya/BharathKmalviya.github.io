import {test, expect} from '@playwright/test';

const VIEWPORTS = [
  {name: 'small mobile', width: 360, height: 800},
  {name: 'large mobile', width: 430, height: 932},
  {name: 'tablet', width: 768, height: 1024},
  {name: 'desktop', width: 1440, height: 900},
];

test.describe('layout has no horizontal overflow at common breakpoints', () => {
  for (const viewport of VIEWPORTS) {
    test(viewport.name, async ({page}) => {
      await page.setViewportSize({width: viewport.width, height: viewport.height});
      await page.goto('/');

      const hasHorizontalOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      );
      expect(hasHorizontalOverflow).toBe(false);

      await expect(page.locator('nav')).toBeVisible();
    });
  }
});
