import * as fs from 'fs';
import * as childProcess from 'child_process';

export class Specification {
  public static find(): Specification {
    const gemspecPath = fs.readdirSync(".").sort().filter((name) => name.match(/\.gemspec$/))[0];

    return new Specification(gemspecPath);
  }

  public gemspecPath: string;

  constructor(gemspecPath: string) {
    this.gemspecPath = gemspecPath;
  }
}
