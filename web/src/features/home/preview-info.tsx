"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Info, X, ArrowUpRight } from "lucide-react";
import type { SampleView } from "./fixtures";

export function PreviewInfo({ sample }: { sample: SampleView }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="icon-button preview-info"
          aria-label="About this preview"
        >
          <Info aria-hidden="true" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow">COURSES / UI-001</p>
              <Dialog.Title>A first look, not a live marketplace.</Dialog.Title>
            </div>
            <Dialog.Close asChild>
              <button
                className="icon-button"
                type="button"
                aria-label="Close preview information"
              >
                <X aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Description>
            Courses, creator names, USD prices and progress are fictional
            samples. No accounts, purchases or learning progress are created or
            saved.
          </Dialog.Description>
          <p>
            Home is the only available destination. Course details, lessons,
            search, your library and account will follow in separate slices.
          </p>
          <div className="preview-states">
            <h3>Review a Home state</h3>
            <a href={`/?sample=${sample}`}>
              Populated Home
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a href={`/?sample=${sample}&state=empty`}>
              Empty catalog
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a href={`/?sample=${sample}&state=loading`}>
              Slow loading (2 seconds)
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a href={`/?sample=${sample}&state=error`}>
              Simulated load failure
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
          <p className="asset-note">
            Original illustrated covers for this preview. Photography: Ivan
            Pergasi and Ricardo Gomez Angel / Unsplash. Pictured subjects are
            not the fictional instructors.
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
