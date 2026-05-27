---
title: Next Steps
updated: 2026-05-26
tags:
  - roadmap
  - port
  - todo
---

# Next Steps

## Near Term

1. Decide the fidelity target: educational recreation, faithful MECC simulator clone, or broader Apple II emulator. The current code is strongest as an educational recreation.
2. Add a small automated smoke test harness. Start with CPU-step tests for the seeded examples and a browser screenshot check for the Phaser scene.
3. Align assembler output with CPU execution support. At minimum, either implement `LDX abs` (`0xAE`) or prevent the assembler from emitting unsupported opcodes.
4. Add branch range validation in the assembler so out-of-range labels do not silently wrap.
5. Read the disk volume from the disk image instead of hard-coding `DISK VOLUME 254`, or document the deliberate hard-code if the video reference should win.

## Data-Driven Port Work

1. Decode DOS 3.3 file contents from catalog entries and load `.OBJ0` files from the disk image.
2. Compare hand-seeded program bytes against extracted disk bytes for EX4, EX6, EX9, EX15, EX24, EX26, and EX30.
3. Add runnable entries for EX7, EX8, EX13, EX20, and EX33 after extracting or reconstructing their object bytes.
4. Track source text files separately from object files so the source editor can show disk-derived sources where available.

## Simulator Fidelity

1. Implement the original prompt flow more fully: load-from-disk choice, program name entry, register setup, trace address selection, and Control-Y behavior.
2. Expand CPU coverage using a tested 6502 opcode table or proven emulator core if the goal grows beyond the tutorial subset.
3. Add Apple II memory/video behavior only as needed for the exercises. The current ROM-call shim approach is probably enough for many lessons.
4. Decide whether ROM calls should remain summarized side effects or become real Apple II ROM execution.

## Maintainability

1. Keep the single-file app until tests or feature growth make extraction worthwhile.
2. When extraction becomes useful, split into focused modules: CPU, assembler, DOS catalog/file loading, Phaser scene, UI controls, and fixtures.
3. Vendor Phaser or document the CDN dependency if offline reproducibility matters.
4. Keep this wiki updated after each meaningful porting pass.

