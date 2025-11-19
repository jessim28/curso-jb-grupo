import { expect, type Locator, type Page } from "@playwright/test";
import type { AEUser } from  "../../helpers/utils/user.helper"
import { waitPageStable, waitVisible } from "../../helpers/utils/wait.helper";

export class AuthPage {
  readonly page: Page;

  // ===== SIGNUP FLOW ====
  // Signup form
  readonly signupName:              Locator;
  readonly signupEmail:             Locator;
  readonly signupButton:            Locator;

  // Account form
  readonly password:                Locator;
  readonly firstName:               Locator;
  readonly lastName:                Locator;
  readonly address:                 Locator;
  readonly country:                 Locator;
  readonly state:                   Locator;
  readonly city:                    Locator;
  readonly zipcode:                 Locator;
  readonly mobile:                  Locator;
  readonly createAccountBtn:        Locator;
  readonly accountCreatedTitle:     Locator;
  readonly continueBtn:             Locator;
  
  // ===== LOGIN FLOW ====
  // Login form
  readonly loginEmail:              Locator;
  readonly loginPassword:           Locator;
  readonly loginButton:             Locator;
  readonly loginError:              Locator;

  constructor(page: Page) {
    this.page = page;

    // ===== SIGNUP FLOW ====
    // signup
    this.signupName =           page.locator('[data-qa="signup-name"]');
    this.signupEmail =          page.locator('[data-qa="signup-email"]');
    this.signupButton =         page.locator('[data-qa="signup-button"]');

    // account info
    this.password =             page.locator('[data-qa="password"]');
    this.firstName =            page.locator('[data-qa="first_name"]');
    this.lastName =             page.locator('[data-qa="last_name"]');
    this.address =              page.locator('[data-qa="address"]');
    this.country =              page.locator('[data-qa="country"]');
    this.state =                page.locator('[data-qa="state"]');
    this.city =                 page.locator('[data-qa="city"]');
    this.zipcode =              page.locator('[data-qa="zipcode"]');
    this.mobile =               page.locator('[data-qa="mobile_number"]');
    this.createAccountBtn =     page.locator('[data-qa="create-account"]');
    this.accountCreatedTitle =  page.getByText("ACCOUNT CREATED!");
    this.continueBtn =          page.locator('[data-qa="continue-button"]');

    // ===== LOGIN FLOW ====
    // login
    this.loginEmail =           page.locator('[data-qa="login-email"]');
    this.loginPassword =        page.locator('[data-qa="login-password"]');
    this.loginButton =          page.locator('[data-qa="login-button"]');
    this.loginError =           page.locator(".login-form p"); // "Your email or password is incorrect!"
  }

  async startSignup(name: string, email: string) {
    await waitVisible(this.page, this.signupName);
    await this.signupName.fill(name);
    await this.signupEmail.fill(email);
    await this.signupButton.click();
    await waitPageStable(this.page);
  }

  async completeAccountForm(u: AEUser) {
    await waitVisible(this.page, this.password);
    await this.password.fill(u.password);
    await this.firstName.fill(u.firstName);
    await this.lastName.fill(u.lastName);
    await this.address.fill(u.address);
    await this.country.selectOption({ label: u.country });
    await this.state.fill(u.state);
    await this.city.fill(u.city);
    await this.zipcode.fill(u.zipcode);
    await this.mobile.fill(u.mobile);
    await this.createAccountBtn.click();
    await waitVisible(this.page, this.accountCreatedTitle);
    await this.continueBtn.click();
    await waitPageStable(this.page);
  }

  async login(email: string, password: string) {
    await waitVisible(this.page, this.loginEmail);
    await this.loginEmail.fill(email);
    await this.loginPassword.fill(password);
    await this.loginButton.click();
    await waitPageStable(this.page);
  }

  async assertFailLogin() {
    await expect(this.loginError).toBeVisible();
    await expect(this.loginError).toContainText(/incorrect/i);
  }
}
