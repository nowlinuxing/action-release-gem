"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RepoParams {
    constructor(owner, repo, token) {
        this.owner = owner;
        this.repo = repo;
        this.token = token;
    }
    static build(processEnv) {
        const [owner, repo] = processEnv.GITHUB_REPOSITORY.split("/");
        const token = processEnv.GITHUB_TOKEN || "";
        return new RepoParams(owner, repo, token);
    }
}
exports.RepoParams = RepoParams;
