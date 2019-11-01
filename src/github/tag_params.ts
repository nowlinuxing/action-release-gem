export class TagParams {
  public static build(processEnv): TagParams {
    return new TagParams(
      processEnv.GITHUB_SHA,
      // require("@actions/core").getInput("tag_name", { required: true })
    );
  }

  public sha: string;

  constructor(sha: string) {
    this.sha = sha;
  }
}
