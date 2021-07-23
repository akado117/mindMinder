import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
// import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCPD4-gzebMQdgaYNPE81occRrRgfOb4zY",
  authDomain: "cuminu-staging.firebaseapp.com",
  databaseURL: "https://cuminu-staging-default-rtdb.firebaseio.com",
  projectId: "cuminu-staging",
  storageBucket: "cuminu-staging.appspot.com",
  messagingSenderId: "689452162387",
  appId: "1:689452162387:web:2af54658f3ac6f4dfa95a6",
  measurementId: "G-PLYNY4NYXT"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const auth = firebase.auth();
export const firestore = firebase.firestore();