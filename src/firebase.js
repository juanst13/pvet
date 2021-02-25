import firebase from "firebase/app"
import "firebase/firestore"

  const firebaseConfig = {
    apiKey: "AIzaSyDNsVIY3c4Kx1I4G7d5ZPLNWT-sZm7apJk",
    authDomain: "vpet-c69ec.firebaseapp.com",
    projectId: "vpet-c69ec",
    storageBucket: "vpet-c69ec.appspot.com",
    messagingSenderId: "426036699736",
    appId: "1:426036699736:web:07e89226f21eee73da602d"
  }

export const firebaseApp = firebase.initializeApp(firebaseConfig)