import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import 'firebase/compat/firestore';

const app = firebase.initializeApp ({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "react-firebase-redux-93a5c.firebaseapp.com",
  projectId: "react-firebase-redux-93a5c",
  storageBucket: "react-firebase-redux-93a5c.appspot.com",
  messagingSenderId: "432907959902",
  appId: "1:432907959902:web:9c024cc6d2a2e07fe23ecf"
});

export const auth = app.auth();
export const db = firebase.firestore();
export default app;