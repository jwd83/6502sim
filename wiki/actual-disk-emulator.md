---
title: Main Emulator Page
updated: 2026-05-28
tags:
  - implementation
  - emulator
  - disk
  - apple-ii
---

# Main Emulator Page

[index.html](../index.html) is the browser entrypoint. It embeds the vendored [Apple2TS runtime](../apple2ts/) in an iframe and mounts the supplied disk image, [MECC-T691 Apple Assembly Language v1.0.dsk](<../MECC-T691 Apple Assembly Language v1.0.dsk>), by sending the disk bytes to Apple2TS with `postMessage`.

## Implemented Behavior

- The page creates a same-origin Apple2TS iframe with default URL parameters for embedded mode, Apple II Plus machine mode, green display color, normal speed, sound off, and dark theme.
- The parent page fetches the local `.dsk` file from the repo and sends a `loadDisk` message containing a `Uint8Array` to the Apple2TS iframe.
- The vendored Apple2TS bundle accepts the current `window.location.origin` for parent messages, fixing the deployed `6502.jwd.me` same-origin embed case.
- The vendored startup build disables the automatic client API connection and Web MIDI permission request that are not required for this disk page.
- `Reload Disk` remounts the local disk image.

## Notes

The previous hand-built recreation was removed from [index.html](../index.html). The active app now favors direct execution of the source disk image over maintaining a separate approximation.

Because browser `fetch()` is used to retrieve the disk image from the repo, the page should be served over HTTP for normal use rather than opened directly from `file://`.
