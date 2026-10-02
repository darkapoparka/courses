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
    for card in cards.all():
        image = card.locator('img').bounding_box()
        assert image and abs(image['width'] - image['height']) < 1, image
    features = page.get_by_role('region', name='Marketplace features', exact=True)
    caption = features.get_by_role('heading').first.bounding_box()
    image = features.locator('img').first.bounding_box()
    assert caption and image and caption['y'] + caption['height'] <= image['y'], (caption, image)
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
