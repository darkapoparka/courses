import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import path from "node:path";

const evidence = path.resolve("../docs/evidence/ui-001-final");
async function imagesReady(page: Page) {
  // Document load can precede streamed Home content.
  await expect(page.locator(".editorial-card").first()).toBeVisible();
  await page.evaluate(async () => {
    await Promise.all(
      [...document.images].map((image) => {
        image.loading = "eager";
        return image.decode();
      }),
    );
  });
}
async function noOverflow(page: Page) {
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
}

test("visitor and returning learner render with local images and no runtime errors", async ({
  page,
}, info) => {
  const errors: string[] = [];
  const external: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => {
    if (!new URL(request.url()).hostname.match(/^(127\.0\.0\.1|localhost)$/))
      external.push(request.url());
  });
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Home", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Continue learning", exact: true }),
  ).toHaveCount(0);
  await imagesReady(page);
  await noOverflow(page);
  await page.screenshot({
    path: path.join(evidence, `visitor-${info.project.name}.png`),
    fullPage: true,
  });
  await page.screenshot({
    path: path.join(evidence, `visitor-${info.project.name}-viewport.png`),
  });
  await page.getByRole("link", { name: "Learner", exact: true }).click();
  await expect(page).toHaveURL(/sample=learner/);
  const continuing = page.getByRole("heading", {
    name: "Continue learning",
    exact: true,
  });
  await expect(continuing).toBeVisible();
  expect(
    await continuing.evaluate((element) => {
      const featured = document.getElementById("featured");
      return (
        featured !== null &&
        Boolean(
          element.compareDocumentPosition(featured) &
          Node.DOCUMENT_POSITION_FOLLOWING,
        )
      );
    }),
  ).toBe(true);
  await expect(
    page.getByRole("button", { name: /Resume/ }).first(),
  ).toBeDisabled();
  await expect(page.getByRole("progressbar")).toHaveCount(2);
  await imagesReady(page);
  await noOverflow(page);
  await page.screenshot({
    path: path.join(evidence, `learner-${info.project.name}.png`),
    fullPage: true,
  });
  await page.screenshot({
    path: path.join(evidence, `learner-${info.project.name}-viewport.png`),
  });
  await page.reload();
  await expect(continuing).toBeVisible();
  await page.goBack();
  await expect(continuing).toHaveCount(0);
  expect(errors).toEqual([]);
  expect(external).toEqual([]);
});

test("only implemented destinations are active and sample content is explicit", async ({
  page,
}) => {
  await page.goto("/");
  for (const name of ["Search", "Library", "You"]) {
    await expect(
      page.getByRole("button", {
        name: `${name}: unavailable in this preview`,
      }),
    ).toBeDisabled();
  }
  const hrefs = await page
    .locator("a[href]")
    .evaluateAll((links) =>
      links.map((link) => link.getAttribute("href") ?? ""),
    );
  expect(
    hrefs.every(
      (href) =>
        href.startsWith("#") ||
        href === "/" ||
        href.startsWith("/?") ||
        href.startsWith("/#"),
    ),
  ).toBe(true);
  await expect(
    page.getByText(
      "All courses, creators and prices shown are fictional samples.",
    ),
  ).toBeVisible();
});

test("shelf works with buttons and keyboard, without page overflow", async ({
  page,
}) => {
  await page.goto("/");
  const shelf = page.getByRole("list", {
    name: "Start from scratch",
    exact: true,
  });
  const next = page.getByRole("button", { name: "Next start from scratch" });
  await expect(next).toBeEnabled();
  await next.click();
  await expect
    .poll(() => shelf.evaluate((element) => element.scrollLeft))
    .toBeGreaterThan(100);
  await page
    .getByRole("button", { name: "Previous start from scratch" })
    .click();
  await expect
    .poll(() => shelf.evaluate((element) => element.scrollLeft))
    .toBe(0);
  await shelf.focus();
  await page.keyboard.press("ArrowRight");
  await expect
    .poll(() => shelf.evaluate((element) => element.scrollLeft))
    .toBeGreaterThan(100);
  await noOverflow(page);
});

