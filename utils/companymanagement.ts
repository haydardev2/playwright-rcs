import { Page, expect } from '@playwright/test';
import { login } from './auth';

export async function companymanagement(page: Page) {
  await login(
    page,
    process.env.LOGIN_USERNAME!,
    process.env.LOGIN_PASSWORD!
  );

  const settingsBtn = page.getByTestId('button-settings');
  await expect(settingsBtn).toBeVisible();
  await settingsBtn.click();

  const companyManagementBtn = page.getByTestId('companyManagement');
  await expect(companyManagementBtn).toBeVisible();
  await companyManagementBtn.click();
  await expect(page).toHaveURL(/\/company-management\/billing-info/);
}
