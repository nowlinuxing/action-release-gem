"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const childProcess = __importStar(require("child_process"));
function compare(v1, v2) {
    const r = childProcess.execFileSync("ruby", [
        "-r", "rubygems",
        "-e", `v1 = Gem::Version.new("${v1}")
             v2 = Gem::Version.new("${v2}")
	     puts v1 <=> v2
	    `
    ]).toString();
    return parseInt(r);
}
exports.compare = compare;
