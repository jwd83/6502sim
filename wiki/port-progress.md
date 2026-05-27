---
title: Port Progress
updated: 2026-05-27
tags:
  - port
  - status
  - apple-ii
  - 6502
---

# Port Progress

## Snapshot

The port currently exists as a self-contained browser recreation in [index.html](../index.html). It recreates the visible experience of the MECC Apple Assembly Language v1.0 "Apple ][ 6502 Simulator" rather than booting a complete Apple II environment.

The current app has enough behavior to load selected example programs, step or run a scoped 6502 execution model, show registers and memory in a Phaser-rendered CPU diagram, assemble a limited subset of 6502 source, and display the catalog from the provided disk image.

## Implemented

- Browser app shell with monitor, simulator canvas, source editor, trace/catalog tabs, run controls, speed control, and responsive layout.
- Phaser CPU diagram that mirrors the reference visual language: green-on-black schematic, status flags, accumulator, X/Y registers, PC/address/data paths, memory window, stack window, decoder, and fetch/execute highlights.
- Scoped 6502 CPU state with 64 KB memory, registers, status flags, stack page initialization, program counter, halt state, cycle count, output text, graphics/ROM call log, and last-step metadata.
- Instruction stepping for the subset needed by the seeded examples, including loads/stores, branches, JSR/RTS, arithmetic, compare, flag operations, BIT, AND, ASL, indexed absolute store/load, indirect indexed store, and basic stack behavior.
- ROM-call shims for common Apple II monitor/graphics calls such as clear screen, plot, hex output, carriage return, character output, random byte, and wait. These are side-effect summaries, not real ROM execution.
- Seven seeded example programs: EX4, EX6, EX9, EX15, EX24, EX26, and EX30.
- Mini assembler for a useful subset of the source syntax used by the examples, including labels, `ORG`, `EQU`, comments, selected assembler directives, relative branches, and zero-page-vs-absolute emission.
- DOS 3.3 catalog parsing for the supplied disk image, plus an embedded fallback catalog.
- Node smoke test harness in [tests/smoke.js](../tests/smoke.js), covering seeded source round-trips and the assembler-emitted `LDX abs` execution path.
- Current smoke screenshots in [frames/app-smoke.png](../frames/app-smoke.png) and [frames/app-smoke-2.png](../frames/app-smoke-2.png).

## Partial Or Prototype Areas

- This is not yet a full Apple II emulator. There is no 6502 bus model, Apple II memory map, video page rendering, keyboard model, speaker, disk controller, or ROM execution.
- The disk image is parsed for catalog display only. Program bytes are currently hand-seeded in `PROGRAMS`; files are not loaded from DOS tracks/sectors.
- CPU coverage is intentionally narrow. Unsupported opcodes halt execution with an "Unsupported opcode" note.
- The mini assembler remains intentionally narrow and does not yet cover a full 6502 assembly syntax or object-file output path.
- Decimal mode addition exists for `ADC`, but decimal-mode subtraction is not implemented for `SBC`.
- The original prompt flow is represented through monitor text, but the app does not yet provide a full typed Apple II interaction model for loading programs, entering trace addresses, or setting registers.
- Catalog rendering hard-codes `DISK VOLUME 254` and does not read/display the disk volume from the image.
- Phaser is loaded from a CDN, so offline reproducibility depends on network access unless the dependency is vendored.
- There are no automated tests, regression fixtures, or CI checks yet.

## Evidence From Source Artifacts

- The reference contact sheet in [frames/contact-sheet-01.jpg](../frames/contact-sheet-01.jpg) shows the original flow: title, catalog, load prompt, CPU diagram, trace/disassembly view, BASIC program material, and example exercise screens.
- The selected reference frames show key moments: load/type prompt ([t0130.jpg](../frames/t0130.jpg)), CPU diagram while tracing ([t0230.jpg](../frames/t0230.jpg)), catalog and BRUN behavior ([t0600.jpg](../frames/t0600.jpg)), and BASIC program text ([t0800.jpg](../frames/t0800.jpg)).
- The current screenshots show that the browser port already renders the tri-panel app, CPU diagram, source tab, monitor transcript, parsed disk status, and seeded EX15 state.

## Current Assessment

The port is a strong visual and educational prototype. It captures the main teaching surface of the original simulator and provides real stepping behavior for a curated subset of examples. The first automated smoke harness now protects the seeded assembler fixtures and one previously-misaligned opcode path. The biggest remaining shift is from "curated recreation" to "data-driven simulator": loading real disk files, broadening and testing the CPU/assembler surface, and deciding how faithful the Apple II environment should become.

See [Implementation Map](implementation-map.md) for technical organization and [Next Steps](next-steps.md) for the likely path forward.
