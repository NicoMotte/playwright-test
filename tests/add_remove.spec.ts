import { test, expect } from "@playwright/test";

//Launches the web page for every test
test.describe("Testing a button that creates delete buttons", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/add_remove_elements/");
  });

  test("Delete button appears", async ({ page }) => {
    const addButton = page.getByRole("button", { name: "Add Element" });
    const deleteButtons = page.getByRole("button", { name: "Delete" });

    await expect(deleteButtons).toHaveCount(0);

    await addButton.click();

    await expect(deleteButtons).toHaveCount(1);
  });

  test("Delete button appears then disappears", async ({ page }) => {
    const addButton = page.getByRole("button", { name: "Add Element" });
    const deleteButtons = page.getByRole("button", { name: "Delete" });
    const numberOfCreatedButtons = 10;

    await expect(deleteButtons).toHaveCount(0);

    for (let i = 0; i < numberOfCreatedButtons; i++) {
      await addButton.click();
      await expect(deleteButtons).toHaveCount(i + 1);
    }

    for (let i = 0; i < numberOfCreatedButtons; i++) {
      await deleteButtons.nth(0).click();
      await expect(deleteButtons).toHaveCount(numberOfCreatedButtons - 1 - i);
    }
  });
});
