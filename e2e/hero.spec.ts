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

  test('"See my work" button scrolls to the Featured Work section', async ({page}) => {
    await page.goto('/');
    await page.getByRole('button', {name: 'See my work'}).click();
    await expect(page.locator('#work')).toBeInViewport();
  });

  test('shows the career stat strip', async ({page}) => {
    await page.goto('/');
    const hero = page.locator('#top');
    for (const stat of portfolio.stats) {
      await expect(hero).toContainText(stat.label);
    }
  });

  test('"Get in touch" button scrolls to the Contact section', async ({page}) => {
    await page.goto('/');
    await page.getByRole('button', {name: 'Get in touch'}).click();
    await expect(page.locator('#contact')).toBeInViewport();
  });
});
