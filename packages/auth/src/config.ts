import { createConfig } from "@koons/auth";
import { Github } from "@koons/github";

const github = Github({
    clientId: process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID ?? "NOTDEFINED",
    clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "NOTDEFINED",
});

export const authConfig = createConfig({
    providers: {
        oauth: { github },
    },
});
