export class RepoParams {
  public static build(processEnv): RepoParams {
    const [owner, repo] = processEnv.GITHUB_REPOSITORY.split("/");
    const token: string = processEnv.GITHUB_TOKEN || "";

    return new RepoParams(
      owner,
      repo,
      token,
    );
  }

  public owner: string;
  public repo:  string;
  public token: string;

  constructor(
    owner: string,
    repo:  string,
    token: string,
  ) {
    this.owner = owner;
    this.repo  = repo;
    this.token = token;
  }
}
