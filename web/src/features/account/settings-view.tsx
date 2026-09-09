"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, UserRound } from "lucide-react";
import { Disclosure } from "@/components/ui/disclosure";
import {
  usePreviewValue,
  writePreview,
} from "@/features/catalog/preview-storage";

export function SettingsView() {
  const name = usePreviewValue("profile-name") || "Alex, sample learner";
  const captions = usePreviewValue("captions") !== "off";
  const [feedback, setFeedback] = useState("");
  return (
    <div className="settings-page">
      <header>
        <h1>Account Settings</h1>
        <p className="muted">
          Fictional account preview · no signed-in identity
        </p>
      </header>
      <section className="settings-section">
        <h2>Account Summary</h2>
        <div>
          <div className="profile-summary">
            <span className="account-avatar">
              <UserRound />
            </span>
            <div>
              <h3>{name}</h3>
              <p>learner@example.test</p>
              <Disclosure
                title="Edit sample profile"
                description="This name is kept only in the current browser tab. It does not edit a real account."
                trigger="Edit sample profile"
              >
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    const value = String(
                      new FormData(event.currentTarget).get("name") ?? "",
                    ).trim();
                    if (!value) return;
                    setFeedback(
                      writePreview("profile-name", value)
                        ? "Profile name changed in this tab only."
                        : "Storage is blocked. No change was saved.",
                    );
                  }}
                >
                  <label className="field">
                    Display name
                    <input
                      name="name"
                      required
                      maxLength={80}
                      defaultValue={name}
                    />
                  </label>
                  <button className="primary-button">Apply in this tab</button>
                  <p role="status" className="action-feedback">
                    {feedback}
                  </p>
                </form>
              </Disclosure>
            </div>
          </div>
          <div className="account-columns">
            <div>
              <h3>Payment methods</h3>
              <p>None connected</p>
              <Disclosure
                title="Payments are not connected"
                description="This local preview cannot collect payment details or charge you."
                trigger="About payments"
              >
                <p>
                  Hosted checkout and verified seller terms belong to the later
                  commerce integration. Do not enter card or billing details
                  here.
                </p>
              </Disclosure>
            </div>
            <div>
              <h3>Purchases</h3>
              <p>No real transactions</p>
              <Link className="text-link" href="/settings/purchases">
                Purchase history
              </Link>
            </div>
            <div>
              <h3>Region / currency</h3>
              <p>Example USD prices</p>
              <p>Markets not finalized</p>
            </div>
          </div>
        </div>
      </section>
      <section className="settings-section">
        <h2>Account Access</h2>
        <div>
          <h3>Sign-in interface</h3>
          <p>
            Exercise email, verification, error and expired-code states. No
            email or account service is connected.
          </p>
          <Link className="text-link" href="/auth/sign-in?returnTo=/settings">
            Open sign-in preview <ArrowUpRight size={14} />
          </Link>
          <Disclosure
            title="Connected accounts"
            description="There are no real accounts or services connected to this preview."
            trigger="Connected accounts"
          >
            <p>
              Provider linking, token revocation and account security settings
              remain unavailable until identity integration is assigned.
            </p>
            <button disabled className="secondary-button">
              Connect provider · unavailable
            </button>
          </Disclosure>
        </div>
      </section>
      <section className="settings-section">
        <h2>Learning Preferences</h2>
        <div>
          <div className="preference-row">
            <div>
              <h3>Captions by default</h3>
              <p>Applied to the sample lesson video in this tab.</p>
            </div>
            <button
              className="toggle-switch"
              role="switch"
              aria-checked={captions}
              aria-label="Captions by default"
              onClick={() =>
                setFeedback(
                  writePreview("captions", captions ? "off" : "on")
                    ? "Caption preference changed for this tab."
                    : "Storage is unavailable.",
                )
              }
            >
              <span />
            </button>
          </div>
          <div className="preference-row">
            <div>
              <h3>Interface language</h3>
              <p>English is the implemented preview language.</p>
            </div>
            <Disclosure
              title="Language"
              description="Only English has been implemented and verified in this preview."
              trigger="English"
            >
              <label className="field">
                Interface language
                <select defaultValue="en">
                  <option value="en">English</option>
                  <option disabled>More languages · not available</option>
                </select>
              </label>
            </Disclosure>
          </div>
          <p role="status" className="action-feedback">
            {feedback}
          </p>
        </div>
      </section>
      <section className="settings-section">
        <h2>Preview Data</h2>
        <div>
          <h3>Only in this browser tab</h3>
          <p>
            Saved courses, learning lists, notes, completion flags and player
            positions use a preview-only browser storage namespace. They never
            establish authentication or course access.
          </p>
          <p>
            Closing this browser tab discards its preview state. Real accounts
            and other applications are untouched.
          </p>
          <Link className="text-link" href="/?sample=visitor">
            Return to visitor Home
          </Link>
        </div>
      </section>
      <Link className="text-link" href="/preview/content">
        Inspect content-preference layout
      </Link>
      <Link className="text-link" href="/preview">
        Additional reference UI studies
      </Link>
      <Link className="text-link" href="/help">
        Help & preview limitations
      </Link>
    </div>
  );
}
