// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ainalitycs.firebaseapp.com",
  projectId: "ainalitycs",
  storageBucket: "ainalitycs.appspot.com",
  messagingSenderId: "366921807482",
  appId: "1:366921807482:web:74dd66eff3fa14e15b6dc3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);