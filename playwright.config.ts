import { defineConfig } from '@playwright/test';

/* The browser proof runs against _site/, the artifact the pages workflow
   deploys: the web server builds it, then serves it as static files. */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://127.0.0.1:8642',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command:
      'node scripts/build-site.mjs && python3 -m http.server 8642 --bind 127.0.0.1 --directory _site',
    url: 'http://127.0.0.1:8642/',
    reuseExistingServer: !process.env.CI,
  },
});
