import { Page } from "@playwright/test";
import { Logger } from "../utils/log.helper";

/**
 * Helper utilitario para gestionar los diferentes tipos de **diálogos nativos**
 * del navegador (alert, confirm, prompt) dentro de los flujos automatizados
 * de Playwright.
 *
 * Este helper centraliza la lógica para aceptar o cancelar alertas según
 * el tipo de diálogo y permite ingresar texto en los prompts.
 *
 * Ejemplo de uso:
 * ```ts
 * // Aceptar confirm
 * await AlertHelper.handleAlert(page);
 * await demoQA.clickAlertButton("confirm");
 *
 * // Cancelar confirm
 * await AlertHelper.handleAlert(page, undefined, false);
 * await demoQA.clickAlertButton("confirm");
 *
 * // Aceptar prompt con texto
 * await AlertHelper.handleAlert(page, "Grupo 03", true);
 * await demoQA.clickAlertButton("prompt");
 * ```
 */

export class AlertHelper {
 /**
   * Maneja los diferentes tipos de diálogos nativos del navegador.
   *
   * @param page - Instancia actual de la página de Playwright.
   * @param inputText - (Opcional) Texto que se enviará en los diálogos tipo `prompt`.
   * @param accept - (Opcional) Determina la acción sobre el diálogo:
   *  - `true` → Aceptar el diálogo (por defecto)
   *  - `false` → Cancelar el diálogo (solo aplicable a `confirm` y `prompt`)
   *
   * @example
   * ```ts
   * // Ejemplo: aceptar confirmación
   * await AlertHelper.handleAlert(page);
   *
   * // Ejemplo: cancelar confirmación
   * await AlertHelper.handleAlert(page, undefined, false);
   *
   * // Ejemplo: ingresar texto en prompt y aceptar
   * await AlertHelper.handleAlert(page, "Grupo 02");
   * ```
   */
  static async handleAlert(page: Page, inputText?: string, accept: boolean = true) {
    page.once("dialog", async (dialog) => {
      const type = dialog.type();
      Logger.info(`Apareció un diálogo tipo: ${type}`);

      try {
        if (type === "prompt") {
          if (accept && inputText) {
            await dialog.accept(inputText);
            Logger.step(`Ingresó texto en prompt: ${inputText}`);
          } else if (!accept) {
            await dialog.dismiss();
            Logger.step("Prompt cancelado por el usuario");
          } 
        } else if (type === "confirm") {
          if (accept) {
            await dialog.accept();
            Logger.step("Confirmar dialogo aceptado");
          } else {
            await dialog.dismiss();
            Logger.step("Confirmar dialogo cancelado");
          }
        } else {
          // Tipo alert (sin cancelar posible)
          await dialog.accept();
          Logger.step("Alerta aceptada");
        }
      } catch (error) {
        Logger.error(`Error manejando diálogo tipo ${type}: ${(error as Error).message}`);
      }
    });
  }
}