import childProcess from 'child_process';

import * as BuildCommand from '../../../src/gem/commands/build_command';

describe("BuildCommand", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should return true when 'gem build' is executed successfully", () => {
    const spawnSyncReturns: childProcess.SpawnSyncReturns<Buffer> = {
      pid:    1000,
      output: [""],
      stdout: Buffer.from(""),
      stderr: Buffer.from(""),
      status: 0,
      signal: null,
    };
    jest.spyOn(childProcess, "spawnSync").mockReturnValue(spawnSyncReturns);

    BuildCommand.build("_testgem_.gemspec");

    expect(childProcess.spawnSync).toHaveBeenCalledWith("gem", ["build", "_testgem_.gemspec"]);
  });

  test("should throw an Error when 'gem build' failed", () => {
    const spawnSyncReturns: childProcess.SpawnSyncReturns<Buffer> = {
      pid:    1000,
      output: [""],
      stdout: Buffer.from(""),
      stderr: Buffer.from("ERROR:  Something went wrong\n"),
      status: 1,
      signal: null,
    };
    jest.spyOn(childProcess, "spawnSync").mockReturnValue(spawnSyncReturns);

    expect(() => {
      BuildCommand.build("_testgem_.gemspec")
    }).toThrow("ERROR:  Something went wrong\n");

    expect(childProcess.spawnSync).toHaveBeenCalledWith("gem", ["build", "_testgem_.gemspec"]);
  });
});
