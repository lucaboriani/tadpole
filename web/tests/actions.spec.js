import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
	console.log(`Running ${testInfo.title}`);
	await page.goto('/actions');
});

test('page has expected h1', async ({ page }) => {
	await page.goto('/actions');
	await expect(
		page.getByRole('heading', { name: 'Client loaded packages w/actions' })
	).toBeVisible();
});

test('page has default package title (h3)', async ({ page }) => {
	await expect(
		page.getByRole('heading', { name: 'default' })
	).toBeVisible();
});
