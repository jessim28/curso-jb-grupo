import type { Locator, Page } from "@playwright/test";
/**
 * Espera a que un selector exista y sea visible.
 * Útil cuando queremos estar 100% seguros de que la vista terminó 
 * de cargar.
 */
export async function waitVisible(page: Page, selector: string | Locator, timeout = 15000) {
  if (typeof selector === "string")
    await page.waitForSelector(selector, { state: "visible", timeout });
  else 
    await selector.waitFor({ state: "visible", timeout });
}
/**
 * Espera a que la página se encuentre en un estado "estable":
 * - Se cargó el DOM
 * - No hay más requests de red activas
 */
export async function waitPageStable(page: Page) {
  // domcontentloaded -> HTML parseado
  await page.waitForLoadState("domcontentloaded");
  // networkidle -> no hay requests pendientes
  // await page.waitForLoadState("networkidle");
}
