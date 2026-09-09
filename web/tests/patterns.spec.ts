import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import path from "node:path";
const evidence = path.resolve("../docs/evidence/ui-platform-expansion");
const examples = [
  ["language", "/preview/language", "Account Settings"],
  ["language-zh", "/preview/language?locale=zh", "账户设置"],
  ["for-you-empty", "/for-you", "For you"],
  ["pattern-studies", "/preview", "Reference pattern studies"],
  ["events", "/preview/events", "Workshops"],
  [
    "event-detail",
    "/preview/events/a-better-brief",
    "A better brief, together",
  ],
  ["channels", "/preview/channels", "Creator sessions"],
  ["channel-schedule", "/preview/channels/ai-coding", "AI & coding sessions"],
  ["recap", "/preview/recap", "Your month of learning"],
  ["milestone", "/preview/recap/first-step", "A first step"],
  ["content-study", "/preview/content", "Content preference study"],
] as const;
for (const [name, url, title] of examples) {
  test(`pattern ${name}: local route, screenshot and accessibility`, async ({
    page,
  }, info) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    expect((await page.goto(url))?.status()).toBe(200);
    await expect(
      page.getByRole("heading", { name: title, exact: true, level: 1 }),
    ).toBeVisible();
    await page.evaluate(async () => {
      await Promise.all(
        Array.from(document.images).map((image) => {
          image.loading = "eager";
          return image.decode();
        }),
      );
    });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: path.join(evidence, `${name}-${info.project.name}.png`),
      fullPage: true,
    });
    await page.screenshot({
      path: path.join(evidence, `${name}-${info.project.name}-viewport.png`),
    });
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      audit.violations.map(({ id, nodes }) => ({
        id,
        targets: nodes.map((node) => node.target),
      })),
    ).toEqual([]);
    expect(errors).toEqual([]);
  });
}
test("event filters and schedule date navigation have real local state", async ({
  page,
}) => {
  await page.goto("/preview/events");
  await page
    .getByRole("combobox", { name: "Location", exact: true })
    .selectOption("Online");
  await page
    .getByRole("combobox", { name: "Dates", exact: true })
    .selectOption("Sep");
  await page.getByRole("button", { name: "Apply", exact: true }).click();
  await expect(page.locator(".event-grid article")).toHaveCount(1);
  await page
    .getByRole("link", { name: "A better brief, together", exact: true })
    .click();
  await page
    .getByRole("button", { name: "View booking state", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Booking unavailable" }),
  ).toBeDisabled();
  await page.keyboard.press("Escape");
  await page.goto("/preview/channels/ai-coding");
  await page.getByRole("link", { name: "Tomorrow", exact: true }).click();
  await expect(page).toHaveURL(/day=tomorrow/);
  await expect(page.locator(".schedule-time").first()).toHaveText("10:00");
  await page.goto("/preview/recap");
  await page.getByRole("link", { name: "August", exact: true }).click();
  await expect(page.locator(".recap-summary")).toContainText("August");
  await page.getByRole("link", { name: /First sample lesson/ }).click();
  await expect(
    page.getByRole("heading", { name: "A first step", level: 1 }),
  ).toBeVisible();
  await expect(
    page.getByText("ILLUSTRATIVE MILESTONE · NOT EARNED"),
  ).toBeVisible();
});

test("reference study layouts fit narrow, tablet and wide viewports", async ({
  page,
}) => {
  for (const width of [320, 768, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [, url] of examples) {
      await page.goto(url);
      await expect(page.locator("main h1")).toHaveCount(1);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth - innerWidth,
        ),
        `${url} at ${width}px`,
      ).toBeLessThanOrEqual(0);
    }
  }
});
test("interest selection and suggest-less updates are reversible in this tab", async ({
  page,
}) => {
  await page.goto("/for-you");
  await expect(
    page.getByRole("heading", { name: "Your interests, your next discovery" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "AI & coding", exact: true }).click();
  await expect(page.locator(".for-you-courses > article")).toHaveCount(4);
  await page
    .getByRole("button", {
      name: "More options for Everyday AI, thoughtfully applied",
      exact: true,
    })
    .click();
  await page
    .getByRole("menuitem", { name: "Show less in For you", exact: true })
    .click();
  await expect(page.locator(".for-you-courses > article")).toHaveCount(3);
  await page
    .getByRole("button", { name: /Restore hidden suggestions/ })
    .click();
  await expect(page.locator(".for-you-courses > article")).toHaveCount(4);
  await page
    .getByRole("button", { name: "Clear subject choices", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Your interests, your next discovery" }),
  ).toBeVisible();
});

test("sample preference code demonstrates error and confirmation, not security", async ({
  page,
}) => {
  await page.goto("/preview/content");
  await page.getByRole("switch", { name: "Limit example selection" }).click();
  const dialog = page.getByRole("dialog");
  for (let i = 1; i <= 4; i++)
    await dialog
      .getByRole("textbox", { name: `Sample digit ${i}`, exact: true })
      .fill("1");
  await dialog
    .getByRole("button", { name: "Continue demonstration", exact: true })
    .click();
  await expect(dialog.getByRole("status")).toContainText(
    "No real credential is checked",
  );
  for (let i = 1; i <= 4; i++)
    await dialog
      .getByRole("textbox", { name: `Sample digit ${i}`, exact: true })
      .fill("0");
  await dialog
    .getByRole("button", { name: "Continue demonstration", exact: true })
    .click();
  await expect(
    dialog.getByRole("heading", { name: "Confirm the sample code" }),
  ).toBeVisible();
  for (let i = 1; i <= 4; i++)
    await dialog
      .getByRole("textbox", { name: `Sample digit ${i}`, exact: true })
      .fill("0");
  await dialog
    .getByRole("button", { name: "Apply example filter", exact: true })
    .click();
  await expect(
    page.getByRole("switch", { name: "Limit example selection" }),
  ).toHaveAttribute("aria-checked", "true");
  await page
    .getByRole("combobox", { name: "Example level", exact: true })
    .selectOption("Intermediate");
  await expect(page.locator(".preference-result .catalog-card")).toHaveCount(1);
});

test("language study changes the rendered setting labels and supports browser Back", async ({
  page,
}) => {
  await page.goto("/preview/language");
  await page.getByRole("button", { name: "English (UK)", exact: true }).click();
  await page
    .getByRole("dialog")
    .getByRole("combobox", { name: "Language", exact: true })
    .selectOption("zh");
  await page
    .getByRole("button", { name: "Apply to this study", exact: true })
    .click();
  await expect(page).toHaveURL(/locale=zh/);
  await expect(
    page.getByRole("heading", { name: "账户设置", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".language-study")).toHaveAttribute(
    "lang",
    "zh-Hans",
  );
  await page.goBack();
  await expect(
    page.getByRole("heading", { name: "Account Settings", exact: true }),
  ).toBeVisible();
});
