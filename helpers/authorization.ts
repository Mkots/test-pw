import { Page } from "@playwright/test";

type Credentials = {
  email: string;
  password: string;
};

export const authorize = async (page: Page, credentials?: Credentials) => {
  if (!process.env.USER_EMAIL || !process.env.USER_PASSWORD) {
    throw new Error(
      "There is no USER_EMAIL or USER_PASSWORD in run the environment. They are both required"
    );
  }
  const email = credentials?.email || process.env.USER_EMAIL;
  const password = credentials?.password || process.env.USER_PASSWORD;

  await page.locator('[placeholder="user@company.com"]').fill(email);
  await page.locator('[type="password"]').fill(password);
  await page.locator("button", { hasText: "Log in" }).click();
};
