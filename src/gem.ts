import { Specification } from './gem/specification';
import * as version from './gem/version';
import * as BuildCommand from './gem/commands/build_command';
import * as PushCommand from './gem/commands/push_command';

export class Gem {
  public specification: Specification;

  constructor(specification: Specification) {
    this.specification = specification;
  }

  public newerThan(remoteGemVer: string): boolean {
    const myVer = this.specification.version;

    if (myVer == null) {
      return false;
    } else if (remoteGemVer == "unknown") {
      // If the gem is not registerd yet, API returns '{"version":"unknown"}'.
      return true;
    } else {
      return version.compare(myVer, remoteGemVer) > 0;
    }
  }

  public build(): boolean {
    if (this.specification.gemspecPath == null) {
      return false;
    } else {
      BuildCommand.build(this.specification.gemspecPath);
      return true;
    }
  }

  public push(processEnv = process.env): boolean {
    const gemPath = this.specification.gemFileName();
    if (gemPath == null) {
      return false;
    }

    const homeDir = processEnv.HOME || "";
    const apiKey  = processEnv.GEM_HOST_API_KEY || "";

    PushCommand.push(homeDir, apiKey, gemPath);
    return true;
  }
}
