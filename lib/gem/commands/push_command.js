"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const child_process_1 = __importDefault(require("child_process"));
/* gem command can get a API key from an environment variable GEM_HOST_API_KEY
 * since rubygems v3.0.5.
 *
 * https://github.com/rubygems/rubygems/pull/2559
 */
function createCredentials(homeDir, apiKey) {
    fs_1.default.mkdirSync(`${homeDir}/.gem`, { recursive: true });
    fs_1.default.writeFileSync(`${homeDir}/.gem/credentials`, `---\n:rubygems_api_key: ${apiKey}\n`, { mode: 0o600 });
}
function execPush(gemPath) {
    const r = child_process_1.default.spawnSync("gem", ["push", gemPath]);
    if (r.status != 0) {
        throw new Error(r.stderr.toString());
    }
}
function push(homeDir, apiKey, gemPath) {
    createCredentials(homeDir, apiKey);
    execPush(gemPath);
}
exports.push = push;
