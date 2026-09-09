import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import path from "node:path";
const evidence = path.resolve("../docs/evidence/ui-platform-expansion");
async function ready(page: Page) {
  await page.evaluate(() => {
    for (const image of document.images) image.loading = "eager";
  });
  await expect
    .poll(
      () =>
        page
          .locator("img")
          .evaluateAll((images) =>
            images.every(
              (image) =>
                image instanceof HTMLImageElement &&
                image.complete &&
                image.naturalWidth > 0,
            ),
          ),
      { timeout: 20000 },
    )
    .toBe(true);
  await page.evaluate(() => document.fonts.ready);
}
async function noOverflow(page: Page) {
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
}
const routes = [
  ["course", "/courses/useful-ai", "Everyday AI, thoughtfully applied"],
  [
    "course-owned",
    "/courses/strength?sample=learner",
    "The foundations of strength",
  ],
  [
    "course-unavailable",
    "/courses/useful-ai?state=unavailable",
    "Everyday AI, thoughtfully applied",
  ],
  ["browse", "/browse", "Browse"],
  ["subject", "/browse/fitness", "Fitness"],
  ["search", "/search", "Search courses and creators"],
  ["search-results", "/search?q=Maya", "Search courses and creators"],
  [
    "search-empty",
    "/search?q=not-a-sample-match",
    "Search courses and creators",
  ],
  ["creator", "/creators/maya-chen", "Maya Chen"],
  ["creators", "/creators", "Creators"],
  ["library", "/library", "My courses"],
  ["library-list", "/library?layout=list", "My courses"],
  ["library-empty", "/library?state=empty", "My courses"],
  ["library-saved", "/library?tab=saved", "Saved courses"],
  ["collections", "/collections", "Learning lists"],
  [
    "collection-detail",
    "/collections/a-little-every-day",
    "A little every day",
  ],
  [
    "lesson",
    "/learn/useful-ai/lesson-1?sample=learner",
    "A clear starting point",
  ],
  [
    "lesson-locked",
    "/learn/useful-ai/lesson-2?sample=visitor",
    "Meet the tools",
  ],
  ["settings", "/settings", "Account Settings"],
  ["purchases", "/settings/purchases", "Purchase history"],
  ["sign-in", "/auth/sign-in", "Continue with Email Address"],
  ["verify", "/auth/verify", "Enter the sample code"],
  ["help", "/help", "Help & preview information"],
  ["new", "/new", "New"],
  ["previews", "/previews", "Lesson previews"],
  ["lessons", "/library/lessons", "Lessons"],
] as const;
for (const [name, url, heading] of routes) {
  test(`route ${name}: responsive render, accessible structure and local assets`, async ({
    page,
  }, info) => {
    const errors: string[] = [];
    const external: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("request", (request) => {
      if (!/^(127\.0\.0\.1|localhost)$/.test(new URL(request.url()).hostname))
        external.push(request.url());
    });
    const response = await page.goto(url);
    expect(response?.status()).toBe(200);
    await expect(
      page.getByRole("heading", { name: heading, exact: true, level: 1 }),
    ).toHaveCount(1);
    await ready(page);
    await noOverflow(page);
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
    expect(external).toEqual([]);
  });
}

