import { Octokit } from "@octokit/rest";

export class Tagger {
  private owner: string;
  private repo:  string;
  private token: string;

  constructor(owner: string, repo: string, token: string) {
    this.owner = owner;
    this.repo  = repo;
    this.token = token;
  }

  public async tag(tagName: string, sha: string): Promise<Octokit.Response<Octokit.GitCreateRefResponse>> {
    const octokit = new Octokit({ auth: this.token });

    // See @octokit/rest/plugins/rest-api-endpoints/routes.json
    return await octokit.git.createRef({
      owner: this.owner,
      repo:  this.repo,
      ref:   `refs/tags/${tagName}`,
      sha,
    });
  }
}
