//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
const firebaseConfig = {
    apiKey: "AIzaSyAdqeYpumb0TyKqikskSmEc8cJS0bX2ebo",
    authDomain: "finance-bacon.firebaseapp.com",
    projectId: "finance-bacon",
    storageBucket: "finance-bacon.appspot.com",
    messagingSenderId: "343539326390",
    appId: "1:343539326390:web:b5eab4ed76f820cc7e3517"
  };

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();