// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyBRmydyrzD1JfQrZjHxLLPv8pFn4KQd5rw",
  authDomain: "surfsellerpage-688ae.firebaseapp.com",
  databaseURL: "https://surfsellerpage-688ae-default-rtdb.firebaseio.com",
  projectId: "surfsellerpage-688ae",
  storageBucket: "surfsellerpage-688ae.firebasestorage.app",
  messagingSenderId: "640077921671",
  appId: "1:640077921671:web:8da3ac84d91014d9b42722",
  measurementId: "G-RDBJ67X54D",
};

let app;
let realtimeDb: any;
let auth: any;
let db: any;

try {
  app = initializeApp(firebaseConfig);
  realtimeDb = getDatabase(app);
  auth = getAuth(app);
  db = getFirestore(app);
  console.log("✅ Firebase initialized");
} catch (error: any) {
  console.error("❌ Firebase initialization error:", error);
}

export { realtimeDb, auth, db };
export default app;
