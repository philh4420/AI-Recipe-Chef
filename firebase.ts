import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKFtea9Bdd-rNiKJZCrbtbob5kMKSEqeg",
  authDomain: "ai-recipe-generator-2b329.firebaseapp.com",
  projectId: "ai-recipe-generator-2b329",
  storageBucket: "ai-recipe-generator-2b329.firebasestorage.app",
  messagingSenderId: "369899380214",
  appId: "1:369899380214:web:6252f49912f4d4d90f7bd7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth, and export the instances.
export const db = getFirestore(app);
export const auth = getAuth(app);