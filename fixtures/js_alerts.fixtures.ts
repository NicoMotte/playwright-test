import { test as base, expect } from "@playwright/test";
import { JavaScriptAlertsPage } from "../pages/js_alerts.page";

type MyFixtures = {
  javaScriptAlertsPage: JavaScriptAlertsPage;
};

export const test = base.extend<MyFixtures>({
  javaScriptAlertsPage: async ({ page }, use) => {
    const alertsPage = new JavaScriptAlertsPage(page);
    await alertsPage.goto();
    await use(alertsPage);
  },
});

export { expect };
