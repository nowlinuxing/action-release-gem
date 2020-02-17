"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const specification_1 = require("./gem/specification");
const gem_1 = require("./gem");
const remote_gem_1 = require("./remote_gem");
const GitHubTagCreator = __importStar(require("./github_tag_creator"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const spec = specification_1.Specification.find();
            if (!spec.isValid()) {
                throw new Error("Could not get the gem informations from gemspec.");
            }
            const gem = new gem_1.Gem(spec);
            const remoteGem = new remote_gem_1.RemoteGem(spec.name || ""); // spec.name is ensured not undefined by spec.isValid(), but tsc doesn't think so.
            if (gem.newerThan(yield remoteGem.getVer())) {
                yield GitHubTagCreator.createTag(`v${spec.version}`);
                gem.build() && gem.push();
            }
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
