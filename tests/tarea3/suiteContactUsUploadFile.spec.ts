import { test } from "@playwright/test";
import { ContactUsPage } from "../../pages/tarea3/ContactUs.page";
import { Logger } from "../../helpers/utils/log.helper";

/**
 * Escenario end-to-end que valida el flujo completo del formulario
 * "Contact Us" en Automation Exercise, incluyendo:
 * 1) navegación y verificación de título/URL;
 * 2) llenado del formulario con datos aleatorios;
 * 3) carga y validación de un archivo adjunto; y
 * 4) envío del formulario con confirmación del mensaje de éxito.
 */
test("Suite 1 - Carga de archivo y envío de formulario", async ({ page }) => {
  const contactPage = new ContactUsPage(page);

  Logger.info("Inicio del test: Gestión de carga de archivo y formulario");

  // Paso 1: validar que estamos en el sitio correcto.
  await contactPage.navigate();
  await contactPage.validateTitle("Automation Exercise");

  // Paso 2: abrir la sección de contacto y asegurar la URL.
  await contactPage.goToContactUs();
  await contactPage.validateUrlContains("contact_us");

  // Paso 3: completar el formulario con datos randómicos para evitar colisiones.
  await contactPage.fillFormRandomData();

  // Paso 4: subir archivo y verificar que se adjuntó correctamente.
  await contactPage.uploadFile();
  await contactPage.validateFileUploaded();

  // Paso 5: enviar el formulario y confirmar la notificación de éxito.
  await contactPage.submitForm();
  await contactPage.validateSuccessMessage();

  Logger.end("✅ Carga de archivo y envío exitoso");
});
