import { Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class SignInPage extends BasePage {
  readonly emailInput = this.page.locator("#emailinput");
  readonly passwordInput = this.page.locator("#passwordinput");
  readonly loginButton = this.page.locator("button[type='submit']");

//   constructor(page: Page) {
//     super(page);
//   }

  async fillCredentials(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async login(email: string, password: string) {
    await this.fillCredentials(email, password);
    await this.clickLogin();
  }
}