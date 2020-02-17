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
Object.defineProperty(exports, "__esModule", { value: true });
const repo_params_1 = require("./github/repo_params");
const tag_params_1 = require("./github/tag_params");
const tagger_1 = require("./github/tagger");
function createTag(tagName, processEnv = process.env) {
    return __awaiter(this, void 0, void 0, function* () {
        const repoParams = repo_params_1.RepoParams.build(processEnv);
        const tagParams = tag_params_1.TagParams.build(processEnv);
        const tagger = new tagger_1.Tagger(repoParams.owner, repoParams.repo, repoParams.token);
        return yield tagger.tag(tagName, tagParams.sha);
    });
}
exports.createTag = createTag;
