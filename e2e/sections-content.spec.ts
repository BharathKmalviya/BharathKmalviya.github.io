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

  test('Education renders every school in the About status panel', async ({page}) => {
    // Education is no longer its own section — for a senior developer it reads
    // as a footnote, so it lives as one line per school in the About panel.
    await page.goto('/');
    const about = page.locator('#about');
    await about.scrollIntoViewIfNeeded();

    for (const item of portfolio.education) {
      await expect(about).toContainText(item.school);
      // The panel shows the abbreviation ("MCA"), not the full degree name.
      const abbreviation = item.degree.match(/\(([^)]+)\)/)?.[1] ?? item.degree;
      await expect(about).toContainText(abbreviation);
    }
  });

  test('Skills renders every capability group and chip', async ({page}) => {
    await page.goto('/');
    const tech = page.locator('#tech');
    await tech.scrollIntoViewIfNeeded();

    for (const group of portfolio.skillGroups) {
      await expect(tech).toContainText(group.title);
      for (const chip of group.chips) {
        await expect(tech).toContainText(chip);
      }
    }
  });

  test('Featured Work renders every project', async ({page}) => {
    await page.goto('/');
    const work = page.locator('#work');
    await work.scrollIntoViewIfNeeded();

    const cards = work.locator('article');
    await expect(cards).toHaveCount(portfolio.projects.length);

    for (const project of portfolio.projects) {
      await expect(work).toContainText(project.title);
      await expect(work).toContainText(project.summary);
    }
  });
});
