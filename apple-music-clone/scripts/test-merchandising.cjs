module.exports = ({ test, assert, load }) => {
  const { courses, canReadDemoLesson } = load('catalog');
  const { demoLessonBody } = load('lesson-content.server');
  const { collections, collectionCourses } = load('merchandising');
  const { marketplaceOptions, marketplaceHref, marketplaceCourses } = load('marketplace');
  test('expanded catalog has fifteen complete offers and every advertised sample is readable', () => {
    assert.equal(courses.length, 15);
    for (const course of courses) {
      assert.equal(course.lessons.length, 3);
      const open = course.lessons.filter(lesson => canReadDemoLesson(course, lesson.id));
      assert(open.length > 0);
      for (const lesson of open) {
        const body = demoLessonBody(course, lesson.id);
        assert(body?.introduction.length > 50, lesson.id);
        assert.equal(body.sections.length, 2);
        assert(body.exercise.length > 30, lesson.id);
      }
      for (const lesson of course.lessons.filter(lesson => !canReadDemoLesson(course, lesson.id))) assert.equal(demoLessonBody(course, lesson.id), null);
    }
  });
  test('collections have distinct deterministic membership and truthful provenance', () => {
    assert.equal(collections.length, 4);
    assert(collections[0].description.includes('not ranked by real sales'));
    assert.deepEqual(collectionCourses('bestsellers', courses).map(c => c.id), ['typescript','systems','photo','story','offer','web']);
    assert.deepEqual(collectionCourses('top', courses).map(c => c.id), ['design','accessible','light','microcopy','interviews','editing']);
    assert.deepEqual(collectionCourses('free', courses).map(c => c.id), ['design','writing','color','interviews']);
    for (const collection of collections) assert.equal(new Set(collectionCourses(collection.id, courses).map(c => c.id)).size, collectionCourses(collection.id, courses).length);
  });
  test('marketplace facets compose without changing catalog, access or input options', () => {
    const before = JSON.stringify(courses);
    const options = marketplaceOptions({ collection:'bestsellers', category:'development', level:'Intermediate', duration:'45' });
    assert.deepEqual(marketplaceCourses(options).map(c => c.id), ['typescript']);
    assert.equal(marketplaceCourses({ ...options, duration:30 }).length, 0);
    assert.equal(JSON.stringify(courses), before);
    assert.equal(canReadDemoLesson(courses.find(c => c.id === 'typescript'), 'typescript-input'), false);
  });
  test('invalid facet values cannot become a redirect or an entitlement', () => {
    assert.deepEqual(marketplaceOptions({ collection:['top'], level:'admin', duration:'-1', category:'<script>' }), { category:'', price:'all', sort:'featured' });
    const options = marketplaceOptions({ collection:'top', level:'Intermediate', duration:45, price:'under50' });
    const href = marketplaceHref(options);
    assert(href.startsWith('/learn/home?'));
    assert.deepEqual(marketplaceOptions(Object.fromEntries(new URL(href, 'https://example.test').searchParams)), options);
  });
};
