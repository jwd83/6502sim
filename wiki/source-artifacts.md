---
title: Source Artifacts
updated: 2026-05-27
tags:
  - sources
  - evidence
  - artifacts
---

# Source Artifacts

## Current Implementation

- [index.html](../index.html) - 299-line static Apple2TS iframe/bootstrap page that mounts the provided disk image by `postMessage`.
- [tests/smoke.js](../tests/smoke.js) - Dependency-free Node smoke harness for main-page emulator wiring and disk-image size.
- [frames/app-smoke.png](../frames/app-smoke.png) and [frames/app-smoke-2.png](../frames/app-smoke-2.png) - historical screenshots of the removed recreation app at 1440x900.

## Original/Reference Artifacts

- [video-6502-emulator.mp4](../video-6502-emulator.mp4) - Reference recording, 1280x720, H.264/AAC, about 749.7 seconds.
- [frames/contact-sheet-01.jpg](../frames/contact-sheet-01.jpg) - Contact sheet built from the reference recording. It shows title/catalog screens, prompts, CPU diagram states, disk catalog screens, BASIC/lesson material, and example simulator runs.
- [frames/t0130.jpg](../frames/t0130.jpg) - Reference frame showing the "load from disk" and "type in some code" prompt flow.
- [frames/t0230.jpg](../frames/t0230.jpg) - Reference frame showing the original CPU diagram while tracing around `$0602`.
- [frames/t0600.jpg](../frames/t0600.jpg) - Reference frame showing disk catalog output and `BRUN THE 6502 SIMULATOR` error behavior.
- [frames/t0800.jpg](../frames/t0800.jpg) - Reference frame showing BASIC source text from supporting course material.
- [MECC-T691 Apple Assembly Language v1.0.dsk](<../MECC-T691 Apple Assembly Language v1.0.dsk>) - Apple DOS 3.3 disk image, 35 tracks, 16 sectors, 256 bytes per sector.

## Disk Catalog Snapshot

Using the app's current parser filters, the disk image exposes 33 visible catalog entries:

```text
* A 020 HELLO
* B 028 THE 6502 SIMULATOR
* B 009 STEP AND TRACE
* A 004 MINI-ASSM.INFO
* B 003 MINI-ASSEMBLER
* A 004 EDASM.INFO
* A 003 EDASM
* B 008 EDASM.OBJ
* B 036 ASSM
* B 016 EDITOR
  B 002 ASMIDSTAMP
* A 005 BINARY FILE INFO
* B 004 BINFO
* B 013 CONVERT
* A 005 EXAMPLES
* T 003 EX4
* B 002 EX4.OBJ0
* T 003 EX6
* B 002 EX6.OBJ0
* B 002 EX7.OBJ0
* B 002 EX8.OBJ0
* T 003 EX9
* B 002 EX9.OBJ0
* T 005 EX13
* B 002 EX13.OBJ0
* T 003 EX15
* B 002 EX15.OBJ0
* B 002 EX20.OBJ0
* B 002 EX24.OBJ0
* B 002 EX26.OBJ0
* B 002 EX30.OBJ0
* T 008 EX33
* B 002 EX33.OBJ0
```

## Notes For Future Ingest

- Keep the disk image, video, and extracted frames immutable unless the user explicitly asks to regenerate or replace them.
- If more frames are extracted from the video, add them to this page with the timestamp and what behavior they capture.
- If disk file extraction is implemented, create a dedicated wiki page for DOS 3.3 file layout and track which catalog entries have been decoded.
