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
class RemoteGem {
    constructor(gemName) {
        this.gemName = gemName;
    }
    // Get the registerd gem version from rubygems.org.
    // https://guides.rubygems.org/rubygems-org-api/#gem-version-methods
    getVer() {
        return __awaiter(this, void 0, void 0, function* () {
            const https = require("https");
            return new Promise((resolve, reject) => {
                https.get(`https://api.rubygems.org/api/v1/versions/${this.gemName}/latest.json`, (res) => {
                    res.on("data", (data) => {
                        const ver = JSON.parse(data.toString()).version;
                        resolve(ver);
                    });
                });
            });
        });
    }
}
exports.RemoteGem = RemoteGem;
