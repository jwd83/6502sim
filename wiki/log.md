---
title: Wiki Log
updated: 2026-05-27
tags:
  - log
  - wiki
---

# Wiki Log

## [2026-05-27] implementation | Promoted actual-disk emulator to index

Replaced the old hand-built recreation in [index.html](../index.html) with the Apple2TS-backed disk page and removed `disk.html`. The main page now embeds Apple2TS directly, fetches [MECC-T691 Apple Assembly Language v1.0.dsk](<../MECC-T691 Apple Assembly Language v1.0.dsk>), and sends it into the iframe with the `loadDisk` message path. Simplified [tests/smoke.js](../tests/smoke.js) so it verifies the main page's emulator wiring, disk reference, disk-image size, and absence of the removed recreation code.

Evidence inspected:

- [index.html](../index.html), now a 299-line Apple2TS iframe/bootstrap page.
- [tests/smoke.js](../tests/smoke.js), now a 26-line static wiring smoke test.
- Browser status at `http://localhost:8765/`, confirming `Mounted MECC-T691 Apple Assembly Language v1.0.dsk (143360 bytes).`

## [2026-05-27] implementation | Added actual-disk emulator page

Added [disk.html](../disk.html) as a second browser entrypoint that embeds Apple2TS and mounts [MECC-T691 Apple Assembly Language v1.0.dsk](<../MECC-T691 Apple Assembly Language v1.0.dsk>) by sending the local disk bytes to the iframe with Apple2TS's `loadDisk` message path. Added an `Actual Disk` link from [index.html](../index.html), extended [tests/smoke.js](../tests/smoke.js) to cover the new page wiring, and documented the split between the scoped recreation and real-emulator view.

Evidence inspected:

- [disk.html](../disk.html), 311-line static Apple2TS iframe/bootstrap page.
- [index.html](../index.html), now a 2076-line static recreation app with a link to the actual-disk page.
- [tests/smoke.js](../tests/smoke.js), now checking both seeded CPU/assembler behavior and disk-page wiring.
- Apple2TS web app help and deployed bundle behavior from [apple2ts.com](https://apple2ts.com/), confirming `.dsk` support, `appmode=embed`, machine/color/speed parameters, and the local `loadDisk` message handler.

## [2026-05-27] implementation | Cleaned simulator UI layout and animation

Reworked the browser UI pass in [index.html](../index.html) so the shell keeps stable desktop, tablet, and mobile widths; the top-level grid no longer expands to the Phaser canvas's intrinsic width; and the mobile toolbar uses a two-column control grid. Rebuilt the Phaser CPU diagram alignment with centered value labels, cleaner component geometry, and state-driven highlights. The prior always-on animation loop was replaced with redraws on state changes plus restrained bus pulses only while running.

Evidence inspected:

- [index.html](../index.html), now a 2061-line static HTML/JavaScript app.
- [tests/smoke.js](../tests/smoke.js), still passing after the UI pass.
- Browser screenshots at desktop, tablet, and mobile viewports, plus a `Step` interaction check that updated the monitor, status line, and diagram.

## [2026-05-27] implementation | Aligned `LDX abs` and added smoke coverage

Updated the current browser implementation so assembler-emitted `LDX abs` (`0xAE`) is present in opcode metadata, disassembly/operand formatting, and CPU execution. Added [tests/smoke.js](../tests/smoke.js) as the first dependency-free Node smoke harness; it checks all seeded source listings against their embedded byte fixtures and verifies that an assembled `LDX` absolute instruction loads X, advances PC, and updates flags.

Evidence inspected:

- [index.html](../index.html), now a 1972-line static HTML/JavaScript app.
- [tests/smoke.js](../tests/smoke.js), 102-line Node smoke harness.
- [Port Progress](port-progress.md), [Next Steps](next-steps.md), [Implementation Map](implementation-map.md), and [Source Artifacts](source-artifacts.md), updated to remove the stale opcode-alignment gap and record the new verification path.

## [2026-05-26] documentation | Initial port progress wiki

Created the project wiki scaffold for the Apple ][ 6502 Simulator port. Documented the current browser recreation in [Port Progress](port-progress.md), mapped implementation areas in [Implementation Map](implementation-map.md), inventoried evidence in [Source Artifacts](source-artifacts.md), and captured follow-up work in [Next Steps](next-steps.md).

Evidence inspected:

- [index.html](../index.html), 1965-line static HTML/JavaScript app.
- [MECC-T691 Apple Assembly Language v1.0.dsk](<../MECC-T691 Apple Assembly Language v1.0.dsk>), Apple DOS 3.3 disk image with 33 catalog entries after applying the app's parser filters.
- [video-6502-emulator.mp4](../video-6502-emulator.mp4), 1280x720 reference recording, about 749.7 seconds.
- [frames/](../frames/), including the contact sheet, selected reference frames, and current app smoke screenshots.
