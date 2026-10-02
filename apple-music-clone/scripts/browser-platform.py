"""Real-control A0 course journeys and isolated fault injection; not Apple FLOW acceptance."""
from pathlib import Path
from datetime import datetime, timezone
import argparse, json, os, hashlib
from browser_platform_contract import check_shell_contract, check_reply_journey
from browser_platform_home import check_learning_home
from browser_platform_marketplace import check_marketplace
from browser_platform_catalog import check_rich_catalog
from browser_platform_search import check_search_and_collections
from playwright.sync_api import sync_playwright, expect
parser = argparse.ArgumentParser()
parser.add_argument('--url', default=os.environ.get('PLATFORM_URL', 'http://127.0.0.1:6435'))
parser.add_argument('--browser', default=os.environ.get('PLAYWRIGHT_CHROMIUM_EXECUTABLE'))
parser.add_argument('--output', default='.qa/platform-' + datetime.now(timezone.utc).strftime('%Y%m%d-%H%M%S'))
args = parser.parse_args(); out = Path(args.output); out.mkdir(parents=True, exist_ok=False)
checks = []; errors = []; shell_observations = []
def source_digest():
    root = Path(__file__).resolve().parent.parent
    files = sorted([p for name in ['app/learn', 'components/platform', 'lib/platform', 'scripts'] for p in (root/name).rglob('*') if p.is_file() and p.suffix in ['.ts', '.tsx', '.css', '.py', '.cjs']])
    digest = hashlib.sha256()
    for file in files:
        digest.update(str(file.relative_to(root)).encode('utf-8')); digest.update(file.read_bytes())
    return digest.hexdigest()
