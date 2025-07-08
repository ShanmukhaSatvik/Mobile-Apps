import { initializeApp, getApps, getApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDVHjEWhqkBe7B33CZvMC16QILAau-KOGQ",
  authDomain: "cinesphere-1a4ce.firebaseapp.com",
  projectId: "cinesphere-1a4ce",
  storageBucket: "cinesphere-1a4ce.appspot.com",
  messagingSenderId: "697889975620",
  appId: "1:697889975620:web:448f44344952c03aecbb11",
  measurementId: "G-FDQ51DPMJW",
};
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth =
  getApps().length === 0
    ? initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage),
      })
    : getAuth(app);
const db = getFirestore(app);
export { app, auth, db };
