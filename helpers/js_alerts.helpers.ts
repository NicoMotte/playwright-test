import { expect, Page } from "@playwright/test";
import { JavaScriptAlertsPage } from "../pages/js_alerts.page";

type DialogOptions = {
  expectedMessage: string;
  action: "accept" | "dismiss";
  buttonName: string;
  expectedResult: string;
  promptText?: string;
};

// Utility function for JavaScript dialogs
export async function handleDialog(
  javaScriptAlertsPage: JavaScriptAlertsPage,
  options: DialogOptions,
) {
  const { expectedMessage, action, buttonName, expectedResult, promptText } =
    options;

  javaScriptAlertsPage.page.once("dialog", async (dialog) => {
    expect(dialog.message()).toBe(expectedMessage);

    if (action === "accept") {
      await dialog.accept(promptText);
    } else {
      await dialog.dismiss();
    }
  });

  await javaScriptAlertsPage.page
    .getByRole("button", { name: buttonName })
    .click();

  await expect(javaScriptAlertsPage.page.locator("#result")).toContainText(
    expectedResult,
  );
}
