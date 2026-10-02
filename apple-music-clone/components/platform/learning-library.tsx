"use client";
import type { Course } from "../../lib/platform/types";
import { catalogOptions, type CatalogOptions } from "../../lib/platform/search";
import { CatalogBrowser } from "./catalog-browser";
export function LearningLibrary({ courses, mode, options = catalogOptions({}) }: { courses: readonly Course[]; mode: "saved" | "started"; options?: CatalogOptions }) {
  return <CatalogBrowser courses={courses} mode={mode} options={options} />;
}
