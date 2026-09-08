# Reference clone QA ledger

## Source observation

- Collection URL opened in the authenticated Codex browser: pass.
- Mobbin collection count observed: `159 screens`.
- Mobbin flow count observed: `58 flows`.
- Visible named flows: `Onboarding` (10), `Starting a trial` (10), `New` (5).
- All 159 screen identifiers were collected by scrolling the lazy-loaded list to the end.
- Representative direct detail URLs at the beginning, middle, and end of the collected list rendered an Apple Music screen viewer.

## Local implementation

- Project folder: `J:\courses\apple-music-clone`.
- Stack: Next.js App Router, React, TypeScript, Tailwind CSS v4/PostCSS, locally owned CSS tokens and components.
- Fixture boundary: all data is deterministic and local. No payment, account creation, booking, external service, or real audio is wired.
- Every collected screen ID resolves to `/screen/<id>` and is mapped to a DOM-based Apple Music surface variant.
- Flow routes preserve URL state with `/flows/<flow>?step=<n>`, browser Back/Forward, Escape close, focus restoration, player/queue persistence, search state, and local modal transitions.

## Verification matrix

| Check | Status | Evidence / note |
| --- | --- | --- |
| Collection discovery | PASS | Authenticated browser; totals and IDs recorded above. |
| Local source typecheck | PASS | `pnpm typecheck` completed successfully after the final interaction patch. |
| Local production build | PASS | `pnpm build` completed successfully on Next.js 16.3.4. |
| Desktop render around 1440px | PASS | Browser screenshot inspected; Home shell, sidebar, rails, player, trial banner, direct screen and flow states rendered. |
| Mobile render around 390px | PASS | Browser screenshot inspected at 390×844; `scrollWidth === clientWidth` and the compact header/player/banner remained reachable. |
| Keyboard / Escape / focus return | PASS | Escape closes modal, context menu, and Up Next; modal focus returns to Try It Free; Back/Forward restores Home/New route state. |
| Axe accessibility audit | PASS / REVIEW | 0 violations; 1 incomplete color-contrast group remains for pseudo-element artwork backgrounds and the brand glyph. |
| Impeccable scan | REVIEW | Six intentional findings: reference-driven glass/halo treatments and the card-wall composition are recorded for review, not blockers. |
| All 159 exact visual comparisons | BLOCKED | Reference images are visible individually, but exact image-to-DOM comparison has not been completed for every ID. Generic fixture art remains an explicit mismatch. |
| All 58 flow comparisons | BLOCKED | Only three flow records are visible in the accessed view; the other 55 are counted but not inspectable as named flow records. |

## Acceptance boundary

This prototype is not a 1:1 acceptance claim yet. The source collection is fully inventoried and the accessible named flows are represented, but exact visual parity for all 159 screens remains open. The remaining work is screenshot-by-screenshot comparison and replacement of deterministic fixture art/content wherever the Mobbin reference differs.
