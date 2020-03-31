import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { getEnv } from "./env";

export function getConfig() {
  if (getEnv() === "prod") {
    return {
      apiKey: "AIzaSyDkD0y3RkDI2uKRzkyviy7WM6FZSAA1ABE",
      authDomain: "beepy-prod.firebaseapp.com",
      databaseURL: "https://beepy-prod.firebaseio.com",
      projectId: "beepy-prod",
      storageBucket: "beepy-prod.appspot.com",
      messagingSenderId: "674248560052",
      appId: "1:674248560052:web:6e3c20ee32376d331ab6e1"
    };
  }

  return {
    apiKey: "AIzaSyCu0o3nH1p9yG-l_9Hli5blk195wHLYC88",
    authDomain: "beepy-dev.firebaseapp.com",
    databaseURL: "https://beepy-dev.firebaseio.com",
    projectId: "beepy-dev",
    storageBucket: "beepy-dev.appspot.com",
    messagingSenderId: "331669969650",
    appId: "1:331669969650:web:8f9e5cdea9e46e34180e6b"
  };
}

let auth = null;
let db = null;

function initFirebase() {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(getConfig());
  }

  auth = firebase.auth();
  db = firebase.firestore();
}

export { initFirebase, auth, db };
