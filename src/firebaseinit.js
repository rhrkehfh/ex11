// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzfMd_EkaFjMYW8NtJodBHcS6aO4pmZJE",
  authDomain: "ex10-127a5.firebaseapp.com",
  projectId: "ex10-127a5",
  storageBucket: "ex10-127a5.appspot.com",
  messagingSenderId: "705070896486",
  appId: "1:705070896486:web:798e2fea6e78b3a14324a7",
  measurementId: "G-2EZB5L4GWG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);