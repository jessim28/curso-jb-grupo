import { Page } from "@playwright/test";
import fs from "fs";

export const STATE_PATH = "auth/taller8/chromium.session.json";

/** Guarda el estado de sesión del navegador */
export async function saveState(page: Page) {
  await page.context().storageState({ path: STATE_PATH });
}

/** Verifica si existe el archivo de estado */
export function stateExists(): boolean {
  return fs.existsSync(STATE_PATH);
}
