"""Account session regressions; frozen endpoints do not authorize identity resets."""
from playwright.async_api import expect
from browser_live_fidelity import start, record

async def chrome(page):
    return {
        'profile': await page.locator('.profile-button').inner_text(),
        'playlists': await page.get_by_role('navigation', name='Playlists', exact=True).get_by_role('button').all_text_contents(),
    }

async def account_seeded_identity(page, context):
    for prefix, name, playlists in [
        ('44101453', 'SmithAlex', ['All Playlists']),
        ('c0997fe5', 'SmithAlex', ['All Playlists']),
        ('fd1c0c71', 'Alex Smith', ['All Playlists', 'Favourite Songs', 'Emotional Songs']),
        ('03157020', 'Alex Smith', ['All Playlists', 'Favourite Songs', 'Emotional Songs']),
    ]:
        await start(page, prefix)
        assert await chrome(page) == {'profile': name, 'playlists': playlists}, prefix
        await record(page, 'account-seeded-identity', prefix,
                     'Exact recorded initial profile and playlist navigation; fixture regression, not continuous FLOW')

CASES = [('account-seeded-identity', account_seeded_identity)]

async def account_navigation_identity(page, context):
    await start(page, '44101453')
    before = await chrome(page)
    assert before == {'profile': 'SmithAlex', 'playlists': ['All Playlists']}
    await record(page, 'account-navigation-identity', '44101453', 'Start at saved subscription settings')
    await page.get_by_role('button', name='Manage', exact=True).click()
    await expect(page.locator('.subscription-details')).to_be_visible()
    assert await chrome(page) == before
    await record(page, 'account-navigation-identity', 'c0997fe5', 'Manage preserves the account identity and sidebar')
    await page.get_by_role('button', name='Cancel Free Trial', exact=True).click()
    assert await chrome(page) == before
    await page.keyboard.press('Escape')
    await expect(page.get_by_role('button', name='Cancel Free Trial', exact=True)).to_be_focused()
    await page.get_by_role('button', name='Cancel Free Trial', exact=True).click()
    await page.get_by_role('button', name='Keep Subscription', exact=True).click()
    assert await chrome(page) == before
    await page.go_back()
    await expect(page.locator('.music-app')).to_have_attribute('data-scene', 'settings')
    assert await chrome(page) == before
    await page.get_by_role('button', name='Manage', exact=True).click()
    await page.get_by_role('button', name='Cancel Free Trial', exact=True).click()
    await page.get_by_role('button', name='Cancel Subscription', exact=True).click()
    assert await chrome(page) == before
    await record(page, 'account-navigation-identity', '03157020',
                 'Local confirmation preserves the live identity; saved later profile is a different snapshot, not FLOW acceptance')
    await page.get_by_role('button', name='Done', exact=True).click()
    await expect(page.get_by_text('You have cancelled your subscription.', exact=True)).to_be_visible()
    assert await page.locator('.profile-button').inner_text() == before['profile']
    await expect(page.get_by_role('navigation', name='Music library', exact=True)).to_have_count(0)

CASES.append(('account-navigation-identity', account_navigation_identity))
