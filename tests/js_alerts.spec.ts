import { test, expect, Page } from '@playwright/test';


//Fonction qui gère les dialogues vu qu'on fait des variations de la même chose à chaque fois

async function handleDialog(
    page: Page,
    expectedMessage: string,
    action: "accept" | "dismiss",
    buttonName: string,
    expectedResult: string,
    promptText?: string
) {
    page.once('dialog', async dialog => {
        expect(dialog.message()).toBe(expectedMessage);

        if (action === 'accept') {
            await dialog.accept(promptText);
        } else {
            await dialog.dismiss();
        }
    });

    await page.getByRole('button', { name: buttonName }).click();
    await expect(page.locator('#result')).toContainText(expectedResult);
}

//Code qui lance la page web pour tous les tests; englobe l'ensemble des tests par () et {}
test.describe('JavaScript Alerts', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    });



    test('JS Alert', async ({ page }) => {

        await handleDialog(
            page,
            'I am a JS Alert',
            "accept",
            'Click for JS Alert',
            'You successfully clicked an alert'
        );
    });


    test('JS Confirm accept', async ({ page }) => {

        await handleDialog(
            page,
            'I am a JS Confirm',
            "accept",
            'Click for JS Confirm',
            'You clicked: Ok'
        );
    });




    test('JS Confirm dismiss', async ({ page }) => {

        await handleDialog(
            page,
            'I am a JS Confirm',
            "dismiss",
            'Click for JS Confirm',
            'You clicked: Cancel'
        );
    });


    test('JS Prompt dismiss', async ({ page }) => {

        await handleDialog(
            page,
            'I am a JS prompt',
            "dismiss",
            'Click for JS Prompt',
            'You entered: null'
        );
    });



    test('JS Prompt accept empty', async ({ page }) => {

        await handleDialog(
            page,
            'I am a JS prompt',
            "accept",
            'Click for JS Prompt',
            'You entered: '
        );
    });


    test('JS Prompt accept not empty', async ({ page }) => {

        await handleDialog(
            page,
            'I am a JS prompt',
            "accept",
            'Click for JS Prompt',
            'You entered: Hello JS prompt!',
            'Hello JS prompt!'
        );
    });

});