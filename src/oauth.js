"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthToken = exports.OAuthProvider = void 0;
class OAuthProvider {
    constructor(config) {
        this.config = config;
    }
    async getToken({ code, redirectUri, }) {
        const credentials = btoa(`${this.config.clientId}:${this.config.clientSecret}`);
        const response = await fetch(this.config.token, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${credentials}`,
                Accept: "application/json",
            },
            body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`,
        });
        if (!response.ok) {
            console.log(response);
            throw Error("Could not get token");
        }
        const token = (await response.json());
        return new OAuthToken(this.config, token);
    }
    async refreshToken({ refreshToken }) {
        const credentials = btoa(`${this.config.clientId}:${this.config.clientSecret}`);
        const response = await fetch(this.config.token, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${credentials}`,
                Accept: "application/json",
            },
            body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
        });
        const token = (await response.json());
        return new OAuthToken(this.config, token);
    }
    tokenFromAccount({ account }) {
        if (!account.access_token)
            throw Error("Account does not have an access token");
        const token = {
            access_token: account.access_token,
            refresh_token: account.refresh_token,
            scope: account.scope,
            expires_at: account.expires_at,
        };
        return new OAuthToken(this.config, token);
    }
}
exports.OAuthProvider = OAuthProvider;
class OAuthToken {
    constructor(config, token) {
        this.config = config;
        this.token = token;
    }
    async getUser() {
        const response = await fetch(this.config.userinfo, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token.access_token}`,
                Accept: "application/json",
            },
        });
        const json = await response.json();
        return this.config.profile(json);
    }
    getAccessToken() {
        return this.token.access_token;
    }
    getRefreshToken() {
        return this.token.refresh_token;
    }
    getScope() {
        return this.token.scope;
    }
    getExpiresAt() {
        return this.token.expires_at;
    }
}
exports.OAuthToken = OAuthToken;
//# sourceMappingURL=oauth.js.map