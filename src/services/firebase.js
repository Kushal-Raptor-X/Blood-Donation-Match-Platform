// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
              apiKey: "AIzaSyB3jmnmSrZUxaTlFWv8WrbKEeZ8vAF0XtY",
              authDomain: "blood-donation-match-platform.firebaseapp.com",
              projectId: "blood-donation-match-platform",
              storageBucket: "blood-donation-match-platform.firebasestorage.app",
              messagingSenderId: "805368881362",
              appId: "1:805368881362:web:e186246165f666b7df0d0b",
              measurementId: "G-1R61RG3E34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };