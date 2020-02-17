"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = __importDefault(require("child_process"));
function build(gemspecPath) {
    const r = child_process_1.default.spawnSync("gem", ["build", gemspecPath]);
    if (r.status != 0) {
        throw new Error(r.stderr.toString());
    }
}
exports.build = build;
