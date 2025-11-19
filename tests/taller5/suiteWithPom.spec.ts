import test, { expect } from "@playwright/test";
import { Logger } from "../../helpers/utils/log.helper";
import { waitPageStable, waitVisible } from "../../helpers/utils/wait.helper";
import { FirstSuiteLoginPage } from "../../pages/FirstSuiteLogin.page";

test.describe("Taller 5: Suite 1: Login con helpers y POM", () => {
  test.beforeEach(async () => {
    Logger.start("TEST");
  });
  test.afterEach(async () => {
    Logger.end();
  });

  test("Login exitoso con trazabilidad de pasos", async ({ page }) => {
    const loginPage = new FirstSuiteLoginPage(page);
    Logger.info("Abrir home y navegar al login");

    await loginPage.open();

    await waitPageStable(page);

    await loginPage.navigateToLogin();

    Logger.info("Intentar login valido");
    await loginPage.login("tomsmith", "SuperSecretPassword!");
    Logger.step("Esperar área segura que se encuentre visible");
    await waitVisible(page, "h2");

    const headingSecure = page.getByRole("heading", { name: "Secure Area", exact: true });

    await expect(headingSecure).toBeVisible();

    await expect(loginPage.flashMessage).toHaveText(/You logged into a secure area/);

    Logger.info("Autentificación exitosa");

    const logoutButton = page.getByRole("link", { name: "Logout" });

    await expect(logoutButton).toBeVisible();

    Logger.info("Realizar logout");

    await logoutButton.click();

    await expect(page).toHaveURL(/login/);
  });

  test("Login invalido con trazabilidad", async ({ page }) => {
    const loginPage = new FirstSuiteLoginPage(page);

    Logger.info("Navegar al login");

    await loginPage.open();
    await loginPage.navigateToLogin();
    await waitVisible(page, "#username");

    Logger.warn("Probando credencial inválida");
    await loginPage.login("user", "123");

    //Mensaje de error esperado
    Logger.info("Validar mensaje de error");
    await expect(loginPage.flashMessage).toHaveText(/invalid/);
  });
});
