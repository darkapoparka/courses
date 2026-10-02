"""Platform-specific geometry and real-control reply regressions."""
from playwright.sync_api import expect

def check_shell_contract(page, width, observations):
    actual = page.locator('[data-course-platform]').evaluate('''shell => {
      const aside = shell.querySelector('aside[aria-label="Courses navigation"]');
      const main = shell.querySelector('main'); const s = getComputedStyle(aside);
      const r = aside.getBoundingClientRect(); const m = main.getBoundingClientRect();
      return {width:r.width,left:r.left,top:r.top,height:r.height,radius:s.borderRadius,
        filter:s.backdropFilter,background:s.backgroundColor,mainLeft:m.left,mainTop:m.top,
        accent:getComputedStyle(shell).getPropertyValue('--course-accent').trim()};
    }''')
    mobile = width <= 760
    expected = {'left':0 if mobile else 8, 'top':0 if mobile else 8,
                'width':width if mobile else 232, 'mainLeft':0 if mobile else 240,
                'mainTop':114 if mobile else 0}
    for name, value in expected.items():
        assert abs(actual[name]-value) < 1, (width, name, actual[name], value)
    assert actual['radius'] == ('0px' if mobile else '22px'), actual
    assert actual['accent'] == '#d60025', actual
    assert 'blur(16px)' in actual['filter'] and 'saturate(1.8)' in actual['filter'], actual
    assert actual['background'] == 'rgba(248, 248, 250, 0.94)', actual
    if mobile: assert abs(actual['height']-114)<1, actual
    search = page.get_by_role('combobox', name='Search courses', exact=True)
    expect(search).to_be_visible()
    rect = search.bounding_box()
    assert rect and rect['width'] >= 90 and rect['height'] >= 40, (width, rect)
    observations.append({'viewport':width, 'search':rect, **actual})

def check_reply_journey(page):
    post = page.get_by_role('article').filter(has=page.get_by_role('heading', name='One change worth testing', exact=True))
    thread = post.locator('details'); summary = thread.locator('summary')
    summary.focus(); summary.press('Enter'); expect(thread).to_have_attribute('open', '')
    reply = '<strong>Evidence, not decoration.</strong> I tested the change with one reader.'
    thread.get_by_label('Your reply', exact=True).fill(reply)
    thread.get_by_role('button', name='Save local reply', exact=True).click()
    expect(thread.get_by_text('Reply saved in this browser. Nothing was published or sent.', exact=True)).to_be_visible()
    expect(thread.get_by_role('list', name='Local replies').get_by_text(reply, exact=True)).to_be_visible()
    assert thread.locator('ol p strong').count() == 0, 'Reply text must not be interpreted as HTML'
    page.reload(wait_until='networkidle')
    expect(summary).to_have_text('1 reply'); summary.click()
    expect(thread.get_by_role('list', name='Local replies').get_by_text(reply, exact=True)).to_be_visible()
    prompt = page.get_by_role('article').filter(has=page.get_by_role('heading', name='What did you notice when you looked again?', exact=True))
    expect(prompt.locator('summary')).to_have_text('Start a reply')
    prompt.locator('summary').click(); prompt.get_by_label('Your reply', exact=True).fill('I started by removing one competing action.')
    prompt.get_by_role('button', name='Save local reply', exact=True).click()
    expect(prompt.locator('summary')).to_have_text('1 reply')
    expect(thread.get_by_role('list', name='Local replies').get_by_text(reply, exact=True)).to_be_visible()
    expect(prompt.get_by_text(reply, exact=True)).to_have_count(0)
    page.get_by_label('Course', exact=True).select_option('writing')
    expect(page.get_by_role('heading', name='One paragraph, a clearer idea', exact=True)).to_be_visible()
    expect(page.get_by_text(reply, exact=True)).to_have_count(0)
