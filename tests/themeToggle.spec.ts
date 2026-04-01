import { test, expect } from "@playwright/test";

test("user can toggle between light and dark theme", async ({ page }) => {
  await page.goto("/");

  const html = page.locator("html");
  const initialTheme = await html.getAttribute("data-theme");
  const otherTheme = initialTheme === "dark" ? "light" : "dark";

  // Click the theme toggle button
  const themeToggle = page.getByRole("button", {
    name: "Toggle light/dark theme",
  });
  await expect(themeToggle).toBeVisible();

  // Toggle to other theme
  await themeToggle.click();
  await expect(html).toHaveAttribute("data-theme", otherTheme);

  // Toggle back to initial theme
  await themeToggle.click();
  await expect(html).toHaveAttribute("data-theme", initialTheme!);
});

test("theme preference persists across page reloads", async ({ page }) => {
  await page.goto("/");

  const html = page.locator("html");
  const initialTheme = await html.getAttribute("data-theme");
  const otherTheme = initialTheme === "dark" ? "light" : "dark";

  const themeToggle = page.getByRole("button", {
    name: "Toggle light/dark theme",
  });

  // Toggle to other theme
  await themeToggle.click();
  await expect(html).toHaveAttribute("data-theme", otherTheme);

  // Reload and verify persistence
  await page.reload();
  await expect(html).toHaveAttribute("data-theme", otherTheme);
});
