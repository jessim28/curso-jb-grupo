import { expect, test } from "@playwright/test";
import * as path from "node:path";
import { Logger } from "../../helpers/utils/log.helper";
import { waitPageStable, waitVisible } from "../../helpers/utils/wait.helper";

test.describe("Taller 6 - Diálogos JS y Upload de archivos", () => {
  
  test.beforeAll( async ()=> {
    Logger.start('SUITE')
  });

  test.beforeEach(async () => {
    Logger.start('TEST');
  });

  test.afterEach(async () => {
    Logger.end();
  });

  test("Capturar alert/confirm/prompt", async ({ page }) => {
    Logger.info("Inicio del test de capture de dialogos")
    await test.step("Ir a página de alerts demo", async () => {
      await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
      await waitPageStable(page);
    });

    // Escuchamos cualquier diálogo JS que aparezca
    page.on("dialog", async (dialog) => {
      Logger.debug(`Dialog detectado: ${dialog.type()} | ${dialog.message()}`);

      if (dialog.type() === "prompt") {
        await dialog.accept("Hola desde Playwright");
      } else if (dialog.type() === "confirm") {
        // Podríamos cancelar:
        await dialog.dismiss();
      } else {
        // alert normal => aceptar
        await dialog.accept();
      }
    });

    // 1. Alert
    await test.step("Probar botón JS Alert", async () => {
      await page.click("text=Click for JS Alert");
      await expect(page.locator("#result")).toHaveText("You successfully clicked an alert");
    });

    // 2. Confirm
    await test.step("Probar botón JS Confirm", async () => {
      await page.click("text=Click for JS Confirm");
      // Como hicimos dismiss() arriba, la página mostrará "You clicked: Cancel"
      await expect(page.locator("#result")).toHaveText("You clicked: Cancel");
    });

    // 3. Prompt
    await test.step("Probar botón JS Prompt", async () => {
      await page.click("text=Click for JS Prompt");
      // Aceptamos con 'Hola desde Playwright'
      await expect(page.locator("#result")).toHaveText("You entered: Hola desde Playwright");
    });
  });
  
  test("Subida de archivo (file upload)", async ({ page }) => {
    await test.step("Abrir página de upload demo", async () => {
      await page.goto("https://the-internet.herokuapp.com/upload");
      await waitPageStable(page);
    });
    // Creamos un archivo en data con nombre demo-upload.txt.
    const filePath = path.join(process.cwd(), "data", "demo-upload.txt");
    
    await test.step("Seleccionar archivo y hacer submit", async () => {
      // input type="file" tiene id="file-upload"
      await page.setInputFiles("#file-upload", filePath);
      // botón "Upload"
      await page.click("#file-submit");
    });
    await test.step("Validar que el archivo fue aceptado", async () => {
      await waitVisible(page, "#uploaded-files");
      await expect(page.locator("#uploaded-files")).toHaveText("demo-upload.txt");
    });
  });
  test.afterAll( async () => {
    Logger.end('====== FIN DEL SUITE =====')
  })
});
