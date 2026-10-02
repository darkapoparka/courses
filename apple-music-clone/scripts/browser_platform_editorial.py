"""Cover identity and connected editorial-card interactions, not aesthetic approval."""
from playwright.sync_api import expect


def check_editorial_cards(page, out):
    feature = page.locator('[data-feature-course=web]')
    trigger = feature.get_by_role('button', name='Preview featured Build for the web', exact=True)
    trigger.focus()
    expect(trigger).to_be_focused()
    trigger.click()
    dialog = page.get_by_role('dialog', name='Build for the web', exact=True)
    expect(dialog).to_be_visible()
    expect(dialog.get_by_role('button', name='Close course preview')).to_be_focused()
    expect(dialog.locator('[data-course-art=web]')).to_have_count(1)
    expect(dialog.get_by_role('link', name='Design the states between screens', exact=True)).to_have_count(0)
    expect(dialog.get_by_role('link', name='Give your page a purpose', exact=True)).to_have_attribute('href', '/learn/courses/build-for-the-web/lessons/web-purpose')
    page.screenshot(path=str(out/'editorial-preview-desktop.png'))
    for _ in range(12):
        page.keyboard.press('Tab')
        assert dialog.evaluate('e=>e.contains(document.activeElement)'), 'Focus escaped modal'
    for _ in range(12):
        page.keyboard.press('Shift+Tab')
        assert dialog.evaluate('e=>e.contains(document.activeElement)'), 'Reverse focus escaped modal'
    dialog.get_by_role('button', name='Save preview Build for the web', exact=True).click()
    expect(dialog.get_by_role('button', name='Unsave preview Build for the web')).to_have_attribute('aria-pressed', 'true')
    value = page.evaluate("JSON.parse(localStorage.getItem('courses:learning-preview:v1'))")
    assert value['saved'] == ['web'] and value['progress'] == {}
    dialog.get_by_role('button', name='Unsave preview Build for the web', exact=True).click()
    expect(dialog.get_by_role('button', name='Save preview Build for the web')).to_have_attribute('aria-pressed', 'false')
    prior = page.evaluate("localStorage.getItem('courses:learning-preview:v1')")
    page.evaluate("""() => {
      window.__editorialSave = Storage.prototype.setItem;
      Storage.prototype.setItem = function(key, value) {
        if (key === 'courses:learning-preview:v1') throw new DOMException('full', 'QuotaExceededError');
        return window.__editorialSave.call(this, key, value);
      };
    }""")
    try:
        dialog.get_by_role('button', name='Save preview Build for the web', exact=True).click()
        expect(dialog.get_by_text('Could not save this change. Your previous data is unchanged.', exact=True)).to_be_visible()
        assert page.evaluate("localStorage.getItem('courses:learning-preview:v1')") == prior
    finally:
        page.evaluate('Storage.prototype.setItem = window.__editorialSave; delete window.__editorialSave')
    dialog.press('Escape')
    expect(dialog).not_to_be_visible()
    expect(trigger).to_be_focused()
    page.screenshot(path=str(out/'editorial-keyboard-card.png'))
    card = page.locator('[data-market-course=web]')
    expect(card.get_by_role('button', name='Save Build for the web', exact=True)).to_have_attribute('aria-pressed', 'false')
