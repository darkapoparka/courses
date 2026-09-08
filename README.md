# Courses

Local Mobbin reference library and an unapproved initial Next.js prototype for a future course and community product.

## Saved references

Open [the local reference index](apple-music-clone/reference/originals/index.html) after cloning this repository. The library contains 159 screen images, all 58 flow sequences with 218 ordered step images, and 13 available animations/recordings. Source watermarks are preserved. See [capture details](apple-music-clone/reference/originals/README.md) and [file validation](apple-music-clone/reference/originals/verification.json).

## Prototype

The existing prototype under `apple-music-clone/` is incomplete and has not passed 1:1 reference verification. It was built before the reference download was complete. Implementation is paused; future implementation is reserved for Astra under the owner's direction. Earlier QA/inventory notes describe the initial attempt and are superseded by the completed capture under `reference/originals/`.

To inspect the existing prototype:

```sh
cd apple-music-clone
pnpm install --frozen-lockfile
pnpm exec next dev --hostname 127.0.0.1 --port 6431
```

Open http://127.0.0.1:6431/. This commit is an archive of the current source and references, not a product release or deployment.
