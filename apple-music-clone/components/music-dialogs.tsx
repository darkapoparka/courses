"use client";

// These forms are local reference fixtures, not Apple authentication or billing.
// They deliberately accept only example.test identities and a fixed test card.
import { useEffect, useRef, useState, type FormEvent } from "react";
import { canonicalFlows, sourceIds } from "../lib/music-catalog";
import { useMusic } from "./music-context";
import { Dialog, Glyph, IconButton } from "./music-primitives";

function PreviewNote() { return <p className="preview-note">Local reference preview · Not affiliated with Apple. Do not enter real account or payment information.</p>; }
export function MusicDialogs() {
  const m = useMusic();
  const overlay = m.scene.overlay;
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState(m.scene.filled ? "alex@example.test" : "");
  const [code, setCode] = useState(m.scene.filled ? "123456" : "");
  const [name, setName] = useState(m.scene.filled ? "My Playlist" : "");
  const [description, setDescription] = useState(m.scene.filled && m.scene.formStep ? "Songs I love" : "");
  const [firstName, setFirstName] = useState(m.scene.filled ? "Alex" : "");
  const [lastName, setLastName] = useState(m.scene.filled ? "Smith" : "");
  const [birthday, setBirthday] = useState(m.scene.filled ? "1995-06-15" : "");
  const [accepted, setAccepted] = useState(Boolean(m.scene.filled));
  const [updates, setUpdates] = useState(true);
  const [pin, setPin] = useState(m.scene.filled ? "1234" : "");
  const [confirmPin, setConfirmPin] = useState("");
  const pinEntry = useRef("");
  const [month, setMonth] = useState(m.scene.formStep ? 6 : 5);
  const [start, setStart] = useState<number | null>(m.scene.filled ? 1 : null);
  const [end, setEnd] = useState<number | null>(m.scene.filled ? 12 : null);
  const [referenceFilter, setReferenceFilter] = useState("");
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const scroll = useRef<HTMLDivElement>(null);
  const close = () => m.patch({ overlay: null });
  const step = m.scene.formStep ?? 0;
  useEffect(() => { if (m.scene.scrollOffset) scroll.current?.scrollTo({ top: m.scene.scrollOffset }); }, [m.scene.scrollOffset]);
  if (!overlay) return null;
  const validEmail = () => /^[^\s@]+@example\.test$/i.test(email);
  const fail = (message: string) => { setError(message); return false; };
  const advance = (next: number) => { setError(""); m.patch({ formStep: next }); scroll.current?.scrollTo({ top: 0 }); };
  const finish = () => { m.patch({ guest: false, namedProfile: true, overlay: null, formStep: 0, page: "home" }); m.notify("Local preview opened. No Apple account or subscription was created."); };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setError("");
    if (overlay === "signin") {
      if (!validEmail()) return fail("Use a preview address such as alex@example.test. Real email addresses are not accepted.");
      m.patch({ overlay: "verify", formStep: 1, filled: false }); setCode("");
    } else if (overlay === "signup") {
      if (!step) { if (!firstName.trim() || !lastName.trim()) return fail("Enter a first and last name for this preview."); advance(1); }
      else { if (!birthday || !accepted) return fail("Select a date of birth and accept the preview terms to continue."); m.patch({ overlay: "verify", formStep: 0, filled: false }); setCode(""); }
    } else if (overlay === "verify") {
      if (code !== "123456") return fail("The local preview code is 123456. No email has been sent.");
      if (step > 0) finish(); else m.patch({ overlay: "payment", formStep: 0, filled: false });
    } else if (overlay === "payment") {
      if (step === 0) advance(1);
      else if (step === 1) { if (!accepted) return fail("Confirm that this is a local preview with no real charge."); advance(2); }
      else if (step === 2) advance(3);
      else { m.setLibrary(data => ({ ...data, cancelled: false })); finish(); }
    } else if (overlay === "new-playlist") {
      if (!name.trim()) return fail("Enter a playlist name.");
      const id = crypto.randomUUID();
      m.setLibrary(data => ({ ...data, playlists: [...data.playlists, { id, name: name.trim().slice(0, 100), description: description.trim().slice(0, 1000), public: false, tracks: [m.menuTrack.id] }] }));
      close(); m.notify(`Created ${name.trim()} and added ${m.menuTrack.title}.`);
    } else if (overlay === "passcode") {
      if (step === 0) { if (!/^\d{4}$/.test(pin)) return fail("Enter four digits for the local preview."); pinEntry.current = pin; setConfirmPin(""); advance(1); }
      else if (step === 1) { if (confirmPin !== (pinEntry.current || "1234")) return fail("The passcodes do not match. Try again."); advance(2); }
      else if (step === 2) { if (!validEmail()) return fail("Use alex@example.test for the recovery preview."); advance(3); }
      else { m.setLibrary(data => ({ ...data, restrictions: true })); close(); m.notify("Clean-content filtering enabled for the local preview. This is not a security boundary."); }
    }
  };
  let title = "Reference preview";
  let content;
  let className = "";
  if (overlay === "signin") {
    title = "Continue with Email Address"; className = "signin-dialog";
    content = <form onSubmit={submit}><div className="music-badge"><Glyph name="music" size={38} /></div><h2>{title}</h2><p className="dialog-intro">You can sign in if you already have an account, or we will help you create one.</p><label className="field-label"><span>Email address</span><input type="email" aria-label="Email address" placeholder="Email address" autoComplete="off" value={email} onChange={event => setEmail(event.target.value)} required /></label><div className="privacy-message"><Glyph name="person" size={25} /><p>This reproduction runs locally. Use <strong>alex@example.test</strong> to inspect the sign-in journey. Your entries are not sent to Apple or to an authentication provider.</p><button type="button" className="text-accent" onClick={() => { m.patch({ overlay: "signup", formStep: 0 }); setFirstName(""); setLastName(""); }}>Create a preview account</button></div><PreviewNote />{error && <p role="alert" className="form-error">{error}</p>}<button type="submit" className="dialog-primary">Continue</button></form>;
  } else if (overlay === "signup") {
    title = "Create your account"; className = "wizard-dialog";
    content = <form onSubmit={submit}><div ref={scroll} className="dialog-scroll"><h2>{title}</h2><p className="dialog-subtitle">Use a local preview profile. No account will be registered.</p>{!step ? <><label className="field-label"><span>Email</span><input value="alex@example.test" readOnly aria-label="Preview email" /></label><p className="field-help">This test address is not used to send email.</p><label className="field-label"><span>Password</span><input type="password" value="reference-preview-only" readOnly aria-label="Fixed preview password" autoComplete="off" /></label><p className="field-help">A fixed non-secret value is used in this UI fixture.</p><label className="field-label"><span>First name</span><input placeholder="First Name" value={firstName} onChange={event => setFirstName(event.target.value)} maxLength={80} required /></label><label className="field-label"><span>Last name</span><input placeholder="Last Name" value={lastName} onChange={event => setLastName(event.target.value)} maxLength={80} required /></label></> : <><label className="field-label"><span>Last name</span><input value={lastName || "Smith"} onChange={event => setLastName(event.target.value)} aria-label="Last name" /></label><label className="field-label"><span>Date of birth</span><input type="date" value={birthday} onChange={event => setBirthday(event.target.value)} max="2026-09-09" required /></label><label className="field-label"><span>Country / Region</span><select aria-label="Country or region" defaultValue="Singapore"><option>Singapore</option><option>Bulgaria</option><option>United Kingdom</option><option>United States</option></select></label><label className="check-field"><input type="checkbox" checked={updates} onChange={event => setUpdates(event.target.checked)} /><span>Apple Updates<small>Visual reference only. This does not subscribe you to email.</small></span></label><label className="check-field"><input type="checkbox" checked={accepted} onChange={event => setAccepted(event.target.checked)} required /><span>Agree to Preview Terms<small>No real Apple account is created, and no information is transmitted.</small></span></label></>}<PreviewNote />{error && <p role="alert" className="form-error">{error}</p>}</div><div className="wizard-footer"><button type="button" className="pill outline" onClick={() => step ? advance(0) : m.patch({ overlay: "signin" })}>Back</button><button type="submit" className="pill primary">Continue</button></div></form>;
  } else if (overlay === "verify") {
    title = step > 1 ? "Trust this browser?" : "Enter Verification Code"; className = "verification-dialog";
    content = <form onSubmit={submit}><h2>{title}</h2><p>Use the local verification code <strong>123456</strong>.</p><p className="field-help">No verification email has been sent.</p><input className="verification-code" aria-label="Verification code" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} value={code} onChange={event => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))} autoComplete="off" required /><div className="verification-actions"><button type="button" onClick={() => m.notify("The local preview code is 123456. No email is sent.")}>Request a New Code</button><span>|</span><button type="button" onClick={() => m.patch({ overlay: "signin", formStep: 0 })}>Go Back</button></div>{error && <p role="alert" className="form-error">{error}</p>}<button type="submit" className="dialog-primary">Continue</button><PreviewNote /></form>;
  } else if (overlay === "payment") {
    title = step < 2 ? "Payment Method" : step === 2 ? "Confirm Subscription" : "You’re All Set"; className = "payment-dialog wizard-dialog";
    content = <form onSubmit={submit}><div className="dialog-scroll" ref={scroll}>{step === 0 ? <><h2>{title}</h2><label className="field-label"><span>Payment Type</span><select aria-label="Payment type" defaultValue="Credit / Debit Card"><option>Credit / Debit Card</option></select></label><h3>Details</h3><label className="field-label"><span>Card Number</span><input aria-label="Fixed test card number" readOnly value={m.scene.filled ? "4242 4242 4242 4242" : ""} placeholder="Card Number" /></label><div className="field-row"><label className="field-label"><span>Expiry Date</span><input aria-label="Fixed test expiry date" readOnly value={m.scene.filled ? "12/30" : ""} placeholder="MM/YYYY" /></label><label className="field-label"><span>CVV</span><input aria-label="Fixed test security code" readOnly value={m.scene.filled ? "123" : ""} placeholder="Security Code" /></label></div><button type="button" className="text-accent" onClick={() => m.patch({ filled: true })}>Use test card</button><h3>Billing Address</h3><div className="field-row"><label className="field-label"><span>First Name</span><input readOnly value="Alex" aria-label="Preview billing first name" /></label><label className="field-label"><span>Last Name</span><input readOnly value="Smith" aria-label="Preview billing last name" /></label></div></> : step === 1 ? <><h3>Billing Address</h3>{["Alex Smith", "Preview address", "Singapore", "000000"].map((value, index) => <label className="field-label" key={value}><span>{["Name", "Street", "City", "Postcode"][index]}</span><input aria-label={`Preview ${["name", "street", "city", "postcode"][index]}`} readOnly value={value} /></label>)}<h2>Confirm Subscription</h2><div className="subscription-summary"><span className="music-badge small"><Glyph name="music" /></span><div><strong>Individual</strong><span>Apple Music</span><small>Local reference state</small></div></div><h3>1-Month Free Trial</h3><p>No real free trial is started. This only changes the local preview state.</p><label className="check-field"><input type="checkbox" checked={accepted} onChange={event => setAccepted(event.target.checked)} required /><span>I understand that this is a preview and no charge will be made.</span></label></> : step === 2 ? <><h2>{title}</h2><div className="subscription-summary"><span className="music-badge"><Glyph name="music" /></span><div><strong>Individual</strong><span>Apple Music</span></div></div><p>Preview the subscribed interface using the saved catalog.</p><p>There is no payment processing or connection to Apple’s subscription service.</p></> : <><div className="music-badge"><Glyph name="check" size={38} /></div><h2>{title}</h2><p>The reference UI is ready to explore.</p><p>No account, payment, or subscription was created.</p></>}<PreviewNote />{error && <p role="alert" className="form-error">{error}</p>}</div><div className="wizard-footer">{step > 0 && step < 3 && <button type="button" className="pill outline" onClick={() => advance(step - 1)}>Back</button>}<button type="submit" className="pill primary">{step === 3 ? "Start Listening" : step === 2 ? "Open Subscription Preview" : "Continue"}</button></div></form>;
  } else if (overlay === "new-playlist") {
    title = "New Playlist"; className = "playlist-dialog";
    content = <form onSubmit={submit}><h2>{title}</h2><div className="new-playlist-art"><Glyph name="playlist" size={80} /></div><label className="field-label"><span>Name</span><input aria-label="Playlist name" placeholder="Playlist Name" value={name} onChange={event => setName(event.target.value)} maxLength={100} required /></label><label className="field-label"><span>Description</span><textarea aria-label="Playlist description" placeholder="Description" value={description} onChange={event => setDescription(event.target.value)} maxLength={1000} rows={3} /></label><p className="field-help">Saved in this browser only. Sharing a public playlist requires a backend that is not connected to this preview.</p>{error && <p className="form-error" role="alert">{error}</p>}<button className="dialog-primary" type="submit">Create</button></form>;
  } else if (overlay === "media") {
    title = "Play local media"; className = "media-dialog";
    content = <><div className="music-badge"><Glyph name="headphones" size={34} /></div><h2>{title}</h2><p>The archive contains screenshots, not playable music recordings. Choose a file you own to use the player’s play, pause, seek, volume, repeat, and queue controls.</p><label className="file-picker"><span>{busy ? "Opening media…" : "Choose an audio or video file"}</span><input type="file" accept="audio/*,video/*,.flac,.m4a,.ogg" aria-label="Choose local media" disabled={busy} onChange={async event => { const file = event.target.files?.[0]; if (!file) return; setBusy(true); setError(""); try { await m.loadMedia(file); } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not open this media file."); } finally { setBusy(false); } }} /></label>{error && <p className="form-error" role="alert">{error}</p>}<p className="field-help">Files stay on your device and are never uploaded. Maximum file size: 250 MB.</p></>;
  } else if (overlay === "dates") {
    title = "Dates"; className = "dates-dialog";
    const firstWeekday = new Date(Date.UTC(2026, month, 1)).getUTCDay(); const days = new Date(Date.UTC(2026, month + 1, 0)).getUTCDate();
    content = <><h2>{title}</h2><div className="calendar-heading"><IconButton icon="back" label="Previous month" disabled={month === 0} onClick={() => { setMonth(value => value - 1); setStart(null); setEnd(null); }} /><strong>{new Intl.DateTimeFormat("en", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(2026, month, 1)))}</strong><IconButton icon="chevron" label="Next month" disabled={month === 11} onClick={() => { setMonth(value => value + 1); setStart(null); setEnd(null); }} /></div><div className="calendar-grid">{["S", "M", "T", "W", "T", "F", "S"].map((day, index) => <span className="weekday" key={index}>{day}</span>)}{Array.from({ length: firstWeekday }, (_, index) => <span key={`blank-${index}`} />)}{Array.from({ length: days }, (_, index) => index + 1).map(day => <button type="button" key={day} aria-label={`Select ${day} ${month === 5 ? "June" : month === 6 ? "July" : month + 1}`} aria-pressed={start !== null && day >= start && day <= (end ?? start)} onClick={() => { if (start === null || end !== null || day < start) { setStart(day); setEnd(null); } else setEnd(day); }}>{day}</button>)}</div><button type="button" className="dialog-primary" disabled={start === null} onClick={() => { const label = new Intl.DateTimeFormat("en", { month: "short", timeZone: "UTC" }).format(new Date(Date.UTC(2026, month, 1))); m.patch({ dateRange: `${label} ${start}${end !== null ? `–${end}` : ""}`, overlay: null }); }}>Show Concerts</button><button type="button" className="text-accent" onClick={() => { setStart(null); setEnd(null); m.patch({ dateRange: undefined }); }}>Clear Dates</button></>;
  } else if (overlay === "passcode") {
    title = step === 0 ? "Set a Passcode" : step === 1 ? "Re-enter Passcode" : step === 2 ? "Add a Recovery Email" : "Recovery Email Added"; className = "passcode-dialog";
    content = <form onSubmit={submit}><h2>{title}</h2><p>{step < 2 ? "Use a four-digit code to explore the parental-control setup." : step === 2 ? "Use alex@example.test for this reference step." : "The local clean-content setting is ready."}</p>{step < 2 ? <input className="verification-code" aria-label={step === 0 ? "Preview passcode" : "Confirm preview passcode"} type="password" autoComplete="off" inputMode="numeric" maxLength={4} pattern="[0-9]{4}" value={step === 0 ? pin : confirmPin} onChange={event => step === 0 ? setPin(event.target.value.replace(/\D/g, "")) : setConfirmPin(event.target.value.replace(/\D/g, ""))} required /> : step === 2 ? <input type="email" className="recovery-email" aria-label="Preview recovery email" placeholder="alex@example.test" value={email} onChange={event => setEmail(event.target.value)} required /> : <Glyph name="check" size={42} />}{error && <p role="alert" className="form-error">{error}</p>}<button type="submit" className="dialog-primary">{step === 3 ? "Done" : "Continue"}</button><p className="field-help">Local UI preview only. This passcode is not stored and is not a security or access-control boundary.</p></form>;
  } else if (overlay === "cancel-trial" || overlay === "cancelled") {
    title = overlay === "cancel-trial" ? "Cancel Free Trial?" : "Subscription Cancelled"; className = "confirmation-dialog";
    content = <><h2>{title}</h2><p>{overlay === "cancel-trial" ? "This changes only the reference preview. No real Apple Music subscription will be cancelled." : "The local preview is now in its cancelled state. No external account was changed."}</p><button type="button" className="dialog-primary" onClick={() => { if (overlay === "cancel-trial") { m.setLibrary(data => ({ ...data, cancelled: true })); m.patch({ overlay: "cancelled" }); } else close(); }}>{overlay === "cancel-trial" ? "Confirm Cancellation" : "Done"}</button>{overlay === "cancel-trial" && <button type="button" className="text-accent" onClick={close}>Keep Trial</button>}</>;
  } else if (overlay === "article") {
    title = "About this album"; className = "article-dialog";
    content = <div className="dialog-scroll" ref={scroll}><h2>you seem pretty sad for a girl so in love</h2><h3>Olivia Rodrigo</h3><p>A pop savant raises her game and her standards on her third album.</p><p>This reference uses the album’s cover, release information, and track-list layout captured in the saved screens. Open the song menu to add tracks to your local library, create a playlist, or arrange the playback queue.</p><p>The full editorial essay is not bundled with this reconstruction. This is a deliberate content limitation, not a claim that the description has been reproduced in full.</p><button type="button" className="pill primary" onClick={close}>Done</button></div>;
  } else {
    title = "Reference screens and flows"; className = "reference-dialog";
    content = <><h2>{title}</h2><p>159 source states · 58 recorded flows · 218 ordered steps. A mapped state is not a claim of verified visual parity.</p><input className="reference-search" aria-label="Filter reference flows" placeholder="Find a flow" value={referenceFilter} onChange={event => setReferenceFilter(event.target.value)} /><div className="reference-flow-grid">{canonicalFlows.filter(flow => flow.name.toLowerCase().includes(referenceFilter.toLowerCase())).map(flow => <div key={flow.id}><a href={`/flows/${flow.slug}`}>{flow.name}</a><span>{flow.steps.length} steps</span><div>{flow.steps.map((item, index) => <a href={`/flows/${flow.slug}?step=${index}`} title={item.screenId} key={`${item.screenId}-${index}`}>{index + 1}</a>)}</div></div>)}</div><details className="reference-source-picker"><summary>Inspect an original image (comparison only)</summary><select aria-label="Source image" value={selectedSource ?? ""} onChange={event => setSelectedSource(event.target.value || null)}><option value="">Choose a source</option>{sourceIds.map(id => <option value={id} key={id}>{id}</option>)}</select>{selectedSource && <img src={`/reference-assets/${selectedSource}`} alt={`Original reference ${selectedSource}; not the application implementation`} />}</details></>;
  }
  return <Dialog title={title} onClose={close} className={className}>{content}</Dialog>;
}
