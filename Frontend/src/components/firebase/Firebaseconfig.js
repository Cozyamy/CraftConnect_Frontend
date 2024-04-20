import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup, sendPasswordResetEmail, sendEmailVerification, GoogleAuthProvider, signOut } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCOdtu0O55MoaUoyymNRL77xGqNSYqRFw0",
  authDomain: "craft-connect-apf.firebaseapp.com",
  projectId: "craft-connect-apf",
  storageBucket: "craft-connect-apf.appspot.com",
  messagingSenderId: "1037997254103",
  appId: "1:1037997254103:web:741fecc81853cc69f19792",
  measurementId: "G-3KJQ344L5Y"
};

// Initialize Firebase
const app  = initializeApp(firebaseConfig);

const auth = getAuth(app );
const googleProvider = new GoogleAuthProvider();

export { auth, createUserWithEmailAndPassword, signInWithPopup, onAuthStateChanged, sendPasswordResetEmail, signOut, sendEmailVerification, googleProvider };