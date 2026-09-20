"""Authentication is session state, not a browser-history snapshot."""
import re
from playwright.async_api import expect
from browser_live_fidelity import start, record


async def logout_history(page, context):
    await start(page, 'e72be564')
    nav = page.get_by_role('navigation', name='Browse music', exact=True)
    await page.get_by_role('button', name='Account menu', exact=True).click()
    await page.get_by_role('menuitem', name='Sign Out', exact=True).click()
    shell = page.locator('.music-app')
    await expect(shell).to_have_class(re.compile(r'\bguest-session\b'))
    await nav.get_by_role('button', name='Search', exact=True).click()
    await page.go_back()
    await expect(shell).to_have_class(re.compile(r'\bguest-session\b'))
    await expect(page.get_by_role('button', name='Sign In', exact=True)).to_be_visible()
    await expect(page.get_by_role('button', name='Account menu', exact=True)).to_have_count(0)
    await expect(page.get_by_role('navigation', name='Music library', exact=True)).to_have_count(0)
    await record(page, 'logout-history', '3731221f',
                 'Back cannot restore an authenticated account after Sign Out; regression only')
    await page.go_forward()
    await expect(shell).to_have_class(re.compile(r'\bguest-session\b'))
    await nav.get_by_role('button', name='New', exact=True).click()
    await expect(shell).to_have_class(re.compile(r'\bguest-session\b'))


CASES = [('logout-history-session', logout_history)]
