import { test, expect } from "../../fixtures/login.fixtures";

////////////////////////////////////////////
// Improved with fixtures
////////////////////////////////////////////

test.describe("Login improved", () => {
  test("connexion valide", async ({ loginPage }) => {
    await loginPage.loginAs("tomsmith", "SuperSecretPassword!");
    await loginPage.expectSuccessfulLogin();
  });

  test("login puis logout", async ({ loginPage }) => {
    await loginPage.loginAs("tomsmith", "SuperSecretPassword!");
    await loginPage.expectSuccessfulLogin();

    await expect(loginPage.logoutLink).toHaveCount(1);

    await loginPage.logout();
    await loginPage.expectLoggedOut();
  });

  test("connexion invalide", async ({ loginPage }) => {
    await loginPage.loginAs("tomsmith", "mauvaismotdepasse");
    await loginPage.expectInvalidPassword();
  });
});
