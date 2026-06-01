import { Page, expect } from '@playwright/test';
import { login } from './auth';

export async function compliance(page: Page) {
  await login(
    page,
    process.env.LOGIN_USERNAME!,
    process.env.LOGIN_PASSWORD!
  );

  await page.getByTestId('navbar-compliance').click();
  await expect(page).toHaveURL(/\/compliance-monitor/);
}
//await page.getByText('ComplianceCompliance').isVisible();