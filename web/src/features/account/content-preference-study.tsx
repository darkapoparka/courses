"use client";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { courses } from "@/features/catalog/catalog";
import { CatalogCard } from "@/features/catalog/catalog-card";

// Visual setting / passcode-state study only. Never used for security or real content authorization.
export function ContentPreferenceStudy() {
  const [enabled, setEnabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"entry" | "confirm">("entry");
  const [error, setError] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [digits, setDigits] = useState(["", "", "", ""]);
  function begin() {
    setStep("entry");
    setDigits(["", "", "", ""]);
    setError("");
    setOpen(true);
  }
  const selected = courses
    .filter(
      (course) => !enabled || level === "Any level" || course.level === level,
    )
    .slice(0, 6);
  return (
    <div className="settings-page">
      <header>
        <h1>Content preference study</h1>
        <p className="muted">
          A reference settings-flow demonstration, not parental controls or a
          security boundary.
        </p>
      </header>
      <section className="settings-section">
        <h2>Learning preferences</h2>
        <div>
          <h3>Limit this example selection</h3>
          <p>
            This switch filters the sample cards below only. It cannot protect
            minors, block content elsewhere, or restrict an account.
          </p>
          <button
            className="toggle-switch"
            role="switch"
            aria-label="Limit example selection"
            aria-checked={enabled}
            onClick={begin}
          >
            <span />
          </button>
          <label className="field">
            Example level
            <select
              value={level}
              onChange={(event) => setLevel(event.target.value)}
              disabled={!enabled}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Any level</option>
            </select>
          </label>
          <p className="muted">
            Use the published sample code 0000 to inspect entry, confirmation
            and error states. Never enter a real passcode.
          </p>
        </div>
      </section>
      <section>
        <h2>Example result</h2>
        <div className="catalog-grid preference-result">
          {selected.map((course) => (
            <CatalogCard key={course.id} course={course} />
          ))}
        </div>
      </section>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content className="dialog-content flow-dialog passcode-study">
            <Dialog.Close asChild>
              <button
                className="icon-button dialog-close"
                aria-label="Close code demonstration"
              >
                <X />
              </button>
            </Dialog.Close>
            <Dialog.Title>
              {enabled
                ? "Disable the example filter"
                : step === "confirm"
                  ? "Confirm the sample code"
                  : "Enter the published sample code"}
            </Dialog.Title>
            <Dialog.Description>
              Use 0000. This is a UI demonstration, not identity verification or
              a protective passcode.
            </Dialog.Description>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (digits.join("") !== "0000") {
                  setError(
                    "Use the published UI sample code 0000. No real credential is checked.",
                  );
                  return;
                }
                if (!enabled && step === "entry") {
                  setStep("confirm");
                  setDigits(["", "", "", ""]);
                  setError("");
                } else {
                  setEnabled(!enabled);
                  setOpen(false);
                }
              }}
            >
              <fieldset>
                <legend>Four-digit sample code</legend>
                <div className="code-boxes">
                  {digits.map((digit, index) => (
                    <input
                      key={`${step}-${index}`}
                      aria-label={`Sample digit ${index + 1}`}
                      inputMode="numeric"
                      autoComplete="off"
                      maxLength={1}
                      value={digit}
                      onChange={(event) => {
                        const value = event.target.value
                          .replace(/\D/g, "")
                          .slice(-1);
                        setDigits(
                          digits.map((item, position) =>
                            position === index ? value : item,
                          ),
                        );
                        if (value)
                          (
                            event.target
                              .nextElementSibling as HTMLInputElement | null
                          )?.focus();
                      }}
                    />
                  ))}
                </div>
              </fieldset>
              <p className="validation-feedback" role="status">
                {error}
              </p>
              <button
                className="primary-button"
                disabled={digits.some((digit) => !digit)}
              >
                {step === "entry" && !enabled
                  ? "Continue demonstration"
                  : "Apply example filter"}
              </button>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
