import { test, expect, Page } from '@playwright/test';

//Launches the web page for every test
test.describe('Press keyboard', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/key_presses');
       
    });

  test('Fill one word', async ({ page}) => {

    const champ = page.locator('#target');
    const result = page.locator('#result'); 

    await champ.click();  //await champ.fill('a'); ne marche pas ! ça remplit le champ, mais le result n'arrive pas
    await champ.press('a');

    await expect(champ).toHaveValue('a');
    await expect(result).toContainText('You entered: A');    
    });

    test('Fill one word then remove it', async ({ page}) => {

    const champ = page.locator('#target');
    const result = page.locator('#result'); 

    await champ.click();  //await champ.fill('a'); ne marche pas ! ça remplit le champ, mais le result n'arrive pas
    await champ.press('a');
    await champ.press('Backspace');

    await expect(champ).toHaveValue('');
    await expect(result).toContainText('You entered: BACK_SPACE');    
    });

    });