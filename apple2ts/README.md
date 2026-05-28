# Vendored Apple2TS Runtime

This directory contains the static Apple2TS browser runtime mirrored from `https://apple2ts.com/` on 2026-05-28 so the simulator can run from this repository without embedding the remote Apple2TS site.

Local patches in `assets/index-MSdiKkBp.js`:

- Trust the current `window.location.origin` for `postMessage` disk loading, so `https://6502.jwd.me` can mount the local `.dsk` image.
- Disable the startup `/api/client/connect` probe, which is not available on this static site.
- Disable the startup Web MIDI permission probe.
- Use relative touch-joystick image paths.

The upstream Apple2TS license is preserved in [LICENSE](LICENSE).
