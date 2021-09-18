import firebase from 'firebase';

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDnv-T2lq4NZDNS85LHIxkhHlkwxgB-Q_I",
    authDomain: "spill-it-fbe39.firebaseapp.com",
    projectId: "spill-it-fbe39",
    storageBucket: "spill-it-fbe39.appspot.com",
    messagingSenderId: "602107185303",
    appId: "1:602107185303:web:8a6f457db3e616a56641d2",
    measurementId: "G-0GY7887274"
  };
  // Initialize Firebase
 const fire= firebase.initializeApp(firebaseConfig);
 export const fire;
