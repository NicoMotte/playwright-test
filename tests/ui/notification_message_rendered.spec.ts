import { test, expect } from '@playwright/test';

//Launches the web page for every test
test.describe('click for random notification', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/notification_message_rendered');
       
    });

  test('10 clicks always produce expected notification', async ({ page}) => {

    const button = page.getByRole('link', {name: 'Click here'});
    const alert = page.locator('#flash');

    for (let i = 0; i < 10; i++) {
      await button.click();
      await expect(alert).toContainText(
        /Action successful|Action unsuccesful, please try again|Action unsuccessful, please try again/i
      );
    }
    
    });

    });