"""Recorded Concerts journeys using real desktop controls and scrolling."""
from playwright.async_api import expect
from browser_live_fidelity import record, source, start


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


async def concerts(page, context):
    journey = "95cd6e33-concerts"
    await start(page, "035569a0")
    await record(page, journey, "035569a0", "Initial Search state")

    await page.get_by_role("button", name="Concerts", exact=True).click()
    await expect(page.locator(".music-app")).to_have_attribute("data-scene", "concerts")
    await expect(page.get_by_role("heading", name="Concerts", exact=True)).to_be_visible()
    await record(page, journey, "a0809fad", "Open Concerts from the visible Browse Categories card")

    await wheel_target_to_reference_top(page, "#nashville", 30)
    await expect(page.get_by_role("heading", name="Concerts in Nashville", exact=True)).to_be_visible()
    await record(page, journey, "70566e85", "Scroll the live Concerts page to Nashville")


async def setting_a_location(page, context):
    journey = "97c2ae4a-setting-a-location"
    await start(page, "a0809fad")
    await record(page, journey, "a0809fad", "Initial Concerts discovery state")

    await page.get_by_role("button", name="Set Location", exact=True).click()
    city = page.get_by_role("combobox", name="Find a city", exact=True)
    await expect(city).to_be_focused()
    await expect(city).to_have_value("")
    await record(page, journey, "bd89b0a1", "Open Set Location and focus the city combobox")

    await city.fill("singapore")
    await expect(page.get_by_text("No cities found", exact=True)).to_be_visible()
    await record(page, journey, "1cd4d25b", "Type Singapore and show the empty-results state")

    await city.fill("chicago")
    suggestions = page.get_by_role("listbox", name="City suggestions", exact=True)
    first = suggestions.get_by_role("option", name="Chicago, IL United States", exact=True)
    await expect(first).to_be_visible()
    await record(page, journey, "f78d223e", "Type Chicago and review its city suggestions")

    await first.click()
    await expect(page.get_by_role("button", name="Chicago, IL", exact=True)).to_be_visible()
    await expect(suggestions).to_have_count(0)
    await record(page, journey, "84b9db6f", "Choose Chicago, IL from the visible suggestion")

    await page.get_by_role("button", name="Chicago, IL", exact=True).click()
    await expect(city).to_be_focused()
    await city.fill("chicago")
    await city.press("Enter")
    await expect(page.get_by_role("button", name="Chicago, IL", exact=True)).to_be_visible()
    await expect(suggestions).to_have_count(0)


async def filtering_concerts(page, context):
    journey = "4dd6b284-filtering-concerts"
    await start(page, "84b9db6f")
    await record(page, journey, "84b9db6f", "Initial Chicago concerts state")

    await page.get_by_role("button", name="Dates", exact=True).click()
    dialog = page.get_by_role("dialog", name="Dates", exact=True)
    await expect(dialog).to_be_visible()
    await record(page, journey, "e1069ba9", "Open the Dates filter")

    await dialog.get_by_role("button", name="Next month", exact=True).click()
    await expect(dialog.get_by_role("button", name="July 2026", exact=True)).to_be_visible()
    await record(page, journey, "b896bf23", "Advance the calendar to July 2026")

    await dialog.get_by_role("button", name="Select 1 July 2026", exact=True).click()
    await dialog.get_by_role("button", name="Select 12 July 2026", exact=True).click()
    await expect(dialog.get_by_role("button", name="Select 1 July 2026", exact=True)).to_have_attribute("aria-pressed", "true")
    await expect(dialog.get_by_role("button", name="Select 12 July 2026", exact=True)).to_have_attribute("aria-pressed", "true")
    await record(page, journey, "e1f20d4a", "Select July 1 through July 12")

    await dialog.get_by_role("button", name="Show Concerts", exact=True).click()
    await expect(dialog).to_have_count(0)
    await expect(page.get_by_role("button", name="Jul 1 - Jul 12", exact=True)).to_be_visible()
    await record(page, journey, "83bba8fd", "Apply the selected date range")

    await page.get_by_role("button", name="Genres", exact=True).click()
    menu = page.get_by_role("menu", name="Concert genres", exact=True)
    await expect(menu).to_be_visible()
    await record(page, journey, "99ffee15", "Open the Genres menu")

    await menu.get_by_role("menuitemradio", name="R&B/Soul", exact=True).click()
    await expect(page.get_by_role("button", name="R&B/Soul", exact=True)).to_be_visible()
    await expect(menu).to_have_count(0)
    await record(page, journey, "d6b9a1a7", "Filter the saved concert collection by R&B/Soul")


CASES = [
    ("recorded-concerts", concerts),
    ("recorded-setting-a-location", setting_a_location),
    ("recorded-filtering-concerts", filtering_concerts),
]
