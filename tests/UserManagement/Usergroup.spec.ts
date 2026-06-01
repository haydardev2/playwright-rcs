import { test, expect } from '@playwright/test';
import { companymanagement } from '../../utils/companymanagement';   

test.describe.serial('User Group', () => {

//   const GroupName = `Grouptest${Math.random().toString(36).slice(2, 6)}`;
  let GroupName: string = `Grouptest${Math.random().toString(36).slice(2, 6)}`;
  
  test('Add Group', async ({ page }) => {
    await companymanagement(page);
    await page.getByTestId('sideBarUserGroup').click();
    await page.getByTestId('btnAddUserGroup').click();

    await expect(page.getByTestId('titlePopup')).toBeVisible();

    await page.getByTestId('inputGroupName')
    //   .click()
      .fill(GroupName);

    await page.getByTestId('btnAddGroup').click();

    await page.getByText(GroupName).waitFor({ state: 'visible', timeout: 10000 });
    await expect(
      page.getByText('Success! New user group has been added.')
    ).toBeVisible();
  });

  test('Add User to Group', async ({ page }) => {
    await companymanagement(page);
    await page.getByTestId('sideBarUserGroup').click();

    await expect(page.getByText(GroupName)).toBeVisible({timeout: 10000});
    await page.getByText(GroupName).click({timeout: 10000});

    await page.getByTestId('btnAddUserToGroup').click();
    await expect(page.getByTestId('titlePopup')).toBeVisible();

    // await page.getByTestId('searchUser').click();
    await page.getByRole('textbox').click();

    const filterName = 'affiliate pro';

    await page
      .locator('[data-testid^="filter-search-item-"]')
      .filter({ hasText: filterName })
      .locator('label')
      .first()
      .click({ force: true });

    await page.getByTestId('titlePopup').click();
    // await page.getByTestId('btnAddUserToGroupSubmit').click();
    await page.getByTestId('btnAddUser').click();
    await expect(
      page.getByText('Success! New user has been added to user group.')
    ).toBeVisible();

  });

});
