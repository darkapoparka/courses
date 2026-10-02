"""Storefront browsing is separate from the preserved private learning overview."""
import re
from playwright.sync_api import expect
from browser_platform_contract import check_shell_contract
from browser_platform_visual import check_marketplace_style, check_merchandising_controls

def check_marketplace(existing_page, visit, out, passed, observations, errors):
    context = existing_page.context.browser.new_context(viewport={'width':1440,'height':903},device_scale_factor=1)
    page=context.new_page()
    page.on('pageerror',lambda error:errors.append(str(error)))
    cdp=context.new_cdp_session(page)
    cdp.send('Emulation.setEmulatedMedia',{'features':[{'name':'prefers-reduced-transparency','value':'no-preference'},{'name':'forced-colors','value':'none'}]})
    def home():
        visit(page,'/learn/home')
        expect(page.get_by_role('heading',name='Home',level=1,exact=True)).to_be_visible()
    def cards(): return page.locator('[data-market-course]')
    try:
        home()
        expect(cards()).to_have_count(5)
        expect(page.get_by_role('combobox',name='Search courses',exact=True)).to_be_visible()
        expect(page.get_by_role('button',name='Customize Home',exact=True)).to_have_count(0)
        expect(page.get_by_role('heading',name='Continue learning',exact=True)).to_have_count(0)
        expect(page.get_by_role('complementary',name='Continue learning',exact=True)).to_have_count(0)
        page.wait_for_function("[...document.querySelectorAll('[data-market-course] img')].every(image=>image.complete && image.naturalWidth>0)")
        check_marketplace_style(page)
        page.screenshot(path=str(out/'marketplace-1440.png'))
        passed('Home is an artwork-led public course storefront, not an activity dashboard')
        check_merchandising_controls(page)
        passed('Reference-style featured shelves keep working pointer and keyboard controls')
        subjects=page.get_by_role('navigation',name='Marketplace subjects',exact=True)
        subjects.get_by_role('link',name='Business',exact=True).click()
        expect(page.locator('[data-market-course=business]')).to_be_visible(timeout=60000)
        expect(cards()).to_have_count(1)
        page.get_by_role('navigation',name='Course prices',exact=True).get_by_role('link',name='Free',exact=True).click()
        expect(page.get_by_role('heading',name='No courses in this selection yet.',exact=True)).to_be_visible()
        page.get_by_role('region',name='Find your next course',exact=True).get_by_role('link',name='Browse all courses',exact=True).click()
        expect(cards()).to_have_count(5)
        page.get_by_role('navigation',name='Course prices',exact=True).get_by_role('link',name='Under €50',exact=True).click()
        expect(cards()).to_have_count(4)
        page.get_by_label('Sort',exact=True).select_option('price')
        expect(page).to_have_url(re.compile(r'price=under50.*sort=price'))
        page.reload(wait_until='networkidle')
        assert cards().evaluate_all('(elements)=>elements.map(e=>e.dataset.marketCourse)')==['design','writing','photo','web']
        passed('Marketplace categories, real price filters, sorting, reload and empty recovery work')
        home()
        card=page.locator('[data-market-course=web]')
        card.get_by_role('button',name='Save Build for the web',exact=True).click()
        expect(card.get_by_role('button',name='Unsave Build for the web',exact=True)).to_have_attribute('aria-pressed','true')
        saved=page.evaluate("JSON.parse(localStorage.getItem('courses:learning-preview:v1'))")
        assert saved['saved']==['web'] and saved['progress']=={}
        preview=card.get_by_role('button',name='Preview Build for the web',exact=True)
        preview.click()
        dialog=page.get_by_role('dialog',name='Build for the web',exact=True)
        expect(dialog).to_be_visible()
        expect(dialog.get_by_text('Before you move a button or choose a color',exact=False)).to_have_count(0)
        expect(dialog.get_by_role('link',name='Read free sample',exact=True)).to_have_attribute('href','/learn/courses/build-for-the-web/lessons/web-purpose')
        page.screenshot(path=str(out/'marketplace-preview-1440.png'))
        dialog.press('Escape'); expect(dialog).not_to_be_visible(); expect(preview).to_be_focused()
        preview.click(); dialog.get_by_role('link',name='Read free sample',exact=True).click()
        expect(page.get_by_role('heading',name='Give your page a purpose',level=1,exact=True)).to_be_visible(timeout=60000)
        visit(page,'/learn/courses/build-for-the-web/lessons/web-states')
        expect(page.get_by_role('heading',name='This lesson is not in the preview.',exact=True)).to_be_visible()
        home(); expect(card.get_by_role('button',name='Unsave Build for the web',exact=True)).to_have_attribute('aria-pressed','true')
        expect(page.get_by_role('complementary',name='Continue learning',exact=True)).to_have_count(0)
        passed('Quick previews support sample entry, focus return and bookmarking without granting paid access')
        page.get_by_role('link',name='All creators',exact=False).click()
        expect(page.get_by_role('heading',name='Creators',level=1,exact=True)).to_be_visible(timeout=60000)
        home(); page.get_by_role('link',name='Explore photography',exact=True).click()
        expect(page.get_by_role('heading',name='Frame the everyday',level=1,exact=True)).to_be_visible(timeout=60000)
        home(); page.get_by_role('link',name='Photo credits',exact=True).click()
        expect(page.get_by_role('heading',name='Photo credits',level=1,exact=True)).to_be_visible(timeout=60000)
        passed('Storefront merchandising links reach actual course, creator and image-credit pages')
        for width in [320,390,768,1024,1280,1440]:
            page.set_viewport_size({'width':width,'height':844 if width<=760 else 903})
            home(); check_shell_contract(page,width,observations); check_marketplace_style(page)
            assert not page.locator('main').evaluate('e=>e.scrollWidth>e.clientWidth+1'),width
            page.screenshot(path=str(out/f'marketplace-{width}.png'))
            card.get_by_role('button',name='Preview Build for the web',exact=True).click()
            expect(dialog).to_be_visible()
            assert not dialog.evaluate('e=>e.scrollWidth>e.clientWidth+1'),width
            dialog.get_by_role('button',name='Close course preview').click()
            page.locator('#marketplace-courses').scroll_into_view_if_needed()
            page.screenshot(path=str(out/f'marketplace-courses-{width}.png'))
        passed('Storefront, visible search, course cards and preview dialog fit all six widths')
    except Exception:
        page.screenshot(path=str(out/'marketplace-failure.png'))
        raise
    finally:
        context.close()
