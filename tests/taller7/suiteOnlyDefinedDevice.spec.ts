import { test, expect } from "@playwright/test";
import { Logger } from "../../helpers/utils/log.helper";
import { waitPageStable } from "../../helpers/utils/wait.helper";
import { CustomDevice, CustomDeviceName } from "../../data/CustomDevices";

test.describe("Taller7 · Emulación solo custom device personalizado", async() => {

  test.beforeEach(() =>{ 
    Logger.start("TEST")
  });

  test.afterEach(() =>{ 
    Logger.end()
  });

  test("Test — solo disponible para custom device", async ({ page, isMobile }) => {
    const projectName = test.info().project.name;
    Logger.debug("Dispositivo actual: ", projectName);

    // Salta inmediatamente si NO es el proyecto requerido
    test.skip(
      projectName !== CustomDeviceName.CustomIphone,
      `Este test sólo corre en "${CustomDeviceName.CustomIphone}". Proyecto actual: "${projectName}".`,
    );

    // Asserts para validar navegador
    const vp = page.viewportSize();
    expect(vp).toBeTruthy();
    expect(vp?.width).toBe(CustomDevice[CustomDeviceName.CustomIphone].viewport.width);
    expect(vp?.height).toBe(CustomDevice[CustomDeviceName.CustomIphone].viewport.height);
    expect(isMobile).toBe(true);

    // Acciones a ejecutar si cumple validación
    await page.goto("https://playwright.dev/");
    await waitPageStable(page);
    
    await expect(page).toHaveTitle(/Playwright/);
    Logger.debug("Viewport:", vp);
  });
});
