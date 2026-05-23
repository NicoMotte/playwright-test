import { test, expect, Page } from "@playwright/test";

type DialogOptions = {
  expectedMessage: string;
  action: "accept" | "dismiss";
  buttonName: string;
  expectedResult: string;
  promptText?: string;
};

// Utility function for JavaScript dialogs
async function handleDialog(page: Page, options: DialogOptions) {
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

test.describe("JavaScript Alerts", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
  });

  test("JS Alert", async ({ page }) => {
    await handleDialog(page, {
      expectedMessage: "I am a JS Alert",
      action: "accept",
      buttonName: "Click for JS Alert",
      expectedResult: "You successfully clicked an alert",
    });
  });

  test("JS Confirm accept", async ({ page }) => {
    await handleDialog(page, {
      expectedMessage: "I am a JS Confirm",
      action: "accept",
      buttonName: "Click for JS Confirm",
      expectedResult: "You clicked: Ok",
    });
  });

  test("JS Confirm dismiss", async ({ page }) => {
    await handleDialog(page, {
      expectedMessage: "I am a JS Confirm",
      action: "dismiss",
      buttonName: "Click for JS Confirm",
      expectedResult: "You clicked: Cancel",
    });
  });

  test("JS Prompt dismiss", async ({ page }) => {
    await handleDialog(page, {
      expectedMessage: "I am a JS prompt",
      action: "dismiss",
      buttonName: "Click for JS Prompt",
      expectedResult: "You entered: null",
    });
  });

  test("JS Prompt accept empty", async ({ page }) => {
    await handleDialog(page, {
      expectedMessage: "I am a JS prompt",
      action: "accept",
      buttonName: "Click for JS Prompt",
      expectedResult: "You entered: ",
    });
  });

  test("JS Prompt accept not empty", async ({ page }) => {
    await handleDialog(page, {
      expectedMessage: "I am a JS prompt",
      action: "accept",
      buttonName: "Click for JS Prompt",
      expectedResult: "You entered: Hello JS prompt!",
      promptText: "Hello JS prompt!",
    });
  });
});
