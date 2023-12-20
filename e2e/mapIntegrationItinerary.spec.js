const { test, expect } = require('@playwright/test');

const eiffelTowerCoordinates = {
    latitude: 48.8584,
    longitude: 2.2945,
};

const louvreCoordinates = {
    latitude: 48.8606,
    longitude: 2.3376,
};

test('has title', async ({ page }) => {

    await page.goto('http://localhost:5173/');

    await page.click('[data-testid="monument-select"] input');
    await page.waitForSelector('text="Tour Eiffel"');
    await page.click('text="Tour Eiffel"');
    await page.waitForTimeout(500);

    await page.waitForSelector('text="Musée du Louvre"');
    await page.click('text="Musée du Louvre"');
    await page.waitForTimeout(500);

    await page.click('.custom-button-class');
    await page.waitForTimeout(500);

    await page.waitForSelector('[data-testid="map-element"]');

    await page.click('input[type="text"]');

    const inputValue = await page.$eval('input[type="text"]', (input) => input.value);
});