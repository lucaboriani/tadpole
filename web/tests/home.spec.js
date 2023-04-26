import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
	console.log(`Running ${testInfo.title}`);
	await page.goto('/');
});

test('index page has expected h1', async ({ page }) => {
	await expect(page.getByRole('heading', { name: 'List all packages w/actions' })).toBeVisible();
});

test('open the default hello action code editor', async ({ page }) => {
	
	//
	await page.getByRole('button', { name: 'Default' }).click();
	await page.getByRole('button', { name: 'hello nodejs:14 web' }).click()
	await expect(page.getByText('let url = "https://welcome.nuvolaris.io/nuv/"')).toBeVisible();
});
