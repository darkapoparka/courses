"""Live player colors must follow artwork and controls, not frozen screen tints."""
from playwright.async_api import expect
from browser_live_fidelity import start, record

async def material(page):
    return await page.locator('.floating-player').evaluate('e=>({background:getComputedStyle(e).backgroundColor,filter:getComputedStyle(e).backdropFilter})')

async def player_contextual_ink(page, context):
    for prefix in ['e72be564', '4f611a9e']:
        await start(page, prefix)
        transport = page.locator('.floating-player .transport')
        play = transport.get_by_role('button', name='Play', exact=True)
        await expect(play).to_have_css('color', 'rgba(0, 0, 0, 0.35)')
        for name in ['Shuffle', 'Repeat']:
            mode = transport.get_by_role('button', name=name, exact=True)
            await expect(mode).to_have_css('color', 'rgba(0, 0, 0, 0.25)')
            await mode.click()
            await expect(mode).to_have_attribute('aria-pressed', 'true')
            color = await mode.evaluate('e=>getComputedStyle(e).color')
            accent = await mode.evaluate('e=>{const p=document.createElement("i");p.style.color="var(--accent)";e.append(p);const c=getComputedStyle(p).color;p.remove();return c}')
            assert color == accent, (name, color, accent)
        await play.click()
        await expect(transport.get_by_role('button', name='Pause', exact=True)).to_be_visible()
        for name in ['Shuffle', 'Repeat']:
            mode = transport.get_by_role('button', name=name, exact=True)
            await expect(mode).to_have_attribute('aria-pressed', 'true')
            await expect(mode).to_have_css('color', accent)
        await transport.get_by_role('button', name='Pause', exact=True).click()
        assert await page.evaluate('document.querySelector("audio").paused')
        await record(page, 'contextual-player-ink-' + prefix, prefix, 'Toggle both modes, start playback and pause; translucent idle ink yields to visible active feedback')

async def replay_live_player_material(page, context):
    expected = {'background': 'rgba(249, 249, 251, 0.5)', 'filter': 'blur(16px) saturate(1.4)'}
    await start(page, 'f3fc07c5')
    assert await material(page) == expected
    await page.get_by_role('tab', name='May', exact=True).click()
    await page.get_by_role('button', name='Open Replay 2026 playlist', exact=True).scroll_into_view_if_needed()
    assert await material(page) == expected
    await record(page, 'replay-live-player-over-artwork', '18225175', 'Select May and scroll the live year artwork under the translucent player')
    queue = page.get_by_role('button', name='Up Next', exact=True)
    await queue.click()
    assert (await material(page))['background'] == 'rgba(249, 249, 251, 0.38)'
    await queue.click()
    assert await material(page) == expected
    await page.get_by_role('button', name='Your Milestones', exact=True).click()
    await expect(page.get_by_role('heading', name='Milestones', exact=True)).to_be_visible()
    assert await material(page) == expected
    await page.get_by_role('button', name='Back to Replay', exact=True).click()
    assert await material(page) == expected
    await page.get_by_role('button', name='Home', exact=True).click()
    await expect(page.get_by_role('heading', name='Home', exact=True)).to_be_visible()
    assert await material(page) == {'background': 'rgba(249, 249, 251, 0.74)', 'filter': 'blur(28px) saturate(1.4)'}

CASES = [('contextual-idle-player-ink', player_contextual_ink),
         ('replay-live-player-material', replay_live_player_material)]

async def compact_player_glyph_controls(page, context):
    for prefix in ['e72be564', '035569a0', '1f9e170c', '54b01eab', '3731221f']:
        await start(page, prefix)
        player = page.locator('.floating-player')
        icons = player.locator('[data-player-glyph]')
        await expect(icons).to_have_count(2 if prefix == '3731221f' else 3)
        assert await icons.locator('image,text,foreignObject').count() == 0
        if prefix != '3731221f':
            lyrics = player.get_by_role('button', name='Show lyrics', exact=True)
            await lyrics.click()
            await expect(page.get_by_role('complementary', name='Lyrics', exact=True)).to_be_visible()
            await expect(lyrics).to_have_attribute('aria-pressed', 'true')
            await lyrics.click()
            await expect(lyrics).to_have_attribute('aria-pressed', 'false')
        queue = player.get_by_role('button', name='Up Next', exact=True)
        await queue.click()
        await expect(page.get_by_role('complementary', name='Up Next queue', exact=True)).to_be_visible()
        await queue.click()
        volume = player.get_by_role('button', name='Volume', exact=True)
        await volume.click()
        slider = page.get_by_role('slider', name='Volume level', exact=True)
        await slider.press('Home')
        await expect(volume.locator('svg')).to_have_attribute('data-player-glyph', 'player-muted')
        await slider.press('End')
        await expect(volume.locator('svg')).to_have_attribute('data-player-glyph', 'player-volume')
        await volume.click()
        await record(page, 'compact-player-glyphs-' + prefix, prefix, 'Round-trip lyrics, queue, keyboard mute and restore without changing compact control identities')

CASES.append(('compact-player-glyph-controls', compact_player_glyph_controls))
