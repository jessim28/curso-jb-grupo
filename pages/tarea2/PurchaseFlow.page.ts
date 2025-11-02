import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";

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

  async navigateToLogin() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async login(user: string, pass: string) {
    await this.usernameInput.fill(user);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }

  async sortProduct() {
    await this.ordenProduct.click();
    await this.ordenProduct.selectOption("hilo");
  }

  async addinvetory() {
    await this.addinventoryList.nth(0).click();
    await this.addinventoryList.nth(1).click();
    await this.addinventoryList.nth(2).click();
  }

  async validateCart() {
    await expect(this.countItemscart).toHaveText("3");
    console.log("3 productos agregados al carrito.");
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/cart.html/);
    await expect(this.cartItems).toHaveCount(3);
    console.log("Validación del carrito exitosa: 3 productos agregados.");
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }

  async removeInventory() {
    await this.removeinventoryList.nth(1).click();
  }

  async validateCartAfterRemove() {
    await expect(this.cartItems).toHaveCount(2);
    console.log("Validación del carrito exitosa: 2 productos agregados después de eliminar uno.");
  }

  async informationCheckout(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async summaryTotal() {
    await expect(this.sumaryTotalLabel).toBeVisible();
    await this.finishButton.click();
  }

  async orderConfirmationC() {
    await expect(this.orderConfirmation).toHaveText("Thank you for your order!");
    console.log("Compra completada exitosamente.");
    await this.homeButton.click();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
    await expect(this.page).toHaveURL(/saucedemo.com/);
    console.log("Cierre de sesión exitoso.");
  }
}

