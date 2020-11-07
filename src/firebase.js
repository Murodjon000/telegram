import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDUpqWHLB-AlvyLoj4biv1GUPGT0hqvEhI",
  authDomain: "telegram-clone-5ca27.firebaseapp.com",
  databaseURL: "https://telegram-clone-5ca27.firebaseio.com",
  projectId: "telegram-clone-5ca27",
  storageBucket: "telegram-clone-5ca27.appspot.com",
  messagingSenderId: "54236022296",
  appId: "1:54236022296:web:1de6902c928883fe25a56d",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
