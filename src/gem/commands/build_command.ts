import childProcess from 'child_process';

export function build(gemspecPath: string): void {
  const r = childProcess.spawnSync("gem", ["build", gemspecPath]);

  if (r.status != 0) {
    throw new Error(r.stderr.toString());
  }
}
