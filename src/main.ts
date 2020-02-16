import * as core from '@actions/core';

import { Specification } from './gem/specification';
import { Gem } from './gem';
import { RemoteGem } from './remote_gem';
import * as GitHubTagCreator from "./github_tag_creator";

async function run() {
  try {
    const spec = Specification.find();
    if (!spec.isValid()) {
      throw new Error("Could not get the gem informations from gemspec.");
    }

    const gem = new Gem(spec);
    const remoteGem = new RemoteGem(spec.name || ""); // spec.name is ensured not undefined by spec.isValid(), but tsc doesn't think so.

    if (gem.newerThan(await remoteGem.getVer())) {
      await GitHubTagCreator.createTag(`v${spec.version}`);

      gem.build() && gem.push();
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
