import { Page, Locator } from "@playwright/test";

export class JavaScriptAlertsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(
      "https://the-internet.herokuapp.com/javascript_alerts",
    );
  }
}
