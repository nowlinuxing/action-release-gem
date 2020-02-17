"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const version = __importStar(require("./gem/version"));
const BuildCommand = __importStar(require("./gem/commands/build_command"));
const PushCommand = __importStar(require("./gem/commands/push_command"));
class Gem {
    constructor(specification) {
        this.specification = specification;
    }
    newerThan(remoteGemVer) {
        const myVer = this.specification.version;
        if (myVer == null) {
            return false;
        }
        else if (remoteGemVer == "unknown") {
            // If the gem is not registerd yet, API returns '{"version":"unknown"}'.
            return true;
        }
        else {
            return version.compare(myVer, remoteGemVer) > 0;
        }
    }
    build() {
        if (this.specification.gemspecPath == null) {
            return false;
        }
        else {
            BuildCommand.build(this.specification.gemspecPath);
            return true;
        }
    }
    push(processEnv = process.env) {
        const gemPath = this.specification.gemFileName();
        if (gemPath == null) {
            return false;
        }
        const homeDir = processEnv.HOME || "";
        const apiKey = processEnv.GEM_HOST_API_KEY || "";
        PushCommand.push(homeDir, apiKey, gemPath);
        return true;
    }
}
exports.Gem = Gem;
