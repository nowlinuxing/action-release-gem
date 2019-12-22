import { RepoParams } from "./github/repo_params";
import { TagParams } from "./github/tag_params";
import { Tagger } from "./github/tagger";

export async function createTag(tagName: string, processEnv = process.env) {
  const repoParams = RepoParams.build(processEnv);
  const tagParams = TagParams.build(processEnv);

  const tagger = new Tagger(repoParams.owner, repoParams.repo, repoParams.token);

  return await tagger.tag(tagName, tagParams.sha);
}
