import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAmnX3obS4YudxhaBlgN8ZfFTjZktSMjQ0",
    authDomain: "cloudcomputin-6cd76.firebaseapp.com",
    databaseURL: "https://cloudcomputin-6cd76-default-rtdb.firebaseio.com",
    projectId: "cloudcomputin-6cd76",
    storageBucket: "cloudcomputin-6cd76.appspot.com",
    messagingSenderId: "563027427829",
    appId: "1:563027427829:web:271ad5ccd74bdf858ea0bc"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase