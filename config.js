import { initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyAkDU7-_42WNZWcVhRynvB2Sqc6q3EvsQY",
  authDomain: "webapp-2d5a7.firebaseapp.com",
  databaseURL: "https://webapp-2d5a7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "webapp-2d5a7",
  storageBucket: "webapp-2d5a7.appspot.com",
  messagingSenderId: "497302261258",
  appId: "1:497302261258:web:461e84085d9aaf01ce19f3"
};

const app = initializeApp(firebaseConfig);

let db = getFirestore(app);

if (!db) {
  db = initializeFirestore(app, { experimentalForceLongPolling: true });
}

export { db };

