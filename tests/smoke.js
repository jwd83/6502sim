#!/usr/bin/env node

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.resolve(__dirname, "..");
const indexHtml = fs.readFileSync(path.join(repoRoot, "index.html"), "utf8");
const diskImagePath = path.join(repoRoot, "MECC-T691 Apple Assembly Language v1.0.dsk");

assert.equal(fs.existsSync(path.join(repoRoot, "disk.html")), false, "disk.html should not exist");
assert.equal(fs.statSync(diskImagePath).size, 143360, "MECC disk image should be a 143,360-byte DOS 3.3 image");
assert.match(indexHtml, /https:\/\/apple2ts\.com/, "index.html should embed Apple2TS");
assert.match(indexHtml, /type: "loadDisk"/, "index.html should send a loadDisk message to Apple2TS");
assert.match(
  indexHtml,
  /MECC-T691 Apple Assembly Language v1\.0\.dsk/,
  "index.html should mount the provided MECC disk image"
);
assert.doesNotMatch(indexHtml, /href="disk\.html"/, "index.html should not link to the removed disk page");
assert.doesNotMatch(indexHtml, /function assembleSource/, "index.html should no longer contain the old recreation app");

console.log("Smoke tests passed:");
console.log("- index.html embeds Apple2TS");
console.log("- index.html mounts the MECC disk image");
console.log("- old recreation entrypoint has been removed");
