"""Read Chromium's actual platform-font usage without copying any font files."""
async def platform_fonts(page):
    session = await page.context.new_cdp_session(page)
    try:
        await session.send('DOM.enable')
        await session.send('CSS.enable')
        root = (await session.send('DOM.getDocument', {'depth': 0}))['root']['nodeId']
        result = {}
        for selector in ('h1', '.sidebar-row span', '.song-title', '.table-song-title', '.panel-lyric-viewport li[aria-current="true"] button'):
            node = (await session.send('DOM.querySelector', {'nodeId': root, 'selector': selector}))['nodeId']
            if node:
                result[selector] = (await session.send('CSS.getPlatformFontsForNode', {'nodeId': node}))['fonts']
        return result
    finally:
        await session.detach()
