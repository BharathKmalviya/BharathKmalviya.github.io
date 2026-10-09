import {test, expect} from '@playwright/test';

const SECTION_IDS = ['work', 'experience', 'about', 'tech', 'contact'];

test.describe('prefers-reduced-motion', () => {
  test.use({contextOptions: {reducedMotion: 'reduce'}});

  test('sections render without animated reveal wrappers', async ({page}) => {
    await page.goto('/');

    for (const id of SECTION_IDS) {
      await expect(async () => {
        const wrapperStyle = await page
          .locator(`#${id}`)
          .evaluate((el) => el.parentElement?.getAttribute('style') ?? null);
        expect(wrapperStyle, `#${id}'s parent should not carry an animation style`).toBeFalsy();
      }).toPass({timeout: 2000});
    }
  });

  test('the hero heading is fully visible', async ({page}) => {
    await page.goto('/');
    const heading = page.locator('#top').getByRole('heading', {level: 1});

    await expect(async () => {
      const opacity = await heading.evaluate((el) => getComputedStyle(el).opacity);
      expect(opacity).toBe('1');
    }).toPass({timeout: 2000});
  });
});
