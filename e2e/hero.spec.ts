import {test, expect} from '@playwright/test';
import {portfolio} from '../src/data/portfolio';

test.describe('hero section', () => {
  test('shows name, role, and company', async ({page}) => {
    await page.goto('/');
    const hero = page.locator('#top');
    await expect(hero.getByRole('heading', {level: 1})).toHaveText(portfolio.name);
    await expect(hero).toContainText(portfolio.role);
    await expect(hero).toContainText(portfolio.company);
  });

  test('"About me" button scrolls to the About section', async ({page}) => {
    await page.goto('/');
    await page.getByRole('button', {name: 'About me'}).click();
    await expect(page.locator('#about')).toBeInViewport();
  });

  test('"Get in touch" button scrolls to the Contact section', async ({page}) => {
    await page.goto('/');
    await page.getByRole('button', {name: 'Get in touch'}).click();
    await expect(page.locator('#contact')).toBeInViewport();
  });
});
