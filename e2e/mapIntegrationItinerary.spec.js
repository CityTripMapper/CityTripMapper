const { test, expect } = require('@playwright/test');

const eiffelTowerCoordinates = {
    latitude: 48.85836,
    longitude: 2.29454,
};

const louvreCoordinates = {
    latitude: 48.86135,
    longitude: 2.33546,
};

test('should display optimized routes based on selected items', async ({ page }) => {

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


    const originInputValue = await page.$eval('#mapbox-directions-origin-input input', (input) => input.value);
    expect(originInputValue).toBe(eiffelTowerCoordinates.longitude + "," + eiffelTowerCoordinates.latitude);

    const destinationInputValue = await page.$eval('#mapbox-directions-destination-input input', (input) => input.value);
    expect(destinationInputValue).toBe(louvreCoordinates.longitude + "," + louvreCoordinates.latitude);
});

test('should display information related to selected items', async ({ page }) => {

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

    await page.click('[data-testid="click-to-view-information-button"]');

    const originName = await page.innerText('.info-monument-name');
    expect(originName).toBe("Tour Eiffel");
    const originDescription = await page.innerText('.info-monument-description');
    expect(originDescription).not.toBe('');
});

test('should be able to select the means of transportation', async ({ page }) => {

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

    await page.click('label[for="mapbox-directions-profile-driving-traffic"]');
    await page.click('label[for="mapbox-directions-profile-driving"]');
    await page.click('label[for="mapbox-directions-profile-walking"]');
    await page.click('label[for="mapbox-directions-profile-cycling"]');
});