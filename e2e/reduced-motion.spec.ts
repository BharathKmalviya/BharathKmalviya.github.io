import {test, expect} from '@playwright/test';

const SECTION_IDS = ['about', 'experience', 'education', 'tech', 'contact'];

// `SectionReveal` (src/components/portfolio-page.tsx) is supposed to skip its
// animated `motion.div` wrapper entirely under prefers-reduced-motion, per
// constitution Principle V. Checking computed `opacity` on the section itself
// wouldn't catch a regression here (opacity isn't inherited as a computed
// value, and whileInView is scroll-triggered so it can settle to 1 well
// before a test observes it either way). Instead assert the actual contract:
// no Framer-Motion-managed inline style exists on the wrapper.

test.describe('prefers-reduced-motion', () => {
  test.use({contextOptions: {reducedMotion: 'reduce'}});

  test('sections render without an animated reveal wrapper', async ({page}) => {
    await page.goto('/');

    for (const id of SECTION_IDS) {
      // `useReducedMotion()` can't read matchMedia until after hydration, so
      // the animated wrapper can exist for one client render before the
      // effect corrects it. Poll for the settled, post-hydration state.
      await expect(async () => {
        const wrapperStyle = await page
          .locator(`#${id}`)
          .evaluate((el) => el.parentElement?.getAttribute('style') ?? null);
        expect(wrapperStyle, `#${id}'s parent should not carry a Framer Motion inline style`).toBeFalsy();
      }).toPass({timeout: 2000});
    }
  });

  test('the hero heading settles fully visible, never stuck mid-fade', async ({page}) => {
    // Framer Motion keeps managing this element's inline style regardless of
    // reduced motion (see hero-terminal.tsx's `item()`), so unlike the
    // section wrappers above, an inline style here is expected — what
    // matters is that it settles at opacity 1, not stuck at its pre-fade
    // opacity 0 (a real regression this test caught: dropping `animate`
    // entirely when reduceMotion flips true mid-flight left Framer Motion
    // abandoning the element at its initial, invisible state).
    await page.goto('/');
    const heading = page.locator('#top').getByRole('heading', {level: 1});

    await expect(async () => {
      const opacity = await heading.evaluate((el) => getComputedStyle(el).opacity);
      expect(opacity).toBe('1');
    }).toPass({timeout: 2000});
  });
});
