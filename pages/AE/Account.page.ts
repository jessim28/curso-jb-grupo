import { expect, Locator, Page } from "@playwright/test";
import { waitPageStable, waitVisible } from "../../helpers/utils/wait.helper";


export class AccountPage {
  readonly page:Page;
  readonly logeedAs:      Locator;
  readonly logoutLink:    Locator;

  constructor(page: Page){
    this.page = page;
    this.logeedAs =       page.locator('li').filter({hasText: 'Logged in as'});
    this.logoutLink =     page.getByRole('link', {name: 'Logout'});
  }

  async assertLoggedIn(){
    await waitVisible(this.page, this.logeedAs);
  }

  async logout(){
    await this.logoutLink.click();
    await waitPageStable(this.page);
    await expect(this.page).toHaveURL(/login/);
  }

}