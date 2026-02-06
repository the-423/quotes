// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWb3BV13yy6xiYeeHHEurS38GGS8dF-Ag",
  authDomain: "quote-book-b44a7.firebaseapp.com",
  projectId: "quote-book-b44a7",
  storageBucket: "quote-book-b44a7.firebasestorage.app",
  messagingSenderId: "291066549073",
  appId: "1:291066549073:web:6c77f27dbc4ef873a43970",
  measurementId: "G-6S2R1QFEXL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
