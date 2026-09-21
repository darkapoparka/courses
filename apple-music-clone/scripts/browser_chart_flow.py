"""Source-ordered Chart detail journey through the real New-page control."""
from playwright.async_api import expect
from browser_live_fidelity import start, record


async def chart_detail(page, context):
    await start(page, '4f611a9e')
    app = page.locator('.music-app')
    await expect(app).to_have_attribute('data-scene', 'new')
    await expect(page.locator('.profile-button')).to_contain_text('SmithAlex')
    chart_link = page.locator('.viral-hits-section .section-link')
    await expect(chart_link).to_be_visible()
    await expect(chart_link).to_contain_text('Favourite These Viral Hits')
    await record(page, 'd5d60236-chart-detail', '4f611a9e',
                 'Initial named-profile New state')

    await chart_link.click()
    await expect(app).to_have_attribute('data-scene', 'chart')
    await expect(page.get_by_role('heading', name='Favourite These Viral Hits', exact=True)).to_be_visible()
    rows = page.locator('.chart-page > .chart-table .track-table-row')
    await expect(rows).to_have_count(15)
    await expect(rows.nth(1).get_by_role('button', name='Unfavourite stupid song', exact=True)).to_have_attribute('aria-pressed', 'true')
    await expect(page.locator('.profile-button')).to_contain_text('SmithAlex')
    assert 'view=chart' in page.url, page.url
    await record(page, 'd5d60236-chart-detail', '8a234785',
                 'Open Chart detail with the real Favourite These Viral Hits heading control')


CASES = [('recorded-chart-detail', chart_detail)]
