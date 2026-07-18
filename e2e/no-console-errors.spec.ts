import {test, expect} from '@playwright/test';

// Regression test: `useReducedMotion()` reads matchMedia synchronously on the
// client's first render, before hydration reconciliation, while SSR always
// assumes no preference — any component that renders different *content*
// (not just styles) based on it will fail to hydrate for reduced-motion
// users. Caught via Typewriter rendering empty vs. full text. This test
// generalizes the check so any future component with the same mistake fails
// CI instead of only breaking for real reduced-motion users in production.

async function collectPageErrors(page: import('@playwright/test').Page) {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  return errors;
}

test.describe('no console/page errors on load', () => {
  test('with default motion preference', async ({page}) => {
    const errors = await collectPageErrors(page);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(errors, errors.join('\n')).toEqual([]);
  });

  test('with prefers-reduced-motion: reduce', async ({page}) => {
    await page.emulateMedia({reducedMotion: 'reduce'});
    const errors = await collectPageErrors(page);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(errors, errors.join('\n')).toEqual([]);
  });
});
