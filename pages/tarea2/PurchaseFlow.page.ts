import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";

/**
 * Page Object que encapsula el flujo completo de compra en Saucedemo,
 * desde el login hasta el cierre de sesión.
 */
export class PurchaseFlowPage {
  readonly page: Page;

  readonly usernameInput:           Locator;
  readonly passwordInput:           Locator;
  readonly loginButton:             Locator;
  readonly flashMessage:            Locator;
  readonly ordenProduct:            Locator;
  readonly addinventoryList:        Locator;
  readonly cartLink:                Locator;
  readonly cartItems:               Locator;
  readonly countItemscart:          Locator;
  readonly checkoutButton:          Locator;
  readonly removeinventoryList:     Locator;
  readonly menuButton:              Locator;
  readonly logoutLink:              Locator;
  readonly firstNameInput:          Locator;
  readonly lastNameInput:           Locator;
  readonly postalCodeInput:         Locator;
  readonly continueButton:          Locator;
  readonly sumaryTotalLabel:        Locator;
  readonly finishButton:            Locator;
  readonly orderConfirmation:       Locator;
  readonly homeButton:              Locator;

  /**
   * @param page Instancia de Playwright que se reutilizará en todo el flujo.
   */
  constructor(page: Page) {
    this.page = page;

    // Selectores CSS
    this.usernameInput =            page.locator("#user-name");
    this.passwordInput =            page.locator('[data-test="password"]');
    this.loginButton =              page.locator('[data-test="login-button"]');
    this.flashMessage =             page.locator("#flash");
    this.ordenProduct =             page.locator('[data-test="product-sort-container"]');
    this.addinventoryList =         page.getByRole("button", { name: "Add to cart" });
    this.cartLink =                 page.locator('[data-test="shopping-cart-badge"]');
    this.cartItems =                page.locator('[data-test="inventory-item"]');
    this.countItemscart =           page.locator('[data-test="shopping-cart-badge"]');
    this.checkoutButton =           page.locator("#checkout");
    this.removeinventoryList =      page.getByRole("button", { name: "Remove" });
    this.menuButton =               page.locator("#react-burger-menu-btn");
    this.logoutLink =               page.locator("#logout_sidebar_link");
    this.firstNameInput =           page.locator('[data-test="firstName"]');
    this.lastNameInput =            page.locator('[data-test="lastName"]');
    this.postalCodeInput =          page.locator('[data-test="postalCode"]');
    this.continueButton =           page.locator('[data-test="continue"]');
    this.sumaryTotalLabel =         page.locator(".summary_total_label");
    this.finishButton =             page.locator('[data-test="finish"]');
    this.orderConfirmation =        page.locator(".complete-header");
    this.homeButton =               page.locator('[data-test="back-to-products"]');
  }

  /**
   * Abre la página principal de Saucedemo.
   */
  async navigateToLogin() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  /**
   * Autentica un usuario válido con las credenciales proporcionadas.
   * @param user Usuario que se ingresará en el formulario.
   * @param pass Contraseña asociada al usuario.
   */
  async login(user: string, pass: string) {
    await this.usernameInput.fill(user);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }

  /**
   * Cambia el orden del listado de productos empleando el combo de sort.
   */
  async sortProduct() {
    await this.ordenProduct.click();
    await this.ordenProduct.selectOption("hilo");
  }

  /**
   * Agrega los tres primeros productos disponibles al carrito.
   */
  async addinvetory() {
    await this.addinventoryList.nth(0).click();
    await this.addinventoryList.nth(1).click();
    await this.addinventoryList.nth(2).click();
  }

  /**
   * Valida la cantidad de productos en badge y detalle del carrito antes de pagar.
   */
  async validateCart() {
    await expect(this.countItemscart).toHaveText("3");
    console.log("3 productos agregados al carrito.");
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/cart.html/);
    await expect(this.cartItems).toHaveCount(3);
    console.log("Validación del carrito exitosa: 3 productos agregados.");
  }

  /**
   * Avanza al flujo de checkout desde el carrito.
   */
  async clickCheckout() {
    await this.checkoutButton.click();
  }

  /**
   * Elimina un producto específico del carrito antes de pagar.
   */
  async removeInventory() {
    await this.removeinventoryList.nth(1).click();
  }

  /**
   * Confirma que solo queden dos productos después de la eliminación.
   */
  async validateCartAfterRemove() {
    await expect(this.cartItems).toHaveCount(2);
    console.log("Validación del carrito exitosa: 2 productos agregados después de eliminar uno.");
  }

  /**
   * Completa el formulario de envío del checkout con datos de prueba.
   * @param firstName Nombre del cliente.
   * @param lastName Apellido del cliente.
   * @param postalCode Código postal del cliente.
   */
  async informationCheckout(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    console.log("Información de checkout completada.", firstName, lastName, postalCode);
    await this.continueButton.click();
  }

  /**
   * Valida que el resumen total se muestre y finaliza la compra.
   */
  async summaryTotal() {
    await expect(this.sumaryTotalLabel).toBeVisible();
    await this.finishButton.click();
  }

  /**
   * Valida el mensaje de confirmación y regresa al listado de productos.
   */
  async orderConfirmationC() {
    await expect(this.orderConfirmation).toHaveText("Thank you for your order!");
    console.log("Compra completada exitosamente.");
    await this.homeButton.click();
  }

  /**
   * Abre el menú hamburguesa y cierra la sesión activa.
   */
  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
    await expect(this.page).toHaveURL(/saucedemo.com/);
    console.log("Cierre de sesión exitoso.");
  }
}
