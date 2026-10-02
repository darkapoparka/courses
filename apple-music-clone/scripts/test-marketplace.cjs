// Loaded by the existing platform unit runner; no extra dependencies.
module.exports = ({ test, assert, load, fs, path, app }) => {
  const market = load('marketplace');
  const catalog = load('catalog');
  test('marketplace filters validate query shapes and preserve real course relationships', () => {
    const invalid = market.marketplaceOptions({category:['Design'],price:'everything',sort:'rating'});
    assert.deepEqual(invalid,{category:'',price:'all',sort:'featured'});
    assert.deepEqual(market.marketplaceCourses(market.marketplaceOptions({category:'design'})).map(c=>c.id),['design']);
    assert.equal(market.marketplaceCourses(market.marketplaceOptions({price:'free'})).length,2);
    assert.equal(market.marketplaceCourses(market.marketplaceOptions({price:'under50'})).length,4);
    assert.deepEqual(market.marketplaceCourses(market.marketplaceOptions({category:'business',price:'free'})),[]);
  });
  test('marketplace sorting and merchandising never mutate catalog or preview access', () => {
    const before=JSON.stringify(catalog.courses);
    const sorted=market.marketplaceCourses(market.marketplaceOptions({sort:'price'}));
    assert.deepEqual(sorted.map(c=>c.priceMinor),[0,0,3500,4900,5900]);
    assert.equal(JSON.stringify(catalog.courses),before);
    assert.equal(catalog.canReadDemoLesson(catalog.courseById('web'),'web-states'),false);
    assert.equal(market.offerPrice(catalog.courseById('design')),'Free');
  });
  test('marketplace navigation has canonical shareable URLs', () => {
    assert.equal(market.marketplaceHref(market.marketplaceOptions({})),'/learn/home');
    assert.equal(market.marketplaceHref(market.marketplaceOptions({category:'writing',price:'free',sort:'duration'})),'/learn/home?category=writing&price=free&sort=duration');
  });
  test('all catalog photos have local bounded bytes and attributable source records', () => {
    const credits=JSON.parse(fs.readFileSync(path.join(app,'public/course-art/credits.json'),'utf8'));
    for(const course of catalog.courses) {
      const source=market.courseArtwork(course.id);
      assert(source?.startsWith('/course-art/'));
      const file=path.join(app,'public',source);
      assert(fs.statSync(file).size>1000 && fs.statSync(file).size<300000);
      assert(credits.some(c=>c.file==='public'+source && c.source.startsWith('https://unsplash.com/photos/') && c.sha256.length===64));
    }
  });
};
