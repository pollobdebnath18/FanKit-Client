import { authClient } from "../lib/auth-client";

export const AuthAPI = {
  signIn(email: string, password: string) {
    return authClient.signIn.email({
      email,
      password,
    });
  },

  signUp(name: string, email: string, password: string) {
    return authClient.signUp.email({
      name,
      email,
      password,
    });
  },

  signOut() {
    return authClient.signOut();
  },
};
