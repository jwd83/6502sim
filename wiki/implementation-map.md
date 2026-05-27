---
title: Implementation Map
updated: 2026-05-27
tags:
  - implementation
  - architecture
  - apple-ii
  - 6502
---

# Implementation Map

The current implementation is a single static HTML file: [index.html](../index.html).

## Runtime Shape

- HTML and CSS define the whole app shell: top toolbar, monitor panel, central Phaser canvas, program/source/catalog panel, and footer status line.
- The shell uses a three-column desktop grid above the responsive breakpoint and a stacked single-column layout below it. The top-level grid is pinned to `minmax(0, 1fr)` so mobile viewports do not expand to the Phaser canvas's intrinsic width.
- Phaser 3.80.1 is loaded from jsDelivr and used only for the central CPU diagram scene.
- All app state lives in one `app` object plus a CPU object created by `createCpu()`.
- The default boot path loads `EX15`, initializes the monitor transcript, renders a fallback catalog, installs event handlers, starts Phaser, then attempts to fetch and parse the disk image.

## CPU Model

The CPU model is intentionally scoped to tutorial examples:

- Memory: 64 KB `Uint8Array`, with stack page initialized to `0xFF`.
- Registers: `A`, `X`, `Y`, `P`, `SP`, `PC`.
- Runtime metadata: start/end addresses, halt flag, cycle count, last instruction, output buffer, and graphics log.
- Flags: carry, zero, interrupt, decimal, break, unused, overflow, negative.
- Stack helpers: `push()` and `pop()` use page `$0100`.

Implemented instruction behavior currently covers:

| Category | Mnemonics / modes |
| --- | --- |
| Control | `BRK`, `JMP abs`, `JSR abs`, `RTS`, `NOP` |
| Branch | `BMI`, `BNE`, `BEQ` |
| Load/store | `LDA #`, `LDA zp`, `LDA abs`, `LDA abs,X`, `LDX #`, `LDX zp`, `LDX abs`, `LDY #`, `STA zp`, `STA abs`, `STA abs,X`, `STA (zp),Y` |
| Arithmetic/logic | `ADC #`, `SBC #`, `AND #`, `ASL A`, `BIT abs` |
| Compare | `CMP #`, `CMP zp`, `CMP abs`, `CPX #` |
| Increment/decrement | `INX`, `DEX`, `DEY`, `DEC zp` |
| Flags | `CLC`, `SEC`, `SED`, `CLD` |
| Transfer | `TYA` |

The opcode metadata table is also used by operand formatting and disassembly, so adding instructions requires keeping executor behavior and metadata together.

## ROM Call Shims

`JSR` targets at `$F000` and above are treated as Apple II ROM/monitor calls. Instead of executing ROM code, `handleRomCall()` records or simulates visible effects.

Current shims include:

- `$F800` `PLOT`
- `$F819` `HLIN`
- `$F828` `VLIN`
- `$FB2F` init graphics
- `$FB40` graphics mode
- `$FC58` clear screen
- `$FD1B` random byte
- `$FD8E` carriage return
- `$FDDA` print hex
- `$FDED` character output
- `$FF3A` wait

This keeps examples moving without requiring a complete Apple II ROM.

## Program Data

`PROGRAMS` currently embeds seven examples as JavaScript objects:

- `EX4.OBJ0` at `$0300`
- `EX6.OBJ0` at `$0300`
- `EX9.OBJ0` at `$0300`
- `EX15.OBJ0` at `$0300`
- `EX24.OBJ0` at `$5300`
- `EX26.OBJ0` at `$5300`
- `EX30.OBJ0` at `$5300`

The disk catalog lists additional example files that are not yet seeded as runnable programs, including EX7, EX8, EX13, EX20, and EX33 object files.

## Assembler

The mini assembler is a two-pass assembler embedded in the page:

- Pass 1 records labels and computes sizes.
- Pass 2 emits bytes.
- It supports `ORG`, `EQU`, comments starting with `*` or `;`, and ignores selected directives such as `LST`, `SBTL`, `REP`, and `SKP`.
- It supports immediate, zero-page, absolute, absolute-X, relative branch, accumulator, and `(zp),Y` forms for the implemented subset.

Known assembler gaps:

- No object-file output format.
- No branch range validation.
- No robust expression parser.
- The supported assembler surface is still smaller than the wider 6502 syntax used by arbitrary source files.

## Disk Catalog

`parseDos33Catalog()` reads a 35-track, 16-sector, 256-byte-per-sector DOS 3.3 image, walks the catalog chain from track 17 sector 15, filters empty/deleted entries, decodes Apple high-bit filenames, and returns file type, sector count, name, and locked state.

The supplied disk parses to 33 visible catalog entries using the current parser filters. The app currently uses the catalog only for display, not for file extraction or launch.

## UI Behavior

- `Step` executes one instruction and appends a trace line to the monitor.
- `Run` toggles a timer-driven execution loop until `RTS`, `BRK`, or an unsupported opcode halts the CPU.
- `Reset` reloads the current program.
- `Trace Prompt` toggles monitor prompt text only.
- `Assemble Source` assembles the editor text into a custom program and loads it.
- `Load DSK` lets the user pick a disk image and parse its catalog.
- Spacebar steps when the focus is not in an input field.
- The central CPU diagram uses centered text anchors for register and bus values, fixed component boxes for the major CPU areas, and state-driven highlights for active CPU regions.
- The diagram redraws only when state changes or while the program is running, replacing the prior always-on animation loop with restrained bus pulses during active execution.

## Verification State

Current verification includes [tests/smoke.js](../tests/smoke.js), a dependency-free Node harness that loads the app script from [index.html](../index.html) with browser stubs. It checks that all seven seeded source listings still assemble to their embedded byte fixtures and that `LDX abs` (`0xAE`) both emits and executes correctly.

Manual browser verification currently covers desktop, tablet, and mobile viewport screenshots, plus a `Step` interaction check that updates the monitor, status line, and CPU diagram. There is not yet an automated browser regression test or CI check.
