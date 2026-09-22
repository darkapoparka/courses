"""Source-ordered Artist journeys and sidebar-chrome regressions."""
from playwright.async_api import expect
from browser_live_fidelity import BASE, record, source, start
from qa_identity import reference_viewport


async def start_flow(page, slug, first_prefix):
    sid = source(first_prefix)
    await page.set_viewport_size(reference_viewport(sid))
    response = await page.goto(f"{BASE}/flows/{slug}?step=0", wait_until="networkidle")
    assert response and response.status == 200
    await page.locator('[data-reference-ready="true"]').wait_for()
    await page.evaluate("document.fonts.ready")
    await expect(page.locator(".music-app")).to_have_attribute("data-source", sid)
    await expect(page.locator(".music-app")).to_have_attribute("data-flow", slug)


async def assert_playlist_chrome(page, saved_playlists):
    navigation = page.get_by_role("navigation", name="Playlists", exact=True)
    await expect(navigation.get_by_role("button", name="All Playlists", exact=True)).to_be_visible()
    for name in ("Favourite Songs", "Emotional Songs"):
        item = navigation.get_by_role("button", name=name, exact=True)
        if saved_playlists:
            await expect(item).to_be_visible()
        else:
            await expect(item).to_have_count(0)


async def wheel_target_to_reference_top(page, selector, top):
    main = page.locator(".music-main")
    target = page.locator(selector)
    await page.mouse.move(1000, 420)
    for _ in range(8):
        main_box = await main.bounding_box()
        target_box = await target.bounding_box()
        assert main_box and target_box
        delta = target_box["y"] - (main_box["y"] + top)
        if abs(delta) < 1:
            return
        await page.mouse.wheel(0, delta)
        await page.evaluate("new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))")
    main_box = await main.bounding_box()
    target_box = await target.bounding_box()
    assert main_box and target_box
    assert abs(target_box["y"] - (main_box["y"] + top)) < 1, (selector, main_box, target_box)


async def source_chrome(page, context):
    for prefix in ("484851bf", "57f7c08e", "edae3407", "c9a554f4", "0c042c32", "9105a602", "653efa95"):
        await start(page, prefix)
        await assert_playlist_chrome(page, False)
    for prefix in ("bc773ae9", "f24fda77"):
        await start(page, prefix)
        await assert_playlist_chrome(page, True)


async def artist_detail(page, context):
    journey = "98bde04b-artist-detail"
    await start_flow(page, "artist-detail", "e72be564")
    await page.get_by_role("button", name="Play Shabang", exact=True).hover()
    await assert_playlist_chrome(page, False)
    await record(page, journey, "e72be564", "Initial New state", move_pointer=False)

    await page.get_by_role("button", name="Olivia Rodrigo", exact=True).click()
    await expect(page.locator(".music-app")).to_have_attribute("data-scene", "artist")
    await expect(page.get_by_role("heading", name="Olivia Rodrigo", exact=True)).to_be_visible()
    await assert_playlist_chrome(page, False)
    await record(page, journey, "484851bf", "Open Olivia Rodrigo from the visible song artist control")

    for selector, top, prefix, action in (
        ("#essential-albums", 24, "57f7c08e", "Scroll to Essential Albums"),
        ("#music-videos", 38, "edae3407", "Scroll to Music Videos"),
        ("#nearby-concerts", 32, "c9a554f4", "Scroll to Nearby Concerts"),
        ("#about-artist", 186, "0c042c32", "Scroll to About Olivia Rodrigo"),
    ):
        await wheel_target_to_reference_top(page, selector, top)
        await assert_playlist_chrome(page, False)
        await record(page, journey, prefix, action)


async def nearby_concerts(page, context):
    journey = "138a3f56-nearby-concerts"
    await start_flow(page, "nearby-concerts", "484851bf")
    await assert_playlist_chrome(page, False)
    await record(page, journey, "484851bf", "Initial artist detail state")

    await page.get_by_role("button", name="Nearby Concerts", exact=True).click()
    await expect(page.locator(".music-app")).to_have_attribute("data-scene", "nearby")
    await expect(page.get_by_role("heading", name="Nearby Concerts", exact=True)).to_be_visible()
    await assert_playlist_chrome(page, False)
    await record(page, journey, "9105a602", "Open Nearby Concerts from the artist hero")

    await page.mouse.move(1000, 420)
    await page.mouse.wheel(0, 372)
    await page.evaluate("new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))")
    scroll_top = await page.locator(".music-main").evaluate("element => element.scrollTop")
    assert abs(scroll_top - 372) < 1, scroll_top
    await assert_playlist_chrome(page, False)
    await record(page, journey, "653efa95", "Scroll the nearby-concert list to the recorded offset")


async def suggest_less(page, context):
    journey = "bb755884-marking-a-song-as-suggest-less"
    await start_flow(page, "marking-a-song-as-suggest-less", "484851bf")
    await assert_playlist_chrome(page, False)
    await record(page, journey, "484851bf", "Initial artist detail state")

    await page.get_by_role("button", name="More artist actions", exact=True).click()
    menu = page.get_by_role("menu", name="artist actions", exact=True)
    artist_art = page.get_by_role("img", name="Olivia Rodrigo artist artwork", exact=True)
    await expect(menu).to_be_visible()
    await expect(menu.get_by_role("menuitem", name="Suggest Less", exact=True)).to_be_visible()
    await expect(artist_art).to_have_attribute("data-art-source", source("bc773ae9"))
    await assert_playlist_chrome(page, True)
    await record(page, journey, "bc773ae9", "Open the artist overflow from its visible control")

    await menu.get_by_role("menuitem", name="Suggest Less", exact=True).click()
    await expect(menu.get_by_role("menuitem", name="Undo Suggest Less", exact=True)).to_be_visible()
    await expect(artist_art).to_have_attribute("data-art-source", source("f24fda77"))
    await assert_playlist_chrome(page, True)
    await record(page, journey, "f24fda77", "Mark the represented song as Suggest Less")


CASES = [
    ("artist-source-sidebar-chrome", source_chrome),
    ("recorded-artist-detail", artist_detail),
    ("recorded-nearby-concerts", nearby_concerts),
    ("recorded-artist-suggest-less", suggest_less),
]
