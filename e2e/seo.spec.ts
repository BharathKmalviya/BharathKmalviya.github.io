import {test, expect} from '@playwright/test';
import {portfolio} from '../src/data/portfolio';

test.describe('SEO metadata', () => {
  test('page title and meta description match portfolio data', async ({page}) => {
    await page.goto('/');
    await expect(page).toHaveTitle(portfolio.seo.title);

    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', portfolio.seo.description);
  });

  test('ships a Person JSON-LD block with the right identity', async ({page}) => {
    await page.goto('/');
    const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
    expect(jsonLd).toBeTruthy();

    const data = JSON.parse(jsonLd!);
    expect(data['@type']).toBe('Person');
    expect(data.name).toBe(portfolio.name);
    expect(data.email).toBe(portfolio.email);
  });

  test('robots.txt and sitemap.xml are served', async ({request}) => {
    const robots = await request.get('/robots.txt');
    expect(robots.ok()).toBe(true);
    expect(await robots.text()).toContain('Sitemap:');

    const sitemap = await request.get('/sitemap.xml');
    expect(sitemap.ok()).toBe(true);
    expect(await sitemap.text()).toContain(portfolio.siteUrl);
  });
});
