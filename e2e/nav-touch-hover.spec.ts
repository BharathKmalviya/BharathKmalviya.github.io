import {test, expect} from '@playwright/test';
import {touchDevice} from './touch-device';

// Regression test: touch devices have no real hover state, so an unguarded
// `.nav-link:hover` rule stayed applied after a tap, making a stale link look
// active alongside the genuinely active section. The fix gates the hover
// rule behind `@media (hover: hover) and (pointer: fine)`.

test.describe('nav link hover styling on touch devices', () => {
  test.use({...touchDevice('Pixel 7')});

  test('a non-active link never carries the hover highlight on a coarse pointer', async ({page}) => {
    await page.goto('/');

    const supportsHover = await page.evaluate(() => matchMedia('(hover: hover)').matches);
    expect(supportsHover, 'device profile should emulate a touch/coarse pointer').toBe(false);

    const about = page.getByRole('link', {name: 'About', exact: true});
    // Real pointer move: engages the browser's actual :hover pseudo-class,
    // unlike dispatchEvent('mouseover') which only fires a JS event and
    // would pass even without the media-query gate in place.
    await about.hover();

    const isActive = await about.getAttribute('aria-current');
    expect(isActive).not.toBe('true');

    const background = await about.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(background).toBe('rgba(0, 0, 0, 0)');
  });
});

test.describe('nav link hover styling on pointer devices', () => {
  test('hovering a non-active link does apply the highlight on a real pointer device', async ({page}) => {
    await page.goto('/');

    const supportsHover = await page.evaluate(() => matchMedia('(hover: hover)').matches);
    expect(supportsHover).toBe(true);

    const about = page.getByRole('link', {name: 'About', exact: true});
    await about.hover();

    const background = await about.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(background).not.toBe('rgba(0, 0, 0, 0)');
  });
});
