"""Read-only fixture and local draft regressions; no account service is used."""
from playwright.async_api import expect
from browser_live_fidelity import start, record

async def signup_field_presentation(page, context):
    for prefix in ['cd34d1ac', '269160a4']:
        await start(page, prefix)
        dialog = page.get_by_role('dialog')
        password = page.get_by_label('Preview password', exact=True)
        label = password.locator('..').locator('span')
        await expect(label).to_have_text('Password')
        assert await label.evaluate('(e)=>getComputedStyle(e).display') != 'none'
        await expect(password).to_have_attribute('type', 'password')
        if prefix == '269160a4':
            await expect(page.get_by_label('Date of birth', exact=True)).to_have_value('18/02/1995')
            last = await page.get_by_label('Last name', exact=True).bounding_box()
            assert last and abs(last['y'] - 225.5) < 1, last
        await record(page, 'signup-field-presentation', prefix, 'Read the recorded draft, visible password label and native profile anchor')
        await page.keyboard.press('Escape')
        await expect(dialog).to_have_count(0)

CASES = [('signup-field-presentation', signup_field_presentation)]

async def guest_editorial_continuity(page, context):
    await start(page, '3731221f')
    partial = page.locator('.feature-card').nth(2)
    await expect(partial).to_have_attribute('data-feature-partial', 'true')
    await expect(partial.locator('.feature-caption > button')).to_have_text('Le')
    await expect(partial.locator('.card-art-button')).to_have_attribute('aria-disabled', 'true')
    signature = '(e)=>{const s=getComputedStyle(e);return [e.dataset.artSource,s.aspectRatio,s.backgroundImage,s.backgroundSize,s.backgroundPosition]}'
    before = await partial.locator('[data-art-source]').evaluate(signature)
    assert before[0].startswith('3731221f'), before
    opener = page.get_by_role('button', name='Sign In', exact=True)
    await opener.click()
    await expect(page.get_by_role('dialog')).to_be_visible()
    await page.keyboard.press('Escape')
    await expect(opener).to_be_focused()
    assert await partial.locator('[data-art-source]').evaluate(signature) == before
    await page.get_by_role('navigation', name='Browse music').get_by_role('button', name='Search', exact=True).click()
    await page.go_back()
    await expect(partial).to_have_attribute('data-feature-partial', 'true')
    assert await partial.locator('[data-art-source]').evaluate(signature) == before
    await record(page, 'guest-editorial-continuity', '3731221f', 'Dialog return and browser Back retain the public editorial continuation')

CASES.append(('guest-editorial-continuity', guest_editorial_continuity))


async def signup_field_chrome(page, context):
    for prefix in ['4a1d7759', 'cd34d1ac', 'eebd5ffb', '269160a4']:
        await start(page, prefix)
        dialog = page.get_by_role('dialog')
        inputs = dialog.locator('.capture-field input')
        assert set(await inputs.evaluate_all('(els)=>els.map(e=>getComputedStyle(e).borderRadius)')) == {'13px'}
        country = dialog.locator('.auth-country select')
        await expect(country).to_have_css('appearance', 'none')
        arrow = await country.locator('..').evaluate('(e)=>{const s=getComputedStyle(e,"::after");return [s.pointerEvents,s.right,s.width,s.borderRightWidth]}')
        assert arrow[:3] == ['none', '19px', '6px'], arrow
        await record(page, 'signup-field-chrome', prefix, 'Native signup controls with source-supported corners, readonly borders and select chevron')
        previous = await country.input_value()
        values = await country.locator('option:enabled').evaluate_all('(els)=>els.map(e=>e.value)')
        if len(values) > 1:
            await country.select_option(next(value for value in values if value != previous))
            await country.select_option(previous)
        await country.focus()
        await expect(country).to_be_focused()
        await expect(country).to_have_value(previous)
        checkbox = dialog.locator('.auth-checkbox input').first
        was_checked = await checkbox.is_checked()
        await checkbox.click()
        assert await checkbox.is_checked() != was_checked
        await checkbox.click()
        assert await checkbox.is_checked() == was_checked
        await expect(dialog).to_be_visible()

CASES.append(('signup-field-chrome', signup_field_chrome))
