// const { test, expect, Page } = require('@playwright/test');
import { test, expect } from '@playwright/test';
const { timeout } = require('../playwright.config');
// timeout = 60000;


const username = 'intern07@yopmail.com';
const password = 'P@SSword123456';

test.beforeEach(async ({ page }) => {
//await page.pause();
await page.goto(process.env.TEST_URL!, { waitUntil: "networkidle" });
});

test('Login with valid credentials', async ({ page }) => {
//await page.pause(1000);
await page.getByTestId('inputUsername').fill(username, {timeout:10000});
await page.getByTestId('inputPass').fill(password);
await page.getByTestId('btn-btnSignIn').click();
// console.log('Login button clicked');
//await page.pause(10000);
// await page.waitForTimeout(5000000);
await expect(page).toHaveURL(`${process.env.TEST_URL}/intern07/home`, {timeout:50000});
});
test('Login with invalid credentials', async ({ page }) => {
await page.getByTestId('inputUsername').fill('usersalah');
await page.getByTestId('inputPass').fill('passwordsalah');
await page.getByTestId('btn-btnSignIn').click();

await expect(page.getByText('Email, username, or password is invalid.')
).toBeVisible();
});
