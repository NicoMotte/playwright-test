import { test, expect } from '@playwright/test';

test('sélectionner une option dans une liste déroulante', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/dropdown');

  await page.locator('#dropdown').selectOption('1');

  await expect(page.locator('#dropdown')).toHaveValue('1');
});

test('cocher une case', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/checkboxes');

  const firstCheckbox = page.locator('#checkboxes input').first();

  await firstCheckbox.check();

  await expect(firstCheckbox).toBeChecked();
});