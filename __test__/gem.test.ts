import * as fs from 'fs';
import childProcess from 'child_process';

import { Gem } from "../src/gem";
import { Specification } from '../src/gem/specification';

describe("Gem", () => {
  describe("newerThan()", () => {
    test.each`
      gemspecVer   | remoteGemVer | expected
      ${"1.2.3"}   | ${"1.2.4"}   | ${false}
      ${"1.2.3"}   | ${"1.2.3"}   | ${false}
      ${"1.2.3"}   | ${"1.2.2"}   | ${true}
      ${undefined} | ${"1.2.3"}   | ${false}
      ${"1.2.3"}   | ${"unknown"} | ${true}
    `("returns $expected when the gemspec version is $gemspecVer, and the remote gem version is $remoteGemVer", ({ gemspecVer, remoteGemVer, expected }) => {
      const spec = new Specification({ version: gemspecVer });
      const gem = new Gem(spec);

      expect(gem.newerThan(remoteGemVer)).toBe(expected);
    });
  });

  describe("build()", () => {
    test("should execute 'gem push'", () => {
      const spawnSyncReturns: childProcess.SpawnSyncReturns<Buffer> = {
        pid:    1000,
        output: [""],
        stdout: Buffer.from(""),
        stderr: Buffer.from(""),
        status: 0,
        signal: null,
      };
      jest.spyOn(childProcess, "spawnSync").mockReturnValue(spawnSyncReturns);

      const spec = new Specification({ gemspecPath: "_testgem_.gemspec" });
      const gem = new Gem(spec);

      const r = gem.build();

      expect(childProcess.spawnSync).toHaveBeenCalledWith("gem", ["build", "_testgem_.gemspec"]);
      expect(r).toBe(true);
    });

    test("should return false when the gemspecPath is not specified", () => {
      const spec = new Specification({});
      const gem = new Gem(spec);

      const r = gem.build();

      expect(childProcess.spawnSync).not.toHaveBeenCalled();
      expect(r).toBe(false);
    });
  });
});
