import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4E3JjgvV_8DONYxUXztESx2tRgABXt7c",
  authDomain: "skillverifyx.firebaseapp.com",
  databaseURL: "https://skillverifyx-default-rtdb.firebaseio.com",
  projectId: "skillverifyx",
  storageBucket: "skillverifyx.appspot.com",
  messagingSenderId: "153862152251",
  appId: "1:153862152251:web:e61c2cac5bd830d8a33c1e",
  measurementId: "G-RNK1XNH9SD"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);