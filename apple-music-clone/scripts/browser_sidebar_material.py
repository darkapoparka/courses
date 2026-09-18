"""Sidebar material must follow real carousel state, not an acquisition ID."""
import re
from playwright.async_api import expect
from browser_live_fidelity import start, record, source


async def shell_state(page):
    return await page.evaluate('''() => {
      const pane = document.querySelector('.music-sidebar');
      const rail = document.querySelector('[data-rail="Featured music"] .music-rail');
      const style = getComputedStyle(pane);
      const player = getComputedStyle(document.querySelector('.floating-player'));
      return {background: style.background, backgroundImage: style.backgroundImage,
        filter: style.backdropFilter,
        player: {background: player.backgroundColor, filter: player.backdropFilter},
        mainX: document.querySelector('main').getBoundingClientRect().x,
        railX: rail.getBoundingClientRect().x, scroll: rail.scrollLeft,
        artwork: [...document.querySelectorAll('main [data-art-source]')].map(e =>
          [e.dataset.artSource, e.getAttribute('style')]),
        songs: document.querySelector('.viral-grid').innerText};
    }''')


ORDINARY_SHADOW = ('rgba(0, 0, 0, 0.02) 0px 0px 0px 1px inset, '
                   'rgba(0, 0, 0, 0.12) 0px 4px 36px 0px')


async def sidebar_material(page):
    return await page.evaluate('''() => {
      const pane = document.querySelector('.music-sidebar');
      const active = pane.querySelector('.sidebar-row[aria-current="page"]');
      const footer = pane.querySelector('.sidebar-footer');
      const main = document.querySelector('main');
      const paneStyle = getComputedStyle(pane);
      const rect = pane.getBoundingClientRect();
      return {
        backgroundColor: paneStyle.backgroundColor,
        backgroundImage: paneStyle.backgroundImage,
        filter: paneStyle.backdropFilter,
        shadow: paneStyle.boxShadow,
        activeBackground: active ? getComputedStyle(active).backgroundColor : null,
        footerBorder: footer ? getComputedStyle(footer).borderTopColor : null,
        rect: {x: rect.x, y: rect.y, width: rect.width, height: rect.height},
        viewport: {width: innerWidth, height: innerHeight},
        insets: {left: rect.left, top: rect.top,
                 right: innerWidth - rect.right, bottom: innerHeight - rect.bottom},
        overflow: {
          document: document.documentElement.scrollWidth > innerWidth,
          main: main.scrollWidth > main.clientWidth + 1
        }
      };
    }''')


def assert_ordinary_material(state):
    assert state['backgroundColor'] == 'rgb(249, 249, 251)', state
    assert state['backgroundImage'] == 'none', state
    assert state['filter'] == 'blur(16px) saturate(1.8)', state
    assert state['shadow'] == ORDINARY_SHADOW, state
    assert state['activeBackground'] == 'rgb(239, 238, 241)', state
    assert state['footerBorder'] == 'rgb(232, 232, 236)', state
    assert state['rect'] == {'x': 8, 'y': 8, 'width': 232, 'height': state['viewport']['height'] - 16}, state
    assert state['insets']['left'] == 8 and state['insets']['top'] == 8, state
    assert state['insets']['bottom'] == 8, state
    assert not any(state['overflow'].values()), state


