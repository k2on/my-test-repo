import { createConfig } from "@koons/auth";
import { Github } from "@koons/github";
import { Google } from "@koons/google";

const github = Github({
    clientId: process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET
});
const google = Google({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
});

export const authConfig = {
    oauth: { github, google }
};