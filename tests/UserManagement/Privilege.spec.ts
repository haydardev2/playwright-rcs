import { test, expect } from '@playwright/test';
import { companymanagement } from '../../utils/companymanagement';   

test('Add Privilege', async ({ page }) => {
const PrivilegeName = `privilege_${Math.random().toString(36).slice(2, 6)}`;

await companymanagement(page);
await page.getByTestId('sideBarPrivilege').click();

await page.getByRole('button', { name: 'Add New Privilege' }).click();
await page.getByTestId('addPrivilegeName').click();
await page.getByTestId('addPrivilegeName').fill(PrivilegeName);
await page.getByTestId('btnAddPrivilege').click();
await expect(page.getByText('Success! New privilege has been added.')).toBeVisible();
});

