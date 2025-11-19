import { Page, expect } from "@playwright/test";
import { Logger } from "../../helpers/utils/log.helper";

/**
 * **DemoQAPage**
 *
 * Clase que modela las interacciones con el sitio [DemoQA](https://demoqa.com),
 * específicamente para el módulo **Alerts, Frame & Windows**.
 *
 * Contiene métodos para navegar al sitio, acceder al submenú de alertas,
 * disparar diferentes tipos de alertas y validar la visibilidad de elementos.
 *
 * const demoPage = new DemoQAPage(page);
 * await demoPage.openSite();
 * await demoPage.goToAlertsMenu();
 * await demoPage.clickAlertButton("prompt");
 * await demoPage.validateSelectorVisible("#alertButton");
 * ```
 */
export class DemoQAPage {
  /**
   * Crea una nueva instancia de `DemoQAPage`.
   * @param page - Instancia de Playwright `Page` que representa la pestaña actual del navegador.
   */
  constructor(private page: Page) {}

  /**
   * Navega al sitio principal **DemoQA** y valida el título de la página.
   *
   * @remarks
   * Este método utiliza `Logger` para registrar pasos y `expect` para verificar
   * que el título sea **"DEMOQA"**.
   *
   * await demoPage.openSite();
   * ```
   */
  async openSite(): Promise<void> {
    Logger.step("Navegando a https://demoqa.com...");
    await this.page.goto("https://demoqa.com");
    await expect(this.page).toHaveTitle("DEMOQA");
    Logger.info("Título de la página validado correctamente");
  }

  /**
   * Accede al menú lateral **Alerts, Frame & Windows** y luego selecciona el submenú **Alerts**.
   *
   * @remarks
   * Este método realiza dos clics secuenciales:
   * - Primero sobre el encabezado `"Alerts, Frame & Windows"`
   * - Luego sobre el submenú `"Alerts"`
   *
   * await demoPage.goToAlertsMenu();
   * ```
   */
  async goToAlertsMenu(): Promise<void> {
    Logger.step("Accediendo al menú Alerts, Frame & Windows...");
    await this.page.locator("//h5[text()='Alerts, Frame & Windows']").click();
    await this.page.locator("//span[text()='Alerts']").click();
    Logger.info("Submenú 'Alerta' abierta correctamente");
  }

  /**
   * Hace clic en uno de los botones de alerta disponibles en la página.
   *
   * @param type - Tipo de alerta a ejecutar:
   *  - `"simple"`: Lanza una alerta inmediata (`#alertButton`)
   *  - `"timer"`: Lanza una alerta con retardo (`#timerAlertButton`)
   *  - `"confirm"`: Lanza un cuadro de confirmación (`#confirmButton`)
   *  - `"cancel"`: Lanza un cuadro de cancelación (`#cancelButton`)
   *  - `"prompt"`: Lanza un cuadro de entrada de texto (`#promtButton`)
   *
   * await demoPage.clickAlertButton("confirm");
   * ```
   */
  async clickAlertButton(type: "simple" | "timer" | "confirm" | "cancel" | "prompt"): Promise<void> {
    const selectors = {
      simple: "#alertButton",
      timer: "#timerAlertButton",
      confirm: "#confirmButton",
      cancel: "#cancelButton",
      prompt: "#promtButton",
    };

    Logger.step(`Ejecutando acción sobre botón ${type.toUpperCase()}`);
    await this.page.locator(selectors[type]).click();
  }

  /**
   * Valida que un selector CSS o XPath sea visible en el DOM.
   *
   * @param selector - Selector del elemento a verificar (por ejemplo: `#alertButton` o `"//div[@id='alert']"`).
   *
   * await demoPage.validateSelectorVisible("#confirmButton");
   * ```
   */
  async validateSelectorVisible(selector: string): Promise<void> {
    Logger.step(`Validando visibilidad del selector: ${selector}`);
    await expect(this.page.locator(selector)).toBeVisible();
    Logger.info(`${selector} visible correctamente`);
  }
}
