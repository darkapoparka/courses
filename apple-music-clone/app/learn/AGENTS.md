# Learning route contract

Follow the root/app contracts and `../../../docs/design.md`. Keep routes in this application; do not replace the music entry points.
Use Server Components for public reads and server-selected lesson bodies. Await current Next route/search parameters; validate identifiers and query values. Not-found and locked states need a useful recovery route.
Keep public metadata separate from protected lesson content. Client islands receive only safe fields/IDs. A hidden element, client role or browser bookmark does not authorize a read or action.
Use `components/platform` and its CSS module. Loading/error/not-found states must inherit the same shell and focus behavior, not a default dashboard template.
New routes need real navigation, keyboard, narrow-width, direct-URL and invalid-ID tests. Keep metadata honest and the current preview non-indexable; no public release or live transactions without approval.
