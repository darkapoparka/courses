# Platform UI contract

Read `../../../docs/style.md` and `../../../docs/design.md`. Preserve the floating 232px sidebar, 8px inset, 22px corners, quiet material, editorial hierarchy and restrained accent. These are adaptation tokens, not Apple's private CSS.
Use the owning components and `platform.module.css`; no global overrides, copied reference assets, proprietary fonts or competing component kit. Add meaningful variants rather than duplicated screen-specific forks.
Client code owns actual interaction only. Distinguish save, start, completion, enrollment and purchase. Label all current browser activity as a local preview; never imply public posting or account persistence.
Use native semantic controls, labels, current/pressed state, visible focus and status/error announcements. Preserve drafts after failed saves; render community text as text. Respect reduced motion/transparency and narrow layouts.
Before changing shared material capture before/after and verify production computed values; keep standard backdrop declarations after prefixed ones. Run the platform unit/browser checks and six-width containment. Global/music changes also require full reference verification.
