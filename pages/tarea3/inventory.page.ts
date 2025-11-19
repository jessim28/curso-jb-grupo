import type { Locator, Page } from '@playwright/test';

/**
 * Clase que representa la página de inventario en SauceDemo.
 */
export class InventoryPage {
    readonly page: Page;

    readonly usernameInput:           Locator;
    readonly passwordInput:           Locator;
    readonly loginButton:             Locator;
    readonly sortDropdown:            Locator;
    readonly inventoryItems:          Locator;
    readonly cartBadge:               Locator;
    readonly cartLink:                Locator;
    readonly checkoutButton:          Locator;
    readonly firstNameInput:          Locator;
    readonly lastNameInput:           Locator;
    readonly postalCodeInput:         Locator;
    readonly continueButton:          Locator;
    readonly finishButton:            Locator;
    readonly orderConfirmation:       Locator;

    /**
     * Crea una instancia de InventoryPage.
     * @param page - La página de Playwright.
     */
    constructor(page: Page) {
        this.page = page;

        this.usernameInput =          page.locator('#user-name');
        this.passwordInput =          page.locator('#password');
        this.loginButton =            page.locator('#login-button');
        this.sortDropdown =           page.locator('[data-test="product-sort-container"]');
        this.inventoryItems =         page.locator('.inventory_item');
        this.cartBadge =              page.locator('[data-test="shopping-cart-badge"]');
        this.cartLink =               page.locator('a[data-test="shopping-cart-link"]');
        this.checkoutButton =         page.locator('[data-test="checkout"]');
        this.firstNameInput =         page.locator('[data-test="firstName"]');
        this.lastNameInput =          page.locator('[data-test="lastName"]');
        this.postalCodeInput =        page.locator('[data-test="postalCode"]');
        this.continueButton =         page.locator('[data-test="continue"]');
        this.finishButton =           page.locator('[data-test="finish"]');
        this.orderConfirmation =      page.locator('[data-test="complete-header"]');
    }

    /**
     * Navega a la página principal de SauceDemo.
     */
    async navigate(): Promise<void> {
        await this.page.goto('https://www.saucedemo.com/');
    }

    /**
     * Inicia sesión en la aplicación.
     * @param username - Nombre de usuario para iniciar sesión.
     * @param password - Contraseña para iniciar sesión.
     * @example
     * await inventoryPage.login('standard_user', 'secret_sauce');
     */
    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

  /**
   * Ordena el listado según la opción solicitada.
   *
   * @param sort - 'hilo' | 'lohi' | 'az'
   * @example
   * await inventory.sortBy('hilo');
   * @returns Promise<void>
   */
  async sortBy(sort: "hilo" | "lohi" | "az"): Promise<void> {
    const map: Record<string, string> = {
      hilo: "hilo", // price high to low
      lohi: "lohi", // price low to high
      az: "az", // name A->Z
    };
    const value = map[sort] as string;
    console.log(`Ordenando por: ${sort}`);
    await this.sortDropdown.selectOption(value);
  }

  /**
   * Compatibilidad con el nombre usado en el spec: sortProducts
   * @param sortValue - valor del select ('hilo'|'lohi'|'az')
   */
  async sortProducts(SortOption: "hilo" | "lohi" | "az"): Promise<void> {
    await this.sortBy(SortOption);
  }

    /**
     * Agrega un producto al carrito según el índice proporcionado.
     * @param index - Índice del producto a agregar.
     */
    async addToCart(index: number): Promise<void> {
        await this.inventoryItems.nth(index).getByRole('button', { name: 'Add to cart' }).click();
    }

    /**
     * Obtiene el número de productos en el carrito.
     * @returns El número de productos en el carrito.
     */
    async getCartCount(): Promise<number> {
        if (await this.cartBadge.count() === 0) {
            return 0;
        }

        const badgeText = await this.cartBadge.textContent();
        return badgeText ? parseInt(badgeText, 10) : 0;
    }

    /**
     * Abre el carrito de compras.
     */
    async goToCart(): Promise<void> {
        await this.cartLink.click();
    }

    /**
     * Hace clic en el botón de checkout.
     */
    async checkout(): Promise<void> {
        await this.checkoutButton.click();
    }

    /**
     * Llena el formulario de checkout y continúa con la compra.
     * @param firstName - Nombre del cliente.
     * @param lastName - Apellido del cliente.
     * @param postalCode - Código postal del cliente.
     */
    async fillCheckoutForm(): Promise<void> {
        await this.firstNameInput.fill('Jessica Pedro');
        await this.lastNameInput.fill('Angel Wilmer');
        await this.postalCodeInput.fill('123456');
        await this.continueButton.click();
    }

    /**
     * Finaliza la compra y espera la confirmación.
     */
    async finishPurchase(): Promise<void> {
        await this.finishButton.click();
        await this.orderConfirmation.waitFor();
    }
}
