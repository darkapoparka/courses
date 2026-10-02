import Link from "next/link";
import { Icon } from "./icon";
import styles from "./platform.module.css";

const groups = [
  { title: "Explore", items: [
    { href: "/learn/search", label: "Search", icon: "search" },
    { href: "/learn/home", label: "Home", icon: "home" },
    { href: "/learn", label: "Discover", icon: "discover" },
    { href: "/learn/categories", label: "Categories", icon: "grid" },
    { href: "/learn/community", label: "Community", icon: "community" },
  ] },
  { title: "Library", items: [
    { href: "/learn/library", label: "My learning", icon: "library" },
    { href: "/learn/creators", label: "Creators", icon: "person" },
    { href: "/learn/courses", label: "Courses", icon: "book" },
    { href: "/learn/saved", label: "Saved", icon: "saved" },
  ] },
] as const;

export function PlatformNavigation({ pathname }: { pathname: string }) {
  return <nav className={styles.navigation} aria-label="Main navigation">
    {groups.map(group => <div key={group.title} className={styles.navGroup}>
      <span className={styles.navCaption}>{group.title}</span>
      {group.items.map(item => <Link key={item.href} href={item.href}
        aria-current={pathname === item.href || (item.href !== "/learn" && pathname.startsWith(item.href + "/")) ? "page" : undefined}>
        <Icon name={item.icon} /><span>{item.label}</span>
      </Link>)}
    </div>)}
  </nav>;
}
