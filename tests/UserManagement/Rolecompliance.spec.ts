import { test, expect } from '@playwright/test';
import { companymanagement } from '../../utils/companymanagement';   



test.describe.serial('Role Compliance', () => {

    const editRoleName = `roleedit_${Math.random().toString(36).slice(2, 6)}`;
    let addRoleName: string;

    test('Add Role Compliance', async ({ page }) => {
    addRoleName = `role_${Math.random().toString(36).slice(2, 6)}`;
    await companymanagement(page);
    await page.getByTestId('sideBarRoleCompliance').click();

    await page.getByText('Add New Role').click();

    await page.getByTestId('addRoleName').fill(addRoleName);
    await page.getByTestId('btnAddRole').click();

    await expect(
        page.getByText('Success! New role has been added.')
    ).toBeVisible({timeout:10000});
    // validasi denngan seearching nama role yg ditambahkan
    await expect(
        page.locator('tbody tr td', { hasText: addRoleName })
    ).toBeVisible({timeout:10000});


    });


    test('Edit Role Compliance', async ({ page }) => {
    await companymanagement(page);
    await page.getByTestId('sideBarRoleCompliance').click();

    // const row = page
    //     .locator('tbody tr', {
    //     has: page.locator('td', { hasText: addRoleName }),
    //     });

    const row = page
        .locator('tbody tr')
        .filter({ hasText: addRoleName })
        .first();

    await row.getByRole('button', { name: 'Edit Name' }).click({ timeout: 10000 });
    await page.getByTestId('addRoleName').fill(editRoleName);
    await page.getByTestId('btnAddRole').click();

    await page.getByText(editRoleName).waitFor({ state: 'visible', timeout: 10000 });
    });


    
    test('Delete Role Compliance', async ({ page }) => {
    await companymanagement(page);
    await page.getByTestId('sideBarRoleCompliance').click();

    const row = page
        .locator('tbody tr', {
        has: page.locator('td', { hasText: editRoleName }),
        });

    await row.getByRole('button', { name: 'Delete' }).click();

    await page.getByText('Yes, Sure').click();

    await expect(
        page.getByText('Success! Role has been deleted.')
    ).toBeVisible();

    await expect(
        page.locator('tbody tr td', { hasText: editRoleName })
    ).toHaveCount(0);
    });

});
