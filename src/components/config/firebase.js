import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
const provider = new GoogleAuthProvider();

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyA-w30VCRytagMzTqBfze1vjv1ufs7Vqjg",
  authDomain: "valuemesh-6d8e3.firebaseapp.com",
  projectId: "valuemesh-6d8e3",
  storageBucket: "valuemesh-6d8e3.appspot.com",
  messagingSenderId: "119957895603",
  appId: "1:119957895603:web:b3b83b2a93cda332e533c6",
  measurementId: "G-DZ4HVE11H9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
