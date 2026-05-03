import { test, expect } from '@playwright/test';

test('connexion valide', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');

  await page.getByLabel('Username').fill('tomsmith');
  await page.getByLabel('Password').fill('SuperSecretPassword!');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/.*secure/);
  await expect(page.locator('#flash')).toContainText('You logged into a secure area');
});

test('login puis logout', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');

  await expect(page.getByRole('button', { name: 'Login' })).toHaveCount(1);


  await page.getByLabel('Username').fill('tomsmith');
  await page.getByLabel('Password').fill('SuperSecretPassword!');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/.*secure/);
  await expect(page.locator('#flash')).toContainText('You logged into a secure area');

  await expect(page.getByRole('link', { name: 'Logout' })).toHaveCount(1);

  await expect(page.locator('.button.secondary.radius')).toHaveCount(1);

  await page.getByRole('link', { name: 'Logout' }).click();
    
  await expect(page.locator('#flash')).toContainText('You logged out of the secure area!');


});

test('connexion invalide', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');

  await page.getByLabel('Username').fill('tomsmith');
  await page.getByLabel('Password').fill('mauvaismotdepasse');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.locator('#flash')).toContainText('Your password is invalid');
});