async def alpha_controls(page, context):
    await start(page, '54b01eab')
    await record(page, 'alpha-sidebar-controls', '54b01eab', 'Initial Alpha fixture')
    before = await shell_state(page)
    assert before['mainX'] == 0 and before['filter'] == 'blur(22px) saturate(1.2)', before
    assert before['backgroundImage'] == 'none' and '0.53' in before['background'], before
    assert before['player'] == {'background': 'rgba(249, 249, 251, 0.84)', 'filter': 'blur(18px) saturate(1)'}, before['player']
    selection = await page.locator('.sidebar-row[aria-current=page]').evaluate('(e)=>getComputedStyle(e).backgroundColor')
    assert selection.startswith('rgba('), selection
    arrow = await page.get_by_role('button', name='Previous Featured music', exact=True).bounding_box()
    assert arrow and arrow['x'] >= 240 and arrow['height'] == 50, arrow
    edge = page.locator('.alpha-previous-edge')
    await expect(edge).to_have_count(1)
    assert await edge.locator('.music-art').count() == 3
    assert set(await edge.locator('.music-art').evaluate_all('(els)=>els.map(e=>e.dataset.artSource)')) == {source('54b01eab')}
    predecessor = page.locator('[data-rail="Featured music"] .feature-card').nth(3)
    provider_art = predecessor.locator('[data-art-source="cover-viral-hits-feature"]')
    await expect(provider_art).to_have_count(1)
    assert await provider_art.get_attribute('data-art-partial') is None
    continuation = page.locator('[data-rail="Featured music"] .feature-card').nth(6)
    await expect(continuation).to_contain_text('New Music Daily')
    clean_continuation = continuation.locator('[data-art-source="cover-new-music-daily-feature"]')
    await expect(clean_continuation).to_have_count(1)
    assert await clean_continuation.get_attribute('data-art-partial') is None
    next_button = page.get_by_role('button', name='Next Featured music', exact=True)
    await expect(next_button).to_be_enabled()
    next_box = await next_button.bounding_box()
    assert next_box and next_box['x'] == 1408 and next_box['width'] == 26 and next_box['height'] == 50, next_box
    next_edge = page.locator('.alpha-next-edge')
    await expect(next_edge).to_have_count(1)
    assert await next_edge.locator('.music-art').count() == 3
    assert set(await next_edge.locator('.music-art').evaluate_all('(els)=>els.map(e=>e.dataset.artSource)')) == {source('54b01eab')}
    await page.get_by_role('button', name='Volume', exact=True).click()
    await expect(page.locator('.music-app')).not_to_have_attribute('data-source')
    await record(page, 'alpha-sidebar-controls', '54b01eab', 'Open Volume using the player')
    after = await shell_state(page)
    assert after == before, {key: {'before': before[key], 'after': after[key]} for key in before if before[key] != after[key]}
    await page.get_by_role('button', name='Volume', exact=True).click()
    await page.get_by_role('button', name='Account menu', exact=True).click()
    await record(page, 'alpha-sidebar-controls', '54b01eab', 'Open account through the sidebar')
    assert await shell_state(page) == before
    await page.keyboard.press('Escape')
    await record(page, 'alpha-sidebar-controls', '54b01eab', 'Dismiss account with Escape')
    assert await shell_state(page) == before


