import { expect, Locator, Page } from "@playwright/test";
import { Logger } from "../../helpers/utils/log.helper";


/** Page Object para el flujo de productos en Automation Exercise. */
export class ProductsPage {
  readonly page: Page;

  readonly menuProduct:             Locator;
  readonly searchProducts:          Locator;
  readonly btnsearchProduct:        Locator;
  readonly viewProducts:            Locator;
  readonly addProduct:              Locator;
  readonly btnShopping:             Locator;
  readonly filterWomen:             Locator;
  readonly itemTops:                Locator;
  readonly womenCollapse:           Locator;
  readonly productWomen:            Locator;
  readonly itemAddTops:             Locator;

  /**
   * @param page Page de Playwright inyectada por el runner.
   */
  constructor(page: Page) {
    this.page = page;

    this.menuProduct =              page.getByRole('link', { name: ' Products' });
    this.searchProducts =           page.getByRole('textbox', { name: 'Search Product' });
    this.btnsearchProduct =         page.locator('#submit_search');
    this.viewProducts =             page.locator('.productinfo.text-center');
    this.addProduct =               page.locator("a:has-text('Add to cart')");
    this.btnShopping =              page.locator("button:has-text('Continue Shopping')");
    this.filterWomen =              page.getByRole('link', { name: ' Women' });
    this.itemTops =                 page.locator('a[href="/category_products/2"]');
    this.womenCollapse =            page.locator('#Women'); // Contenedor de subcategorías de Women
    this.productWomen =             page.locator('.productinfo.text-center');
    this.itemAddTops =              page.getByRole('heading', { name: 'Rs.' });
  }

  /** Navega al listado de productos. */
  async goToProducts(){
    await this.menuProduct.click();
    Logger.info("Seleccionando opción 'Products'");
  }

  /** Busca jeans desde el buscador de productos. */
  async searchProduct() {
    await this.searchProducts.fill("Jean");
    await this.btnsearchProduct.click();
    Logger.info("Se busca los Jeans")
  }

  /**
   * Agrega dos jeans al carrito (usa el primer resultado).
   * Se asume que hay al menos dos productos disponibles.
   */
  async addTwoJeans() {
    const amountToAdd = 2;

    await this.viewProducts.first().waitFor();

    for (let added = 0; added < amountToAdd; added++) {
      await this.addProduct.first().click();
      await this.btnShopping.click();
    }
    Logger.info("Se agregan los productos")
  }

  /**
   * Abre el detalle del producto según índice.
   * @param index Posición del producto en la lista.
   */
  async validateProduct(index: number) {
    await this.page.locator(".choose a").nth(index).click();
  }

  /** Filtra productos por la categoría Women → Tops. */
  async filterProductWomen() {
    await expect(this.filterWomen).toBeVisible();
    await this.filterWomen.scrollIntoViewIfNeeded();
    await this.filterWomen.click();
    await this.womenCollapse.waitFor({ state: "visible" }); // Asegura que se desplegó el acordeón
    Logger.info("Se ingresa a los items de women");
    await this.itemTops.waitFor({ state: "visible" });
    await this.itemTops.click();
    Logger.info("Se ingresa al Item de Tops");
  }

  /** Agrega dos artículos de la categoría Women Tops al carrito. */
  async itemsWomenTops() {
    await this.productWomen.first().scrollIntoViewIfNeeded();
    Logger.info("Clic sobre los productos de mujer");

    // El título flotante de la sección puede tapar los botones; desplazamos un poco y forzamos el click
    const firstAdd = this.itemAddTops.nth(1);
    await firstAdd.scrollIntoViewIfNeeded();
    await this.page.mouse.wheel(0, 150);
    await firstAdd.click({ force: true });
    await this.page.getByRole('link', { name: ' Add to cart' }).nth(1).click();
    Logger.info("Ingreso del primer articulo de mujer")
    await this.btnShopping.click();

    const secondAdd = this.itemAddTops.nth(5);
    await secondAdd.scrollIntoViewIfNeeded();
    await this.page.mouse.wheel(0, 150);
    await secondAdd.click({ force: true });
    await this.page.getByRole('link', { name: ' Add to cart' }).nth(5).click();
    Logger.info("Ingreso del segundo articulo de mujer")
    await this.btnShopping.click();

  }


}
