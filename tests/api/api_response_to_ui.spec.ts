import { test, expect } from "@playwright/test";

test("connexion invalide avec observation réseau", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/login");

  const authRequestPromise = page.waitForRequest((request) =>
    request.url().includes("/authenticate"),
  );

  const authResponsePromise = page.waitForResponse((response) =>
    response.url().includes("/authenticate"),
  );

  await page.getByLabel("Username").fill("tomsmith");
  await page.getByLabel("Password").fill("mauvaismotdepasse");
  await page.getByRole("button", { name: "Login" }).click();

  const authRequest = await authRequestPromise;
  const authResponse = await authResponsePromise;

  console.log("Auth request URL =", authRequest.url());
  console.log("Auth request method =", authRequest.method());

  expect(authRequest.method()).toBe("POST");

  console.log("Auth URL =", authResponse.url());
  console.log("Auth status =", authResponse.status());

  expect([302, 303]).toContain(authResponse.status());

  await expect(page.locator("#flash")).toContainText(
    "Your password is invalid",
  );
});

test("connexion valide avec observation réseau", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/login");

  const authRequestPromise = page.waitForRequest((request) =>
    request.url().includes("/authenticate"),
  );

  const authResponsePromise = page.waitForResponse((response) =>
    response.url().includes("/authenticate"),
  );

  await page.getByLabel("Username").fill("tomsmith");
  await page.getByLabel("Password").fill("SuperSecretPassword!");
  await page.getByRole("button", { name: "Login" }).click();

  const authRequest = await authRequestPromise;
  const authResponse = await authResponsePromise;

  expect(authRequest.method()).toBe("POST");

  expect(authResponse.status()).toBe(303);

  await expect(page).toHaveURL(/.*secure/);
  await expect(page.locator("#flash")).toContainText(
    "You logged into a secure area",
  );
});
