import { test, expect } from "@playwright/test";
import { Logger } from "../../helpers/utils/log.helper";
import { waitPageStable } from "../../helpers/utils/wait.helper";

test.describe.configure({ mode: "parallel" });

test.describe("Taller7 · Paralelismo (tests independientes)", () => {
  test.beforeEach( async() => {
    Logger.start("TEST")
  });
  test.afterEach(() => { 
    Logger.end()
  });

  const urls = [
    "https://example.com",
    "https://playwright.dev",
    "https://www.wikipedia.org",
    "https://www.google.com",
  ];

  for (const u of urls) {   
    test(`Test: ${u}`, async ({ page }) => {
      await page.goto(u);
      await waitPageStable(page);
      await expect(page).toHaveTitle(/.+/);
    });
  }
});
