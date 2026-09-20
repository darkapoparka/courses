"""End-of-track behavior through visible controls in silent local preview."""
from playwright.async_api import expect
from browser_live_fidelity import start, record

async def prepare(page, autoplay):
    await start(page, '8f029018')
    panel = page.get_by_role('complementary', name='Up Next queue', exact=True)
    await panel.get_by_role('button', name='Clear', exact=True).click()
    toggle = panel.get_by_role('button', name='Autoplay', exact=True)
    if autoplay:
        await toggle.click()
    await expect(toggle).to_have_attribute('aria-pressed', str(autoplay).lower())
    await page.get_by_role('button', name='Expand stupid song', exact=True).click()
    await page.get_by_role('button', name='Pause', exact=True).click()
    await page.get_by_role('button', name='Play', exact=True).click()
    return page.get_by_role('slider', name='Playback position', exact=True)

async def silent_autoplay_completion(page, context):
    seek = await prepare(page, True)
    await seek.fill(await seek.get_attribute('max'))
    await expect(page.locator('.expanded-meta strong')).to_have_text('Bunker/Preroll')
    await expect(page.get_by_role('button', name='Pause', exact=True)).to_be_visible()
    assert await page.evaluate('document.querySelector("audio").paused')
    assert await page.evaluate('!document.querySelector("audio").getAttribute("src")')
    await record(page, 'silent-autoplay-completion', '8f029018', 'Seek to the end with an empty queue and Autoplay on; the visible preview recommendation starts silently. Regression, not archived FLOW acceptance.')

async def silent_repeat_and_stop(page, context):
    seek = await prepare(page, False)
    repeat = page.get_by_role('button', name='Repeat', exact=True)
    await repeat.click()
    await seek.fill(await seek.get_attribute('max'))
    await expect(page.locator('.expanded-meta strong')).to_have_text('stupid song')
    await page.wait_for_function("Number(document.querySelector('.seek-control input').value) < 2")
    await expect(page.get_by_role('button', name='Pause', exact=True)).to_be_visible()
    await repeat.click()
    await seek.fill(await seek.get_attribute('max'))
    await expect(page.get_by_role('button', name='Play', exact=True)).to_be_visible()
    await expect(page.locator('.expanded-meta strong')).to_have_text('stupid song')
    assert await page.evaluate('document.querySelector("audio").paused')

CASES = [('silent-autoplay-completion', silent_autoplay_completion),
         ('silent-repeat-and-stop', silent_repeat_and_stop)]
