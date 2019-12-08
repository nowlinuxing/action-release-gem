import * as fs from 'fs';
import * as childProcess from 'child_process';

export class Specification {
  public static find(): Specification {
    const gemspecPath = fs.readdirSync(".").sort().filter((name) => name.match(/\.gemspec$/))[0];
    const attr = this.load(gemspecPath);

    return new Specification({ gemspecPath: gemspecPath, ...attr });
  }

  public gemspecPath: string | undefined;
  public version: string | undefined;

  constructor({ gemspecPath, version } : { gemspecPath?: string, version?: string }) {
    this.gemspecPath = gemspecPath;
    this.version = version;
  }

  private static load(gemspecPath: string) {
    const json = childProcess.execFileSync(
      "ruby",
      [
        "-r", "rubygems",
	"-r", "json",
	"-e", `spec = Gem::Specification.load("${gemspecPath}"); puts({ version: spec.version }.to_json)`,
      ]
    ).toString();

    return JSON.parse(json);
  }
}