test("search, filter, recent query and Back form a working discovery journey", async ({
  page,
}) => {
  await page.goto("/search");
  await page
    .getByRole("searchbox", { name: "Search courses and creators" })
    .fill("Maya");
  await page.getByRole("button", { name: "Search", exact: true }).click();
  await expect(page).toHaveURL(/q=Maya/);
  await expect(page.locator(".catalog-card")).toHaveCount(2);
  await page
    .getByRole("link", {
      name: "View Everyday AI, thoughtfully applied",
      exact: true,
    })
    .click();
  await expect(
    page.getByRole("heading", {
      name: "Everyday AI, thoughtfully applied",
      level: 1,
    }),
  ).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/q=Maya/);
  await page
    .getByRole("combobox", { name: "Price", exact: true })
    .selectOption("free");
  await page.getByRole("button", { name: "Apply filters" }).click();
  await expect(page.locator(".catalog-card")).toHaveCount(1);
  await page.goto("/search");
  await expect(
    page.getByRole("heading", { name: "Recently searched" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Remove recent search Maya" }).click();
  await expect(
    page.getByRole("heading", { name: "Recently searched" }),
  ).toHaveCount(0);
});
test("course details, locked curriculum, offer and saved library are honest", async ({
  page,
  context,
}) => {
  await page.goto("/courses/useful-ai");
  await expect(page.locator(".lesson-row")).toHaveCount(12);
  await page.getByRole("button", { name: /02 Meet the tools/ }).click();
  await expect(
    page
      .getByRole("dialog")
      .getByRole("heading", { name: "This lesson is locked" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: /Buy course/ }).click();
  await expect(
    page.getByRole("heading", { name: "Review the sample offer" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Checkout / enrollment unavailable" }),
  ).toBeDisabled();
  await page.keyboard.press("Escape");
  const save = page.getByRole("button", {
    name: "Save Everyday AI, thoughtfully applied",
    exact: true,
  });
  await save.click();
  await expect(page.getByRole("status")).toContainText("Not enrolled");
  await page.goto("/library?tab=saved");
  await expect(page.locator(".catalog-card")).toHaveCount(1);
  await expect(page.locator(".catalog-card").getByRole("heading")).toHaveText(
    "Everyday AI, thoughtfully applied",
  );
  await page.goto("/courses/useful-ai");
  await page
    .getByRole("button", {
      name: "Unsave Everyday AI, thoughtfully applied",
      exact: true,
    })
    .click();
  await page.goto("/library?tab=saved");
  await expect(
    page.getByRole("heading", { name: "Make room for your next discovery" }),
  ).toBeVisible();
  expect(await context.cookies()).toEqual([]);
  expect(await page.evaluate(() => localStorage.length)).toBe(0);
});

test("context menu supports keyboard selection, list membership and focus return", async ({
  page,
}) => {
  await page.goto("/courses/useful-ai");
  const more = page.getByRole("button", {
    name: "More options for Everyday AI, thoughtfully applied",
  });
  await more.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("menu")).toBeVisible();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("heading", { name: "Add to a learning list" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "A little every day", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText(
    "Added to A little every day",
  );
  await page.keyboard.press("Escape");
  await expect(more).toBeFocused();
  await page.goto("/collections/a-little-every-day");
  await expect(page.locator(".collection-course-list")).toContainText(
    "Everyday AI, thoughtfully applied",
  );
});
test("learning lists can be created, edited, reordered and deleted in this tab", async ({
  page,
}) => {
  await page.goto("/collections");
  await page.getByRole("button", { name: "New list", exact: true }).click();
  await page.getByLabel("Title", { exact: true }).fill("My practice week");
  await page
    .getByLabel("Description", { exact: true })
    .fill("A fictional review list");
  await page.getByRole("button", { name: "Create in this tab" }).click();
  await expect(
    page.getByRole("heading", { name: "My practice week", level: 1 }),
  ).toBeVisible();
  await page.locator(".suggested-grid button").first().click();
  await page.locator(".suggested-grid button").first().click();
  const first = await page
    .locator(".collection-course-list .table-course")
    .first()
    .getAttribute("href");
  await page
    .getByRole("button", { name: /Move .* down/ })
    .first()
    .click();
  await expect(
    page.locator(".collection-course-list .table-course").nth(1),
  ).toHaveAttribute("href", first ?? "");
  await page.getByRole("button", { name: "Edit list", exact: true }).click();
  await page.getByLabel("Title", { exact: true }).fill("A thoughtful week");
  await page.getByRole("button", { name: "Apply changes in this tab" }).click();
  await expect(
    page.getByRole("heading", { name: "A thoughtful week", level: 1 }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Delete this list", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Delete learning list?" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Delete list", exact: true }).click();
  await expect(page).toHaveURL(/\/collections$/);
  await expect(
    page.getByRole("link", { name: /A thoughtful week/ }),
  ).toHaveCount(0);
});

test("native sample playback, transcript seeking, captions, speed and progress work", async ({
  page,
}) => {
  await page.goto("/learn/useful-ai/lesson-1?sample=learner");
  const media = page.locator("video");
  await expect
    .poll(() =>
      media.evaluate((element) => (element as HTMLVideoElement).readyState),
    )
    .toBeGreaterThan(0);
  await page.getByRole("button", { name: "Play sample", exact: true }).click();
  await expect
    .poll(() =>
      media.evaluate((element) => (element as HTMLVideoElement).currentTime),
    )
    .toBeGreaterThan(0.25);
  await page.getByRole("button", { name: "Pause sample", exact: true }).click();
  await page.getByLabel("Playback speed").selectOption("1.5");
  expect(
    await media.evaluate(
      (element) => (element as HTMLVideoElement).playbackRate,
    ),
  ).toBe(1.5);
  await page.getByRole("tab", { name: "Transcript", exact: true }).click();
  await page.locator(".transcript button").nth(2).click();
  await expect
    .poll(() =>
      media.evaluate((element) => (element as HTMLVideoElement).currentTime),
    )
    .toBeCloseTo(12, 0);
  await expect
    .poll(() =>
      media.evaluate(
        (element) => (element as HTMLVideoElement).textTracks[0]?.cues?.length,
      ),
    )
    .toBe(4);
  await page
    .getByRole("button", { name: "Repeat sample", exact: true })
    .click();
  expect(
    await media.evaluate((element) => (element as HTMLVideoElement).loop),
  ).toBe(true);
  await page.getByRole("tab", { name: "Notes", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Note", exact: true })
    .fill("Check one assumption in the sample brief.");
  await page.getByRole("tab", { name: "Resources", exact: true }).click();
  const downloadPromise = page.waitForEvent("download");
  await page
    .getByRole("link", { name: /A better brief Plain-text practice worksheet/ })
    .click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("brief-worksheet.txt");
  await page
    .getByRole("button", { name: "Mark sample complete", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Complete in this tab", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page
    .getByRole("link", { name: "Close lesson and return to course" })
    .click();
  expect(
    await page.evaluate(() =>
      Number(
        sessionStorage.getItem("courses-preview:position:useful-ai:lesson-1"),
      ),
    ),
  ).toBeGreaterThan(10);
  await page.goto("/learn/useful-ai/lesson-1?sample=learner");
  await expect
    .poll(() =>
      page
        .locator("video")
        .evaluate((element) => (element as HTMLVideoElement).currentTime),
    )
    .toBeGreaterThan(10);
  await page.getByRole("tab", { name: "Notes", exact: true }).click();
  await expect(
    page.getByRole("textbox", { name: "Note", exact: true }),
  ).toHaveValue("Check one assumption in the sample brief.");
});

test("visitor lesson locks and media failure states recover without access claims", async ({
  page,
}) => {
  await page.goto("/learn/useful-ai/lesson-2?sample=visitor");
  await expect(page.locator("video")).toHaveCount(0);
  await expect(
    page.getByRole("heading", { name: "This lesson is locked" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Back to the public sample" }).click();
  await expect(page.locator("video")).toHaveCount(1);
  await page.goto("/learn/useful-ai/lesson-1?sample=learner&state=processing");
  await expect(
    page.getByRole("heading", { name: "Sample media is processing" }),
  ).toBeVisible();
  await expect(page.locator("video")).toHaveCount(0);
  await page.getByRole("link", { name: "Show ready sample" }).click();
  await expect(page.locator("video")).toHaveCount(1);
  await page.goto("/learn/useful-ai/lesson-1?sample=learner&state=error");
  await page.getByRole("button", { name: "Retry sample video" }).click();
  await expect(page.locator("video")).toHaveCount(1);
  await page.getByRole("tab", { name: "Curriculum", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: "Transcript", exact: true }),
  ).toHaveAttribute("aria-selected", "true");
});
test("account preview edits and caption preference affect only this tab", async ({
  page,
}) => {
  await page.goto("/settings");
  await page
    .getByRole("button", { name: "Edit sample profile", exact: true })
    .click();
  await page.getByLabel("Display name").fill("Taylor Sample");
  await page.getByRole("button", { name: "Apply in this tab" }).click();
  await expect(page.getByRole("dialog").getByRole("status")).toContainText(
    "this tab only",
  );
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("heading", { name: "Taylor Sample" }),
  ).toBeVisible();
  await page.getByRole("switch", { name: "Captions by default" }).click();
  await expect(
    page.getByRole("switch", { name: "Captions by default" }),
  ).toHaveAttribute("aria-checked", "false");
  await page.goto("/learn/useful-ai/lesson-1?sample=learner");
  await expect
    .poll(() =>
      page
        .locator("video")
        .evaluate((element) => (element as HTMLVideoElement).readyState),
    )
    .toBeGreaterThan(0);
  await expect
    .poll(() =>
      page
        .locator("video")
        .evaluate(
          (element) => (element as HTMLVideoElement).textTracks[0]?.mode,
        ),
    )
    .toBe("disabled");
});

test("storage failure does not display a fake save", async ({ page }) => {
  await page.addInitScript(() => {
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      if (key.startsWith("courses-preview:"))
        throw new Error("Test: preview storage unavailable");
      return original.call(this, key, value);
    };
  });
  await page.goto("/courses/useful-ai");
  const save = page.getByRole("button", {
    name: "Save Everyday AI, thoughtfully applied",
    exact: true,
  });
  await save.click();
  await expect(page.getByRole("status")).toContainText("Nothing was saved");
  await expect(save).toHaveAttribute("aria-pressed", "false");
});
test("local sign-in demonstration validates sample fields without creating an account", async ({
  page,
  context,
}) => {
  // This exercises only our localhost UI simulation, never an identity provider.
  await page.goto("/auth/sign-in?returnTo=/settings");
  await page
    .getByRole("textbox", { name: "Email address", exact: true })
    .fill("not-an-email");
  await page.getByRole("button", { name: "Preview code entry" }).click();
  await expect(page.getByRole("status")).toContainText("email-shaped");
  await page
    .getByRole("textbox", { name: "Email address", exact: true })
    .fill("learner@example.test");
  await page.getByRole("button", { name: "Preview code entry" }).click();
  await expect(page).toHaveURL(/\/auth\/verify/);
  await expect(
    page.getByText(
      "No email was sent. Use 000000 to exercise the code-entry interface.",
    ),
  ).toBeVisible();
  await page
    .getByRole("textbox", { name: "Sample code", exact: true })
    .fill("123456");
  await page.getByRole("button", { name: "Check sample code" }).click();
  await expect(page.getByRole("status")).toContainText("does not match");
  await page.getByRole("button", { name: "Inspect expired state" }).click();
  await page
    .getByRole("textbox", { name: "Sample code", exact: true })
    .fill("000000");
  await page.getByRole("button", { name: "Check sample code" }).click();
  await expect(page.getByRole("status")).toContainText("expired");
  await page.getByRole("button", { name: "Reset code sample" }).click();
  await page.getByRole("button", { name: "Check sample code" }).click();
  await expect(page.getByText(/No identity was verified/)).toBeVisible();
  await page.getByRole("link", { name: "Return to the preview" }).click();
  await expect(page).toHaveURL(/\/settings$/);
  expect(await context.cookies()).toEqual([]);
});
test("lesson sort, tab-only pins and library navigation editing work", async ({
  page,
}, info) => {
  await page.goto("/library/lessons");
  await page.locator(".lesson-library-row button").first().click();
  await page
    .getByRole("link", { name: "Pinned in this tab", exact: true })
    .click();
  await expect(page.locator(".lesson-library-row")).toHaveCount(1);
  await page.locator(".lesson-library-row button").first().click();
  await expect(
    page.getByRole("heading", { name: "No lessons here yet" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Show all sample lessons" }).click();
  await page.getByRole("button", { name: "Sort lessons", exact: true }).click();
  await page.getByRole("menuitem", { name: "Title Z–A", exact: true }).click();
  await expect(page).toHaveURL(/sort=title-desc/);
  if (info.project.name === "desktop") {
    const library = page.getByRole("navigation", {
      name: "Library navigation",
    });
    await library.getByRole("button", { name: "Edit", exact: true }).click();
    await library
      .getByRole("checkbox", { name: "Lesson previews", exact: true })
      .uncheck();
    await library.getByRole("button", { name: "Done", exact: true }).click();
    await expect(
      library.getByRole("link", { name: "Lesson previews", exact: true }),
    ).toHaveCount(0);
    await library.getByRole("button", { name: "Edit", exact: true }).click();
    await library
      .getByRole("checkbox", { name: "Lesson previews", exact: true })
      .check();
    await library.getByRole("button", { name: "Done", exact: true }).click();
    await expect(
      library.getByRole("link", { name: "Lesson previews", exact: true }),
    ).toBeVisible();
  }
});

test("all new route families reflow at 320px, tablet and wide desktop", async ({
  page,
}) => {
  test.setTimeout(90000);
  for (const width of [320, 768, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [, url] of routes) {
      await page.goto(url);
      await expect(page.locator("main h1")).toHaveCount(1);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - innerWidth,
      );
      expect(overflow, `${url} at ${width}px`).toBeLessThanOrEqual(0);
    }
  }
});

test("stored player position survives metadata that is ready before hydration", async ({
  page,
}) => {
  await page.addInitScript(() => {
    if (
      !sessionStorage.getItem("courses-preview:position:useful-ai:lesson-1")
    ) {
      sessionStorage.setItem(
        "courses-preview:position:useful-ai:lesson-1",
        "12",
      );
    }
  });
  for (let attempt = 0; attempt < 3; attempt++) {
    await page.goto("/learn/useful-ai/lesson-1?sample=learner");
    await expect
      .poll(() =>
        page
          .locator("video")
          .evaluate((element) => (element as HTMLVideoElement).currentTime),
      )
      .toBeGreaterThan(10);
    await page
      .getByRole("link", { name: "Close lesson and return to course" })
      .click();
    expect(
      await page.evaluate(() =>
        Number(
          sessionStorage.getItem("courses-preview:position:useful-ai:lesson-1"),
        ),
      ),
    ).toBeGreaterThan(10);
  }
});
