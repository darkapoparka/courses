"""Rendered course styling contracts; separate from Apple pixel acceptance."""
from playwright.sync_api import expect


def check_marketplace_style(page):
    main = page.locator('main')
    expect(main).to_have_css('background-color', 'rgb(255, 255, 255)')
    expect(main).to_have_css('filter', 'none')
    toolbar = page.locator('[data-search-toolbar]')
    expect(toolbar).to_have_css('border-bottom-width', '0px')
    subjects = page.get_by_role('navigation', name='Marketplace subjects')
    current = subjects.locator('[aria-current="page"]')
    expect(current).to_have_css('background-color', 'rgb(242, 242, 242)')
    expect(current).to_have_css('color', 'rgb(214, 0, 37)')
    for link in subjects.locator('a').all():
        expect(link).to_have_css('border-bottom-width', '0px')
    cards = page.locator('[data-market-course]')
    expect(cards.locator('[data-course-art]')).to_have_count(5)
    for card in cards.all():
        art = card.locator('[data-course-art]'); rect = art.bounding_box()
        assert rect and abs(rect['width']-rect['height']) < 1, rect
        title = art.locator('[data-art-title]')
        assert title.evaluate('e => e.scrollWidth <= e.clientWidth + 1'), 'Cover title overflow'
    features = page.get_by_role('region', name='Marketplace features', exact=True)
    posters = features.locator('[data-art-format=poster]')
    expect(posters).to_have_count(5)
    for poster in posters.all():
        rect = poster.bounding_box()
        assert rect and abs(rect['width']/rect['height'] - 0.75) < .01, rect
    assert len(set(posters.evaluate_all('(nodes)=>nodes.map(n=>getComputedStyle(n).background)'))) == 5
    inactive = page.get_by_role('navigation', name='Main navigation').get_by_role('link', name='Saved', exact=True)
    expect(inactive.locator('svg')).to_have_css('color', 'rgb(29, 29, 31)')


def check_merchandising_controls(page):
    shelf = page.get_by_role('region', name='Marketplace features', exact=True)
    page.get_by_role('button', name='Next Marketplace features', exact=True).click()
    page.wait_for_function("document.querySelector('[aria-label=\"Marketplace features\"][role=region]').scrollLeft > 100")
    page.get_by_role('button', name='Previous Marketplace features', exact=True).click()
    page.wait_for_function("document.querySelector('[aria-label=\"Marketplace features\"][role=region]').scrollLeft < 2")
    shelf.focus()
    shelf.press('ArrowRight')
    page.wait_for_function("document.querySelector('[aria-label=\"Marketplace features\"][role=region]').scrollLeft > 100")
    page.get_by_role('button', name='Previous Marketplace features', exact=True).click()
    page.wait_for_function("document.querySelector('[aria-label=\"Marketplace features\"][role=region]').scrollLeft < 2")
