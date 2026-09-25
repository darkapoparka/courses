"""Account session regressions; frozen endpoints do not authorize identity resets."""
import re
from playwright.async_api import expect
from browser_live_fidelity import start, record, source
from qa_identity import reference_viewport

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
    initial = {'profile': 'SmithAlex', 'playlists': ['All Playlists']}
    resolved = {'profile': 'Alex Smith', 'playlists': ['All Playlists', 'Favourite Songs', 'Emotional Songs']}
    assert await chrome(page) == initial
    await record(page, 'account-navigation-identity', '44101453', 'Start at saved subscription settings')
    await page.get_by_role('button', name='Manage', exact=True).click()
    await expect(page.locator('.subscription-details')).to_be_visible()
    assert await chrome(page) == initial
    await record(page, 'account-navigation-identity', 'c0997fe5', 'Manage preserves the compact subscription sidebar')
    await page.get_by_role('button', name='Cancel Free Trial', exact=True).click()
    assert await chrome(page) == resolved
    await page.keyboard.press('Escape')
    await expect(page.get_by_role('button', name='Cancel Free Trial', exact=True)).to_be_focused()
    assert await chrome(page) == resolved
    await page.get_by_role('button', name='Cancel Free Trial', exact=True).click()
    await page.get_by_role('button', name='Keep Subscription', exact=True).click()
    assert await chrome(page) == resolved
    await page.go_back()
    await expect(page.locator('.music-app')).to_have_attribute('data-scene', 'settings')
    assert await chrome(page) == initial
    await page.get_by_role('button', name='Manage', exact=True).click()
    await page.get_by_role('button', name='Cancel Free Trial', exact=True).click()
    await page.get_by_role('button', name='Cancel Subscription', exact=True).click()
    assert await chrome(page) == resolved
    await record(page, 'account-navigation-identity', '03157020',
                 'The visible cancellation action resolves the recorded full account identity and playlist chrome')
    await page.get_by_role('button', name='Done', exact=True).click()
    await expect(page.get_by_text('You have cancelled your subscription.', exact=True)).to_be_visible()
    assert await page.locator('.profile-button').inner_text() == resolved['profile']
    await expect(page.get_by_role('navigation', name='Music library', exact=True)).to_have_count(0)


CASES.append(('account-navigation-identity', account_navigation_identity))


async def account_single_playlist_fixtures(page, context):
    """Direct account snapshots with source-owned one-row playlist chrome."""
    prefixes = [
        'b2e0f231', 'f99d9583', '0da4882b', '8b9e8598', '0260ef9f',
        '5b34ad72', '7437b956', '6436de36', 'c0997fe5',
    ]
    for prefix in prefixes:
        await start(page, prefix)
        assert await page.get_by_role('navigation', name='Playlists', exact=True).get_by_role('button').all_text_contents() == ['All Playlists'], prefix
        await record(page, 'account-single-playlist-fixtures', prefix,
                     'Direct saved account snapshot keeps the source-owned All Playlists-only chrome')


CASES.append(('account-single-playlist-fixtures', account_single_playlist_fixtures))


async def recorded_logout_flow(page, context):
    """Logging out: New, account menu, then the signed-out New screen."""
    await start(page, 'e72be564')
    await record(page, 'flow-079e1da7-logging-out-canonical-runner', 'e72be564',
                 'Begin at the recorded New screen with the account session intact')
    await page.get_by_role('button', name='Account menu', exact=True).click()
    await expect(page.get_by_role('menuitem', name='Sign Out', exact=True)).to_be_visible()
    await page.set_viewport_size(reference_viewport(source('fc5d84bd')))
    await record(page, 'flow-079e1da7-logging-out-canonical-runner', 'fc5d84bd',
                 'Open the account menu using the profile control')
    await page.get_by_role('menuitem', name='Sign Out', exact=True).click()
    await expect(page.locator('.music-app')).to_have_class(re.compile(r'\bguest-session\b'))
    await expect(page.get_by_role('button', name='Sign In', exact=True)).to_be_visible()
    await expect(page.get_by_role('button', name='Account menu', exact=True)).to_have_count(0)
    await page.set_viewport_size(reference_viewport(source('3731221f')))
    await record(page, 'flow-079e1da7-logging-out-canonical-runner', '3731221f',
                 'Sign Out returns to the same New page in the signed-out session')