async def discovery_carousel(page, context):
    await start(page, 'e72be564')
    initial_player = (await shell_state(page))['player']
    assert initial_player == {'background': 'rgba(249, 249, 251, 0.7)', 'filter': 'blur(28px) saturate(2)'}, initial_player
    await record(page, 'new-carousel-sidebar', 'e72be564', 'First recorded New state')
    partial = page.locator('[data-rail="Featured music"] .feature-card').nth(2)
    await expect(partial).to_have_attribute('data-feature-partial', 'true')
    assert await partial.locator('.feature-caption').inner_text() == 'NEW\nLe\nHe'
    await expect(partial.locator('.feature-caption > button')).to_have_attribute('aria-disabled', 'true')
    await expect(partial.locator('.card-art-button')).to_have_attribute('aria-disabled', 'true')
    partial_art = partial.locator('.music-art')
    await expect(partial_art).to_have_attribute('data-art-partial', 'true')
    await expect(partial_art).to_have_attribute('data-art-source', source('e72be564'))
    partial_box = await partial_art.bounding_box()
    assert partial_box and abs(partial_box['x'] - 1422) < .01 and abs(partial_box['y'] - 167) < .01, partial_box
    assert abs(partial_box['width'] - 18) < .01 and abs(partial_box['height'] - 314) < .01, partial_box
    assert await partial.locator('.card-art-button').evaluate('(e)=>getComputedStyle(e,"::after").content') == 'none'
    next_page = page.get_by_role('button', name='Next Featured music', exact=True)
    await next_page.hover()
    await record(page, 'new-carousel-sidebar', '4f611a9e', 'Hover the actual Next control; preserve starting profile/artwork', move_pointer=False)
    await next_page.click()
    await expect(page.locator('.capture-discovery')).to_have_attribute('data-feature-scrolled', 'true')
    assert (await shell_state(page))['mainX'] == 0
    await next_page.click()
    await expect(page.locator('[data-rail="Featured music"] .feature-card').nth(4)).to_be_in_viewport()
    await expect(page.locator('.capture-discovery')).to_have_attribute('data-feature-alpha', 'true')
    edge = page.locator('.alpha-previous-edge')
    await expect(edge).to_have_count(1)
    assert set(await edge.locator('.music-art').evaluate_all('(els)=>els.map(e=>e.dataset.artSource)')) == {source('54b01eab')}
    predecessor = page.locator('[data-rail="Featured music"] .feature-card').nth(3)
    provider_art = predecessor.locator('[data-art-source="cover-viral-hits-feature"]')
    await expect(provider_art).to_have_count(1)
    assert await provider_art.get_attribute('data-art-partial') is None
    continuation = page.locator('[data-rail="Featured music"] .feature-card').nth(6)
    await expect(continuation).to_contain_text('New Music Daily')
    clean_continuation = continuation.locator('[data-art-source="cover-new-music-daily-feature"]')
    await expect(clean_continuation).to_have_count(1)
    assert await clean_continuation.get_attribute('data-art-partial') is None
    next_button = page.get_by_role('button', name='Next Featured music', exact=True)
    await expect(next_button).to_be_enabled()
    next_box = await next_button.bounding_box()
    assert next_box and next_box['x'] == 1408 and next_box['width'] == 26 and next_box['height'] == 50, next_box
    next_edge = page.locator('.alpha-next-edge')
    await expect(next_edge).to_have_count(1)
    assert await next_edge.locator('.music-art').count() == 3
    assert set(await next_edge.locator('.music-art').evaluate_all('(els)=>els.map(e=>e.dataset.artSource)')) == {source('54b01eab')}
    await record(page, 'new-carousel-sidebar', '54b01eab', 'Advance the actual featured carousel twice; retain starting catalog/profile')
    before = await shell_state(page)
    assert before['player'] == {'background': 'rgba(249, 249, 251, 0.84)', 'filter': 'blur(18px) saturate(1)'}, before['player']
    await page.get_by_role('button', name='Volume', exact=True).click()
    assert await shell_state(page) == before
    await page.get_by_role('button', name='Volume', exact=True).click()
    for selector, top, prefix in [('#essentials', 32, '8b03c9d0'), ('#coming-soon', 113, '706de500')]:
        box = await page.locator(selector).bounding_box()
        assert box
        # Respect native end-of-document clamping; image comparison must retain
        # the source's residual geometry instead of forcing an impossible offset.
        delta = round(box['y'] - top)
        target = await page.locator('main').evaluate('(e,d)=>Math.max(0,Math.min(e.scrollHeight-e.clientHeight,e.scrollTop+d))', delta)
        await page.mouse.move(1100, 650)
        await page.mouse.wheel(0, delta)
        await expect(page.locator('.capture-discovery')).not_to_have_attribute('data-feature-underlay')
        await page.wait_for_function('(target)=>Math.abs(document.querySelector("main").scrollTop-target)<1', arg=target)
        assert await page.locator('.music-sidebar').evaluate('(e)=>getComputedStyle(e).backgroundImage') == 'none'
        await record(page, 'new-carousel-sidebar', prefix, 'Scroll with the mouse wheel to ' + selector)
    await page.mouse.wheel(0, -10000)
    await page.wait_for_function('document.querySelector("main").scrollTop === 0')
    await expect(page.locator('.capture-discovery')).to_have_attribute('data-feature-underlay', 'true')
    previous = page.get_by_role('button', name='Previous Featured music', exact=True)
    await previous.click()
    await expect(page.locator('.capture-discovery')).not_to_have_attribute('data-feature-alpha')
    await expect(page.locator('.alpha-previous-edge')).to_have_count(0)
    await expect(page.locator('.alpha-next-edge')).to_have_count(0)
    await expect(page.locator('[data-rail="Featured music"] .feature-card').nth(3).locator('[data-art-source="cover-viral-hits-feature"]')).to_have_count(1)
    await expect(page.locator('[data-rail="Featured music"] .feature-card').nth(6).locator('[data-art-source="cover-new-music-daily-feature"]')).to_have_count(1)
    await previous.click()
    await expect(page.locator('.capture-discovery')).not_to_have_attribute('data-feature-scrolled')
    returned = await shell_state(page)
    assert returned['mainX'] == 246
    assert returned['player'] == initial_player, returned['player']
    await record(page, 'new-carousel-sidebar', 'e72be564', 'Return with the two actual Previous controls')
    await page.get_by_role('navigation', name='Browse music', exact=True).get_by_role('button', name='Radio', exact=True).click()
    await expect(page.locator('.music-app')).to_have_attribute('data-scene', 'radio')
    assert await page.locator('.music-sidebar').evaluate('(e)=>getComputedStyle(e).backgroundImage') == 'none'


