import {test, expect} from '@playwright/test';
import {portfolio} from '../src/data/portfolio';

test.describe('interactive hero terminal', () => {
  test('runs a typed command and prints output', async ({page}) => {
    await page.goto('/');
    const input = page.getByLabel(/interactive terminal/i);
    await input.fill('whoami');
    await input.press('Enter');

    const console_ = page.locator('#top [role="log"]');
    await expect(console_).toContainText('$ whoami');
    await expect(console_).toContainText('senior android developer');
  });

  test('reports unknown commands instead of failing silently', async ({page}) => {
    await page.goto('/');
    const input = page.getByLabel(/interactive terminal/i);
    await input.fill('definitely-not-a-command');
    await input.press('Enter');

    await expect(page.locator('#top [role="log"]')).toContainText('command not found');
  });

  test('a hint chip runs its command', async ({page}) => {
    await page.goto('/');
    await page.getByRole('button', {name: 'help', exact: true}).click();
    await expect(page.locator('#top [role="log"]')).toContainText('available commands');
  });

  test('"projects" navigates to Featured Work', async ({page}) => {
    await page.goto('/');
    const input = page.getByLabel(/interactive terminal/i);
    await input.fill('projects');
    await input.press('Enter');
    await expect(page.locator('#work')).toBeInViewport();
  });

  test('tab completes a partial command', async ({page}) => {
    await page.goto('/');
    const input = page.getByLabel(/interactive terminal/i);
    await input.fill('neo');
    await input.press('Tab');
    await expect(input).toHaveValue('neofetch');
  });

  test('"clear" empties the log', async ({page}) => {
    await page.goto('/');
    const input = page.getByLabel(/interactive terminal/i);
    await input.fill('whoami');
    await input.press('Enter');
    await expect(page.locator('#top [role="log"]')).toBeVisible();

    await input.fill('clear');
    await input.press('Enter');
    await expect(page.locator('#top [role="log"]')).toHaveCount(0);
  });

  test('footer shows the status bar', async ({page}) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toContainText('open to connect');
    await expect(footer).toContainText(portfolio.location.split(',')[0]);
  });
});
