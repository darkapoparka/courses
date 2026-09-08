# Apple Music Web reference clone

Incomplete initial prototype plus the downloaded Apple Music Web reference library. The prototype has not passed 1:1 verification. Implementation is paused; Astra will handle later implementation under the owner's direction.

## Run

```powershell
pnpm install
pnpm exec next dev --hostname 127.0.0.1 --port 6431
```

Preview: http://127.0.0.1:6431/

Useful checks:

```powershell
pnpm typecheck
pnpm build
pnpm inventory:screen-status
```

## Coverage and limits

- The authenticated reference pass recorded 159 screens and 58 flows.
- All 159 collected screen IDs have local `/screen/<id>` routes and deterministic DOM variants.
- Three flow sequences were represented in the initial prototype: Onboarding (10 steps), Starting a trial (10), and New (5). Their fidelity is unverified.
- Reference acquisition is now complete: all 159 screen images and all 58 flow records with 218 ordered screenshots, plus 13 available animations/recordings, are saved under `reference/originals/`. The earlier claim that 55 flows were inaccessible was incorrect. Open `reference/originals/index.html` for the local reference library.
- Account, payment, booking, audio, and external-service behavior is local fixture behavior only; no external writes or deployment are configured.
- Exact screenshot parity is intentionally tracked as open in `reference/screen-status.md` and `reference/QA.md` until each accessible reference state has been compared individually.
