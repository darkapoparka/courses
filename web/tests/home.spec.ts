import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import path from "node:path";

const evidence = path.resolve("../docs/evidence/ui-001-home-content");
async function imagesReady(page: Page) {
  await expect(page.locator(".editorial-card").first()).toBeVisible();
  await page.evaluate(() => {
    for (const image of document.images) image.loading = "eager";
  });
  await expect
    .poll(
      () =>
        page
          .locator("img")
          .evaluateAll((images) =>
            images
              .filter(
                (image) =>
                  !(image instanceof HTMLImageElement) ||
                  !image.complete ||
                  image.naturalWidth === 0,
              )
              .map((image) => image.getAttribute("src")),
          ),
      {
        timeout: 20_000,
        message: "Every local image should load successfully",
      },
    )
    .toEqual([]);
  await page.evaluate(() => document.fonts.ready);
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
  // The hash targets main, below the mobile header, with CSS scroll padding.
  // Verify that navigation settles at that real target before normalizing the capture.
  await expect
    .poll(() =>
      page.locator("#main-content").evaluate((element) => {
        const padding =
          parseFloat(
            getComputedStyle(document.documentElement).scrollPaddingTop,
          ) || 0;
        const target = Math.max(
          0,
          element.getBoundingClientRect().top + scrollY - padding,
        );
        return Math.abs(scrollY - target);
      }),
    )
    .toBeLessThan(2);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
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
    const coverPositions = await page
      .locator(".course-art")
      .evaluateAll((items) =>
        items
          .slice(0, 5)
          .map((item) => Math.round(item.getBoundingClientRect().x)),
      );
    expect(coverPositions).toEqual([285, 512, 739, 966, 1193]);
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
  // The disabled end control intentionally leaves the accessibility tree on desktop.
  // Include it here to assert its disabled DOM state, not to click a hidden control.
  const next = page.getByRole("button", {
    name: "Next top picks for you",
    includeHidden: true,
  });
  await expect(next).toBeEnabled();
  for (let step = 0; step < 6 && (await next.isEnabled()); step++) {
    const before = await shelf.evaluate((element) => element.scrollLeft);
    await next.click();
    await expect
      .poll(() => shelf.evaluate((element) => element.scrollLeft))
      .toBeGreaterThan(before);
  }
  await expect(next).toBeDisabled();
  if (info.project.name === "desktop") await expect(next).not.toBeVisible();
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

test("reference header stays quiet and preview controls remain reachable", async ({
  page,
}, info) => {
  await page.goto("/");
  await imagesReady(page);
  await expect(page.locator(".page-heading")).toHaveText("Home");
  await expect(
    page
      .locator("#preview-options")
      .getByRole("link", { name: "Learner", exact: true }),
  ).toBeVisible();
  if (info.project.name === "desktop") {
    const heading = await page.locator("#short-heading").boundingBox();
    expect(heading).not.toBeNull();
    // Course metadata adds useful information beyond the music two-line caption.
    // Keep the compact discovery rows after the main course shelf.
    expect(heading?.y).toBeGreaterThan(780);
    await expect(
      page.locator("#short-courses .short-course-trigger"),
    ).toHaveCount(6);
    await expect(page.locator(".desktop-rail")).toHaveCSS(
      "background-color",
      "rgb(249, 249, 251)",
    );
    await expect(page.locator(".nav-item.active").first()).toHaveCSS(
      "background-color",
      "rgb(239, 238, 241)",
    );
  }
  await page.getByRole("link", { name: "Learner", exact: true }).click();
  await expect(page).toHaveURL(/sample=learner/);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(40);
});

test("desktop shelf controls reveal on keyboard focus; mobile keeps them visible", async ({
  page,
}, info) => {
  await page.goto("/");
  await imagesReady(page);
  await page.mouse.move(0, 0);
  const controls = page.locator("#featured .shelf-controls");
  await expect(controls).toHaveCSS(
    "opacity",
    info.project.name === "desktop" ? "0" : "1",
  );
  const next = page.getByRole("button", { name: "Next top picks for you" });
  await next.focus();
  await expect(controls).toHaveCSS("opacity", "1");
  const bounds = await next.boundingBox();
  expect(bounds).not.toBeNull();
  expect((bounds?.x ?? 0) + (bounds?.width ?? 0)).toBeLessThanOrEqual(
    page.viewportSize()?.width ?? 0,
  );
  await page.keyboard.press("Enter");
  await expect
    .poll(() =>
      page
        .locator(".editorial-shelf")
        .evaluate((element) => element.scrollLeft),
    )
    .toBeGreaterThan(100);
  await noOverflow(page);
  await page.screenshot({
    path: path.join(evidence, `shelf-keyboard-${info.project.name}.png`),
  });
});

test("editorial collections and topic cards navigate to real Home shelves", async ({
  page,
}) => {
  await page.goto("/");
  for (const [subject, label] of [
    ["ai-coding", "AI & coding"],
    ["fitness", "Fitness"],
    ["business", "Business"],
    ["creative", "Creative skills"],
    ["finance", "Finance education"],
  ]) {
    await page
      .getByRole("link", {
        name: `Explore ${label} courses on Home`,
        exact: true,
      })
      .click();
    await expect(page).toHaveURL(new RegExp(`#${subject}$`));
    await expect(page.locator(`#${subject} .course-card`)).toHaveCount(4);
    // Native anchors stop at the document end. The last shelf must be fully
    // reachable, not padded with a blank viewport just to force top alignment.
    await expect
      .poll(() =>
        page.locator(`#${subject}`).evaluate((element) => {
          const top = element.getBoundingClientRect().top;
          const maximumScroll =
            document.documentElement.scrollHeight - innerHeight;
          const atDocumentEnd = Math.abs(scrollY - maximumScroll) < 2;
          const dock = document.querySelector(".mobile-dock");
          const dockHeight = dock ? dock.getBoundingClientRect().height : 0;
          return (
            top >= 0 &&
            (top < 100 ||
              (atDocumentEnd && top < innerHeight - dockHeight - 60))
          );
        }),
      )
      .toBe(true);
    await expect(page.locator(`#${subject} h2`)).toBeInViewport();
  }
  await page
    .locator("#topics")
    .getByRole("link", { name: "Creative skills", exact: true })
    .click();
  await expect(page).toHaveURL(/#creative$/);
  await expect(page.locator("#creative h2")).toHaveText(
    "See what you can make",
  );
});

test("Home course information shows useful sample facts with keyboard dismissal", async ({
  page,
}, info) => {
  await page.goto("/");
  const trigger = page.locator("#essentials").getByRole("button", {
    name: "Course information: Everyday AI, thoughtfully applied",
    exact: true,
  });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(
    dialog.getByRole("heading", {
      name: "Everyday AI, thoughtfully applied",
      exact: true,
    }),
  ).toBeVisible();
  await expect(dialog.getByText("$49 USD", { exact: true })).toBeVisible();
  await expect(dialog.getByText("12 lessons", { exact: true })).toBeVisible();
  await expect(dialog.getByText(/fictional creator/)).toBeVisible();
  await expect(dialog.locator(".course-outcomes li")).toHaveCount(2);
  await expect(
    dialog.getByRole("button", { name: "Close course information" }),
  ).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(
    dialog.getByRole("button", { name: "Back to browsing" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    dialog.getByRole("button", { name: "Close course information" }),
  ).toBeFocused();
  await page.screenshot({
    path: path.join(evidence, `course-info-${info.project.name}.png`),
  });
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await noOverflow(page);
});

test("free sample information is not enrollment or fake persistence", async ({
  page,
  context,
}) => {
  await page.goto("/");
  await page
    .locator("#short-courses")
    .getByRole("button", {
      name: "Course information: A better brief, a better AI answer",
      exact: true,
    })
    .click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByText("Free", { exact: true })).toBeVisible();
  await expect(
    dialog.getByText(/Lessons, enrollment, and purchases are not available/),
  ).toBeVisible();
  await expect(
    dialog.getByRole("button", { name: /buy|enroll|play lesson/i }),
  ).toHaveCount(0);
  await dialog.getByRole("button", { name: "Back to browsing" }).click();
  await expect(dialog).toHaveCount(0);
  expect(await context.cookies()).toEqual([]);
  expect(await page.evaluate(() => localStorage.length)).toBe(0);
});

test("course information remains scrollable and dismissible at 320px", async ({
  page,
}, info) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto("/");
  await page
    .locator("#essentials")
    .getByRole("button", {
      name: "Course information: Photography: a different way to see",
      exact: true,
    })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page
    .getByRole("button", { name: "Back to browsing" })
    .scrollIntoViewIfNeeded();
  await page.screenshot({
    path: path.join(evidence, `course-info-320-${info.project.name}.png`),
  });
  await page.getByRole("button", { name: "Back to browsing" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await noOverflow(page);
});
