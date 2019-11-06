import { RemoteGem } from "../src/remote_gem";

describe("RemoteGem", () => {
  test("getVer()", async () => {
    const nock = require("nock");

    nock("https://api.rubygems.org")
      .get("/api/v1/versions/__gem_name__/latest.json")
      .reply(
	200,
	{ version: "1.2.3" }
      );

    const remoteGem = new RemoteGem("__gem_name__");
    const version = await remoteGem.getVer();

    expect(version).toBe("1.2.3");
  });
});
