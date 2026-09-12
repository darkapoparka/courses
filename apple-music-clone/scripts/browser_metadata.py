"""The first visible browser tab must not fall back to a missing favicon."""
import re
from urllib.parse import urljoin
from xml.etree import ElementTree
from playwright.async_api import expect
from browser_fidelity_regressions import ready


async def browser_tab_icon(page, context):
    await ready(page)
    icon = page.locator('head link[rel="icon"]').first
    await expect(icon).to_have_attribute('href', re.compile(r'^/icon\.svg(?:\?|$)'))
    await expect(icon).to_have_attribute('type', 'image/svg+xml')
    response = await context.request.get(urljoin(page.url, await icon.get_attribute('href')))
    assert response.status == 200, response.status
    assert 'image/svg+xml' in response.headers.get('content-type', '')
    tree = ElementTree.fromstring(await response.body())
    assert tree.tag == '{http://www.w3.org/2000/svg}svg', tree.tag
    assert tree.attrib.get('viewBox') == '0 0 32 32'
    # This asset is the app's local vector glyph, not an external image/page.
    assert not tree.findall('.//{http://www.w3.org/2000/svg}image')
    assert not tree.findall('.//{http://www.w3.org/2000/svg}script')


CASES = [('browser-tab-icon', browser_tab_icon)]
