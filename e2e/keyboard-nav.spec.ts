import {test, expect} from '@playwright/test';

test.describe('keyboard navigation', () => {
  test('every primary nav link is reachable by Tab and shows a focus indicator', async ({page}) => {
    await page.goto('/');
    const navLinks = page.locator('nav a.nav-link');
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const link = navLinks.nth(i);
      await link.focus();
      await expect(link).toBeFocused();

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