async def ordinary_sidebar_states(page, context):
    failed_requests, bad_responses = [], []
    page.on('requestfailed', lambda request: failed_requests.append(request.url))
    page.on('response', lambda response: bad_responses.append(
        {'url': response.url, 'status': response.status}) if response.status >= 400 else None)
    for prefix, description in [
        ('e72be564', 'New initial ordinary sidebar'),
        ('a917d88f', 'Home initial ordinary sidebar'),
        ('1f9e170c', 'New playing ordinary sidebar'),
        ('aefa8502', 'Guest Home ordinary sidebar'),
    ]:
        await start(page, prefix)
        state = await sidebar_material(page)
        assert_ordinary_material(state)
        await record(page, 'ordinary-sidebar-material', prefix, description)
        if prefix == 'aefa8502':
            assert await page.locator('.sidebar-signin').count() == 0
            guest_profile = page.locator('.guest-profile-button')
            await expect(guest_profile).to_have_count(1)
            await expect(guest_profile).to_have_attribute('aria-label', 'Sign In')
            assert (await guest_profile.inner_text()).strip() == ''
            assert await guest_profile.bounding_box() == {
                'x': 20, 'y': 854, 'width': 41, 'height': 23}
            guest_player = await page.locator('.floating-player').evaluate('''e => {
              const style = getComputedStyle(e); const rect = e.getBoundingClientRect();
              return {background: style.backgroundColor,
                border: style.borderColor, shadow: style.boxShadow,
                filter: style.backdropFilter,
                rect: {x: rect.x, y: rect.y, width: rect.width, height: rect.height}};
            }''')
            assert guest_player == {
                'background': 'rgba(255, 255, 243, 0.5)',
                'border': 'rgb(246, 100, 112)',
                'shadow': 'rgba(70, 0, 20, 0.15) 0px 6px 28px 0px',
                'filter': 'blur(24px) saturate(1.4)',
                'rect': {'x': 526, 'y': 833, 'width': 635, 'height': 54}}, guest_player
            await guest_profile.click()
            await expect(page.get_by_role('dialog')).to_be_visible()
            await page.keyboard.press('Escape')
            await expect(page.get_by_role('dialog')).to_have_count(0)
            assert await guest_profile.evaluate('(e) => document.activeElement === e')
    await start(page, 'dcafd99e')
    dark = await sidebar_material(page)
    assert dark['backgroundColor'] == 'rgb(85, 86, 84)', dark
    assert dark['shadow'] == 'none', dark
    assert dark['activeBackground'] == 'rgba(255, 255, 255, 0.082)', dark
    assert dark['rect'] == {'x': 8, 'y': 8, 'width': 232, 'height': dark['viewport']['height'] - 16}, dark
    assert dark['insets']['left'] == 8 and dark['insets']['top'] == 8, dark
    assert dark['insets']['bottom'] == 8, dark
    assert not any(dark['overflow'].values()), dark
    await record(page, 'ordinary-sidebar-material', 'dcafd99e',
                 'Concert detail retains its captured dark sidebar')
    assert not failed_requests, failed_requests
    assert not bad_responses, bad_responses


async def signed_out_home_controls(page, context):
    await start(page, 'aefa8502')
    membership = page.locator('.capture-membership')
    geometry = await membership.evaluate('''element => {
      const box = selector => {
        const rect = element.querySelector(selector).getBoundingClientRect();
        return {x: rect.x, y: rect.y, width: rect.width, height: rect.height};
      };
      return {membership: (() => { const rect=element.getBoundingClientRect(); return {x:rect.x,y:rect.y,width:rect.width,height:rect.height}; })(),
        art: box('.membership-hero-art'), brand: box('.brand'), heading: box('h1'),
        copy: box('p'), trial: box('.pill')};
    }''')
    assert geometry == {
        'membership': {'x': 246, 'y': 0, 'width': 1194, 'height': 904},
        'art': {'x': 246, 'y': 220, 'width': 1194, 'height': 450},
        'brand': {'x': 246, 'y': 77, 'width': 1194, 'height': 29},
        'heading': {'x': 246, 'y': 119, 'width': 1194, 'height': 98},
        'copy': {'x': 583, 'y': 708, 'width': 520, 'height': 44},
        'trial': {'x': 771.5, 'y': 784, 'width': 143, 'height': 35}}, geometry
    art = membership.locator('.membership-hero-art')
    await expect(art).to_have_attribute('data-art-source', source('aefa8502'))

    profile = page.get_by_role('button', name='Sign In', exact=True)
    await profile.click()
    await expect(page.get_by_role('dialog')).to_be_visible()
    await page.keyboard.press('Escape')
    await expect(page.get_by_role('dialog')).to_have_count(0)
    await expect(profile).to_be_focused()

    trial = page.get_by_role('button', name='Try It Free', exact=True)
    await trial.click()
    await expect(page.get_by_role('dialog')).to_be_visible()
    await page.keyboard.press('Escape')
    await expect(page.get_by_role('dialog')).to_have_count(0)
    await expect(trial).to_be_focused()

    for label in ['Shuffle', 'Repeat']:
        toggle = page.get_by_role('button', name=label, exact=True)
        await expect(toggle).to_have_attribute('aria-pressed', 'false')
        await toggle.click()
        await expect(toggle).to_have_attribute('aria-pressed', 'true')
        await toggle.click()
        await expect(toggle).to_have_attribute('aria-pressed', 'false')

    volume = page.get_by_role('button', name='Volume', exact=True)
    await volume.click()
    await expect(page.get_by_role('slider', name='Volume level', exact=True)).to_be_visible()
    await page.keyboard.press('Escape')
    await expect(page.get_by_role('slider', name='Volume level', exact=True)).to_have_count(0)
    await expect(volume).to_be_focused()

    queue = page.get_by_role('button', name='Up Next', exact=True)
    await queue.click()
    await expect(page.get_by_role('complementary', name='Up Next queue', exact=True)).to_be_visible()
    await queue.click()
    await expect(page.get_by_role('complementary', name='Up Next queue', exact=True)).to_have_count(0)

    play = page.get_by_role('button', name='Play', exact=True)
    await play.click()
    pause = page.get_by_role('button', name='Pause', exact=True)
    await expect(pause).to_be_visible()
    await expect(page.locator('.floating-player')).to_have_class(re.compile('has-track'))
    await expect(page.locator('.now-playing')).to_contain_text('stupid song')
    await pause.click()
    await expect(page.get_by_role('button', name='Play', exact=True)).to_be_visible()
    assert await page.evaluate('document.querySelector("audio").paused')

    for width, height in [(1264, 700), (1024, 768), (820, 900), (390, 844)]:
        await start(page, 'aefa8502')
        await page.set_viewport_size({'width': width, 'height': height})
        await expect(page.get_by_role('button', name='Try It Free', exact=True)).to_be_visible()
        assert not await page.evaluate('document.documentElement.scrollWidth > innerWidth'), width
        player = await page.locator('.floating-player').bounding_box()
        assert player and player['x'] >= 0 and player['x'] + player['width'] <= width + .1, (width, player)


