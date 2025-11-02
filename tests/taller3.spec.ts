import test, { expect } from "@playwright/test";

test.describe("Navegación básica", () => {
  
    //1. Navegación con google
    test("Navegar a Google", async ({ page }) => {
      await page.goto("https://www.google.com");

      await expect(page).toHaveTitle(/Google/);
    });

      //2. Navegación con google
    test('Navegación a Youtube', async ({page}) => {
      await page.goto('https://www.youtube.com');

      await expect(page).toHaveTitle(/YouTube/);
    });

  //3. Interactuar con una página
    test.describe("Acciones todo", () => {
      test.beforeEach(async ({ page }) => {
        await page.goto("https://demo.playwright.dev/todomvc/#/");
      });

      test("Agregar 3 ToDo y contar elementos", async ({ page }) => {
        
        //Primer elemento
        await page.fill(".new-todo", "Comprar leche");
        await page.keyboard.press("Enter");

        //Segundo elemento
        await page.fill(".new-todo", "Pagar luz");
        await page.keyboard.press("Enter");

        //Tercer elemento
        await page.fill(".new-todo", "Llamar a mamá");
        await page.keyboard.press("Enter");

        const elements = page.locator(".todo-list li");

        const numElement = await elements.count();

        console.log("Elementos ingresados:", numElement);

        const toDosTexts = await elements.allInnerTexts();

        console.log("Textos Ingresados:", toDosTexts);
        
      });
    
      test('Completar el primer y último todo y filtrar "Completed"', async ({ page }) => {
        const input = page.locator(".new-todo");
        for (const t of ["Uno", "Dos", "Tres"]) {
        await input.fill(t);
        await page.keyboard.press("Enter");
        }

        // Completar todos
        await page.click(".todo-list li:first-child .toggle");
        await page.click(".todo-list li:last-child .toggle");

        // Filtrar
        await page.click(".filters li:nth-child(3) a");

        const completedItems = page.locator(".todo-list li");
        const completedCount = await completedItems.count();
        console.log("Completados:", completedCount); 

        const completedTexts = await page.locator(".todo-list li label").allInnerTexts()
        console.log("Textos completados:", completedTexts);
      });

  });
});