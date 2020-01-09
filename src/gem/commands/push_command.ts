import fs from 'fs';
import childProcess from 'child_process';

/* gem command can get a API key from an environment variable GEM_HOST_API_KEY
 * since rubygems v3.0.5.
 *
 * https://github.com/rubygems/rubygems/pull/2559
 */
function createCredentials(homeDir: string, apiKey: string): void {
  fs.mkdirSync(`${homeDir}/.gem`, { recursive: true });
  fs.writeFileSync(`${homeDir}/.gem/credentials`, `---\n:rubygems_api_key: ${apiKey}\n`, { mode: 0o600 });
}

function execPush(gemPath: string): void {
  const r = childProcess.spawnSync("gem", ["push", gemPath]);

  if (r.status != 0) {
    throw new Error(r.stderr.toString());
  }
}

export function push(homeDir: string, apiKey: string, gemPath: string): void {
  createCredentials(homeDir, apiKey);
  execPush(gemPath);
}
