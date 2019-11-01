import { RepoParams } from "../../src/github/repo_params";

describe("RepoParams", () => {
  describe("build()", () => {
    test("gets the informations about the repository and the token", () => {
      const params = RepoParams.build({
        GITHUB_REPOSITORY: "_owner_/_repo_",
        GITHUB_TOKEN: "_token_",
      });

      expect(params.owner).toBe("_owner_");
      expect(params.repo).toBe("_repo_");
      expect(params.token).toBe("_token_");
    });
  });
});
