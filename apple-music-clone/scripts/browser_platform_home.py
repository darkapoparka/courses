"""Real-control Home journeys in an isolated browser profile; not music acceptance."""
import json
from playwright.sync_api import expect
from browser_platform_contract import check_shell_contract

HOME = '/learn/library/overview'
DESIGN = '/learn/courses/design-with-intention'
KEY = 'courses:learning-preview:v1'

def check_learning_home(existing_page, visit, out, passed, observations, errors):
    context = existing_page.context.browser.new_context(viewport={'width':1440,'height':903}, device_scale_factor=1)
    page = context.new_page()
    page.on('pageerror', lambda error: errors.append(str(error)))
    cdp = context.new_cdp_session(page)
    cdp.send('Emulation.setEmulatedMedia', {'features':[{'name':'prefers-reduced-transparency','value':'no-preference'},{'name':'forced-colors','value':'none'}]})
    def heading(title): expect(page.get_by_role('heading', name=title, level=1, exact=True)).to_be_visible(timeout=60000)
    def home():
        page.get_by_role('navigation',name='Main navigation').get_by_role('link',name='My learning',exact=True).click()
        heading('My learning')
        page.get_by_role('link',name='Learning overview',exact=True).click()
        heading('Learning overview')
    def state(): return page.evaluate('(key)=>JSON.parse(localStorage.getItem(key))',KEY)
    try:
        visit(page,'/learn'); heading('Discover'); home()
        expect(page.get_by_role('combobox',name='Search courses',exact=True)).to_be_visible()
        expect(page.get_by_text('Your first lesson starts a new chapter.',exact=True)).to_be_visible()
        page.screenshot(path=str(out/'home-new-1440.png'))
        page.get_by_role('button',name='Learning preferences',exact=True).click()
        dialog=page.get_by_role('dialog',name='Your learning preferences',exact=True)
        dialog.get_by_role('checkbox',name='Design',exact=True).check()
        dialog.get_by_role('button',name='Save preferences',exact=True).click()
        page.reload(wait_until='networkidle'); heading('Learning overview')
        expect(page.get_by_text('Because you chose Design',exact=True)).to_be_visible()
        assert state()['saved']==[] and state()['progress']=={}
        page.get_by_role('button',name='Learning preferences',exact=True).click()
        expect(dialog.get_by_role('checkbox',name='Design',exact=True)).to_be_checked()
        page.screenshot(path=str(out/'home-preferences-1440.png'))
        dialog.press('Escape'); expect(dialog).not_to_be_visible()
        expect(page.get_by_role('button',name='Learning preferences',exact=True)).to_be_focused()
        passed('Learning overview has visible search, a useful first visit and persistent cancellable interests')
        web_pick=page.locator('[data-home-pick="web"]')
        web_pick.get_by_role('button',name='Hide suggestion Build for the web',exact=True).click()
        expect(web_pick).to_have_count(0)
        page.get_by_role('button',name='Undo dismissal',exact=True).click(); expect(web_pick).to_be_visible()
        web_pick.get_by_role('button',name='Hide suggestion Build for the web',exact=True).click()
        page.reload(wait_until='networkidle'); expect(web_pick).to_have_count(0)
        page.get_by_role('button',name='Restore hidden picks (1)',exact=True).click(); expect(web_pick).to_be_visible()
        page.locator('[data-home-pick="design"]').get_by_role('button',name='Save Design with intention',exact=True).click()
        expect(page.locator('[data-home-saved="design"]')).to_be_visible()
        assert state()['progress']=={} and state()['saved']==['design']
        page.reload(wait_until='networkidle'); expect(page.locator('[data-home-saved="design"]')).to_be_visible()
        passed('Learning overview picks save, hide, undo and restore without enrollment or fabricated activity')
        page.get_by_role('link',name='Try a free lesson',exact=False).click(); heading('Start by noticing')
        page.get_by_role('button',name='Mark lesson complete',exact=True).click(); home()
        card=page.locator('[data-learning-course="design"]')
        expect(card.get_by_role('heading',name='Give the important things room',exact=True)).to_be_visible()
        assert 'design-hierarchy' not in state()['progress']
        expect(page.get_by_role("complementary",name="Continue learning").get_by_role("link",name="Continue",exact=True)).to_have_attribute("href",DESIGN+"/lessons/design-hierarchy")
        page.screenshot(path=str(out/'home-returning-1440.png'))
        card.get_by_role('link',name='Continue Design with intention',exact=True).click(); heading('Give the important things room')
        page.get_by_role('button',name='Mark lesson complete',exact=True).click(); home()
        card.get_by_role('link',name='Continue Design with intention',exact=True).click(); heading('Make one change, then test it')
        page.get_by_role('button',name='Mark lesson complete',exact=True).click(); home()
        expect(card.get_by_role('link',name='Review Design with intention',exact=True)).to_be_visible()
        expect(card.get_by_role('progressbar')).to_have_attribute('value','3')
        visit(page,'/learn/courses/build-for-the-web/lessons/web-purpose'); heading('Give your page a purpose')
        page.get_by_role('button',name='Mark lesson complete',exact=True).click(); home()
        paid=page.locator('[data-learning-course="web"]')
        expect(paid.get_by_text('SAMPLE FINISHED',exact=True)).to_be_visible()
        expect(paid.get_by_role('link',name='View Build for the web',exact=True)).to_have_attribute('href','/learn/courses/build-for-the-web')
        assert 'web-states' not in state()['progress']
        passed('Learning overview resumes unfinished lessons, offers completed-course review and never unlocks paid lessons')
        quick=page.get_by_role('region',name='A little learning, right now',exact=True)
        quick.get_by_role('button',name='5 min',exact=True).click()
        expect(quick.get_by_text('No open lessons fit this view.',exact=True)).to_be_visible()
        quick.get_by_role('button',name='10 min',exact=True).click()
        expect(quick.get_by_role('link').filter(has_text='Start by noticing')).to_have_count(0)
        quick.get_by_role('checkbox',name='Include completed lessons',exact=True).check()
        expect(quick.get_by_role('link').filter(has_text='Start by noticing')).to_have_count(1)
        passed('Short-lesson controls filter actual open content and recover from empty time budgets')
        visit(page,'/learn/creators/noah-reed'); heading('Noah Reed')
        page.get_by_role('button',name='Follow Noah Reed',exact=True).click(); home()
        followed=page.get_by_role('region',name='Courses from followed creators',exact=True)
        expect(followed.get_by_role('heading',name='Build for the web',exact=True)).to_be_visible()
        page.get_by_role('link',name='Open course discussion',exact=False).click(); heading('Community')
        expect(page.locator('#post-course')).to_have_value('web')
        home(); page.get_by_role('button',name='Dismiss discussion prompt',exact=True).click()
        page.reload(wait_until='networkidle'); expect(page.get_by_role('heading',name='Bring your next question',exact=True)).to_have_count(0)
        page.get_by_role('button',name='Learning preferences',exact=True).click()
        dialog.get_by_role('checkbox',name='Show the course discussion prompt',exact=True).check()
        dialog.get_by_role('button',name='Save preferences',exact=True).click()
        expect(page.get_by_role('heading',name='Bring your next question',exact=True)).to_be_visible()
        passed('Learning overview connects followed creators and course discussions with persistent dismiss and restore')
        page.get_by_role('button',name='Learning preferences',exact=True).click()
        dialog.get_by_role('checkbox',name='Writing',exact=True).check()
        tab=context.new_page(); tab.on('pageerror',lambda error: errors.append(str(error)))
        visit(tab,HOME)
        tab.get_by_role('button',name='Learning preferences',exact=True).click()
        other=tab.get_by_role('dialog',name='Your learning preferences',exact=True)
        other.get_by_role('checkbox',name='Business',exact=True).check()
        other.get_by_role('button',name='Save preferences',exact=True).click()
        dialog.get_by_role('button',name='Save preferences',exact=True).click()
        expect(dialog.get_by_text('Preferences changed in another tab.',exact=False)).to_be_visible()
        expect(dialog.get_by_role('checkbox',name='Writing',exact=True)).to_be_checked()
        assert 'Business' in state()['homePreferences']['interests'] and 'Writing' not in state()['homePreferences']['interests']
        dialog.get_by_role('button',name='Cancel',exact=True).click(); tab.close()
        passed('Conflicting learning preferences keep the editing draft and do not overwrite another tab')
        for width in [320,390,768,1024,1280,1440]:
            page.set_viewport_size({'width':width,'height':844 if width<=760 else 903})
            visit(page,HOME); heading('Learning overview'); check_shell_contract(page,width,observations)
            assert not page.locator('main').evaluate('e=>e.scrollWidth>e.clientWidth+1'),(width,'Home overflow')
            page.screenshot(path=str(out/f'home-{width}.png'))
            page.get_by_role('link',name='Short lessons',exact=True).click()
            expect(page.get_by_role('combobox',name='Search courses',exact=True)).to_be_visible()
            page.get_by_role('button',name='Learning preferences',exact=True).click()
            expect(dialog).to_be_visible()
            assert not dialog.evaluate('e=>e.scrollWidth>e.clientWidth+1'),(width,'Preferences overflow')
            dialog.get_by_role('button',name='Cancel',exact=True).click()
        passed('Learning overview, sticky search and preferences remain usable at all six widths')
        page.set_viewport_size({'width':1440,'height':903})
        page.get_by_role('button',name='Learning preferences',exact=True).click()
        dialog.get_by_role('checkbox',name='Photography',exact=True).check()
        before=page.evaluate('(key)=>localStorage.getItem(key)',KEY)
        # Isolated fault injection, not a user journey or access grant.
        page.evaluate('''() => { const original = Storage.prototype.setItem;
          Storage.prototype.setItem = function(key,value) {
            if(key === 'courses:learning-preview:v1') throw new DOMException('full','QuotaExceededError');
            return original.call(this,key,value);
          }; }''')
        dialog.get_by_role('button',name='Save preferences',exact=True).click()
        expect(dialog.get_by_text('Preferences were not saved.',exact=False)).to_be_visible()
        expect(dialog.get_by_role('checkbox',name='Photography',exact=True)).to_be_checked()
        assert page.evaluate('(key)=>localStorage.getItem(key)',KEY)==before
        passed('Learning overview preference write failures preserve saved data and unsaved choices')
    except Exception:
        page.screenshot(path=str(out/'home-failure.png'))
        raise
    finally:
        context.close()
