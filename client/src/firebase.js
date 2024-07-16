/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-f1e5b.firebaseapp.com",
  projectId: "mern-estate-f1e5b",
  storageBucket: "mern-estate-f1e5b.appspot.com",
  messagingSenderId: "855993181868",
  appId: "1:855993181868:web:6e450b548661d9b6016109"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);