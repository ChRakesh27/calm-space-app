// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNEVT72BRMlat-wBTRPc-egFPfPMnVUGA",
  authDomain: "calm-space-826c9.firebaseapp.com",
  projectId: 'calm-space-826c9',
  storageBucket: "calm-space-826c9.firebasestorage.app",
  messagingSenderId: "155720206530",
  appId: "1:155720206530:web:9da4b2188a54d0124e135b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export strongly typed services
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