async def recorded_settings_flow(page, context):
    """Settings: open the real menu destination, then scroll its native pane."""
    await start(page, 'fc5d84bd')
    await record(page, 'flow-c4422161-settings-canonical-runner', 'fc5d84bd',
                 'Begin at the recorded profile menu')
    await page.get_by_role('menuitem', name='Settings', exact=True).click()
    await expect(page.get_by_role('heading', name='Account Settings', exact=True)).to_be_visible()
    await page.set_viewport_size(reference_viewport(source('481cd568')))
    await record(page, 'flow-c4422161-settings-canonical-runner', '481cd568',
                 'Choose Settings from the open account menu')

    async def align_section(section_id: str, viewport_y: int):
        section = page.locator(f'#{section_id}')
        await expect(section.locator('h2')).to_be_visible()
        await page.mouse.move(1400, 600)
        for _ in range(5):
            current_y = await section.evaluate('(element) => element.getBoundingClientRect().top')
            delta = round(current_y - viewport_y)
            if abs(delta) <= 2:
                return
            await page.mouse.wheel(0, delta)
            await page.wait_for_timeout(120)
        current_y = await section.evaluate('(element) => element.getBoundingClientRect().top')
        assert abs(current_y - viewport_y) <= 2, (section_id, current_y, viewport_y)

    await page.set_viewport_size(reference_viewport(source('1e5b4763')))
    await align_section('account-access', -10)
    await expect(page.get_by_role('heading', name='Connected Accounts', exact=True)).to_be_visible()
    await record(page, 'flow-c4422161-settings-canonical-runner', '1e5b4763',
                 'Scroll the account pane to Account Access')
    await page.set_viewport_size(reference_viewport(source('01f96377')))
    await align_section('parental-controls', 24)
    await expect(page.get_by_role('switch', name='Content Restrictions', exact=True)).to_be_visible()
    await expect(page.get_by_label('Music and Podcasts rating', exact=True)).to_have_value('Clean')
    await expect(page.get_by_label('TV show rating', exact=True)).to_have_value('G')
    await expect(page.get_by_label('Movie rating', exact=True)).to_have_value('G')
    await record(page, 'flow-c4422161-settings-canonical-runner', '01f96377',
                 'Continue scrolling to Parental Controls without changing restriction values')
    await page.set_viewport_size(reference_viewport(source('44101453')))
    await align_section('subscriptions', 525)
    await expect(page.get_by_role('heading', name='Subscriptions', exact=True)).to_be_visible()
    await expect(page.get_by_role('button', name='Manage', exact=True)).to_be_visible()
    await record(page, 'flow-c4422161-settings-canonical-runner', '44101453',
                 'Continue scrolling to Subscriptions')


