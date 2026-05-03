import { test, expect } from '@playwright/test';

test('Example 1: Element on page that is hidden', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/dynamic_loading');
  await page.getByRole('link', { name: 'Example 1' }).click();

  const startButton = page.getByRole('button', { name: 'Start' });
  
  await expect(startButton).toBeVisible();
  
  await startButton.click();

  await expect(page.locator('#loading')).toBeVisible();

  await expect(page.locator('#loading')).toBeHidden({ timeout: 10000 });

  await expect(page.locator('#finish')).toBeVisible({ timeout: 10000 });
  await expect(page.locator('#finish')).toContainText('Hello World!', { timeout: 10000 });
  
});
