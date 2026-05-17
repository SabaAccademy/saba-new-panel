/**
 * e2e/auth.setup.ts
 *
 * Logs in with the demo admin account and saves the NextAuth session cookie
 * to e2e/.auth/user.json so all other tests start already authenticated.
 */
import { test as setup, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

const AUTH_FILE = path.join(__dirname, ".auth/user.json");

setup("authenticate", async ({ page }) => {
  // Ensure .auth directory exists
  fs.mkdirSync(path.dirname(AUTH_FILE), { recursive: true });

  await page.goto("/auth/login");

  // Fill email — try common field selectors used by Next-Auth / custom forms
  const emailField = page
    .locator(
      'input[type="email"], input[name="email"], input[placeholder*="ایمیل"]',
    )
    .first();
  await emailField.waitFor({ timeout: 15000 });
  await emailField.fill("admin@demo.com");

  const passwordField = page
    .locator('input[type="password"], input[name="password"]')
    .first();
  await passwordField.fill("demo1234");

  // Submit
  await page.locator('button[type="submit"]').first().click();

  // Wait until we're on the dashboard (redirected away from /auth)
  await page.waitForURL((url) => !url.pathname.startsWith("/auth"), {
    timeout: 20000,
  });

  // Save session
  await page.context().storageState({ path: AUTH_FILE });
});
