"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useMusic } from "./music-context";
import { CodeField } from "./music-code-field";
import { Dialog, Glyph } from "./music-primitives";

const demoEmail = "alex@example.test";
const previewPassword = "reference-preview";
function PrivacyMark() { return <span className="privacy-mark" aria-hidden="true"><Glyph name="person" size={27} /><Glyph name="person" size={21} /></span>; }
function Notice() { return <small className="reference-disclosure">Local preview only · Use example.test, code 123456 and password reference-preview. No information is sent to Apple.</small>; }

/** The supplied sequence distinguishes email entry, account creation, a
 * six-cell code screen, email-code sign-in and password sign-in. None of these
 * local fixtures creates an account or contacts an authentication service. */
export function AuthenticationDialog() {
  const m = useMusic();
  const initial = useRef(m.scene);
  const [email, setEmail] = useState(m.scene.filled ? demoEmail : "");
  const [password, setPassword] = useState(m.scene.filled ? previewPassword : "");
  const [first, setFirst] = useState(m.scene.filled || m.scene.formStep ? "Alex" : "");
  const [last, setLast] = useState(m.scene.filled || m.scene.formStep ? "Smith" : "");
  const [birth, setBirth] = useState(m.scene.filled ? "1995-06-15" : "");
  const [updates, setUpdates] = useState(true);
  const [terms, setTerms] = useState(Boolean(m.scene.filled));
  const [code, setCode] = useState(m.scene.filled ? "123456" : "");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [pending, setPending] = useState(false);
  const scroll = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const type = m.scene.overlay;
  const signup = type === "signup";
  const codeEntry = type === "verify" && (m.scene.formStep ?? 0) < 2;
  const emailCode = codeEntry && m.scene.formStep === 1;
  const passwordEntry = type === "verify" && (m.scene.formStep ?? 0) >= 2;
  const heading = signup ? "Create your account" : passwordEntry ? "Enter Your Password" : emailCode ? "Check your email." : codeEntry ? "Enter Verification Code" : "Continue with Email Address";
  const finish = () => {
    m.patch({ overlay: null, page: "new", guest: false, checkout: false, namedProfile: true, formStep: 0 });
    window.history.replaceState({}, "", "/?view=new");
    m.notify("Local reference session opened. No Apple account was created or signed in.");
  };
  const completeCode = () => {
    if (code !== "123456") { setError("The local preview code is 123456. No email has been sent."); return; }
    setPending(true);
    timer.current = setTimeout(() => {
      if (emailCode) finish();
      else m.patch({ overlay: "payment", formStep: 0, filled: false, checkout: true, guest: true });
    }, 250);
  };
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  useEffect(() => {
    if (!signup || !scroll.current) return;
    const frame = requestAnimationFrame(() => { if (initial.current.formStep === 1) scroll.current!.scrollTop = 385; });
    return () => cancelAnimationFrame(frame);
  }, [signup]);
  const submit = (event: FormEvent) => {
    event.preventDefault(); setError("");
    if (signup) {
      if (!first.trim() || !last.trim() || !birth || !terms) {
        setError("Complete the preview profile and accept the local preview terms.");
        scroll.current?.scrollTo({ top: first && last ? 385 : 0 }); return;
      }
      m.patch({ overlay: "verify", formStep: 0, filled: false });
    } else if (passwordEntry) {
      if (password !== previewPassword) { setError("Use reference-preview. Real passwords are not accepted or transmitted."); return; }
      finish();
    } else if (codeEntry) completeCode();
    else {
      if (!/^[^\s@]+@example\.test$/i.test(email)) { setError("Use alex@example.test. Real email addresses are not accepted in this preview."); return; }
      m.patch({ overlay: "verify", formStep: 1, filled: false });
    }
  };
  const close = () => m.patch({ overlay: null, formStep: 0 });
  return <Dialog title={heading} onClose={close} className={`capture-auth ${signup ? "auth-signup" : passwordEntry ? "auth-password" : emailCode ? "auth-email-code" : codeEntry ? "auth-verification" : "auth-email"}`}>
    {(signup || codeEntry && !emailCode) && <span className="dialog-apple"><Glyph name="apple" size={28} /></span>}
    <form onSubmit={submit} autoComplete="off">
      {signup ? <><div className="auth-scroll" ref={scroll}><h2>{heading}</h2><p className="auth-subtitle">You’ll use this account for all Apple services.</p><div className="auth-profile-fields">
        <label className="capture-field"><span>Apple Account</span><input aria-label="Preview Apple Account" value={demoEmail} readOnly /></label><p className="capture-help">This email address will become your Apple Account.</p>
        <label className="capture-field placeholder-only"><span className="sr-only">Fixed preview password</span><input aria-label="Fixed preview password" type="password" readOnly value={initial.current.filled ? previewPassword : ""} placeholder="Password" /></label><p className="capture-help">Your password must have 8 or more characters, upper and lowercase letters and at least one number.</p>
        <label className={`capture-field ${first ? "" : "placeholder-only"}`}><span>First Name</span><input aria-label="First name" value={first} placeholder="First Name" maxLength={80} onChange={e => setFirst(e.target.value)} required /></label>
        <label className={`capture-field ${last ? "" : "placeholder-only"}`}><span>Last Name</span><input aria-label="Last name" value={last} placeholder="Last Name" maxLength={80} onChange={e => setLast(e.target.value)} required /></label>
        <label className="capture-field"><span>Date of Birth</span><input aria-label="Date of birth" type="date" value={birth} onChange={e => setBirth(e.target.value)} max="2026-09-09" required /></label>
        <label className="capture-field auth-country"><span>Country/Region</span><select aria-label="Country or region" defaultValue="Singapore"><option>Singapore</option><option>Bulgaria</option><option>United Kingdom</option><option>United States</option></select></label>
        <label className="auth-checkbox"><input type="checkbox" checked={updates} onChange={e => setUpdates(e.target.checked)} /><span>Apple Updates<small>Receive Apple emails and communications including new releases, exclusive content, special offers and marketing and recommendations for apps, music, movies, TV, books, podcasts, Apple Pay and more.</small></span></label>
        <label className="auth-checkbox"><input type="checkbox" checked={terms} onChange={e => setTerms(e.target.checked)} required /><span>Agree to Terms &amp; Conditions</span></label><p className="auth-terms">By selecting Continue, you agree to the <a href="https://www.apple.com/legal/internet-services/itunes/" target="_blank" rel="noreferrer">Apple Media Services Terms &amp; Conditions</a> and acknowledge that this will be used in this preview.</p>
        <Notice />{error && <p className="form-error" role="alert">{error}</p>}</div></div><div className="auth-footer"><button type="button" className="account-action" onClick={() => m.patch({ overlay: "signin" })}>Back</button><button type="submit" className="account-action filled">Continue</button></div></> : <>
        {emailCode ? <div className="check-email-icon"><Glyph name="mail" size={83} /><i /></div> : !codeEntry && <div className="music-badge"><Glyph name="song" size={40} /></div>}
        <h2>{heading}</h2>
        {passwordEntry ? <><p className="auth-subtitle">You have an Apple Account associated with this email address.</p><div className="password-fields"><label className="capture-field"><span>Email address</span><input aria-label="Preview email address" readOnly value={demoEmail} /></label><label className={`capture-field ${password ? "" : "placeholder-only"}`}><span>Password</span><input aria-label="Preview password" type={passwordVisible ? "text" : "password"} value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} autoComplete="off" /><button type="submit" aria-label="Continue with preview password" className="password-continue"><Glyph name="arrow-right" size={16} /></button></label></div><button type="button" className="password-forgot" onClick={() => { setPassword(previewPassword); setError(""); }}>Forgot password?</button><button type="button" className="sr-only" onClick={() => setPasswordVisible(!passwordVisible)}>Show or hide preview password</button><Notice /></> : codeEntry ? <>
          <p className="auth-code-caption">{emailCode ? <>Enter the code sent to {demoEmail}.</> : <>Enter the verification code sent to<br /><strong>{demoEmail}</strong></>}</p>
          <CodeField label="Verification code" value={code} onChange={value => { setCode(value); setError(""); }} />
          {pending ? <div className="verification-pending"><span className="spinner" />Verifying…</div> : <div className="auth-code-actions"><button type="button" onClick={() => m.notify("Preview code: 123456. No email has been sent.")}>{emailCode ? "Resend code" : "Request a New Code"}</button>{emailCode ? <button type="button" onClick={() => { m.patch({ formStep: 2, filled: false }); setPassword(""); }}>Sign in with password</button> : <><span>|</span><button type="button" onClick={() => m.notify("Use the local code 123456; no real account credentials are needed.")}>Get Help</button></>}</div>}
          <button type="submit" className="auth-code-submit" disabled={pending || code.length !== 6}>Continue</button><Notice />
        </> : <><p className="auth-subtitle">You can sign in if you already have an account, or we will help you<br className="desktop-break" /> create one.</p><label className="email-entry"><span className="sr-only">Email address</span><input type="email" aria-label="Email address" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} autoComplete="off" required /></label><div className="auth-privacy"><PrivacyMark /><p>Your Apple Account information is used to allow you to sign in securely and access your data. Apple records certain data for security, support and reporting purposes. If you agree, Apple may also use your Apple Account information to send you marketing emails and communications, including based on your use of Apple services.</p><button type="button" onClick={() => m.notify("Local reference preview: no sign-in data is transmitted or saved.")}>See how your data is managed…</button></div><button type="submit" className="auth-primary">Continue</button><button className="auth-create-link" type="button" onClick={() => m.patch({ overlay: "signup", formStep: 0, filled: false })}>Create a preview account</button><Notice /></>}
        {error && <p className="form-error" role="alert">{error}</p>}
      </>}
    </form>
  </Dialog>;
}

