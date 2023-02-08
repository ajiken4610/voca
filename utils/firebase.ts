// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { auth as authui } from "firebaseui";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_WciOXO1t-W0dVZ_JU2ebdftCFC22hOo",
  authDomain: "ykvocl.firebaseapp.com",
  projectId: "ykvocl",
  storageBucket: "ykvocl.appspot.com",
  messagingSenderId: "1075623240964",
  appId: "1:1075623240964:web:0a06ffcb475ca71e08dc51",
  measurementId: "G-56ZSCHDDW3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const useFirebaseApp = () => app;
const analytics = getAnalytics(app);
export const useAnalytics = () => analytics;
const auth = getAuth();
export const useAuth = () => auth;
const isAuthReady = ref(0);
auth.onAuthStateChanged((_user) => {
  isAuthReady.value++;
});
export const useAuthIsReady = () => isAuthReady;
const ui = new authui.AuthUI(auth);
export const useAuthUI = () => ui;
