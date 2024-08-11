"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Github = void 0;
const Github = (options) => ({
    id: "github",
    label: "Github",
    type: "oauth",
    authorization: "https://github.com/login/oauth/authorize",
    token: "https://github.com/login/oauth/access_token",
    userinfo: "https://api.github.com/user",
    scope: options.scope || ["read:user user:email"],
    profile(profile) {
        return {
            id: profile.id.toString(),
            name: profile.name || profile.login,
            email: profile.email,
            image: profile.avatar_url,
        };
    },
    ...options,
});
exports.Github = Github;
//# sourceMappingURL=github.js.map