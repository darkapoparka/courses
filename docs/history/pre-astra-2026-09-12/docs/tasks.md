# Apple Music clone — screen and flow checklist

Checked this session at 2026-09-12. Active branch: `main`. Branch policy: work only on `main`; do not create or switch to feature/implementation branches unless the owner explicitly reverses this rule.

Implementation checkpoint: `a30a9eee7d7b3a44874fd2b4364b30648c064455`, preserving `05ee6ec` and all earlier main work. The final production run covers 159 desktop states, 5 responsive samples, 218 route checks and 51 interaction regressions; these are not visual sign-offs. See `handoff.md` and `reference-audit.md` for identities and findings. Course/community adaptation remains blocked until genuine clone acceptance.

## Progress at a glance

| Work | Current state |
| --- | --- |
| Unique saved screens with coded UI and a successful current browser render | **159 / 159** |
| Recorded flows listed individually below | **58** |
| Ordered recorded steps linked to their screen tasks | **218** |
| Exact visual match | Pending screen-by-screen sign-off; not inferred from rendering |
| Full recorded flow completion | Pending end-to-end sign-off; not inferred from route existence |
| TypeScript and production build | Passed using the already-installed binaries |

**Two separate screen checkboxes:** `UI-…` means code exists and the exact state rendered in the browser. `MATCH-…` means the remaining visual work is finished and a source-versus-browser comparison has been reviewed. A checked UI task is not a claim of complete 1:1 implementation.

**Flow checkboxes:** check `FLOW-…` only after traversing its entire recorded sequence using real controls and checking the intermediate states. Loading `/flows/...` URLs alone does not complete a flow.

## Current finalization evidence

The live-sidebar candidate passed 159 desktop captures, 5 responsive samples, 218 route checks and 51 interaction regressions. The exact production blur is now asserted. All 159 comparisons completed: Alpha improved from 9.8659% to 9.6403% over-20 pixels; 158 over-20 results were unchanged and none worsened. Read [the live-sidebar review](reference-review/2026-09-12-sidebar-live.md) for 13 continuous observations, preserved failures and remaining defects. No MATCH/FLOW box was advanced.

The preceding 05ee6ec combined candidate passed 159 desktop captures, 5 responsive samples, 218 route checks and 48 interaction regressions with stable source identities; all 159 were compared. This is the combined sidebar, library-control and cover-integrity candidate, not acceptance or proof that a sidebar-only commit contains that whole batch. See [the sidebar review](reference-review/2026-09-12-sidebar.md) for the exact identity and mixed visual results.

The preceding `719113e` optimized-production checkpoint passed 159 desktop captures, 5 responsive samples, 218 route checks and 44 interaction regressions. All 159 states were compared: 16 improved, 143 were unchanged and none increased their over-threshold residual. The eight new library journeys are registered and exercised; first-fixture lyrics/queue entry still exposes substantial endpoint state differences. See [the bounded review](reference-review/2026-09-12-library-panels.md) and the updated owning rows below. No MATCH/FLOW box was advanced.

The audit now uses each original's exact 1440×903 or 1440×904 application viewport, hash-identified source/candidate files, fresh output directories, and an all-screen comparison gallery. Follow `development.md` for reproduction; numerical residuals do not check the acceptance boxes below.

`UI-a4afd6e6`: repaired seeking, transport, volume, fullscreen, and keyboard/focus behavior; the regression also enters from the artist page through real controls. `UI-ee8db412`: corrected the legacy player-panel card gutter and whole-pixel artwork size, verified after closing/reopening through live controls. `UI-9b43cccb`: fixed the production-only article-scroll initialization race and added cold-open plus real-control scroll checks. These are bounded improvements, not full visual or recorded-flow sign-off.

## Working loop

Open the linked reference → edit the linked component → open the matching local state → correct the differences → exercise its real controls → check MATCH and then the relevant FLOW. Continue the existing code; do not rebuild a completed family or regenerate this file and erase manual progress.

## Shared shell

- [x] Restore the main content scrollport and keep carousel painting/hit targets out of the sidebar. Committed in `3b1f24e`; current desktop captures have no horizontal document/main overflow.
- [ ] Finish the shared typography/icon/hover/focus comparison at the reference viewport; keep keyboard and responsive behavior working.
  - 2026-09-12 bounded sidebar correction: restored measured row anchors and navigation symbols; production controls pass, but typography, glass and 904px alignment remain partial. The combined comparison has 105 lower / 2 unchanged / 52 higher threshold residuals. [Evidence and remaining defects](reference-review/2026-09-12-sidebar.md).

## Screen checklist

Screens are grouped by UI family, with each unique source identity listed exactly once. Every source and live-state link below points to that identity, not a similar replacement.

### New and charts — 10 states

Lower release collections, partly obscured artwork and source-specific featured ordering still need final matching.

<a id="screen-3731221f"></a>

