import {test, expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('home page has no serious or critical accessibility violations', async ({page}) => {
  await page.goto('/');

  const results = await new AxeBuilder({page}).analyze();
  const blocking = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');

  expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
});
