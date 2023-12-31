// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "mernstate-7ede7.firebaseapp.com",
  projectId: "mernstate-7ede7",
  storageBucket: "mernstate-7ede7.appspot.com",
  messagingSenderId: "281883270907",
  appId: "1:281883270907:web:8fbacc7237928762361a5e",
  measurementId: "G-QSB133YXNC",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
