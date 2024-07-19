// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBox-NVqDwX6OIXqUVSM5mNQys0U8zfhIM",
  authDomain: "ai-text-sum.firebaseapp.com",
  projectId: "ai-text-sum",
  storageBucket: "ai-text-sum.appspot.com",
  messagingSenderId: "246854374857",
  appId: "1:246854374857:web:d477f33929850860da0418",
  measurementId: "G-R48Q9JK4TZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);