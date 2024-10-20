import { test, expect } from "@playwright/test";

test("user can add options and get a random answer", async ({ page }) => {
  await page.goto("/");

  await assertStepIsHighlighted(page, 1);

  const options = ["Option 1", "Option 2"];

  for (const option of options) {
    await page.getByPlaceholder("New Option").fill(option);
    await page.getByRole("button", { name: "Add Option" }).click();
  }

  await assertDefinedOptions(page, options);

  await page.getByRole("button", { name: "Throw Dice!" }).click();

  await assertStepIsHighlighted(page, 2);

  await waitForResult(page);
  await assertStepIsHighlighted(page, 3);

  await assertResult(page, options);
});

test("user can modify options and get a random answer", async ({ page }) => {
  await page.goto("/");

  const options = ["Option 1", "Option 2"];

  for (const option of options) {
    await page.getByPlaceholder("New Option").fill(option);
    await page.getByRole("button", { name: "Add Option" }).click();
  }
  await page.getByRole("button", { name: "Throw Dice!" }).click();

  await page.getByRole("button", { name: "Modify Options" }).click();

  await assertStepIsHighlighted(page, 1);

  const newOptions = ["Option 3", "Option 4"];

  for (let i = 0; i < options.length; i++) {
    await updateOption(page, options[i], newOptions[i]);
  }

  await assertDefinedOptions(page, newOptions);

  await page.getByRole("button", { name: "Throw Dice!" }).click();

  await waitForResult(page);
  await assertStepIsHighlighted(page, 3);

  await assertResult(page, newOptions);
});

test("user can delete an option", async ({ page }) => {
  await page.goto("/");

  const options = ["Option 1", "Option 2"];

  for (const option of options) {
    await page.getByPlaceholder("New Option").fill(option);
    await page.getByRole("button", { name: "Add Option" }).click();
  }

  await page.getByRole("button", { name: "Delete" }).nth(1).click();
  await assertDefinedOptionsNotToContain(page, options[1]);
});

test("user can reset the options (Start Over)", async ({ page }) => {
  await page.goto("/");

  await assertStepIsHighlighted(page, 1);

  const options = ["Option 1", "Option 2"];

  for (const option of options) {
    await page.getByPlaceholder("New Option").fill(option);
    await page.getByRole("button", { name: "Add Option" }).click();
  }

  await page.getByRole("button", { name: "Throw Dice!" }).click();

  await page.getByRole("button", { name: "Start Over" }).click();
  await assertStepIsHighlighted(page, 1);
  await assertDefinedOptionsNotToContain(page, options[0]);
  await assertDefinedOptionsNotToContain(page, options[1]);
});

test("user can rethrow the dice", async ({ page }) => {
  await page.goto("/");

  const options = ["Option 1", "Option 2"];

  for (const option of options) {
    await page.getByPlaceholder("New Option").fill(option);
    await page.getByRole("button", { name: "Add Option" }).click();
  }

  await page.getByRole("button", { name: "Throw Dice!" }).click();

  await page.getByRole("button", { name: "Rethrow" }).click();
  await assertStepIsHighlighted(page, 2);
  await waitForResult(page);
  await assertStepIsHighlighted(page, 3);
  await assertResult(page, options);
});

test("user can clear options", async ({ page }) => {
  await page.goto("/");

  const options = ["Option 1", "Option 2"];

  for (const option of options) {
    await page.getByPlaceholder("New Option").fill(option);
    await page.getByRole("button", { name: "Add Option" }).click();
  }

  await page.getByRole("button", { name: "Clear Options" }).click();
  await assertStepIsHighlighted(page, 1);
  await assertDefinedOptionsNotToContain(page, options[0]);
  await assertDefinedOptionsNotToContain(page, options[1]);
});

async function waitForResult(page) {
  // the result is displayed, when the buttons appear
  await expect(
    page.getByRole("button", { name: "Modify Options" })
  ).toBeVisible();
}

/**
 * Assets that the result is one of the provided options
 * @param page
 * @param options
 */
async function assertResult(page, options: string[]) {
  await expect(
    page.getByText(
      new RegExp("^(" + options.map(escapeRegExp).join("|") + ")$"),
    ),
  ).toBeVisible();
}

/**
 * Updates option based on provided previous value
 * @param page
 * @param oldOptionValue
 * @param newOptionValue
 */
async function updateOption(
  page,
  oldOptionValue: string,
  newOptionValue: string,
) {
  const optionInputs = await page.getByRole("textbox").all();
  const allOptionInputValues = await Promise.all(
    optionInputs.map((input) => input.inputValue()),
  );
  const inputIndex = allOptionInputValues.findIndex(
    (inputValue) => inputValue === oldOptionValue,
  );
  const input = optionInputs[inputIndex];
  await input.fill(newOptionValue);
}

async function assertDefinedOptions(page, options: string[]) {
  const optionInputs = await page.getByRole("textbox").all();
  const allOptionInputValues = await Promise.all(
    optionInputs.map((input) => input.inputValue()),
  );

  for (const option of options) {
    await expect(allOptionInputValues).toContainEqual(option);
  }
}

async function assertDefinedOptionsNotToContain(page, option: string) {
  const optionInputs = await page.getByRole("textbox").all();
  const allOptionInputValues = await Promise.all(
    optionInputs.map((input) => input.inputValue()),
  );

  await expect(allOptionInputValues).not.toContainEqual(option);
}

async function assertStepIsHighlighted(page, stepNumber) {
  const steps = ["1. Define Options", "2. Throwing Dice", "3. Result"];
  for (let i = 0; i < steps.length; i++) {
    const textDecoration = page.locator(`text=${steps[i]}`).evaluate((el) => {
      return window.getComputedStyle(el).getPropertyValue("text-decoration");
    });
    if (i === stepNumber - 1) {
      await expect(textDecoration).resolves.toContain("underline");
    } else {
      await expect(textDecoration).resolves.not.toContain("underline");
    }
  }
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}
