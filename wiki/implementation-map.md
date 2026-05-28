---
title: Implementation Map
updated: 2026-05-27
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
- Apple2TS is embedded from `https://apple2ts.com/` with URL parameters for embedded mode, Apple II Plus machine mode, green display color, normal speed, sound off, and dark theme.
- The page redirects loopback `127.0.0.1` and `::1` URLs to `localhost`, because the current Apple2TS message handler accepts local embedding from `localhost`.
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

## Removed Recreation

The previous hand-built recreation, mini assembler, scoped 6502 executor, Phaser CPU diagram, and catalog-only disk parser have been removed from the active `index.html`. Their behavior remains documented historically in [wiki/log.md](log.md) and visible in prior screenshots under [frames/](../frames/).

## Verification State

Current verification includes [tests/smoke.js](../tests/smoke.js), a dependency-free Node harness that checks:

- [index.html](../index.html) embeds Apple2TS.
- [index.html](../index.html) sends the `loadDisk` message.
- [index.html](../index.html) references the supplied MECC disk image.
- The supplied disk image remains 143,360 bytes.
- The removed `disk.html` page and old recreation code are not present.

Manual browser verification on 2026-05-27 confirmed [index.html](../index.html) served from `localhost` reaches `Mounted MECC-T691 Apple Assembly Language v1.0.dsk (143360 bytes).`
