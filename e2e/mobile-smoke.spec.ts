import {test, expect} from '@playwright/test';
import {touchDevice} from './touch-device';

const SECTION_IDS = ['work', 'experience', 'about', 'tech', 'contact'];

test.describe('mobile viewport smoke test', () => {
  test.use({...touchDevice('iPhone 13')});

  test('renders without horizontal overflow and every section is reachable', async ({page}) => {
    await page.goto('/');

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(hasHorizontalOverflow).toBe(false);

    for (const id of SECTION_IDS) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
  });
});
