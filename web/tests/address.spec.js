import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
	console.log(`Running ${testInfo.title}`);
	await page.goto('/address');
});

// this is redundant...
test('page has expected elements', async ({ page }) => {
	await expect(page.getByRole('heading', { name: 'address' })).toBeVisible();
	await expect(
		page.locator('#name')
	).toBeVisible();
	await expect(
		page.locator('#company')
	).toBeVisible();
	await expect(
		page.locator('#phone')
	).toBeVisible();
});

test('create and delete a dummy entry', async ({ page }) => {
	// fill inputs	
	await page.locator('#name').fill('Dr slump');
	await page.locator('#company').fill('Capsule Corps inc.');
	await page.locator('#phone').fill('90-000-000');
	// create address
	await page.getByRole('button', { name: 'Add' }).click();
	// check creation
	await expect(page.locator("input[value='Dr slump']")).toBeVisible();
	// mark the entry to be deleted
	await page.locator("input[value='Dr slump']").setChecked(true)
	// remove the entry
	await page.getByRole('button', { name: 'remove selected' }).click();
	const response = await page.waitForResponse((response) => response.url().includes("del?name="));
	// check server response
	expect(response).toBeTruthy()
	// assert delete worked as expected
	await expect(page.locator("input[value='Dr slump']")).not.toBeVisible();
	
});
