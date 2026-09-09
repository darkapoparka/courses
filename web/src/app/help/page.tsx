import Link from "next/link";

const answers = [
  [
    "Are these real courses?",
    "No. Course titles, creators, prices, lesson outlines and account information are fictional samples for interface review. Photos illustrate subjects, not instructor identities.",
  ],
  [
    "Can I buy or enroll?",
    "No. There is no connected payment provider, enrollment service or real course access. Offer dialogs explain these limits without collecting payment details.",
  ],
  [
    "Where are my saved courses and notes?",
    "Preview saves, lists, notes, player positions and completion flags stay only in this browser tab. They are not private server records or authenticated accounts. Do not enter sensitive information.",
  ],
  [
    "What is the sample video?",
    "An original, silent 24-second teaching-interface clip with English captions and a public worksheet. The same clip is explicitly used to demonstrate every fictional course's player.",
  ],
  [
    "How do I test sign-in?",
    "Use a fictional email-shaped value, then the displayed sample code 000000. No email is sent and no identity is verified. Invalid and expired code states are available.",
  ],
  [
    "Does this reproduce every Apple Music feature?",
    "The reference guides visual hierarchy, browsing and interaction. Music-only radio, concerts, shuffle, subscription trials and Apple account integrations are not course features. The repository's reference ledger accounts for their scope.",
  ],
];
export default function HelpPage() {
  return (
    <div className="settings-page">
      <header>
        <h1>Help & preview information</h1>
        <p className="muted">What works here, and what does not.</p>
      </header>
      <div className="help-answers">
        {answers.map(([title, text]) => (
          <details key={title}>
            <summary>{title}</summary>
            <p>{text}</p>
          </details>
        ))}
      </div>
      <nav className="state-review"><Link href="/preview">Additional reference pattern studies</Link>
        <Link href="/browse">Browse courses</Link>
        <Link href="/settings">Account Settings</Link>
        <Link href="/auth/sign-in">Sign-in preview</Link>
      </nav>
    </div>
  );
}

export const metadata = { title: "Help" };
