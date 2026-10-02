"""Connected marketplace collections, facets and expanded catalog; no sales claims."""
import re
from playwright.sync_api import expect


def check_market_depth(existing_page, visit, out, passed, errors):
    context = existing_page.context.browser.new_context(viewport={'width':1440,'height':903}, device_scale_factor=1)
    page = context.new_page()
    page.on('pageerror', lambda error: errors.append(str(error)))
    def home():
        visit(page, '/learn/home')
        expect(page.get_by_role('heading', name='Home', level=1, exact=True)).to_be_visible()
    def ids(): return page.locator('[data-market-course]').evaluate_all('(nodes)=>nodes.map(n=>n.dataset.marketCourse)')
    try:
        home()
        expect(page.locator('[data-market-collection]')).to_have_count(4)
        expect(page.locator('[data-market-course]')).to_have_count(15)
        best = page.locator('[data-market-collection=bestsellers]')
        expect(best.get_by_text('Demo merchandising selection — not ranked by real sales.', exact=True)).to_be_visible()
        best.scroll_into_view_if_needed(); page.screenshot(path=str(out/'bestsellers-desktop.png'))
        trigger = best.get_by_role('button', name='Preview TypeScript, made practical in Bestsellers', exact=True)
        trigger.click()
        preview = page.get_by_role('dialog', name='TypeScript, made practical', exact=True)
        expect(preview.get_by_role('link', name='Describe one valid state at a time', exact=True)).to_be_visible()
        expect(preview.get_by_role('link', name='Validate the boundary', exact=True)).to_have_count(0)
        preview.get_by_role('button', name='Save preview TypeScript, made practical', exact=True).click()
        preview.press('Escape'); expect(trigger).to_be_focused()
        expect(best.get_by_role('button', name='Unsave TypeScript, made practical in Bestsellers')).to_have_attribute('aria-pressed','true')
        expect(page.locator('[data-market-course=typescript]').get_by_role('button', name='Unsave TypeScript, made practical', exact=True)).to_have_attribute('aria-pressed','true')
        assert page.evaluate("JSON.parse(localStorage.getItem('courses:learning-preview:v1')).progress") == {}
        page.get_by_role('link', name='See all Bestsellers', exact=True).click()
        expect(page).to_have_url(re.compile('collection=bestsellers'))
        expect(page.locator('[data-market-course]')).to_have_count(6)
        assert ids() == ['typescript','systems','photo','story','offer','web']
        page.go_back(wait_until='networkidle')
        expect(page.locator('[data-market-collection]')).to_have_count(4)
        passed('Collection shelves share previews and saved state; See all and Back retain distinct membership')
        home(); filters = page.get_by_role('button', name=re.compile('^Filters'))
        filters.click(); dialog = page.get_by_role('dialog', name='Filter courses', exact=True)
        dialog.get_by_label('Price', exact=True).select_option('under50')
        dialog.get_by_label('Experience level', exact=True).select_option('Intermediate')
        dialog.get_by_label('Course length', exact=True).select_option('30')
        expect(dialog.get_by_role('button', name='Show 1 course', exact=True)).to_be_visible()
        dialog.get_by_role('button', name='Cancel', exact=True).click()
        expect(filters).to_be_focused(); assert 'level=' not in page.url
        filters.click(); expect(dialog.get_by_label('Price', exact=True)).to_have_value('all')
        dialog.get_by_label('Price', exact=True).select_option('under50')
        dialog.get_by_label('Experience level', exact=True).select_option('Intermediate')
        dialog.get_by_label('Course length', exact=True).select_option('30')
        page.screenshot(path=str(out/'marketplace-filters-desktop.png'))
        dialog.get_by_role('button', name='Show 1 course', exact=True).click()
        expect(page.locator('[data-market-course]')).to_have_count(1)
        assert ids() == ['microcopy']
        page.reload(wait_until='networkidle'); assert ids() == ['microcopy']
        expect(page.get_by_role('link', name='Remove experience level', exact=True)).to_be_visible()
        page.get_by_role('link', name='Remove duration', exact=True).click()
        expect(page.locator('[data-market-course]')).to_have_count(2)
        passed('Filters have live counts, cancel without mutation, and compose through apply, reload and removable chips')
        home(); page.get_by_role('link', name='See all Start something for free', exact=True).click()
        expect(page.locator('[data-market-course]')).to_have_count(4)
        assert ids() == ['design','writing','color','interviews']
        card = page.locator('[data-market-course=color]')
        card.get_by_role('button', name='Preview Color that communicates', exact=True).click()
        preview = page.get_by_role('dialog', name='Color that communicates', exact=True)
        preview.get_by_role('link', name='Make meaning visible without color', exact=True).click()
        expect(page.get_by_role('heading', name='Make meaning visible without color', level=1, exact=True)).to_be_visible()
        expect(page.get_by_role('heading', name='Remove the color mentally', exact=True)).to_be_visible()
        page.get_by_role('button', name='Mark lesson complete', exact=True).click()
        page.reload(wait_until='networkidle')
        expect(page.get_by_role('button', name='Completed · undo', exact=True)).to_have_attribute('aria-pressed','true')
        passed('Expanded free-course discovery reaches substantive reading content and persists real lesson completion')
        for width in [320,390,1024,1440,1920]:
            page.set_viewport_size({'width':width,'height':900 if width>760 else 844}); home()
            assert not page.locator('main').evaluate('e=>e.scrollWidth>e.clientWidth+1'), width
            expect(page.get_by_role('combobox', name='Search courses', exact=True)).to_be_visible()
            page.screenshot(path=str(out/f'market-depth-home-{width}.png'))
            filters.click(); expect(dialog).to_be_visible()
            assert not dialog.evaluate('e=>e.scrollWidth>e.clientWidth+1'), width
            dialog.press('Escape'); expect(filters).to_be_focused()
        passed('Desktop marketplace at 1440/1920 and narrow layouts retain visible search, shelf controls and contained filters')
    except Exception:
        page.screenshot(path=str(out/'market-depth-failure.png'))
        raise
    finally:
        context.close()
