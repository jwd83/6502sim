# Project Wiki Instructions

This repository uses the wiki-me pattern for durable project memory. The wiki is the LLM-maintained layer for documenting the Apple ][ 6502 Simulator port.

## Knowledge Layers

- Source artifacts: preserve the current source evidence unless the user explicitly asks to change it. Important artifacts are [index.html](index.html), [video-6502-emulator.mp4](video-6502-emulator.mp4), [MECC-T691 Apple Assembly Language v1.0.dsk](<MECC-T691 Apple Assembly Language v1.0.dsk>), and the reference/current screenshots in [frames/](frames/).
- Notebook: no notebook directory exists yet. If rough project thoughts accumulate, create `notebook/` and keep them clearly separate from sourced wiki claims.
- Wiki: generated markdown lives in `wiki/`. Keep pages interlinked, keep claims tied back to repository evidence, and update [wiki/index.md](wiki/index.md) and [wiki/log.md](wiki/log.md) whenever meaningful documentation changes are made.

## Page Conventions

- Prefer concise YAML frontmatter with `title`, `updated`, and `tags`.
- Use relative markdown links for repo evidence and wiki cross-references.
- Distinguish implemented behavior from inferred intent and open questions.
- Treat `index.html` as the current implementation state, not as proof of original MECC behavior.
- Treat the disk image, video, and extracted frames as source evidence for the original experience.

## Update Workflow

1. Read `wiki/index.md` first to find existing pages.
2. Inspect relevant source artifacts before updating claims.
3. Update the page or create a focused new page.
4. Update `wiki/index.md` with any new or changed page summaries.
5. Append a dated entry to `wiki/log.md`.

