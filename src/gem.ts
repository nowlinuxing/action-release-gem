import { Specification } from './gem/specification';
import * as version from './gem/version';

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
}
