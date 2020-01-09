import fs from 'fs';
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

  describe("push()", () => {
    beforeEach(() => {
      jest.spyOn(fs, "mkdirSync").mockImplementation();
      jest.spyOn(fs, "writeFileSync").mockImplementation();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

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

      const spec = new Specification({ gemspecPath: "_testgem_.gemspec", name: "_testgem_", version: "1.2.3" });
      const gem = new Gem(spec);

      const processEnv = {
        HOME: "/home/__user__",
        GEM_HOST_API_KEY: "_GEM_HOST_API_KEY_",
      };

      const r = gem.push(processEnv);

      expect(fs.mkdirSync).toHaveBeenCalledWith("/home/__user__/.gem", { recursive: true });
      expect(fs.writeFileSync).toHaveBeenCalledWith("/home/__user__/.gem/credentials", "---\n:rubygems_api_key: _GEM_HOST_API_KEY_\n");

      expect(childProcess.spawnSync).toHaveBeenCalledWith("gem", ["push", "_testgem_-1.2.3.gem"]);
      expect(r).toBe(true);
    });

    test("should return false when the gem name is not defined", () => {
      const spec = new Specification({ gemspecPath: "_testgem_.gemspec" });
      const gem = new Gem(spec);

      const processEnv = {
        HOME: "/home/__user__",
        GEM_HOST_API_KEY: "_GEM_HOST_API_KEY_",
      };

      jest.spyOn(childProcess, "spawnSync").mockImplementation();

      const r = gem.push(processEnv);

      expect(fs.mkdirSync).not.toHaveBeenCalled();
      expect(fs.writeFileSync).not.toHaveBeenCalled();

      expect(childProcess.spawnSync).not.toHaveBeenCalled();

      expect(r).toBe(false);
    });
  });
});
