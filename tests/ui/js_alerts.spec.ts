import { test, expect } from "../../fixtures/js_alerts.fixtures";
import { handleDialog } from "../../helpers/js_alerts.helpers";

test.describe("JavaScript Alerts", () => {
  test("JS Alert", async ({ javaScriptAlertsPage }) => {
    /// debug
    console.log("URL =", javaScriptAlertsPage.page.url());
    await expect(
      javaScriptAlertsPage.page.getByRole("button", {
        name: "Click for JS Alert",
      }),
    ).toBeVisible();

    /// fin debug

    await handleDialog(javaScriptAlertsPage, {
      expectedMessage: "I am a JS Alert",
      action: "accept",
      buttonName: "Click for JS Alert",
      expectedResult: "You successfully clicked an alert",
    });
  });

  test("JS Confirm accept", async ({ javaScriptAlertsPage }) => {
    await handleDialog(javaScriptAlertsPage, {
      expectedMessage: "I am a JS Confirm",
      action: "accept",
      buttonName: "Click for JS Confirm",
      expectedResult: "You clicked: Ok",
    });
  });

  test("JS Confirm dismiss", async ({ javaScriptAlertsPage }) => {
    await handleDialog(javaScriptAlertsPage, {
      expectedMessage: "I am a JS Confirm",
      action: "dismiss",
      buttonName: "Click for JS Confirm",
      expectedResult: "You clicked: Cancel",
    });
  });

  test("JS Prompt dismiss", async ({ javaScriptAlertsPage }) => {
    await handleDialog(javaScriptAlertsPage, {
      expectedMessage: "I am a JS prompt",
      action: "dismiss",
      buttonName: "Click for JS Prompt",
      expectedResult: "You entered: null",
    });
  });

  test("JS Prompt accept empty", async ({ javaScriptAlertsPage }) => {
    await handleDialog(javaScriptAlertsPage, {
      expectedMessage: "I am a JS prompt",
      action: "accept",
      buttonName: "Click for JS Prompt",
      expectedResult: "You entered: ",
    });
  });

  test("JS Prompt accept not empty", async ({ javaScriptAlertsPage }) => {
    await handleDialog(javaScriptAlertsPage, {
      expectedMessage: "I am a JS prompt",
      action: "accept",
      buttonName: "Click for JS Prompt",
      expectedResult: "You entered: Hello JS prompt!",
      promptText: "Hello JS prompt!",
    });
  });
});
