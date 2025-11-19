import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../pages/tarea3/inventory.page';
import { InventoryCases } from '../../data/inventoryCases';
import { log } from '../../helpers/utils/tracing';

/**
 * Este archivo contiene las pruebas automatizadas que siguen el flujo de selección de productos
 * en la página de SauceDemo utilizando un enfoque de data-driven.
 */

const Credentials = {
  username: process.env.TEST_USERNAME || 'standard_user',
  password: process.env.TEST_PASSWORD || 'secret_sauce',
};

test.describe('Tarea3 - Flujo de selección de productos (SauceDemo)', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    await inventoryPage.navigate();
    await inventoryPage.login(Credentials.username, Credentials.password);
    await expect(page).toHaveURL(/.*inventory/);
  });

  // Usamos for..of para crear un test por cada caso (compatible y claro)
  for (const c of InventoryCases) {
    test(`Flujo de selección de productos: ${c.name}`, async () => {
      log(`Caso: ${c.name} — ordenar: ${c.sort} — pick: ${c.pick.join(',')}`);
      
      // ordenar
      log(`Ordenando productos por: ${c.sort}`)
      await inventoryPage.sortProducts(c.sort);

      // agregar por índices
      for (const idx of c.pick) {
        log(`Agregando productos al carrito: ${idx}`);
        await inventoryPage.addToCart(idx);
      }

      // validar badge
      const badge = await inventoryPage.getCartCount();
      expect(badge).toBe(c.expectedBadge);

      // checkout completo
      log('Completar formulario de checkout');
      await inventoryPage.goToCart();
      await inventoryPage.checkout();
      await inventoryPage.fillCheckoutForm();
      await inventoryPage.finishPurchase();

      log(`Compra finalizada para caso: ${c.name}`);
    });
  }
});
