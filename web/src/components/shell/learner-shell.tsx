import Link from "next/link";
import { NavLink } from "./nav-link";
import { LibraryNavigation } from "./library-navigation";
import {
  BookOpen,
  Home,
  Search,
  LibraryBig,
  UserRound,
  LayoutGrid,
  Code2,
  Dumbbell,
  BriefcaseBusiness,
  CircleDollarSign,
  Palette,
} from "lucide-react";
import type { ReactNode } from "react";

const destinations = [
  { label: "Search", href: "/search", icon: Search },
  { label: "Library", href: "/library", icon: LibraryBig },
  { label: "You", href: "/settings", icon: UserRound },
];
const topics = [
  { id: "ai-coding", label: "AI & coding", icon: Code2 },
  { id: "fitness", label: "Fitness", icon: Dumbbell },
  { id: "business", label: "Business", icon: BriefcaseBusiness },
  { id: "finance", label: "Finance education", icon: CircleDollarSign },
  { id: "creative", label: "Creative skills", icon: Palette },
];
export function LearnerShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <aside className="desktop-rail">
        <Link href="/" className="wordmark" aria-label="Courses Home">
          <BookOpen aria-hidden="true" />
          Courses
        </Link>
        <nav aria-label="Main navigation" className="rail-nav">
          <NavLink href="/search">
            <Search aria-hidden="true" />
            <span>Search</span>
          </NavLink>
          <NavLink href="/">
            <Home aria-hidden="true" />
            <span>Home</span>
          </NavLink>
          <NavLink href="/new">
            <LayoutGrid aria-hidden="true" />
            <span>New</span>
          </NavLink>
          <NavLink href="/browse">
            <LayoutGrid aria-hidden="true" />
            <span>Browse</span>
          </NavLink>
        </nav>
        <LibraryNavigation />
        <nav className="rail-group rail-topics" aria-label="Explore subjects">
          <p className="rail-label">Explore subjects</p>
          {topics.map(({ id, label, icon: Icon }) => (
            <Link key={id} href={`/browse/${id}`} className="nav-item">
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
        <div className="rail-bottom">
          <Link href="/preview" className="rail-review-link">
            More UI studies
          </Link>
          <Link className="preview-label" href="/#preview-options">
            Sample catalog · Preview options
          </Link>
          <NavLink href="/settings" className="nav-item account-item">
            <UserRound aria-hidden="true" />
            <span>You</span>
          </NavLink>
        </div>
      </aside>
      <header className="mobile-header">
        <Link href="/" className="wordmark" aria-label="Courses Home">
          <BookOpen aria-hidden="true" />
          Courses
        </Link>
        <Link className="preview-label" href="/#preview-options">
          Sample catalog
        </Link>
      </header>
      <main id="main-content" tabIndex={-1} className="main-content">
        {children}
      </main>
      <nav className="mobile-dock" aria-label="Mobile navigation">
        <NavLink href="/" className="dock-item">
          <Home aria-hidden="true" />
          <span>Home</span>
        </NavLink>
        {destinations.map(({ label, href, icon: Icon }) => (
          <NavLink key={href} href={href} className="dock-item">
            <Icon aria-hidden="true" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}
