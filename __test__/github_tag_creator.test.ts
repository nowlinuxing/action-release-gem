import * as GitHubTagCreator from "../src/github_tag_creator";

describe("createTag()", () => {
  test("create a tag via GitHub API", async () => {
    const processEnv = {
      GITHUB_REPOSITORY: "_owner_/_repo_",
      GITHUB_TOKEN:      "_token_",
      GITHUB_SHA:        "_sha_",
      //INPUT_TAG_NAME:    "v1.2.3",
    };

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


    const result = await GitHubTagCreator.createTag("v1.2.3", processEnv);

    expect(result.status).toBe(200);
    expect(result.data.object.url).toBe("https://api.github.com/repos/_owner_/_repo_/git/commits/_sha_");
  });
});
