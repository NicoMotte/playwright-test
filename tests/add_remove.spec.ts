import { test, expect } from '@playwright/test';

test('Delete button appears', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');

  const addButton = page.getByRole('button', { name: 'Add Element' });
  const deleteButtons = page.getByRole('button', { name: 'Delete' });
  
  await expect(deleteButtons).toHaveCount(0);

  await addButton.click();

  await expect(deleteButtons).toHaveCount(1);

});


test('Delete button appears then dissapears', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');

  const addButton = page.getByRole('button', { name: 'Add Element' });
  const deleteButtons = page.getByRole('button', { name: 'Delete' });
  
  await expect(deleteButtons).toHaveCount(0);

  for (let i = 0; i < 7; i++) {
    await addButton.click();
  }

  await expect(deleteButtons).toHaveCount(7);

  await deleteButtons.nth(0).click(); // premier
  
  await expect(deleteButtons).toHaveCount(6);

  await deleteButtons.last().click();

  await expect(deleteButtons).toHaveCount(5);

  await deleteButtons.nth(0).click(); // deuxième

  await expect(deleteButtons).toHaveCount(4);

  await deleteButtons.nth(0).click();
  await deleteButtons.nth(0).click();
  await deleteButtons.nth(0).click();
  await deleteButtons.nth(0).click();

  await expect(deleteButtons).toHaveCount(0);


});