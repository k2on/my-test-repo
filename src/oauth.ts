import { InferModel, InferSelectModel, schema } from "@koonstack/db";
import { OAuthProviderConfig, UserProfile } from "./config/types";
import { accounts } from "../../db/src/schema/user";

export class OAuthProvider {
    constructor(private config: OAuthProviderConfig<any>) {}

    public async getToken({
        code,
        redirectUri,
    }: {
        code: string;
        redirectUri: string;
    }): Promise<OAuthToken> {
        const credentials = btoa(
            `${this.config.clientId}:${this.config.clientSecret}`,
        );
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
        const token = (await response.json()) as Token;
        return new OAuthToken(this.config, token);
    }

    public async refreshToken({ refreshToken }: { refreshToken: string }): Promise<OAuthToken> {
        const credentials = btoa(
            `${this.config.clientId}:${this.config.clientSecret}`,
        );
        const response = await fetch(this.config.token, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${credentials}`,
                Accept: "application/json",
            },
            body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
        });
        const token = (await response.json()) as Token;
        return new OAuthToken(this.config, token);
    }

    public tokenFromAccount({ account }: { account: InferSelectModel<typeof schema.accounts> }): OAuthToken {
        if (!account.access_token) throw Error("Account does not have an access token");
        const token: Token = {
            access_token: account.access_token,
            refresh_token: account.refresh_token,
            scope: account.scope!,
            expires_at: account.expires_at!,
        };
        return new OAuthToken(this.config, token)
    }
}

export class OAuthToken {
    constructor(
        private config: OAuthProviderConfig<any>,
        private token: Token,
    ) {}

    public async getUser(): Promise<UserProfile> {
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

    public getAccessToken() {
        return this.token.access_token;
    }
    public getRefreshToken() {
        return this.token.refresh_token;
    }
    public getScope() {
        return this.token.scope;
    }
    public getExpiresAt() {
        return this.token.expires_at;
    }
}

interface Token {
    access_token: string;
    refresh_token: string | null;
    scope: string;
    expires_at: number;
}
