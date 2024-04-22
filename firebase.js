// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  ReactNativeFirebaseAuth,
  initializeAuth,
} from "firebase/auth";
import { getPersistence } from "firebase/auth";

import Constants from "expo-constants";
import { FIREBASE_API_KEY } from "./apiKeys";

const firebaseConfig = {
  //apiKey: "AIzaSyB72p7jRqEKH90JiiqfCyKblDDUMlldeQI",
  apiKey: FIREBASE_API_KEY,

  //apiKey: FIREBASE_API_KEY,
  authDomain: "newsshortsappexpo.firebaseapp.com",
  projectId: "newsshortsappexpo",
  storageBucket: "newsshortsappexpo.appspot.com",
  messagingSenderId: "253446939265",
  appId: "1:253446939265:web:ad98bf34e814708d5ae380",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

//const app = initializeApp(firebaseConfig);

//const auth = getAuth(app);
