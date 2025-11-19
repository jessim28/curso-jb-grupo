import { test } from "@playwright/test";
import { HomePage } from "../../pages/AE/Home.page";
import { AuthPage } from "../../pages/AE/Auth.page";
import { Logger } from "../../helpers/utils/log.helper";
import { InvalidLoginCases } from "../../data/taller8/InvalidAECases";
import * as path from "node:path";

test.describe("Auth - Intentos fallidos (data-driven)", () => {
  test.beforeEach(async ({ browserName }, info) => {
    Logger.start('TEST');
    Logger.info(`-> ${info.project.name} | ${browserName} | ${info.title}`);
  });
  
  test.afterEach(async ({ page }, info) => {
    const file = path.join(
      process.cwd(),
      "artifacts",
      "taller8",
      `Suite1_${info.project.name}_${info.title}.png`,
    );
    await page.screenshot({ path: file });
    Logger.end();
  });

  test("Test driven", async ({ page }) => {
    const home = new HomePage(page);
    const auth = new AuthPage(page);

    await home.open();
    
    await home.gotoSignupLogin();
    for (const c of InvalidLoginCases) {
      await test.step(`Case: ${c.name}`, async () => {
        await auth.login(c.email, c.password);
        await auth.assertFailLogin();
      });
    }
  });
});
