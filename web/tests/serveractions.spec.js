import { expect, test } from '@playwright/test';

test('page has expected h1', async ({ page }) => {
	await page.goto('/serveractions');
	await expect(page.getByRole('heading', { name: 'Server loaded actions' })).toBeVisible();
});
