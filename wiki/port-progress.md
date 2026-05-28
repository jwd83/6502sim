---
title: Port Progress
updated: 2026-05-28
tags:
  - port
  - status
  - apple-ii
  - emulator
---

# Port Progress

## Snapshot

The port now opens directly into the actual disk experience. [index.html](../index.html) embeds the vendored [Apple2TS runtime](../apple2ts/) and mounts [MECC-T691 Apple Assembly Language v1.0.dsk](<../MECC-T691 Apple Assembly Language v1.0.dsk>) from the repository.

The earlier hand-built 6502 simulator recreation has been removed from the active app. The project is now oriented around running the original disk in a real browser Apple II emulator rather than maintaining a separate visual approximation.

## Implemented

- Single static [index.html](../index.html) page for the Apple2TS-backed emulator experience.
- Vendored [apple2ts/](../apple2ts/) runtime configured for embedded mode, Apple II Plus machine mode, green screen, normal speed, sound off, and dark theme.
- Local `.dsk` fetch and `loadDisk` `postMessage` flow for mounting the supplied disk image.
- `Reload Disk` control for remounting the local image.
- Same-origin message support in the vendored Apple2TS bundle, covering local HTTP and the deployed `6502.jwd.me` origin.
- Startup API and Web MIDI probes disabled in the vendored bundle because they are not needed for this static disk page.
- Node smoke test harness in [tests/smoke.js](../tests/smoke.js), covering main-page emulator wiring and disk-image size.

## Partial Or Prototype Areas

- The page should be served over HTTP from `localhost`; direct `file://` use is not the supported path.
- The smoke harness is static. It confirms wiring, but it does not yet automate a browser-level iframe mount check.
- Fresh browser screenshots of the vendored Apple2TS page have not yet been captured.

## Evidence From Source Artifacts

- The supplied disk image remains the active source artifact for the running experience.
- The reference contact sheet in [frames/contact-sheet-01.jpg](../frames/contact-sheet-01.jpg) shows the original flow: title, catalog, load prompt, CPU diagram, trace/disassembly view, BASIC program material, and example simulator runs.
- The selected reference frames show key moments: load/type prompt ([t0130.jpg](../frames/t0130.jpg)), CPU diagram while tracing ([t0230.jpg](../frames/t0230.jpg)), catalog and BRUN behavior ([t0600.jpg](../frames/t0600.jpg)), and BASIC program text ([t0800.jpg](../frames/t0800.jpg)).

## Current Assessment

The simplest and most faithful active path is now the main one: boot the actual MECC disk in a local Apple2TS copy. Future work should harden browser-level verification and keep the vendored runtime patch notes current.

See [Implementation Map](implementation-map.md) for technical organization and [Next Steps](next-steps.md) for the likely path forward.
