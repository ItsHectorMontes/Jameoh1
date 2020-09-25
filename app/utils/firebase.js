import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDLTqy9Ybi_wdqcLVaJS531zcIQctIJfEE",
  authDomain: "jameohapp.firebaseapp.com",
  databaseURL: "https://jameohapp.firebaseio.com",
  projectId: "jameohapp",
  storageBucket: "jameohapp.appspot.com",
  messagingSenderId: "720732903780",
  appId: "1:720732903780:web:e5626719e2e75f06aa0271",
  measurementId: "G-4NFSE4PJS1"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
