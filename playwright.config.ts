import { defineConfig, devices } from '@playwright/test';
import { DateFormatter } from './helpers/utils/time.helper';
import { CustomDevice, CustomDeviceName } from './data/CustomDevices';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 3,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['list', { printSteps: true  }],
  [
    'html', 
    { open: "never", outputFolder: `playwright-report/report-${DateFormatter(new Date())}` }
  ],  
  [
    'json', 
    { outputFile: `playwright-result/result-${DateFormatter(new Date())}.json` }
  ],
    
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  outputDir: "artifacts/run",
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

  // launchOptions: {
  //   slowMo: process.env.CI?0:500,
  // },

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
 
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
/*
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

  // === Dispositivos móviles (emulación) ===
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
    {
      name: CustomDeviceName.CustomIphone,
      use: {...CustomDevice [CustomDeviceName.CustomIphone]}
    }

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
