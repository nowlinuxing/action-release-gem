import { TagParams } from "../../src/github/tag_params";

describe("TagParams", () => {
  describe("build()", () => {
    test("gets SHA and the tag name", () => {
      const params = TagParams.build({
        GITHUB_SHA: "_sha_",
      });

      expect(params.sha).toBe("_sha_");
    });
  });
});
