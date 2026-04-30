import { test, expect } from '@playwright/test';

test('connexion valide', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');

  await page.getByLabel('Username').fill('tomsmith');
  await page.getByLabel('Password').fill('SuperSecretPassword!');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/.*secure/);
  await expect(page.locator('#flash')).toContainText('You logged into a secure area');
});

test('connexion invalide', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');

  await page.getByLabel('Username').fill('tomsmith');
  await page.getByLabel('Password').fill('mauvaismotdepasse');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.locator('#flash')).toContainText('Your password is invalid');
});