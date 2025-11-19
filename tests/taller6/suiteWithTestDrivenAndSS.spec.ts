import { expect, test } from "@playwright/test";
import * as path from "node:path";
import { Logger } from "../../helpers/utils/log.helper";
import { waitPageStable, waitVisible } from "../../helpers/utils/wait.helper";
import { CredentialsCase } from "../../data/LoginCases";

// Carpeta para screenshots manuales en caso de error
const ARTIFACTS_DIR = path.join(process.cwd(), "artifacts");
for (const caso of Object.values(CredentialsCase)) {
  
  test.describe(`Taller 6 - Data Driven Login (${caso.name})`, () => {
    
    test.beforeEach(async () => {
      Logger.start("TEST");
    });

    test.afterEach(async () => {
      Logger.end();
    });

    test(`Login case: ${caso.name}`, async ({ page }) => {
      try {
        await test.step("Ir a la página de login", async () => {
          await page.goto("https://www.saucedemo.com/");
          await waitPageStable(page);
        });

        await test.step("Llenar formulario de credenciales", async () => {
          Logger.step(`Intentando ingresar con usuario ${caso.username}`);
          await page.fill("#user-name", caso.username);
          await page.fill("#password", caso.password);
          await page.click("#login-button");
        });

        if (caso.shouldLogin) {
          await test.step("Validar login exitoso", async () => {
            await waitVisible(page, ".inventory_list");
            await expect(page.locator(".inventory_list")).toBeVisible();
            Logger.info("Login exitoso");
          });
        } else {
          await test.step("Validar mensaje de error", async () => {
            const errorBox = page.locator('[data-test="error"]');
            await waitVisible(page, '[data-test="error"]');
            await expect(errorBox).toBeVisible();
            Logger.warn("Se mostró mensaje de error como se esperaba");
            const lockedCount = await page.getByText("locked").count();
            console.log(lockedCount)
            if (lockedCount > 1) 
              throw "Usuario Bloqueado";
          });
        }
      } catch (err) {
        // Si algo falla, guardamos screenshot como evidencia manual,
        const fileName = `test_error_usuario_bloqueado.png`;
        const filePath = path.join(ARTIFACTS_DIR, fileName);
        const filePathPdf = path.join(process.cwd(), 'artifacts', "Test_usuario_bloqueado.pdf")
        Logger.error("Fallo detectado. Capturando evidencia...", filePath);
        await page.screenshot({ path: filePath, fullPage: true });
       await page.pdf({path:filePathPdf, printBackground:true})
      }
      // Puedes pausar para inspeccionar el DOM en cada iteración si se usa --headed:
      // await page.pause();
    });
  });
}
