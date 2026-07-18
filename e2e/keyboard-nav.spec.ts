import {test, expect} from '@playwright/test';

test.describe('keyboard navigation', () => {
  test('every primary nav link is reachable by Tab, in order, with a visible focus indicator', async ({page}) => {
    await page.goto('/');
    const navLinks = page.locator('nav a.nav-link');
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);

    // The "~/bharath" logo anchor is the first tabbable element on the page,
    // ahead of the nav links themselves.
    await page.keyboard.press('Tab');

    for (let i = 0; i < count; i++) {
      await page.keyboard.press('Tab');
      const link = navLinks.nth(i);
      await expect(link, `Tab press ${i + 1} should land on nav link ${i}, in DOM order`).toBeFocused();

      const outlineVisible = await link.evaluate((el) => {
        const style = getComputedStyle(el);
        return style.outlineStyle !== 'none' || style.boxShadow !== 'none';
      });
      expect(outlineVisible, `nav link ${i} should show a visible focus indicator`).toBe(true);
    }
  });

  test('the copy-email button and mailto link are keyboard-focusable with a visible indicator', async ({page}) => {
    await page.goto('/');
    await page.locator('#contact').scrollIntoViewIfNeeded();

    for (const target of [page.locator('#contact-email'), page.getByRole('button', {name: 'Copy email'})]) {
      await target.focus();
      await expect(target).toBeFocused();

      const outlineVisible = await target.evaluate((el) => {
        const style = getComputedStyle(el);
        return style.outlineStyle !== 'none' || style.boxShadow !== 'none';
      });
      expect(outlineVisible).toBe(true);
    }
  });
});
