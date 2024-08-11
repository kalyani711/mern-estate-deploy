/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-3171d.firebaseapp.com",
  projectId: "mern-estate-3171d",
  storageBucket: "mern-estate-3171d.appspot.com",
  messagingSenderId: "16959208325",
  appId: "1:16959208325:web:e9c44d3dab735a64e5a2ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);*/


// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mern-estate-3171d.firebaseapp.com',
  projectId: 'mern-estate-3171d',
  storageBucket: 'mern-estate-3171d.appspot.com',
  messagingSenderId: '16959208325',
  appId: '1:16959208325:web:e9c44d3dab735a64e5a2ec',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
