// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import{ getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtss1A49rTqzq63XvJJ3aPYARI-qhj97k",
  authDomain: "firstreactproject-c6777.firebaseapp.com",
  projectId: "firstreactproject-c6777",
  storageBucket: "firstreactproject-c6777.appspot.com",
  messagingSenderId: "724624577656",
  appId: "1:724624577656:web:bb4a6e502388c795dc498d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);