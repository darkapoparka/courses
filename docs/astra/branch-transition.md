# Adopting astra-pro without losing local work

## Recorded starting state

The owner authorized `astra-pro` on 2026-09-12. It was created on GitHub from `289c049cc3e198baa762cd89850f744e80e99ff2`. The Windows checkout `J:\courses-astra-preview` remained on `main`; four tracked UI files were modified and two station-artwork files were untracked. See [handoff](../handoff.md) for names. The remote device disconnected before any local writes or switch.

Those files are not present in the new branch merely because its base is current committed main. Reinspect live state; another session may have changed or committed them. Do not follow a generic checkout/pull command that assumes a clean tree.

## Preserving adoption procedure

1. Inspect current branch, HEAD, status, staged/unstaged diffs, untracked files, worktrees, remotes and current incoming/outgoing commits. Record the actual paths and ownership. Do not reset, clean, overwrite or stash-and-forget anything.
2. Fetch the known `main` and `astra-pro` refs without merging. Compare actual ancestry and inspect any new remote commits. This branch's docs are not authority to merge the unrelated historical course implementation.
3. Prefer a separate worktree on a verified existing disk with sufficient space, leaving the owner's dirty preview checkout untouched. A possible location is `D:\courses-astra-pro`, but its availability was not verified. Check whether the local `astra-pro` branch/path already exists before creating anything; never create another fallback branch automatically.
4. Reconcile the unpublished implementation deliberately. Review a lossless tracked diff and the actual untracked files, or use their subsequently verified coherent commit. Incorporate only the intended changes into the authorized branch after checking source identity, dependencies and conflicts. Record provenance. Do not blindly copy `.next`, dependencies, evidence, secrets or the reference archive, or claim copied work is tested.
5. Run the relevant runtime and visual/flow checks on the reconciled candidate. Preserve the original work until its successful incorporation is verified. Do not delete another session's files or evidence as cleanup.
6. Before the first application-code checkpoint on `astra-pro`, extend the existing reference workflow to this branch without weakening its coverage and observe the actual run. The docs workflow alone is not application verification. Continue future coherent work on `astra-pro`, with no branch proliferation or automatic merge to `main`.

## Server and storage boundaries

A new worktree has its own dependency/build/output identity. Do not assume the existing listener serves it. Use a verified unused loopback port, check the command line, browse it and identify the actual build. Leave the owner's established preview and unrelated port 3000 alone. Avoid concurrent builds into one `.next` directory.

Some historical J: evidence directories are junctions to D: backing storage. Check and preserve both; a junction is not disposable duplicate data. Do not choose a disk or delete files based on an old free-space assumption.

## When tools are unavailable

Use authorized GitHub reads/writes for documentation or committed-source tasks that do not depend on the missing local changes. State what is not included and what cannot be verified. Do not silently continue frontend edits against an older remote baseline while calling them the latest local implementation. No current document authorizes bypassing a denied connection.
