import { test, expect } from '@playwright/test';
import { compliance } from '../../utils/compliance';   
// import { time } from 'node:console';

test('Single Setup', async ({ page }) => {
      const ComplianceName = 'OPR.1.D.3.E';
      const   UserName = 'affiliate pro';
      await compliance(page);
      await page.getByTestId('btnComplianceMonitor').click();

      await page.getByRole('combobox', { name: 'Search Compliance' }).click({timeout: 2000});
      await page.getByRole('combobox', { name: 'Search Compliance' }).fill(ComplianceName);
      await page.getByRole('combobox', { name: 'Search Compliance' }).press('Enter');
      await page.locator('.flex.gap-1.items-start').click({ timeout: 5000 });
      //  await page.locator('data-testid="complianceCard"').click({ timeout: 2000 });
      await page.getByTestId('btnSidebarInformationSetup').click();

      //Assignee group
      await page.getByTestId('sidebarInformationStage1Group').getByRole('combobox', { name: 'Select group' }).click();
      await page.getByTestId('sidebarInformationStage1Group').getByRole('combobox', { name: 'Select group' }).fill('admin');
      await page.getByTestId('sidebarInformationStage1Group').getByRole('combobox', { name: 'Select group' }).press('Enter');

      //Assignee
      await page.getByRole('combobox', { name: 'Select assignee' }).click();
      await page.getByRole('combobox', { name: 'Select assignee' }).press('ControlOrMeta+a');
      await page.getByRole('combobox', { name: 'Select assignee' }).fill(UserName);

      await expect(page
            .locator('[data-testid^="filter-search-item-"]')
            .filter({ hasText:  UserName })
            .locator('label')
            .first()).toBeVisible();

      await page
            .locator('[data-testid^="filter-search-item-"]')
            .filter({ hasText: UserName })
            .locator('label')
            .first()
            .click({ force: true });
      await page.locator('form').getByText('Assignee', { exact: true }).click();

      //Auditor Group
      await page.getByTestId('sidebarInformationStage2Group').getByRole('combobox', { name: 'Select group' }).click();
      await page.getByTestId('sidebarInformationStage2Group').getByRole('combobox', { name: 'Select group' }).fill('admin');
      await page.getByTestId('sidebarInformationStage2Group').getByRole('combobox', { name: 'Select group' }).press('Enter');

      //Auditor 
      await page.getByRole('combobox', { name: 'Select auditor' }).fill(UserName);
      await page
            .locator('[data-testid^="filter-search-item-"]')
            .filter({ hasText: UserName })
            .locator('label')
            .first()
            .click({ force: true });
      await page.locator('form').getByText('Auditor', { exact: true }).click();

      await page.getByTestId('btnSidebarInformationSave').click();
      await expect(page.getByText('Success! Compliance has been set up.')).toBeVisible();
});


// test('Bulk Setup', async ({ page }) => {
//       await compliance(page);
//       await page.getByTestId('btnComplianceMonitor').click();

//       await page.getByRole('combobox', { name: 'Search Compliance' }).click();
//       await page.getByRole('combobox', { name: 'Search Compliance' }).fill(ComplianceName);
//       await page.getByRole('combobox', { name: 'Search Compliance' }).press('Enter');
//       await page.locator('.flex.gap-1.items-start').click({ timeout: 1000 });
//       await page.getByTestId('btnSidebarInformationSetup').click();

//       //Assignee group
//       await page.getByTestId('sidebarInformationStage1Group').getByRole('combobox', { name: 'Select group' }).click();
//       await page.getByTestId('sidebarInformationStage1Group').getByRole('combobox', { name: 'Select group' }).fill('admin');
//       await page.getByTestId('sidebarInformationStage1Group').getByRole('combobox', { name: 'Select group' }).press('Enter');

//       //Assignee
//       await page.getByRole('combobox', { name: 'Select assignee' }).click();
//       await page.getByRole('combobox', { name: 'Select assignee' }).press('ControlOrMeta+a');
//       await page.getByRole('combobox', { name: 'Select assignee' }).fill(UserName);

//       await expect(page
//             .locator('[data-testid^="filter-search-item-"]')
//             .filter({ hasText: UserName })
//             .locator('label')
//             .first()).toBeVisible();

//       await page
//             .locator('[data-testid^="filter-search-item-"]')
//             .filter({ hasText: UserName })
//             .locator('label')
//             .first()
//             .click({ force: true });
//       await page.locator('form').getByText('Assignee', { exact: true }).click();

//       //Auditor Group
//       await page.getByTestId('sidebarInformationStage2Group').getByRole('combobox', { name: 'Select group' }).click();
//       await page.getByTestId('sidebarInformationStage2Group').getByRole('combobox', { name: 'Select group' }).fill('admin');
//       await page.getByTestId('sidebarInformationStage2Group').getByRole('combobox', { name: 'Select group' }).press('Enter');

//       //Auditor 
//       await page.getByRole('combobox', { name: 'Select auditor' }).fill(UserName);
//       await page
//             .locator('[data-testid^="filter-search-item-"]')
//             .filter({ hasText: UserName })
//             .locator('label')
//             .first()
//             .click({ force: true });
//       await page.locator('form').getByText('Auditor', { exact: true }).click();

// await page.getByTestId("btnSidebarInformationSave").click();
// await expect(page.getByText("Success! Compliance has been set up.")).toBeVisible();

// });