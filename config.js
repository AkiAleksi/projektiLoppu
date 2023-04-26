import firebase from 'firebase/compat/app';
import { getDatabase } from 'firebase/database';

const firebaseconfig = {
  apiKey: "AIzaSyAkDU7-_42WNZWcVhRynvB2Sqc6q3EvsQY",
  authDomain: "webapp-2d5a7.firebaseapp.com",
  projectId: "webapp-2d5a7",
  storageBucket: "webapp-2d5a7.appspot.com",
  messagingSenderId: "497302261258",
  appId: "1:497302261258:web:461e84085d9aaf01ce19f3"
}

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseconfig);
}

const db = getDatabase(firebase.app());

export { db };
