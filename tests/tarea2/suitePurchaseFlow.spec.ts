import { expect, test } from "@playwright/test";
import { PurchaseFlowPage } from "../../pages/tarea2/PurchaseFlow.page";

const STORAGE_FILE1 = 'auth/storageState.json';

test.describe.serial("Suite 1: Compra de productos", async () => {
  
  test("Flujo de compra agregar productos y validar carrito", async ({ page }) => {
    // Inicializar la clase PurchaseFlowPage
    const purchaseFlowPage = new PurchaseFlowPage(page);
    
    // 1. Navegar a la página de login
    await purchaseFlowPage.navigateToLogin();

    // 2. Realizar login con credenciales válidas
    await purchaseFlowPage.login("standard_user", "secret_sauce");

    // 3. Ordenar productos de mayor a menor precio
    await purchaseFlowPage.sortProduct();

    // 4. Validar que estamos en la página de inventario
    await expect(page).toHaveURL(/inventory.html/);
    const inventoryList = page.locator(".inventory_list");
    await expect(inventoryList).toBeVisible();

    // 5. Agregar productos al carrito
    await purchaseFlowPage.addinvetory();

    // 6. Ir al carrito y validar los productos agregados
    await purchaseFlowPage.validateCart();

    // 7. Iniciar el proceso de checkout
    await purchaseFlowPage.clickCheckout();

    // 8. cerrar sesison
    await purchaseFlowPage.logout();

    // 9. Guardar storageState para reutilizar sesión en otros tests
    await page.context().storageState({ path: STORAGE_FILE1 });
    console.log("Carrito con 3 productos guardado en", STORAGE_FILE1);
  });

});

test.describe.serial("Suite 2: Modificar carrito y finalizar compra", async () => {

 test.use({ storageState: STORAGE_FILE1 });

  test("Flujo de compra agregar eliminar produtcto y completar compra", async ({ page }) => {
    // Inicializar la clase PurchaseFlowPage
    const purchaseFlowPage = new PurchaseFlowPage(page);

    // 1. Navegar a la página de login
    await purchaseFlowPage.navigateToLogin();

    // 2. Realizar login con credenciales válidas
    await purchaseFlowPage.login("standard_user", "secret_sauce");

    // 3. Ordenar productos de mayor a menor precio
    await purchaseFlowPage.sortProduct();

    // 4. Validar que estamos en la página de inventario
    await expect(page).toHaveURL(/inventory.html/);
    const inventoryList = page.locator(".inventory_list");
    await expect(inventoryList).toBeVisible();

    // 5. Ir al carrito y validar los productos agregados
    await purchaseFlowPage.validateCart();

    // 6. Eliminar un producto del carrito
    await purchaseFlowPage.removeInventory();

    // 7. Validar el carrito después de eliminar un producto
    await purchaseFlowPage.validateCartAfterRemove();
    
    // 8. Iniciar el proceso de checkout
    await purchaseFlowPage.clickCheckout();

    // 9. Completar la información del comprador
    await purchaseFlowPage.informationCheckout("Jessica Wilmer", "Pedro Angel", "00001");

    // 10. Validar la página de resumen y finalizar la compra
    await purchaseFlowPage.summaryTotal();

    // 11. Validar la página de confirmación de compra
    await purchaseFlowPage.orderConfirmationC();

    // 12. cerrar sesison
    await purchaseFlowPage.logout();
  });
  
});