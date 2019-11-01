import { Tagger } from "../../src/github/tagger";

describe("Tagger", () => {
  describe("tag()", () => {
    test("creates a tag", async () => {
      // Git Refs | GitHub Developer Guide
      // https://developer.github.com/v3/git/refs/
      const nock = require("nock");

      nock("https://api.github.com")
        .post(
          "/repos/_owner_/_repo_/git/refs",
          {
            ref: "refs/tags/v1.2.3",
            sha: "_sha_",
          })
        .reply(
          200,
          {
            ref:     "refs/tags/v1.2.3",
            node_id: "MDQ6VXNlcjU4MzIzMQ==",
            url:     "https://api.github.com/repos/_owner_/_repo_/git/refs/tags/v1.2.3",
            object: {
              sha:  "_sha_",
              type: "commit",
              url:  "https://api.github.com/repos/_owner_/_repo_/git/commits/_sha_",
            },
          });

      const tagger = new Tagger("_owner_", "_repo_", "_token_");
      const result = await tagger.tag("v1.2.3", "_sha_");

      expect(result.status).toBe(200);
    });
  });
});
