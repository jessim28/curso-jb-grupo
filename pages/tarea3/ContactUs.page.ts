import { Locator, Page, expect } from "@playwright/test";
import path from "path";
import { Logger } from "../../helpers/utils/log.helper";

/**
 * **ContactUsPage**
 *
 * Página que representa el flujo de contacto en [Automation Exercise](https://automationexercise.com/).
 * Esta clase maneja las acciones principales como navegar al formulario,
 * completar datos, subir archivos y validar la confirmación del envío.
 *
 * const contactPage = new ContactUsPage(page);
 * await contactPage.navigate();
 * await contactPage.goToContactUs();
 * await contactPage.fillFormRandomData();
 * await contactPage.uploadFile();
 * await contactPage.submitForm();
 * await contactPage.validateSuccessMessage();
 * ```
 */
export class ContactUsPage {
  readonly page: Page;

  /** Enlace al menú "Contact Us" del sitio */
  readonly menuContactUs:         Locator;
  readonly nameInput:             Locator;
  readonly emailInput:            Locator;
  readonly subjectInput:          Locator;
  readonly messageInput:          Locator;
  readonly uploadFileInput:       Locator;
  readonly submitButton:          Locator;
  readonly successMessage:        Locator;
  readonly messageSuccessfully:   Locator;

  /**
   * Crea una nueva instancia de `ContactUsPage`.
   * @param page - Instancia de Playwright `Page` utilizada para interactuar con la interfaz.
   */
  constructor(page: Page) {
    this.page = page;

    this.menuContactUs =        page.locator("a[href='/contact_us']");
    this.nameInput =            page.locator("input[data-qa='name']");
    this.emailInput =           page.locator("input[data-qa='email']");
    this.subjectInput =         page.locator("input[data-qa='subject']");
    this.messageInput =         page.locator("textarea[data-qa='message']");
    this.uploadFileInput =      page.locator("input[name='upload_file']");
    this.submitButton =         page.locator("input[data-qa='submit-button']");
    this.successMessage =       page.locator("div.status.alert.alert-success");
    this.messageSuccessfully =  page.locator(".status.alert.alert-success");
  }

  /**
   * Navega hacia la página principal de **Automation Exercise**.
   */
  async navigate(): Promise<void> {
    await this.page.goto("https://automationexercise.com/");
    Logger.info("Navegando a Automation Exercise");
  }

  /**
   * Valida que el título de la página contenga el texto esperado.
   * @param expectedTitle - Texto esperado que debe estar contenido en el título.
   */
  async validateTitle(expectedTitle: string): Promise<void> {
    await expect(this.page).toHaveTitle(new RegExp(expectedTitle, "i"));
    Logger.info(`Validado título contiene: ${expectedTitle}`);
  }

  /**
   * Hace clic en el enlace "Contact Us" del menú principal.
   */
  async goToContactUs(): Promise<void> {
    await this.menuContactUs.click();
    Logger.info("Seleccionando opción 'Contact Us'");
  }

  /**
   * Valida que la URL actual contenga un fragmento específico.
   * @param fragment - Texto o expresión que debe encontrarse en la URL actual.
   */
  async validateUrlContains(fragment: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(fragment, "i"));
    Logger.info(`URL contiene: ${fragment}`);
  }

  /**
   * Completa el formulario de contacto con datos generados aleatoriamente.
   * Útil para pruebas de validación de envío.
   */
  async fillFormRandomData(): Promise<void> {
    const randomId = Math.floor(Math.random() * 10000);
    const name = `Usuario${randomId}`;
    const email = `user${randomId}@mail.com`;
    const subject = `Consulta ${randomId}`;
    const message = `Mensaje de prueba automatizado #${randomId}`;

    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.subjectInput.fill(subject);
    await this.messageInput.fill(message);

    Logger.info(`Formulario completado con datos aleatorios: ${name} / ${email}`);
  }

  /**
   * Carga un archivo de prueba desde la carpeta `data/testFile.txt`.
   * Se utiliza para validar la funcionalidad de subida de archivos.
   */
  async uploadFile(): Promise<void> {
    const filePath = path.join(process.cwd(), "data", "testFile.txt");
    await this.uploadFileInput.setInputFiles(filePath);
    Logger.info(`Archivo cargado: ${filePath}`);
  }

  /**
   * Verifica que un archivo haya sido correctamente cargado en el input correspondiente.
   */
  async validateFileUploaded(): Promise<void> {
    const fileInputValue = await this.uploadFileInput.inputValue();
    expect(fileInputValue).not.toBe("");
    Logger.info(`Archivo visible en la página`);
  }

  /**
   * Envía el formulario de contacto y acepta el diálogo de confirmación.
   */
  async submitForm(): Promise<void> {
    this.page.once("dialog", async (dialog) => {
      Logger.info(`Dialog detectado: ${dialog.message()}`);
      await dialog.accept();
    });

    await this.submitButton.click();
    Logger.info("Click en Submit del formulario Contact Us");

    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Valida que el mensaje de éxito se muestre correctamente tras enviar el formulario.
   * Incluye una espera para asegurar que el DOM haya renderizado el mensaje.
   */
  async validateSuccessMessage(): Promise<void> {
    await expect(this.successMessage).toBeVisible({ timeout: 10000 });
    const text = await this.successMessage.textContent();
    Logger.info(`Confirmación mostrada: ${text?.trim()}`);
    await expect(this.successMessage).toHaveText(/success/i);
  }
}
