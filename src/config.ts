import { createConfig } from "./config/factory";
import { Github } from "./config/github";

const google = Google({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID ?? "NOTDEFINED",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "NOTDEFINED",
});

const github = Github({
    clientId: process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID ?? "NOTDEFINED",
    clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "NOTDEFINED",
    scope: ["repo"]
});

export const authConfig = createConfig({
    providers: {
        oauth: { github, google },
    },
});
