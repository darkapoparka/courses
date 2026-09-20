# Signup control chrome — verified progress

Parent: `32ea2e1089a7a28622885c05ce914703d0c89f6a`. Checkout: `J:\courses`; branch: `main`.

## Implemented

`app/capture-auth.css` now gives signup inputs/selects source-supported 13px corners, neutral editable borders and lighter readonly-email borders. The native country select keeps its semantics, focus and selection behavior while a pointer-transparent CSS chevron replaces the platform arrow and the value returns to the recorded left inset. Native checkboxes use the observed blue accent. No input text or UI pixels were pasted into an image.

`signup-field-chrome` is registered in the existing auth suite and full runner. It checks all four signup frames, corners, native select appearance and pointer-transparent arrow; exercises available country choices, focus and checkbox round trips without submitting an account request. The focused run passed thirteen cases and fourteen desktop captures.

## Exact optimized verification

Build `Rb2nQZf5zZtyItM1k47jY`: 159 desktop states, five responsive states, 218 route checks and 98 interaction tests, zero failures. All 159 exact-size comparisons completed.
Implementation SHA-256 `b35ad50e6ba3471b1a9925b3812afc9f103add892604ddf7cf38046ff4e42886`; QA SHA-256 `8519f4528f46098e02ad5a162bd1ffa3effb02ea13faa63e7652b7f193babc52`; both stable across capture.
Mean MAE 4.950875687 -> 4.950121100; over-20 4.990549245% -> 4.989293632%.
Evidence: `J:\courses\apple-music-clone\.qa\evidence\signup-chrome-20260920`. Exact images, differences and ordered real-control captures are retained under `optimized-browser` and `optimized-comparison`.

| Frame | MAE | Over-20 |
| --- | --- | --- |
| `269160a4` | 4.529037 -> 4.522968 | 4.442522% -> 4.433524% |
| `4a1d7759` | 3.751662 -> 3.697543 | 3.594192% -> 3.496063% |
| `cd34d1ac` | 3.841989 -> 3.787766 | 3.686939% -> 3.593192% |
| `eebd5ffb` | 4.462766 -> 4.457532 | 4.391457% -> 4.388535% |

## Review limits and acceptance

The exact filled signup/profile originals and before/after live renders were reviewed. The formerly tight corners and right-edge native country arrow are corrected without changing form data. Wrapping, vertical rhythm, dialog/background material and some small-symbol details still differ. UI remains 159/159, MATCH 22/159, FLOW 3/58. No acceptance checkbox advances.
Changed frames outside the four signup targets: 11803c64, 3731221f, 4e65c7c6, 54b01eab, 56c2e39a, 706de500, 9fbb38e1, bbb92581, bdc56e10, bde65d33, ffc18eb8. The complete change list is in verification-summary.json; numerical differences alone do not establish visual acceptance.
A new native full-frame and amplified-difference review of initial New reconfirms concrete blockers: its selected-sidebar-row corners/ink differ, and player glass/underlay distribution differs. Do not sign off e72be564 or unlock its dependent flows merely because its residual is low. This is the next high-leverage owner to fix.

## Preserved publication state

The preceding 36-file player/Replay/release batch is published as 32ea2e1; both GitHub workflows passed (documentation 35514036997, reference 35514037146). Its complete review remains linked from the handoff. Build-generated type paths are preserved in ignored evidence but excluded from publication; captured hashes identify the actual optimized run, with post-normalization identity recorded separately.
