import { createAuthClient } from "better-auth/react";

const baseURL = import.meta.env.VITE_AUTH_API_URL; ;

export const authClient = createAuthClient({
  baseURL,
 
});

export const { signIn, signUp, useSession } = authClient;