CASES = [('ordinary-sidebar-material', ordinary_sidebar_states),
         ('signed-out-home-controls', signed_out_home_controls),
         ('alpha-sidebar-live-controls', alpha_controls),
         ('new-carousel-sidebar-material', discovery_carousel)]


async def home_underlay_scroll(page, context):
    await start(page, 'a917d88f')
    await record(page, 'home-sidebar-scroll', 'a917d88f', 'Initial Home state')
    await page.get_by_role('button', name='Next Top picks', exact=True).click()
    home = page.locator('.capture-home')
    pane = page.locator('.music-sidebar')
    await expect(home).to_have_attribute('data-home-underlay', 'true')
    before = await pane.evaluate('(e)=>getComputedStyle(e).background')
    assert await pane.evaluate('(e)=>getComputedStyle(e).backgroundImage') == 'none'
    assert await pane.evaluate('(e)=>getComputedStyle(e).backdropFilter') == 'blur(18px) saturate(1.6)'
    art = page.locator('[data-card-id=alex] [data-art-frame=forward]')
    await expect(art).to_have_count(1)
    assert await art.locator('path').nth(1).get_attribute('d') == 'M0 0 264 176.5 0 353 142 176.5Z'
    assert await art.locator('svg image').count() == 0, 'Station art must not embed captured UI'
    handle = page.get_by_role('button', name='Previous Top picks', exact=True)
    assert await handle.evaluate('(e)=>getComputedStyle(e).backdropFilter') == 'blur(12px) saturate(1.1)'
    await record(page, 'home-sidebar-scroll', 'd5173715', 'Advance Top picks through the real carousel')
    await page.mouse.move(1100, 650)
    await page.mouse.wheel(0, 950)
    await page.wait_for_function('document.querySelector("main").scrollTop > 900')
    await expect(home).not_to_have_attribute('data-home-underlay')
    assert await pane.evaluate('(e)=>getComputedStyle(e).backgroundImage') == 'none'
    await page.get_by_role('button', name='Volume', exact=True).click()
    assert await pane.evaluate('(e)=>getComputedStyle(e).backgroundImage') == 'none'
    await page.get_by_role('button', name='Volume', exact=True).click()
    await page.mouse.move(1100, 650)
    await page.mouse.wheel(0, -10000)
    await page.wait_for_function('document.querySelector("main").scrollTop === 0')
    await expect(home).to_have_attribute('data-home-underlay', 'true')
    assert await pane.evaluate('(e)=>getComputedStyle(e).background') == before
    await record(page, 'home-sidebar-scroll', 'd5173715', 'Return to the carousel with the mouse wheel')


CASES.append(('home-sidebar-visible-underlay', home_underlay_scroll))