test("preview dialog traps focus, closes with Escape and restores focus", async ({
  page,
}, info) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "About this preview" });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  const close = page.getByRole("button", { name: "Close preview information" });
  await expect(dialog).toBeVisible();
  await expect(close).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(
    dialog.getByRole("link", { name: "Simulated load failure" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  await page.screenshot({
    path: path.join(evidence, `dialog-${info.project.name}.png`),
  });
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test("empty catalog and simulated error recover honestly", async ({
  page,
}, info) => {
  await page.goto("/?sample=learner&state=empty");
  await expect(
    page.getByRole("heading", { name: "Room for your next discovery." }),
  ).toBeVisible();
  await page.screenshot({
    path: path.join(evidence, `empty-${info.project.name}.png`),
    fullPage: true,
  });
  await page.getByRole("link", { name: "Restore sample courses" }).click();
  await expect(
    page.getByRole("heading", { name: "Continue learning", exact: true }),
  ).toBeVisible();
  await page.goto("/?state=error");
  await expect(
    page.getByRole("heading", { name: "Home couldn't load." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Try again", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Home couldn't load." }),
  ).toBeVisible();
  await page.screenshot({
    path: path.join(evidence, `error-${info.project.name}.png`),
  });
  await page
    .getByRole("link", { name: "Return to sample Home", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Top Picks for You", exact: true }),
  ).toBeVisible();
});

test("loading skeleton streams before the populated Home", async ({
  page,
}, info) => {
  await page.goto("/?state=loading", { waitUntil: "commit" });
  await expect(page.getByTestId("home-loading")).toBeVisible();
  await page.screenshot({
    path: path.join(evidence, `loading-${info.project.name}.png`),
  });
  await expect(page.getByTestId("home-loading")).toHaveCount(0);
  await expect(
    page.getByText("Slow-loading sample complete.", { exact: false }),
  ).toBeVisible();
});

test("Home has no automated accessibility violations and keyboard focus is visible", async ({
  page,
}, info) => {
  await page.goto("/");
  await imagesReady(page);
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  expect(
    await skip.evaluate((element) => getComputedStyle(element).outlineStyle),
  ).toBe("solid");
  await page.screenshot({
    path: path.join(evidence, `focus-${info.project.name}.png`),
  });
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
  await page.goto("/?sample=learner");
  await imagesReady(page);
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
});

test("320px, tablet, wide desktop and reduced motion remain usable", async ({
  page,
}) => {
  for (const width of [320, 768, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/?sample=learner");
    await noOverflow(page);
    await expect(
      page.getByRole("heading", { name: "Home", exact: true }),
    ).toBeVisible();
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
});

test("reference-shaped shelves retain their proportions and editorial scrolling works", async ({
  page,
}, info) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await imagesReady(page);
  const card = await page.locator(".editorial-card").first().boundingBox();
  const cover = await page.locator(".course-art").first().boundingBox();
  expect(card).not.toBeNull();
  expect(cover).not.toBeNull();
  if (!card || !cover) throw new Error("Missing Home artwork");
  expect(card.width / card.height).toBeCloseTo(0.75, 2);
  expect(cover.width / cover.height).toBeCloseTo(1, 2);
  if (info.project.name === "desktop") {
    // VIS-07 source pixels normalized from 3024px to 1440px width.
    // These checks concern layout, not pixel identity of fonts or artwork.
    expect(Math.abs(card.x - 285.7)).toBeLessThan(1.5);
    expect(Math.abs(card.y - 135.2)).toBeLessThan(1.5);
    expect(Math.abs(card.width - 265.2)).toBeLessThan(1.5);
    expect(Math.abs(cover.x - 285.7)).toBeLessThan(1.5);
    expect(Math.abs(cover.y - 571)).toBeLessThan(1.5);
    expect(Math.abs(cover.width - 209)).toBeLessThan(1.5);
    const rail = await page.locator(".desktop-rail").boundingBox();
    expect(rail?.width).toBe(232);
  }
  expect(
    await page.evaluate(() => getComputedStyle(document.body).fontFamily),
  ).toContain("Arial");
  const shelf = page.getByRole("list", {
    name: "Top Picks for You",
    exact: true,
  });
  const next = page.getByRole("button", { name: "Next top picks for you" });
  await expect(next).toBeEnabled();
  for (let step = 0; step < 6 && (await next.isEnabled()); step++) {
    const before = await shelf.evaluate((element) => element.scrollLeft);
    await next.click();
    await expect
      .poll(() => shelf.evaluate((element) => element.scrollLeft))
      .toBeGreaterThan(before);
  }
  await expect(next).toBeDisabled();
  await noOverflow(page);
  await page.screenshot({
    path: path.join(evidence, `editorial-end-${info.project.name}.png`),
  });
  const before = await shelf.evaluate((element) => element.scrollLeft);
  await shelf.focus();
  await page.keyboard.press("ArrowLeft");
  await expect
    .poll(() => shelf.evaluate((element) => element.scrollLeft))
    .toBeLessThan(before);
});

test("an unimplemented URL has honest not-found handling and a working Home return", async ({
  page,
}) => {
  const response = await page.goto("/not-an-implemented-page");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "Only Home, for now." }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Back to Home", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Top Picks for You", exact: true }),
  ).toBeVisible();
});
