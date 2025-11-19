import test, { expect } from "@playwright/test";
import { Logger } from "../../helpers/utils/log.helper";

const STORAGE_FILE = 'auth/suite2.session.json';

// Suite 1: genera la sesión y la guarda en disco
test.describe.serial("Suite 1: Almacenar estado autentificado con helpers", () => {

  test.beforeEach(async () => {
    Logger.start("TEST");
  });
  
  test.afterEach(async () => {
    Logger.end();
  }); 

  test("Login inicial y guardar sesión", async ({ page }) => {

    // 1. Ir al login
    await page.goto("https://www.saucedemo.com/");

    // 2. Ingresar credenciales
    Logger.info("Completando credenciales de usuario estandar");
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");

    // 3. Esperar inventario visible
    Logger.info("Esperando vista de inventario");
    await page.waitForSelector(".inventory_list");
    await expect(page.locator(".inventory_list")).toBeVisible();

    // 4. Guardar sesión logueada en disco
    Logger.info("Guardando sesión autenticada");
    await page.context().storageState({ path: STORAGE_FILE });
    console.log("Sesión inicial guardada en", STORAGE_FILE);
  });
});

// Suite 2: usa la sesión guardada y continua los flujos
test.describe.serial("Suite 2: - Navegación con sesión persistente (carrito y checkout)", () => {
  
    test.use({ storageState: STORAGE_FILE });

  test("Agregar 2 productos al carrito y guardar sesión actualizada", async ({ page, }) => {

    // Navegamos a la pagina de inventario con el estado actualizado
    await page.goto("https://www.saucedemo.com/inventory.html");
    await expect(page.locator(".inventory_list")).toBeVisible();

    // Click en los primeros 2 botones "Add to cart"
    const addButtons = page.locator(".inventory_item button");
    await addButtons.nth(0).click();
    await addButtons.nth(1).click();

    // Badge del carrito debe marcar 2 productos
    const cartBadge = page.locator(".shopping_cart_badge");
    await expect(cartBadge).toHaveText("2");

    // Guardar sesión actualizada
    await page.context().storageState({ path: STORAGE_FILE });
    console.log("Carrito con 2 productos guardado en", STORAGE_FILE);
  });

  test("Finalizar la compra de los productos seleccionados", async ({page,}) => {
    // Navegar a la pagina de checkout
    await page.goto("https://www.saucedemo.com/cart.html");
    const cartItems = page.locator(".cart_item");
    await expect(cartItems).toHaveCount(2);

    // Realizar Checkout
    await page.click("#checkout");
    await page.fill("#first-name", "Carlos");
    await page.fill("#last-name", "Ramirez");
    await page.fill("#postal-code", "00001");
    await page.click("#continue");
    await page.click("#finish");
    
    // Validar mensaje final
    const doneMsg = page.locator(".complete-header");
    await expect(doneMsg).toHaveText("Thank you for your order!");
    await page.context().storageState({ path: STORAGE_FILE });
    console.log("Checkout completado con sesión persistente");
  });
});
