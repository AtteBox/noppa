import test, { expect, Page } from "@playwright/test";
import { assertDefinedOptions, createOptions } from "./helpers/options";

test("user can use predifined prefilled options", async ({ page }) => {
  const predefinedOptionName = "Dice Numbers";
  const predefinedOptions = ["1", "2", "3", "4", "5", "6"];
  await page.goto("/");

  await page.getByRole("button", { name: predefinedOptionName }).click();
  await assertDefinedOptions(page, predefinedOptions);
});

test("user can save and load own prefilled options", async ({ page }) => {
  await page.goto("/");

  const options = ["Option 1", "Option 2"];
  await createOptions(options, page);

  const savedOptionsName = "My Options";
  await savePrefilledOptions(page, savedOptionsName);

  await expect(
    page.getByRole("button", { name: savedOptionsName }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Clear Options" }).click();

  await page.getByRole("button", { name: savedOptionsName }).click();
  await assertDefinedOptions(page, options);
});

test("user can delete own prefilled options", async ({ page }) => {
  await page.goto("/");

  const options = ["Option 1", "Option 2"];
  await createOptions(options, page);

  const savedOptionsName = "My Options 2";
  await savePrefilledOptions(page, savedOptionsName);

  await page.getByTitle(`Delete ${savedOptionsName}`).click();
  await page.getByRole("button", { name: "Yes" }).click();

  await expect(
    page.getByRole("button", { name: savedOptionsName }),
  ).not.toBeVisible();
});

test("user can update own prefilled options", async ({ page }) => {
  await page.goto("/");

  const options = ["Option 1", "Option 2"];
  await createOptions(options, page);

  const savedOptionsName = "My Options 3";
  await savePrefilledOptions(page, savedOptionsName);

  const newOptions = ["Option 3", "Option 4"];
  await createOptions(newOptions, page);

  // options can be updated by just overwriting them with the same name
  await savePrefilledOptions(page, savedOptionsName);

  await page.getByRole("button", { name: savedOptionsName }).click();
  await assertDefinedOptions(page, newOptions);
});

test("user can cancel deleting own prefilled options", async ({ page }) => {
  await page.goto("/");

  const options = ["Option 1", "Option 2"];
  await createOptions(options, page);

  const savedOptionsName = "My Options 4";
  await savePrefilledOptions(page, savedOptionsName);

  await page.getByTitle(`Delete ${savedOptionsName}`).click();
  await page.getByRole("button", { name: "No" }).click();

  await expect(
    page.getByRole("button", { name: savedOptionsName }),
  ).toBeVisible();
});

test("user can cancel saving own prefilled options", async ({ page }) => {
  await page.goto("/");

  const options = ["Option 1", "Option 2"];
  await createOptions(options, page);

  const savedOptionsName = "My Options 5";
  await page.getByRole("button", { name: "Save Options" }).click();
  const saveOptionsNameInput = await page.$("#input-dialog-input");
  await saveOptionsNameInput!.fill(savedOptionsName);
  await page.getByRole("button", { name: "Cancel" }).click();

  await expect(
    page.getByRole("button", { name: savedOptionsName }),
  ).not.toBeVisible();
});

test("cannot save prefilled options without a name", async ({ page }) => {
  await page.goto("/");

  const options = ["Option 1", "Option 2"];
  await createOptions(options, page);

  await page.getByRole("button", { name: "Save Options" }).click();
  await page.getByRole("button", { name: "OK" }).click();

  await expect(page.getByText("Please enter a name.")).toBeVisible();
});

async function savePrefilledOptions(page: Page, name: string) {
  await page.getByRole("button", { name: "Save Options" }).click();
  const saveOptionsNameInput = await page.$("#input-dialog-input");
  await saveOptionsNameInput!.fill(name);
  await expect(page.getByText("Please enter a name.")).not.toBeVisible();
  await page.getByRole("button", { name: "OK" }).click();
}
