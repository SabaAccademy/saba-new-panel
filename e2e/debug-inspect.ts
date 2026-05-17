/**
 * Debug script: dumps relevant form field selectors from the product create page.
 */
import { test, expect } from "@playwright/test";

test("inspect form field HTML", async ({ page }) => {
  await page.goto("/apps/products/create");
  // Wait for form to load
  await page.waitForSelector("h3", { timeout: 10000 });

  // Get all inputs and their attributes
  const inputs = await page.evaluate(() => {
    const allInputs = Array.from(
      document.querySelectorAll("input:not([type='hidden'])"),
    );
    return allInputs.slice(0, 15).map((el) => {
      const input = el as HTMLInputElement;
      return {
        type: input.type,
        id: input.id,
        name: input.name,
        placeholder: input.placeholder,
        ariaHidden: input.getAttribute("aria-hidden"),
        ariaLabel: input.getAttribute("aria-label"),
      };
    });
  });

  // Get all labels
  const labels = await page.evaluate(() => {
    const allLabels = Array.from(document.querySelectorAll("label"));
    return allLabels.slice(0, 10).map((el) => ({
      text: el.textContent?.trim().slice(0, 40),
      htmlFor: el.htmlFor,
    }));
  });

  console.log("=== INPUTS ===");
  console.log(JSON.stringify(inputs, null, 2));
  console.log("=== LABELS ===");
  console.log(JSON.stringify(labels, null, 2));

  // Always pass — this is just for inspection
  expect(inputs.length).toBeGreaterThan(0);
});
