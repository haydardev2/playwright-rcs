import { Page } from '@playwright/test';
// import { log } from 'node:console';

export async function login(
  page: Page,
  username: string,
  password: string
) {
  await page.goto(process.env.TEST_URL! + '/login');
  await page.getByTestId('inputUsername').fill(username, { timeout: 5000 });
  await page.getByTestId('inputPass').fill(password);
  await page.getByTestId('btn-btnSignIn').click();
}
