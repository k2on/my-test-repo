import { authConfig } from "./config";

type AuthConfig = typeof authConfig;

export { authConfig, type AuthConfig };
export * as types from "./config/types";
export { OAuthProvider } from "./oauth";
