---
title: Main Emulator Page
updated: 2026-05-27
tags:
  - implementation
  - emulator
  - disk
  - apple-ii
---

# Main Emulator Page

[index.html](../index.html) is the browser entrypoint. It embeds [Apple2TS](https://apple2ts.com/) in an iframe and mounts the supplied disk image, [MECC-T691 Apple Assembly Language v1.0.dsk](<../MECC-T691 Apple Assembly Language v1.0.dsk>), by sending the disk bytes to Apple2TS with `postMessage`.

## Implemented Behavior

- The page creates an Apple2TS iframe with default URL parameters for embedded mode, Apple II Plus machine mode, green display color, normal speed, sound off, and dark theme.
- The parent page fetches the local `.dsk` file from the repo and sends a `loadDisk` message containing a `Uint8Array` to the Apple2TS iframe.
- Loopback `127.0.0.1` and `::1` URLs are redirected to `localhost`, because the current Apple2TS message handler accepts `localhost` origins for local embedding.
- `Reload Disk` remounts the local disk image.

## Notes

The previous hand-built recreation was removed from [index.html](../index.html). The active app now favors direct execution of the source disk image over maintaining a separate approximation.

Because Apple2TS is loaded in a remote iframe, this page needs network access. Because browser `fetch()` is used to retrieve the disk image from the repo, the page should be served over HTTP from `localhost` for normal use rather than opened directly from `file://`.
