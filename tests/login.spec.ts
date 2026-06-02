import { test, expect } from "./fixtures";

test("connexion valide", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/login");

  await page.getByLabel("Username").fill("tomsmith");
  await page.getByLabel("Password").fill("SuperSecretPassword!");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/.*secure/);
  await expect(page.locator("#flash")).toContainText(
    "You logged into a secure area",
  );
});

test("login puis logout", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/login");

  await expect(page.getByRole("button", { name: "Login" })).toHaveCount(1);

  await page.getByLabel("Username").fill("tomsmith");
  await page.getByLabel("Password").fill("SuperSecretPassword!");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/.*secure/);
  await expect(page.locator("#flash")).toContainText(
    "You logged into a secure area",
  );

  await expect(page.getByRole("link", { name: "Logout" })).toHaveCount(1);

  await expect(page.locator(".button.secondary.radius")).toHaveCount(1);

  await page.getByRole("link", { name: "Logout" }).click();

  await expect(page.locator("#flash")).toContainText(
    "You logged out of the secure area!",
  );
});

test("connexion invalide", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/login");

  await page.getByLabel("Username").fill("tomsmith");
  await page.getByLabel("Password").fill("mauvaismotdepasse");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.locator("#flash")).toContainText(
    "Your password is invalid",
  );
});

// Improved part using login.page.ts

import { LoginPage } from "./login.page";

test.describe("Login", () => {
  test("connexion valide", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.loginAs("tomsmith", "SuperSecretPassword!");
    await loginPage.expectSuccessfulLogin();
  });

  test("login puis logout", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await expect(loginPage.loginButton).toHaveCount(1);

    await loginPage.loginAs("tomsmith", "SuperSecretPassword!");
    await loginPage.expectSuccessfulLogin();

    await expect(loginPage.logoutLink).toHaveCount(1);

    await loginPage.logout();
    await loginPage.expectLoggedOut();
  });

  test("connexion invalide", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.loginAs("tomsmith", "mauvaismotdepasse");
    await loginPage.expectInvalidPassword();
  });
});

////////////////////////////////////////////
// Improved with fixtures
////////////////////////////////////////////

test.describe("Login improved with fixtures", () => {
  test("connexion valide", async ({ loginPage }) => {
    await loginPage.loginAs("tomsmith", "SuperSecretPassword!");
    await loginPage.expectSuccessfulLogin();
  });
});
