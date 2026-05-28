---
title: Implementation Map
updated: 2026-05-28
tags:
  - implementation
  - architecture
  - apple-ii
  - emulator
---

# Implementation Map

The current implementation is a single static browser entrypoint: [index.html](../index.html).

## Runtime Shape

- [index.html](../index.html) defines a compact shell with a header, `Reload Disk` control, full-page Apple2TS iframe, and footer status line.
- Apple2TS is vendored under [apple2ts/](../apple2ts/) and embedded from the same origin with URL parameters for embedded mode, Apple II Plus machine mode, green display color, normal speed, sound off, and dark theme.
- The vendored Apple2TS bundle preserves the upstream static runtime and license, with local patches documented in [apple2ts/README.md](../apple2ts/README.md).
- The vendored bundle accepts the current `window.location.origin` for `loadDisk` messages, so the deployed `6502.jwd.me` parent can mount the local disk image.
- The page should be served over HTTP rather than opened directly from `file://`, because it fetches the local disk image before sending it into the iframe.

## Disk Mount Flow

[index.html](../index.html) boots the provided disk in Apple2TS:

1. Load the Apple2TS iframe.
2. Fetch [MECC-T691 Apple Assembly Language v1.0.dsk](<../MECC-T691 Apple Assembly Language v1.0.dsk>) from the repository.
3. Send a `loadDisk` `postMessage` to the Apple2TS iframe with the disk filename and `Uint8Array` bytes.
4. Repeat the message a few times to tolerate iframe startup timing.
5. Update the footer status with the mounted byte count.

The supplied disk image is a 143,360-byte Apple DOS 3.3 image.

## UI Behavior

- `Reload Disk` refetches the local `.dsk` and sends it into Apple2TS again.
- The footer reports loading, mounted, or error states.
- The Apple2TS iframe provides the actual Apple II execution, video, keyboard, disk, ROM, and emulator controls.
- The vendored startup build does not load the cloud-provider helper scripts, request Web MIDI on page load, or call the unavailable `/api/client/connect` endpoint.

## Removed Recreation

The previous hand-built recreation, mini assembler, scoped 6502 executor, Phaser CPU diagram, and catalog-only disk parser have been removed from the active `index.html`. Their behavior remains documented historically in [wiki/log.md](log.md) and visible in prior screenshots under [frames/](../frames/).

## Verification State

Current verification includes [tests/smoke.js](../tests/smoke.js), a dependency-free Node harness that checks:

- [index.html](../index.html) embeds Apple2TS.
- [index.html](../index.html) uses the vendored [apple2ts/](../apple2ts/) runtime rather than `https://apple2ts.com/`.
- [index.html](../index.html) sends the `loadDisk` message.
- [index.html](../index.html) references the supplied MECC disk image.
- The vendored Apple2TS bundle trusts same-origin parents and has the startup API/MIDI probes disabled.
- The supplied disk image remains 143,360 bytes.
- The removed `disk.html` page and old recreation code are not present.

Manual browser verification on 2026-05-28 confirmed [index.html](../index.html) served from `localhost:8766` reaches `Mounted MECC-T691 Apple Assembly Language v1.0.dsk (143360 bytes)` with no `requestMIDIAccess`, untrusted-origin, or `/api/client/connect` console messages.
