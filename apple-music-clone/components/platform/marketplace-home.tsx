import Link from "next/link";
import { creators, topics } from "../../lib/platform/discovery";
import { demoLessonBody } from "../../lib/platform/lesson-content.server";
import { courseArtwork, marketplaceCourses, marketplaceHref, type MarketplaceOptions } from "../../lib/platform/marketplace";
import { MarketplaceBrowser } from "./marketplace-browser";
import { Icon } from "./icon";
import styles from "./platform.module.css";

export function MarketplaceHome({ options }: { options: MarketplaceOptions }) {
  const shown = marketplaceCourses(options);
  const filtered = Boolean(options.category || options.price !== "all");
  const introductions = Object.fromEntries(shown.map(course => [course.id,
    demoLessonBody(course, course.lessons[0].id)?.introduction ?? "Explore the curriculum and open sample.",
  ]));
  return <div className={`${styles.page} ${styles.marketplace}`} data-marketplace>
    <header className={styles.marketHeader}>
      <div><h1>Find your next possibility.</h1><p>Explore courses. Meet your next teacher. Make something of it.</p></div>
      <Link className={styles.textButton} href="/learn/courses">Browse all courses <Icon name="arrow" /></Link>
    </header>
    <nav className={styles.marketCategories} aria-label="Marketplace subjects">
      <Link href={marketplaceHref({ ...options, category: "" })} aria-current={!options.category ? "page" : undefined}>All courses</Link>
      {topics.map(topic => <Link key={topic.slug} href={marketplaceHref({ ...options, category: topic.slug })}
        aria-current={options.category === topic.slug ? "page" : undefined}>{topic.name}</Link>)}
    </nav>
    {!filtered && <section className={styles.marketFeatures} aria-label="Featured courses">
      <Link href="/learn/courses/design-with-intention" className={`${styles.marketFeature} ${styles.marketFeatureLight}`}>
        <img src={courseArtwork("design")} alt="" width="1200" height="807" fetchPriority="high" />
        <div className={styles.marketFeatureCopy}><span>THE DESIGN EDIT</span><h2>A sharper eye.<br />A better interface.</h2><p>Design with intention · Maya Chen</p><span className={styles.marketFeatureCta}>Explore the free course <Icon name="arrow" /></span></div>
      </Link>
      <Link href="/learn/courses/build-for-the-web" className={styles.marketFeature}>
        <img src={courseArtwork("web")} alt="" width="1200" height="800" />
        <div className={styles.marketFeatureCopy}><span>IDEAS INTO INTERFACES</span><h2>Build something<br />worth opening.</h2><p>Build for the web · Noah Reed</p><span className={styles.marketFeatureCta}>Explore course <Icon name="arrow" /></span></div>
      </Link>
    </section>}
    <MarketplaceBrowser courses={shown} options={options} sampleIntroductions={introductions} />
    {!filtered && <>
      <section className={styles.marketSpotlight} aria-labelledby="market-spotlight">
        <Link href="/learn/courses/frame-the-everyday" className={styles.marketSpotlightArt} aria-label="Explore Frame the everyday"><img src={courseArtwork("photo")} alt="Camera lenses on a desk" width="1200" height="800" loading="lazy" /></Link>
        <div><p className={styles.eyebrow}>A DIFFERENT POINT OF VIEW</p><h2 id="market-spotlight">The everyday.<br />Seen differently.</h2><p>Subject, light, and composition. Explore a short photography course that starts with the camera you already have.</p><Link className={styles.primaryButton} href="/learn/courses/frame-the-everyday">Explore photography <Icon name="arrow" /></Link></div>
      </section>
      <section className={styles.marketCreatorSection} aria-labelledby="market-creators">
        <div className={styles.marketCatalogHeading}><div><h2 id="market-creators">Meet the creators</h2><p>Five different perspectives. Find one that speaks to you.</p></div><Link className={styles.textButton} href="/learn/creators">All creators <Icon name="arrow" /></Link></div>
        <div className={styles.marketCreatorGrid}>{creators.map(creator => <Link href={`/learn/creators/${creator.slug}`} key={creator.id} className={styles.marketCreator}>
          <span className={`${styles.marketInitials} ${styles[creator.color]}`} aria-hidden="true">{creator.initials}</span><span><strong>{creator.name}</strong><small>{creator.category} · Demo creator</small></span><Icon name="arrow" />
        </Link>)}</div>
      </section>
      <section className={styles.marketExplore} aria-label="More ways to browse">
        <div><Icon name="grid" /><h3>Follow a subject</h3><p>Design, development, writing, and more.</p><Link href="/learn/categories">Browse categories <Icon name="arrow" /></Link></div>
        <div><Icon name="book" /><h3>Start with a sample</h3><p>Get a feel for a course before choosing it.</p><Link href="/learn/home?price=free">Explore free courses <Icon name="arrow" /></Link></div>
        <div><Icon name="community" /><h3>Go beyond the lesson</h3><p>Explore course questions and practice prompts.</p><Link href="/learn/community">Explore community <Icon name="arrow" /></Link></div>
      </section>
    </>}
    <p className={styles.marketCredits}>Illustrative photography · <Link href="/learn/credits">Photo credits</Link></p>
  </div>;
}
