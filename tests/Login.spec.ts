import { test, expect, Page } from '@playwright/test';
import { login } from '../utils/auth';

const username = process.env.LOGIN_USERNAME!;
const password = process.env.LOGIN_PASSWORD!;

async function logout(page : Page) {
  await page.getByTestId('image-profile').click();
  await page.getByTestId('navbar-signout').click();
  await expect(page).toHaveURL(`${process.env.TEST_URL}/login`);
}

test('login-success', async ({ page }) => {
  await login(page, username, password);
  await expect(page.getByText('Home Dashboard')).toBeVisible();
  await expect(page).toHaveURL(`${process.env.TEST_URL}/testerintern06/home`);
});

test('wrong pass', async ({ page }) => {
    const passwordwrong = 'rahasia123';
    await login(page, username, passwordwrong);

    await expect(page).toHaveURL(`${process.env.TEST_URL}/login`);
  });

test('wrong username', async ({ page }) => {
  const usernamewrong = 'aditganteng';
  await login(page, usernamewrong, password);
  await expect(page).toHaveURL(`${process.env.TEST_URL}/login`);
});

test('logout', async({page}) => {
  await login(page, username, password);
  await logout(page);
});

  