import Link from "next/link";
import {
  BookOpen,
  Home,
  Search,
  LibraryBig,
  UserRound,
  LayoutGrid,
  Bookmark,
  Code2,
  Dumbbell,
  BriefcaseBusiness,
  CircleDollarSign,
  Palette,
} from "lucide-react";
import type { ReactNode } from "react";

const futureDestinations = [
  { label: "Search", icon: Search },
  { label: "Library", icon: LibraryBig },
  { label: "You", icon: UserRound },
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
          <button
            className="nav-item future"
            disabled
            aria-label="Search: unavailable in this preview"
          >
            <Search aria-hidden="true" />
            <span>Search</span>
            <small>Soon</small>
          </button>
          <Link href="/" className="nav-item active" aria-current="page">
            <Home aria-hidden="true" />
            <span>Home</span>
          </Link>
          <Link href="/#topics" className="nav-item">
            <LayoutGrid aria-hidden="true" />
            <span>Browse</span>
            <small>On Home</small>
          </Link>
        </nav>
        <nav aria-label="Library navigation" className="rail-group">
          <p className="rail-label">Library</p>
          <button
            className="nav-item future"
            disabled
            aria-label="Library: unavailable in this preview"
          >
            <LibraryBig aria-hidden="true" />
            <span>My courses</span>
            <small>Soon</small>
          </button>
          <button
            className="nav-item future"
            disabled
            aria-label="Saved courses: unavailable in this preview"
          >
            <Bookmark aria-hidden="true" />
            <span>Saved</span>
            <small>Soon</small>
          </button>
        </nav>
        <nav
          className="rail-group rail-topics"
          aria-label="Explore subjects on Home"
        >
          <p className="rail-label">Explore on Home</p>
          {topics.map(({ id, label, icon: Icon }) => (
            <Link key={id} href={`/#${id}`} className="nav-item">
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
        <div className="rail-bottom">
          <Link className="preview-label" href="/#preview-options">
            Sample catalog · Preview options
          </Link>
          <button
            className="nav-item future account-item"
            disabled
            aria-label="You: unavailable in this preview"
          >
            <UserRound aria-hidden="true" />
            <span>You</span>
            <small>Soon</small>
          </button>
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
        <Link href="/" className="dock-item active" aria-current="page">
          <Home aria-hidden="true" />
          <span>Home</span>
        </Link>
        {futureDestinations.map(({ label, icon: Icon }) => (
          <button
            type="button"
            className="dock-item"
            key={label}
            disabled
            aria-label={`${label}: unavailable in this preview`}
          >
            <Icon aria-hidden="true" />
            <span>{label}</span>
            <small>Soon</small>
          </button>
        ))}
      </nav>
    </>
  );
}
