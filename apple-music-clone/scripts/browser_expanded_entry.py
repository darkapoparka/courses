"""Real compact-player entry into the recorded fullscreen song state."""
from playwright.async_api import expect
from browser_live_fidelity import start, record


async def expanded_song_entry(page, context):
    await start(page, '6ac70c34')
    app = page.locator('.music-app')
    await expect(app).to_have_attribute('data-scene', 'new')
    await expect(page.locator('.profile-button')).to_contain_text('SmithAlex')
    await expect(page.locator('.capture-discovery')).to_have_attribute('data-catalog', 'legacy')
    opener = page.get_by_role('button', name='Expand stupid song', exact=True)
    await expect(opener).to_be_visible()
    await expect(page.get_by_role('button', name='Pause', exact=True)).to_be_visible()
    await record(page, 'expanded-song-entry', '6ac70c34',
                 'Initial recorded compact-player state before the visible fullscreen control')

    await opener.click()
    expanded = page.locator('.expanded-player[aria-label="Expanded player"]')
    await expect(expanded).to_be_visible()
    await expect(expanded).to_have_attribute('data-player-ambience', 'opening')
    await expect(page.locator('.expanded-meta strong')).to_have_text('stupid song')
    await expect(page.get_by_role('button', name='Hide lyrics', exact=True)).to_be_visible()
    await expect(page.get_by_role('slider', name='Playback position', exact=True)).to_be_visible()
    await expect(page.get_by_label('Reference lyrics', exact=True)).to_be_visible()
    await expect(page.get_by_role('button', name='Close expanded player', exact=True)).to_be_visible()
    assert await app.get_attribute('data-source') is None
    await expect(page.locator('.capture-discovery')).to_have_attribute('data-catalog', 'legacy')
    await record(page, 'expanded-song-entry', 'c939c9b8',
                 'Open fullscreen song playback with the real compact now-playing control; regression coverage for the video-visible 6ac70c34 to c939c9b8 segment')


CASES = [('expanded-song-entry', expanded_song_entry)]
