#!/usr/bin/env node

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.resolve(__dirname, "..");
const indexHtml = fs.readFileSync(path.join(repoRoot, "index.html"), "utf8");
const apple2tsHtml = fs.readFileSync(path.join(repoRoot, "apple2ts", "index.html"), "utf8");
const apple2tsBundle = fs.readFileSync(
  path.join(repoRoot, "apple2ts", "assets", "index-MSdiKkBp.js"),
  "utf8"
);
const diskImagePath = path.join(repoRoot, "MECC-T691 Apple Assembly Language v1.0.dsk");

assert.equal(fs.existsSync(path.join(repoRoot, "disk.html")), false, "disk.html should not exist");
assert.equal(fs.statSync(diskImagePath).size, 143360, "MECC disk image should be a 143,360-byte DOS 3.3 image");
assert.equal(fs.existsSync(path.join(repoRoot, "apple2ts", "LICENSE")), true, "vendored Apple2TS license should exist");
assert.match(indexHtml, /APPLE2TS_PATH = "apple2ts\/"/, "index.html should embed the local Apple2TS copy");
assert.doesNotMatch(indexHtml, /https:\/\/apple2ts\.com/, "index.html should not depend on the remote Apple2TS host");
assert.match(indexHtml, /type: "loadDisk"/, "index.html should send a loadDisk message to Apple2TS");
assert.match(indexHtml, /POST_TARGET_ORIGIN/, "index.html should target the local iframe origin");
assert.match(
  indexHtml,
  /MECC-T691 Apple Assembly Language v1\.0\.dsk/,
  "index.html should mount the provided MECC disk image"
);
assert.doesNotMatch(apple2tsHtml, /js\/(?:onedrive|google_)/, "vendored Apple2TS should not load cloud provider scripts on startup");
assert.match(apple2tsBundle, /window\.location\.origin,"vscode-webview:\/\//, "vendored Apple2TS should trust its same-origin parent");
assert.match(apple2tsBundle, /Rre=\(\)=>\{VC=!0\}/, "vendored Apple2TS should not call the client API on startup");
assert.doesNotMatch(apple2tsBundle, /\};Hz\(\);let TT;/, "vendored Apple2TS should not request Web MIDI on startup");
assert.doesNotMatch(indexHtml, /href="disk\.html"/, "index.html should not link to the removed disk page");
assert.doesNotMatch(indexHtml, /function assembleSource/, "index.html should no longer contain the old recreation app");

console.log("Smoke tests passed:");
console.log("- index.html embeds the local Apple2TS copy");
console.log("- index.html mounts the MECC disk image");
console.log("- vendored Apple2TS startup network and MIDI probes are disabled");
console.log("- old recreation entrypoint has been removed");
