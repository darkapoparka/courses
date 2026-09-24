"""Source-ordered Artist journeys and sidebar-chrome regressions."""
from playwright.async_api import expect
from browser_live_fidelity import BASE, record, source, start, wait_for_visual_assets
from qa_identity import reference_viewport


async def start_flow(page, slug, first_prefix):
    sid = source(first_prefix)
    await page.set_viewport_size(reference_viewport(sid))
    response = await page.goto(f"{BASE}/flows/{slug}?step=0", wait_until="networkidle")
    assert response and response.status == 200
    await page.locator('div[data-reference-ready="true"]:not(.music-app)').wait_for()
    await page.evaluate("document.fonts.ready")
    await wait_for_visual_assets(page)
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
    for prefix in ("484851bf", "57f7c08e", "edae3407", "c9a554f4", "0c042c32", "9105a602", "653efa95", "898ca766"):
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


async def watching_a_music_video(page, context):
    journey = "d3879ab4-watching-a-music-video"
    await start_flow(page, "watching-a-music-video", "edae3407")
    await assert_playlist_chrome(page, False)
    await record(page, journey, "edae3407", "Initial Music Videos shelf", move_pointer=False)

    begged = page.get_by_role("button", name="Open Begged (Lyric Video)", exact=True)
    await begged.hover()
    video_card = page.locator('[data-video-card="Begged (Lyric Video)"]')
    await expect(video_card.get_by_role("button", name="More actions for Begged (Lyric Video)", exact=True)).to_be_visible()
    await expect(video_card.locator("[data-video-hover-actions]")).to_be_visible()
    await record(page, journey, "898ca766", "Hover Begged (Lyric Video) to reveal its play and more controls", move_pointer=False)

    await begged.click()
    player = page.get_by_role("dialog", name="Video player", exact=True)
    await expect(player).to_be_visible()
    assert await page.locator(".music-app").get_attribute("data-source") is None, "The real video action must leave fixture-only source state behind."
    await expect(player.get_by_role("slider", name="Video position", exact=True)).to_have_value("0")
    volume = player.get_by_role("slider", name="Video volume", exact=True)
    await expect(volume).to_be_visible()
    await expect(player.locator(".video-volume-control svg")).to_have_count(0)
    volume_box = await volume.bounding_box()
    assert volume_box and abs(volume_box["x"] - 28) <= 1 and abs(volume_box["width"] - 58) <= 1, volume_box
    await expect(player.get_by_role("button", name="Pause video", exact=True)).to_be_visible()
    await expect(player.locator("video[src]")).to_have_count(0)
    await page.wait_for_function("document.querySelector('[aria-label=\"Video position\"]')?.value === '6'")
    await record(page, journey, "a4afd6e6", "Play the silent local video preview and reach its recorded six-second state")
    assert await page.locator("audio").evaluate("element => element.paused"), "Opening a silent video preview must not start unrelated audio."


CASES = [
    ("artist-source-sidebar-chrome", source_chrome),
    ("recorded-artist-detail", artist_detail),
    ("recorded-nearby-concerts", nearby_concerts),
    ("recorded-artist-suggest-less", suggest_less),
    ("recorded-watching-a-music-video", watching_a_music_video),
]
