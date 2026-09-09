"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen, Check, X } from "lucide-react";

// Interface demonstration only. No email, credentials or identity is retained.
export function AuthPreview({
  verify = false,
  returnTo,
}: {
  verify?: boolean;
  returnTo: string;
}) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [complete, setComplete] = useState(false);
  const [expired, setExpired] = useState(false);
  return (
    <div className="auth-stage">
      <section className="auth-card" aria-labelledby="auth-title">
        <Link
          className="icon-button auth-close"
          href={returnTo}
          aria-label="Close sign-in preview"
        >
          <X />
        </Link>
        <span className="auth-symbol">
          <BookOpen />
        </span>
        <p className="eyebrow">INTERFACE PREVIEW · NO REAL AUTHENTICATION</p>
        <h1 id="auth-title">
          {complete
            ? "Verification screen preview"
            : verify
              ? "Enter the sample code"
              : "Continue with Email Address"}
        </h1>
        {complete ? (
          <>
            <span className="auth-complete">
              <Check />
            </span>
            <p>
              The sample code matched. No identity was verified, no account was
              created, and no session or course access was granted.
            </p>
            <Link className="primary-button" href={returnTo}>
              Return to the preview
            </Link>
          </>
        ) : (
          <>
            <p>
              {verify
                ? "No email was sent. Use 000000 to exercise the code-entry interface."
                : "See the sign-in flow without creating an account. Use fictional details; this form never sends an email."}
            </p>
            <form
              noValidate
              onSubmit={(event) => {
                event.preventDefault();
                const data = new FormData(event.currentTarget);
                if (!verify) {
                  const email = String(data.get("email") ?? "").trim();
                  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    setMessage(
                      "Enter an email-shaped sample, such as learner@example.test.",
                    );
                    return;
                  }
                  router.push(
                    `/auth/verify?returnTo=${encodeURIComponent(returnTo)}`,
                  );
                } else if (expired)
                  setMessage(
                    "This sample code is expired. Reset the code sample to continue.",
                  );
                else if (data.get("code") !== "000000")
                  setMessage(
                    "That does not match the sample code. Try 000000.",
                  );
                else {
                  setMessage("");
                  setComplete(true);
                }
              }}
            >
              <label className="field">
                {verify ? "Sample code" : "Email address"}
                <input
                  name={verify ? "code" : "email"}
                  type={verify ? "text" : "email"}
                  inputMode={verify ? "numeric" : "email"}
                  autoComplete="off"
                  maxLength={verify ? 6 : 254}
                  placeholder={verify ? "000000" : "learner@example.test"}
                  aria-describedby="auth-feedback"
                  aria-invalid={Boolean(message)}
                />
              </label>
              <p
                id="auth-feedback"
                className="validation-feedback"
                role="status"
              >
                {message}
              </p>
              <button className="primary-button">
                {verify ? "Check sample code" : "Preview code entry"}
              </button>
            </form>
            {verify && (
              <div className="auth-links">
                <Link
                  href={`/auth/sign-in?returnTo=${encodeURIComponent(returnTo)}`}
                >
                  Change email
                </Link>
                <button
                  onClick={() => {
                    setExpired(false);
                    setMessage(
                      "Sample reset. Use 000000. No new code was emailed.",
                    );
                  }}
                >
                  Reset code sample
                </button>
                <button
                  onClick={() => {
                    setExpired(true);
                    setMessage("Expired-code sample selected.");
                  }}
                >
                  Inspect expired state
                </button>
              </div>
            )}
          </>
        )}
        <p className="auth-disclaimer">
          Design preview only. Form values are not submitted, retained, or
          shared with a provider.
        </p>
      </section>
    </div>
  );
}
