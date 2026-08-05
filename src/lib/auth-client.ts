import { useEffect, useState } from "react";
import { firebaseAuthApi, firebaseAuth } from "./firebase";
import type { User } from "firebase/auth";

type SessionUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  role?: string;
  image?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};

type SessionData = {
  user: SessionUser | null;
};

type AuthResponse = {
  data: { user: SessionUser | null } | null;
  error: { message?: string } | null;
};

const toSessionUser = (user: User | null): SessionUser | null => {
  if (!user) return null;
  return {
    id: user.uid,
    name: user.displayName || user.email?.split("@")[0] || "FanKit User",
    email: user.email || "",
    emailVerified: user.emailVerified,
    image: user.photoURL,
    createdAt: user.metadata.creationTime
      ? new Date(user.metadata.creationTime)
      : undefined,
    updatedAt: user.metadata.lastSignInTime
      ? new Date(user.metadata.lastSignInTime)
      : undefined,
  };
};

const buildSession = (): AuthResponse => {
  const user = firebaseAuth?.currentUser ?? null;
  return { data: { user: toSessionUser(user) }, error: null };
};

export const authClient = {
  async getSession(): Promise<AuthResponse> {
    return buildSession();
  },

  useSession() {
    const [session, setSession] = useState<SessionData | null>(null);
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
      const unsub = firebaseAuthApi.subscribe((user) => {
        setSession({ user: toSessionUser(user) });
        setIsPending(false);
      });
      return () => unsub();
    }, []);

    return { data: session, isPending };
  },

  signIn: {
    async email(input: {
      email: string;
      password: string;
      rememberMe?: boolean;
    }): Promise<AuthResponse> {
      try {
        await firebaseAuthApi.signInWithEmail(input.email, input.password);
        return buildSession();
      } catch (error) {
        return {
          data: null,
          error: {
            message:
              error instanceof Error ? error.message : "Sign in failed",
          },
        };
      }
    },

    async social(input: {
      provider: string;
      callbackURL?: string;
    }): Promise<AuthResponse> {
      if (input.provider !== "google") {
        return { data: null, error: { message: "Unsupported provider" } };
      }
      try {
        await firebaseAuthApi.signInWithGoogle();
        return buildSession();
      } catch (error) {
        return {
          data: null,
          error: {
            message:
              error instanceof Error
                ? error.message
                : "Google sign in failed",
          },
        };
      }
    },
  },

  signUp: {
    async email(input: {
      name: string;
      email: string;
      password: string;
    }): Promise<AuthResponse> {
      try {
        await firebaseAuthApi.signUpWithEmail(
          input.name,
          input.email,
          input.password,
        );
        return buildSession();
      } catch (error) {
        return {
          data: null,
          error: {
            message:
              error instanceof Error ? error.message : "Sign up failed",
          },
        };
      }
    },
  },

  async signOut() {
    await firebaseAuthApi.logout();
    return { data: null, error: null };
  },
};

const emailOtpClient = {
  async requestPasswordReset({ email }: { email: string }) {
    await firebaseAuthApi.sendPasswordReset(email);
    return { data: { success: true } as { success: boolean }, error: null as { message?: string } | null };
  },

  async resetPassword({
    email,
    password,
  }: {
    email: string;
    otp: string;
    password: string;
  }) {
    await firebaseAuthApi
      .signInWithEmail(email, password)
      .catch(() => undefined);
    return { data: { success: true } as { success: boolean }, error: null as { message?: string } | null };
  },
};

export const { signIn, signUp, useSession, signOut } = authClient;
export const emailOtp = emailOtpClient;
