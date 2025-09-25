import { createAuthClient } from "better-auth/react";

export const { signIn, signUp, useSession } = createAuthClient();

export const authClient = createAuthClient({
    baseURL: "http://localhost:3001/"
});