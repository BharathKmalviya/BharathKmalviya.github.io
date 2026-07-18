import {test, expect} from '@playwright/test';
import {portfolio} from '../src/data/portfolio';

// Data-driven so this suite stays correct as content in src/data/portfolio.ts
// changes, instead of hardcoding copy that will drift and rot.

test.describe('section content matches src/data/portfolio.ts', () => {
  test('About renders every paragraph', async ({page}) => {
    await page.goto('/');
    const about = page.locator('#about');
    await about.scrollIntoViewIfNeeded();
    for (const paragraph of portfolio.about) {
      await expect(about).toContainText(paragraph);
    }
  });

  test('Experience renders every company and role', async ({page}) => {
    await page.goto('/');
    const experience = page.locator('#experience');
    await experience.scrollIntoViewIfNeeded();

    const items = experience.locator('ol > li');
    await expect(items).toHaveCount(portfolio.experience.length);

    for (const job of portfolio.experience) {
      await expect(experience).toContainText(job.company);
      for (const role of job.roles) {
        await expect(experience).toContainText(role.title);
      }
    }
  });

  test('Education renders every school and degree', async ({page}) => {
    await page.goto('/');
    const education = page.locator('#education');
    await education.scrollIntoViewIfNeeded();

    const items = education.locator('ul > li');
    await expect(items).toHaveCount(portfolio.education.length);

    for (const item of portfolio.education) {
      await expect(education).toContainText(item.school);
      await expect(education).toContainText(item.degree);
    }
  });

  test('Skills renders every tech item', async ({page}) => {
    await page.goto('/');
    const tech = page.locator('#tech');
    await tech.scrollIntoViewIfNeeded();

    const items = tech.locator('ul > li');
    await expect(items).toHaveCount(portfolio.tech.length);

    for (const item of portfolio.tech) {
      await expect(tech).toContainText(item.label);
    }
  });
});
