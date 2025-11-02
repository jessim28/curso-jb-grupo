import type { Page, Locator } from "@playwright/test";
/**
* Page Object del login de https://theinternet.herokuapp.com/login
** - Encapsula los selectores y las acciones frecuentes (abrir 
página, hacer login).
* - Mantiene los tests organizados y reutilizables.
*/
export class FirstSuiteLoginPage {
  readonly page: Page;
  readonly usernameInput:   Locator;
  readonly passwordInput:   Locator;
  readonly submitButton:    Locator;
  readonly flashMessage:    Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Selectores CSS
    this.usernameInput =    page.locator("#username");
    this.passwordInput =    page.locator("#password");
    this.submitButton =     page.locator('button[type="submit"]');
    this.flashMessage =     page.locator("#flash");
  }

  async open() {
    await this.page.goto("https://the-internet.herokuapp.com");
  }

  async navigateToLogin() {
    await this.page.getByText("Form Authentication").click();
  }
  
  async login(user: string, pass: string) {
    await this.usernameInput.fill(user);
    await this.passwordInput.fill(pass);
    await this.submitButton.click();
  }
}
