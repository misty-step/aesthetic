import { defineConfig } from '@playwright/test';

/* the law gates run against the live site, served statically from the
   repo root exactly as Pages serves it. Chromium only — the gate is
   about the law, not engine matrices. */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://127.0.0.1:8642',
    viewport: { width: 390, height: 844 },
  },
  webServer: [
    {
      command: 'python3 -m http.server 8642 --bind 127.0.0.1',
      url: 'http://127.0.0.1:8642/site/',
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'vite tests/fixtures/base-ui-app --port 8643 --strictPort',
      url: 'http://127.0.0.1:8643/',
      reuseExistingServer: !process.env.CI,
    },
  ],
});
