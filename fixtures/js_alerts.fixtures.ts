import { test as base } from "@playwright/test";
import { JavaScriptAlertsPage } from "../pages/js_alerts.page";

type MyFixtures = {
  javaScriptAlertsPage: JavaScriptAlertsPage;
};

export const test = base.extend<MyFixtures>({
  javaScriptAlertsPage: async ({ page }, use) => {
    const javaScriptAlertsPage = new JavaScriptAlertsPage(page);
    await javaScriptAlertsPage.goto();
    await use(javaScriptAlertsPage);
  },
});

export { expect } from "@playwright/test";

// Actually, it is not such a good idea to use fixtures and classes for this test.
