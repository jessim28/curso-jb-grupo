import type { Page } from "@playwright/test";
import { Logger } from "./log.helper";

const DEFAULT_SESSION_PATH = "auth/suite2.session.json";
/**
* Guarda el estado actual (cookies, localStorage, etc.) del contexto de la página en un archivo JSON.
* @param page - Instancia del test (navegador)
* @param filePath - Ruta de almacenamiento en string
*/
export async function saveSession(page: Page, filePath: string = DEFAULT_SESSION_PATH): Promise<void> {
  Logger.step(`Guardando sesión en ${filePath}`);
  await page.context().storageState({ path: filePath });
}