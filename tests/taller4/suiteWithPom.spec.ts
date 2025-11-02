import { expect, test } from "@playwright/test";
import { FirstSuiteLoginPage } from "../../pages/FirstSuiteLogin.page";

test.describe("Suite 1: Login con POM y assertions", async () => {
  //test 1: Login exitoso

  test("Login exitoso", async ({ page }) => {
    // Inicializar clase
    const loginPage = new FirstSuiteLoginPage(page);

    // 1. Navegar a la página de login
    //1.1 Ingresar a la pagina raíz
    await loginPage.open();

    //1.2Navegar entre opciones e ingresar al formulario de login
    await loginPage.navigateToLogin();

    // 2. Realizar login con credenciales válidas
    await loginPage.login("tomsmith", "SuperSecretPassword!");

    // 3. Validaciones con assertions
    // 3.1 Título "Secure Area" usando getByRole (selector accesible por rol heading)
    const headingSecure = page.getByRole("heading", { name: "Secure Area", exact: true });

    await expect(headingSecure).toBeVisible();

    // 3.2 Mensaje flash usando toHaveText (regex parcial)
    await expect(loginPage.flashMessage).toHaveText(/You logged into a secure area!/);

    // 3.3 Verificar que salió el botón Logout (selector por texto)
    const logoutButton = page.getByRole("link", { name: "Logout" });
    await expect(logoutButton).toBeVisible();

    // 3.4 Cerrar sesión y asegurar redirección
    await logoutButton.click();
    await expect(page).toHaveURL(/login/);
  });

  //test 2: Login inválido

  test("Login inválido", async ({ page }) => {
    // Inicializar clase
    const loginPage = new FirstSuiteLoginPage(page);

    // 1. Navegar a la página de login www.jbenterprisegroup.com
    await loginPage.open();
    await loginPage.navigateToLogin();

    // 2. Hacer login con credenciales inválidas
    await loginPage.login("usuarioIncorrecto", "claveIncorrecta");

    // 3 Asegurar el fallo de credenciales
    await expect(loginPage.flashMessage).toHaveText(/Your username is invalid!/);
  });
});