export function CheckoutDialog() {
  const m = useMusic();
  const initial = useRef(m.scene);
  const scroll = useRef<HTMLFormElement>(null);
  const [card, setCard] = useState(Boolean(m.scene.filled));
  const [street, setStreet] = useState(m.scene.filled ? "Preview address" : "");
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(m.scene.formStep === 3);
  const [error, setError] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const host = scroll.current;
      if (!host) return;
      const step = initial.current.formStep ?? 0;
      const id = step === 1 ? "checkout-billing" : step >= 2 ? "checkout-confirm" : "checkout-top";
      const target = host.querySelector<HTMLElement>(`#${id}`);
      if (target) host.scrollTop += target.getBoundingClientRect().top - host.getBoundingClientRect().top - (step === 1 ? 34 : step >= 2 ? 28 : 58) + (initial.current.scrollOffset ?? 0);
    });
    return () => { cancelAnimationFrame(frame); if (timer.current) clearTimeout(timer.current); };
  }, []);
  const submit = (event: FormEvent) => {
    event.preventDefault(); setError("");
    if (!card || !street.trim()) { setError("Use the test card and a preview address to inspect confirmation. No real card is accepted."); scroll.current?.scrollTo({ top: 0, behavior: "smooth" }); return; }
    setPending(true);
    timer.current = setTimeout(() => { setPending(false); setDone(true); m.patch({ checkout: false, guest: false, namedProfile: false }); m.setLibrary(l => ({ ...l, cancelled: false })); }, 450);
  };
  return <Dialog title="Payment Method" onClose={() => m.patch({ overlay: null, checkout: false, guest: false })} className="capture-checkout"><span className="dialog-apple"><Glyph name="apple" size={28} /></span><form onSubmit={submit} className="checkout-scroll" ref={scroll} autoComplete="off"><div className="checkout-column">
    <h2 id="checkout-top">Payment Method</h2><label className="capture-field"><span>Payment Type</span><select aria-label="Payment type" defaultValue="Credit / Debit Card"><option>Credit / Debit Card</option></select></label>
    <h3>Details</h3><label className="capture-field"><span>Card Number</span><input aria-label="Fixed test card number" readOnly value={card ? "4242 4242 4242 4242" : ""} placeholder="Required" onClick={() => setCard(true)} /></label><div className="checkout-two"><label className="capture-field"><span>Expiry Date</span><input aria-label="Test expiry date" readOnly value={card ? "01/2030" : ""} placeholder="MM/YYYY" onClick={() => setCard(true)} /></label><label className="capture-field"><span>CVV</span><input aria-label="Test security code" readOnly value={card ? "123" : ""} placeholder="Security code" onClick={() => setCard(true)} /></label></div><button type="button" className="checkout-test-card" onClick={() => setCard(true)}>Use test card</button>
    <h3 id="checkout-billing">Billing Address</h3><div className="checkout-two"><label className="capture-field"><span>First Name</span><input aria-label="Preview billing first name" readOnly value="Alex" /></label><label className="capture-field"><span>Last Name</span><input aria-label="Preview billing last name" readOnly value="Smith" /></label></div><label className="capture-field"><span>Street</span><input aria-label="Preview street address" value={street} placeholder="Required" onChange={e => setStreet(e.target.value)} maxLength={200} /></label><label className="capture-field"><span>Street</span><input aria-label="Optional preview address" placeholder="Optional" maxLength={200} /></label><label className="capture-field"><span>Postcode</span><input aria-label="Preview postcode" readOnly value="139953" /></label>
    <h3 className="checkout-confirm-heading" id="checkout-confirm">Confirm Subscription</h3><div className={`checkout-summary ${done ? "checkout-complete" : ""}`}><div className="checkout-plan"><span className="music-badge small"><Glyph name="song" size={29} /></span><span><strong>Individual</strong><small>Apple Music</small><small>Subscription</small></span></div><div className="checkout-price"><strong>1-Month Free Trial</strong><small>Starting today</small><strong>S$ 10.98 per month</strong><small>Starting 25 Jul 2026</small></div><p>No commitment. Cancel at any time in Settings at least one day before each renewal date. Plan automatically renews for S$ 10.98/month starting 25 Jul 2026 until cancelled.</p>{done && <span className="checkout-tick"><Glyph name="check" size={27} /></span>}</div><div className="checkout-privacy"><PrivacyMark /><p>Your searches, browsing, purchases and device trust score help improve the service and prevent fraud. If you subscribe, we also use your music library and what you play to personalise your experience and send you notifications. <button type="button" onClick={() => m.notify("No purchases, account information, or listening data are transmitted by this reference preview.")}>See how your data is managed…</button></p></div>
    {error && <p className="form-error" role="alert">{error}</p>}{done ? <button type="button" className="auth-primary" onClick={() => { m.patch({ overlay: null, checkout: false, guest: false, namedProfile: true, page: "new" }); window.history.replaceState({}, "", "/?view=new"); }}>Done</button> : <button type="submit" className="auth-primary" disabled={pending}>{pending ? "Previewing…" : "Confirm"}</button>}<button type="button" className="checkout-cancel" onClick={() => m.patch({ overlay: null, checkout: false, guest: false })}>Cancel</button><small className="reference-disclosure">Local reference only. No free trial, recurring charge, subscription or payment is created.</small>
  </div></form></Dialog>;
}
