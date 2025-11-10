import { 
    GoogleAuthProvider, 
    signInWithPopup, 
    signOut, 
    onAuthStateChanged as onFirebaseAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    NextOrObserver,
    User
} from "firebase/auth";
import { auth } from "../firebase";
import type { AuthCredentials } from "../types";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<void> => {
    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error("Error signing in with Google: ", error);
        throw error;
    }
};

const getAuthErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
        case 'auth/email-already-in-use':
            return 'This email address is already in use.';
        case 'auth/invalid-email':
            return 'Please enter a valid email address.';
        case 'auth/weak-password':
            return 'The password must be at least 6 characters long.';
        case 'auth/invalid-credential':
             return 'Invalid email or password. Please try again.';
        default:
            return 'An unexpected error occurred. Please try again.';
    }
}

export const signUpWithEmailPassword = async ({ displayName, email, password }: AuthCredentials): Promise<void> => {
    if (!password || !displayName) {
        throw new Error("Missing fields for sign up.");
    }
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName });
    } catch (error: any) {
        console.error("Error signing up: ", error.code);
        throw new Error(getAuthErrorMessage(error.code));
    }
};

export const signInWithEmailPassword = async ({ email, password }: AuthCredentials): Promise<void> => {
    if (!password) {
        throw new Error("Password is required for sign in.");
    }
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
        console.error("Error signing in: ", error.code);
        throw new Error(getAuthErrorMessage(error.code));
    }
};


export const signOutUser = async (): Promise<void> => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error signing out: ", error);
        throw error;
    }
};

export const onAuthStateChange = (callback: NextOrObserver<User>) => {
    return onFirebaseAuthStateChanged(auth, callback);
};
