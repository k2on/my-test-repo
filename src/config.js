"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authConfig = void 0;
const factory_1 = require("./config/factory");
const github_1 = require("./config/github");
const github = (0, github_1.Github)({
    clientId: process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID ?? "NOTDEFINED",
    clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "NOTDEFINED",
    scope: ["repo"]
});
exports.authConfig = (0, factory_1.createConfig)({
    providers: {
        oauth: { github },
    },
});
//# sourceMappingURL=config.js.map