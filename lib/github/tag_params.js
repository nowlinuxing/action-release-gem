"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TagParams {
    constructor(sha) {
        this.sha = sha;
    }
    static build(processEnv) {
        return new TagParams(processEnv.GITHUB_SHA);
    }
}
exports.TagParams = TagParams;
