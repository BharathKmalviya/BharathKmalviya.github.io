import {defineConfig, devices} from '@playwright/test';

const PORT = 3100;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  // A single shared Turbopack dev server serves every test; concurrent
  // requests mid-compile were observed to intermittently serve stale CSS/JS.
  // Serialize in CI where that's a one-shot run worth the extra ~15s.
  workers: process.env.CI ? 1 : undefined,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  // 'html' so the workflow's on-failure playwright-report/ upload actually
  // has something in it — the 'github' reporter alone doesn't write files.
  reporter: process.env.CI ? [['github'], ['html', {open: 'never'}]] : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'on-first-retry',
  },
  projects: [{name: 'chromium', use: {...devices['Desktop Chrome']}}],
  webServer: {
    command: 'pnpm run dev',
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    env: {PORT: String(PORT)},
    timeout: 120_000,
  },
});
