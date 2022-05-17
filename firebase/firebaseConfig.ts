import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC76YqVWdYsee6OiyzM81G5xWGuvrBp6SI",
  authDomain: "next-scss-ec.firebaseapp.com",
  projectId: "next-scss-ec",
  storageBucket: "next-scss-ec.appspot.com",
  messagingSenderId: "1034319237387",
  appId: "1:1034319237387:web:eff88b9f365b75c7f0520e",
  measurementId: "G-6QE7PZ6Q6V",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
