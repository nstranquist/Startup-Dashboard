import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAlctduxH2jJOZNEdoyoUoN96GiX_j3BCs",
  authDomain: "edurain.firebaseapp.com",
  databaseURL: "https://edurain.firebaseio.com",
  projectId: "edurain",
  storageBucket: "edurain.appspot.com",
  messagingSenderId: "121691707714",
  appId: "1:121691707714:web:c1ff88636e8b24476410db",
  measurementId: "G-CH3JB3FFW8"
};

export const initializeDefaultFirebaseApp = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  }
}

initializeDefaultFirebaseApp()

export const firestore = firebase.firestore()
export const auth = firebase.auth()
export const messaging = firebase.messaging()
export const functions = firebase.functions()
export const Timestamp = firebase.firestore.Timestamp