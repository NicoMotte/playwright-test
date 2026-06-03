import { test } from "@playwright/test";
import { handleDialog } from "../../helpers/js_alerts_helpers";

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
