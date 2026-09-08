"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ShelfProps = {
  title: string;
  children: ReactNode;
  variant?: "course" | "editorial";
};

export function ContentShelf({
  title,
  children,
  variant = "course",
}: ShelfProps) {
  const id = useId();
  const list = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ previous: false, next: false });

  function measure() {
    const element = list.current;
    if (!element) return;
    const previous = element.scrollLeft > 2;
    const next =
      element.scrollLeft + element.clientWidth < element.scrollWidth - 2;
    setEdges((current) =>
      current.previous === previous && current.next === next
        ? current
        : { previous, next },
    );
  }

  useEffect(() => {
    const element = list.current;
    if (!element) return;
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  function scroll(direction: number) {
    const element = list.current;
    if (!element) return;
    element.scrollBy({
      left: direction * element.clientWidth * 0.85,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  return (
    <>
      <div className="section-heading">
        <h2 id={`${id}-heading`}>{title}</h2>
        <div className="shelf-controls" aria-label={`${title} controls`}>
          <button
            className="icon-button"
            type="button"
            aria-controls={id}
            aria-label={`Previous ${title.toLowerCase()}`}
            disabled={!edges.previous}
            onClick={() => scroll(-1)}
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <button
            className="icon-button"
            type="button"
            aria-controls={id}
            aria-label={`Next ${title.toLowerCase()}`}
            disabled={!edges.next}
            onClick={() => scroll(1)}
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>
      <ul
        id={id}
        ref={list}
        className={`content-shelf ${variant}-shelf`}
        tabIndex={0}
        aria-labelledby={`${id}-heading`}
        onScroll={measure}
        onKeyDown={(event) => {
          if (
            event.target === event.currentTarget &&
            (event.key === "ArrowLeft" || event.key === "ArrowRight")
          ) {
            event.preventDefault();
            scroll(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
      >
        {children}
      </ul>
    </>
  );
}
