import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getDatabase, onValue, ref, set, update } from "firebase/database"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAOXQ_1eQDXzGHDgsEmLVlhvttx4tdXrLE",
  authDomain: "chatify-19181.firebaseapp.com",
  projectId: "chatify-19181",
  databaseURL: "https://chatify-19181-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "chatify-19181.appspot.com",
  messagingSenderId: "939328226470",
  appId: "1:939328226470:web:9cdc950291df2c76dbe067",
  measurementId: "G-WRHWM2L3ET"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const store = getFirestore(app)
export const realtime = getDatabase(app)