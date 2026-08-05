import { initializeApp, getApps, type FirebaseOptions } from "firebase/app";
import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  getIdToken,
  type User,
} from "firebase/auth";

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const hasFirebaseConfig = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  firebaseConfig.appId,
);

export const firebaseApp = hasFirebaseConfig
  ? getApps().length
    ? getApps()[0]
    : initializeApp(firebaseConfig)
  : null;

export const firebaseAuth = firebaseApp ? getAuth(firebaseApp) : null;
export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

if (firebaseAuth) {
  void setPersistence(firebaseAuth, browserLocalPersistence).catch(() => {
    // no-op: persistence fallback is safe in browser environments
  });
}

const assertFirebaseReady = () => {
  if (!firebaseAuth) {
    throw new Error(
      "Firebase Auth is not configured. Add VITE_FIREBASE_* values to the client environment.",
    );
  }
};

export const firebaseAuthApi = {
  isEnabled: hasFirebaseConfig,

  async signInWithEmail(email: string, password: string) {
    assertFirebaseReady();
    return signInWithEmailAndPassword(firebaseAuth!, email, password);
  },

  async signUpWithEmail(name: string, email: string, password: string) {
    assertFirebaseReady();
    const credentials = await createUserWithEmailAndPassword(
      firebaseAuth!,
      email,
      password,
    );

    if (name) {
      await updateProfile(credentials.user, { displayName: name });
    }

    return credentials;
  },

  async signInWithGoogle() {
    assertFirebaseReady();
    return signInWithPopup(firebaseAuth!, googleProvider);
  },

  async sendPasswordReset(email: string) {
    assertFirebaseReady();
    return sendPasswordResetEmail(firebaseAuth!, email);
  },

  async logout() {
    assertFirebaseReady();
    return firebaseSignOut(firebaseAuth!);
  },

  async getIdToken() {
    assertFirebaseReady();
    const user = firebaseAuth!.currentUser;
    if (!user) {
      return null;
    }

    return getIdToken(user);
  },

  subscribe(listener: (user: User | null) => void) {
    if (!firebaseAuth) {
      listener(null);
      return () => undefined;
    }

    return onAuthStateChanged(firebaseAuth, listener);
  },
};
