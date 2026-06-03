import { expect, Page } from "@playwright/test";

type DialogOptions = {
  expectedMessage: string;
  action: "accept" | "dismiss";
  buttonName: string;
  expectedResult: string;
  promptText?: string;
};

// Utility function for JavaScript dialogs
export async function handleDialog(page: Page, options: DialogOptions) {
  const { expectedMessage, action, buttonName, expectedResult, promptText } =
    options;

  page.once("dialog", async (dialog) => {
    expect(dialog.message()).toBe(expectedMessage);

    if (action === "accept") {
      await dialog.accept(promptText);
    } else {
      await dialog.dismiss();
    }
  });

  await page.getByRole("button", { name: buttonName }).click();
  await expect(page.locator("#result")).toContainText(expectedResult);
}
