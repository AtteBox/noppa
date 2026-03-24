import { test, expect } from "@playwright/test";

test("user can toggle between light and dark theme", async ({ page }) => {
  await page.goto("/");

  // Default should be dark (based on test environment having no preference)
  const html = page.locator("html");

  // Click the theme toggle button
  const themeToggle = page.getByRole("button", {
    name: "Toggle light/dark theme",
  });
  await expect(themeToggle).toBeVisible();

  // Toggle to light
  await themeToggle.click();
  await expect(html).toHaveAttribute("data-theme", "light");

  // Toggle back to dark
  await themeToggle.click();
  await expect(html).toHaveAttribute("data-theme", "dark");
});

test("theme preference persists across page reloads", async ({ page }) => {
  await page.goto("/");

  const html = page.locator("html");
  const themeToggle = page.getByRole("button", {
    name: "Toggle light/dark theme",
  });

  // Toggle to light
  await themeToggle.click();
  await expect(html).toHaveAttribute("data-theme", "light");

  // Reload and verify persistence
  await page.reload();
  await expect(html).toHaveAttribute("data-theme", "light");
});