async def recorded_connected_accounts_flow(page, context):
    """Account Access to Connected Accounts through the visible Manage control."""
    await start(page, '1e5b4763')
    initial = await chrome(page)
    assert initial == {'profile': 'SmithAlex', 'playlists': ['All Playlists', 'Favourite Songs', 'Emotional Songs']}
    assert await page.get_by_role('navigation', name='Browse music', exact=True).get_by_role('button', name='Radio', exact=True).get_attribute('aria-current') == 'page'
    initial_history = await page.evaluate('history.length')
    await record(page, 'flow-d1a98fb1-connected-accounts', '1e5b4763',
                 'Start at Account Access with the recorded Radio-selected session chrome')

    opener = page.get_by_role('button', name='Manage Connected Accounts', exact=True)
    await opener.click()
    await expect(page.get_by_role('heading', name='Connected Accounts', exact=True)).to_be_visible()
    assert await page.evaluate('history.length') == initial_history + 1
    assert await chrome(page) == {'profile': 'SmithAlex', 'playlists': ['All Playlists']}
    assert await page.get_by_role('navigation', name='Browse music', exact=True).get_by_role('button', name='New', exact=True).get_attribute('aria-current') == 'page'
    await record(page, 'flow-d1a98fb1-connected-accounts', 'b2e0f231',
                 'Open Connected Accounts; the account subpage exposes its recorded one-row playlist chrome')

    await page.go_back()
    await expect(page.get_by_role('heading', name='Account Settings', exact=True)).to_be_visible()
    assert await chrome(page) == initial
    assert await page.get_by_role('navigation', name='Browse music', exact=True).get_by_role('button', name='Radio', exact=True).get_attribute('aria-current') == 'page'


async def recorded_content_restrictions_flow(page, context):
    """Enable restrictions through the complete eight-step native account dialog."""
    expected_chrome = {'profile': 'SmithAlex', 'playlists': ['All Playlists']}
    await start(page, '01f96377')
    assert await chrome(page) == expected_chrome
    switch = page.get_by_role('switch', name='Content Restrictions', exact=True)
    await expect(switch).to_have_attribute('aria-checked', 'false')
    await record(page, 'flow-29245bc1-content-restrictions', '01f96377',
                 'Start at Parental Controls with restrictions off')

    await switch.click()
    first = page.get_by_label('Preview passcode', exact=True)
    await expect(first).to_be_visible()
    await expect(page.get_by_role('dialog', name='Set a passcode', exact=True)).to_be_focused()
    assert await chrome(page) == expected_chrome
    await record(page, 'flow-29245bc1-content-restrictions', 'f99d9583',
                 'Turn on Content Restrictions and open the passcode setup dialog')
    await first.fill('1234')
    assert await page.locator('.passcode-reference-dialog .code-cells').evaluate("element => getComputedStyle(element).outlineStyle") == 'none'
    await record(page, 'flow-29245bc1-content-restrictions', '0da4882b',
                 'Enter the first four-digit passcode')
    await page.get_by_role('button', name='Continue', exact=True).click()

    confirm = page.get_by_label('Confirm preview passcode', exact=True)
    await expect(confirm).to_be_visible()
    await record(page, 'flow-29245bc1-content-restrictions', '8b9e8598',
                 'Continue to the confirmation passcode step')
    await confirm.fill('1234')
    assert await page.locator('.passcode-reference-dialog .code-cells').evaluate("element => getComputedStyle(element).outlineStyle") == 'none'
    await record(page, 'flow-29245bc1-content-restrictions', '0260ef9f',
                 'Re-enter the four-digit passcode')
    await page.get_by_role('button', name='Continue', exact=True).click()

    email = page.get_by_label('Preview recovery email', exact=True)
    await expect(email).to_be_visible()
    await expect(email).to_have_value('alexsmith@content-mobbin.com')
    assert await chrome(page) == expected_chrome
    await record(page, 'flow-29245bc1-content-restrictions', '5b34ad72',
                 'Continue to the recovery email step')
    await page.get_by_role('button', name='Continue', exact=True).click()

    await expect(page.get_by_role('heading', name='Passcode set', exact=True)).to_be_visible()
    assert await chrome(page) == expected_chrome
    await record(page, 'flow-29245bc1-content-restrictions', '7437b956',
                 'Submit the recovery email and show the completion state')
    await page.get_by_role('button', name='Done', exact=True).click()
    await expect(switch).to_be_focused()
    await expect(switch).to_have_attribute('aria-checked', 'true')
    await expect(page.get_by_label('Music and Podcasts rating', exact=True)).to_have_value('Clean')
    await expect(page.get_by_label('TV show rating', exact=True)).to_have_value('G')
    await expect(page.get_by_label('Movie rating', exact=True)).to_have_value('G')
    await page.wait_for_function("Math.abs(document.querySelector('#parental-controls').getBoundingClientRect().top - 19) <= 1")
    assert await chrome(page) == expected_chrome
    await record(page, 'flow-29245bc1-content-restrictions', '6436de36',
                 'Acknowledge completion and return to the enabled restriction controls')


