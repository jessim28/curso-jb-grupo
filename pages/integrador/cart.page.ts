import { Locator, Page, expect } from "@playwright/test";
import { Logger } from "../../helpers/utils/log.helper";

/** Page Object para las acciones del carrito y pago. */
export class CartPage {
  readonly page: Page;

  readonly cart:                Locator;
  readonly cartItems:           Locator;
  readonly cardName:            Locator;
  readonly cardNumber:          Locator;
  readonly cardCSV:             Locator;
  readonly cardEMonth:          Locator;
  readonly cardEYear:           Locator;
  readonly cardSubmit:          Locator;
  readonly btncheckout:         Locator;
  readonly btnplacerOrder:      Locator;

  /**
   * @param page Page de Playwright inyectada por el runner.
   */
  constructor(page: Page) {
    this.page = page;

    this.cart =               page.getByRole('link', { name: ' Cart' });
    this.cartItems =          page.locator('.cart_quantity');
    this.cardName =           page.locator("[name='name_on_card']");
    this.cardNumber =         page.locator("[name='card_number']");
    this.cardCSV =            page.locator("[name='cvc']");
    this.cardEMonth =         page.locator("[name='expiry_month']");
    this.cardEYear =          page.locator("[name='expiry_year']");
    this.cardSubmit =         page.locator("button#submit");
    this.btncheckout =        page.locator(".btn.btn-default.check_out");
    this.btnplacerOrder =     page.locator("a:has-text('Place Order')");

  }

  /** Abre la vista del carrito. */
  async openCart() {
    await this.cart.click();
  }

  /**
   * Valida que la suma de cantidades en el carrito coincida con el esperado.
   * @param expected Total de unidades esperadas.
   */
  async validateItems(expected: number) {
    // Suma las cantidades mostradas en la columna "Quantity" y valida contra el esperado
    await this.cartItems.first().waitFor({ state: "visible" });
    const quantities = await this.cartItems.allTextContents();
    const total = quantities.map(q => Number(q.trim())).reduce((acc, v) => acc + v, 0);

    Logger.debug(`Validando cantidad total en el carrito: esperado=${expected} | encontrado=${total}`);
    expect(total, "Cantidad de items en el carrito").toBe(expected);
  }

  /** Avanza al checkout. */
  async checkout() {
    await this.btncheckout.click();
    Logger.info("Validar el proceso de checkout")
  }

  /** Hace clic en “Place Order”. */
  async placeOrder() {
    await this.btnplacerOrder.click();
  }

  /** Completa el formulario de pago con datos dummy y valida la orden exitosa. */
  async paymentOrder() {
    await this.cardName.fill("Jess Angel Wilmer Pedro");
    await this.cardNumber.fill("4111111111111111");
    await this.cardCSV.fill("123");
    await this.cardEMonth.fill("12");
    await this.cardEYear.fill("2027");
    Logger.info("Ingreso de datos para pago de compra")

    await this.cardSubmit.click();

    await expect(this.page.locator("h2:has-text('Order Placed!')")).toBeVisible();
  }


}
