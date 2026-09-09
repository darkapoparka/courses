"use client";

import { useId, useRef } from "react";

/** A real, pasteable single input with separate digit cells matching the source.
 * The text input owns keyboard selection, deletion and form semantics. */
export function CodeField({ label, value, onChange, length = 6, masked = false }: {
  label: string; value: string; onChange: (value: string) => void; length?: number; masked?: boolean;
}) {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  return <div className="code-field" onClick={() => input.current?.focus()}>
    <label className="sr-only" htmlFor={id}>{label}</label>
    <div className="code-cells" aria-hidden="true">{Array.from({ length }, (_, i) => <span key={i} data-filled={Boolean(value[i])}>{value[i] ? masked ? "•" : value[i] : ""}</span>)}</div>
    <input ref={input} id={id} type={masked ? "password" : "text"} inputMode="numeric" autoComplete="off" maxLength={length} pattern={`[0-9]{${length}}`} value={value} onChange={event => onChange(event.target.value.replace(/\D/g, "").slice(0, length))} aria-label={label} required />
  </div>;
}
