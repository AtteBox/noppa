import { expect } from "@playwright/test";

export async function createOptions(options: string[], page) {
  for (const option of options) {
    await page.getByPlaceholder("New Option").fill(option);
    await page.getByRole("button", { name: "Add Option" }).click();
  }
}

/**
 * Updates option based on provided previous value
 * @param page
 * @param oldOptionValue
 * @param newOptionValue
 */
export async function updateOption(
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

export async function assertDefinedOptions(page, options: string[]) {
  const optionInputs = await page.getByRole("textbox").all();
  const allOptionInputValues = await Promise.all(
    optionInputs.map((input) => input.inputValue()),
  );

  for (const option of options) {
    await expect(allOptionInputValues).toContainEqual(option);
  }
}

export async function assertDefinedOptionsNotToContain(page, option: string) {
  const optionInputs = await page.getByRole("textbox").all();
  const allOptionInputValues = await Promise.all(
    optionInputs.map((input) => input.inputValue()),
  );

  await expect(allOptionInputValues).not.toContainEqual(option);
}
