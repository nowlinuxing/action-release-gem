"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const childProcess = __importStar(require("child_process"));
class Specification {
    constructor({ gemspecPath, name, version }) {
        this.gemspecPath = gemspecPath;
        this.name = name;
        this.version = version;
    }
    static find() {
        const gemspecPath = fs.readdirSync(".").sort().filter((name) => name.match(/\.gemspec$/))[0];
        const attr = this.load(gemspecPath);
        return new Specification(Object.assign({ gemspecPath: gemspecPath }, attr));
    }
    static load(gemspecPath) {
        const json = childProcess.execFileSync("ruby", [
            "-r", "rubygems",
            "-r", "json",
            "-e", `spec = Gem::Specification.load("${gemspecPath}"); puts({ name: spec.name, version: spec.version }.to_json)`,
        ]).toString();
        return JSON.parse(json);
    }
    isValid() {
        return (this.name != null && this.version != null);
    }
    gemFileName() {
        if (this.isValid()) {
            return `${this.name || ""}-${this.version || ""}.gem`;
        }
        else {
            return null;
        }
    }
}
exports.Specification = Specification;
