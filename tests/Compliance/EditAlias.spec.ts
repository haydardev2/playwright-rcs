import { test, expect } from '@playwright/test';
import { compliance } from '../../utils/compliance';   

test('Edit Alias', async ({ page }) => {
const AliasName = `alias_${Math.random().toString(36).slice(2, 6)}`;
const compCode = 'OPR.1.D.9.M';

await compliance(page);
await page.getByTestId('btnComplianceMonitor').click();
// await page.getByText('OPR.1.D.9.MP3LowIn Progress').first().click();

await page.getByText(new RegExp(`^${compCode}`)).first().click();


await page.getByTestId('editAlias').click();
await page.getByRole('textbox').click();
await page.getByRole('textbox').press('ControlOrMeta+a');
await page.getByRole('textbox').fill(AliasName);
await page.getByTestId('btnInviteUser').click();
await expect(page.getByText('Success! Alias has been edited.')).toBeVisible();
    
});