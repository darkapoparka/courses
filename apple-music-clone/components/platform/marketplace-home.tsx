import Link from "next/link";
import { courses as catalog } from "../../lib/platform/catalog";
import { creators, topics, creatorName } from "../../lib/platform/discovery";
import { demoLessonBody } from "../../lib/platform/lesson-content.server";
import { courseArtwork, marketplaceCourses, marketplaceHref, type MarketplaceOptions } from "../../lib/platform/marketplace";
import { CreatorCard } from "./discovery-cards";
import { EditorialShelf } from "./editorial-shelf";
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

    <nav className={styles.marketCategories} aria-label="Marketplace subjects">
      <Link href={marketplaceHref({ ...options, category: "" })} aria-current={!options.category ? "page" : undefined}>All courses</Link>
      {topics.map(topic => <Link key={topic.slug} href={marketplaceHref({ ...options, category: topic.slug })}
        aria-current={options.category === topic.slug ? "page" : undefined}>{topic.name}</Link>)}
    </nav>
    {!filtered && <section className={styles.marketFeatures} aria-label="Featured courses">
      <EditorialShelf label="Marketplace features" variant="features">
        {catalog.map(course => <Link key={course.id} href={`/learn/courses/${course.slug}`} className={styles.marketFeature}>
          <div className={styles.marketFeatureCopy}>
            <span>{course.priceMinor === 0 ? "FREE COURSE" : "COURSE SPOTLIGHT"} · {course.category}</span>
            <h2>{course.title}</h2><p>{creatorName(course)}</p>
          </div>
          <img src={courseArtwork(course.id)} alt="" width="1200" height="800" loading={course.id === "design" ? "eager" : "lazy"} />
        </Link>)}
      </EditorialShelf>
    </section>}
    <MarketplaceBrowser courses={shown} options={options} sampleIntroductions={introductions} />
    {!filtered && <>
      <section className={styles.marketSpotlight} aria-labelledby="market-spotlight">
        <Link href="/learn/courses/frame-the-everyday" className={styles.marketSpotlightArt} aria-label="Explore Frame the everyday">
          <img src={courseArtwork("photo")} alt="Camera lenses on a desk" width="1200" height="800" loading="lazy" />
        </Link>
        <div><p className={styles.eyebrow}>PHOTOGRAPHY</p><h2 id="market-spotlight">Frame the everyday</h2>
          <p>Subject, light, and composition. Start with the camera you already have.</p>
          <Link className={styles.textButton} href="/learn/courses/frame-the-everyday">Explore photography <Icon name="arrow" /></Link>
        </div>
      </section>
      <section className={styles.marketCreatorSection} aria-labelledby="market-creators">
        <div className={styles.marketCatalogHeading}><h2 id="market-creators">Meet the creators</h2><Link className={styles.textButton} href="/learn/creators">All creators <Icon name="arrow" /></Link></div>
        <EditorialShelf label="Marketplace creators" variant="creators">{creators.map(creator => <CreatorCard key={creator.id} creator={creator} />)}</EditorialShelf>
      </section>
      <section className={styles.marketExplore} aria-label="More ways to browse">
        <h2>More to explore</h2>
        <nav aria-label="Explore the marketplace">
          <Link href="/learn/categories">Browse categories <Icon name="arrow" /></Link>
          <Link href="/learn/home?price=free">Explore free courses <Icon name="arrow" /></Link>
          <Link href="/learn/community">Explore community <Icon name="arrow" /></Link>
        </nav>
      </section>
    </>}
    <p className={styles.marketCredits}>Illustrative photography · <Link href="/learn/credits">Photo credits</Link></p>
  </div>;
}