results = {'checks': checks, 'pageErrors': errors, 'url': args.url, 'shell': shell_observations, 'sourceBefore': source_digest()}
KEY = 'courses:learning-preview:v1'
DESIGN = '/learn/courses/design-with-intention'
REFERENCE = '/screen/5b3ec96a-2ba2-4798-b03e-07e82e3bc7a7'
def passed(name): checks.append(name); print('PASS: ' + name, flush=True)
def visit(page, path): return page.goto(args.url.rstrip('/') + path, wait_until='networkidle', timeout=90000)
def sidebar(page): return page.locator('.music-sidebar').evaluate('(e)=>{const s=getComputedStyle(e),r=e.getBoundingClientRect();return {width:r.width,radius:s.borderRadius,background:s.backgroundColor,filter:s.backdropFilter}}')
with sync_playwright() as p:
    browser = p.chromium.launch(**({'executable_path': args.browser} if args.browser else {}), headless=True)
    results['browserVersion'] = browser.version
    context = browser.new_context(viewport={'width':1440,'height':903}, device_scale_factor=1)
    page = context.new_page(); page.on('pageerror', lambda error: errors.append(str(error)))
    cdp = context.new_cdp_session(page)
    cdp.send('Emulation.setEmulatedMedia', {'features':[{'name':'prefers-reduced-transparency','value':'no-preference'},{'name':'forced-colors','value':'none'}]})
    results['captureMedia'] = {'reducedTransparency':'no-preference','forcedColors':'none'}
    try:
        visit(page, REFERENCE); expect(page.locator('.music-sidebar')).to_be_visible(); page.screenshot(path=str(out/'reference-before.png'))
        visit(page, '/'); expect(page.locator('.music-sidebar')).to_be_visible(); original_sidebar = sidebar(page)
        visit(page, '/learn'); expect(page.get_by_role('heading', name='Discover', exact=True)).to_be_visible(timeout=60000)
        cdp.send('Emulation.setEmulatedMedia', {'features':[{'name':'prefers-reduced-transparency','value':'reduce'}]})
        glass = page.get_by_role('complementary', name='Courses navigation')
        expect(glass).to_have_css('backdrop-filter', 'none'); expect(glass).to_have_css('background-color', 'rgb(248, 248, 250)')
        cdp.send('Emulation.setEmulatedMedia', {'features':[{'name':'prefers-reduced-transparency','value':'no-preference'},{'name':'forced-colors','value':'none'}]})
        expect(glass).to_have_css('backdrop-filter', 'blur(16px) saturate(1.8)')
        passed('Reduced transparency has an opaque fallback and normal material restores correctly')
        page.get_by_label('Search courses', exact=True).fill('writing'); page.get_by_role('button', name='Search', exact=True).click()
        expect(page.get_by_role('heading', name='Search', level=1, exact=True)).to_be_visible(timeout=60000)
        expect(page.get_by_role('heading', name='Make your ideas clear', exact=True)).to_be_visible(timeout=60000)
        expect(page.get_by_role('heading', name='Design with intention', exact=True)).to_have_count(0); passed('Search submits a real URL and filters the catalog')
        visit(page, DESIGN); page.get_by_role('button', name='Save course', exact=True).click()
        page.get_by_role('navigation', name='Main navigation').get_by_role('link', name='Saved', exact=True).click(); page.wait_for_load_state("networkidle", timeout=90000)
        expect(page.get_by_role('heading', name='Saved', exact=True)).to_be_visible(timeout=60000)
        expect(page.get_by_role('heading', name='Design with intention', exact=True)).to_be_visible(timeout=60000)
        page.get_by_role('navigation', name='Main navigation').get_by_role('link', name='My learning', exact=True).click(); page.wait_for_load_state("networkidle", timeout=90000)
        expect(page.get_by_role('heading', name='My learning', exact=True)).to_be_visible(timeout=60000)
        expect(page.get_by_role('heading', name='Your next chapter starts here.', exact=True)).to_be_visible(timeout=60000); passed('Saving is a bookmark, not started learning or access')
        visit(page, DESIGN); page.get_by_role('link', name='Start free demo', exact=True).click(); page.wait_for_load_state("networkidle", timeout=90000)
        expect(page.get_by_role('heading', name='Start by noticing', exact=True)).to_be_visible(timeout=60000)
        page.get_by_role('button', name='Mark lesson complete', exact=True).click()
        page.get_by_label('Your lesson notes', exact=False).fill('I will test one change and record what happens.')
        page.get_by_role('button', name='Save note', exact=True).click(); expect(page.get_by_text('Note saved in this browser.', exact=True)).to_be_visible()
        page.reload(wait_until='networkidle'); expect(page.get_by_label('Your lesson notes', exact=False)).to_have_value('I will test one change and record what happens.')
        expect(page.get_by_role('button', name='Completed · undo', exact=True)).to_have_attribute('aria-pressed', 'true'); passed('Lesson completion and notes survive a reload')
        page.get_by_role('button', name='Completed · undo', exact=True).click(); expect(page.get_by_role('button', name='Mark lesson complete', exact=True)).to_have_attribute('aria-pressed', 'false'); passed('Completion can be intentionally undone')
        page.get_by_role('link', name='Next lesson', exact=True).click(); page.wait_for_load_state("networkidle", timeout=90000); expect(page.get_by_role('heading', name='Give the important things room', exact=True)).to_be_visible(timeout=60000)
        page.get_by_role('navigation', name='Main navigation').get_by_role('link', name='My learning', exact=True).click(); page.wait_for_load_state("networkidle", timeout=90000)
        page.get_by_role('complementary', name='Continue learning').get_by_role('link', name='Continue', exact=True).click(); page.wait_for_load_state("networkidle", timeout=90000)
        expect(page.get_by_role('heading', name='Give the important things room', exact=True)).to_be_visible(timeout=60000); passed('Resume follows the actual last-opened lesson')
        page.get_by_role('link', name='Bring it to the discussion', exact=False).click(); expect(page.get_by_role('heading', name='Community', level=1, exact=True)).to_be_visible(timeout=60000); expect(page.locator('#post-course')).to_have_value('design')
        page.locator('#post-title').fill('One change worth testing'); page.locator('#post-body').fill('I removed a competing action and will observe which action a reader chooses.')
        page.get_by_role('button', name='Post to local preview', exact=True).click()
        expect(page.get_by_role('heading', name='One change worth testing', exact=True)).to_be_visible(timeout=60000)
        page.reload(wait_until='networkidle'); post=page.get_by_role('article').filter(has=page.get_by_role('heading', name='One change worth testing', exact=True))
        post.get_by_role('button', name='Mark helpful', exact=True).click(); expect(post.get_by_role('button', name='Marked helpful', exact=True)).to_have_attribute('aria-pressed', 'true'); passed('Course-context posts and reactions persist locally without public publishing')
        check_reply_journey(page); passed('Keyboard-operated replies persist, remain plain text, and stay with their discussion')
        visit(page, '/learn/courses/build-for-the-web/lessons/web-states'); expect(page.get_by_role('heading', name='This lesson is not in the preview.', exact=True)).to_be_visible(timeout=60000)
        page.evaluate('(key)=>{const value=JSON.parse(localStorage.getItem(key));value.enrolled=true;value.progress["web-states"]={completed:true,updatedAt:new Date().toISOString()};localStorage.setItem(key,JSON.stringify(value))}', KEY)
        page.reload(wait_until='networkidle'); expect(page.get_by_role('heading', name='This lesson is not in the preview.', exact=True)).to_be_visible(timeout=60000); passed('Direct paid-lesson URLs and forged browser flags cannot reveal a lesson body')
        visit(page, '/learn/courses/not-a-course'); expect(page.get_by_role('heading', name='That chapter isn’t here.', exact=True)).to_be_visible(timeout=60000); passed('Unknown course has a recoverable not-found state')
        visit(page, DESIGN+'/lessons/design-observe'); page.get_by_label('Your lesson notes', exact=False).fill('Unsaved draft from this tab')
        page.evaluate('(key)=>{const value=JSON.parse(localStorage.getItem(key));value.notes["design-observe"]="Newer saved note from another tab";localStorage.setItem(key,JSON.stringify(value));window.dispatchEvent(new StorageEvent("storage",{key}))}', KEY)
        page.get_by_role('button', name='Save note', exact=True).click(); expect(page.get_by_text('This note changed in another tab.', exact=False)).to_be_visible()
        expect(page.get_by_label('Your lesson notes', exact=False)).to_have_value('Unsaved draft from this tab')
        page.get_by_role('button', name='Discard draft and load saved note', exact=True).click(); expect(page.get_by_label('Your lesson notes', exact=False)).to_have_value('Newer saved note from another tab'); passed('A changed saved note does not silently overwrite an editing draft')
        for width in [320,390,768,1024,1280,1440]:
            page.set_viewport_size({'width':width,'height':903 if width>760 else 844})
            for route,name in [('/learn','discover'),(DESIGN,'detail'),(DESIGN+'/lessons/design-observe','lesson'),('/learn/community','community')]:
                visit(page, route); expect(page.locator('h1')).to_be_visible()
                check_shell_contract(page, width, shell_observations)
                assert not page.locator('main').evaluate('(e)=>e.scrollWidth>e.clientWidth+1'), (width,route,'horizontal overflow')
                page.screenshot(path=str(out/f'{name}-{width}.png'))
            passed(f'Four main surfaces contain content at {width}px')
        check_rich_catalog(page, visit, out, passed, shell_observations)
        check_search_and_collections(page, visit, out, passed)
        check_learning_home(page, visit, out, passed, shell_observations, errors)
        check_marketplace(page, visit, out, passed, shell_observations, errors)
        page.set_viewport_size({'width':1440,'height':903}); visit(page, '/learn')
        page.get_by_role('link', name='Open music reference', exact=False).click(); page.wait_for_load_state("networkidle", timeout=90000); expect(page.locator('.music-sidebar')).to_be_visible()
        assert sidebar(page)==original_sidebar, (sidebar(page),original_sidebar); passed('Real client navigation back to music preserves sidebar computed styling')
        visit(page, REFERENCE); page.screenshot(path=str(out/'reference-after.png'))
        from PIL import Image, ImageChops
        difference=ImageChops.difference(Image.open(out/'reference-before.png').convert('RGB'),Image.open(out/'reference-after.png').convert('RGB'))
        difference.save(out/'reference-diff.png'); results['reference_difference_bbox']=difference.getbbox()
        assert difference.getbbox() is None, 'Reference screenshot changed; inspect reference-diff.png'
        passed('Fixed reference screen is pixel-identical before and after this browser suite')
        isolated=browser.new_context(viewport={'width':1000,'height':900}); bad=isolated.new_page()
        bad.add_init_script('(function(){localStorage.setItem("courses:learning-preview:v1", "{\\"version\\":99}")})()')
        visit(bad, DESIGN); expect(bad.get_by_text('This browser has unreadable or newer preview data.',exact=False)).to_be_visible()
        expect(bad.get_by_role('button',name='Save course',exact=True)).to_be_disabled()
        assert bad.evaluate('(key)=>localStorage.getItem(key)',KEY)=='{"version":99}'; passed('Unknown storage version remains untouched and read-only'); isolated.close()
        isolated=browser.new_context(); blocked=isolated.new_page()
        blocked.add_init_script('const get=Storage.prototype.getItem;Storage.prototype.getItem=function(key){if(key==="courses:learning-preview:v1")throw new DOMException("blocked","SecurityError");return get.call(this,key)}')
        visit(blocked, DESIGN); expect(blocked.get_by_text('Browser storage is unavailable.',exact=False)).to_be_visible()
        blocked.get_by_role('button',name='Save course',exact=True).click(); expect(blocked.get_by_role('button',name='Saved',exact=True)).to_have_attribute('aria-pressed','true')
        passed('Unavailable storage has a disclosed memory-only fallback'); isolated.close()
        isolated=browser.new_context(); quota=isolated.new_page(); visit(quota, DESIGN)
        quota.get_by_role('button',name='Save course',exact=True).click(); old=quota.evaluate('(key)=>localStorage.getItem(key)',KEY)
        quota.evaluate('() => { const set=Storage.prototype.setItem;Storage.prototype.setItem=function(key,value){if(key==="courses:learning-preview:v1")throw new DOMException("full","QuotaExceededError");return set.call(this,key,value)}; }')
        quota.get_by_role('button',name='Saved',exact=True).click(); expect(quota.get_by_text('Your browser could not save this change.',exact=False)).to_be_visible()
        assert quota.evaluate('(key)=>localStorage.getItem(key)',KEY)==old; passed('Quota failure preserves previous saved data and reports failure'); isolated.close()
        assert not errors, errors
        results['sourceAfter'] = source_digest()
        assert results['sourceBefore'] == results['sourceAfter'], 'Source changed during verification; mixed evidence is not accepted'
        results['status']='passed'
    except Exception as error:
        results['status']='failed'; results['failure']=str(error)
        page.screenshot(path=str(out/'failure.png'))
        raise
    finally:
        (out/'report.json').write_text(json.dumps(results,indent=2),encoding='utf-8')
        print('Evidence: '+str(out),flush=True)
        browser.close()
