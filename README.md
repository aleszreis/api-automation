# API automation

Playwright-based API test suite for the Deck of Cards API.  
This repository provides a small collection of API tests that demonstrate best practices for automating REST APIs with Playwright. Tests cover common flows (deck creation, shuffle, draw), pile management, and negative/error cases. Helpers and a shared configuration keep tests consistent and easy to extend.

Prerequisites
- Node.js LTS (>= 18)
- pnpm (preferred package manager)

Install
```sh
npm install -g pnpm
pnpm install
```

Run tests
- Headless (default)
```sh
pnpm test
# or
npm run test
```

Notes
- Base URL and global settings are defined in playwright.config.ts.
- Keep tests fast and idempotent; use helpers in tests/utils/utils.ts for common flows.

Authors
- Alessandra Reis ([@aleszreis](https://www.linkedin.com/in/aleszreis/))
