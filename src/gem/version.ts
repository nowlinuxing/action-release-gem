import * as childProcess from 'child_process';

export function compare(v1: string, v2: string): number {
  const r = childProcess.execFileSync(
    "ruby",
    [
      "-r", "rubygems",
      "-e", `v1 = Gem::Version.new("${v1}")
             v2 = Gem::Version.new("${v2}")
	     puts v1 <=> v2
	    `
    ]
  ).toString();

  return parseInt(r);
}
