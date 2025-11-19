import type { Page } from '@playwright/test';
import { Logger } from '../utils/log.helper';
import { waitPageStable, waitVisible } from '../utils/wait.helper';
/**
* Agrega los primeros N productos visibles al carrito en 
SauceDemo.
*/
export async function addFirstNProductsToCart(page: Page, n:number) {
  Logger.step(`Agregando ${n} productos al carrito...`);

  // Aseguramos que la página esté ya estable antes de interactuar
  await waitPageStable(page);

  const addButtons = page.locator('.inventory_item button');
  
  for (let i = 0; i < n; i++) {
    Logger.debug(`Click en producto #${i + 1}`);
    await addButtons.nth(i).click();
  }
}

/**
* Navega al carrito.
*/
export async function goToCart(page: Page) {
  Logger.step('Navegando al carrito');
  await page.goto('https://www.saucedemo.com/cart.html');
  await waitVisible(page, '.cart_item');
}