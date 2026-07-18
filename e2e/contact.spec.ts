import {test, expect} from '@playwright/test';
import {portfolio} from '../src/data/portfolio';

test.describe('contact section', () => {
  test('email link points to the right mailto address', async ({page}) => {
    await page.goto('/');
    const emailLink = page.locator('#contact-email');
    await emailLink.scrollIntoViewIfNeeded();
    await expect(emailLink).toHaveAttribute('href', `mailto:${portfolio.email}`);
    await expect(emailLink).toHaveText(portfolio.email);
  });

  test('external social links open in a new tab safely, mailto does not', async ({page}) => {
    await page.goto('/');
    const contact = page.locator('#contact');
    await contact.scrollIntoViewIfNeeded();

    for (const social of portfolio.socials) {
      const link = contact.getByRole('link', {name: social.label});
      await expect(link).toHaveAttribute('href', social.href);

      if (social.href.startsWith('mailto:')) {
        await expect(link).not.toHaveAttribute('target', '_blank');
      } else {
        await expect(link).toHaveAttribute('target', '_blank');
        await expect(link).toHaveAttribute('rel', /noopener/);
        await expect(link).toHaveAttribute('rel', /noreferrer/);
      }
    }
  });

  test('copy email button copies the address to the clipboard', async ({page, context, browserName}) => {
    test.skip(browserName !== 'chromium', 'clipboard-read/write permissions are Chromium-only');
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    await page.goto('/');
    const copyButton = page.getByRole('button', {name: 'Copy email'});
    await copyButton.scrollIntoViewIfNeeded();
    await copyButton.click();

    await expect(page.getByRole('button', {name: 'Copied'})).toBeVisible();
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toBe(portfolio.email);

    await expect(page.getByRole('button', {name: 'Copy email'})).toBeVisible({timeout: 3000});
  });
});
