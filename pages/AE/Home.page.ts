import type { Page, Locator } from "@playwright/test";
import { waitPageStable, waitVisible } from "../../helpers/utils/wait.helper";


export class HomePage {
  readonly page: Page;
  readonly signupLoginLink:   Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupLoginLink =  page.getByRole("link", { name: "Signup / Login" });
  }

  async open() {
    await this.page.goto("https://automationexercise.com/");
    await waitPageStable(this.page);
  }
  
  async gotoSignupLogin() {
    await waitVisible(this.page, this.signupLoginLink);
    await this.signupLoginLink.click();
  }
}
