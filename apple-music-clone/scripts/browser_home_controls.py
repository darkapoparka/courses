"""Real Home carousel controls must follow remaining content, not a fixture."""
from playwright.async_api import expect
from browser_live_fidelity import start


async def settled_edges(page):
    # Native scroll moves before React commits the corresponding disabled state.
    await page.wait_for_function("""() => {
        const rail = document.querySelector('.poster-rail .music-rail');
        const buttons = document.querySelectorAll('.poster-rail .rail-arrows button');
        return buttons[0].disabled === (rail.scrollLeft <= 1)
            && buttons[1].disabled === (rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 1);
    }""")


async def home_carousel_boundaries(page, context):
    for width in [1440, 1264, 1024, 768]:
        await start(page, 'a917d88f')
        await page.set_viewport_size({'width': width, 'height': 903})
        rail = page.get_by_role('region', name='Top picks', exact=True)
        next_button = page.locator('.poster-rail button[aria-label="Next Top picks"]')
        previous = page.locator('.poster-rail button[aria-label="Previous Top picks"]')
        await settled_edges(page)
        await expect(previous).to_be_disabled()
        print('HOME WIDTH', width, flush=True)
        visits = []
        for _ in range(8):
            if await next_button.is_disabled():
                break
            await expect(next_button).to_be_visible()
            before = await rail.evaluate('(e)=>e.scrollLeft')
            await next_button.click()
            await page.wait_for_function('(old)=>document.querySelector(".poster-rail .music-rail").scrollLeft > old + 1', arg=before)
            await settled_edges(page)
            visits.append(await rail.evaluate('(e)=>e.scrollLeft'))
        await expect(next_button).to_be_disabled()
        assert visits, (width, 'The carousel never moved')
        remaining = await rail.evaluate('(e)=>e.scrollWidth-e.clientWidth-e.scrollLeft')
        assert remaining <= 1, (width, remaining)
        await expect(rail.locator('[data-card-id="discovery"]')).to_be_in_viewport()
        for _ in range(8):
            if await previous.is_disabled():
                break
            await expect(previous).to_be_visible()
            before = await rail.evaluate('(e)=>e.scrollLeft')
            await previous.click()
            await page.wait_for_function('(old)=>document.querySelector(".poster-rail .music-rail").scrollLeft < old - 1', arg=before)
            await settled_edges(page)
        await expect(previous).to_be_disabled()
        assert await rail.evaluate('(e)=>e.scrollLeft') == 0, width
        await expect(page.locator('.capture-home')).not_to_have_attribute('data-home-underlay')
        await expect(next_button).to_be_visible()
        assert not await page.evaluate('document.documentElement.scrollWidth > innerWidth'), width


async def ordinary_player_material_and_geometry(page, context):
    ordinary_material = {
        'background': 'rgba(249, 249, 251, 0.74)',
        'filter': 'blur(28px) saturate(1.4)',
        'box': {'x': 526, 'y': 833, 'width': 635, 'height': 54},
    }
    current_new_material = {
        'background': 'rgba(249, 249, 251, 0.7)',
        'filter': 'blur(28px) saturate(2)',
        'box': {'x': 526, 'y': 833, 'width': 635, 'height': 54},
    }
    expected_svgs = {
        'Shuffle': {'x': 543.5, 'y': 851, 'width': 18, 'height': 18},
        'Previous track': {'x': 571.5, 'y': 849, 'width': 22, 'height': 22},
        'Play': {'x': 601, 'y': 847.5, 'width': 25, 'height': 25},
        'Next track': {'x': 633.5, 'y': 849, 'width': 22, 'height': 22},
        'Repeat': {'x': 665, 'y': 851, 'width': 18, 'height': 18},
        'Show lyrics': {'x': 1065, 'y': 852, 'width': 16, 'height': 16},
        'Up Next': {'x': 1094.5, 'y': 851.5, 'width': 17, 'height': 17},
        'Volume': {'x': 1122, 'y': 849.75, 'width': 20, 'height': 20},
    }

    async def material():
        return await page.locator('.floating-player').evaluate('''element => {
          const style=getComputedStyle(element); const rect=element.getBoundingClientRect();
          return {background:style.backgroundColor, filter:style.backdropFilter,
            box:{x:rect.x,y:rect.y,width:rect.width,height:rect.height}};
        }''')

    for prefix, expected in [('e72be564', current_new_material), ('a917d88f', ordinary_material)]:
        await start(page, prefix)
        assert await material() == expected, (prefix, await material())
        actual = await page.evaluate('''() => Object.fromEntries(
          [...document.querySelectorAll('.transport button,.player-utilities button')].map(button => {
            const svg=button.querySelector('svg'); const rect=svg.getBoundingClientRect();
            return [button.getAttribute('aria-label'), {x:rect.x,y:rect.y,width:rect.width,height:rect.height}];
          }))''')
        assert actual == expected_svgs, (prefix, actual)

    await start(page, 'e72be564')
    await page.get_by_role('button', name='Play', exact=True).click()
    await expect(page.get_by_role('button', name='Pause', exact=True)).to_be_visible()
    await expect(page.locator('.now-playing')).to_contain_text('stupid song')
    assert await material() == current_new_material
    await page.get_by_role('button', name='Pause', exact=True).click()
    await expect(page.get_by_role('button', name='Play', exact=True)).to_be_visible()
    assert await page.evaluate('document.querySelector("audio").paused')

    await start(page, '54b01eab')
    alpha = await material()
    assert alpha['background'] == 'rgba(249, 249, 251, 0.84)', alpha
    assert alpha['filter'] == 'blur(18px) saturate(1)', alpha

    await start(page, 'ee8db412')
    panel = await material()
    assert panel == {
        'background': 'rgba(249, 249, 251, 0.38)',
        'filter': 'blur(24px) saturate(1.4)',
        'box': {'x': 382.5, 'y': 833, 'width': 635, 'height': 54},
    }, panel


CASES = [('home-carousel-responsive-boundaries', home_carousel_boundaries),
         ('ordinary-player-material-and-geometry', ordinary_player_material_and_geometry)]
