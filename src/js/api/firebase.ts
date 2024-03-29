import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import { firebaseConfig } from '../../config'
import "firebase/analytics";

export type AuthError = {
  code: string,
  message: string,
}


// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const fb = firebase;
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const functions = firebase.functions();