import { test, expect } from '@playwright/test';
import { companymanagement } from '../../utils/companymanagement';


test('Invite User', async ({ page }) => {

const Email = `TestUser_${Math.random().toString(36).slice(2, 6)}`;
const Fullname = `nama${Math.random().toString(36).slice(2, 6)}`;
const dropdownPrivilege = 'Admin';
const domain = '@gmail.com';

await companymanagement(page);

await page.waitForTimeout(1000);

await page.getByTestId('sideBarUser').click();
await page.waitForTimeout(1000);

await page.getByTestId('btn-invite-user').click();

await page.getByTestId('inputEmailName')
    .waitFor({ state: 'visible', timeout: 10000 });

await page.getByTestId('inputEmailName').fill(Email);

await page.getByTestId('inputFullName')
    .waitFor({ state: 'visible', timeout: 10000 });

await page.getByTestId('inputFullName').fill(Fullname);

await page.getByTestId('dropdownPrivilege')
    .waitFor({ state: 'visible', timeout: 10000 });

await page.getByTestId('dropdownPrivilege').click();

await page.locator('[role="option"]', { hasText: dropdownPrivilege }).click();

await page.getByTestId('btnInviteUser').click({ force: true });

// // pilih domain (select option index ke-1)
// const domainOptions = page.locator(
//     '[data-testid="inputCompanyDomain"] > select > option'
// );
// const optionText = await domainOptions.nth(1).textContent();
// await page.locator(
//     '[data-testid="inputCompanyDomain"] > select'
// ).selectOption({ label: optionText! });

await page.getByRole('combobox', { name: 'Select domain' }).click();
await page.getByRole('option', { name: domain }).click();
await page.getByTestId('btnInviteUser').click();

await expect(
    page.getByText('Success! User has been invited')
).toBeVisible();

await expect(
        page.locator('tbody tr td', { hasText: Fullname })
    ).toBeVisible();
// tambahin detect user yg ditambahkan
});


