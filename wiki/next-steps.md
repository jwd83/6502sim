---
title: Next Steps
updated: 2026-05-28
tags:
  - roadmap
  - port
  - todo
---

# Next Steps

## Near Term

1. Add an automated browser check that serves the repo, opens [index.html](../index.html), and verifies the footer reaches the mounted-disk status.
2. Capture fresh screenshots of the new Apple2TS-backed main page and mark the older recreation screenshots as historical.
3. Document the expected local serving command in a README if this repo gets one.
4. Revisit the vendored Apple2TS runtime only when a specific upstream bug fix or compatibility need appears.

## Emulator Integration

1. Keep the `loadDisk` message path small and explicit so it is easy to update if Apple2TS changes its embedding API.
2. Consider exposing only the minimum controls needed around the iframe; Apple2TS already owns the emulator UI.
3. Track any Apple2TS-specific compatibility issues against the supplied disk image.

## Research And Preservation

1. Preserve the disk image, reference video, and extracted frames as source evidence.
2. If lesson behavior needs documentation, use the running Apple2TS disk as primary evidence and compare against the reference frames/video.
3. Keep historical notes about the removed recreation in the wiki log rather than treating them as current implementation behavior.

## Maintainability

1. Keep [index.html](../index.html) as a small static bootstrap page unless the integration grows enough to justify modules.
2. Keep [tests/smoke.js](../tests/smoke.js) focused on guarding the main-page boot wiring.
3. Keep [apple2ts/README.md](../apple2ts/README.md) updated whenever the vendored Apple2TS bundle is refreshed or patched.
4. Keep this wiki updated after each meaningful porting pass.
