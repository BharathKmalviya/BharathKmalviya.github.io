import {test, expect} from '@playwright/test';
import {touchDevice} from './touch-device';

// Regression test: the horizontally-scrollable nav link list showed the
// browser's native scrollbar as a visible bar on mobile. Fixed with a
// `.no-scrollbar` utility (scrollbar-width/-ms-overflow-style/::-webkit-scrollbar).

test.describe('nav link list scrollbar', () => {
  test.use({...touchDevice('Pixel 7')});

  test('hides its native scrollbar while remaining scrollable', async ({page}) => {
    await page.goto('/');
    const list = page.locator('nav ul');

    await expect(list).toHaveClass(/no-scrollbar/);

    const scrollbarWidth = await list.evaluate((el) => getComputedStyle(el).scrollbarWidth);
    expect(scrollbarWidth).toBe('none');

    const overflowX = await list.evaluate((el) => getComputedStyle(el).overflowX);
    expect(overflowX).toBe('auto');
  });
});
