import firebase from "@firebase/app";
import "@firebase/auth";
import "@firebase/database";

firebase.initializeApp({
  apiKey: "AIzaSyDdF_lPGpWqOi74w2qQHOiJw9_AX8dMoWs",
  authDomain: "task-manager-a7241.firebaseapp.com",
  databaseURL: "https://task-manager-a7241-default-rtdb.firebaseio.com",
  projectId: "task-manager-a7241",
  storageBucket: "task-manager-a7241.appspot.com",
  messagingSenderId: "556838058074",
  appId: "1:556838058074:web:3fb724315c6fd64020c063",
  measurementId: "G-KGBKMK9LS0"
});

export const auth = firebase.auth();
export const database = firebase.database();