- [x] **UI-3731221f — New — signed out.** Coded UI; current browser render passed.
  - [ ] **MATCH-3731221f — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/3731221f-497f-40a3-b00a-30abfe3766da.webp) · [Open app state](http://127.0.0.1:6431/screen/3731221f-497f-40a3-b00a-30abfe3766da) · [Component](../apple-music-clone/components/music-discovery.tsx)

<a id="screen-e72be564"></a>

- [x] **UI-e72be564 — New — initial view.** Coded UI; current browser render passed.
  - [ ] **MATCH-e72be564 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/e72be564-1f7a-4448-9568-f239af3233ed.webp) · [Open app state](http://127.0.0.1:6431/screen/e72be564-1f7a-4448-9568-f239af3233ed) · [Component](../apple-music-clone/components/music-discovery.tsx)

<a id="screen-4f611a9e"></a>

- [x] **UI-4f611a9e — New — named profile.** Coded UI; current browser render passed.
  - [ ] **MATCH-4f611a9e — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/4f611a9e-b39b-4ee5-a6b7-fa10fad5f093.webp) · [Open app state](http://127.0.0.1:6431/screen/4f611a9e-b39b-4ee5-a6b7-fa10fad5f093) · [Component](../apple-music-clone/components/music-discovery.tsx)

<a id="screen-54b01eab"></a>

- [x] **UI-54b01eab — New — alpha featured cards.** Coded UI; current browser render passed.
  - [ ] **MATCH-54b01eab — Finish and verify the exact screenshot match.**
  - `a30a9ee`: Real Volume/Account preservation, translucent selection, clickable carousel return, offscreen material and exact production blur verified. Original residual 9.6403%; live-from-New residual 10.6978%. Wrong/partial preceding artwork, glass distribution and typography remain. [Measured evidence](reference-review/2026-09-12-sidebar-live.md).
  - [Reference image](../apple-music-clone/reference/originals/54b01eab-e635-4f54-882b-4bc62e7a2a4c.webp) · [Open app state](http://127.0.0.1:6431/screen/54b01eab-e635-4f54-882b-4bc62e7a2a4c) · [Component](../apple-music-clone/components/music-discovery.tsx)

<a id="screen-8b03c9d0"></a>

- [x] **UI-8b03c9d0 — New — scrolled to essentials.** Coded UI; current browser render passed.
  - [ ] **MATCH-8b03c9d0 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/8b03c9d0-a80f-4d27-98c1-ed2ceccc4b1f.webp) · [Open app state](http://127.0.0.1:6431/screen/8b03c9d0-a80f-4d27-98c1-ed2ceccc4b1f) · [Component](../apple-music-clone/components/music-discovery.tsx)

<a id="screen-706de500"></a>

- [x] **UI-706de500 — New — scrolled to coming soon.** Coded UI; current browser render passed.
  - [ ] **MATCH-706de500 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/706de500-7231-4d8d-9820-89fac6c8aaac.webp) · [Open app state](http://127.0.0.1:6431/screen/706de500-7231-4d8d-9820-89fac6c8aaac) · [Component](../apple-music-clone/components/music-discovery.tsx)

<a id="screen-8a234785"></a>

- [x] **UI-8a234785 — Viral chart — named profile.** Coded UI; current browser render passed.
  - [ ] **MATCH-8a234785 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/8a234785-f0b4-4200-8f3f-2eecf2b77708.webp) · [Open app state](http://127.0.0.1:6431/screen/8a234785-f0b4-4200-8f3f-2eecf2b77708) · [Component](../apple-music-clone/components/music-chart-schedule.tsx)

<a id="screen-f2e44e3b"></a>

- [x] **UI-f2e44e3b — New — superbloom featured cards.** Coded UI; current browser render passed.
  - [ ] **MATCH-f2e44e3b — Finish and verify the exact screenshot match.**
  - 2026-09-12: Included in the final full comparison and continuous library-control review; MATCH remains open. [Exact candidate, evidence and counter-evidence](reference-review/2026-09-12-library-controls.md).
  - [Reference image](../apple-music-clone/reference/originals/f2e44e3b-cb93-4607-a0bf-6e38aa56019d.webp) · [Open app state](http://127.0.0.1:6431/screen/f2e44e3b-cb93-4607-a0bf-6e38aa56019d) · [Component](../apple-music-clone/components/music-discovery.tsx)

<a id="screen-be864051"></a>

- [x] **UI-be864051 — New — Simplified Chinese.** Coded UI; current browser render passed.
  - [ ] **MATCH-be864051 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/be864051-c59b-4676-a3c4-643fc136616d.webp) · [Open app state](http://127.0.0.1:6431/screen/be864051-c59b-4676-a3c4-643fc136616d) · [Component](../apple-music-clone/components/music-discovery.tsx)

<a id="screen-e027fe6d"></a>

- [x] **UI-e027fe6d — New — named profile.** Coded UI; current browser render passed.
  - [ ] **MATCH-e027fe6d — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/e027fe6d-4556-4638-9b51-12b4970cd85d.webp) · [Open app state](http://127.0.0.1:6431/screen/e027fe6d-4556-4638-9b51-12b4970cd85d) · [Component](../apple-music-clone/components/music-discovery.tsx)

### Sign-in, onboarding and trial — 21 states

Check each empty/filled/error step, focus, dialog size and transitions. These remain explicit local test forms, not real Apple authentication or payment.

<a id="screen-ee751367"></a>

- [x] **UI-ee751367 — New — sign-in email form, step 1, signed out.** Coded UI; current browser render passed.
  - [ ] **MATCH-ee751367 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/ee751367-0aad-4762-b7c3-52724efe5656.webp) · [Open app state](http://127.0.0.1:6431/screen/ee751367-0aad-4762-b7c3-52724efe5656) · [Component](../apple-music-clone/components/music-auth.tsx)

<a id="screen-bdc56e10"></a>

- [x] **UI-bdc56e10 — New — sign-in email form, step 1, filled, signed out.** Coded UI; current browser render passed.
  - [ ] **MATCH-bdc56e10 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/bdc56e10-b108-4247-85a8-749f706e94bb.webp) · [Open app state](http://127.0.0.1:6431/screen/bdc56e10-b108-4247-85a8-749f706e94bb) · [Component](../apple-music-clone/components/music-auth.tsx)

<a id="screen-4a1d7759"></a>

- [x] **UI-4a1d7759 — New — new-account form, step 1, signed out.** Coded UI; current browser render passed.
  - [ ] **MATCH-4a1d7759 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/4a1d7759-bb4e-4fa7-b080-f32c7a3ecb01.webp) · [Open app state](http://127.0.0.1:6431/screen/4a1d7759-bb4e-4fa7-b080-f32c7a3ecb01) · [Component](../apple-music-clone/components/music-auth.tsx)

<a id="screen-cd34d1ac"></a>

- [x] **UI-cd34d1ac — New — new-account form, step 1, filled, signed out.** Coded UI; current browser render passed.
  - [ ] **MATCH-cd34d1ac — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/cd34d1ac-4edf-48aa-80f8-28565046d465.webp) · [Open app state](http://127.0.0.1:6431/screen/cd34d1ac-4edf-48aa-80f8-28565046d465) · [Component](../apple-music-clone/components/music-auth.tsx)

<a id="screen-eebd5ffb"></a>

- [x] **UI-eebd5ffb — New — new-account form, step 2, signed out.** Coded UI; current browser render passed.
  - [ ] **MATCH-eebd5ffb — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/eebd5ffb-0edf-4662-a583-a6c7c73d38e5.webp) · [Open app state](http://127.0.0.1:6431/screen/eebd5ffb-0edf-4662-a583-a6c7c73d38e5) · [Component](../apple-music-clone/components/music-auth.tsx)

<a id="screen-269160a4"></a>

- [x] **UI-269160a4 — New — new-account form, step 2, filled, signed out.** Coded UI; current browser render passed.
  - [ ] **MATCH-269160a4 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/269160a4-3232-492b-ab92-2a96787ab821.webp) · [Open app state](http://127.0.0.1:6431/screen/269160a4-3232-492b-ab92-2a96787ab821) · [Component](../apple-music-clone/components/music-auth.tsx)

<a id="screen-99af3033"></a>

- [x] **UI-99af3033 — New — verification form, step 1, signed out.** Coded UI; current browser render passed.
  - [ ] **MATCH-99af3033 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/99af3033-b3bc-489e-951d-9d68077d5a1f.webp) · [Open app state](http://127.0.0.1:6431/screen/99af3033-b3bc-489e-951d-9d68077d5a1f) · [Component](../apple-music-clone/components/music-auth.tsx)

<a id="screen-dfce44a2"></a>

- [x] **UI-dfce44a2 — New — verification form, step 1, filled, signed out.** Coded UI; current browser render passed.
  - [ ] **MATCH-dfce44a2 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/dfce44a2-c4ac-4b22-a64f-cde6b71cc43f.webp) · [Open app state](http://127.0.0.1:6431/screen/dfce44a2-c4ac-4b22-a64f-cde6b71cc43f) · [Component](../apple-music-clone/components/music-auth.tsx)

<a id="screen-51c79ae2"></a>

- [x] **UI-51c79ae2 — New — trial checkout, step 1, signed out.** Coded UI; current browser render passed.
  - [ ] **MATCH-51c79ae2 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/51c79ae2-62e0-48d2-9a1c-df11a23d39e5.webp) · [Open app state](http://127.0.0.1:6431/screen/51c79ae2-62e0-48d2-9a1c-df11a23d39e5) · [Component](../apple-music-clone/components/music-auth.tsx)

<a id="screen-b74d25cb"></a>

- [x] **UI-b74d25cb — New — trial checkout, step 1, filled, signed out.** Coded UI; current browser render passed.
  - [ ] **MATCH-b74d25cb — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/b74d25cb-3c3c-4a08-8bfe-5c8e638d7958.webp) · [Open app state](http://127.0.0.1:6431/screen/b74d25cb-3c3c-4a08-8bfe-5c8e638d7958) · [Component](../apple-music-clone/components/music-auth.tsx)

<a id="screen-94b9d90d"></a>

- [x] **UI-94b9d90d — New — trial checkout, step 2, signed out.** Coded UI; current browser render passed.
  - [ ] **MATCH-94b9d90d — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/94b9d90d-6271-4bba-980e-2017a998c026.webp) · [Open app state](http://127.0.0.1:6431/screen/94b9d90d-6271-4bba-980e-2017a998c026) · [Component](../apple-music-clone/components/music-auth.tsx)

<a id="screen-a728c2af"></a>

- [x] **UI-a728c2af — New — trial checkout, step 2, filled, signed out.** Coded UI; current browser render passed.
  - [ ] **MATCH-a728c2af — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/a728c2af-43c0-4fdf-b7d1-975a9dc05720.webp) · [Open app state](http://127.0.0.1:6431/screen/a728c2af-43c0-4fdf-b7d1-975a9dc05720) · [Component](../apple-music-clone/components/music-auth.tsx)

<a id="screen-06ea37ef"></a>

- [x] **UI-06ea37ef — New — trial checkout, step 2, filled, scrolled state, signed out.** Coded UI; current browser render passed.
  - [ ] **MATCH-06ea37ef — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/06ea37ef-2485-4219-b244-9d56516c2c42.webp) · [Open app state](http://127.0.0.1:6431/screen/06ea37ef-2485-4219-b244-9d56516c2c42) · [Component](../apple-music-clone/components/music-auth.tsx)

<a id="screen-5175a910"></a>

- [x] **UI-5175a910 — New — trial checkout, step 3, signed out.** Coded UI; current browser render passed.
  - [ ] **MATCH-5175a910 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/5175a910-7c9f-45f8-8867-9c5969209cfe.webp) · [Open app state](http://127.0.0.1:6431/screen/5175a910-7c9f-45f8-8867-9c5969209cfe) · [Component](../apple-music-clone/components/music-auth.tsx)

<a id="screen-ecb33359"></a>

- [x] **UI-ecb33359 — New — trial checkout, step 3, scrolled state, signed out.** Coded UI; current browser render passed.
  - [ ] **MATCH-ecb33359 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/ecb33359-6b42-4866-861e-e6c733c095ed.webp) · [Open app state](http://127.0.0.1:6431/screen/ecb33359-6b42-4866-861e-e6c733c095ed) · [Component](../apple-music-clone/components/music-auth.tsx)

<a id="screen-bf099ae2"></a>

- [x] **UI-bf099ae2 — New — trial checkout, step 4, signed out.** Coded UI; current browser render passed.
  - [ ] **MATCH-bf099ae2 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/bf099ae2-46b1-444a-99d0-ea3967c8ab70.webp) · [Open app state](http://127.0.0.1:6431/screen/bf099ae2-46b1-444a-99d0-ea3967c8ab70) · [Component](../apple-music-clone/components/music-auth.tsx)

<a id="screen-3131018d"></a>

- [x] **UI-3131018d — New — sign-in email form, step 1, signed out.** Coded UI; current browser render passed.
  - [ ] **MATCH-3131018d — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/3131018d-35b8-4527-a6fe-384fbe950fe7.webp) · [Open app state](http://127.0.0.1:6431/screen/3131018d-35b8-4527-a6fe-384fbe950fe7) · [Component](../apple-music-clone/components/music-auth.tsx)

<a id="screen-417f6129"></a>

- [x] **UI-417f6129 — New — sign-in email form, step 1, filled, signed out.** Coded UI; current browser render passed.
  - [ ] **MATCH-417f6129 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/417f6129-8919-4535-985c-b43888ec8930.webp) · [Open app state](http://127.0.0.1:6431/screen/417f6129-8919-4535-985c-b43888ec8930) · [Component](../apple-music-clone/components/music-auth.tsx)

<a id="screen-6aa4a9d7"></a>

- [x] **UI-6aa4a9d7 — New — verification form, step 2, signed out.** Coded UI; current browser render passed.
  - [ ] **MATCH-6aa4a9d7 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/6aa4a9d7-6cc9-4320-b237-5db6293b95de.webp) · [Open app state](http://127.0.0.1:6431/screen/6aa4a9d7-6cc9-4320-b237-5db6293b95de) · [Component](../apple-music-clone/components/music-auth.tsx)

<a id="screen-4e65c7c6"></a>

- [x] **UI-4e65c7c6 — New — verification form, step 3, signed out.** Coded UI; current browser render passed.
  - [ ] **MATCH-4e65c7c6 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/4e65c7c6-1268-4720-9509-6acfb97dd34f.webp) · [Open app state](http://127.0.0.1:6431/screen/4e65c7c6-1268-4720-9509-6acfb97dd34f) · [Component](../apple-music-clone/components/music-auth.tsx)

<a id="screen-97de6907"></a>

- [x] **UI-97de6907 — New — verification form, step 3, filled, signed out.** Coded UI; current browser render passed.
  - [ ] **MATCH-97de6907 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/97de6907-6131-4688-ab0d-34e81e99e379.webp) · [Open app state](http://127.0.0.1:6431/screen/97de6907-6131-4688-ab0d-34e81e99e379) · [Component](../apple-music-clone/components/music-auth.tsx)

### Home — 6 states

Check exact recommendation variants, lower Add to Your Library collection, concert callout and guest screen.

<a id="screen-a917d88f"></a>

- [x] **UI-a917d88f — Home — named profile.** Coded UI; current browser render passed.
  - [ ] **MATCH-a917d88f — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/a917d88f-d15a-4f53-92d3-1daecf59d05f.webp) · [Open app state](http://127.0.0.1:6431/screen/a917d88f-d15a-4f53-92d3-1daecf59d05f) · [Component](../apple-music-clone/components/music-discovery.tsx)

<a id="screen-aefa8502"></a>

- [x] **UI-aefa8502 — Home — signed out.** Coded UI; current browser render passed.
  - [ ] **MATCH-aefa8502 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/aefa8502-aec3-486a-b4f5-5075590500f1.webp) · [Open app state](http://127.0.0.1:6431/screen/aefa8502-aec3-486a-b4f5-5075590500f1) · [Component](../apple-music-clone/components/music-discovery.tsx)

<a id="screen-2f5da478"></a>

- [x] **UI-2f5da478 — Home — named profile.** Coded UI; current browser render passed.
  - [ ] **MATCH-2f5da478 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/2f5da478-5817-4e12-99bd-b2df0355f896.webp) · [Open app state](http://127.0.0.1:6431/screen/2f5da478-5817-4e12-99bd-b2df0355f896) · [Component](../apple-music-clone/components/music-discovery.tsx)

<a id="screen-d5173715"></a>

- [x] **UI-d5173715 — Home — alpha featured cards.** Coded UI; current browser render passed.
  - [ ] **MATCH-d5173715 — Finish and verify the exact screenshot match.**
  - `a30a9ee`: Authenticated Home carousel/vertical-return segment verifies material removal and restoration. Original residual remains 6.0798%; direct/live over-20 difference is 0%. This is not full Home-flow acceptance. [Measured evidence](reference-review/2026-09-12-sidebar-live.md).
  - [Reference image](../apple-music-clone/reference/originals/d5173715-ea54-4801-837c-2a40ec9df2af.webp) · [Open app state](http://127.0.0.1:6431/screen/d5173715-ea54-4801-837c-2a40ec9df2af) · [Component](../apple-music-clone/components/music-discovery.tsx)

<a id="screen-42098642"></a>

- [x] **UI-42098642 — Home — scrolled to add library.** Coded UI; current browser render passed.
  - [ ] **MATCH-42098642 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/42098642-4b2d-429d-8fd9-9afc2711c1ed.webp) · [Open app state](http://127.0.0.1:6431/screen/42098642-4b2d-429d-8fd9-9afc2711c1ed) · [Component](../apple-music-clone/components/music-discovery.tsx)

<a id="screen-468b0465"></a>

- [x] **UI-468b0465 — Home — Simplified Chinese.** Coded UI; current browser render passed.
  - [ ] **MATCH-468b0465 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/468b0465-74be-480a-b303-cbbafc496c73.webp) · [Open app state](http://127.0.0.1:6431/screen/468b0465-74be-480a-b303-cbbafc496c73) · [Component](../apple-music-clone/components/music-discovery.tsx)

### Player, lyrics, queue and playback states — 29 states

Check exact transport icons, captured times, queue contents, lyrics positions, expand/collapse, volume and silent-preview versus owned-file behavior.

<a id="screen-11803c64"></a>

- [x] **UI-11803c64 — New — selected stupid song.** Coded UI; current browser render passed.
  - [ ] **MATCH-11803c64 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/11803c64-693e-4f2d-8c3e-576691601b2b.webp) · [Open app state](http://127.0.0.1:6431/screen/11803c64-693e-4f2d-8c3e-576691601b2b) · [Component](../apple-music-clone/components/music-discovery.tsx)

<a id="screen-c98f8b54"></a>

- [x] **UI-c98f8b54 — New — selected stupid song.** Coded UI; current browser render passed.
  - [ ] **MATCH-c98f8b54 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/c98f8b54-6f64-4fca-883c-fac90f73b848.webp) · [Open app state](http://127.0.0.1:6431/screen/c98f8b54-6f64-4fca-883c-fac90f73b848) · [Component](../apple-music-clone/components/music-discovery.tsx)

<a id="screen-1f9e170c"></a>

- [x] **UI-1f9e170c — New — playing stupid song.** Coded UI; current browser render passed.
  - [ ] **MATCH-1f9e170c — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/1f9e170c-8798-46de-90ea-d5236c7f15be.webp) · [Open app state](http://127.0.0.1:6431/screen/1f9e170c-8798-46de-90ea-d5236c7f15be) · [Component](../apple-music-clone/components/music-discovery.tsx)

<a id="screen-9fbb38e1"></a>

- [x] **UI-9fbb38e1 — New — playing stupid song.** Coded UI; current browser render passed.
  - [ ] **MATCH-9fbb38e1 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/9fbb38e1-269a-431e-8f51-deb9bea70744.webp) · [Open app state](http://127.0.0.1:6431/screen/9fbb38e1-269a-431e-8f51-deb9bea70744) · [Component](../apple-music-clone/components/music-discovery.tsx)

<a id="screen-afd02fa6"></a>

- [x] **UI-afd02fa6 — New — playing stupid song.** Coded UI; current browser render passed.
  - [ ] **MATCH-afd02fa6 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/afd02fa6-814c-4e4e-80fe-1e9ba2c6428a.webp) · [Open app state](http://127.0.0.1:6431/screen/afd02fa6-814c-4e4e-80fe-1e9ba2c6428a) · [Component](../apple-music-clone/components/music-discovery.tsx)

<a id="screen-d83e96ba"></a>

- [x] **UI-d83e96ba — New — playing Lush Life.** Coded UI; current browser render passed.
  - [ ] **MATCH-d83e96ba — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/d83e96ba-2976-4612-9441-f941d67b6f31.webp) · [Open app state](http://127.0.0.1:6431/screen/d83e96ba-2976-4612-9441-f941d67b6f31) · [Component](../apple-music-clone/components/music-discovery.tsx)

<a id="screen-ad689c37"></a>

- [x] **UI-ad689c37 — New — selected Lush Life.** Coded UI; current browser render passed.
  - [ ] **MATCH-ad689c37 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/ad689c37-d388-40c5-b490-ddf9eb7a9a49.webp) · [Open app state](http://127.0.0.1:6431/screen/ad689c37-d388-40c5-b490-ddf9eb7a9a49) · [Component](../apple-music-clone/components/music-discovery.tsx)

<a id="screen-cf59e554"></a>

- [x] **UI-cf59e554 — New — playing stupid song, shuffle on.** Coded UI; current browser render passed.
  - [ ] **MATCH-cf59e554 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/cf59e554-de37-4e4e-b41f-c5821582c72b.webp) · [Open app state](http://127.0.0.1:6431/screen/cf59e554-de37-4e4e-b41f-c5821582c72b) · [Component](../apple-music-clone/components/music-discovery.tsx)

<a id="screen-a229e38a"></a>

- [x] **UI-a229e38a — New — playing stupid song, repeat on.** Coded UI; current browser render passed.
  - [ ] **MATCH-a229e38a — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/a229e38a-189e-417d-89a2-937c80ccb3b5.webp) · [Open app state](http://127.0.0.1:6431/screen/a229e38a-189e-417d-89a2-937c80ccb3b5) · [Component](../apple-music-clone/components/music-discovery.tsx)

<a id="screen-6ac70c34"></a>

- [x] **UI-6ac70c34 — New — playing stupid song.** Coded UI; current browser render passed.
  - [ ] **MATCH-6ac70c34 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/6ac70c34-9db0-4ca6-9a2d-c6ca902eb663.webp) · [Open app state](http://127.0.0.1:6431/screen/6ac70c34-9db0-4ca6-9a2d-c6ca902eb663) · [Component](../apple-music-clone/components/music-discovery.tsx)

<a id="screen-c939c9b8"></a>

- [x] **UI-c939c9b8 — Expanded song player — lyrics visible.** Coded UI; current browser render passed.
  - [ ] **MATCH-c939c9b8 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/c939c9b8-e195-4e43-92a6-b845d0b99243.webp) · [Open app state](http://127.0.0.1:6431/screen/c939c9b8-e195-4e43-92a6-b845d0b99243) · [Component](../apple-music-clone/components/music-player.tsx)

<a id="screen-b3f29b6f"></a>

- [x] **UI-b3f29b6f — Expanded song player — lyrics visible.** Coded UI; current browser render passed.
  - [ ] **MATCH-b3f29b6f — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/b3f29b6f-5884-493c-bbc2-54f25620d5fb.webp) · [Open app state](http://127.0.0.1:6431/screen/b3f29b6f-5884-493c-bbc2-54f25620d5fb) · [Component](../apple-music-clone/components/music-player.tsx)

<a id="screen-ac05c6b8"></a>

- [x] **UI-ac05c6b8 — Expanded song player — track menu, lyrics visible.** Coded UI; current browser render passed.
  - [ ] **MATCH-ac05c6b8 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/ac05c6b8-9970-422b-bbc1-3aaff880946c.webp) · [Open app state](http://127.0.0.1:6431/screen/ac05c6b8-9970-422b-bbc1-3aaff880946c) · [Component](../apple-music-clone/components/music-menus.tsx)

<a id="screen-96711b04"></a>

- [x] **UI-96711b04 — Expanded song player — track menu, lyrics visible.** Coded UI; current browser render passed.
  - [ ] **MATCH-96711b04 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/96711b04-1b3e-4b9d-acbc-f84a3ee05b47.webp) · [Open app state](http://127.0.0.1:6431/screen/96711b04-1b3e-4b9d-acbc-f84a3ee05b47) · [Component](../apple-music-clone/components/music-menus.tsx)

<a id="screen-0c6da10e"></a>

- [x] **UI-0c6da10e — Expanded song player — track menu / playlist flyout, lyrics visible.** Coded UI; current browser render passed.
  - [ ] **MATCH-0c6da10e — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/0c6da10e-2903-4869-aea9-34ae60cc5c20.webp) · [Open app state](http://127.0.0.1:6431/screen/0c6da10e-2903-4869-aea9-34ae60cc5c20) · [Component](../apple-music-clone/components/music-menus.tsx)

<a id="screen-55ae9e4c"></a>

- [x] **UI-55ae9e4c — Expanded song player — create-playlist dialog, lyrics visible.** Coded UI; current browser render passed.
  - [ ] **MATCH-55ae9e4c — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/55ae9e4c-a54e-4a75-a0cd-676023a17aea.webp) · [Open app state](http://127.0.0.1:6431/screen/55ae9e4c-a54e-4a75-a0cd-676023a17aea) · [Component](../apple-music-clone/components/music-create-playlist.tsx)

<a id="screen-67446c83"></a>

- [x] **UI-67446c83 — Expanded song player — create-playlist dialog, filled, lyrics visible.** Coded UI; current browser render passed.
  - [ ] **MATCH-67446c83 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/67446c83-fa8a-4824-905f-eefca9bf82b6.webp) · [Open app state](http://127.0.0.1:6431/screen/67446c83-fa8a-4824-905f-eefca9bf82b6) · [Component](../apple-music-clone/components/music-create-playlist.tsx)

<a id="screen-3c1805b6"></a>

- [x] **UI-3c1805b6 — Expanded song player — create-playlist dialog, filled, lyrics visible.** Coded UI; current browser render passed.
  - [ ] **MATCH-3c1805b6 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/3c1805b6-47bd-43d5-a5c3-8f6109e7ae97.webp) · [Open app state](http://127.0.0.1:6431/screen/3c1805b6-47bd-43d5-a5c3-8f6109e7ae97) · [Component](../apple-music-clone/components/music-create-playlist.tsx)

<a id="screen-a4d30e7d"></a>

- [x] **UI-a4d30e7d — Expanded song player — lyrics visible.** Coded UI; current browser render passed.
  - [ ] **MATCH-a4d30e7d — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/a4d30e7d-ea87-4cbe-a591-d51ab9ac879a.webp) · [Open app state](http://127.0.0.1:6431/screen/a4d30e7d-ea87-4cbe-a591-d51ab9ac879a) · [Component](../apple-music-clone/components/music-player.tsx)

<a id="screen-06a34864"></a>

- [x] **UI-06a34864 — Expanded song player — lyrics hidden.** Coded UI; current browser render passed.
  - [ ] **MATCH-06a34864 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/06a34864-602c-4163-b552-1bf12d426aba.webp) · [Open app state](http://127.0.0.1:6431/screen/06a34864-602c-4163-b552-1bf12d426aba) · [Component](../apple-music-clone/components/music-player.tsx)

<a id="screen-ee8db412"></a>

- [x] **UI-ee8db412 — New — lyrics panel, playing stupid song.** Coded UI; current browser render passed.
  - 2026-09-12 bounded review: Refined panel geometry and lyric spacing/fade; first-verse seeking and close/reopen retain the established catalog. Initial recorded entry remains different: see FLOW-bc0ba8f1. [Evidence and remaining defects](reference-review/2026-09-12-library-panels.md).
  - [ ] **MATCH-ee8db412 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/ee8db412-71b0-49a8-a1ab-5d6685153abe.webp) · [Open app state](http://127.0.0.1:6431/screen/ee8db412-71b0-49a8-a1ab-5d6685153abe) · [Component](../apple-music-clone/components/music-player.tsx)

<a id="screen-8f029018"></a>

- [x] **UI-8f029018 — New — queue panel, playing stupid song.** Coded UI; current browser render passed.
  - 2026-09-12 bounded review: Separated discovery and queue YUKON editions, retained full queue titles/credits and removed opaque row rules. Volume toggling preserves editions. Initial recorded entry remains different: see FLOW-e0a0f93e. [Evidence and remaining defects](reference-review/2026-09-12-library-panels.md).
  - [ ] **MATCH-8f029018 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/8f029018-9c70-4715-9012-88a8a9d106b2.webp) · [Open app state](http://127.0.0.1:6431/screen/8f029018-9c70-4715-9012-88a8a9d106b2) · [Component](../apple-music-clone/components/music-player.tsx)

<a id="screen-de48a956"></a>

- [x] **UI-de48a956 — New — queue panel / empty, playing stupid song.** Coded UI; current browser render passed.
  - 2026-09-12 bounded review: Real Clear reaches the empty queue without resetting the catalog; panel styling improved. [Evidence and remaining defects](reference-review/2026-09-12-library-panels.md).
  - [ ] **MATCH-de48a956 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/de48a956-6060-4086-b8ed-26e80ec6ac3e.webp) · [Open app state](http://127.0.0.1:6431/screen/de48a956-6060-4086-b8ed-26e80ec6ac3e) · [Component](../apple-music-clone/components/music-player.tsx)

<a id="screen-4811dde3"></a>

- [x] **UI-4811dde3 — New — queue panel, playing stupid song, autoplay on.** Coded UI; current browser render passed.
  - 2026-09-12 bounded review: Real Autoplay retains the queue catalog; panel geometry and glass improved. Lower artwork and typography remain partial. [Evidence and remaining defects](reference-review/2026-09-12-library-panels.md).
  - [ ] **MATCH-4811dde3 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/4811dde3-bebc-4792-a524-f0137e2e4753.webp) · [Open app state](http://127.0.0.1:6431/screen/4811dde3-bebc-4792-a524-f0137e2e4753) · [Component](../apple-music-clone/components/music-player.tsx)

<a id="screen-e4dad439"></a>

- [x] **UI-e4dad439 — New — playing stupid song, volume 50%.** Coded UI; current browser render passed.
  - [ ] **MATCH-e4dad439 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/e4dad439-32c1-4a28-954c-1d945b9e37e8.webp) · [Open app state](http://127.0.0.1:6431/screen/e4dad439-32c1-4a28-954c-1d945b9e37e8) · [Component](../apple-music-clone/components/music-player.tsx)

<a id="screen-cbbdc344"></a>

- [x] **UI-cbbdc344 — New — playing stupid song, volume 5%.** Coded UI; current browser render passed.
  - [ ] **MATCH-cbbdc344 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/cbbdc344-c1ba-4774-b90b-c70e276dec6d.webp) · [Open app state](http://127.0.0.1:6431/screen/cbbdc344-c1ba-4774-b90b-c70e276dec6d) · [Component](../apple-music-clone/components/music-player.tsx)

<a id="screen-95ae6a8f"></a>

- [x] **UI-95ae6a8f — New — playing stupid song, volume 100%.** Coded UI; current browser render passed.
  - [ ] **MATCH-95ae6a8f — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/95ae6a8f-cc7b-4594-8ec6-05e1936ad1a1.webp) · [Open app state](http://127.0.0.1:6431/screen/95ae6a8f-cc7b-4594-8ec6-05e1936ad1a1) · [Component](../apple-music-clone/components/music-player.tsx)

<a id="screen-a4afd6e6"></a>

- [x] **UI-a4afd6e6 — Music-video player — named profile.** Coded UI; current browser render passed.
  - [ ] **MATCH-a4afd6e6 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/a4afd6e6-eddb-4263-b7eb-5be73f8f2b03.webp) · [Open app state](http://127.0.0.1:6431/screen/a4afd6e6-eddb-4263-b7eb-5be73f8f2b03) · [Component](../apple-music-clone/components/apple-music-app.tsx)

<a id="screen-7bd2ef54"></a>

- [x] **UI-7bd2ef54 — Expanded radio player — named profile.** Coded UI; current browser render passed.
  - [ ] **MATCH-7bd2ef54 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/7bd2ef54-565a-42a6-ad5d-2fa21b98f2a3.webp) · [Open app state](http://127.0.0.1:6431/screen/7bd2ef54-565a-42a6-ad5d-2fa21b98f2a3) · [Component](../apple-music-clone/components/music-player.tsx)

### Song credits — 2 states

Check people/roles, excerpt layout, lower release collection and correct recording identity.

<a id="screen-6337700d"></a>

- [x] **UI-6337700d — Song credits — playing stupid song.** Coded UI; current browser render passed.
  - [ ] **MATCH-6337700d — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/6337700d-b701-48e5-8701-01c933605073.webp) · [Open app state](http://127.0.0.1:6431/screen/6337700d-b701-48e5-8701-01c933605073) · [Component](../apple-music-clone/components/music-credits.tsx)

<a id="screen-2278b1d0"></a>

- [x] **UI-2278b1d0 — Song credits — playing stupid song, scrolled to production.** Coded UI; current browser render passed.
  - [ ] **MATCH-2278b1d0 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/2278b1d0-6539-48bf-b131-f94dd838a6fe.webp) · [Open app state](http://127.0.0.1:6431/screen/2278b1d0-6539-48bf-b131-f94dd838a6fe) · [Component](../apple-music-clone/components/music-credits.tsx)

### Album detail and editorial — 8 states

Check selected/unavailable rows, the video row, lower collections, sticky editorial dialog and menu intermediate states.

<a id="screen-b620e4ab"></a>

- [x] **UI-b620e4ab — Album detail — named profile.** Coded UI; current browser render passed.
  - 2026-09-12 bounded review: An unsaved outline star represents hover, not a favourite. Real input ends the captured hover; saving stays filled after pointer exit, and unsaving restores the neutral marker. [Evidence and remaining defects](reference-review/2026-09-12-library-panels.md).
  - [ ] **MATCH-b620e4ab — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/b620e4ab-d6dc-47c9-b704-6cd45cbd714c.webp) · [Open app state](http://127.0.0.1:6431/screen/b620e4ab-d6dc-47c9-b704-6cd45cbd714c) · [Component](../apple-music-clone/components/music-album.tsx)

<a id="screen-ffd1356a"></a>

- [x] **UI-ffd1356a — Album detail — scrolled to other versions.** Coded UI; current browser render passed.
  - [ ] **MATCH-ffd1356a — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/ffd1356a-86ec-4185-a19a-d48bf888d67a.webp) · [Open app state](http://127.0.0.1:6431/screen/ffd1356a-86ec-4185-a19a-d48bf888d67a) · [Component](../apple-music-clone/components/music-album.tsx)

<a id="screen-eb489e8d"></a>

- [x] **UI-eb489e8d — Album detail — scrolled to music videos.** Coded UI; current browser render passed.
  - [ ] **MATCH-eb489e8d — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/eb489e8d-0b65-4bfc-9da8-450ec3db1a53.webp) · [Open app state](http://127.0.0.1:6431/screen/eb489e8d-0b65-4bfc-9da8-450ec3db1a53) · [Component](../apple-music-clone/components/music-album.tsx)

<a id="screen-32515da3"></a>

- [x] **UI-32515da3 — Album detail — editorial dialog.** Coded UI; current browser render passed.
  - [ ] **MATCH-32515da3 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/32515da3-7507-463f-baad-a257cfed078b.webp) · [Open app state](http://127.0.0.1:6431/screen/32515da3-7507-463f-baad-a257cfed078b) · [Component](../apple-music-clone/components/music-album-article.tsx)

<a id="screen-9b43cccb"></a>

- [x] **UI-9b43cccb — Album detail — editorial dialog, scrolled state.** Coded UI; current browser render passed.
  - [ ] **MATCH-9b43cccb — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/9b43cccb-8b12-499d-aee1-d43b8cc57461.webp) · [Open app state](http://127.0.0.1:6431/screen/9b43cccb-8b12-499d-aee1-d43b8cc57461) · [Component](../apple-music-clone/components/music-album-article.tsx)

<a id="screen-56c2e39a"></a>

- [x] **UI-56c2e39a — Album detail — share menu.** Coded UI; current browser render passed.
  - [ ] **MATCH-56c2e39a — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/56c2e39a-126a-4ac8-a51c-2b5a98b0a40f.webp) · [Open app state](http://127.0.0.1:6431/screen/56c2e39a-126a-4ac8-a51c-2b5a98b0a40f) · [Component](../apple-music-clone/components/music-menus.tsx)

<a id="screen-ef86b595"></a>

- [x] **UI-ef86b595 — Album detail — album menu.** Coded UI; current browser render passed.
  - [ ] **MATCH-ef86b595 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/ef86b595-0980-4f78-ad2b-87a350374fca.webp) · [Open app state](http://127.0.0.1:6431/screen/ef86b595-0980-4f78-ad2b-87a350374fca) · [Component](../apple-music-clone/components/music-menus.tsx)

<a id="screen-eca1baa1"></a>

- [x] **UI-eca1baa1 — Album detail — album menu.** Coded UI; current browser render passed.
  - [ ] **MATCH-eca1baa1 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/eca1baa1-540d-458d-b00d-5847cd40ba27.webp) · [Open app state](http://127.0.0.1:6431/screen/eca1baa1-540d-458d-b00d-5847cd40ba27) · [Component](../apple-music-clone/components/music-menus.tsx)

### Artist detail — 8 states

Check hero/crops, lower sections, artist preferences, concert navigation and video destinations.

<a id="screen-484851bf"></a>

- [x] **UI-484851bf — Artist detail — named profile.** Coded UI; current browser render passed.
  - [ ] **MATCH-484851bf — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/484851bf-bc23-4088-8a34-4078c4d6b4ff.webp) · [Open app state](http://127.0.0.1:6431/screen/484851bf-bc23-4088-8a34-4078c4d6b4ff) · [Component](../apple-music-clone/components/music-artist.tsx)

<a id="screen-57f7c08e"></a>

- [x] **UI-57f7c08e — Artist detail — scrolled to essential albums.** Coded UI; current browser render passed.
  - [ ] **MATCH-57f7c08e — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/57f7c08e-12df-4c12-8102-1755d2c5ef5a.webp) · [Open app state](http://127.0.0.1:6431/screen/57f7c08e-12df-4c12-8102-1755d2c5ef5a) · [Component](../apple-music-clone/components/music-artist.tsx)

<a id="screen-edae3407"></a>

- [x] **UI-edae3407 — Artist detail — scrolled to music videos.** Coded UI; current browser render passed.
  - [ ] **MATCH-edae3407 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/edae3407-e738-4e2d-ad7e-07f016effc56.webp) · [Open app state](http://127.0.0.1:6431/screen/edae3407-e738-4e2d-ad7e-07f016effc56) · [Component](../apple-music-clone/components/music-artist.tsx)

<a id="screen-c9a554f4"></a>

- [x] **UI-c9a554f4 — Artist detail — scrolled to nearby concerts.** Coded UI; current browser render passed.
  - [ ] **MATCH-c9a554f4 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/c9a554f4-59ef-4e05-b61b-f3eefabc0bbe.webp) · [Open app state](http://127.0.0.1:6431/screen/c9a554f4-59ef-4e05-b61b-f3eefabc0bbe) · [Component](../apple-music-clone/components/music-artist.tsx)

<a id="screen-0c042c32"></a>

- [x] **UI-0c042c32 — Artist detail — scrolled to about artist.** Coded UI; current browser render passed.
  - [ ] **MATCH-0c042c32 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/0c042c32-f6d8-48b2-b2b0-0e43106fd67c.webp) · [Open app state](http://127.0.0.1:6431/screen/0c042c32-f6d8-48b2-b2b0-0e43106fd67c) · [Component](../apple-music-clone/components/music-artist.tsx)

<a id="screen-bc773ae9"></a>

- [x] **UI-bc773ae9 — Artist detail — artist menu.** Coded UI; current browser render passed.
  - [ ] **MATCH-bc773ae9 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/bc773ae9-a55f-495b-a49f-d5b683feee73.webp) · [Open app state](http://127.0.0.1:6431/screen/bc773ae9-a55f-495b-a49f-d5b683feee73) · [Component](../apple-music-clone/components/music-menus.tsx)

<a id="screen-f24fda77"></a>

- [x] **UI-f24fda77 — Artist detail — artist menu.** Coded UI; current browser render passed.
  - [ ] **MATCH-f24fda77 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/f24fda77-5050-411c-8071-906043dcea9c.webp) · [Open app state](http://127.0.0.1:6431/screen/f24fda77-5050-411c-8071-906043dcea9c) · [Component](../apple-music-clone/components/music-menus.tsx)

<a id="screen-898ca766"></a>

- [x] **UI-898ca766 — Artist detail — scrolled to music videos.** Coded UI; current browser render passed.
  - [ ] **MATCH-898ca766 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/898ca766-3133-4e02-a186-00d62d3804e4.webp) · [Open app state](http://127.0.0.1:6431/screen/898ca766-3133-4e02-a186-00d62d3804e4) · [Component](../apple-music-clone/components/music-artist.tsx)

### Concerts, locations and date filters — 16 states

Check the city/no-results suggestions, June/July range selection, genre results, detail routes and source-specific scroll positions.

<a id="screen-9105a602"></a>

- [x] **UI-9105a602 — Upcoming concerts — named profile.** Coded UI; current browser render passed.
  - [ ] **MATCH-9105a602 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/9105a602-1d41-4e20-a694-fc62c1bbda0d.webp) · [Open app state](http://127.0.0.1:6431/screen/9105a602-1d41-4e20-a694-fc62c1bbda0d) · [Component](../apple-music-clone/components/music-concerts.tsx)

<a id="screen-653efa95"></a>

- [x] **UI-653efa95 — Upcoming concerts — scrolled state.** Coded UI; current browser render passed.
  - [ ] **MATCH-653efa95 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/653efa95-356a-48a7-8f38-9f6fd10e2006.webp) · [Open app state](http://127.0.0.1:6431/screen/653efa95-356a-48a7-8f38-9f6fd10e2006) · [Component](../apple-music-clone/components/music-concerts.tsx)

<a id="screen-a0809fad"></a>

- [x] **UI-a0809fad — Concert discovery — named profile.** Coded UI; current browser render passed.
  - [ ] **MATCH-a0809fad — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/a0809fad-42f4-4829-a68f-fc496d89a6e5.webp) · [Open app state](http://127.0.0.1:6431/screen/a0809fad-42f4-4829-a68f-fc496d89a6e5) · [Component](../apple-music-clone/components/music-concerts.tsx)

<a id="screen-70566e85"></a>

- [x] **UI-70566e85 — Concert discovery — scrolled to nashville.** Coded UI; current browser render passed.
  - [ ] **MATCH-70566e85 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/70566e85-0ab4-4f53-9ca6-7c3e5cb12d3f.webp) · [Open app state](http://127.0.0.1:6431/screen/70566e85-0ab4-4f53-9ca6-7c3e5cb12d3f) · [Component](../apple-music-clone/components/music-concerts.tsx)

<a id="screen-dcafd99e"></a>

- [x] **UI-dcafd99e — Concert detail — named profile.** Coded UI; current browser render passed.
  - [ ] **MATCH-dcafd99e — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/dcafd99e-94e3-42a1-be31-e02f7e015ecc.webp) · [Open app state](http://127.0.0.1:6431/screen/dcafd99e-94e3-42a1-be31-e02f7e015ecc) · [Component](../apple-music-clone/components/music-concerts.tsx)

<a id="screen-4f237528"></a>

- [x] **UI-4f237528 — Concert detail — scrolled state.** Coded UI; current browser render passed.
  - [ ] **MATCH-4f237528 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/4f237528-396a-471b-be14-5ff7ffd1aa3f.webp) · [Open app state](http://127.0.0.1:6431/screen/4f237528-396a-471b-be14-5ff7ffd1aa3f) · [Component](../apple-music-clone/components/music-concerts.tsx)

<a id="screen-bd89b0a1"></a>

- [x] **UI-bd89b0a1 — Concert discovery — location menu.** Coded UI; current browser render passed.
  - [ ] **MATCH-bd89b0a1 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/bd89b0a1-f1ab-499d-8feb-9d0bcbae9f57.webp) · [Open app state](http://127.0.0.1:6431/screen/bd89b0a1-f1ab-499d-8feb-9d0bcbae9f57) · [Component](../apple-music-clone/components/music-concerts.tsx)

<a id="screen-1cd4d25b"></a>

- [x] **UI-1cd4d25b — Concert discovery — location menu, Singapore.** Coded UI; current browser render passed.
  - [ ] **MATCH-1cd4d25b — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/1cd4d25b-8b27-40f0-ab65-bf82892a4a98.webp) · [Open app state](http://127.0.0.1:6431/screen/1cd4d25b-8b27-40f0-ab65-bf82892a4a98) · [Component](../apple-music-clone/components/music-concerts.tsx)

<a id="screen-f78d223e"></a>

- [x] **UI-f78d223e — Concert discovery — location menu, chicago.** Coded UI; current browser render passed.
  - [ ] **MATCH-f78d223e — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/f78d223e-9ba1-4898-b5bd-93390d4da1cc.webp) · [Open app state](http://127.0.0.1:6431/screen/f78d223e-9ba1-4898-b5bd-93390d4da1cc) · [Component](../apple-music-clone/components/music-concerts.tsx)

<a id="screen-84b9db6f"></a>

- [x] **UI-84b9db6f — Concert discovery — Chicago, IL.** Coded UI; current browser render passed.
  - [ ] **MATCH-84b9db6f — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/84b9db6f-94ea-4a0e-8e3b-e0a8c63cc0ba.webp) · [Open app state](http://127.0.0.1:6431/screen/84b9db6f-94ea-4a0e-8e3b-e0a8c63cc0ba) · [Component](../apple-music-clone/components/music-concerts.tsx)

<a id="screen-e1069ba9"></a>

- [x] **UI-e1069ba9 — Concert discovery — date-range dialog, step 1, Chicago, IL.** Coded UI; current browser render passed.
  - [ ] **MATCH-e1069ba9 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/e1069ba9-2687-468c-bdb9-b81733b7be0f.webp) · [Open app state](http://127.0.0.1:6431/screen/e1069ba9-2687-468c-bdb9-b81733b7be0f) · [Component](../apple-music-clone/components/music-concert-dates.tsx)

<a id="screen-b896bf23"></a>

- [x] **UI-b896bf23 — Concert discovery — date-range dialog, step 2, Chicago, IL.** Coded UI; current browser render passed.
  - [ ] **MATCH-b896bf23 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/b896bf23-466c-42f0-9298-dbbb6756bd10.webp) · [Open app state](http://127.0.0.1:6431/screen/b896bf23-466c-42f0-9298-dbbb6756bd10) · [Component](../apple-music-clone/components/music-concert-dates.tsx)

<a id="screen-e1f20d4a"></a>

- [x] **UI-e1f20d4a — Concert discovery — date-range dialog, step 2, filled, Chicago, IL.** Coded UI; current browser render passed.
  - [ ] **MATCH-e1f20d4a — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/e1f20d4a-7783-48e3-913e-23727f90aa1f.webp) · [Open app state](http://127.0.0.1:6431/screen/e1f20d4a-7783-48e3-913e-23727f90aa1f) · [Component](../apple-music-clone/components/music-concert-dates.tsx)

<a id="screen-83bba8fd"></a>

- [x] **UI-83bba8fd — Concert discovery — Chicago, IL, Jul 1 - Jul 12.** Coded UI; current browser render passed.
  - [ ] **MATCH-83bba8fd — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/83bba8fd-64eb-427b-82eb-1c1c9b954748.webp) · [Open app state](http://127.0.0.1:6431/screen/83bba8fd-64eb-427b-82eb-1c1c9b954748) · [Component](../apple-music-clone/components/music-concerts.tsx)

<a id="screen-99ffee15"></a>

- [x] **UI-99ffee15 — Concert discovery — genres menu, Chicago, IL, Jul 1 - Jul 12.** Coded UI; current browser render passed.
  - [ ] **MATCH-99ffee15 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/99ffee15-7ca3-4cfe-9a32-274237dffb0b.webp) · [Open app state](http://127.0.0.1:6431/screen/99ffee15-7ca3-4cfe-9a32-274237dffb0b) · [Component](../apple-music-clone/components/music-concerts.tsx)

<a id="screen-d6b9a1a7"></a>

- [x] **UI-d6b9a1a7 — Concert discovery — Chicago, IL, Jul 1 - Jul 12, R&B/Soul.** Coded UI; current browser render passed.
  - [ ] **MATCH-d6b9a1a7 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/d6b9a1a7-e7fe-44d4-bdc1-8fb7ee990c8f.webp) · [Open app state](http://127.0.0.1:6431/screen/d6b9a1a7-e7fe-44d4-bdc1-8fb7ee990c8f) · [Component](../apple-music-clone/components/music-concerts.tsx)

### Search — 7 states

Check catalog/library scope, suggestions, recent searches, category ordering and localized variants.

<a id="screen-035569a0"></a>

- [x] **UI-035569a0 — Search — named profile.** Coded UI; current browser render passed.
  - [ ] **MATCH-035569a0 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/035569a0-e8da-454e-8bfd-83e7eacfecc5.webp) · [Open app state](http://127.0.0.1:6431/screen/035569a0-e8da-454e-8bfd-83e7eacfecc5) · [Component](../apple-music-clone/components/music-search.tsx)

<a id="screen-812ba627"></a>

- [x] **UI-812ba627 — Search — scrolled to more categories.** Coded UI; current browser render passed.
  - [ ] **MATCH-812ba627 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/812ba627-9cf5-4fb2-a508-1fedce206994.webp) · [Open app state](http://127.0.0.1:6431/screen/812ba627-9cf5-4fb2-a508-1fedce206994) · [Component](../apple-music-clone/components/music-search.tsx)

<a id="screen-5b3ec96a"></a>

- [x] **UI-5b3ec96a — Search — library scope, empty state.** Coded UI; current browser render passed.
  - [ ] **MATCH-5b3ec96a — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/5b3ec96a-2ba2-4798-b03e-07e82e3bc7a7.webp) · [Open app state](http://127.0.0.1:6431/screen/5b3ec96a-2ba2-4798-b03e-07e82e3bc7a7) · [Component](../apple-music-clone/components/music-search.tsx)

<a id="screen-4b515439"></a>

- [x] **UI-4b515439 — Search — query olivia.** Coded UI; current browser render passed.
  - [ ] **MATCH-4b515439 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/4b515439-fcaf-45bc-895f-89fa234fc881.webp) · [Open app state](http://127.0.0.1:6431/screen/4b515439-fcaf-45bc-895f-89fa234fc881) · [Component](../apple-music-clone/components/music-search.tsx)

<a id="screen-e70094e3"></a>

- [x] **UI-e70094e3 — Search — query olivia.** Coded UI; current browser render passed.
  - [ ] **MATCH-e70094e3 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/e70094e3-980e-4ba7-a454-e8dd6ce55ae4.webp) · [Open app state](http://127.0.0.1:6431/screen/e70094e3-980e-4ba7-a454-e8dd6ce55ae4) · [Component](../apple-music-clone/components/music-search.tsx)

<a id="screen-bbb92581"></a>

- [x] **UI-bbb92581 — Search — query olivia, library scope.** Coded UI; current browser render passed.
  - [ ] **MATCH-bbb92581 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/bbb92581-a59e-46ef-add7-3dd0e625eb27.webp) · [Open app state](http://127.0.0.1:6431/screen/bbb92581-a59e-46ef-add7-3dd0e625eb27) · [Component](../apple-music-clone/components/music-search.tsx)

<a id="screen-f4a8b5dc"></a>

- [x] **UI-f4a8b5dc — Search — Simplified Chinese.** Coded UI; current browser render passed.
  - [ ] **MATCH-f4a8b5dc — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/f4a8b5dc-6d28-4e7e-ad51-423e571073de.webp) · [Open app state](http://127.0.0.1:6431/screen/f4a8b5dc-6d28-4e7e-ad51-423e571073de) · [Component](../apple-music-clone/components/music-search.tsx)

### Replay and milestones — 7 states

Check month navigation, ranked cards, all milestone states, detail/back navigation and obscured source content without inventing it.

<a id="screen-f3fc07c5"></a>

- [x] **UI-f3fc07c5 — Replay — Jul, empty state.** Coded UI; current browser render passed.
  - [ ] **MATCH-f3fc07c5 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/f3fc07c5-f37c-4cbd-a025-1af76704f538.webp) · [Open app state](http://127.0.0.1:6431/screen/f3fc07c5-f37c-4cbd-a025-1af76704f538) · [Component](../apple-music-clone/components/music-replay.tsx)

<a id="screen-3fed6760"></a>

- [x] **UI-3fed6760 — Replay — May.** Coded UI; current browser render passed.
  - [ ] **MATCH-3fed6760 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/3fed6760-dab0-4f29-ae4a-1a25bb23a40a.webp) · [Open app state](http://127.0.0.1:6431/screen/3fed6760-dab0-4f29-ae4a-1a25bb23a40a) · [Component](../apple-music-clone/components/music-replay.tsx)

<a id="screen-b67b8895"></a>

- [x] **UI-b67b8895 — Replay — scrolled to top albums, May.** Coded UI; current browser render passed.
  - [ ] **MATCH-b67b8895 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/b67b8895-5002-495a-912b-3709aaa4724d.webp) · [Open app state](http://127.0.0.1:6431/screen/b67b8895-5002-495a-912b-3709aaa4724d) · [Component](../apple-music-clone/components/music-replay.tsx)

<a id="screen-18225175"></a>

- [x] **UI-18225175 — Replay — scrolled to milestones, May.** Coded UI; current browser render passed.
  - [ ] **MATCH-18225175 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/18225175-b422-4fbb-8371-eae08bb6c4a8.webp) · [Open app state](http://127.0.0.1:6431/screen/18225175-b422-4fbb-8371-eae08bb6c4a8) · [Component](../apple-music-clone/components/music-replay.tsx)

<a id="screen-b0caf02f"></a>

- [x] **UI-b0caf02f — Replay — scrolled to replay year, May.** Coded UI; current browser render passed.
  - [ ] **MATCH-b0caf02f — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/b0caf02f-21b6-4334-9304-ac9f62defebc.webp) · [Open app state](http://127.0.0.1:6431/screen/b0caf02f-21b6-4334-9304-ac9f62defebc) · [Component](../apple-music-clone/components/music-replay.tsx)

<a id="screen-cc18744f"></a>

- [x] **UI-cc18744f — Milestone gallery — named profile.** Coded UI; current browser render passed.
  - [ ] **MATCH-cc18744f — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/cc18744f-ee47-4062-9927-c85c292c25af.webp) · [Open app state](http://127.0.0.1:6431/screen/cc18744f-ee47-4062-9927-c85c292c25af) · [Component](../apple-music-clone/components/music-replay.tsx)

<a id="screen-b5d31893"></a>

- [x] **UI-b5d31893 — Milestone detail — named profile.** Coded UI; current browser render passed.
  - [ ] **MATCH-b5d31893 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/b5d31893-2ccb-44b0-9a59-d8f7cb05cc7e.webp) · [Open app state](http://127.0.0.1:6431/screen/b5d31893-2ccb-44b0-9a59-d8f7cb05cc7e) · [Component](../apple-music-clone/components/music-replay.tsx)

### Radio and schedule — 6 states

Check station identity, lower station collections, schedule menu and expanded live player.

<a id="screen-4cb8f3aa"></a>

- [x] **UI-4cb8f3aa — Radio — named profile.** Coded UI; current browser render passed.
  - [ ] **MATCH-4cb8f3aa — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/4cb8f3aa-e45c-4482-b47b-7bc395aa4f14.webp) · [Open app state](http://127.0.0.1:6431/screen/4cb8f3aa-e45c-4482-b47b-7bc395aa4f14) · [Component](../apple-music-clone/components/music-radio.tsx)

<a id="screen-0920d819"></a>

- [x] **UI-0920d819 — Radio — scrolled to radio stations.** Coded UI; current browser render passed.
  - [ ] **MATCH-0920d819 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/0920d819-fa2a-4b93-a0c0-d91db1cb1a50.webp) · [Open app state](http://127.0.0.1:6431/screen/0920d819-fa2a-4b93-a0c0-d91db1cb1a50) · [Component](../apple-music-clone/components/music-radio.tsx)

<a id="screen-a9992e55"></a>

- [x] **UI-a9992e55 — Radio — selected Apple Music Hits.** Coded UI; current browser render passed.
  - [ ] **MATCH-a9992e55 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/a9992e55-7e7f-4219-95d3-e081b1a8377b.webp) · [Open app state](http://127.0.0.1:6431/screen/a9992e55-7e7f-4219-95d3-e081b1a8377b) · [Component](../apple-music-clone/components/music-radio.tsx)

<a id="screen-47a07865"></a>

- [x] **UI-47a07865 — Radio — playing Apple Music Hits.** Coded UI; current browser render passed.
  - [ ] **MATCH-47a07865 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/47a07865-7602-4a16-adcd-0d9ec67db543.webp) · [Open app state](http://127.0.0.1:6431/screen/47a07865-7602-4a16-adcd-0d9ec67db543) · [Component](../apple-music-clone/components/music-radio.tsx)

<a id="screen-37575452"></a>

- [x] **UI-37575452 — Radio — station menu, selected Apple Music Hits.** Coded UI; current browser render passed.
  - [ ] **MATCH-37575452 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/37575452-9dfc-4d5d-a581-cbbcd78b67aa.webp) · [Open app state](http://127.0.0.1:6431/screen/37575452-9dfc-4d5d-a581-cbbcd78b67aa) · [Component](../apple-music-clone/components/music-menus.tsx)

<a id="screen-f49fce21"></a>

- [x] **UI-f49fce21 — Radio schedule — named profile.** Coded UI; current browser render passed.
  - 2026-09-12 bounded review: Reviewed the intermediate regression, then corrected the cover crop, LIVE separator, title sizing and line boxes. The 13-entry schedule is reached via the real station menu. [Evidence and remaining defects](reference-review/2026-09-12-library-panels.md).
  - [ ] **MATCH-f49fce21 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/f49fce21-d9a7-4c97-9e2e-bae95924e5d4.webp) · [Open app state](http://127.0.0.1:6431/screen/f49fce21-d9a7-4c97-9e2e-bae95924e5d4) · [Component](../apple-music-clone/components/music-chart-schedule.tsx)

### Library screens — 14 states

Check the exact card order, video aspect ratios, artist split view, sorting, empty states and pinning.

<a id="screen-bdc69b59"></a>

- [x] **UI-bdc69b59 — Recently Added — empty state.** Coded UI; current browser render passed.
  - [ ] **MATCH-bdc69b59 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/bdc69b59-1062-43ee-91da-589de56512b6.webp) · [Open app state](http://127.0.0.1:6431/screen/bdc69b59-1062-43ee-91da-589de56512b6) · [Component](../apple-music-clone/components/music-library.tsx)

<a id="screen-e757eb0f"></a>

- [x] **UI-e757eb0f — Recently Added — named profile.** Coded UI; current browser render passed.
  - [ ] **MATCH-e757eb0f — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/e757eb0f-2d7c-48e6-a37f-54ce600c0a8f.webp) · [Open app state](http://127.0.0.1:6431/screen/e757eb0f-2d7c-48e6-a37f-54ce600c0a8f) · [Component](../apple-music-clone/components/music-library.tsx)

<a id="screen-0df0d2a2"></a>

- [x] **UI-0df0d2a2 — Library artists — Ariana Grande.** Coded UI; current browser render passed.
  - [ ] **MATCH-0df0d2a2 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/0df0d2a2-72b6-428f-a93a-a0cc9da20569.webp) · [Open app state](http://127.0.0.1:6431/screen/0df0d2a2-72b6-428f-a93a-a0cc9da20569) · [Component](../apple-music-clone/components/music-library.tsx)

<a id="screen-610af644"></a>

- [x] **UI-610af644 — Library artists — Olivia Rodrigo.** Coded UI; current browser render passed.
  - [ ] **MATCH-610af644 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/610af644-8f7a-48a3-9b5e-c88f959beb43.webp) · [Open app state](http://127.0.0.1:6431/screen/610af644-8f7a-48a3-9b5e-c88f959beb43) · [Component](../apple-music-clone/components/music-library.tsx)

<a id="screen-5d3db7ca"></a>

- [x] **UI-5d3db7ca — Library albums — named profile.** Coded UI; current browser render passed.
  - [ ] **MATCH-5d3db7ca — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/5d3db7ca-e68a-4678-9eb5-b0da5c7d7568.webp) · [Open app state](http://127.0.0.1:6431/screen/5d3db7ca-e68a-4678-9eb5-b0da5c7d7568) · [Component](../apple-music-clone/components/music-library.tsx)

<a id="screen-92589389"></a>

- [x] **UI-92589389 — Library songs — named profile.** Coded UI; current browser render passed.
  - 2026-09-12 bounded review: Verified eight exact source rows in order; refined the header, column rules, artwork inset and time alignment. Shared typography and chrome still differ. [Evidence and remaining defects](reference-review/2026-09-12-library-panels.md).
  - [ ] **MATCH-92589389 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/92589389-e185-401c-a395-c646b801a0c4.webp) · [Open app state](http://127.0.0.1:6431/screen/92589389-e185-401c-a395-c646b801a0c4) · [Component](../apple-music-clone/components/music-library.tsx)

<a id="screen-09b3600e"></a>

- [x] **UI-09b3600e — Library songs — sort menu.** Coded UI; current browser render passed.
  - [ ] **MATCH-09b3600e — Finish and verify the exact screenshot match.**
  - 2026-09-12: Included in the final full comparison and continuous library-control review; MATCH remains open. [Exact candidate, evidence and counter-evidence](reference-review/2026-09-12-library-controls.md).
  - [Reference image](../apple-music-clone/reference/originals/09b3600e-624d-4fd9-a3dd-625f6c086a37.webp) · [Open app state](http://127.0.0.1:6431/screen/09b3600e-624d-4fd9-a3dd-625f6c086a37) · [Component](../apple-music-clone/components/music-menus.tsx)

<a id="screen-1d016f0f"></a>

- [x] **UI-1d016f0f — Library songs — descending.** Coded UI; current browser render passed.
  - [ ] **MATCH-1d016f0f — Finish and verify the exact screenshot match.**
  - 2026-09-12: Included in the final full comparison and continuous library-control review; MATCH remains open. [Exact candidate, evidence and counter-evidence](reference-review/2026-09-12-library-controls.md).
  - [Reference image](../apple-music-clone/reference/originals/1d016f0f-5c51-4ddc-a3e4-f1c75dbee729.webp) · [Open app state](http://127.0.0.1:6431/screen/1d016f0f-5c51-4ddc-a3e4-f1c75dbee729) · [Component](../apple-music-clone/components/music-library.tsx)

<a id="screen-e9bee76d"></a>

- [x] **UI-e9bee76d — Library songs — named profile.** Coded UI; current browser render passed.
  - [ ] **MATCH-e9bee76d — Finish and verify the exact screenshot match.**
  - 2026-09-12: Included in the final full comparison and continuous library-control review; MATCH remains open. [Exact candidate, evidence and counter-evidence](reference-review/2026-09-12-library-controls.md).
  - [Reference image](../apple-music-clone/reference/originals/e9bee76d-7158-4521-8c6e-8e79268b39ae.webp) · [Open app state](http://127.0.0.1:6431/screen/e9bee76d-7158-4521-8c6e-8e79268b39ae) · [Component](../apple-music-clone/components/music-library.tsx)

<a id="screen-3884ff64"></a>

- [x] **UI-3884ff64 — Library songs — track menu.** Coded UI; current browser render passed.
  - [ ] **MATCH-3884ff64 — Finish and verify the exact screenshot match.**
  - 2026-09-12: Included in the final full comparison and continuous library-control review; MATCH remains open. [Exact candidate, evidence and counter-evidence](reference-review/2026-09-12-library-controls.md).
  - [Reference image](../apple-music-clone/reference/originals/3884ff64-732a-4b00-81ee-059746090eec.webp) · [Open app state](http://127.0.0.1:6431/screen/3884ff64-732a-4b00-81ee-059746090eec) · [Component](../apple-music-clone/components/music-menus.tsx)

<a id="screen-06be9f09"></a>

- [x] **UI-06be9f09 — Library songs — song pinned.** Coded UI; current browser render passed.
  - [ ] **MATCH-06be9f09 — Finish and verify the exact screenshot match.**
  - 2026-09-12: Included in the final full comparison and continuous library-control review; MATCH remains open. [Exact candidate, evidence and counter-evidence](reference-review/2026-09-12-library-controls.md).
  - [Reference image](../apple-music-clone/reference/originals/06be9f09-22fe-45fc-93b8-a49214c9f5f5.webp) · [Open app state](http://127.0.0.1:6431/screen/06be9f09-22fe-45fc-93b8-a49214c9f5f5) · [Component](../apple-music-clone/components/music-library.tsx)

<a id="screen-4e857921"></a>

- [x] **UI-4e857921 — Music Videos — named profile.** Coded UI; current browser render passed.
  - [ ] **MATCH-4e857921 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/4e857921-f588-4920-ad53-634f36389674.webp) · [Open app state](http://127.0.0.1:6431/screen/4e857921-f588-4920-ad53-634f36389674) · [Component](../apple-music-clone/components/music-library.tsx)

<a id="screen-0b0e3fbf"></a>

- [x] **UI-0b0e3fbf — Made for You — empty state.** Coded UI; current browser render passed.
  - [ ] **MATCH-0b0e3fbf — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/0b0e3fbf-2dd5-4323-b83d-dc5f65e50b31.webp) · [Open app state](http://127.0.0.1:6431/screen/0b0e3fbf-2dd5-4323-b83d-dc5f65e50b31) · [Component](../apple-music-clone/components/music-library.tsx)

<a id="screen-e379e3fe"></a>

- [x] **UI-e379e3fe — Made for You — named profile.** Coded UI; current browser render passed.
  - [ ] **MATCH-e379e3fe — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/e379e3fe-9298-433a-938a-7cb3b195028b.webp) · [Open app state](http://127.0.0.1:6431/screen/e379e3fe-9298-433a-938a-7cb3b195028b) · [Component](../apple-music-clone/components/music-library.tsx)

### Playlists and favourites — 4 states

Check the initial three songs, vampire insertion/replacement, list counts, nested menus and playlist-creation validation.

<a id="screen-8a2a4241"></a>

- [x] **UI-8a2a4241 — All Playlists — named profile.** Coded UI; current browser render passed.
  - [ ] **MATCH-8a2a4241 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/8a2a4241-7833-471f-b5e4-72f89d71412b.webp) · [Open app state](http://127.0.0.1:6431/screen/8a2a4241-7833-471f-b5e4-72f89d71412b) · [Component](../apple-music-clone/components/music-library.tsx)

<a id="screen-a573d1ab"></a>

- [x] **UI-a573d1ab — Emotional Songs — named profile.** Coded UI; current browser render passed.
  - [ ] **MATCH-a573d1ab — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/a573d1ab-e4c7-4f59-beb8-f2e171ba1530.webp) · [Open app state](http://127.0.0.1:6431/screen/a573d1ab-e4c7-4f59-beb8-f2e171ba1530) · [Component](../apple-music-clone/components/music-playlist.tsx)

<a id="screen-5044abe5"></a>

- [x] **UI-5044abe5 — Emotional Songs — after adding vampire (four songs).** Coded UI; current browser render passed.
  - [ ] **MATCH-5044abe5 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/5044abe5-979b-464c-bf96-8c5c99c1b24b.webp) · [Open app state](http://127.0.0.1:6431/screen/5044abe5-979b-464c-bf96-8c5c99c1b24b) · [Component](../apple-music-clone/components/music-playlist.tsx)

<a id="screen-bde65d33"></a>

- [x] **UI-bde65d33 — Favourite Songs — named profile.** Coded UI; current browser render passed.
  - [ ] **MATCH-bde65d33 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/bde65d33-8e43-4796-b2c4-c702cb16eb78.webp) · [Open app state](http://127.0.0.1:6431/screen/bde65d33-8e43-4796-b2c4-c702cb16eb78) · [Component](../apple-music-clone/components/music-playlist.tsx)

### Sidebar editing and account menu — 4 states

Check hidden navigation entries, pinned states, profile menu, sign-out and sidebar containment.

<a id="screen-ffc18eb8"></a>

- [x] **UI-ffc18eb8 — New — edit navigation, superbloom featured cards.** Coded UI; current browser render passed.
  - [ ] **MATCH-ffc18eb8 — Finish and verify the exact screenshot match.**
  - 2026-09-12: Included in the final full comparison and continuous library-control review; MATCH remains open. [Exact candidate, evidence and counter-evidence](reference-review/2026-09-12-library-controls.md).
  - [Reference image](../apple-music-clone/reference/originals/ffc18eb8-5cbb-4e01-b066-867308585f5f.webp) · [Open app state](http://127.0.0.1:6431/screen/ffc18eb8-5cbb-4e01-b066-867308585f5f) · [Component](../apple-music-clone/components/music-discovery.tsx)

<a id="screen-3728aa07"></a>

- [x] **UI-3728aa07 — New — edit navigation, superbloom featured cards.** Coded UI; current browser render passed.
  - [ ] **MATCH-3728aa07 — Finish and verify the exact screenshot match.**
  - 2026-09-12: Included in the final full comparison and continuous library-control review; MATCH remains open. [Exact candidate, evidence and counter-evidence](reference-review/2026-09-12-library-controls.md).
  - [Reference image](../apple-music-clone/reference/originals/3728aa07-f749-4edd-8c9f-f2f606649f04.webp) · [Open app state](http://127.0.0.1:6431/screen/3728aa07-f749-4edd-8c9f-f2f606649f04) · [Component](../apple-music-clone/components/music-discovery.tsx)

<a id="screen-e5e8383f"></a>

- [x] **UI-e5e8383f — New — superbloom featured cards.** Coded UI; current browser render passed.
  - [ ] **MATCH-e5e8383f — Finish and verify the exact screenshot match.**
  - 2026-09-12: Included in the final full comparison and continuous library-control review; MATCH remains open. [Exact candidate, evidence and counter-evidence](reference-review/2026-09-12-library-controls.md).
  - [Reference image](../apple-music-clone/reference/originals/e5e8383f-21d7-4eea-873e-25874adfa906.webp) · [Open app state](http://127.0.0.1:6431/screen/e5e8383f-21d7-4eea-873e-25874adfa906) · [Component](../apple-music-clone/components/music-discovery.tsx)

<a id="screen-fc5d84bd"></a>

- [x] **UI-fc5d84bd — New — profile menu.** Coded UI; current browser render passed.
  - [ ] **MATCH-fc5d84bd — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/fc5d84bd-aeee-420d-aef0-7c1681d8f1c2.webp) · [Open app state](http://127.0.0.1:6431/screen/fc5d84bd-aeee-420d-aef0-7c1681d8f1c2) · [Component](../apple-music-clone/components/music-menus.tsx)

### Account settings and subscriptions — 17 states

Check independent scrolling, passcode setup/confirmation/recovery, local cancellation and language state.

<a id="screen-481cd568"></a>

- [x] **UI-481cd568 — Account settings — named profile.** Coded UI; current browser render passed.
  - [ ] **MATCH-481cd568 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/481cd568-59d9-47ab-88fc-ec20f843d9c1.webp) · [Open app state](http://127.0.0.1:6431/screen/481cd568-59d9-47ab-88fc-ec20f843d9c1) · [Component](../apple-music-clone/components/music-account.tsx)

<a id="screen-1e5b4763"></a>

- [x] **UI-1e5b4763 — Account settings — scrolled to account access.** Coded UI; current browser render passed.
  - [ ] **MATCH-1e5b4763 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/1e5b4763-6664-4fc0-871d-3b7c9a03853e.webp) · [Open app state](http://127.0.0.1:6431/screen/1e5b4763-6664-4fc0-871d-3b7c9a03853e) · [Component](../apple-music-clone/components/music-account.tsx)

<a id="screen-01f96377"></a>

- [x] **UI-01f96377 — Account settings — scrolled to parental controls.** Coded UI; current browser render passed.
  - [ ] **MATCH-01f96377 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/01f96377-a362-452d-9045-449e0916609f.webp) · [Open app state](http://127.0.0.1:6431/screen/01f96377-a362-452d-9045-449e0916609f) · [Component](../apple-music-clone/components/music-account.tsx)

<a id="screen-44101453"></a>

- [x] **UI-44101453 — Account settings — scrolled to subscriptions.** Coded UI; current browser render passed.
  - [ ] **MATCH-44101453 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/44101453-7009-49f7-bde3-406e3193e96a.webp) · [Open app state](http://127.0.0.1:6431/screen/44101453-7009-49f7-bde3-406e3193e96a) · [Component](../apple-music-clone/components/music-account.tsx)

<a id="screen-b2e0f231"></a>

- [x] **UI-b2e0f231 — Connected accounts — named profile.** Coded UI; current browser render passed.
  - [ ] **MATCH-b2e0f231 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/b2e0f231-51e2-4227-921f-82d567937b6b.webp) · [Open app state](http://127.0.0.1:6431/screen/b2e0f231-51e2-4227-921f-82d567937b6b) · [Component](../apple-music-clone/components/music-account.tsx)

<a id="screen-f99d9583"></a>

- [x] **UI-f99d9583 — Account settings — restriction passcode dialog, step 1, scrolled to parental controls.** Coded UI; current browser render passed.
  - [ ] **MATCH-f99d9583 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/f99d9583-5836-47c5-ae0a-a26ffaf0d1b8.webp) · [Open app state](http://127.0.0.1:6431/screen/f99d9583-5836-47c5-ae0a-a26ffaf0d1b8) · [Component](../apple-music-clone/components/music-account-dialogs.tsx)

<a id="screen-0da4882b"></a>

- [x] **UI-0da4882b — Account settings — restriction passcode dialog, step 1, filled, scrolled to parental controls.** Coded UI; current browser render passed.
  - [ ] **MATCH-0da4882b — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/0da4882b-707f-4cbd-aba1-034f3e9f2a90.webp) · [Open app state](http://127.0.0.1:6431/screen/0da4882b-707f-4cbd-aba1-034f3e9f2a90) · [Component](../apple-music-clone/components/music-account-dialogs.tsx)

<a id="screen-8b9e8598"></a>

- [x] **UI-8b9e8598 — Account settings — restriction passcode dialog, step 2, scrolled to parental controls.** Coded UI; current browser render passed.
  - [ ] **MATCH-8b9e8598 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/8b9e8598-7025-46c7-91ef-d1b9b1d3af55.webp) · [Open app state](http://127.0.0.1:6431/screen/8b9e8598-7025-46c7-91ef-d1b9b1d3af55) · [Component](../apple-music-clone/components/music-account-dialogs.tsx)

<a id="screen-0260ef9f"></a>

- [x] **UI-0260ef9f — Account settings — restriction passcode dialog, step 2, filled, scrolled to parental controls.** Coded UI; current browser render passed.
  - [ ] **MATCH-0260ef9f — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/0260ef9f-bfb7-406b-90c0-1f43c378b826.webp) · [Open app state](http://127.0.0.1:6431/screen/0260ef9f-bfb7-406b-90c0-1f43c378b826) · [Component](../apple-music-clone/components/music-account-dialogs.tsx)

<a id="screen-5b34ad72"></a>

- [x] **UI-5b34ad72 — Account settings — restriction passcode dialog, step 3, scrolled to parental controls.** Coded UI; current browser render passed.
  - [ ] **MATCH-5b34ad72 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/5b34ad72-fdad-47f1-8505-e24df0d9019c.webp) · [Open app state](http://127.0.0.1:6431/screen/5b34ad72-fdad-47f1-8505-e24df0d9019c) · [Component](../apple-music-clone/components/music-account-dialogs.tsx)

<a id="screen-7437b956"></a>

- [x] **UI-7437b956 — Account settings — restriction passcode dialog, step 4, scrolled to parental controls.** Coded UI; current browser render passed.
  - [ ] **MATCH-7437b956 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/7437b956-e1fb-4be4-a43c-7299cda8c1e6.webp) · [Open app state](http://127.0.0.1:6431/screen/7437b956-e1fb-4be4-a43c-7299cda8c1e6) · [Component](../apple-music-clone/components/music-account-dialogs.tsx)

<a id="screen-6436de36"></a>

- [x] **UI-6436de36 — Account settings — scrolled to parental controls, restrictions enabled.** Coded UI; current browser render passed.
  - [ ] **MATCH-6436de36 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/6436de36-bec0-483d-b9a5-5bb9793c211e.webp) · [Open app state](http://127.0.0.1:6431/screen/6436de36-bec0-483d-b9a5-5bb9793c211e) · [Component](../apple-music-clone/components/music-account.tsx)

<a id="screen-c0997fe5"></a>

- [x] **UI-c0997fe5 — Subscription — named profile.** Coded UI; current browser render passed.
  - [ ] **MATCH-c0997fe5 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/c0997fe5-7f01-4d42-9b12-1c7f284f8046.webp) · [Open app state](http://127.0.0.1:6431/screen/c0997fe5-7f01-4d42-9b12-1c7f284f8046) · [Component](../apple-music-clone/components/music-account.tsx)

<a id="screen-fd1c0c71"></a>

- [x] **UI-fd1c0c71 — Subscription — cancellation confirmation.** Coded UI; current browser render passed.
  - [ ] **MATCH-fd1c0c71 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/fd1c0c71-8411-48fb-9d7d-537cf52224a2.webp) · [Open app state](http://127.0.0.1:6431/screen/fd1c0c71-8411-48fb-9d7d-537cf52224a2) · [Component](../apple-music-clone/components/music-account-dialogs.tsx)

<a id="screen-03157020"></a>

- [x] **UI-03157020 — Subscription — cancellation result.** Coded UI; current browser render passed.
  - [ ] **MATCH-03157020 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/03157020-edc1-453b-8d8a-8aa44d31ed81.webp) · [Open app state](http://127.0.0.1:6431/screen/03157020-edc1-453b-8d8a-8aa44d31ed81) · [Component](../apple-music-clone/components/music-account-dialogs.tsx)

<a id="screen-603983c7"></a>

- [x] **UI-603983c7 — Subscription — signed out, cancelled.** Coded UI; current browser render passed.
  - [ ] **MATCH-603983c7 — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/603983c7-b9be-401e-8547-9c469ee313c0.webp) · [Open app state](http://127.0.0.1:6431/screen/603983c7-b9be-401e-8547-9c469ee313c0) · [Component](../apple-music-clone/components/music-account.tsx)

<a id="screen-50fe374b"></a>

- [x] **UI-50fe374b — Account settings — Simplified Chinese.** Coded UI; current browser render passed.
  - [ ] **MATCH-50fe374b — Finish and verify the exact screenshot match.**
  - [Reference image](../apple-music-clone/reference/originals/50fe374b-43b5-403d-962e-b072bf58d5e1.webp) · [Open app state](http://127.0.0.1:6431/screen/50fe374b-43b5-403d-962e-b072bf58d5e1) · [Component](../apple-music-clone/components/music-account.tsx)

## Recorded flow checklist

Each sequence below links to the same screen tasks above. The numbers are the original one-based recorded steps; the preview route uses zero-based `step`. An unchecked flow can have substantial working code—the checkbox specifically means the entire reference journey has passed.

- [ ] **FLOW-43dfc8c6 — 1. Onboarding (10 steps).** Complete and verify the recorded journey.
  - [Open first recorded state](http://127.0.0.1:6431/flows/onboarding?step=0). Sequence: [1: 3731221f](#screen-3731221f) → [2: ee751367](#screen-ee751367) → [3: bdc56e10](#screen-bdc56e10) → [4: 4a1d7759](#screen-4a1d7759) → [5: cd34d1ac](#screen-cd34d1ac) → [6: eebd5ffb](#screen-eebd5ffb) → [7: 269160a4](#screen-269160a4) → [8: 99af3033](#screen-99af3033) → [9: dfce44a2](#screen-dfce44a2) → [10: 51c79ae2](#screen-51c79ae2)

- [ ] **FLOW-32937ec7 — 2. Starting a trial (10 steps).** Complete and verify the recorded journey.
  - [Open first recorded state](http://127.0.0.1:6431/flows/starting-a-trial?step=0). Sequence: [1: 51c79ae2](#screen-51c79ae2) → [2: b74d25cb](#screen-b74d25cb) → [3: 94b9d90d](#screen-94b9d90d) → [4: a728c2af](#screen-a728c2af) → [5: 06ea37ef](#screen-06ea37ef) → [6: 5175a910](#screen-5175a910) → [7: ecb33359](#screen-ecb33359) → [8: bf099ae2](#screen-bf099ae2) → [9: e72be564](#screen-e72be564) → [10: a917d88f](#screen-a917d88f)

- [ ] **FLOW-bc4b3fa8 — 3. New (5 steps).** Complete and verify the recorded journey.
  - `a30a9ee`: All five checkpoints traversed continuously from e72be564 through actual hover, carousel and wheel controls, then returned. Snapshot/artwork/profile differences remain; live Alpha differs from its direct fixture by 1.8698% over threshold. Do not replace session data behind a hover. [Measured evidence](reference-review/2026-09-12-sidebar-live.md).
  - [Open first recorded state](http://127.0.0.1:6431/flows/new?step=0). Sequence: [1: e72be564](#screen-e72be564) → [2: 4f611a9e](#screen-4f611a9e) → [3: 54b01eab](#screen-54b01eab) → [4: 8b03c9d0](#screen-8b03c9d0) → [5: 706de500](#screen-706de500)

- [ ] **FLOW-d5d60236 — 4. Chart detail (2 steps).** Complete and verify the recorded journey.
  - [Open first recorded state](http://127.0.0.1:6431/flows/chart-detail?step=0). Sequence: [1: 4f611a9e](#screen-4f611a9e) → [2: 8a234785](#screen-8a234785)

- [ ] **FLOW-4139fb15 — 5. Listening to songs (8 steps).** Complete and verify the recorded journey.
  - [Open first recorded state](http://127.0.0.1:6431/flows/listening-to-songs?step=0). Sequence: [1: e72be564](#screen-e72be564) → [2: 11803c64](#screen-11803c64) → [3: c98f8b54](#screen-c98f8b54) → [4: 1f9e170c](#screen-1f9e170c) → [5: 9fbb38e1](#screen-9fbb38e1) → [6: afd02fa6](#screen-afd02fa6) → [7: d83e96ba](#screen-d83e96ba) → [8: ad689c37](#screen-ad689c37)

- [ ] **FLOW-0bb078b9 — 6. Enabling shuffle (2 steps).** Complete and verify the recorded journey.
  - [Open first recorded state](http://127.0.0.1:6431/flows/enabling-shuffle?step=0). Sequence: [1: 1f9e170c](#screen-1f9e170c) → [2: cf59e554](#screen-cf59e554)

- [ ] **FLOW-aa772c0f — 7. Repeating a song (2 steps).** Complete and verify the recorded journey.
  - [Open first recorded state](http://127.0.0.1:6431/flows/repeating-a-song?step=0). Sequence: [1: 1f9e170c](#screen-1f9e170c) → [2: a229e38a](#screen-a229e38a)

- [ ] **FLOW-b6295ef8 — 8. Expanding a song (3 steps).** Complete and verify the recorded journey.
  - [Open first recorded state](http://127.0.0.1:6431/flows/expanding-a-song?step=0). Sequence: [1: 1f9e170c](#screen-1f9e170c) → [2: 6ac70c34](#screen-6ac70c34) → [3: c939c9b8](#screen-c939c9b8)

- [ ] **FLOW-2765d26d — 9. Favoriting a song (2 steps).** Complete and verify the recorded journey.
  - [Open first recorded state](http://127.0.0.1:6431/flows/favoriting-a-song?step=0). Sequence: [1: c939c9b8](#screen-c939c9b8) → [2: b3f29b6f](#screen-b3f29b6f)

- [ ] **FLOW-80cc296e — 10. Adding to a library (3 steps).** Complete and verify the recorded journey.
  - [Open first recorded state](http://127.0.0.1:6431/flows/adding-to-a-library?step=0). Sequence: [1: b3f29b6f](#screen-b3f29b6f) → [2: ac05c6b8](#screen-ac05c6b8) → [3: 96711b04](#screen-96711b04)

- [ ] **FLOW-6652f3e8 — 11. Adding to a playlist (6 steps).** Complete and verify the recorded journey.
  - [Open first recorded state](http://127.0.0.1:6431/flows/adding-to-a-playlist?step=0). Sequence: [1: ac05c6b8](#screen-ac05c6b8) → [2: 0c6da10e](#screen-0c6da10e) → [3: 55ae9e4c](#screen-55ae9e4c) → [4: 67446c83](#screen-67446c83) → [5: 3c1805b6](#screen-3c1805b6) → [6: a4d30e7d](#screen-a4d30e7d)

- [ ] **FLOW-ef26cd71 — 12. Song credits (3 steps).** Complete and verify the recorded journey.
  - [Open first recorded state](http://127.0.0.1:6431/flows/song-credits?step=0). Sequence: [1: ac05c6b8](#screen-ac05c6b8) → [2: 6337700d](#screen-6337700d) → [3: 2278b1d0](#screen-2278b1d0)

- [ ] **FLOW-a8cd9bcd — 13. Hiding lyrics (2 steps).** Complete and verify the recorded journey.
  - [Open first recorded state](http://127.0.0.1:6431/flows/hiding-lyrics?step=0). Sequence: [1: b3f29b6f](#screen-b3f29b6f) → [2: 06a34864](#screen-06a34864)

- [ ] **FLOW-bc0ba8f1 — 14. Showing lyrics (2 steps).** Complete and verify the recorded journey.
  - 2026-09-12 bounded review: The first fixture to Show lyrics is now captured continuously. Its catalog/library differs substantially from the saved legacy endpoint; direct rendering and reopening are not completion of this flow. [Evidence and remaining defects](reference-review/2026-09-12-library-panels.md).
  - [Open first recorded state](http://127.0.0.1:6431/flows/showing-lyrics?step=0). Sequence: [1: 1f9e170c](#screen-1f9e170c) → [2: ee8db412](#screen-ee8db412)

- [ ] **FLOW-e0a0f93e — 15. Song queue (2 steps).** Complete and verify the recorded journey.
  - 2026-09-12 bounded review: The first fixture to Up Next is now captured continuously. Its catalog/queue differs substantially from the saved endpoint; session data must not be replaced merely to manufacture that image. [Evidence and remaining defects](reference-review/2026-09-12-library-panels.md).
  - [Open first recorded state](http://127.0.0.1:6431/flows/song-queue?step=0). Sequence: [1: 1f9e170c](#screen-1f9e170c) → [2: 8f029018](#screen-8f029018)

- [ ] **FLOW-7f504621 — 16. Clearing song queue (2 steps).** Complete and verify the recorded journey.
  - 2026-09-12 bounded review: The populated and cleared queue states use the real Clear control. [Evidence and remaining defects](reference-review/2026-09-12-library-panels.md).
  - [Open first recorded state](http://127.0.0.1:6431/flows/clearing-song-queue?step=0). Sequence: [1: 8f029018](#screen-8f029018) → [2: de48a956](#screen-de48a956)

- [ ] **FLOW-fc3dbfae — 17. Enabling autoplay (2 steps).** Complete and verify the recorded journey.
  - 2026-09-12 bounded review: The recorded queue and Autoplay-enabled states use the real toggle with catalog persistence checked. [Evidence and remaining defects](reference-review/2026-09-12-library-panels.md).
  - [Open first recorded state](http://127.0.0.1:6431/flows/enabling-autoplay?step=0). Sequence: [1: 8f029018](#screen-8f029018) → [2: 4811dde3](#screen-4811dde3)

- [ ] **FLOW-47b2a149 — 18. Adjusting volume (4 steps).** Complete and verify the recorded journey.
  - [Open first recorded state](http://127.0.0.1:6431/flows/adjusting-volume?step=0). Sequence: [1: 1f9e170c](#screen-1f9e170c) → [2: e4dad439](#screen-e4dad439) → [3: cbbdc344](#screen-cbbdc344) → [4: 95ae6a8f](#screen-95ae6a8f)

- [ ] **FLOW-fbe1a3cc — 19. Album detail (4 steps).** Complete and verify the recorded journey.
  - [Open first recorded state](http://127.0.0.1:6431/flows/album-detail?step=0). Sequence: [1: e72be564](#screen-e72be564) → [2: b620e4ab](#screen-b620e4ab) → [3: ffd1356a](#screen-ffd1356a) → [4: eb489e8d](#screen-eb489e8d)

- [ ] **FLOW-91b7c60d — 20. Album description (3 steps).** Complete and verify the recorded journey.
  - [Open first recorded state](http://127.0.0.1:6431/flows/album-description?step=0). Sequence: [1: b620e4ab](#screen-b620e4ab) → [2: 32515da3](#screen-32515da3) → [3: 9b43cccb](#screen-9b43cccb)

- [ ] **FLOW-1319943e — 21. Share an album (2 steps).** Complete and verify the recorded journey.
  - 2026-09-12 bounded review: Initial real hover and the album Share control are captured; pointer/keyboard focus modality is separately tested. [Evidence and remaining defects](reference-review/2026-09-12-library-panels.md).
  - [Open first recorded state](http://127.0.0.1:6431/flows/share-an-album?step=0). Sequence: [1: b620e4ab](#screen-b620e4ab) → [2: 56c2e39a](#screen-56c2e39a)

- [ ] **FLOW-8c9a97bc — 22. Copying an album link (3 steps).** Complete and verify the recorded journey.
  - 2026-09-12 bounded review: Initial real hover, overflow, Copy Link and inline confirmation are captured; clipboard content and focus restoration are asserted. [Evidence and remaining defects](reference-review/2026-09-12-library-panels.md).
  - [Open first recorded state](http://127.0.0.1:6431/flows/copying-an-album-link?step=0). Sequence: [1: b620e4ab](#screen-b620e4ab) → [2: ef86b595](#screen-ef86b595) → [3: eca1baa1](#screen-eca1baa1)

- [ ] **FLOW-98bde04b — 23. Artist detail (6 steps).** Complete and verify the recorded journey.
  - [Open first recorded state](http://127.0.0.1:6431/flows/artist-detail?step=0). Sequence: [1: e72be564](#screen-e72be564) → [2: 484851bf](#screen-484851bf) → [3: 57f7c08e](#screen-57f7c08e) → [4: edae3407](#screen-edae3407) → [5: c9a554f4](#screen-c9a554f4) → [6: 0c042c32](#screen-0c042c32)

- [ ] **FLOW-138a3f56 — 24. Nearby concerts (3 steps).** Complete and verify the recorded journey.
  - [Open first recorded state](http://127.0.0.1:6431/flows/nearby-concerts?step=0). Sequence: [1: 484851bf](#screen-484851bf) → [2: 9105a602](#screen-9105a602) → [3: 653efa95](#screen-653efa95)

- [ ] **FLOW-bb755884 — 25. Marking a song as suggest less (3 steps).** Complete and verify the recorded journey.
  - [Open first recorded state](http://127.0.0.1:6431/flows/marking-a-song-as-suggest-less?step=0). Sequence: [1: 484851bf](#screen-484851bf) → [2: bc773ae9](#screen-bc773ae9) → [3: f24fda77](#screen-f24fda77)

- [ ] **FLOW-d3879ab4 — 26. Watching a music video (3 steps).** Complete and verify the recorded journey.
  - [Open first recorded state](http://127.0.0.1:6431/flows/watching-a-music-video?step=0). Sequence: [1: edae3407](#screen-edae3407) → [2: 898ca766](#screen-898ca766) → [3: a4afd6e6](#screen-a4afd6e6)

- [ ] **FLOW-6c5d545e — 27. Search (4 steps).** Complete and verify the recorded journey.
  - [Open first recorded state](http://127.0.0.1:6431/flows/search?step=0). Sequence: [1: e72be564](#screen-e72be564) → [2: 035569a0](#screen-035569a0) → [3: 812ba627](#screen-812ba627) → [4: 5b3ec96a](#screen-5b3ec96a)

- [ ] **FLOW-638262c8 — 28. Searching Apple Music (4 steps).** Complete and verify the recorded journey.
  - [Open first recorded state](http://127.0.0.1:6431/flows/searching-apple-music?step=0). Sequence: [1: 035569a0](#screen-035569a0) → [2: 4b515439](#screen-4b515439) → [3: e70094e3](#screen-e70094e3) → [4: bbb92581](#screen-bbb92581)

- [ ] **FLOW-95cd6e33 — 29. Concerts (3 steps).** Complete and verify the recorded journey.
  - [Open first recorded state](http://127.0.0.1:6431/flows/concerts?step=0). Sequence: [1: 035569a0](#screen-035569a0) → [2: a0809fad](#screen-a0809fad) → [3: 70566e85](#screen-70566e85)

- [ ] **FLOW-1406ebf4 — 30. Concert detail (3 steps).** Complete and verify the recorded journey.
  - [Open first recorded state](http://127.0.0.1:6431/flows/concert-detail?step=0). Sequence: [1: 70566e85](#screen-70566e85) → [2: dcafd99e](#screen-dcafd99e) → [3: 4f237528](#screen-4f237528)

- [ ] **FLOW-97c2ae4a — 31. Setting a location (5 steps).** Complete and verify the recorded journey.
  - [Open first recorded state](http://127.0.0.1:6431/flows/setting-a-location?step=0). Sequence: [1: a0809fad](#screen-a0809fad) → [2: bd89b0a1](#screen-bd89b0a1) → [3: 1cd4d25b](#screen-1cd4d25b) → [4: f78d223e](#screen-f78d223e) → [5: 84b9db6f](#screen-84b9db6f)

- [ ] **FLOW-4dd6b284 — 32. Filtering concerts (7 steps).** Complete and verify the recorded journey.
  - [Open first recorded state](http://127.0.0.1:6431/flows/filtering-concerts?step=0). Sequence: [1: 84b9db6f](#screen-84b9db6f) → [2: e1069ba9](#screen-e1069ba9) → [3: b896bf23](#screen-b896bf23) → [4: e1f20d4a](#screen-e1f20d4a) → [5: 83bba8fd](#screen-83bba8fd) → [6: 99ffee15](#screen-99ffee15) → [7: d6b9a1a7](#screen-d6b9a1a7)

- [ ] **FLOW-d303f5a7 — 33. Replay monthly (6 steps).** Complete and verify the recorded journey.
  - [Open first recorded state](http://127.0.0.1:6431/flows/replay-monthly?step=0). Sequence: [1: 035569a0](#screen-035569a0) → [2: f3fc07c5](#screen-f3fc07c5) → [3: 3fed6760](#screen-3fed6760) → [4: b67b8895](#screen-b67b8895) → [5: 18225175](#screen-18225175) → [6: b0caf02f](#screen-b0caf02f)

- [ ] **FLOW-7cb9228f — 34. Milestone detail (3 steps).** Complete and verify the recorded journey.
  - [Open first recorded state](http://127.0.0.1:6431/flows/milestone-detail?step=0). Sequence: [1: 18225175](#screen-18225175) → [2: cc18744f](#screen-cc18744f) → [3: b5d31893](#screen-b5d31893)

- [ ] **FLOW-bc2a77fc — 35. Home (6 steps).** Complete and verify the recorded journey.
  - `a30a9ee`: Only the authenticated a917d88f to d5173715 carousel/vertical-return segment was added here. The full six-step sequence and visual acceptance remain open. [Measured evidence](reference-review/2026-09-12-sidebar-live.md).
  - [Open first recorded state](http://127.0.0.1:6431/flows/home?step=0). Sequence: [1: e72be564](#screen-e72be564) → [2: aefa8502](#screen-aefa8502) → [3: a917d88f](#screen-a917d88f) → [4: 2f5da478](#screen-2f5da478) → [5: d5173715](#screen-d5173715) → [6: 42098642](#screen-42098642)

- [ ] **FLOW-e7c28ffc — 36. Radio (3 steps).** Complete and verify the recorded journey.
  - [Open first recorded state](http://127.0.0.1:6431/flows/radio?step=0). Sequence: [1: e72be564](#screen-e72be564) → [2: 4cb8f3aa](#screen-4cb8f3aa) → [3: 0920d819](#screen-0920d819)

- [ ] **FLOW-868aa817 — 37. Listening to a live radio (4 steps).** Complete and verify the recorded journey.
  - [Open first recorded state](http://127.0.0.1:6431/flows/listening-to-a-live-radio?step=0). Sequence: [1: 4cb8f3aa](#screen-4cb8f3aa) → [2: a9992e55](#screen-a9992e55) → [3: 47a07865](#screen-47a07865) → [4: 7bd2ef54](#screen-7bd2ef54)

- [ ] **FLOW-4239264b — 38. Live radio schedule (3 steps).** Complete and verify the recorded journey.
  - 2026-09-12 bounded review: All three steps use real controls; LIVE text and 13 entries are asserted. A minor live station-menu versus direct-fixture difference remains. [Evidence and remaining defects](reference-review/2026-09-12-library-panels.md).
  - [Open first recorded state](http://127.0.0.1:6431/flows/live-radio-schedule?step=0). Sequence: [1: a9992e55](#screen-a9992e55) → [2: 37575452](#screen-37575452) → [3: f49fce21](#screen-f49fce21)

- [ ] **FLOW-af293a1e — 39. Recently added (3 steps).** Complete and verify the recorded journey.
  - [Open first recorded state](http://127.0.0.1:6431/flows/recently-added?step=0). Sequence: [1: e72be564](#screen-e72be564) → [2: bdc69b59](#screen-bdc69b59) → [3: e757eb0f](#screen-e757eb0f)

- [ ] **FLOW-9decd1cd — 40. Artists (3 steps).** Complete and verify the recorded journey.
  - 2026-09-12 bounded review: All three Artists steps are exercised continuously, including saved sidebar playlists and real artist selection. [Evidence and remaining defects](reference-review/2026-09-12-library-panels.md).
  - [Open first recorded state](http://127.0.0.1:6431/flows/artists?step=0). Sequence: [1: e72be564](#screen-e72be564) → [2: 0df0d2a2](#screen-0df0d2a2) → [3: 610af644](#screen-610af644)

- [ ] **FLOW-2797b86f — 41. Albums (2 steps).** Complete and verify the recorded journey.
  - 2026-09-12 bounded review: New to Albums is exercised continuously with saved playlist navigation visible. [Evidence and remaining defects](reference-review/2026-09-12-library-panels.md).
  - [Open first recorded state](http://127.0.0.1:6431/flows/albums?step=0). Sequence: [1: e72be564](#screen-e72be564) → [2: 5d3db7ca](#screen-5d3db7ca)

- [ ] **FLOW-0e305ee9 — 42. Songs (2 steps).** Complete and verify the recorded journey.
  - 2026-09-12 bounded review: New to Songs asserts the eight exact source rows in order. [Evidence and remaining defects](reference-review/2026-09-12-library-panels.md).
  - [Open first recorded state](http://127.0.0.1:6431/flows/songs?step=0). Sequence: [1: e72be564](#screen-e72be564) → [2: 92589389](#screen-92589389)

- [ ] **FLOW-c454fe86 — 43. Sorting songs (3 steps).** Complete and verify the recorded journey.
  - 2026-09-12 control review: All three stills are reached continuously with actual sorting and keyboard focus/escape checks. Live menu anchor corrected; font/shadow differences still prevent acceptance. [Exact candidate, evidence and counter-evidence](reference-review/2026-09-12-library-controls.md).
  - [Open first recorded state](http://127.0.0.1:6431/flows/sorting-songs?step=0). Sequence: [1: 92589389](#screen-92589389) → [2: 09b3600e](#screen-09b3600e) → [3: 1d016f0f](#screen-1d016f0f)

- [ ] **FLOW-22c4db47 — 44. Pinning a song (4 steps).** Complete and verify the recorded journey.
  - 2026-09-12 control review: All four stills are reached through actual hover, menu and Pin Song controls, with unpin/favourite isolation checked. Fractional live anchoring was corrected; original typography/icons/shadow remain imperfect. [Exact candidate, evidence and counter-evidence](reference-review/2026-09-12-library-controls.md).
  - [Open first recorded state](http://127.0.0.1:6431/flows/pinning-a-song?step=0). Sequence: [1: 92589389](#screen-92589389) → [2: e9bee76d](#screen-e9bee76d) → [3: 3884ff64](#screen-3884ff64) → [4: 06be9f09](#screen-06be9f09)

- [ ] **FLOW-51ec8869 — 45. Music videos (2 steps).** Complete and verify the recorded journey.
  - 2026-09-12 bounded review: New to Music Videos is exercised through the recorded empty state. [Evidence and remaining defects](reference-review/2026-09-12-library-panels.md).
  - [Open first recorded state](http://127.0.0.1:6431/flows/music-videos?step=0). Sequence: [1: e72be564](#screen-e72be564) → [2: 4e857921](#screen-4e857921)

- [ ] **FLOW-ee643f9f — 46. Made for you (3 steps).** Complete and verify the recorded journey.
  - [Open first recorded state](http://127.0.0.1:6431/flows/made-for-you?step=0). Sequence: [1: e72be564](#screen-e72be564) → [2: 0b0e3fbf](#screen-0b0e3fbf) → [3: e379e3fe](#screen-e379e3fe)

- [ ] **FLOW-b49a8505 — 47. All playlists (2 steps).** Complete and verify the recorded journey.
  - 2026-09-12 bounded review: New to All Playlists is exercised through the real sidebar. [Evidence and remaining defects](reference-review/2026-09-12-library-panels.md).
  - [Open first recorded state](http://127.0.0.1:6431/flows/all-playlists?step=0). Sequence: [1: e72be564](#screen-e72be564) → [2: 8a2a4241](#screen-8a2a4241)

- [ ] **FLOW-c12bd09a — 48. Playlist detail (2 steps).** Complete and verify the recorded journey.
  - 2026-09-12 bounded review: All Playlists to playlist detail uses the real card control. [Evidence and remaining defects](reference-review/2026-09-12-library-panels.md).
  - [Open first recorded state](http://127.0.0.1:6431/flows/playlist-detail?step=0). Sequence: [1: 8a2a4241](#screen-8a2a4241) → [2: a573d1ab](#screen-a573d1ab)

- [ ] **FLOW-14785972 — 49. Adding a suggested song (2 steps).** Complete and verify the recorded journey.
  - 2026-09-12 bounded review: Adding the suggested song updates actual playlist rows. [Evidence and remaining defects](reference-review/2026-09-12-library-panels.md).
  - [Open first recorded state](http://127.0.0.1:6431/flows/adding-a-suggested-song?step=0). Sequence: [1: a573d1ab](#screen-a573d1ab) → [2: 5044abe5](#screen-5044abe5)

- [ ] **FLOW-6f857f3f — 50. Favorite songs (2 steps).** Complete and verify the recorded journey.
  - 2026-09-12 bounded review: Home to Favourite Songs verifies the four recorded favourites. [Evidence and remaining defects](reference-review/2026-09-12-library-panels.md).
  - [Open first recorded state](http://127.0.0.1:6431/flows/favorite-songs?step=0). Sequence: [1: a917d88f](#screen-a917d88f) → [2: bde65d33](#screen-bde65d33)

- [ ] **FLOW-8db5f5fe — 51. Editing library menus (5 steps).** Complete and verify the recorded journey.
  - 2026-09-12 control review: All five controls/checkpoints are exercised without fixture jumping. The original changes catalog/account/library snapshots after its first image; the live flow preserves its starting state. Later source/live residuals remain 34.39–34.86%, so this is NOT a complete visually verified flow. [Exact candidate, evidence and counter-evidence](reference-review/2026-09-12-library-controls.md).
  - [Open first recorded state](http://127.0.0.1:6431/flows/editing-library-menus?step=0). Sequence: [1: e72be564](#screen-e72be564) → [2: f2e44e3b](#screen-f2e44e3b) → [3: ffc18eb8](#screen-ffc18eb8) → [4: 3728aa07](#screen-3728aa07) → [5: e5e8383f](#screen-e5e8383f)

- [ ] **FLOW-079e1da7 — 52. Logging out (3 steps).** Complete and verify the recorded journey.
  - [Open first recorded state](http://127.0.0.1:6431/flows/logging-out?step=0). Sequence: [1: e72be564](#screen-e72be564) → [2: fc5d84bd](#screen-fc5d84bd) → [3: 3731221f](#screen-3731221f)

- [ ] **FLOW-c4422161 — 53. Settings (5 steps).** Complete and verify the recorded journey.
  - [Open first recorded state](http://127.0.0.1:6431/flows/settings?step=0). Sequence: [1: fc5d84bd](#screen-fc5d84bd) → [2: 481cd568](#screen-481cd568) → [3: 1e5b4763](#screen-1e5b4763) → [4: 01f96377](#screen-01f96377) → [5: 44101453](#screen-44101453)

- [ ] **FLOW-d1a98fb1 — 54. Connected accounts (2 steps).** Complete and verify the recorded journey.
  - [Open first recorded state](http://127.0.0.1:6431/flows/connected-accounts?step=0). Sequence: [1: 1e5b4763](#screen-1e5b4763) → [2: b2e0f231](#screen-b2e0f231)

- [ ] **FLOW-29245bc1 — 55. Turning on content restrictions (8 steps).** Complete and verify the recorded journey.
  - [Open first recorded state](http://127.0.0.1:6431/flows/turning-on-content-restrictions?step=0). Sequence: [1: 01f96377](#screen-01f96377) → [2: f99d9583](#screen-f99d9583) → [3: 0da4882b](#screen-0da4882b) → [4: 8b9e8598](#screen-8b9e8598) → [5: 0260ef9f](#screen-0260ef9f) → [6: 5b34ad72](#screen-5b34ad72) → [7: 7437b956](#screen-7437b956) → [8: 6436de36](#screen-6436de36)

- [ ] **FLOW-16a876bc — 56. Canceling a trial (5 steps).** Complete and verify the recorded journey.
  - [Open first recorded state](http://127.0.0.1:6431/flows/canceling-a-trial?step=0). Sequence: [1: 44101453](#screen-44101453) → [2: c0997fe5](#screen-c0997fe5) → [3: fd1c0c71](#screen-fd1c0c71) → [4: 03157020](#screen-03157020) → [5: 603983c7](#screen-603983c7)

- [ ] **FLOW-59b6cb8b — 57. Changing language (5 steps).** Complete and verify the recorded journey.
  - [Open first recorded state](http://127.0.0.1:6431/flows/changing-language?step=0). Sequence: [1: 481cd568](#screen-481cd568) → [2: 50fe374b](#screen-50fe374b) → [3: f4a8b5dc](#screen-f4a8b5dc) → [4: 468b0465](#screen-468b0465) → [5: be864051](#screen-be864051)

- [ ] **FLOW-f5a37141 — 58. Logging in (7 steps).** Complete and verify the recorded journey.
  - [Open first recorded state](http://127.0.0.1:6431/flows/logging-in?step=0). Sequence: [1: 3731221f](#screen-3731221f) → [2: 3131018d](#screen-3131018d) → [3: 417f6129](#screen-417f6129) → [4: 6aa4a9d7](#screen-6aa4a9d7) → [5: 4e65c7c6](#screen-4e65c7c6) → [6: 97de6907](#screen-97de6907) → [7: e027fe6d](#screen-e027fe6d)

## Evidence and update rules

### Fidelity checkpoint - 2026-09-11

- Active branch policy is `main` only. The fidelity batch based on `e166f5b` was checkpointed as `94486db36446c8717e50ccaaff014bdb02054511` after the fresh complete regression passed. `apple-music-clone/.qa/` remains local-only QA scratch space and is not part of the checkpoint.
- Implementation/render coverage is complete: 159/159 saved desktop UI states render and all 218 recorded route states resolve. A fresh complete canonical browser suite after the latest fidelity refinements passed 164 rendered states (159 desktop + 5 mobile samples), 218/218 route states, 16/16 interaction journeys and 0 failures.
- A fresh real-browser hydration check passed on the current source: the root app loaded in Chromium, clicking `Radio` changed the live heading to `Radio`, and the navigation control became `aria-current="page"`.
- Latest canonical difficult-state results: `ee8db412` 12.28% / MAE 8.96; `54b01eab` 11.41% / MAE 7.33; `4811dde3` 11.11%; `d5173715` 10.84% / MAE ~7.80; `8f029018` 10.67%; `8b03c9d0` ~10.18%; `6ac70c34` ~10.04%; `ffc18eb8` ~10.04%; `3728aa07` ~10.03%; `bc773ae9` 9.82%; `898ca766` 9.81%; `32515da3` 9.57%; `7bd2ef54` 9.44% / MAE 6.64; `9b43cccb` 9.28%; `de48a956` 9.10%; `f24fda77` 8.77%; `06a34864` ~4.52%; `c939c9b8` ~4.19%.
- `54b01eab` source now carries the canonical-verified reference-specific inline sidebar glass `blur(18px) saturate(1.15)`. The previous external declaration compiled to `none`; a real browser computed-style check now returns the intended filter. This reduced the canonical full-frame threshold from 11.64% / MAE 7.37 to 11.41% / MAE 7.33.
- Preserve measured fixes: `ee8db412` hidden magenta A-List Pop under natural glass + inline blur + 10px lyric scroll anchor + lyric fade; `d5173715` orange Alex's Station previous card + warm translucent sidebar + measured lobes; `7bd2ef54` seven-lobe ambient correction without foreground rewrite; queue lower-panel reconstruction + 1px content shift + ~0.65px artwork correction + ~3px autoplay lift; article body `letter-spacing: -0.15px`; Artist Singles 207px cards / 20px gaps; red live Add control for `6ac70c34`.
- Checkpoint gates after the fresh suite: `npm run typecheck` passed; `npm run build` passed on Next.js 16.3.4; real Selenium onboarding, logging-in, starting-a-trial, cancellation, passcode and language interactions completed without browser errors. The older standalone `scripts/verify-replay-credits.mjs` runner is currently non-runnable in this checkout because `@playwright/test` is not installed; do not mutate dependencies just to hide that runner mismatch.
- Acceptance counters remain intentionally strict. Do **not** tick any `MATCH-*` merely because `/screen/<id>` renders or has a lower residual, and do **not** tick any `FLOW-*` merely because all route snapshots resolve. MATCH requires exact reference visual verification; FLOW requires the full recorded journey exercised end-to-end with correct transitions.

- The current render pass covers all 159 exact `/screen/<UUID>` states at 1440 px width, using 903 or 904 px application height according to the saved source. It recorded zero page errors, failing HTTP responses or horizontal overflow. Capture output: `C:\Users\radev\AppData\Local\Temp\courses-progress-20260909\renders`.
- Source identity: `6dd47bf1975684ad5505b9a2e56da485a674239d`. Source files were hashed before and after the render pass and did not change. Compact local evidence: `apple-music-clone/.parity-evidence/progress-baseline.json`.
- Type check: `node_modules/.bin/tsc.cmd --noEmit`. Build: `node node_modules/next/dist/bin/next build`. Both passed. The global pnpm wrapper tried an unrelated install and aborted for lack of a terminal; the installed tools were used without replacing dependencies.
- Existing behavior suites remain `scripts/browser-reference.py` and `scripts/verify-replay-credits.mjs`. Their older saved results are not silently promoted to full-flow acceptance for this checkpoint.
- Before checking MATCH, record the implementation commit, viewport and comparison evidence on that item. Before checking FLOW, record the commit and actual first-to-last interaction evidence on that item. Preserve checked work across sessions; reopen only a demonstrated regression.
- Validate inventory and print separate progress counts with `node apple-music-clone/scripts/check-task-coverage.mjs` from the repository root. This validation never ticks boxes or changes the frozen archive.

## Deferred courses-product backlog

Everything below belongs to the eventual courses product. It is deferred until the owner accepts the Apple Music clone; old planning status is not the current clone implementation status.

<details>
<summary>Show the preserved courses-product backlog</summary>

## Planning and first UI

| ID | Task | Status | Dependencies / acceptance |
| --- | --- | --- | --- |
| PLAN-004 | Refresh reference audit and simplify canonical docs | DOCUMENTED | Updated archive preserved; product, architecture, domain, workflow and build handoff revised without product code or provisioning |
| REF-001 | Catalog-wide visual review | PARTIAL | 17 identities viewed: 16 high-resolution + one standard original; exact ledger rows. Metadata counts for all 58 flows checked. Remaining 142 images and full recording playback are not marked reviewed. |
| REF-002 | Source/state review for the assigned UI family | READY | Use existing ledger anchors; open exact local originals, verify needed measurements/state, record course adaptation. No redownload or prototype-derived guessed mapping. |
| BOOT-001 | Initialize new `web/` application | READY TO ASSIGN | Owner adopts baseline and assigns task; official CLI/help/version record; minimal Next/TS/Tailwind/lint/pnpm; pinned runtime/lockfile; actual type/lint/build/smoke |
| UI-001 | Learner shell and Home | TODO | BOOT-001 + relevant REF-002 (VIS-05/06/07). 390/1440 fixture UI, original/licensed assets, meaningful navigation, loading/empty/error, keyboard/screenshots. Unbuilt destinations clearly unavailable, not 404/fake-success. |
| UI-002 | Course detail and explicit preview | TODO | Reviewed UI-001 direction + VIS-02. Outcome/creator/offer/curriculum; locked/owned/resume variants; no fake checkout; responsive evidence |
| UI-003 | Lesson workspace and Library fixtures | TODO | UI-002 + VIS-09/11/12/13/15. Licensed sample, curriculum/back/next, study states, enrolled vs saved; no backend claims |
| UI-004 | Search/category and creator fixtures | TODO | Reviewed UI-001 + VIS-03/08/10/14. URL search/filter, useful results/empty/error, creator links; no invented popularity |
| SLICE-000 | Accept M0 discover → course → lesson | TODO | UI-001–003. Works locally without provider credentials; actual browser/keyboard evidence and owner review |

The initial handoff assigns only BOOT-001, the relevant REF-002 and UI-001. It does not require every image, all-page mockups, future table scaffolding, or the rest of M0 in one commit. Local reference re-opening is for the actual implementation state, not restarting this audit.

## M1 — real free-course alpha

| ID | Task | Status | Depends on | Acceptance |
| --- | --- | --- | --- | --- |
| DB-001 | Local schema, owner permissions, RLS, seed/types | TODO | BOOT-001 | Only current slice tables; constraints/grants; anonymous/two-learner/two-creator negative tests, not service-key-only queries |
| AUTH-001 | OTP and verified server identity | TODO | DB-001 | Safe return, expiry/resend/rate limits, cookie/private-cache checks; no self-assigned ownership/operator status |
| CAT-001 | Safe real catalog queries | TODO | DB-001, UI-001/002 | Published metadata/creator/curriculum; no paid/draft payload in HTML/RSC/API/search; direct URLs/unavailable states |
| CAT-002 | Real category/search queries | TODO | CAT-001, UI-004 | Bounded indexed queries, pagination, URL filters and honest empty/error |
| STUDIO-001 | Draft metadata/curriculum editor | TODO | DB-001, AUTH-001 | Small tabbed editor, stable lesson IDs, keyboard reorder, version-checked saves; ownership/submitted-lock tests and visual review |
| MEDIA-001 | Direct video ingest/private resources | TODO | STUDIO-001, test setup assigned | Ownership/quota/type checks, verified processing/captions, retries, private storage, wrong-workspace denial |
| PUBLISH-001 | Minimal operator review/locked publishing | TODO | STUDIO-001, MEDIA-001 | Submit exact version; approve/reject reasons; published/unlisted edit lock; atomic audited correction; no CMS revision engine |
| ACCESS-001 | Free grants/shared lesson access | TODO | DB-001, AUTH-001, CAT-001 | Idempotent grant; explicit preview; suspension/unlisting; consistent video/text/transcript/resource protection |
| LEARN-001 | Real lesson/library/progress | TODO | ACCESS-001, MEDIA-001, UI-003 | Resume/rewind/completion/version conflicts, protected payloads and tokens; actual browser/mobile playback evidence |
| SLICE-001 | Complete free-course journey | TODO | PUBLISH-001, LEARN-001, CAT-002 | Test creator publishes, another learner discovers/enrolls/learns/leaves/resumes; adversarial checks recorded |

Curated creator/operator setup can be intentionally small/manual; ownership and review enforcement cannot be pretend. Do not install or provision commerce vendors during DB-001. Only the needed tables from the logical model belong in each migration.

## M2 — commerce and paid-pilot support

| ID | Task | Status | Depends on | Acceptance |
| --- | --- | --- | --- | --- |
| PAY-001 | Business/charge decision and sandbox Connect | BLOCKED_DECISION | Actual entity/model, DB-001 | Merchant/account/country/fee/refund responsibility; selected API model; hosted onboarding/readiness; no live activation |
| PAY-002 | Orders and hosted Checkout | TODO | PAY-001, ACCESS-001 | Server price/terms, immutable snapshots, in-flight concurrency, idempotency and uncertain-session recovery |
| PAY-003 | Atomic webhook fulfillment and reconciliation | TODO | PAY-002 | Signature/environment/account; durable effect before ack; rollback/retry/duplicate/out-of-order tests; measured latency/queue trigger; no custom outbox/worker framework |
| PAY-004 | Refund/dispute/source-grant handling | TODO | PAY-003, approved policy | Current provider state, correct fee/transfer treatment, partial/full distinction, other grants retained; stale paid event cannot restore refunded access |
| LEARN-002 | Private notes | TODO | LEARN-001 | Author-only text/timecode, version conflict/retry, own export after access loss; creator-negative test |
| SOCIAL-001 | Lesson questions/replies/reports | TODO | LEARN-001, reviewed design | Entitled course context, one reply level, creator response, operator hide/report; no realtime/feed/notification bus |
| OPS-001 | Minimal purchase/access/report support | TODO | PAY-004, SOCIAL-001 | Restricted diagnosis/reconcile/provider links, reasons/audit, useful contact path; no finance/SQL/job dashboard clone |
| SETTINGS-001 | Profile/purchases/help/privacy requests | TODO | AUTH-001, PAY-004 | Own receipts/support, safe profile edits, verified data-request workflow and actual policy copy |
| SLICE-002 | Paid lifecycle verification | TODO | PAY-004, LEARN-002, SOCIAL-001, OPS-001 | Sandbox buy→confirm→grant→learn→refund; callback outage/replay, malicious IDs and stale events tested |

Custom email campaigns, creator spaces/reviews/follows and team management are not paid-pilot dependencies. Production auth email delivery and a working support process still are.

## Pilot and release

| ID | Task | Status | Required evidence |
| --- | --- | --- | --- |
| TRUST-001 | Commercial/privacy/asset-rights review | TODO | Actual entity/markets, provider eligibility, merchant/tax/refunds/access, age, retention, rights and support owner |
| QA-001 | Visual/responsive/accessibility acceptance | TODO | Reviewed course screens, 320px/tablet/wide/zoom, keyboard/captions, real iOS/Android checks; residual issues explicit |
| QA-002 | Security/reliability acceptance | TODO | SLICE-002; API/RLS/cache/upload/payment negative tests, secret/dependency review |
| OPS-002 | Monitoring/budgets/restore/recovery | TODO | Quotas/alerts, named operator, daily reconciliation, tested restore and migration-compatible rollback |
| CONTENT-001 | Curated real course supply | TODO | Consent/licensed media/covers, useful curriculum/captions/previews, truthful claims |
| PILOT-001 | Controlled usability/business pilot | TODO | QA-001/002 + OPS-002 + CONTENT-001 + TRUST-001; observe find/evaluate/start/resume/publish and actual costs/support |
| LAUNCH-001 | Production/live-payment release | BLOCKED_DECISION | Required pilot gates and explicit owner approval; separate configuration, no fake data, support/rollback ready |

## Deferred, not scaffold instructions

Memberships, bundles, global subscription, multi-seller carts, affiliates, rich course versioning, teams, spaces/feeds, reviews/follows, live sessions, DMs, assessments, AI tutors, native/offline, dedicated search and managed job infrastructure each need a demonstrated need and a bounded new assignment.

## Evidence format

Record ID; date/assignee; explicit assignment; starting commit; scope; changed files/commit; actual checks/results; source/design evidence; status; blockers; next task. Fixtures are not backend completion, provider sandbox is not live eligibility, and documents are not visual approval. Parallel tasks need nonconflicting file ownership and settled shared contracts.

Historical PLAN-001–003/FOUND/UX/global mockup gates and outbox-oriented tasks remain in Git history. This is the current backlog. UI-001–004 replace the all-page design prerequisite; PAY-003 replaces the earlier custom-worker proposal.

</details>