async def recorded_changing_language_flow(page, context):
    """Change locale in Settings, then use the translated sidebar controls."""
    english_member_chrome = {'profile': 'SmithAlex', 'playlists': ['All Playlists', 'Favourite Songs', 'Emotional Songs']}
    localized_member_chrome = {'profile': 'SmithAlex', 'playlists': ['所有播放列表', '喜爱歌曲', 'Emotional Songs']}
    localized_search_chrome = {'profile': 'SmithAlex', 'playlists': ['所有播放列表']}
    await start(page, '481cd568')
    history_length = await page.evaluate('history.length')
    assert await chrome(page) == english_member_chrome
    await record(page, 'flow-59b6cb8b-changing-language', '481cd568',
                 'Start at the recorded English Account Settings state')

    await page.get_by_role('button', name='简体中文', exact=True).click()
    await expect(page.locator('.music-app')).to_have_attribute('lang', 'zh-Hans')
    await expect(page.get_by_role('heading', name='账户设置', exact=True)).to_be_visible()
    assert await page.locator('.music-app').get_attribute('data-source') is None
    assert await page.evaluate('history.length') == history_length
    new_button = page.get_by_role('navigation', name='Browse music', exact=True).get_by_role('button', name='新发现', exact=True)
    await expect(new_button).to_have_attribute('aria-current', 'page')
    localized_settings_chrome = await chrome(page)
    assert localized_settings_chrome == localized_member_chrome, localized_settings_chrome
    await page.set_viewport_size(reference_viewport(source('50fe374b')))
    await record(page, 'flow-59b6cb8b-changing-language', '50fe374b',
                 'Use the footer language control; localized Settings becomes the live state')

    browse = page.get_by_role('navigation', name='Browse music', exact=True)
    await browse.get_by_role('button', name='搜索', exact=True).click()
    await expect(page.get_by_label('Search Apple Music', exact=True)).to_have_attribute('placeholder', '搜索')
    assert await chrome(page) == localized_search_chrome
    await page.set_viewport_size(reference_viewport(source('f4a8b5dc')))
    await record(page, 'flow-59b6cb8b-changing-language', 'f4a8b5dc',
                 'Open translated Search from the sidebar')

    await browse.get_by_role('button', name='主页', exact=True).click()
    await expect(page.get_by_role('heading', name='主页', exact=True)).to_be_visible()
    assert await chrome(page) == localized_member_chrome
    await page.set_viewport_size(reference_viewport(source('468b0465')))
    await record(page, 'flow-59b6cb8b-changing-language', '468b0465',
                 'Open translated Home from the sidebar')

    await browse.get_by_role('button', name='新发现', exact=True).click()
    await expect(page.get_by_role('heading', name='新发现', exact=True)).to_be_visible()
    assert await chrome(page) == localized_member_chrome
    await page.set_viewport_size(reference_viewport(source('be864051')))
    await record(page, 'flow-59b6cb8b-changing-language', 'be864051',
                 'Open translated New from the sidebar')


CASES.extend([
    ('recorded-logout-flow', recorded_logout_flow),
    ('recorded-settings-flow', recorded_settings_flow),
    ('recorded-connected-accounts-flow', recorded_connected_accounts_flow),
    ('recorded-content-restrictions-flow', recorded_content_restrictions_flow),
    ('recorded-changing-language-flow', recorded_changing_language_flow),
])
