import fs from 'fs';
import childProcess from 'child_process';

import * as PushCommand from '../../../src/gem/commands/push_command';

describe("PushCommand", () => {
  beforeEach(() => {
    jest.spyOn(fs, "mkdirSync").mockImplementation();
    jest.spyOn(fs, "writeFileSync").mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("push()", () => {
    test("whould execute 'gem push'", () => {
      const spawnSyncReturns: childProcess.SpawnSyncReturns<Buffer> = {
        pid:    1000,
        output: [""],
        stdout: Buffer.from(""),
        stderr: Buffer.from(""),
        status: 0,
        signal: null,
      };
      jest.spyOn(childProcess, "spawnSync").mockReturnValue(spawnSyncReturns);

      PushCommand.push("/home/__user__", "_GEM_HOST_API_KEY_", "_testgem_-1.2.3.gem");

      expect(fs.mkdirSync).toHaveBeenCalledWith("/home/__user__/.gem", { recursive: true });
      expect(fs.writeFileSync).toHaveBeenCalledWith("/home/__user__/.gem/credentials", "---\n:rubygems_api_key: _GEM_HOST_API_KEY_\n", { mode: 0o600 });

      expect(childProcess.spawnSync).toHaveBeenCalledWith("gem", ["push", "_testgem_-1.2.3.gem"]);
    });

    test("should throw an Error when 'gem push' failed", () => {
      const spawnSyncReturns: childProcess.SpawnSyncReturns<Buffer> = {
        pid:    1000,
        output: [""],
        stdout: Buffer.from(""),
        stderr: Buffer.from("ERROR:  While executing gem ... (SomeError)\n    Something went wrong\n"),
        status: 1,
        signal: null,
      };
      jest.spyOn(childProcess, "spawnSync").mockReturnValue(spawnSyncReturns);

      expect(() => {
        PushCommand.push("/home/__user__", "_GEM_HOST_API_KEY_", "_testgem_-1.2.3.gem");
      }).toThrow(/^ERROR:  While executing gem/);

      expect(fs.mkdirSync).toHaveBeenCalledWith("/home/__user__/.gem", { recursive: true });
      expect(fs.writeFileSync).toHaveBeenCalledWith("/home/__user__/.gem/credentials", "---\n:rubygems_api_key: _GEM_HOST_API_KEY_\n", { mode: 0o600 });

      expect(childProcess.spawnSync).toHaveBeenCalledWith("gem", ["push", "_testgem_-1.2.3.gem"]);
    });
  });
});
