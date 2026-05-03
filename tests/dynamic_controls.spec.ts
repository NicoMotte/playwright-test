import { test, expect } from '@playwright/test';

test('Remove/add', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/dynamic_controls');

   
  const checkBox = page.locator('#checkbox');
  const removeButton = page.getByRole('button', { name: 'Remove' });
  const addButton = page.getByRole('button', { name: 'Add' });
  //const loading = page.locator('#loading');


  //if (await checkBox.isHidden()) {
    //await expect(addButton).toBeVisible();
    //await addButton.click();
  //}
  
  await expect(checkBox).toBeVisible({ timeout: 10000 });
  await expect(removeButton).toBeVisible({ timeout: 10000 });
  //await expect(loading).toBeHidden({ timeout: 10000 });
  
  await removeButton.click();

  //await expect(loading).toBeVisible({ timeout: 10000 });
  //await expect(loading).toBeHidden({ timeout: 10000 });
  await expect(checkBox).toBeHidden({ timeout: 10000 });
  await expect(addButton).toBeVisible({ timeout: 10000 });

  await addButton.click();

  //await expect(loading).toBeVisible({ timeout: 10000 });
  //await expect(loading).toBeHidden({ timeout: 10000 });
  await expect(addButton).toBeHidden({ timeout: 10000 });
  await expect(checkBox).toBeVisible({ timeout: 10000 });
  await expect(removeButton).toBeVisible({ timeout: 10000 });
});


test('Enable/disable', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
  
  const inputExample = page.locator('#input-example');
  const inputField = inputExample.locator('input');
  const message = inputExample.locator('#message');
  const disableButton = page.getByRole('button', { name: 'Disable' });
  const enableButton = page.getByRole('button', { name: 'Enable' });
  //const loading = page.locator('#loading');
  
  await expect(inputField).toBeDisabled({ timeout: 10000 });
  await expect(enableButton).toBeVisible({ timeout: 10000 });
  //await expect(loading).toBeHidden({ timeout: 10000 });
  
  await enableButton.click();

  //await expect(loading).toBeVisible({ timeout: 10000 });
  //await expect(loading).toBeHidden({ timeout: 10000 });
  await expect(inputField).toBeEnabled({ timeout: 10000 });
  await expect(disableButton).toBeVisible({ timeout: 10000 });
  await expect(message).toContainText('It\'s enabled!');

  await disableButton.click();

  //await expect(loading).toBeVisible({ timeout: 10000 });
  //await expect(loading).toBeHidden({ timeout: 10000 });
  await expect(disableButton).toBeHidden({ timeout: 10000 });
  await expect(inputField).toBeDisabled({ timeout: 10000 });
  await expect(enableButton).toBeVisible({ timeout: 10000 });
  await expect(message).toContainText('It\'s disabled!');

});

