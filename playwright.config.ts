import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Directory where all test files are located
  testDir: './tests',

  //  Global timeout for each test (30 seconds)
  timeout: 30000,

  // Run tests in parallel and retry once if they fail
  fullyParallel: true,
  retries: 1,

  // Default configuration for all tests
  use: {
    // Base URL for all requests
    baseURL: 'https://deckofcardsapi.com',
  },
});
