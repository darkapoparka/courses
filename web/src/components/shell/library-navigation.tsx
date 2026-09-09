"use client";
import { useState } from "react";
import {
  Bookmark,
  LibraryBig,
  List,
  PlaySquare,
  UserRound,
  Layers,
} from "lucide-react";
import { NavLink } from "./nav-link";
import {
  savedIds,
  usePreviewValue,
  writePreview,
} from "@/features/catalog/preview-storage";
const items = [
  { id: "for-you", href: "/for-you", label: "For you", icon: UserRound },
  { id: "courses", href: "/library", label: "My courses", icon: LibraryBig },
  { id: "creators", href: "/creators", label: "Creators", icon: UserRound },
  { id: "lessons", href: "/library/lessons", label: "Lessons", icon: List },
  {
    id: "previews",
    href: "/previews",
    label: "Lesson previews",
    icon: PlaySquare,
  },
  { id: "saved", href: "/library?tab=saved", label: "Saved", icon: Bookmark },
  { id: "lists", href: "/collections", label: "Learning lists", icon: Layers },
];
export function LibraryNavigation() {
  const hidden = savedIds(usePreviewValue("hidden-navigation"));
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  return (
    <nav aria-label="Library navigation" className="rail-group">
      <div className="rail-section-heading">
        <p className="rail-label">Library</p>
        <button onClick={() => setEditing(!editing)} aria-expanded={editing}>
          {editing ? "Done" : "Edit"}
        </button>
      </div>
      {items
        .filter((item) => editing || !hidden.includes(item.id))
        .map(({ id, href, label, icon: Icon }) =>
          editing ? (
            <label className="library-nav-checkbox" key={id}>
              <input
                type="checkbox"
                checked={!hidden.includes(id)}
                onChange={() => {
                  const next = hidden.includes(id)
                    ? hidden.filter((item) => item !== id)
                    : [...hidden, id];
                  if (!writePreview("hidden-navigation", JSON.stringify(next)))
                    setMessage(
                      "Storage unavailable. Navigation was not changed.",
                    );
                }}
              />
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </label>
          ) : (
            <NavLink key={id} href={href}>
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ),
        )}
      {editing && (
        <p className="rail-edit-note">
          Preview preference for this tab. Destinations remain available through
          their direct links.
        </p>
      )}
      {message && (
        <p className="rail-edit-note" role="status">
          {message}
        </p>
      )}
    </nav>
  );
}
