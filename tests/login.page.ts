import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly flashMessage: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByLabel("Username");
    this.passwordInput = page.getByLabel("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.flashMessage = page.locator("#flash");
    this.logoutLink = page.getByRole("link", { name: "Logout" });
  }

  async goto() {
    await this.page.goto("https://the-internet.herokuapp.com/login");
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async loginAs(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  async expectSuccessfulLogin() {
    await expect(this.page).toHaveURL(/.*secure/);
    await expect(this.flashMessage).toContainText(
      "You logged into a secure area",
    );
  }

  async expectInvalidPassword() {
    await expect(this.flashMessage).toContainText("Your password is invalid");
  }

  async logout() {
    await this.logoutLink.click();
  }

  async expectLoggedOut() {
    await expect(this.flashMessage).toContainText(
      "You logged out of the secure area!",
    );
  }
}
