"use client";

import { useRef, useState, type FormEvent } from "react";
import { useMusic } from "./music-context";
import { Dialog, Glyph } from "./music-primitives";
import { CodeField } from "./music-code-field";

export function PasscodeDialog() {
  const m = useMusic();
  const step = m.scene.formStep ?? 0;
  const [digits, setDigits] = useState(m.scene.filled ? "1234" : "");
  const [email, setEmail] = useState("alexsmith@content-mobbin.com");
  const [error, setError] = useState("");
  const first = useRef("1234");
  const title = ["Set a passcode", "Re-enter your passcode", "Enter email address", "Passcode set"][Math.min(step, 3)]!;
  const close = () => m.patch({ overlay: null });
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setError("");
    if (step < 2 && !/^\d{4}$/.test(digits)) { setError("Enter a four-digit preview passcode."); return; }
    if (step === 0) { first.current = digits; setDigits(""); m.patch({ formStep: 1 }); }
    else if (step === 1) {
      if (digits !== first.current) { setError("The passcodes do not match. Try again."); return; }
      m.patch({ formStep: 2 });
    } else if (step === 2) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(email)) { setError("Enter a valid email address."); return; }
      m.setLibrary(data => ({ ...data, restrictions: true }));
      m.patch({ formStep: 3 });
    } else {
      m.setLibrary(data => ({ ...data, restrictions: true }));
      close();
      m.notify("Local content filter enabled. This is a UI preview, not a device-security passcode.");
    }
  };
  return <Dialog title={title} onClose={close} className={`account-scoped-dialog passcode-reference-dialog passcode-step-${step} ${step === 3 ? "passcode-success" : ""}`}>
    <form onSubmit={submit}>
      <div className="passcode-body">
        {step === 3 && <svg className="passcode-success-icon" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="46" /><path d="m29 52 16 19 26-41" /></svg>}
        <h2>{title}</h2>
        {step === 0 && <p>This passcode will be required when changing restriction settings.</p>}
        {step < 2 && <CodeField label={step === 0 ? "Preview passcode" : "Confirm preview passcode"} value={digits} onChange={setDigits} length={4} masked />}
        {step === 2 && <><p>Enter the email address to use if you forget your passcode.</p><label className="field-label"><span>Email</span><input type="email" aria-label="Preview recovery email" value={email} onChange={event => setEmail(event.target.value)} autoComplete="off" /></label><p className="field-help">A child with access to this email account will be able to change your passcode.</p></>}
        {error && <p className="form-error" role="alert">{error}</p>}
        {step === 3 && <button type="submit" className="passcode-done">Done</button>}
        <p className="reference-disclosure">Local reference preview. No Apple account or device settings are changed.</p>
      </div>
      {step < 3 && <div className="account-dialog-footer"><button type="submit" disabled={step < 2 ? digits.length !== 4 : !email} className="account-dialog-continue">Continue</button></div>}
    </form>
  </Dialog>;
}

export function CancellationDialog() {
  const m = useMusic();
  const done = m.scene.overlay === "cancelled";
  const close = () => m.patch({ overlay: null });
  const confirm = () => { m.setLibrary(data => ({ ...data, cancelled: true })); m.patch({ overlay: "cancelled" }); };
  return <Dialog title={done ? "Subscription cancellation preview" : "Confirm Cancellation"} onClose={close} hideClose className={done ? "cancel-result-dialog" : "cancel-reference-dialog"}>
    {done ? <><svg className="cancel-result-icon" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="20" /><path d="m14 24 8 8 13-17" /></svg><h2>You have successfully<br />cancelled<br />your subscription.</h2><button type="button" className="dialog-primary" onClick={() => { m.patch({ overlay: null, guest: true, cancelled: true }); m.notify("Only the local preview subscription changed. No external account was cancelled."); }}>Done</button><small className="reference-disclosure">Local preview only — no real cancellation.</small></> : <><Glyph name="apple" size={28} /><div className="cancel-reference-body"><div className="music-badge"><Glyph name="music" size={37} /></div><h2>Confirm Cancellation</h2><p>If you cancel, your service will end immediately,<br />including the remainder of your free trial. You<br />cannot reactivate this trial.</p><p className="reference-disclosure">This reproduces the reference dialog. Only local preview state is changed.</p></div><div className="account-dialog-footer"><button type="button" className="account-action" onClick={close}>Keep Subscription</button><button type="button" className="account-action" onClick={confirm}>Cancel Subscription</button></div></>}
  </Dialog>;
}
