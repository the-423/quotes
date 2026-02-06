import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// INSTRUCTIONS: Replace these with your Firebase config values
// Get these from: Firebase Console > Project Settings > Your apps > Config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Check if Firebase is configured
export const isFirebaseConfigured = () => {
  return firebaseConfig.apiKey !== "YOUR_API_KEY" && 
         firebaseConfig.projectId !== "YOUR_PROJECT_ID";
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
