// Dependency-free domain tests using the project's installed TypeScript compiler.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const root = path.resolve(__dirname, '../lib/platform');
const compiled = path.resolve(__dirname, `../.qa/unit-platform-${Date.now()}`);
execFileSync(process.execPath, [path.resolve(__dirname, '../node_modules/typescript/bin/tsc'), '--ignoreConfig', '--module', 'commonjs', '--target', 'es2022', '--skipLibCheck', '--outDir', compiled, path.resolve(__dirname, '../node_modules/next/types/global.d.ts'), ...['types.ts', 'catalog.ts', 'preview-state.ts', 'lesson-content.server.ts'].map(name => path.join(root, name))], { stdio: 'inherit' });
const cache = new Map();
function load(name) {
  const file = path.resolve(root, name.endsWith('.ts') ? name : `${name}.ts`);
  assert(file.startsWith(root + path.sep));
  if (cache.has(file)) return cache.get(file).exports;
  const module = { exports: {} }; cache.set(file, module);
  const js = fs.readFileSync(path.join(compiled, path.basename(file, '.ts') + '.js'), 'utf8');
  const localRequire = id => id === 'server-only' ? {} : load(path.relative(root, path.resolve(path.dirname(file), id)));
  new Function('require', 'module', 'exports', js)(localRequire, module, module.exports);
  return module.exports;
}
const catalog = load('catalog'); const state = load('preview-state'); const content = load('lesson-content.server');
const design = catalog.courseById('design'); const web = catalog.courseById('web');
test('catalog IDs and slugs are unique', () => { for (const key of ['id', 'slug']) assert.equal(new Set(catalog.courses.map(c => c[key])).size, catalog.courses.length); const ids = catalog.courses.flatMap(c => c.lessons.map(l => l.id)); assert.equal(new Set(ids).size, ids.length); });
test('catalog totals and prices are internally consistent', () => { for (const c of catalog.courses) { assert.equal(c.minutes, c.lessons.reduce((sum, l) => sum + l.minutes, 0)); assert(Number.isInteger(c.priceMinor) && c.priceMinor >= 0); assert.equal(c.lessons.length, 3); } });
test('search is trimmed, case-insensitive and category-aware', () => { assert.equal(catalog.filterCourses(' DESIGN ', '').length, 1); assert.equal(catalog.filterCourses('design', 'Writing').length, 0); assert.equal(catalog.filterCourses('no-such-course', '').length, 0); assert.equal(catalog.filterCourses('', '').length, 5); });
test('unknown courses and cross-course lessons are rejected', () => { assert.equal(catalog.courseBySlug('absent'), undefined); assert.equal(catalog.canReadDemoLesson(design, 'web-purpose'), false); assert.equal(catalog.canReadDemoLesson(design, 'absent'), false); });
test('all free demo lessons have server-selected bodies', () => { for (const c of catalog.courses.filter(c => c.priceMinor === 0)) for (const l of c.lessons) { assert(catalog.canReadDemoLesson(c, l.id)); assert(content.demoLessonBody(c, l.id)?.exercise); } });
test('paid non-preview bodies remain locked', () => { assert(content.demoLessonBody(web, 'web-purpose')); assert.equal(content.demoLessonBody(web, 'web-states'), null); assert.equal(content.demoLessonBody(web, 'web-ship'), null); assert(fs.readFileSync(path.join(root, 'lesson-content.server.ts'), 'utf8').includes('import "server-only"')); });
test('empty storage has a deterministic writable schema', () => { assert.deepEqual(state.decodePreview(null), { state: state.emptyState(), writable: true, issue: null }); });
test('corrupt, future and oversized storage is preserved read-only', () => { for (const raw of ['broken', 'null', '{"version":9}', 'x'.repeat(state.MAX_STORAGE_LENGTH + 1)]) { const result = state.decodePreview(raw); assert.equal(result.writable, false); assert(result.issue); } });
test('unknown saved IDs and duplicate bookmarks are removed from the projection', () => { const value = state.emptyState(); value.saved = ['design', 'design', 'missing']; assert.deepEqual(state.decodePreview(JSON.stringify(value)).state.saved, ['design']); });
test('injected paid progress and resume do not grant access', () => { const value = state.emptyState(); value.progress['web-states'] = { completed: true, updatedAt: new Date().toISOString() }; value.resume = { courseId: 'web', lessonId: 'web-states' }; value.enrolled = true; const result = state.decodePreview(JSON.stringify(value)); assert.deepEqual(result.state.progress, {}); assert.equal(result.state.resume, null); assert.equal(catalog.canReadDemoLesson(web, 'web-states'), false); });
test('notes are bounded and recognized lesson progress survives a round trip', () => { const value = state.emptyState(); value.notes['design-observe'] = 'x'.repeat(6001); value.progress['design-observe'] = { completed: true, updatedAt: '2026-10-02T12:00:00Z' }; const result = state.decodePreview(JSON.stringify(value)); assert.equal(result.state.notes['design-observe'].length, 6000); assert.equal(result.state.progress['design-observe'].completed, true); });
test('post validation rejects missing context, blank titles and out-of-range text', () => { assert(state.validatePost('Ok', 'too short', 'design')); assert(state.validatePost('Valid title', 'Sufficient detail here', 'missing')); assert(state.validatePost('x'.repeat(101), 'Sufficient detail here', 'design')); assert.equal(state.validatePost('A clear question', 'Here is the experiment I tried.', 'design'), null); });
test('post projection rejects malformed entries and deduplicates IDs', () => { const value = state.emptyState(); const post = { id: 'local-test', courseId: 'design', title: 'A clear question', body: 'Here is a useful observation.', createdAt: '2026-10-02T12:00:00Z' }; value.posts = [post, post, { ...post, id: 'invalid' }]; assert.equal(state.decodePreview(JSON.stringify(value)).state.posts.length, 1); });
const app = path.resolve(__dirname, '..');
function sourceFiles(dir) { return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? sourceFiles(path.join(dir, entry.name)) : /\.(tsx?|css)$/.test(entry.name) ? [path.join(dir, entry.name)] : []); }
const ui = [...sourceFiles(path.join(app, 'components/platform')), ...sourceFiles(path.join(app, 'app/learn'))];
const css = fs.readFileSync(path.join(app, 'components/platform/platform.module.css'), 'utf8');
test('platform styles are scoped and retain core material tokens', () => { assert(!css.includes(':global')); assert(!/^\s*(html|body|:root|\*)\s*[{,]/m.test(css)); for (const token of ['--course-sidebar-width:232px', '--course-radius-shell:22px', '--course-accent:#d60025']) assert(css.includes(token)); assert(css.indexOf('-webkit-backdrop-filter:blur(16px)') < css.indexOf(' backdrop-filter:blur(16px)')); });
test('every static CSS module class used by platform UI exists', () => { const declared = new Set([...css.matchAll(/\.([A-Za-z][\w-]*)/g)].map(match => match[1])); for (const file of ui.filter(file => file.endsWith('.tsx'))) for (const match of fs.readFileSync(file, 'utf8').matchAll(/styles\.([A-Za-z]\w*)/g)) assert(declared.has(match[1]), `${file}: missing ${match[1]}`); });
test('client islands do not import lesson bodies or reference artwork', () => { for (const file of ui) { const text = fs.readFileSync(file, 'utf8'); assert(!text.includes('/reference-assets/'), file); if (text.startsWith('"use client"')) assert(!/from ["'][^"']*\.server["']/.test(text), file); } });

const replyFixture = { id: 'reply-example', postId: 'seed-design', body: 'I tried one small change.', createdAt: '2026-10-02T12:00:00Z' };
test('older previews retain notes and bookmarks when replies are introduced', () => {
  const value = { version: 1, saved: ['design'], notes: { 'design-observe': 'Keep this note' }, progress: {}, posts: [], helpful: [], resume: null };
  const decoded = state.decodePreview(JSON.stringify(value));
  assert.equal(decoded.writable, true); assert.deepEqual(decoded.state.replies, []);
  assert.deepEqual(decoded.state.saved, ['design']); assert.equal(decoded.state.notes['design-observe'], 'Keep this note');
});
test('replies round-trip with a minimal projection', () => {
  const value = state.emptyState(); value.replies = [{ ...replyFixture, unexpected: 'not retained' }];
  assert.deepEqual(state.decodePreview(JSON.stringify(value)).state.replies, [replyFixture]);
});
test('reply validation trims whitespace and enforces useful bounds', () => {
  for (const body of ['', '  ', 'ab', 'x'.repeat(2001)]) assert(state.validateReply(body));
  assert.equal(state.validateReply('A useful follow-up.'), null);
});

test('orphan, duplicate and malformed replies are rejected', () => {
  const value = state.emptyState();
  value.replies = [replyFixture, replyFixture, { ...replyFixture, id: 'reply-orphan', postId: 'missing' }, { ...replyFixture, id: 'reply-short', body: ' ' }, { ...replyFixture, id: 'reply-long', body: 'x'.repeat(2001) }, { ...replyFixture, id: 'reply-date', createdAt: 'invalid' }];
  assert.deepEqual(state.decodePreview(JSON.stringify(value)).state.replies, [replyFixture]);
});
test('reply arrays are bounded and invalid schemas remain read-only', () => {
  const value = state.emptyState();
  value.replies = Array.from({ length: state.MAX_REPLIES + 1 }, (_, i) => ({ ...replyFixture, id: `reply-${i}` }));
  assert.equal(state.decodePreview(JSON.stringify(value)).state.replies.length, state.MAX_REPLIES);
  value.replies = 'invalid'; assert.equal(state.decodePreview(JSON.stringify(value)).writable, false);
});
test('replies retain the correct local discussion parent', () => {
  const value = state.emptyState();
  value.posts = [{ id: 'local-parent', courseId: 'design', title: 'A useful question', body: 'Here is my original question.', createdAt: replyFixture.createdAt }];
  value.replies = [{ ...replyFixture, postId: 'local-parent' }];
  const decoded = state.decodePreview(JSON.stringify(value)).state;
  assert.equal(decoded.replies[0].postId, 'local-parent');
  assert.equal(decoded.replies.filter(r => r.postId === 'seed-design').length, 0);
});

const discovery = load('discovery');
test('creator and topic identities are unique and every course has an owner', () => {
  for (const key of ['id', 'slug']) assert.equal(new Set(discovery.creators.map(c => c[key])).size, discovery.creators.length);
  assert.equal(new Set(discovery.topics.map(t => t.slug)).size, discovery.topics.length);
  for (const course of catalog.courses) {
    const creator = discovery.creatorById(course.creatorId);
    assert(creator); assert.equal(creator.category, course.category);
    assert(discovery.topics.some(topic => topic.name === course.category));
    assert.equal(discovery.creatorBySlug(creator.slug), creator);
  }
});
test('creator search returns associated courses and rejects unknown entity URLs', () => {
  assert.deepEqual(catalog.filterCourses('Maya Chen', '').map(c => c.id), ['design']);
  assert.equal(discovery.creatorBySlug('unknown'), undefined);
  assert.equal(discovery.topicBySlug('unknown'), undefined);
});
test('older preview data gains following without losing notes or bookmarks', () => {
  const value = state.emptyState(); delete value.following;
  value.saved = ['design']; value.notes['design-observe'] = 'Keep this note.';
  const decoded = state.decodePreview(JSON.stringify(value));
  assert(decoded.writable); assert.deepEqual(decoded.state.following, []);
  assert.deepEqual(decoded.state.saved, ['design']); assert.equal(decoded.state.notes['design-observe'], 'Keep this note.');
});
test('following is bounded to known creators and invalid data stays read-only', () => {
  const value = state.emptyState(); value.following = ['maya', 'maya', 'missing'];
  const decoded = state.decodePreview(JSON.stringify(value));
  assert.deepEqual(decoded.state.following, ['maya']);
  assert.deepEqual(decoded.state.saved, []); assert.deepEqual(decoded.state.progress, {});
  value.following = 'malformed'; assert.equal(state.decodePreview(JSON.stringify(value)).writable, false);
});

const search = load('search');
test('search handles all public entity types without indexing protected bodies or private notes', () => {
  const hits = search.searchCatalog('design');
  for (const kind of ['courses', 'creators', 'lessons', 'categories']) assert(hits.some(hit => hit.kind === kind));
  assert.equal(search.searchCatalog('Before you move a button').length, 0);
  assert.equal(search.searchCatalog('   ').length, 0);
  assert(search.searchCatalog('Design the states', 'lessons').every(hit => hit.available === false));
});
test('search scope limits every entity to saved or started courses, never following', () => {
  const value = state.emptyState(); value.following=['noah']; value.saved=['design'];
  assert.deepEqual(search.libraryCourseIds(value), ['design']);
  assert.equal(search.searchCatalog('Noah', 'all', search.libraryCourseIds(value)).length, 0);
  assert.equal(search.searchCatalog('design', 'all', []).length, 0);
  value.progress['writing-reader']={completed:false,updatedAt:'2026-10-02T12:00:00Z'};
  assert.deepEqual(search.libraryCourseIds(value), ['design','writing']);
});
test('query parsing and URLs reject unsupported shapes and encode text safely', () => {
  assert.equal(search.normalizeQuery(['a','b']), '');
  assert.equal(search.normalizeQuery('  Maya   Chen '), 'Maya Chen');
  assert.equal(search.normalizeQuery('x'.repeat(200)).length, 100);
  assert.equal(search.searchKind('html'), 'all'); assert.equal(search.searchScope('admin'), 'catalog');
  assert(search.searchHref('<script>&x', 'library', 'lessons').startsWith('/learn/search?q=%3Cscript%3E%26x'));
});
test('recent searches are bounded, normalized and backward compatible', () => {
  assert.deepEqual(search.recentQueries(['Design', ' design ', 17, null, '  ', 'Maya Chen']), ['Design','Maya Chen']);
  assert.equal(search.recentQueries(Array.from({length:20},(_,i)=>String(i))).length, 8);
  const value=state.emptyState(); delete value.recentSearches; value.notes['design-observe']='Keep this note';
  const decoded=state.decodePreview(JSON.stringify(value)); assert(decoded.writable);
  assert.deepEqual(decoded.state.recentSearches, []); assert.equal(decoded.state.notes['design-observe'], 'Keep this note');
  value.recentSearches='unknown schema'; assert.equal(state.decodePreview(JSON.stringify(value)).writable, false);
});
test('collection filters and sorts do not mutate the catalog or grant access', () => {
  const before=JSON.stringify(catalog.courses);
  assert.deepEqual(search.selectCourses(catalog.courses,'','', 'free', 'duration').map(c=>c.id), ['writing','design']);
  assert.deepEqual(search.selectCourses(catalog.courses,'Maya','Design','all','title').map(c=>c.id), ['design']);
  assert.equal(search.selectCourses(catalog.courses,'Maya','Writing','all','title').length,0);
  assert.equal(JSON.stringify(catalog.courses), before);
  const options=search.catalogOptions({view:'list',sort:'duration',category:'unknown',filter:['a']});
  assert.equal(search.catalogHref('/learn/courses',options), '/learn/courses?sort=duration&view=list');
  assert.equal(search.catalogHref('https://untrusted.invalid', search.catalogOptions({})), '/learn/courses');
});
