import { test } from "@playwright/test";
import { DemoQAPage } from "../../pages/tarea3/DemoQA.page";
import { Logger } from "../../helpers/utils/log.helper";
import { AlertHelper } from "../../helpers/ui/alertHelper";


test.describe("Suite 1: Gestión de diálogos nativos", () => {
  test("Validar interacción con los diferentes tipos de alertas", async ({ page }) => {
    const demoQA = new DemoQAPage(page);

    Logger.info("Inicio del test: Gestión de diálogos nativos");

    await demoQA.openSite();

    // Espera explícita (mejor si sincronizas con el DOM, pero se mantiene por consigna)
    await page.waitForTimeout(2000);

    await demoQA.goToAlertsMenu();

    // ALERTA SIMPLE
    await AlertHelper.handleAlert(page);
    await demoQA.clickAlertButton("simple");

    // ALERTA CON TIMER (5 segundos)
    await AlertHelper.handleAlert(page);
    await demoQA.clickAlertButton("timer");
    Logger.step("Esperando que aparezca la alerta temporizada...");
    await page.waitForTimeout(6000); // espera para asegurar que se dispare
    Logger.info("Alerta temporizada manejada correctamente");

    // ALERTA CONFIRM
    await AlertHelper.handleAlert(page);
    await demoQA.clickAlertButton("confirm");
    await demoQA.validateSelectorVisible("#confirmResult");

    // ALERTA CANCEL
    await AlertHelper.handleAlert(page, undefined, false);
    await demoQA.clickAlertButton("confirm");
    await demoQA.validateSelectorVisible("#confirmResult");

    // ALERTA PROMPT
    await AlertHelper.handleAlert(page, "Grupo 02");
    await demoQA.clickAlertButton("prompt");
    await demoQA.validateSelectorVisible("#promptResult");

    Logger.info("✅ Suite 1 completada exitosamente.");
  });
});