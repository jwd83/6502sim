#!/usr/bin/env node

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const repoRoot = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(repoRoot, "index.html"), "utf8");
const inlineScripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map((match) => match[1]);
const appScript = inlineScripts.find((script) => script.includes("function assembleSource"));

if (!appScript) {
  throw new Error("Could not find simulator script in index.html.");
}

const context = {
  console,
  document: {
    getElementById() {
      return {
        addEventListener() {},
        appendChild() {},
        classList: { toggle() {} },
        dataset: {},
        innerHTML: "",
        scrollHeight: 0,
        scrollTop: 0,
        textContent: "",
        value: ""
      };
    },
    querySelectorAll() {
      return [];
    }
  },
  fetch() {
    return Promise.reject(new Error("fetch disabled in smoke tests"));
  },
  Phaser: {
    AUTO: "AUTO",
    Game: class {},
    Scale: { FIT: "FIT", CENTER_BOTH: "CENTER_BOTH" },
    Scene: class {}
  },
  window: {
    addEventListener() {},
    clearInterval() {},
    setInterval() {
      throw new Error("setInterval should not run in smoke tests.");
    }
  }
};

const testCode = `
  globalThis.__smokeResults = (() => {
    assert.deepEqual(OPCODES[0xAE], ["LDX", "abs", 3]);

    for (const seeded of PROGRAMS) {
      const assembled = assembleSource(seeded.source);
      assert.deepEqual(
        assembled.bytes,
        seeded.bytes,
        seeded.id + " source should assemble to its seeded byte fixture"
      );
    }

    const program = assembleSource([
      "ORG $300",
      "VALUE EQU $400",
      "BEGIN LDX VALUE",
      "      RTS"
    ].join("\\n"));

    assert.deepEqual(program.bytes, [0xAE, 0x00, 0x04, 0x60]);

    const cpu = resetCpuWithProgram(program);
    cpu.memory[0x0400] = 0x80;
    stepCpu(cpu);

    assert.equal(cpu.x, 0x80);
    assert.equal(cpu.pc, 0x0303);
    assert.equal(cpu.lastStep.mnemonic, "LDX");
    assert.equal(cpu.lastStep.operandText, "$0400");
    assert.equal(cpu.lastStep.target, 0x0400);
    assert.equal(getFlag(cpu, FLAG.N), 1);
    assert.equal(getFlag(cpu, FLAG.Z), 0);
    assert.equal(cpu.halted, false);

    return {
      seededProgramsChecked: PROGRAMS.length,
      absoluteLdx: program.bytes.map((byte) => hex(byte, 2)).join(" ")
    };
  })();
`;

const sandbox = { ...context, assert };
vm.runInNewContext(appScript + "\n" + testCode, sandbox, { filename: "index.html" });

console.log("Smoke tests passed:");
console.log("- seeded program assembly round-trips: " + sandbox.__smokeResults.seededProgramsChecked);
console.log("- LDX absolute emits/executes: " + sandbox.__smokeResults.absoluteLdx);
