
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3HEJrbuDKZK4tEgOlbCRmsnCuXYMMsGw",
  authDomain: "infraeye-47036367-29cf0.firebaseapp.com",
  projectId: "infraeye-47036367-29cf0",
  storageBucket: "infraeye-47036367-29cf0.firebasestorage.app",
  messagingSenderId: "933538886435",
  appId: "1:933538886435:web:37c3d89c0e9fe7cbacd296",
  measurementId: "G-1234567890"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
