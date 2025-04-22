// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChZz6U5bu9mkL40UsuI1_WIa7qcP-m4io",
  authDomain: "roscas-website-1.firebaseapp.com",
  projectId: "roscas-website-1",
  storageBucket: "roscas-website-1.firebasestorage.app",
  messagingSenderId: "562085965193",
  appId: "1:562085965193:web:d0eacfebf89155de4d8558"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Analytics is only available on client side
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, db, auth, storage, analytics }; 