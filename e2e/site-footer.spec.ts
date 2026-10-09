import {test, expect} from '@playwright/test';
import {portfolio} from '../src/data/portfolio';

test('footer shows the identity and contact status', async ({page}) => {
  await page.goto('/');
  const footer = page.locator('footer');
  await footer.scrollIntoViewIfNeeded();
  await expect(footer).toContainText(portfolio.name);
  await expect(footer).toContainText('Open to connect');
  await expect(footer).toContainText(portfolio.location.split(',')[0]);
});
